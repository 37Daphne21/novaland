export const paradeOrder = ['drummer', 'flag', 'star', 'robot'];

export const paradeRhythms = [
  ['ArrowUp', 'ArrowRight'],
  ['ArrowLeft', 'ArrowDown', 'ArrowUp'],
  ['ArrowRight', 'ArrowUp', 'ArrowLeft', 'ArrowDown'],
  ['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft', 'ArrowUp']
];

export function getSwapTarget(position, direction) {
  if (!Number.isInteger(position) || position < 0 || position >= paradeOrder.length) return -1;
  if (direction === 'ArrowLeft' && position % 2 === 1) return position - 1;
  if (direction === 'ArrowRight' && position % 2 === 0) return position + 1;
  if (direction === 'ArrowUp' && position >= 2) return position - 2;
  if (direction === 'ArrowDown' && position < 2) return position + 2;
  return -1;
}

export function isParadeReady(lineup) {
  return paradeOrder.every((character, position) => lineup[position] === character);
}

export function normalizeParadeCheckpoint(value) {
  const lineup = value?.lineup;
  if (!Array.isArray(lineup) || lineup.length !== paradeOrder.length
    || !paradeOrder.every(character => lineup.includes(character))) return null;
  const round = isParadeReady(lineup) && Number.isInteger(value.round)
    ? Math.max(0, Math.min(paradeRhythms.length, value.round)) : 0;
  return { lineup: [...lineup], round };
}
