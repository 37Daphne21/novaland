export const sparkStages = [
  {
    answers: {
      circle: { slot: 0, rotation: 0 },
      triangle: { slot: 3, rotation: 0 },
      hex: { slot: 4, rotation: 0 }
    },
    copy: '첫 단계는 방향을 돌리지 않고 위치만 맞추면 돼요.'
  },
  {
    answers: {
      circle: { slot: 1, rotation: 0 },
      triangle: { slot: 3, rotation: 1 },
      hex: { slot: 4, rotation: 0 },
      bolt: { slot: 2, rotation: 1 }
    },
    copy: '두 Core는 방향까지 기억해 주세요.'
  },
  {
    answers: {
      circle: { slot: 0, rotation: 0 },
      triangle: { slot: 3, rotation: 1 },
      hex: { slot: 4, rotation: 0 },
      bolt: { slot: 1, rotation: 3 },
      arrow: { slot: 5, rotation: 2 }
    },
    copy: '다섯 Core 중 세 Core는 방향도 맞아야 해요.'
  },
  {
    answers: {
      circle: { slot: 0, rotation: 0 },
      triangle: { slot: 3, rotation: 2 },
      hex: { slot: 4, rotation: 0 },
      bolt: { slot: 2, rotation: 3 },
      arrow: { slot: 1, rotation: 1 },
      star: { slot: 5, rotation: 1 }
    },
    copy: '마지막은 여섯 Core의 위치와 네 Core의 방향을 모두 복구해 주세요.'
  }
];

const rotatableCoreIds = new Set(['triangle', 'bolt', 'arrow', 'star']);
const restorablePhases = new Set(['countdown', 'reveal', 'play', 'charged']);

export function isSparkRotatableCore(coreId) {
  return rotatableCoreIds.has(coreId);
}

export function isSparkStageCorrect(stageIndex, placements) {
  return Object.entries(sparkStages[stageIndex].answers).every(([coreId, answer]) => placements[coreId]?.slot === answer.slot && placements[coreId]?.rotation === answer.rotation);
}

export function createSparkPreviewCheckpoint(phase, stageIndex = 0) {
  if (!sparkStages[stageIndex] || !['play', 'testing'].includes(phase)) return null;
  const testing = phase === 'testing';
  const previewStageIndex = testing ? sparkStages.length - 1 : stageIndex;
  const placements = Object.fromEntries(Object.entries(sparkStages[previewStageIndex].answers).map(([id, answer]) => [id, testing ? answer : { slot: null, rotation: 0 }]));
  return normalizeSparkCheckpoint({ stageIndex: previewStageIndex, phase: testing ? 'charged' : 'play', placements });
}

export function normalizeSparkCheckpoint(value = {}) {
  value = value && typeof value === 'object' ? value : {};
  const stageIndex = Number.isInteger(value.stageIndex) && value.stageIndex >= 0 && value.stageIndex < sparkStages.length ? value.stageIndex : 0;
  let phase = restorablePhases.has(value.phase) ? value.phase : value.phase === 'launching' ? 'charged' : 'play';
  const activeCoreIds = Object.keys(sparkStages[stageIndex].answers);
  const placements = {};
  const usedSlots = new Set();

  activeCoreIds.forEach((coreId) => {
    const saved = value.placements?.[coreId];
    const validSlot = Number.isInteger(saved?.slot) && saved.slot >= 0 && saved.slot < 6 && !usedSlots.has(saved.slot);
    const slot = validSlot ? saved.slot : null;
    const rotation = isSparkRotatableCore(coreId) && Number.isInteger(saved?.rotation) ? ((saved.rotation % 4) + 4) % 4 : 0;
    if (slot !== null) usedSlots.add(slot);
    placements[coreId] = { slot, rotation };
  });

  if (phase === 'charged' && !isSparkStageCorrect(stageIndex, placements)) phase = 'play';
  return { stageIndex, phase, placements };
}
