export const paradeOrder = ['drummer', 'flag', 'star'];

export function normalizeParadeLineup(value) {
  const used = new Set();
  return paradeOrder.map((_, index) => {
    const character = Array.isArray(value) ? value[index] : null;
    if (!paradeOrder.includes(character) || used.has(character)) return null;
    used.add(character);
    return character;
  });
}

export function placeParadeCharacter(lineup, character, position) {
  if (!paradeOrder.includes(character) || !Number.isInteger(position) || position < 0 || position >= paradeOrder.length || lineup[position] !== null) return lineup;
  const next = lineup.map(item => item === character ? null : item);
  next[position] = character;
  return next;
}

export function isParadeReady(lineup) {
  return paradeOrder.every((character, position) => lineup[position] === character);
}

export function normalizeParadeCheckpoint(value) {
  const lineup = normalizeParadeLineup(value?.lineup);
  return { lineup, launched: value?.launched === true && isParadeReady(lineup) };
}
