const game = document.querySelector('.spark-game');
const viewport = document.querySelector('.spark-game__viewport');
const bank = document.querySelector('[data-spark-bank]');
const cores = [...document.querySelectorAll('[data-core]')];
const slots = [...document.querySelectorAll('[data-slot]')];
const guide = document.querySelector('[data-spark-guide]');
const pausePanel = document.querySelector('[data-spark-pause-panel]');
const hintButton = document.querySelector('[data-spark-hint]');
const rotateButton = document.querySelector('[data-spark-rotate]');
const resetButton = document.querySelector('[data-spark-reset]');
const launchButton = document.querySelector('[data-spark-launch]');
const pauseButton = document.querySelector('[data-spark-pause]');
const completion = document.querySelector('[data-spark-complete]');
const countdown = document.querySelector('[data-spark-countdown]');
const statusEyebrow = document.querySelector('[data-spark-status-eyebrow]');
const statusTitle = document.querySelector('[data-spark-status-title]');
const statusCopy = document.querySelector('[data-spark-status-copy]');
const eve = document.querySelector('[data-spark-eve]');
const stageNumber = document.querySelector('[data-spark-stage]');
const coreCount = document.querySelector('[data-spark-core-count]');
const coreTotal = document.querySelector('[data-spark-core-total]');
const charge = document.querySelector('[data-spark-charge]');
const chargeBar = document.querySelector('[data-spark-charge-bar]');
const embedded = new URLSearchParams(window.location.search).get('embedded') === '1';

const coreSymbols = {
  circle: '○',
  triangle: '△',
  hex: '⬡',
  bolt: 'ϟ',
  arrow: '➜',
  star: '★'
};
const stages = [
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
let phase = 'guide';
let stageIndex = 0;
let selectedCore = null;
let hintTimer = null;
let started = false;

function wait(duration) {
  return new Promise(resolve => window.setTimeout(resolve, duration));
}

function getStage() {
  return stages[stageIndex];
}

function getActiveCoreIds() {
  return Object.keys(getStage().answers);
}

function getActiveCores() {
  const activeIds = getActiveCoreIds();
  return cores.filter(core => activeIds.includes(core.dataset.core));
}

function isRotatableCore(core) {
  return ['triangle', 'bolt', 'arrow', 'star'].includes(core?.dataset.core);
}

function setPhase(nextPhase) {
  phase = nextPhase;
  game.dataset.sparkPhase = nextPhase;
  const playing = nextPhase === 'play';
  hintButton.disabled = !playing || Boolean(hintTimer);
  resetButton.disabled = !playing;
  rotateButton.disabled = !playing || !isRotatableCore(selectedCore);
  pauseButton.disabled = !['play', 'charged'].includes(nextPhase);
}

function setStatus(eyebrow, title, copy, message = copy) {
  statusEyebrow.textContent = eyebrow;
  statusTitle.textContent = title;
  statusCopy.textContent = copy;
  eve.textContent = message;
}

function setRotation(core, rotation) {
  const normalized = ((rotation % 4) + 4) % 4;
  core.dataset.rotation = String(normalized);
  core.style.setProperty('--core-rotation', `${normalized * 90}deg`);
}

function selectCore(core) {
  cores.forEach(item => {
    const selected = item === core;
    item.classList.toggle('is-selected', selected);
    item.setAttribute('aria-pressed', String(selected));
  });
  selectedCore = core;
  rotateButton.disabled = phase !== 'play' || !isRotatableCore(selectedCore);
}

function clearSelection() {
  cores.forEach(core => {
    core.classList.remove('is-selected');
    core.setAttribute('aria-pressed', 'false');
  });
  selectedCore = null;
  rotateButton.disabled = true;
}

function moveCore(core, destination) {
  destination.append(core);
  core.hidden = false;
}

function clearHints() {
  slots.forEach(slot => slot.querySelector('.spark-hint-core')?.remove());
  if (hintTimer) window.clearTimeout(hintTimer);
  hintTimer = null;
  hintButton.disabled = phase !== 'play';
}

function renderHints() {
  clearHints();
  Object.entries(getStage().answers).forEach(([id, answer]) => {
    const ghost = document.createElement('span');
    ghost.className = 'spark-hint-core';
    ghost.dataset.symbol = coreSymbols[id];
    ghost.style.setProperty('--hint-rotation', `${answer.rotation * 90}deg`);
    slots[answer.slot].append(ghost);
  });
  hintButton.disabled = true;
  setStatus('HINT SCAN', `${stageIndex + 1}단계 정답 배열을 잠시 표시해요`, 'Core의 위치와 방향을 확인해 보세요.', '정답 배열을 3초 동안 다시 보여드릴게요.');
  hintTimer = window.setTimeout(() => {
    clearHints();
    showPlayStatus();
  }, 3000);
}

function countPlacedCores() {
  return getActiveCores().filter(core => slots.includes(core.parentElement)).length;
}

function updateProgress() {
  stageNumber.textContent = String(stageIndex + 1);
  coreCount.textContent = String(countPlacedCores());
  coreTotal.textContent = String(getActiveCoreIds().length);
}

function isCorrect() {
  return Object.entries(getStage().answers).every(([id, answer]) => {
    const core = document.querySelector(`[data-core="${id}"]`);
    return core.parentElement === slots[answer.slot] && Number(core.dataset.rotation) === answer.rotation;
  });
}

function showPlayStatus() {
  const stage = getStage();
  setStatus('CORE ALIGNMENT', `${stageIndex + 1}단계 Core를 배치하세요`, stage.copy, stage.copy);
}

async function completeStage() {
  setPhase('charging');
  clearSelection();
  clearHints();
  setStatus('CIRCUIT ONLINE', `${stageIndex + 1}단계 배열이 일치했어요`, '에너지 회로를 충전합니다.', 'Core의 위치와 방향이 모두 일치했어요.');
  const activeSlots = Object.values(getStage().answers).map(answer => slots[answer.slot]);
  for (const slot of activeSlots) {
    await wait(120);
    slot.classList.add('is-charged');
  }
  const value = (stageIndex + 1) * 25;
  charge.textContent = `${value}%`;
  chargeBar.style.width = `${value}%`;
  await wait(350);
  setPhase('charged');
  launchButton.hidden = false;
  const label = launchButton.querySelector('span');
  const description = launchButton.querySelector('small');
  if (stageIndex < stages.length - 1) {
    label.textContent = 'NEXT STAGE';
    description.textContent = `${stageIndex + 2}단계 배열 확인`;
    setStatus('STAGE COMPLETE', `${stageIndex + 1}단계 완료 · 충전율 ${value}%`, '다음 단계로 진행해 주세요.', `충전율 ${value}%예요. 다음 배열을 확인해 주세요.`);
    return;
  }
  label.textContent = 'LAUNCH';
  description.textContent = '에너지 빔 발사 테스트';
  setStatus('CHARGE COMPLETE', '4단계 완료 · 충전율 100%', '발사 테스트를 진행해 주세요.', '전체 충전이 완료됐어요. 발사 테스트를 진행해 주세요.');
}

function validatePlacement() {
  updateProgress();
  if (countPlacedCores() < getActiveCoreIds().length || phase !== 'play') return;
  if (isCorrect()) {
    completeStage();
    return;
  }
  const copy = stageIndex === 0 ? '세 Core의 위치를 다시 확인해 주세요.' : 'Core의 위치가 맞아도 표시 방향이 다르면 충전되지 않아요.';
  setStatus('ARRAY MISMATCH', `${stageIndex + 1}단계 배열 일부가 맞지 않아요`, copy, copy);
}

function resetPlacement() {
  clearHints();
  clearSelection();
  const activeIds = getActiveCoreIds();
  cores.forEach(core => {
    moveCore(core, bank);
    setRotation(core, 0);
    core.hidden = !activeIds.includes(core.dataset.core);
  });
  slots.forEach(slot => slot.classList.remove('is-charged'));
  launchButton.hidden = true;
  updateProgress();
}

function preparePlay() {
  started = true;
  resetPlacement();
  setPhase('play');
  showPlayStatus();
}

async function revealArray() {
  setPhase('reveal');
  clearSelection();
  Object.entries(getStage().answers).forEach(([id, answer]) => {
    const core = document.querySelector(`[data-core="${id}"]`);
    moveCore(core, slots[answer.slot]);
    setRotation(core, answer.rotation);
  });
  updateProgress();
  setStatus('CORE SCAN', `${stageIndex + 1}단계 배열을 기억하세요`, '4초 뒤 Core가 보관함으로 이동합니다.', getStage().copy);
  await wait(4000);
  if (phase === 'reveal') preparePlay();
}

async function startCountdown() {
  started = true;
  if (guide.open) guide.close();
  setPhase('countdown');
  countdown.hidden = false;
  for (const number of [3, 2, 1]) {
    document.querySelector('[data-spark-countdown-number]').textContent = String(number);
    await wait(700);
  }
  countdown.hidden = true;
  revealArray();
}

function placeSelectedCore(slot) {
  if (phase !== 'play' || !selectedCore) return;
  const occupied = slot.querySelector('[data-core]');
  if (occupied && occupied !== selectedCore) {
    setStatus('SLOT OCCUPIED', '이미 Core가 배치된 Slot이에요', '다른 빈 Slot을 선택해 주세요.', '이 Slot에는 이미 Core가 있어요.');
    return;
  }
  moveCore(selectedCore, slot);
  clearSelection();
  validatePlacement();
}

cores.forEach(core => {
  setRotation(core, 0);
  core.setAttribute('aria-pressed', 'false');
  core.addEventListener('click', event => {
    event.stopPropagation();
    if (phase !== 'play') return;
    selectCore(core);
  });
  core.addEventListener('dragstart', event => {
    if (phase !== 'play') {
      event.preventDefault();
      return;
    }
    selectCore(core);
    event.dataTransfer.setData('text/plain', core.dataset.core);
    event.dataTransfer.effectAllowed = 'move';
  });
});

slots.forEach(slot => {
  slot.addEventListener('click', () => placeSelectedCore(slot));
  slot.addEventListener('dragover', event => {
    if (phase !== 'play') return;
    event.preventDefault();
    slot.classList.add('is-drop-target');
  });
  slot.addEventListener('dragleave', () => slot.classList.remove('is-drop-target'));
  slot.addEventListener('drop', event => {
    event.preventDefault();
    slot.classList.remove('is-drop-target');
    const core = document.querySelector(`[data-core="${event.dataTransfer.getData('text/plain')}"]`);
    if (core) selectCore(core);
    placeSelectedCore(slot);
  });
});

rotateButton.addEventListener('click', () => {
  if (!selectedCore || phase !== 'play' || !isRotatableCore(selectedCore)) return;
  setRotation(selectedCore, Number(selectedCore.dataset.rotation) + 1);
  validatePlacement();
});
hintButton.addEventListener('click', renderHints);
resetButton.addEventListener('click', () => {
  preparePlay();
  setStatus('CORE RESET', `${stageIndex + 1}단계 Core를 보관함으로 되돌렸어요`, '정답 배열을 떠올리며 다시 배치해 보세요.');
});
document.querySelector('[data-spark-guide-start]').addEventListener('click', startCountdown);
document.querySelector('[data-spark-guide-return]').addEventListener('click', () => guide.close());
document.querySelector('[data-spark-guide-open]').addEventListener('click', () => {
  document.querySelector('[data-spark-guide-start]').hidden = started;
  document.querySelector('[data-spark-guide-return]').hidden = !started;
  guide.showModal();
});
pauseButton.addEventListener('click', () => {
  if (pauseButton.disabled) return;
  pausePanel.showModal();
});
document.querySelector('[data-spark-resume]').addEventListener('click', () => pausePanel.close());
document.querySelectorAll('[data-spark-exit]').forEach(button => button.addEventListener('click', () => {
  if (embedded && window.parent !== window) window.parent.postMessage({ type: 'novaland:spark-exit', destination: 'control-room' }, window.location.origin);
  else window.location.assign('./index.html?facility=spark&mission-preview=control-room');
}));
launchButton.addEventListener('click', async () => {
  launchButton.hidden = true;
  if (stageIndex < stages.length - 1) {
    stageIndex += 1;
    updateProgress();
    startCountdown();
    return;
  }
  setPhase('launching');
  game.classList.add('is-launching');
  setStatus('LAUNCH TEST', '에너지 빔을 발사합니다', '타워 출력 상태를 확인하고 있어요.', '에너지 빔 발사를 시작할게요.');
  await wait(1700);
  setPhase('complete');
  completion.hidden = false;
});

function centerBoard() {
  if (viewport.scrollWidth > viewport.clientWidth) viewport.scrollLeft = (viewport.scrollWidth - viewport.clientWidth) / 2;
}

const preview = new URLSearchParams(window.location.search).get('mission-preview');
window.addEventListener('message', event => {
  if (event.origin === window.location.origin && event.data?.type === 'novaland:spark-pause' && !pauseButton.disabled) pausePanel.showModal();
});
window.addEventListener('load', centerBoard, { once: true });
if (preview === 'play') preparePlay();
else if (preview === 'reveal') revealArray();
else guide.showModal();
