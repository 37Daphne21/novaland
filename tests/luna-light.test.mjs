import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const source = readFileSync(new URL('../assets/js/luna-light.js', import.meta.url), 'utf8').replace(/^export /gm, '');
const { LUNA_GAME_BOARD, createLightGarden, traceLight, prismDirection, nextLightAction } = vm.runInNewContext(`${source}\n;({ LUNA_GAME_BOARD, createLightGarden, traceLight, prismDirection, nextLightAction })`);

function turnTo(game, id, rotation) {
  while (!game.read().complete && game.read().rotations[id] % 4 !== rotation) game.rotate(id);
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
      const light = traceLight(LUNA_GAME_BOARD, { a, b, c, d });
      const expected = a === 1 ? 'lotus' : a !== 2 ? undefined : b === 3 ? 'moonbell' : b !== 1 ? undefined : c === 2 ? 'stardew' : c !== 0 ? undefined : d === 1 ? 'aurora' : d === 3 ? 'lotus' : undefined;
      assert.equal(light.reached[0], expected, `${a},${b},${c},${d}`);
      if (expected) totals[expected]++;
      assert.deepEqual(Array.from(light.segments[0].from), [470, 398]);
      assert.deepEqual(Array.from(light.segments[0].to), [570, 398]);
    }
  }
  assert.deepEqual(totals, { moonbell: 16, stardew: 4, aurora: 1, lotus: 65 });
});

test('Lotus stays locked before three unique flower fragments; full route completes once', () => {
  const game = createLightGarden();
  game.rotate('a');
  assert.equal(game.read().light.reached[0], 'lotus');
  assert.equal(game.read().complete, false);
  assert.equal(game.read().ready, false);
  connect(game, { a: 2, b: 3 });
  assert.equal(game.read().collected.length, 1);
  connect(game, { a: 2, b: 1, c: 2 });
  assert.equal(game.read().collected.length, 2);
  connect(game, { a: 2, b: 1, c: 0, d: 1 });
  assert.equal(game.read().collected.length, 3);
  assert.equal(game.read().ready, true);
  assert.equal(game.read().complete, false);
  turnTo(game, 'a', 1);
  assert.equal(game.read().light.reached[0], 'lotus');
  assert.equal(game.read().complete, false, 'direct A-to-Lotus shortcut must stay locked after all flowers');
  assert.equal(game.read().light.litPrisms.join(','), 'a');
  const guidance = nextLightAction(LUNA_GAME_BOARD, game.read());
  assert.equal(guidance.prism, 'a');
  turnTo(game, 'a', 2);
  turnTo(game, 'd', 3);
  assert.equal(game.read().complete, true);
  const previous = JSON.stringify(game.read());
  game.rotate('a');
  assert.equal(JSON.stringify(game.read()), previous);
});

test('all six collection orders work; disconnects and repeated visits retain unique flowers', () => {
  const routes = {
    moonbell: { a: 2, b: 3 },
    stardew: { a: 2, b: 1, c: 2 },
    aurora: { a: 2, b: 1, c: 0, d: 1 }
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
    connect(game, { a: 2, b: 1, c: 0, d: 3 });
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
  assert.equal(prismDirection(7), 3);
  assert.equal(prismDirection(-1), 3);
});


test('next action restores the garden from every initial orientation without a fixed order', () => {
  for (let bits = 0; bits < 256; bits += 1) {
    const board = { ...LUNA_GAME_BOARD, prisms: LUNA_GAME_BOARD.prisms.map((node, index) => ({ ...node, rotation: (bits >> (index * 2)) & 3 })) };
    const game = createLightGarden(board);
    let turns = 0;
    while (!game.read().complete && turns < 32) {
      const state = game.read();
      const action = nextLightAction(board, state);
      assert.ok(action);
      assert.ok(state.ready ? action.target === 'lotus' : !state.collected.includes(action.target));
      game.rotate(action.prism);
      turns += 1;
    }
    assert.equal(game.read().complete, true, `orientation ${bits}`);
    assert.equal(nextLightAction(board, game.read()), null);
  }
});

test('energized crystals keep their light after rerouting and reset clears that history', () => {
  const game = createLightGarden();
  connect(game, { a: 2, b: 1, c: 0, d: 0 });
  const activated = [...game.read().energized];
  assert.equal(activated.length, 4);
  game.rotate('a');
  assert.equal(game.read().light.litPrisms.length, 1);
  assert.equal(game.read().energized.length, 4);
  game.read().energized.length = 0;
  assert.equal(game.read().energized.length, 4);
  assert.equal(game.reset().energized.join(','), 'a');
});


test('every receiving prism uses exactly one selected outlet, including reverse paths', () => {
  for (let a = 0; a < 4; a += 1) for (let b = 0; b < 4; b += 1) {
    for (let c = 0; c < 4; c += 1) for (let d = 0; d < 4; d += 1) {
      const rotations = { a, b, c, d };
      const light = traceLight(LUNA_GAME_BOARD, rotations);
      for (const prism of LUNA_GAME_BOARD.prisms) {
        const outgoing = light.segments.filter(line => line.from[0] === prism.x && line.from[1] === prism.y);
        assert.equal(outgoing.length, light.litPrisms.includes(prism.id) ? 1 : 0);
        if (outgoing.length) {
          const [x, y] = outgoing[0].to;
          const expected = [[0,-1],[1,0],[0,1],[-1,0]][rotations[prism.id]];
          assert.deepEqual([Math.sign(x-prism.x), Math.sign(y-prism.y)], expected);
        }
      }
    }
  }
  const loop = traceLight(LUNA_GAME_BOARD, { a: 2, b: 0, c: 1, d: 0 });
  assert.equal(loop.stop, 'loop');
  assert.equal(loop.segments.length, 3);
});


test('guidance keeps its destination after unrelated rotations and advances after restoration', () => {
  const game = createLightGarden();
  const target = game.read().guidedTarget;
  for (const id of ['d', 'c', 'd', 'c', 'b']) {
    const state = game.rotate(id);
    assert.equal(state.guidedTarget, target);
    assert.equal(nextLightAction(LUNA_GAME_BOARD, state).target, target);
  }
  for (let turns = 0; !game.read().collected.includes(target) && turns < 24; turns += 1) {
    game.rotate(nextLightAction(LUNA_GAME_BOARD, game.read()).prism);
  }
  assert.ok(game.read().collected.includes(target));
  assert.notEqual(game.read().guidedTarget, target);
  assert.equal(game.reset().guidedTarget, target);
});
