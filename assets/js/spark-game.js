import { isSparkRotatableCore, normalizeSparkCheckpoint, sparkStages } from './spark-game-state.js';
import { applyDocumentLanguage, initializeLanguage, t } from './locales.js';

initializeLanguage();

const game = document.querySelector('.spark-game');
const viewport = document.querySelector('.spark-game__viewport');
const cores = [...document.querySelectorAll('[data-core]')];
const storageSlots = new Map(cores.map(core => [core.dataset.core, core.parentElement]));
const slots = [...document.querySelectorAll('[data-slot]')];
const guide = document.querySelector('[data-spark-guide]');
const pausePanel = document.querySelector('[data-spark-pause-panel]');
const hintButton = document.querySelector('[data-spark-hint]');
const rotateButton = document.querySelector('[data-spark-rotate]');
const resetButton = document.querySelector('[data-spark-reset]');
const launchButton = document.querySelector('[data-spark-launch]');
const pauseButton = document.querySelector('[data-spark-pause]');
const guideOpenButton = document.querySelector('[data-spark-guide-open]');
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

let phase = 'guide';
let stageIndex = 0;
let selectedCore = null;
let hintTimer = null;
let started = false;
let pausedPhase = 'play';
let sequenceId = 0;
let restoredFromParent = !embedded;
let currentStatus = null;

async function wait(duration, sequence = sequenceId) {
  let elapsed = 0;
  while (elapsed < duration) {
    await new Promise(resolve => window.setTimeout(resolve, 50));
    if (sequence !== sequenceId) return false;
    if (phase !== 'paused' && !document.hidden) elapsed += 50;
  }
  return true;
}

function getStage() {
  return sparkStages[stageIndex];
}

function getActiveCoreIds() {
  return Object.keys(getStage().answers);
}

function getActiveCores() {
  const activeIds = getActiveCoreIds();
  return cores.filter(core => activeIds.includes(core.dataset.core));
}

function isRotatableCore(core) {
  return isSparkRotatableCore(core?.dataset.core);
}

function setPhase(nextPhase) {
  phase = nextPhase;
  game.dataset.sparkPhase = nextPhase;
  const playing = nextPhase === 'play';
  hintButton.disabled = !playing || Boolean(hintTimer);
  resetButton.disabled = !playing;
  rotateButton.disabled = !playing || !isRotatableCore(selectedCore);
  pauseButton.disabled = ['guide', 'paused', 'complete'].includes(nextPhase);
  guideOpenButton.disabled = !['play', 'charged'].includes(nextPhase);
  launchButton.disabled = nextPhase !== 'charged';
  publishState();
}

function createCheckpoint(checkpointPhase = phase) {
  const placements = {};
  getActiveCores().forEach((core) => {
    const slot = slots.indexOf(core.parentElement);
    placements[core.dataset.core] = {
      slot: slot >= 0 ? slot : null,
      rotation: Number(core.dataset.rotation)
    };
  });
  return normalizeSparkCheckpoint({ stageIndex, phase: checkpointPhase, placements });
}

function publishState({ paused = false, complete = false } = {}) {
  if (!embedded || !restoredFromParent || !started || window.parent === window) return;
  window.parent.postMessage({
    type: 'novaland:spark-state',
    checkpoint: createCheckpoint(phase === 'paused' ? pausedPhase : phase),
    started,
    paused: paused || phase === 'paused',
    complete
  }, window.location.origin);
}

function setStatus(eyebrow, titleKey, copyKey, messageKey = copyKey, values = {}) {
  currentStatus = { eyebrow, titleKey, copyKey, messageKey, values };
  renderStatus();
}

function renderStatus() {
  if (!currentStatus) return;
  const { eyebrow, titleKey, copyKey, messageKey, values } = currentStatus;
  statusEyebrow.textContent = eyebrow;
  statusTitle.textContent = t(titleKey, values);
  statusCopy.textContent = t(copyKey, values);
  eve.textContent = t(messageKey, values);
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
    ghost.className = `spark-hint-core spark-core--${id}`;
    ghost.append(document.createElement('i'));
    ghost.style.setProperty('--core-rotation', `${answer.rotation * 90}deg`);
    slots[answer.slot].append(ghost);
  });
  hintButton.disabled = true;
  setStatus('HINT SCAN', 'spark.game.hintTitle', 'spark.game.hintCopy', 'spark.game.hintEve', { stage: stageIndex + 1 });
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
  setStatus('CORE ALIGNMENT', 'spark.game.playTitle', stage.copyKey, stage.copyKey, { stage: stageIndex + 1 });
}

async function completeStage() {
  setPhase('charging');
  clearSelection();
  clearHints();
  setStatus('CIRCUIT ONLINE', 'spark.game.matchedTitle', 'spark.game.chargingCopy', 'spark.game.matchedEve', { stage: stageIndex + 1 });
  const activeSlots = Object.values(getStage().answers).map(answer => slots[answer.slot]);
  for (const slot of activeSlots) {
    if (!await wait(120)) return;
    slot.classList.add('is-charged');
  }
  const value = (stageIndex + 1) * 25;
  charge.textContent = `${value}%`;
  chargeBar.style.width = `${value}%`;
  if (!await wait(350)) return;
  setPhase('charged');
  showChargedStatus();
}

function showChargedStatus() {
  const value = (stageIndex + 1) * 25;
  launchButton.hidden = false;
  const label = launchButton.querySelector('span');
  const description = launchButton.querySelector('small');
  if (stageIndex < sparkStages.length - 1) {
    label.textContent = t('spark.game.nextStage');
    description.textContent = t('spark.game.nextDescription', { stage: stageIndex + 2 });
    setStatus('STAGE COMPLETE', 'spark.game.chargedTitle', 'spark.game.chargedCopy', 'spark.game.chargedEve', { stage: stageIndex + 1, charge: value });
    return;
  }
  label.textContent = t('spark.game.launch');
  description.textContent = t('spark.game.launchDescription');
  setStatus('CHARGE COMPLETE', 'spark.game.chargedTitle', 'spark.game.readyCopy', 'spark.game.readyEve', { stage: stageIndex + 1, charge: value });
}

function validatePlacement() {
  updateProgress();
  publishState();
  if (countPlacedCores() < getActiveCoreIds().length || phase !== 'play') return;
  if (isCorrect()) {
    completeStage();
    return;
  }
  const copyKey = stageIndex === 0 ? 'spark.game.mismatchCopy1' : 'spark.game.mismatchCopy';
  setStatus('ARRAY MISMATCH', 'spark.game.mismatchTitle', copyKey, copyKey, { stage: stageIndex + 1 });
}

function resetPlacement() {
  clearHints();
  clearSelection();
  const activeIds = getActiveCoreIds();
  cores.forEach(core => {
    moveCore(core, storageSlots.get(core.dataset.core));
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
  setStatus('CORE SCAN', 'spark.game.revealTitle', 'spark.game.revealCopy', getStage().copyKey, { stage: stageIndex + 1 });
  if (!await wait(4000)) return;
  if (phase === 'reveal') preparePlay();
}

async function startCountdown() {
  started = true;
  if (guide.open) guide.close();
  setPhase('countdown');
  countdown.hidden = false;
  for (const number of [3, 2, 1]) {
    document.querySelector('[data-spark-countdown-number]').textContent = String(number);
    if (!await wait(700)) return;
  }
  countdown.hidden = true;
  revealArray();
}

function placeSelectedCore(slot) {
  if (phase !== 'play' || !selectedCore) return;
  const occupied = slot.querySelector('[data-core]');
  if (occupied && occupied !== selectedCore) {
    setStatus('SLOT OCCUPIED', 'spark.game.occupiedTitle', 'spark.game.occupiedCopy', 'spark.game.occupiedEve');
    return;
  }
  moveCore(selectedCore, slot);
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
  setStatus('CORE RESET', 'spark.game.resetTitle', 'spark.game.resetCopy', 'spark.game.resetCopy', { stage: stageIndex + 1 });
});
document.querySelector('[data-spark-guide-start]').addEventListener('click', startCountdown);
document.querySelector('[data-spark-guide-return]').addEventListener('click', () => guide.close());
guideOpenButton.addEventListener('click', () => {
  pauseGame();
  document.querySelector('[data-spark-guide-start]').hidden = started;
  document.querySelector('[data-spark-guide-return]').hidden = !started;
  guide.showModal();
});
pauseButton.addEventListener('click', () => {
  if (pauseButton.disabled) return;
  pauseGame();
  pausePanel.showModal();
});
guide.addEventListener('close', resumeGame);
pausePanel.addEventListener('close', resumeGame);
guide.addEventListener('cancel', event => {
  event.preventDefault();
  if (started) guide.close();
  else leaveGame();
});
pausePanel.addEventListener('cancel', event => { event.preventDefault(); pausePanel.close(); });
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape' || event.repeat || guide.open || pausePanel.open) return;
  event.preventDefault();
  event.stopPropagation();
  if (!pauseButton.disabled) { pauseGame(); pausePanel.showModal(); }
});

function pauseGame() {
  if (phase === 'paused' || phase === 'guide' || phase === 'complete') return;
  pausedPhase = phase;
  clearHints();
  setPhase('paused');
}

function resumeGame() {
  if (phase === 'paused' && !guide.open && !pausePanel.open) setPhase(pausedPhase);
}

function leaveGame() {
  publishState({ paused: true });
  sequenceId += 1;
  clearHints();
  if (embedded && window.parent !== window) window.parent.postMessage({ type: 'novaland:spark-exit', destination: 'control-room' }, window.location.origin);
  else window.location.assign('./index.html?facility=spark&mission-preview=control-room');
}
document.querySelector('[data-spark-resume]').addEventListener('click', () => pausePanel.close());
document.querySelectorAll('[data-spark-exit]').forEach(button => button.addEventListener('click', leaveGame));
document.querySelector('[data-spark-record]').addEventListener('click', () => {
  if (phase !== 'complete') return;
  if (embedded) window.parent.postMessage({ type: 'novaland:spark-record' }, window.location.origin);
  else leaveGame();
});
launchButton.addEventListener('click', async () => {
  if (phase !== 'charged') return;
  launchButton.hidden = true;
  if (stageIndex < sparkStages.length - 1) {
    stageIndex += 1;
    resetPlacement();
    updateProgress();
    startCountdown();
    return;
  }
  setPhase('launching');
  game.classList.add('is-launching');
  setStatus('LAUNCH TEST', 'spark.game.launchTitle', 'spark.game.launchCopy', 'spark.game.launchEve');
  if (!await wait(1700)) return;
  setPhase('complete');
  completion.hidden = false;
  publishState({ complete: true });
});

function centerBoard() {
  if (viewport.scrollWidth > viewport.clientWidth) viewport.scrollLeft = (viewport.scrollWidth - viewport.clientWidth) / 2;
}

const preview = new URLSearchParams(window.location.search).get('mission-preview');
window.addEventListener('message', event => {
  if (event.origin !== window.location.origin || event.source !== window.parent) return;
  if (event.data?.type === 'novaland:spark-pause' && !pauseButton.disabled) { pauseGame(); pausePanel.showModal(); }
  if (event.data?.type === 'novaland:spark-restore' && !restoredFromParent) {
    restoredFromParent = true;
    if (event.data.checkpoint) restoreCheckpoint(event.data.checkpoint);
    else if (preview === 'play') preparePlay();
    else guide.showModal();
  }
});
function restoreCheckpoint(value) {
  const checkpoint = normalizeSparkCheckpoint(value);
  sequenceId += 1;
  stageIndex = checkpoint.stageIndex;
  started = true;
  resetPlacement();
  getActiveCores().forEach(core => {
    const placement = checkpoint.placements[core.dataset.core];
    if (placement.slot !== null) moveCore(core, slots[placement.slot]);
    setRotation(core, placement.rotation);
  });
  const valueCharged = (stageIndex + (checkpoint.phase === 'charged' ? 1 : 0)) * 25;
  charge.textContent = `${valueCharged}%`;
  chargeBar.style.width = `${valueCharged}%`;
  updateProgress();
  if (checkpoint.phase === 'countdown') { startCountdown(); return; }
  if (checkpoint.phase === 'reveal') { revealArray(); return; }
  setPhase(checkpoint.phase);
  if (phase === 'charged') {
    Object.values(getStage().answers).forEach(answer => slots[answer.slot].classList.add('is-charged'));
    showChargedStatus();
  } else {
    showPlayStatus();
    validatePlacement();
  }
}
function refreshLanguage() {
  applyDocumentLanguage();
  slots.forEach((slot, index) => slot.setAttribute('aria-label', t('spark.game.slot', { number: index + 1 })));
  if (phase === 'charged' || phase === 'paused' && pausedPhase === 'charged') showChargedStatus();
  else renderStatus();
}
window.addEventListener('novaland:languagechange', refreshLanguage);
window.addEventListener('storage', event => {
  if (event.key !== 'novaLandLanguage') return;
  initializeLanguage();
  refreshLanguage();
});
slots.forEach((slot, index) => slot.setAttribute('aria-label', t('spark.game.slot', { number: index + 1 })));
window.addEventListener('pagehide', () => { sequenceId += 1; clearHints(); });
window.addEventListener('load', centerBoard, { once: true });
if (embedded) window.parent.postMessage({ type: 'novaland:spark-ready' }, window.location.origin);
else if (preview === 'play') preparePlay();
else if (preview === 'reveal') revealArray();
else guide.showModal();
