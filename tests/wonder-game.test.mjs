import assert from 'node:assert/strict';
import { test } from 'node:test';
import { isParadeReady, placeParadeCharacter } from '../assets/js/wonder-game-state.js';

test('WONDER rejects occupied positions and moves a character to a new empty position', () => {
  const lineup = ['flag', 'drummer', null];
  assert.equal(placeParadeCharacter(lineup, 'flag', 1), lineup);
  assert.equal(placeParadeCharacter(lineup, 'unknown', 2), lineup);
  assert.deepEqual(placeParadeCharacter(lineup, 'flag', 2), [null, 'drummer', 'flag']);
  assert.deepEqual(lineup, ['flag', 'drummer', null]);
});

test('WONDER only starts with a complete lineup in the required parade order', () => {
  assert.equal(isParadeReady(['drummer', 'flag', null]), false);
  assert.equal(isParadeReady(['flag', 'drummer', 'star']), false);
  assert.equal(isParadeReady(['drummer', 'flag', 'star']), true);
});
