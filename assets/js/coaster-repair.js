import { t } from './locales.js';

const STAGES = [
  {
    difficulty: 'mission.difficultySelect',
    title: 'mission.repairTitle1',
    description: 'mission.repairDescription1',
    targets: [{ candidateId: 'straight-a', rotation: 0 }],
    candidates: [
      { id: 'straight-a', type: 'straight', rotation: 0 },
      { id: 'corner-a', type: 'corner', rotation: 0 }
    ]
  },
  {
    difficulty: 'mission.difficultyRotate',
    title: 'mission.repairTitle2',
    description: 'mission.repairDescription2',
    targets: [{ candidateId: 'corner-b', rotation: 1 }],
    candidates: [
      { id: 'corner-b', type: 'corner', rotation: 0 },
      { id: 'straight-b', type: 'straight', rotation: 0 }
    ]
  },
  {
    difficulty: 'mission.difficultySequence',
    title: 'mission.repairTitle3',
    description: 'mission.repairDescription3',
    targets: [
      { candidateId: 'corner-c', rotation: 2 },
      { candidateId: 'straight-c', rotation: 1 }
    ],
    candidates: [
      { id: 'straight-c', type: 'straight', rotation: 0 },
      { id: 'corner-c', type: 'corner', rotation: 0 },
      { id: 'corner-decoy', type: 'corner', rotation: 3 }
    ]
  }
];

function createInitialState() {
  return {
    stage: 0,
    completed: [false, false, false],
    selectedId: '',
    rotations: {},
    placements: [],
    activeSlot: 0
  };
}

function cloneState(state) {
  return JSON.parse(JSON.stringify(state));
}

function normalizeState(checkpoint) {
  const initial = createInitialState();
  if (!checkpoint || !Number.isInteger(checkpoint.stage)) {
    return initial;
  }
  let stage = Math.min(Math.max(checkpoint.stage, 0), STAGES.length - 1);
  const completed = STAGES.map((_, index) => Boolean(checkpoint.completed?.[index]));
  while (completed[stage] && stage < STAGES.length - 1) {
    stage += 1;
  }
  const validCandidateIds = new Set(STAGES[stage].candidates.map((candidate) => candidate.id));
  const placements = Array.isArray(checkpoint.placements)
    ? checkpoint.placements.slice(0, STAGES[stage].targets.length).map((placement) => {
      if (!placement || !validCandidateIds.has(placement.candidateId)) {
        return null;
      }
      return { candidateId: placement.candidateId, rotation: Number(placement.rotation) % 4 || 0 };
    })
    : [];
  return {
    stage,
    completed,
    selectedId: validCandidateIds.has(checkpoint.selectedId) ? checkpoint.selectedId : '',
    rotations: checkpoint.rotations && typeof checkpoint.rotations === 'object' ? { ...checkpoint.rotations } : {},
    placements,
    activeSlot: Math.min(Math.max(Number(checkpoint.activeSlot) || 0, 0), STAGES[stage].targets.length - 1)
  };
}

export function createCoasterRepair(root, { onChange, onStageComplete } = {}) {
  const stageLabel = root?.querySelector('[data-repair-stage]');
  const connection = root?.querySelector('[data-repair-connection]');
  const title = root?.querySelector('[data-repair-title]');
  const description = root?.querySelector('[data-repair-description]');
  const difficulty = root?.querySelector('[data-repair-difficulty]');
  const slots = root?.querySelector('[data-repair-slots]');
  const candidates = root?.querySelector('[data-repair-candidates]');
  const rotateButton = root?.querySelector('[data-repair-rotate]');
  const confirmButton = root?.querySelector('[data-repair-confirm]');
  const status = root?.querySelector('[data-repair-status]');
  const transition = root?.querySelector('[data-repair-transition]');
  const transitionText = root?.querySelector('[data-repair-transition-text]');
  const faultItems = root ? [...root.querySelectorAll('[data-repair-fault]')] : [];
  let state = createInitialState();
  let locked = false;

  function getStage() {
    return STAGES[state.stage];
  }

  function getCandidate(candidateId) {
    return getStage().candidates.find((candidate) => candidate.id === candidateId) ?? null;
  }

  function getRotation(candidateId) {
    const candidate = getCandidate(candidateId);
    return Number(state.rotations[candidateId] ?? candidate?.rotation ?? 0) % 4;
  }

  function createPiece(candidate, rotation, className) {
    const piece = document.createElement('span');
    piece.className = `${className} ${className}--${candidate.type}`;
    piece.dataset.rotation = String(rotation);
    piece.innerHTML = '<i aria-hidden="true"></i>';
    return piece;
  }

  function getSinglePlacement() {
    if (!state.selectedId) {
      return null;
    }
    return { candidateId: state.selectedId, rotation: getRotation(state.selectedId) };
  }

  function getPlacements() {
    return state.stage === 2 ? state.placements : [getSinglePlacement()];
  }

  function canConfirm() {
    const placements = getPlacements();
    return placements.length === getStage().targets.length && placements.every(Boolean);
  }

  function notify() {
    onChange?.(cloneState(state));
  }

  function renderFaults() {
    faultItems.forEach((item, index) => {
      item.classList.toggle('is-current', index === state.stage && !state.completed[index]);
      item.classList.toggle('is-complete', state.completed[index]);
      item.setAttribute('aria-label', t(state.completed[index] ? 'mission.faultComplete' : index === state.stage ? 'mission.faultCurrent' : 'mission.faultPending', { number: index + 1 }));
    });
  }

  function renderSlots() {
    if (!slots) {
      return;
    }
    const placements = getPlacements();
    slots.replaceChildren(...getStage().targets.map((_, index) => {
      const slot = document.createElement('button');
      const placement = placements[index];
      slot.type = 'button';
      slot.className = 'rail-repair__slot';
      slot.dataset.repairSlot = String(index);
      slot.disabled = state.stage !== 2 || locked;
      slot.setAttribute('aria-pressed', String(state.stage === 2 && state.activeSlot === index));
      slot.setAttribute('aria-label', t('mission.slotLabel', { number: index + 1 }));
      if (placement) {
        const candidate = getCandidate(placement.candidateId);
        if (candidate) {
          slot.append(createPiece(candidate, placement.rotation, 'rail-repair__piece'));
        }
      } else {
        const empty = document.createElement('span');
        empty.className = 'rail-repair__slot-empty';
        empty.textContent = t('mission.emptySlot');
        slot.append(empty);
      }
      return slot;
    }));
  }

  function renderCandidates() {
    if (!candidates) {
      return;
    }
    const placedIds = new Set(state.placements.filter(Boolean).map((placement) => placement.candidateId));
    candidates.replaceChildren(...getStage().candidates.map((candidate, index) => {
      const button = document.createElement('button');
      const selected = state.selectedId === candidate.id;
      button.type = 'button';
      button.className = 'rail-repair__candidate';
      button.dataset.repairCandidate = candidate.id;
      button.disabled = locked;
      button.setAttribute('aria-pressed', String(selected || placedIds.has(candidate.id)));
      button.setAttribute('aria-label', t('mission.candidateLabel', { number: index + 1 }));
      button.append(createPiece(candidate, getRotation(candidate.id), 'rail-repair__piece'));
      const label = document.createElement('span');
      label.textContent = `${String.fromCharCode(65 + index)}`;
      button.append(label);
      return button;
    }));
  }

  function render() {
    const stage = getStage();
    const completedCount = state.completed.filter(Boolean).length;
    if (stageLabel) {
      stageLabel.textContent = t('mission.repairStage', { current: state.stage + 1, total: STAGES.length });
    }
    if (connection) {
      connection.textContent = `${9 + completedCount} / 12`;
    }
    if (title) {
      title.textContent = t(stage.title);
    }
    if (description) {
      description.textContent = t(stage.description);
    }
    if (difficulty) {
      difficulty.textContent = t(stage.difficulty);
    }
    renderFaults();
    renderSlots();
    renderCandidates();
    const rotationTarget = state.stage === 2 ? state.placements[state.activeSlot] : getSinglePlacement();
    if (rotateButton) {
      rotateButton.disabled = locked || state.stage === 0 || !rotationTarget;
    }
    if (confirmButton) {
      confirmButton.disabled = locked || !canConfirm();
    }
  }

  function selectCandidate(candidateId) {
    if (locked || !getCandidate(candidateId)) {
      return;
    }
    state.selectedId = candidateId;
    if (state.stage === 2) {
      state.placements = state.placements.map((placement) => placement?.candidateId === candidateId ? null : placement);
      state.placements[state.activeSlot] = { candidateId, rotation: getRotation(candidateId) };
    }
    if (status) {
      status.textContent = t('mission.pieceSelected');
    }
    render();
    notify();
  }

  function selectSlot(index) {
    if (locked || state.stage !== 2 || !Number.isInteger(index)) {
      return;
    }
    state.activeSlot = index;
    const placement = state.placements[index];
    state.selectedId = placement?.candidateId ?? state.selectedId;
    render();
    notify();
  }

  function rotate() {
    if (locked || state.stage === 0) {
      return;
    }
    if (state.stage === 2) {
      const placement = state.placements[state.activeSlot];
      if (!placement) {
        return;
      }
      placement.rotation = (placement.rotation + 1) % 4;
      state.rotations[placement.candidateId] = placement.rotation;
    } else if (state.selectedId) {
      state.rotations[state.selectedId] = (getRotation(state.selectedId) + 1) % 4;
    }
    if (status) {
      status.textContent = t('mission.pieceRotated');
    }
    render();
    notify();
  }

  function confirm() {
    if (locked || !canConfirm()) {
      return;
    }
    const solved = getPlacements().every((placement, index) => {
      const target = getStage().targets[index];
      return placement.candidateId === target.candidateId && placement.rotation === target.rotation;
    });
    if (!solved) {
      if (status) {
        status.textContent = t('mission.repairError');
      }
      root?.classList.remove('is-repair-success');
      root?.classList.add('is-repair-error');
      window.setTimeout(() => root?.classList.remove('is-repair-error'), 450);
      return;
    }
    locked = true;
    state.completed[state.stage] = true;
    if (status) {
      status.textContent = t('mission.repairSuccess', { number: state.stage + 1 });
    }
    root?.classList.add('is-repair-success');
    render();
    notify();
    onStageComplete?.({ stage: state.stage, complete: state.stage === STAGES.length - 1 });
  }

  function advance() {
    if (state.stage >= STAGES.length - 1) {
      return;
    }
    state.stage += 1;
    state.selectedId = '';
    state.placements = [];
    state.activeSlot = 0;
    locked = false;
    root?.classList.remove('is-repair-success');
    if (status) {
      status.textContent = t('mission.nextFault', { number: state.stage + 1 });
    }
    render();
    notify();
    candidates?.querySelector('button')?.focus();
  }

  function showTransition(show, stageNumber = state.stage + 1) {
    if (transition) {
      transition.hidden = !show;
    }
    if (transitionText) {
      transitionText.textContent = t('mission.transitionText', { current: stageNumber, total: STAGES.length });
    }
  }

  function reset(checkpoint = null) {
    state = normalizeState(checkpoint);
    locked = state.completed[state.stage];
    root?.classList.remove('is-repair-error', 'is-repair-success');
    showTransition(false);
    if (status) {
      status.textContent = t('mission.repairReady');
    }
    render();
  }

  candidates?.addEventListener('click', (event) => {
    const candidate = event.target.closest('[data-repair-candidate]');
    if (candidate) {
      selectCandidate(candidate.dataset.repairCandidate);
    }
  });
  slots?.addEventListener('click', (event) => {
    const slot = event.target.closest('[data-repair-slot]');
    if (slot) {
      selectSlot(Number(slot.dataset.repairSlot));
    }
  });
  rotateButton?.addEventListener('click', rotate);
  confirmButton?.addEventListener('click', confirm);
  reset();

  return {
    advance,
    focus: () => candidates?.querySelector('button')?.focus(),
    getCheckpoint: () => cloneState(state),
    isComplete: () => state.completed.every(Boolean),
    refreshLanguage: render,
    reset,
    showTransition
  };
}
