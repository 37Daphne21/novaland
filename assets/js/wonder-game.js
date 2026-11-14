import { initializeLanguage, t } from './locales.js';
import { createModalController } from './ui.js';
import { getSwapTarget, isParadeReady, normalizeParadeCheckpoint, paradeOrder, paradeRhythms } from './wonder-game-state.js';

const rhythm = document.querySelector('[data-wonder-rhythm]');
const stageTitle = document.querySelector('#wonder-stage-title');
const stageCopy = stageTitle.nextElementSibling;
const pause = document.querySelector('[data-wonder-pause-dialog]');
const pauseButton = document.querySelector('[data-wonder-pause]');
const resumeButton = document.querySelector('[data-wonder-resume]');
const pauseModal = createModalController(pause);
const controls = document.querySelector('[data-wonder-controls]');
const rhythmStart = document.querySelector('[data-wonder-rhythm-start]');
const rhythmInput = document.querySelector('[data-wonder-rhythm-input]');
const roundLabel = document.querySelector('[data-wonder-round]');
const patternLabel = document.querySelector('[data-wonder-pattern]');
const finale = document.querySelector('[data-wonder-finale]');
const recordButton = document.querySelector('[data-wonder-record]');
const arrows = { ArrowLeft: '←', ArrowUp: '↑', ArrowDown: '↓', ArrowRight: '→' };
const stage = document.querySelector('[data-wonder-stage]');
const status = document.querySelector('[data-wonder-status]');
const shuffleButton = document.querySelector('[data-wonder-shuffle]');
const referenceButton = document.querySelector('[data-wonder-reference]');
const directions = ['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'];
const exitButton = document.querySelector('[data-wonder-exit]');
const title = document.querySelector('[data-wonder-title]');
const guide = document.querySelector('[data-wonder-guide]');
const guideOpenButton = document.querySelector('[data-wonder-guide-open]');
const guideCloseButton = document.querySelector('[data-wonder-guide-close]');
const guideStartButton = document.querySelector('[data-wonder-guide-start]');
const guideReturnButton = document.querySelector('[data-wonder-guide-return]');
const params = new URLSearchParams(window.location.search);
const embedded = params.get('embedded') === '1';
const previewPhase = params.get('mission-preview');

let lineup = [...paradeOrder];
let selected = -1;
let drag = null;
let phase = 'reveal';
let showingReference = false;
let round = 0;
let beat = 0;
let rhythmPhase = 'ready';
let rhythmRetry = false;
let restored = !embedded;
let started = previewPhase === 'play';
const guideModal = createModalController(guide, { onCancel: closeGuide });

function createCard(list) {
  const item = document.createElement('li');
  const button = document.createElement('button');
  const symbol = document.createElement('span');
  const label = document.createElement('span');
  button.className = 'ui-button ui-button--secondary';
  button.type = 'button';
  symbol.className = 'wonder-game__symbol';
  symbol.setAttribute('aria-hidden', 'true');
  button.append(symbol, label);
  item.append(button);
  list.append(item);
  return { button, symbol, label };
}

const board = document.querySelector('[data-wonder-lineup]');
const positions = paradeOrder.map(() => createCard(board));
function renderBeatSlots(container, pattern, visibleBeats) {
  if (container.children.length !== pattern.length) {
    container.replaceChildren(...pattern.map(() => document.createElement('span')));
  }
  [...container.children].forEach((slot, index) => {
    const filled = index < visibleBeats;
    slot.textContent = filled ? arrows[pattern[index]] : '·';
    slot.classList.toggle('is-filled', filled);
  });
}

function describePattern(pattern) {
  return t('wonder.game.practiceRhythmRemember', {
    pattern: pattern.map(key => t('wonder.game.' + key.slice(5).toLowerCase())).join(', ')
  });
}

function render() {
  positions.forEach((card, index) => {
    const character = (showingReference ? paradeOrder : lineup)[index];
    const origin = drag?.from ?? selected;
    const canSwap = drag ? index !== origin : directions.some(direction => getSwapTarget(origin, direction) === index);
    const neighbor = !showingReference && phase === 'swap' && canSwap;
    card.button.classList.toggle('is-swap-target', neighbor);
    card.button.classList.toggle('is-performing', phase === 'restored' && index === round);
    card.button.classList.toggle('is-on-beat', phase === 'restored' && index === round && beat % 2 === 1);
    card.symbol.dataset.character = character;
    card.label.textContent = t('wonder.game.position', { number: index + 1, name: t(`wonder.game.${character}`) });
    card.button.disabled = !restored || showingReference || phase !== 'swap';
    card.button.setAttribute('aria-pressed', String(index === selected));
  });
  stageTitle.textContent = t(phase === 'completed' ? 'wonder.game.finale' : phase === 'restored' ? 'wonder.game.rhythmTitle' : 'wonder.game.title');
  pauseButton.disabled = !started;
  stageCopy.hidden = phase === 'completed' || phase === 'restored';
  controls.hidden = phase === 'restored' || phase === 'completed';
  rhythm.hidden = phase !== 'restored';
  finale.hidden = phase !== 'completed';
  stage.classList.toggle('is-celebrating', phase === 'completed');
  if (phase === 'restored') {
    const pattern = paradeRhythms[round];
    roundLabel.textContent = t('wonder.game.round', { current: round + 1, name: t('wonder.game.' + paradeOrder[round]) });
    renderBeatSlots(patternLabel, pattern, rhythmPhase === 'show' ? pattern.length : beat);
    patternLabel.classList.toggle('is-error', rhythmRetry);
    rhythmStart.hidden = rhythmPhase === 'input';
    rhythmStart.textContent = t(rhythmPhase === 'show' ? 'wonder.game.repeat' : 'wonder.game.listen');
    rhythmInput.hidden = rhythmPhase !== 'input';
  }
  referenceButton.hidden = phase !== 'swap';
  referenceButton.textContent = t(showingReference ? 'wonder.game.backToPuzzle' : 'wonder.game.showReference');
  stage.classList.toggle('is-reference', showingReference);
  shuffleButton.hidden = phase !== 'reveal';
  shuffleButton.disabled = !restored;
  guideOpenButton.disabled = !restored || !started;
  stage.classList.toggle('is-shuffling', phase === 'shuffling');
  stage.classList.toggle('is-restored', phase === 'restored');
  if (phase === 'restored') {
    if (rhythmPhase === 'show') status.textContent = describePattern(paradeRhythms[round]);
    else if (rhythmRetry) status.textContent = t('wonder.game.practiceRhythmRetry');
    else if (rhythmPhase === 'input') status.textContent = beat
      ? t('wonder.game.beats', { count: beat, total: paradeRhythms[round].length })
      : t('wonder.game.rhythmInputHelp');
    else status.textContent = t('wonder.game.guideRhythm');
    return;
  }
  status.textContent = t(showingReference ? 'wonder.game.reference' : selected >= 0 ? 'wonder.game.selected' : `wonder.game.${phase}`, {
    name: selected >= 0 ? t(`wonder.game.${lineup[selected]}`) : ''
  });
}

function saveLineup() {
  if (embedded) window.parent.postMessage({ type: 'novaland:wonder-state', checkpoint: { lineup, round } }, window.location.origin);
}

function swap(from, target) {
  if (phase !== 'swap' || showingReference || guide.open) return;
  if (target < 0 || from === target) return;
  [lineup[from], lineup[target]] = [lineup[target], lineup[from]];
  selected = target;
  if (isParadeReady(lineup)) {
    selected = -1;
    phase = 'restored';
  }
  saveLineup();
  render();
  if (phase === 'restored') rhythmStart.focus();
  else positions[target].button.focus();
}

positions.forEach(({ button }, index) => {
  button.addEventListener('click', event => {
    if (event.detail && event.target.closest('button') !== document.elementFromPoint(event.clientX, event.clientY)?.closest('button')) return;
    selected = index;
    render();
  });
});

function bindSwapDrag(board, positions, onDrop, onDrag = () => {}) {
  let drag = null;

  board.addEventListener('pointerdown', event => {
    if (drag || !event.isPrimary || event.button !== 0) return;
    const from = positions.findIndex(({ button }) => button.contains(event.target));
    if (from < 0 || positions[from].button.disabled) return;
    drag = { from, pointerId: event.pointerId };
    positions[from].button.setPointerCapture(event.pointerId);
    onDrag(drag);
  });

  board.addEventListener('pointerup', event => {
    if (drag?.pointerId !== event.pointerId) return;
    const { from } = drag;
    drag = null;
    const hit = document.elementFromPoint(event.clientX, event.clientY);
    const target = positions.findIndex(({ button }) => button.contains(hit));
    onDrop(from, target);
    onDrag(drag);
  });

  board.addEventListener('lostpointercapture', event => {
    if (drag?.pointerId !== event.pointerId) return;
    drag = null;
    onDrag(drag);
  });
}

bindSwapDrag(board, positions, swap, nextDrag => {
  drag = nextDrag;
  render();
});

const practiceBoard = document.querySelector('[data-wonder-practice]');
const practiceStatus = document.querySelector('[data-wonder-practice-status]');
const practiceReset = document.querySelector('[data-wonder-practice-reset]');
const practicePositions = paradeOrder.map(() => createCard(practiceBoard));
let practiceLineup = [];
let practiceMode = 'position';
let practiceReveal = true;
let demoPhase = 'ready';
let demoBeat = 0;
const demoPattern = paradeRhythms[0];
const demoLabel = document.querySelector('[data-practice-pattern]');
const demoFeedback = document.querySelector('[data-practice-feedback]');
const demoStart = document.querySelector('[data-practice-rhythm-start]');
const demoInput = document.querySelector('[data-practice-rhythm-input]');

function renderDemoRhythm() {
  const visibleBeats = demoPhase === 'show' || demoPhase === 'success' ? demoPattern.length : demoPhase === 'input' ? demoBeat : 0;
  renderBeatSlots(demoLabel, demoPattern, visibleBeats);
  const message = {
    ready: 'guideRhythm',
    show: 'practiceRhythmRemember',
    input: 'rhythmInputHelp',
    retry: 'practiceRhythmRetry',
    success: 'practiceRhythmDone'
  }[demoPhase];
  demoFeedback.textContent = demoPhase === 'show'
    ? describePattern(demoPattern)
    : t('wonder.game.' + message);
  demoFeedback.classList.toggle('is-error', demoPhase === 'retry');
  demoStart.hidden = demoPhase === 'input';
  demoStart.textContent = t(demoPhase === 'show' ? 'wonder.game.repeat' : demoPhase === 'success' ? 'mission.demoReset' : 'wonder.game.listen');
  demoInput.hidden = demoPhase !== 'input';
}

function enterDemoBeat(key) {
  if (demoPhase !== 'input') return;
  if (key !== demoPattern[demoBeat]) demoPhase = 'retry';
  else if (++demoBeat === demoPattern.length) demoPhase = 'success';
  renderDemoRhythm();
  if (demoPhase !== 'input') demoStart.focus();
}

demoStart.addEventListener('click', () => {
  demoBeat = 0;
  demoPhase = demoPhase === 'show' ? 'input' : 'show';
  renderDemoRhythm();
  if (demoPhase === 'input') demoInput.querySelector('button').focus();
});

demoInput.addEventListener('click', event => {
  const button = event.target.closest('[data-beat]');
  if (button) enterDemoBeat(button.dataset.beat);
});

guide.addEventListener('keydown', event => {
  if (practiceMode !== 'rhythm' || demoPhase !== 'input' || !directions.includes(event.key)) return;
  event.preventDefault();
  if (!event.repeat) enterDemoBeat(event.key);
});

const practiceTabs = [...guide.querySelectorAll('[data-practice-mode]')];
const practicePanels = [...guide.querySelectorAll('[data-practice-panel]')];
function selectPractice(mode) {
  practiceMode = mode;
  practiceTabs.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.practiceMode === mode)));
  practicePanels.forEach(panel => { panel.hidden = panel.dataset.practicePanel !== mode; });
}

practiceTabs.forEach(button => button.addEventListener('click', () => selectPractice(button.dataset.practiceMode)));
let practiceSelected = -1;

function renderPractice() {
  const solved = !practiceReveal && isParadeReady(practiceLineup);
  practicePositions.forEach(({ button, symbol, label }, index) => {
    const character = practiceLineup[index];
    button.disabled = practiceReveal;
    symbol.dataset.character = character;
    label.textContent = t('wonder.game.position', { number: index + 1, name: t('wonder.game.' + character) });
    button.setAttribute('aria-pressed', String(index === practiceSelected));
  });
  practiceReset.textContent = t(practiceReveal ? 'wonder.game.shuffle' : 'mission.demoReset');
  practiceStatus.textContent = t(practiceReveal ? 'wonder.game.reveal' : solved ? 'wonder.game.restored' : 'wonder.game.practiceSwap');
}

function resetPractice() {
  practiceReveal = true;
  practiceLineup = [...paradeOrder];
  practiceSelected = -1;
  renderPractice();
}

function swapPractice(from, target) {
  if (target < 0 || target === from || isParadeReady(practiceLineup)) return;
  [practiceLineup[from], practiceLineup[target]] = [practiceLineup[target], practiceLineup[from]];
  practiceSelected = target;
  renderPractice();
  practicePositions[target].button.focus();
}

practicePositions.forEach(({ button }, index) => {
  button.addEventListener('click', event => {
    if (event.detail && !button.contains(document.elementFromPoint(event.clientX, event.clientY))) return;
    practiceSelected = index;
    renderPractice();
  });
  button.addEventListener('keydown', event => {
    if (!directions.includes(event.key)) return;
    event.preventDefault();
    if (!event.repeat) swapPractice(index, getSwapTarget(index, event.key));
  });
});
bindSwapDrag(practiceBoard, practicePositions, swapPractice);
practiceReset.addEventListener('click', () => {
  if (!practiceReveal) {
    resetPractice();
    return;
  }
  practiceReveal = false;
  [practiceLineup[0], practiceLineup[1]] = [practiceLineup[1], practiceLineup[0]];
  renderPractice();
  practicePositions[0].button.focus();
});

referenceButton.addEventListener('click', () => {
  showingReference = !showingReference;
  selected = -1;
  render();
  if (!showingReference) positions[0].button.focus();
});

shuffleButton.addEventListener('click', () => {
  phase = 'shuffling';
  render();
  const delay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 450;
  window.setTimeout(() => {
    lineup = [paradeOrder[3], paradeOrder[0], paradeOrder[1], paradeOrder[2]];
    phase = 'swap';
    saveLineup();
    render();
    if (!guide.open) positions[0].button.focus();
  }, delay);
});

rhythmStart.addEventListener('click', () => {
  rhythmRetry = false;
  rhythmPhase = rhythmPhase === 'show' ? 'input' : 'show';
  render();
  if (rhythmPhase === 'input') rhythmInput.querySelector('button').focus();
});

function enterBeat(key) {
  if (phase !== 'restored' || rhythmPhase !== 'input' || guide.open) return;
  if (key !== paradeRhythms[round][beat]) {
    beat = 0;
    rhythmPhase = 'ready';
    rhythmRetry = true;
    render();
    rhythmStart.focus();
    return;
  }
  beat += 1;
  if (beat < paradeRhythms[round].length) {
    render();
    return;
  }
  beat = 0;
  round += 1;
  rhythmPhase = 'ready';
  if (round === paradeRhythms.length) phase = 'completed';
  saveLineup();
  render();
  if (phase === 'completed') {
    if (embedded) recordButton.focus();
    else finale.querySelector('h2').focus();
  } else rhythmStart.focus();
}

rhythmInput.addEventListener('click', event => {
  const button = event.target.closest('[data-beat]');
  if (button) enterBeat(button.dataset.beat);
});

recordButton.hidden = !embedded;
recordButton.addEventListener('click', () => {
  window.parent.postMessage({ type: 'novaland:wonder-record' }, window.location.origin);
});

function exitMission() {
  if (embedded) window.parent.postMessage({ type: 'novaland:wonder-exit', destination: 'control-room' }, window.location.origin);
  else window.location.assign('./index.html');
}

function openGuide() {
  resetPractice();
  selectPractice('position');
  demoPhase = 'ready';
  renderDemoRhythm();
  guideStartButton.hidden = started;
  guideReturnButton.hidden = !started;
  guideModal.open({ focusTarget: guideCloseButton, opener: started ? guideOpenButton : null });
}

function closeGuide() {
  if (started) guideModal.close();
  else exitMission();
}

guideOpenButton.addEventListener('click', openGuide);
guideCloseButton.addEventListener('click', closeGuide);
guideReturnButton.addEventListener('click', closeGuide);
guideStartButton.addEventListener('click', () => {
  started = true;
  render();
  guideModal.close();
  title.focus({ preventScroll: true });
});
exitButton.addEventListener('click', exitMission);
function openPause() {
  if (!started || pause.open || guide.open) return;
  pauseModal.open({ focusTarget: resumeButton, opener: document.activeElement });
}
pauseButton.addEventListener('click', openPause);
resumeButton.addEventListener('click', pauseModal.close);
document.querySelector('[data-wonder-pause-exit]').addEventListener('click', exitMission);
document.addEventListener('keydown', event => {
  if (!guide.open && !pause.open && phase === 'restored' && rhythmPhase === 'input' && directions.includes(event.key)) {
    event.preventDefault();
    if (!event.repeat) enterBeat(event.key);
    return;
  }
  if (!guide.open && !pause.open && phase === 'swap' && selected >= 0 && directions.includes(event.key)) {
    event.preventDefault();
    if (!event.repeat) swap(selected, getSwapTarget(selected, event.key));
    return;
  }
  if (event.key !== 'Escape' || event.repeat || guide.open || pause.open) return;
  event.preventDefault();
  openPause();
});
window.addEventListener('message', event => {
  if (!embedded || event.source !== window.parent || event.origin !== window.location.origin) return;
  if (event.data?.type === 'novaland:wonder-pause') {
    if (guide.open) closeGuide();
    else if (pause.open) pauseModal.close();
    else openPause();
  }
  if (event.data?.type === 'novaland:wonder-restore' && !restored) {
    const checkpoint = normalizeParadeCheckpoint(event.data.checkpoint ?? (previewPhase === 'rhythm' ? { lineup: paradeOrder } : null));
    if (checkpoint) {
      lineup = checkpoint.lineup;
      round = checkpoint.round;
      phase = round === paradeRhythms.length ? 'completed' : isParadeReady(lineup) ? 'restored' : 'swap';
    }
    restored = true;
    started = previewPhase === 'play' || Boolean(checkpoint);
    render();
    if (!started) openGuide();
  }
});
window.addEventListener('storage', event => {
  if (event.key !== 'novaLandLanguage') return;
  initializeLanguage();
  render();
  if (guide.open) {
    renderPractice();
    renderDemoRhythm();
  }
});

initializeLanguage();
render();
title.focus();
if (embedded) window.parent.postMessage({ type: 'novaland:wonder-ready' }, window.location.origin);
else if (!started) openGuide();
