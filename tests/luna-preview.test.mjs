import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const read = name => readFileSync(new URL(`../assets/js/${name}.js`, import.meta.url), 'utf8').replace(/^import .*;\r?$/gm, '').replace(/^export /gm, '');
const { createLightGarden, applyLunaPreview } = vm.runInNewContext(`${read('preview-location')}\n${read('luna-light')}\n${read('luna-preview')}\n;({ createLightGarden, applyLunaPreview })`, { URLSearchParams });

test('local play preview starts with an uncollected garden', () => {
  const game = createLightGarden();
  game.rotate('a');
  const result = applyLunaPreview(game, { hostname: '127.0.0.1', search: '?facility=luna&mission-preview=play' });
  assert.equal(result.name, 'play');
  assert.equal(game.read().collected.length, 0);
  assert.equal(game.read().complete, false);
  assert.equal(game.read().rotations.a, 0);
});

test('public hosts and unknown previews leave the game untouched', () => {
  for (const [hostname, name] of [['example.com', 'completed'], ['127.example.com', 'completed'], ['localhost', 'flower-1'], ['localhost', 'flower-2'], ['localhost', 'ready'], ['localhost', 'locked'], ['localhost', 'completed'], ['localhost', 'paused'], ['localhost', 'unknown'], ['localhost', '__proto__'], ['localhost', '']]) {
    const game = createLightGarden();
    game.rotate('a');
    const before = JSON.stringify(game.read());
    assert.equal(applyLunaPreview(game, { hostname, search: `?facility=luna&mission-preview=${name}` }), null);
    assert.equal(JSON.stringify(game.read()), before);
  }
  assert.equal(applyLunaPreview(createLightGarden(), { hostname: 'localhost', search: '?facility=luna&mission-preview=play' }).name, 'play');
});


test('hidden tab and manual pause share animation ownership without premature resume', () => {
  const source = readFileSync(new URL('../assets/js/luna-sample.js', import.meta.url), 'utf8');
  const body = source.slice(source.indexOf('function syncAnimations('), source.indexOf('function setPaused('));
  const animation = { playState: 'running', pauses: 0, plays: 0, pause() { this.playState = 'paused'; this.pauses++; }, play() { this.playState = 'running'; this.plays++; } };
  const document = { hidden: false };
  const api = vm.runInNewContext(`let paused = false, animationsHeld = false, heldAnimations = []; ${body}; ({ syncAnimations, setManual(value) { paused = value; syncAnimations(); } })`, { document, garden: { getAnimations: () => [animation] } });
  document.hidden = true; api.syncAnimations(); api.syncAnimations();
  assert.equal(animation.pauses, 1);
  api.setManual(true);
  document.hidden = false; api.syncAnimations();
  assert.equal(animation.plays, 0);
  api.setManual(false);
  assert.equal(animation.plays, 1);
  document.hidden = true; api.syncAnimations();
  document.hidden = false; api.syncAnimations();
  assert.equal(animation.plays, 2);
});


test('GitHub Pages Luna play bypasses guide using the same preview rule', () => {
  assert.equal(applyLunaPreview(createLightGarden(), { hostname: '37daphne21.github.io', protocol: 'https:', pathname: '/novaland/luna-sample.html', search: '?facility=luna&mission-preview=play' }).name, 'play');
});


test('Luna EVE types the initial line and changed dialogue only', () => {
  const source = readFileSync(new URL('../assets/js/luna-sample.js', import.meta.url), 'utf8');
  const body = source.slice(source.indexOf('function say('), source.indexOf('function render('));
  const lines = [];
  const say = vm.runInNewContext(`let messageKey = null; ${body}; say`, { t: key => key, eve: { speak: resolve => lines.push(resolve()) } });
  say('initial'); say('initial'); say('adjust'); say('adjust'); say('restored');
  assert.deepEqual(lines, ['initial', 'adjust', 'restored']);
});
