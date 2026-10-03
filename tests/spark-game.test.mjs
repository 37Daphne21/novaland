import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const read = name => readFileSync(new URL(`../assets/js/${name}.js`, import.meta.url), 'utf8').replace(/^import .*;\r?$/gm, '').replace(/^export /gm, '');
const state = vm.runInNewContext(`${read('spark-game-state')}; ({ sparkStages, normalizeSparkCheckpoint, isSparkStageCorrect, isSparkRotatableCore })`);

function fixture(checkpoint = null) {
  const elements = new Map();
  const messages = [];
  const listeners = new Map();
  const timers = new Map();
  let timerId = 0;
  function element(key) {
    if (elements.has(key)) return elements.get(key);
    const events = new Map();
    const classes = new Set();
    const node = {
      dataset: {}, style: { setProperty() {} }, children: [], hidden: false, disabled: false, open: false,
      classList: { add: name => classes.add(name), remove: name => classes.delete(name), toggle(name, value) { if (value) classes.add(name); else classes.delete(name); } },
      setAttribute() {}, addEventListener: (name, handler) => events.set(name, handler),
      dispatch(name, event = {}) { return events.get(name)?.({ stopPropagation() {}, preventDefault() {}, ...event }); },
      append(child) {
        if (child.parentElement) child.parentElement.children = child.parentElement.children.filter(item => item !== child);
        child.parentElement = node; node.children.push(child);
      },
      querySelector(selector) {
        if (selector === '[data-core]') return node.children.find(child => child.dataset.core) ?? null;
        if (selector === '.spark-hint-core') return null;
        return element(`${key} ${selector}`);
      },
      showModal() { node.open = true; }, close() { node.open = false; node.dispatch('close'); }
    };
    elements.set(key, node);
    return node;
  }
  const cores = ['circle', 'triangle', 'hex', 'bolt', 'arrow', 'star'].map(id => {
    const core = element(`[data-core="${id}"]`); core.dataset.core = id;
    const storageSlot = element(`storage-${id}`);
    element('[data-spark-bank]').append(storageSlot);
    storageSlot.append(core); return core;
  });
  const slots = Array.from({ length: 6 }, (_, index) => element(`[data-slot="${index}"]`));
  const document = {
    hidden: false,
    querySelector: element,
    querySelectorAll: selector => selector === '[data-core]' ? cores : selector === '[data-slot]' ? slots : [],
    addEventListener: (name, handler) => listeners.set(name, handler)
  };
  const parent = { postMessage: message => messages.push(JSON.parse(JSON.stringify(message))) };
  const window = {
    parent, location: { search: '?embedded=1', origin: 'http://localhost', assign() {} },
    addEventListener: (name, handler) => listeners.set(name, handler),
    setTimeout: (callback, duration) => { timers.set(++timerId, { callback, remaining: duration }); return timerId; },
    clearTimeout: id => timers.delete(id)
  };
  vm.runInNewContext(read('spark-game'), { ...state, document, window, URLSearchParams, initializeLanguage() {} });
  const restore = value => listeners.get('message')({ source: parent, origin: window.location.origin, data: { type: 'novaland:spark-restore', checkpoint: value } });
  restore(checkpoint);
  async function tick(duration) {
    for (let elapsed = 0; elapsed < duration; elapsed += 50) {
      for (const [id, timer] of [...timers]) {
        timer.remaining -= 50;
        if (timer.remaining <= 0) { timers.delete(id); timer.callback(); }
      }
      for (let index = 0; index < 5; index += 1) await Promise.resolve();
    }
  }
  function place(id, slot, rotation = 0) {
    element(`[data-core="${id}"]`).dispatch('click');
    for (let index = 0; index < rotation; index += 1) element('[data-spark-rotate]').dispatch('click');
    slots[slot].dispatch('click');
  }
  return { element, messages, tick, place, document, restore, phase: () => element('.spark-game').dataset.sparkPhase };
}

test('SPARK checkpoints reject invalid slots, duplicate placements and unearned charge', () => {
  const normalized = state.normalizeSparkCheckpoint({ stageIndex: 0, phase: 'charged', placements: { circle: { slot: 0, rotation: 2 }, triangle: { slot: 0, rotation: -1 }, hex: { slot: 8 } } });
  assert.equal(normalized.phase, 'play');
  assert.equal(normalized.placements.circle.rotation, 0);
  assert.equal(normalized.placements.triangle.slot, null);
  assert.equal(normalized.placements.triangle.rotation, 3);
  assert.equal(normalized.placements.hex.slot, null);
  assert.equal(state.normalizeSparkCheckpoint(null).stageIndex, 0);
  assert.equal(state.normalizeSparkCheckpoint({ stageIndex: 99 }).stageIndex, 0);
});

test('SPARK plays all four stages and publishes completion only after the launch test', async () => {
  const game = fixture({ stageIndex: 0, phase: 'play' });
  for (let stageIndex = 0; stageIndex < 4; stageIndex += 1) {
    assert.equal(game.phase(), 'play');
    for (const [id, answer] of Object.entries(state.sparkStages[stageIndex].answers)) game.place(id, answer.slot, answer.rotation);
    await game.tick(1600);
    assert.equal(game.phase(), 'charged');
    assert.equal(game.element('[data-spark-charge]').textContent, `${(stageIndex + 1) * 25}%`);
    assert.equal(game.element('[data-spark-bank]').children.length, 6);
    game.element('[data-spark-launch]').dispatch('click');
    if (stageIndex < 3) {
      await game.tick(6500);
      assert.equal(game.element('[data-spark-core-count]').textContent, '0');
      assert.equal(game.element('[data-core="circle"]').parentElement, game.element('storage-circle'));
    }
  }
  assert.equal(game.messages.some(message => message.complete), false);
  await game.tick(1800);
  assert.equal(game.phase(), 'complete');
  assert.equal(game.messages.filter(message => message.complete).length, 1);
  game.element('[data-spark-record]').dispatch('click');
  assert.equal(game.messages.at(-1).type, 'novaland:spark-record');
});

test('SPARK restores partial placements and charged stages without replaying the guide', async () => {
  const game = fixture({ stageIndex: 1, phase: 'play' });
  game.place('triangle', 3, 1);
  game.element('[data-spark-pause]').dispatch('click');
  const saved = game.messages.at(-1);
  assert.equal(saved.paused, true);
  const restored = fixture(saved.checkpoint);
  assert.equal(restored.phase(), 'play');
  assert.equal(restored.element('[data-core="triangle"]').parentElement, restored.element('[data-slot="3"]'));
  assert.equal(restored.element('[data-core="triangle"]').dataset.rotation, '1');
  assert.equal(restored.element('[data-spark-charge]').textContent, '25%');
  const charged = fixture({ stageIndex: 3, phase: 'charged', placements: state.sparkStages[3].answers });
  assert.equal(charged.phase(), 'charged');
  assert.equal(charged.element('[data-spark-launch] span').textContent, 'LAUNCH');
  assert.equal(charged.element('[data-spark-charge]').textContent, '100%');
});

test('SPARK pause and hidden documents freeze countdown and charging transitions', async () => {
  const game = fixture();
  game.element('[data-spark-guide-start]').dispatch('click');
  game.element('[data-spark-pause]').dispatch('click');
  await game.tick(8000);
  assert.equal(game.phase(), 'paused');
  game.element('[data-spark-resume]').dispatch('click');
  game.document.hidden = true;
  await game.tick(8000);
  assert.equal(game.phase(), 'countdown');
  game.document.hidden = false;
  await game.tick(6500);
  assert.equal(game.phase(), 'play');
  for (const [id, answer] of Object.entries(state.sparkStages[0].answers)) game.place(id, answer.slot);
  game.element('[data-spark-pause]').dispatch('click');
  await game.tick(4000);
  assert.equal(game.phase(), 'paused');
  game.element('[data-spark-resume]').dispatch('click');
  await game.tick(1600);
  assert.equal(game.phase(), 'charged');
});
