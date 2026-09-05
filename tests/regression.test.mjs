import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import vm from 'node:vm';

// Run the real module bodies with isolated DOM/storage/timers, without touching browser saves.
function load(file, exports, dependencies = {}) {
  const source = readFileSync(new URL(`../assets/js/${file}`, import.meta.url), 'utf8')
    .replace(/^import .*;\r?$/gm, '').replace(/^export /gm, '');
  return vm.runInNewContext(`${source}\n;({${exports.join(',')}})`, { ...dependencies, URLSearchParams, Intl, Date, console });
}
function storage() {
  const values = new Map();
  return { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value), removeItem: key => values.delete(key) };
}
function clock() {
  let now = 0, id = 0;
  const jobs = new Map();
  const schedule = (fn, delay, repeat) => { jobs.set(++id, { fn, at: now + delay, delay, repeat }); return id; };
  return {
    setTimeout: (fn, delay = 0) => schedule(fn, delay, false), clearTimeout: key => jobs.delete(key),
    setInterval: (fn, delay) => schedule(fn, delay, true), clearInterval: key => jobs.delete(key),
    tick(ms) {
      const end = now + ms;
      for (;;) {
        const next = [...jobs].filter(([, job]) => job.at <= end).sort((a, b) => a[1].at - b[1].at)[0];
        if (!next) break;
        const [key, job] = next; now = job.at;
        if (job.repeat) job.at += job.delay; else jobs.delete(key);
        job.fn();
      }
      now = end;
    }
  };
}
function node() {
  const attributes = new Map(), classes = new Set(), events = new Map();
  return {
    dataset: {}, style: { setProperty() {} }, hidden: false, inert: false, isConnected: true, textContent: '',
    classList: { add: (...xs) => xs.forEach(x => classes.add(x)), remove: (...xs) => xs.forEach(x => classes.delete(x)), contains: x => classes.has(x), toggle(x, state) { if (state) classes.add(x); else classes.delete(x); } },
    setAttribute: (k, v) => attributes.set(k, v), getAttribute: k => attributes.get(k), removeAttribute: k => attributes.delete(k),
    addEventListener: (k, fn) => events.set(k, fn), dispatch(k, event = {}) { events.get(k)?.(event); },
    focus() { this.focused = true; }, closest() { return null; }, getClientRects() { return [{}]; }
  };
}
const facilities = ['coaster', 'luna', 'spark', 'wonder'].map(id => ({ id, name: id }));
const missionState = load('mission-state.js', ['MISSION_PHASES', 'getMissionRestoreState', 'findRestorableMissionId']);
function progressFixture(search = '') {
  const localStorage = storage();
  const window = { location: { hostname: 'localhost', search }, localStorage };
  const api = load('progress.js', ['createProgress', 'readProgress', 'saveProgress', 'recordFacilityCompletion', 'updateMissionProgress', 'getRestorationState'], { facilities, window, ...missionState, getLanguage: () => 'ko', t: key => key });
  return { ...api, window, explorer: { id: 'regression', issuedAt: '2026-09-05T00:00:00Z' } };
}
test('completion counts 0..4, sequential unlock, one stamp/coupon and no duplicate rewards', () => {
  const api = progressFixture(); let progress = api.createProgress(api.explorer);
  assert.equal(api.recordFacilityCompletion(progress, facilities[3]), progress);
  facilities.forEach((facility, index) => {
    assert.equal(api.getRestorationState(progress).completed, index);
    progress = api.recordFacilityCompletion(progress, facility);
    assert.equal(progress.stamps.length, index + 1); assert.equal(progress.coupons.length, index + 1);
    assert.equal(progress.missions[facility.id].phase, 'completed');
    const logs = progress.logs.length;
    progress = api.recordFacilityCompletion(progress, facility); assert.equal(progress.logs.length, logs);
    if (index < 3) assert.equal(progress.facilities[facilities[index + 1].id].status, 'available');
  });
  assert.equal(api.getRestorationState(api.readProgress(api.explorer)).completed, 4);
});
test('all supported previews leave existing progress storage untouched', () => {
  for (const search of ['?mission-preview=guide', '?mission-preview=countdown', '?mission-preview=testing', '?mission-preview=completed', '?map-state=restored']) {
    const api = progressFixture(search); const before = JSON.stringify(api.createProgress(api.explorer));
    api.window.localStorage.setItem('novaLandProgress', before);
    api.recordFacilityCompletion(api.readProgress(api.explorer), facilities[0]);
    assert.equal(api.window.localStorage.getItem('novaLandProgress'), before);
  }
});
test('saved mission restore rules keep failed/paused/guide/countdown distinct', () => {
  for (const phase of ['guide', 'countdown', 'failed', 'playing', 'paused', 'testing']) {
    const result = missionState.getMissionRestoreState({ phase, checkpoint: { mode: phase } });
    assert.equal(result.phase, ['playing', 'testing'].includes(phase) ? 'paused' : phase);
    assert.equal(result.shouldRestore, true);
  }
});
test('advancing a completed saved stage does not reuse its placements in the next stage', () => {
  const api = load('coaster-repair.js', ['normalizeState']);
  const result = api.normalizeState({ stage: 0, activeSlot: 1, completed: [true, false, false], placements: [{ candidateId: 'a', rotation: 0 }, { candidateId: 'b', rotation: 1 }] });
  assert.equal(result.stage, 1); assert.equal(result.activeSlot, 0); assert.ok(result.placements.every(value => value === null));
});
function missionFixture({ saved = { phase: 'idle', checkpoint: null, attempts: 0 }, testSteps = ['connection'] } = {}) {
  const timers = clock(), elements = new Map(), dialog = node();
  const element = selector => {
    if (selector === '[data-guide-demo]') return null;
    if (!elements.has(selector)) { const e = node(); e.closest = () => node(); e.querySelector = child => element(`${selector} ${child}`); elements.set(selector, e); }
    return elements.get(selector);
  };
  const panels = ['guide', 'countdown', 'playing', 'paused', 'failed', 'testing', 'completed'].map(phase => { const e = node(); e.dataset.missionPhase = phase; e.querySelector = () => ['paused', 'failed', 'testing', 'completed'].includes(phase) ? { id: `mission-${phase === 'completed' ? 'complete' : phase}-title` } : null; return e; });
  dialog.querySelector = element;
  dialog.querySelectorAll = selector => selector === '[data-mission-phase]' ? panels : selector === '[data-mission-restart]' ? [element('[data-mission-restart]')] : [];
  const progress = { facilities: { coaster: { status: 'available' } }, missions: { coaster: saved } };
  let callbacks, modalCallbacks, opened = false, checkpoint, advances = 0;
  const game = {
    reset(value) { checkpoint = value ? JSON.parse(JSON.stringify(value)) : { stage: 0, completed: [false, false, false] }; },
    getCheckpoint: () => checkpoint, isComplete: () => checkpoint.completed.every(Boolean),
    advance() { checkpoint.stage++; advances++; }, showCompleted() { checkpoint = { stage: 2, completed: [true, true, true] }; }, showTransition() {}, focus() {}, refreshLanguage() {}
  };
  const api = load('mission.js', ['createMissionController'], {
    window: timers, document: { querySelector: () => dialog }, t: key => key, ...missionState,
    readProgress: () => progress,
    updateMissionProgress(value, id, updates) { Object.assign(value.missions[id], updates); return value; },
    createModalController(_dialog, options) { modalCallbacks = options; return { isOpen: () => opened, open({ focusTarget }) { opened = true; focusTarget?.focus(); }, close() { opened = false; options.onClose(); } }; }
  });
  const controller = api.createMissionController({ createGame(_root, next) { callbacks = next; return game; }, getExplorer: () => ({ id: 'qa' }), duration: 90, testSteps });
  controller.open(facilities[0]);
  return { controller, element, dialog, timers, progress, get advances() { return advances; }, cancel: () => modalCallbacks.onCancel(), start() { element('[data-mission-start]').dispatch('click'); timers.tick(3100); }, completeStage() { checkpoint.completed[checkpoint.stage] = true; callbacks.onStageComplete({ stage: checkpoint.stage, complete: checkpoint.stage === 2 }); } };
}
for (const action of ['[data-mission-pause]', '[data-mission-guide]']) {
  test(`stage transition is frozen by ${action}, then advances exactly once on return`, () => {
    const fixture = missionFixture(); fixture.start(); fixture.completeStage();
    fixture.element(action).dispatch('click'); fixture.timers.tick(2000);
    assert.equal(fixture.advances, 0);
    assert.equal(fixture.dialog.dataset.phase, action.includes('pause') ? 'paused' : 'guide');
    fixture.element(action.includes('pause') ? '[data-mission-resume]' : '[data-mission-guide-return]').dispatch('click');
    assert.equal(fixture.advances, 1); assert.equal(fixture.dialog.dataset.phase, 'playing');
  });
}
test('Escape from play pauses; Escape from in-game guide returns to the same game', () => {
  const fixture = missionFixture(); fixture.start(); fixture.cancel();
  assert.equal(fixture.dialog.dataset.phase, 'paused'); assert.equal(fixture.controller.isOpen(), true);
  fixture.element('[data-mission-resume]').dispatch('click'); fixture.element('[data-mission-guide]').dispatch('click'); fixture.cancel();
  assert.equal(fixture.dialog.dataset.phase, 'playing'); assert.equal(fixture.controller.isOpen(), true);
});
test('restoring failure focuses the visible retry button, not the hidden pause restart', () => {
  const fixture = missionFixture({ saved: { phase: 'failed', checkpoint: { stage: 0, completed: [false, false, false], remaining: 0 }, attempts: 1 } });
  assert.equal(fixture.element('[data-mission-phase="failed"] [data-mission-restart]').focused, true);
});
test('closing during play cancels scheduled time changes and preserves checkpoint', () => {
  const fixture = missionFixture(); fixture.start(); fixture.controller.close();
  const before = JSON.stringify(fixture.progress); fixture.timers.tick(100000);
  assert.equal(JSON.stringify(fixture.progress), before); assert.equal(fixture.progress.missions.coaster.phase, 'paused');
});
test('overlay makes main inert, traps initial Shift+Tab and restores prior focus', () => {
  const main = node(), back = node(), first = node(), last = node(), opener = node(), dialog = node(), overlay = node();
  const document = { activeElement: opener, body: node(), querySelectorAll: () => [main, back] };
  dialog.focus = () => { document.activeElement = dialog; }; dialog.querySelectorAll = () => [first, last];
  overlay.querySelector = () => dialog;
  const api = load('ui.js', ['createOverlayController'], { document, window: { getComputedStyle: () => ({ visibility: 'visible' }) } });
  const controller = api.createOverlayController(); controller.open(overlay);
  assert.equal(main.inert, true); assert.equal(back.inert, true);
  let prevented = false; controller.handleKeydown({ key: 'Tab', shiftKey: true, preventDefault() { prevented = true; } });
  assert.equal(prevented, true); assert.equal(last.focused, true);
  controller.close(); assert.equal(main.inert, false); assert.equal(opener.focused, true);
});


test('changing language during the final Passport message preserves the MAP-entry callback', () => {
  const source = readFileSync(new URL('../assets/js/intro.js', import.meta.url), 'utf8');
  const refresh = source.slice(source.indexOf('  function refreshLanguage()'), source.indexOf('  function start()'));
  let completed = 0;
  const passportMessage = node(); passportMessage.parentElement = node();
  const passport = node(); passport.classList.add('is-stamped');
  const context = {
    t: key => key, registerDialogueMessage: node(), registerTypingState: null,
    nameField: { refreshError() {} }, genderFieldset: null, genderError: null,
    pendingExplorer: { name: 'QA' }, setPassportData() {}, currentScene: { dataset: { introScene: 'passport' } },
    passportMessage, passport, passportTypingTimer: 1, passportTypingState: { onComplete() { completed++; } },
    window: { clearInterval() {} }, announce() {}
  };
  vm.runInNewContext(`${refresh};refreshLanguage();`, context);
  assert.equal(completed, 1); assert.equal(passportMessage.textContent, 'intro.passport.complete');
});
test('MAP progress DOM reports completed count, not unlocked count, at all five milestones', () => {
  const source = readFileSync(new URL('../assets/js/map.js', import.meta.url), 'utf8');
  const render = source.slice(source.indexOf('  function renderMissionProgress()'), source.indexOf('  function renderFacilities()'));
  for (let completed = 0; completed <= 4; completed++) {
    const missionProgress = node(), missionProgressValue = node(), missionProgressBar = node();
    vm.runInNewContext(`${render};renderMissionProgress();`, {
      missionProgress, missionProgressValue, missionProgressBar, missionProgressLabel: node(),
      state: { facilities: facilities.map((_, i) => ({ state: i < completed ? 'completed' : i === completed ? 'available' : 'locked' })) },
      isRestored: () => completed === 4, uiCopy: { progressActive: '복구 완료 시설', progressComplete: '전체 복구 완료' }
    });
    assert.equal(missionProgressValue.textContent, `${completed} / 4`);
    assert.equal(missionProgressBar.style.width, `${completed * 25}%`);
    assert.equal(missionProgress.getAttribute('aria-valuenow'), String(completed));
  }
});


test('modal Escape consumes the native close action and ignores held-key repeats', () => {
  const events = {};
  let cancelled = 0, prevented = 0, stopped = 0;
  const dialog = { addEventListener: (name, handler) => { events[name] = handler; } };
  const { createModalController } = load('ui.js', ['createModalController']);
  createModalController(dialog, { onCancel: () => { cancelled++; } });
  const event = { key: 'Escape', repeat: false, preventDefault: () => { prevented++; }, stopPropagation: () => { stopped++; } };
  events.keydown(event);
  events.keydown({ ...event, repeat: true });
  assert.equal(cancelled, 1); assert.equal(stopped, 2); assert.ok(prevented >= 2);
});


test('game dialogue reveal cannot consume clicks on Pause, Guide or a closed mission', () => {
  const source = readFileSync(new URL('../assets/js/coaster-repair.js', import.meta.url), 'utf8');
  const callback = source.match(/document\.addEventListener\('click', (\(event\) => \{[\s\S]*?)\, true\);/)[1];
  let hidden = false, reveals = 0, prevented = 0;
  const handler = vm.runInNewContext(`(${callback})`, {
    eveMessageTimer: 1, statusTimer: null,
    consumeNonInteractiveClick: load('ui.js', ['consumeNonInteractiveClick']).consumeNonInteractiveClick,
    board: { closest: selector => { assert.match(selector, /hidden/); assert.match(selector, /inert/); assert.match(selector, /dialog:not/); return hidden ? {} : null; } },
    refreshDialogueLanguage: () => { reveals++; }
  });
  const event = { preventDefault: () => { prevented++; }, stopPropagation() {} };
  hidden = true; handler(event);
  assert.equal(reveals, 0); assert.equal(prevented, 0);
  hidden = false; handler(event);
  assert.equal(reveals, 1); assert.equal(prevented, 1);
});


test('dialogue reveal preserves interactive clicks and consumes only background clicks', () => {
  const { consumeNonInteractiveClick } = load('ui.js', ['consumeNonInteractiveClick']);
  for (const interactive of [true, false]) {
    let prevented = false, stopped = false;
    consumeNonInteractiveClick({
      target: { closest: () => interactive ? {} : null },
      preventDefault: () => { prevented = true; }, stopPropagation: () => { stopped = true; }
    });
    assert.equal(prevented, !interactive); assert.equal(stopped, !interactive);
  }
});


test('testing preview stays open without timers or changes to the saved mission', () => {
  const fixture = missionFixture();
  const before = JSON.stringify(fixture.progress);
  fixture.controller.open(facilities[0], null, { previewPhase: 'testing' });
  fixture.timers.tick(20000);
  assert.equal(fixture.dialog.dataset.phase, 'testing');
  assert.equal(fixture.controller.isOpen(), true);
  assert.equal(JSON.stringify(fixture.progress), before);
});


test('normal final checks still run and reach completion after the last rail stage', () => {
  const fixture = missionFixture(); fixture.start();
  for (let step = 0; step < 3; step++) {
    fixture.completeStage(); fixture.timers.tick(1050);
  }
  assert.equal(fixture.dialog.dataset.phase, 'testing');
  fixture.timers.tick(1350);
  assert.equal(fixture.dialog.dataset.phase, 'completed');
});


test('result dialog uses the visible title and testing exposes pending, active and complete states', () => {
  const fixture = missionFixture({ testSteps: ['connection', 'trial', 'safety'] }); fixture.start();
  fixture.cancel();
  assert.equal(fixture.dialog.getAttribute('aria-labelledby'), 'mission-paused-title');
  fixture.controller.open(facilities[0], null, { previewPhase: 'testing' });
  assert.equal(fixture.dialog.getAttribute('aria-labelledby'), 'mission-testing-title');
  assert.equal(fixture.element('[data-test-step="trial"]').getAttribute('aria-current'), 'step');
  assert.equal(fixture.element('[data-test-step="connection"] [data-test-state]').textContent, 'mission.testingState.done');
  assert.equal(fixture.element('[data-test-step="trial"] [data-test-state]').textContent, 'mission.testingState.active');
  assert.equal(fixture.element('[data-test-step="safety"] [data-test-state]').textContent, 'mission.testingState.pending');
  assert.equal(fixture.element('[data-test-step="connection"] [aria-hidden]').textContent, '✓');
  assert.equal(fixture.element('[data-test-step="safety"] [aria-hidden]').textContent, '');
});
