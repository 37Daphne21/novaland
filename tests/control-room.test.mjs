import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

function fixture() {
  const nodes = new Map();
  function element(key) {
    if (!nodes.has(key)) nodes.set(key, { dataset: {}, hidden: false, textContent: '', classList: { toggle() {} }, append() {}, focus() {}, querySelector: selector => element(`${key} ${selector}`), querySelectorAll: () => [] });
    return nodes.get(key);
  }
  const progress = { facilities: { luna: { status: 'active' }, coaster: { status: 'active' } }, missions: { coaster: { checkpoint: { completed: [true, false, false] } } } };
  const source = readFileSync(new URL('../assets/js/control-room.js', import.meta.url), 'utf8').replace(/^import .*;\r?\n/gm, '').replace(/^export /gm, '');
  const create = vm.runInNewContext(`${source}; createControlRoomController`, {
    document: { querySelector: element, querySelectorAll: () => [] },
    readProgress: () => progress, t: key => key, getFacilityText: (facility, key) => `${facility.id}.${key}`,
    createEveController: () => ({ speak() {}, cancel() {}, refreshLanguage() {} })
  });
  return { room: create(), element, progress };
}

test('LUNA uses botanical objectives and enables entry without coaster numbers; switching back restores coaster state', () => {
  const { room, element } = fixture();
  room.show({ id: 'luna', name: 'LUNA LIGHT GARDEN' });
  assert.equal(element('[data-mission-open]').hidden, false);
  assert.equal(element('[data-control-room-rail]').textContent, 'control.lunaPrisms');
  assert.equal(element('.control-room__segments').hidden, true);
  assert.equal(element('[data-control-room-objective-repair]').textContent, 'control.lunaObjectiveRepair');
  room.show({ id: 'coaster', name: 'NOVA COASTER' });
  assert.equal(element('[data-control-room-rail]').textContent, '2 / 9');
  assert.equal(element('[data-control-room-step]').textContent, '1 / 3');
  assert.equal(element('.control-room__segments').hidden, false);
  assert.equal(element('[data-control-room-connection-label]').textContent, 'control.railConnection');
  assert.equal(element('[data-control-room-objective-repair]').textContent, 'control.objectiveRepair');
});

test('completed coaster keeps its original operation status and hides mission start', () => {
  const { room, element, progress } = fixture();
  progress.facilities.coaster.status = 'completed';
  room.show({ id: 'coaster', name: 'NOVA COASTER' });
  assert.equal(element('[data-control-room-rail]').textContent, '9 / 9');
  assert.equal(element('[data-control-room-step]').textContent, '3 / 3');
  assert.equal(element('[data-mission-open]').hidden, true);
  assert.equal(element('[data-control-room-operation]').hidden, false);
});
