import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const source = readFileSync(new URL('../assets/js/luna-light.js', import.meta.url), 'utf8').replace(/^export /gm, '');
const { LUNA_SAMPLE_BOARD, createLightGarden, traceLight, prismSockets } = vm.runInNewContext(`${source}\n;({ LUNA_SAMPLE_BOARD, createLightGarden, traceLight, prismSockets })`);

function turnTo(game, id, rotation) {
  while (game.read().rotations[id] % 4 !== rotation) game.rotate(id);
  return game.read();
}

function connect(game, rotations) {
  // Prepare downstream while the source is disconnected so the test isolates one target.
  turnTo(game, 'a', 0);
  for (const [id, rotation] of Object.entries(rotations)) if (id !== 'a') turnTo(game, id, rotation);
  turnTo(game, 'a', rotations.a);
  return game.read();
}

test('all 256 board orientations lead only to the four intended optical routes', () => {
  const totals = { moonbell: 0, stardew: 0, aurora: 0, lotus: 0 };
  for (let a = 0; a < 4; a++) for (let b = 0; b < 4; b++) {
    for (let c = 0; c < 4; c++) for (let d = 0; d < 4; d++) {
      const light = traceLight(LUNA_SAMPLE_BOARD, { a, b, c, d });
      const expected = a !== 2 ? undefined : b === 3 ? 'moonbell' : b !== 0 ? undefined : c === 2 ? 'stardew' : c !== 3 ? undefined : d === 1 ? 'aurora' : d === 2 ? 'lotus' : undefined;
      assert.equal(light.reached[0], expected, `${a},${b},${c},${d}`);
      if (expected) totals[expected]++;
      assert.deepEqual(Array.from(light.segments[0].from), [190, 330]);
      assert.deepEqual(Array.from(light.segments[0].to), [470, 330]);
    }
  }
  assert.deepEqual(totals, { moonbell: 16, stardew: 4, aurora: 1, lotus: 1 });
});

test('Lotus stays locked before three unique flower fragments; full route completes once', () => {
  const game = createLightGarden();
  connect(game, { a: 2, b: 0, c: 3, d: 2 });
  assert.equal(game.read().light.reached[0], 'lotus');
  assert.equal(game.read().complete, false);
  assert.equal(game.read().ready, false);
  turnTo(game, 'b', 3);
  assert.equal(game.read().collected.length, 1);
  turnTo(game, 'b', 0);
  turnTo(game, 'c', 2);
  assert.equal(game.read().collected.length, 2);
  turnTo(game, 'c', 3);
  assert.equal(game.read().complete, false);
  turnTo(game, 'd', 1);
  assert.equal(game.read().collected.length, 3);
  assert.equal(game.read().ready, true);
  assert.equal(game.read().complete, false);
  const state = game.rotate('d');
  assert.equal(state.complete, true);
  const previous = JSON.stringify(state);
  game.rotate('a');
  assert.equal(JSON.stringify(game.read()), previous);
});

test('all six collection orders work; disconnects and repeated visits retain unique flowers', () => {
  const routes = {
    moonbell: { a: 2, b: 3 },
    stardew: { a: 2, b: 0, c: 2 },
    aurora: { a: 2, b: 0, c: 3, d: 1 }
  };
  const orders = [['moonbell','stardew','aurora'],['moonbell','aurora','stardew'],['stardew','moonbell','aurora'],['stardew','aurora','moonbell'],['aurora','moonbell','stardew'],['aurora','stardew','moonbell']];
  for (const order of orders) {
    const game = createLightGarden();
    for (const target of order) {
      connect(game, routes[target]);
      assert.equal(game.read().collected.includes(target), true);
      const count = game.read().collected.length;
      for (let i = 0; i < 4; i++) game.rotate('a');
      assert.equal(game.read().collected.length, count);
    }
    assert.equal(game.read().ready, true);
    connect(game, { a: 2, b: 0, c: 3, d: 2 });
    assert.equal(game.read().complete, true);
  }
});

test('reset and snapshots are isolated; quarter-turn wraparound keeps valid connections', () => {
  const game = createLightGarden();
  connect(game, { a: 2, b: 3 });
  const snapshot = game.read();
  snapshot.rotations.a = 0;
  snapshot.collected.length = 0;
  assert.equal(game.read().collected.length, 1);
  assert.equal(game.read().rotations.a % 4, 2);
  const before = JSON.stringify(game.read());
  game.rotate('unknown');
  assert.equal(JSON.stringify(game.read()), before);
  const reset = game.reset();
  assert.equal(reset.collected.length, 0);
  assert.equal(reset.complete, false);
  assert.equal(reset.ready, false);
  assert.deepEqual(Array.from(prismSockets(7)), [3, 0]);
  assert.deepEqual(Array.from(prismSockets(-1)), [3, 0]);
});
