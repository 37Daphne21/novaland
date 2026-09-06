// Light connections use N, E, S, W sockets. A quarter-turn rotates both sockets.
const DIRECTIONS = [[0, -1], [1, 0], [0, 1], [-1, 0]];

export const LUNA_SAMPLE_BOARD = {
  width: 1600,
  height: 900,
  source: { id: 'source', x: 190, y: 330, direction: 1 },
  prisms: [
    { id: 'a', x: 470, y: 330, rotation: 0 },
    { id: 'b', x: 470, y: 550, rotation: 2 },
    { id: 'c', x: 1050, y: 550, rotation: 1 },
    { id: 'd', x: 1050, y: 330, rotation: 0 }
  ],
  targets: [
    { id: 'moonbell', x: 260, y: 550, kind: 'flower', width: 250 },
    { id: 'stardew', x: 1050, y: 735, kind: 'flower', width: 215 },
    { id: 'aurora', x: 1320, y: 330, kind: 'flower', width: 280 },
    { id: 'lotus', x: 820, y: 330, kind: 'lotus', width: 235 }
  ]
};

export function prismSockets(rotation) {
  const turn = ((rotation % 4) + 4) % 4;
  return [turn, (turn + 1) % 4];
}

export function traceLight(board, rotations) {
  let current = board.source;
  let direction = board.source.direction;
  const segments = [];
  const reached = [];
  const litPrisms = [];
  const visited = new Set();
  const nodes = [...board.prisms, ...board.targets];

  for (;;) {
    const visit = `${current.id}:${direction}`;
    if (visited.has(visit)) return { segments, reached, litPrisms, stop: 'loop' };
    visited.add(visit);
    const [dx, dy] = DIRECTIONS[direction];
    const next = nodes.filter(node => node.id !== current.id)
      .map(node => ({ node, distance: (node.x - current.x) * dx + (node.y - current.y) * dy }))
      .filter(({ node, distance }) => distance > 0 && (dx === 0 ? node.x === current.x : node.y === current.y))
      .sort((a, b) => a.distance - b.distance)[0]?.node;

    if (!next) {
      // An unconnected ray travels a short distance, then gently disappears.
      segments.push({ from: [current.x, current.y], to: [Math.max(24, Math.min(board.width - 24, current.x + dx * 115)), Math.max(24, Math.min(board.height - 24, current.y + dy * 115))], loose: true });
      return { segments, reached, litPrisms, stop: 'unconnected' };
    }

    segments.push({ from: [current.x, current.y], to: [next.x, next.y], loose: false });
    if (board.targets.some(target => target.id === next.id)) {
      reached.push(next.id);
      return { segments, reached, litPrisms, stop: 'target' };
    }
    litPrisms.push(next.id);
    const incoming = (direction + 2) % 4;
    const sockets = prismSockets(rotations[next.id] ?? next.rotation);
    if (!sockets.includes(incoming)) return { segments, reached, litPrisms, stop: next.id };
    direction = sockets.find(socket => socket !== incoming);
    current = next;
  }
}

export function createLightGarden(board = LUNA_SAMPLE_BOARD) {
  let rotations;
  let collected;
  let complete;
  const flowers = board.targets.filter(target => target.kind !== 'lotus');

  function read() {
    const light = traceLight(board, rotations);
    return { rotations: { ...rotations }, collected: [...collected], light, ready: collected.size === flowers.length, complete };
  }

  function reset() {
    rotations = Object.fromEntries(board.prisms.map(prism => [prism.id, prism.rotation]));
    collected = new Set();
    complete = false;
    return read();
  }

  function rotate(id) {
    if (complete || !board.prisms.some(prism => prism.id === id)) return read();
    rotations[id] += 1;
    const light = traceLight(board, rotations);
    light.reached.forEach(id => {
      const target = board.targets.find(item => item.id === id);
      if (target.kind === 'lotus') complete = collected.size === flowers.length;
      else collected.add(id);
    });
    return read();
  }

  reset();
  return { read, reset, rotate };
}
