// Each prism accepts incoming light and sends it through one N/E/S/W outlet.
const DIRECTIONS = [[0, -1], [1, 0], [0, 1], [-1, 0]];

// Coordinates match the integrated 1672 x 941 conservatory artwork.
// groundY is the plinth surface; y is the beam height through the crystal.
export const LUNA_SAMPLE_BOARD = {
  width: 1672,
  height: 941,
  source: { id: 'source', x: 470, y: 398, direction: 1 },
  prisms: [
    { id: 'a', x: 570, y: 398, groundY: 430, rotation: 0 },
    { id: 'b', x: 570, y: 608, groundY: 640, rotation: 2 },
    { id: 'c', x: 1100, y: 608, groundY: 640, rotation: 1 },
    { id: 'd', x: 1100, y: 398, groundY: 430, rotation: 0 }
  ],
  targets: [
    { id: 'moonbell', x: 260, y: 608, regionY: 495, kind: 'flower', width: 250 },
    { id: 'stardew', x: 1100, y: 730, regionY: 750, kind: 'flower', width: 240 },
    { id: 'aurora', x: 1300, y: 398, regionY: 395, kind: 'flower', width: 220 },
    { id: 'lotus', x: 835, y: 398, kind: 'lotus', width: 145 }
  ]
};

export function prismDirection(rotation) {
  return ((rotation % 4) + 4) % 4;
}

function nextLightNode(board, current, direction) {
  const [dx, dy] = DIRECTIONS[direction];
  return [...board.prisms, ...board.targets].filter(node => node.id !== current.id)
    .map(node => ({ node, distance: (node.x - current.x) * dx + (node.y - current.y) * dy }))
    .filter(({ node, distance }) => distance > 0 && (dx === 0 ? node.x === current.x : node.y === current.y))
    .sort((a, b) => a.distance - b.distance)[0]?.node;
}

export function traceLight(board, rotations) {
  let current = board.source;
  let direction = board.source.direction;
  const segments = [];
  const reached = [];
  const litPrisms = [];
  const visited = new Set();

  for (;;) {
    const visit = `${current.id}:${direction}`;
    if (visited.has(visit)) return { segments, reached, litPrisms, stop: 'loop' };
    visited.add(visit);
    const [dx, dy] = DIRECTIONS[direction];
    const next = nextLightNode(board, current, direction);

    if (!next) {
      // An unconnected ray travels a short distance, then gently disappears.
      segments.push({ from: [current.x, current.y], to: [Math.max(24, Math.min(board.width - 24, current.x + dx * 210)), Math.max(24, Math.min(board.height - 24, current.y + dy * 210))], loose: true });
      return { segments, reached, litPrisms, stop: 'unconnected' };
    }

    segments.push({ from: [current.x, current.y], to: [next.x, next.y], loose: false });
    if (board.targets.some(target => target.id === next.id)) {
      reached.push(next.id);
      return { segments, reached, litPrisms, stop: 'target' };
    }
    litPrisms.push(next.id);
    direction = prismDirection(rotations[next.id] ?? next.rotation);
    current = next;
  }
}

// Find the shortest next restoration from the current orientation, not a fixed script.
export function nextLightAction(board, state) {
  if (state.complete) return null;
  const wanted = new Set(board.targets.filter(node => state.ready ? node.kind === 'lotus' : node.kind !== 'lotus' && !state.collected.includes(node.id)).map(node => node.id));
  const key = rotations => board.prisms.map(node => rotations[node.id] % 4).join(',');
  const queue = [{ rotations: state.rotations, first: null }];
  const visited = new Set([key(state.rotations)]);
  for (let index = 0; index < queue.length; index += 1) {
    const current = queue[index];
    for (const prism of board.prisms) {
      const rotations = { ...current.rotations, [prism.id]: (current.rotations[prism.id] + 1) % 4 };
      const signature = key(rotations);
      if (visited.has(signature)) continue;
      visited.add(signature);
      const first = current.first ?? prism.id;
      const target = traceLight(board, rotations).reached.find(id => wanted.has(id));
      if (target) return { prism: first, target };
      queue.push({ rotations, first });
    }
  }
  return null;
}

export function createLightGarden(board = LUNA_SAMPLE_BOARD) {
  let rotations;
  let collected;
  let complete;
  let energized;
  const flowers = board.targets.filter(target => target.kind !== 'lotus');

  function read() {
    const light = traceLight(board, rotations);
    return { rotations: { ...rotations }, collected: [...collected], energized: [...energized], light, ready: collected.size === flowers.length, complete };
  }

  function reset() {
    rotations = Object.fromEntries(board.prisms.map(prism => [prism.id, prism.rotation]));
    collected = new Set();
    complete = false;
    energized = new Set(traceLight(board, rotations).litPrisms);
    return read();
  }

  function rotate(id) {
    if (complete || !board.prisms.some(prism => prism.id === id)) return read();
    rotations[id] += 1;
    const light = traceLight(board, rotations);
    light.litPrisms.forEach(id => energized.add(id));
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
