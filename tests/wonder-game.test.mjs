import assert from 'node:assert/strict';
import { test } from 'node:test';
import { getSwapTarget, isParadeReady, normalizeParadeCheckpoint, paradeOrder } from '../assets/js/wonder-game-state.js';

test('WONDER swaps only with an orthogonal neighbor on the 2×2 board', () => {
  assert.equal(getSwapTarget(0, 'ArrowRight'), 1);
  assert.equal(getSwapTarget(0, 'ArrowDown'), 2);
  assert.equal(getSwapTarget(3, 'ArrowLeft'), 2);
  assert.equal(getSwapTarget(3, 'ArrowUp'), 1);
  assert.equal(getSwapTarget(1, 'ArrowRight'), -1);
  assert.equal(getSwapTarget(2, 'ArrowLeft'), -1);
  assert.equal(getSwapTarget(0, 'ArrowUp'), -1);
  assert.equal(getSwapTarget(3, 'ArrowDown'), -1);
  assert.equal(getSwapTarget(-1, 'ArrowRight'), -1);
});

test('WONDER restores valid four-character boards and rejects old or invalid layouts', () => {
  assert.equal(normalizeParadeCheckpoint({ lineup: paradeOrder.slice(0, 3) }), null);
  assert.equal(normalizeParadeCheckpoint({ lineup: ['drummer', 'drummer', 'star', 'robot'] }), null);
  const checkpoint = normalizeParadeCheckpoint({ lineup: [...paradeOrder].reverse() });
  assert.equal(isParadeReady(checkpoint.lineup), false);
  assert.equal(isParadeReady(paradeOrder), true);
});
