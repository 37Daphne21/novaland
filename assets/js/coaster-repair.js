import { t } from './locales.js';

const RAIL_ASSETS = {
  corner: './assets/images/coaster/rail-corner-hd.svg',
  straight: './assets/images/coaster/rail-straight-hd.svg',
  t: './assets/images/coaster/rail-t-hd.svg'
};

const STAGES = [
  {
    description: 'mission.repairDescription1',
    eveMessage: 'mission.repairEve1',
    allowRotation: false,
    board: {
      columns: 12,
      rows: 5,
      start: { column: 0, row: 3 },
      goal: { column: 11, row: 1 },
      tiles: [
        { column: 0, row: 3, type: 'straight', rotation: 1 },
        { column: 1, row: 3, type: 'straight', rotation: 1 },
        { column: 2, row: 2, type: 'straight', rotation: 0 },
        { column: 2, row: 1, type: 'corner', rotation: 2 },
        { column: 3, row: 1, type: 'straight', rotation: 1 },
        { column: 4, row: 1, type: 'straight', rotation: 1 },
        { column: 5, row: 1, type: 'straight', rotation: 1 },
        { column: 7, row: 1, type: 'straight', rotation: 1 },
        { column: 8, row: 1, type: 'straight', rotation: 1 },
        { column: 9, row: 1, type: 'straight', rotation: 1 },
        { column: 10, row: 1, type: 'straight', rotation: 1 },
        { column: 11, row: 1, type: 'straight', rotation: 1 }
      ]
    },
    cells: [{ column: 2, row: 3 }, { column: 6, row: 1 }],
    targets: [
      { candidateId: 'corner-a', rotation: 0 },
      { candidateId: 'straight-a', rotation: 1 }
    ],
    candidates: [
      { id: 'corner-a', type: 'corner', rotation: 0, label: 'mission.pieceCorner' },
      { id: 'straight-a', type: 'straight', rotation: 1, label: 'mission.pieceStraight' }
    ]
  },
  {
    description: 'mission.repairDescription2',
    eveMessage: 'mission.repairEve2',
    allowRotation: true,
    board: {
      columns: 14,
      rows: 6,
      start: { column: 0, row: 3 },
      goal: { column: 13, row: 3 },
      tiles: [
        { column: 0, row: 3, type: 'straight', rotation: 1 },
        { column: 1, row: 3, type: 'straight', rotation: 1 },
        { column: 2, row: 3, type: 'corner', rotation: 0 },
        { column: 2, row: 2, type: 'straight', rotation: 0 },
        { column: 2, row: 1, type: 'corner', rotation: 2 },
        { column: 3, row: 1, type: 'straight', rotation: 1 },
        { column: 5, row: 3, type: 'corner', rotation: 1 },
        { column: 6, row: 3, type: 'straight', rotation: 1 },
        { column: 7, row: 3, type: 'straight', rotation: 1 },
        { column: 8, row: 3, type: 'straight', rotation: 1 },
        { column: 9, row: 3, type: 'straight', rotation: 1 },
        { column: 10, row: 3, type: 'straight', rotation: 1 },
        { column: 11, row: 3, type: 'straight', rotation: 1 },
        { column: 12, row: 3, type: 'straight', rotation: 1 },
        { column: 13, row: 3, type: 'straight', rotation: 1 }
      ]
    },
    cells: [{ column: 4, row: 1 }, { column: 5, row: 1 }, { column: 5, row: 2 }],
    targets: [
      { candidateId: 'straight-b', rotation: 1 },
      { candidateId: 'corner-b', rotation: 3 },
      { candidateId: 'straight-b', rotation: 2 }
    ],
    candidates: [
      { id: 'straight-b', type: 'straight', rotation: 0, label: 'mission.pieceStraight' },
      { id: 'corner-b', type: 'corner', rotation: 2, label: 'mission.pieceCorner' },
      { id: 'junction-b', type: 't', rotation: 0, label: 'mission.pieceJunction' }
    ]
  },
  {
    description: 'mission.repairDescription3',
    eveMessage: 'mission.repairEve3',
    allowRotation: true,
    board: {
      columns: 16,
      rows: 6,
      start: { column: 0, row: 4 },
      goal: { column: 15, row: 4 },
      tiles: [
        { column: 0, row: 4, type: 'straight', rotation: 1 },
        { column: 1, row: 4, type: 'straight', rotation: 1 },
        { column: 2, row: 4, type: 'corner', rotation: 0 },
        { column: 2, row: 3, type: 'straight', rotation: 0 },
        { column: 2, row: 2, type: 'corner', rotation: 2 },
        { column: 3, row: 2, type: 'straight', rotation: 1 },
        { column: 4, row: 2, type: 'corner', rotation: 3 },
        { column: 6, row: 3, type: 'straight', rotation: 0 },
        { column: 6, row: 2, type: 'straight', rotation: 0 },
        { column: 6, row: 1, type: 'corner', rotation: 2 },
        { column: 7, row: 1, type: 'straight', rotation: 1 },
        { column: 8, row: 1, type: 'corner', rotation: 3 },
        { column: 8, row: 2, type: 'straight', rotation: 0 },
        { column: 8, row: 3, type: 'straight', rotation: 0 },
        { column: 8, row: 4, type: 'corner', rotation: 1 },
        { column: 9, row: 4, type: 'straight', rotation: 1 },
        { column: 10, row: 4, type: 'corner', rotation: 0 },
        { column: 10, row: 3, type: 'corner', rotation: 2 },
        { column: 11, row: 3, type: 'straight', rotation: 1 },
        { column: 12, row: 3, type: 'corner', rotation: 3 },
        { column: 12, row: 4, type: 'corner', rotation: 1 },
        { column: 13, row: 4, type: 'straight', rotation: 1 },
        { column: 14, row: 4, type: 'straight', rotation: 1 },
        { column: 15, row: 4, type: 'straight', rotation: 1 }
      ],
      branchTerminals: [
        { column: 5, row: 3, label: 'mission.branchControl' }
      ]
    },
    cells: [{ column: 4, row: 3 }, { column: 4, row: 4 }, { column: 5, row: 4 }, { column: 6, row: 4 }],
    targets: [
      { candidateId: 'junction-c', rotation: 1 },
      { candidateId: 'corner-c', rotation: 1 },
      { candidateId: 'straight-c', rotation: 1 },
      { candidateId: 'corner-c', rotation: 0 }
    ],
    candidates: [
      { id: 'straight-c', type: 'straight', rotation: 0, label: 'mission.pieceStraight' },
      { id: 'corner-c', type: 'corner', rotation: 0, label: 'mission.pieceCorner' },
      { id: 'junction-c', type: 't', rotation: 0, label: 'mission.pieceJunction' }
    ]
  }
];

const TOTAL_CONNECTIONS = STAGES.reduce((total, stage) => total + stage.targets.length, 0);

function createInitialState() {
  return {
    stage: 0,
    completed: STAGES.map(() => false),
    placements: STAGES[0].targets.map(() => null),
    activeSlot: 0
  };
}

function cloneState(state) {
  return JSON.parse(JSON.stringify(state));
}

function normalizeRotation(rotation) {
  return ((Number(rotation) || 0) % 4 + 4) % 4;
}

function getRailOrientation(type, rotation) {
  const normalizedRotation = normalizeRotation(rotation);
  return type === 'straight' ? normalizedRotation % 2 : normalizedRotation;
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
  const placements = STAGES[stage].targets.map((_, index) => {
    const placement = checkpoint.placements?.[index];
    if (!placement || !validCandidateIds.has(placement.candidateId)) {
      return null;
    }
    return { candidateId: placement.candidateId, rotation: normalizeRotation(placement.rotation) };
  });
  const activeSlot = Math.min(Math.max(Number(checkpoint.activeSlot) || 0, 0), STAGES[stage].targets.length - 1);
  return {
    stage,
    completed,
    placements,
    activeSlot
  };
}

export function createCoasterRepair(root, { onChange, onStageComplete } = {}) {
  const connectionLabels = root ? [...root.querySelectorAll('[data-repair-connection]')] : [];
  const connectionSegments = root ? [...root.querySelectorAll('[data-repair-segments] i')] : [];
  const route = root?.querySelector('.rail-repair__route');
  const stepProgress = root?.querySelector('[data-repair-step-progress]');
  const description = root?.querySelector('[data-repair-description]');
  const eveMessage = root?.querySelector('[data-repair-eve-message]');
  const board = root?.querySelector('[data-repair-board]');
  const candidates = root?.querySelector('[data-repair-candidates]');
  const resetButton = root?.querySelector('[data-repair-reset]');
  const confirmButton = root?.querySelector('[data-repair-confirm]');
  const status = root?.querySelector('[data-repair-status]');
  const transition = root?.querySelector('[data-repair-transition]');
  const transitionText = root?.querySelector('[data-repair-transition-text]');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let state = createInitialState();
  let locked = false;
  let replaceRequested = false;
  let invalidSlots = new Set();
  let eveMessageTimer = null;
  let statusTimer = null;
  let stageDialogueStarted = false;
  let statusMessage = { key: 'mission.repairReady', params: {}, tone: '' };
  let statusMessageVersion = 0;

  function getStage() {
    return STAGES[state.stage];
  }

  function getCandidate(candidateId) {
    return getStage().candidates.find((candidate) => candidate.id === candidateId) ?? null;
  }

  function getCandidatePreviewRotation(candidateId) {
    const candidate = getCandidate(candidateId);
    const activePlacement = state.placements[state.activeSlot];
    return normalizeRotation(activePlacement?.candidateId === candidateId ? activePlacement.rotation : candidate?.rotation ?? 0);
  }

  function createPiece(candidate, rotation, className) {
    const piece = document.createElement('span');
    piece.className = `${className} ${className}--${candidate.type}`;
    piece.dataset.rotation = String(normalizeRotation(rotation));
    const image = document.createElement('img');
    image.src = RAIL_ASSETS[candidate.type];
    image.alt = '';
    piece.append(image);
    return piece;
  }

  function positionBoardNode(node, cell, span = 1) {
    node.style.setProperty('--rail-column', String(cell.column + 1));
    node.style.setProperty('--rail-row', String(cell.row + 1));
    node.style.setProperty('--rail-span', String(span));
  }

  function positionFacilityNode(node, cell, anchorEdge) {
    const { columns, rows } = getStage().board;
    const anchorColumn = anchorEdge === 'right' ? cell.column + 1 : cell.column;
    node.style.setProperty('--rail-anchor-x', `${(anchorColumn / columns) * 100}%`);
    node.style.setProperty('--rail-anchor-y', `${((cell.row + .5) / rows) * 100}%`);
  }

  function setBoardDimensions(element) {
    if (!element) {
      return;
    }
    const { columns, rows } = getStage().board;
    element.style.setProperty('--rail-columns', String(columns));
    element.style.setProperty('--rail-rows', String(rows));
    element.style.setProperty('--rail-ratio', String(columns / rows));
    element.style.setProperty('--rail-aspect', `${columns} / ${rows}`);
  }

  function canConfirm() {
    return state.placements.length === getStage().targets.length && state.placements.every(Boolean);
  }

  function getIncorrectSlots() {
    return state.placements.reduce((incorrectSlots, placement, index) => {
      const target = getStage().targets[index];
      const candidate = placement ? getCandidate(placement.candidateId) : null;
      const targetCandidate = getCandidate(target.candidateId);
      const matchesType = candidate && targetCandidate && candidate.type === targetCandidate.type;
      const matchesDirection = matchesType && getRailOrientation(candidate.type, placement.rotation) === getRailOrientation(targetCandidate.type, target.rotation);
      if (!matchesType || !matchesDirection) {
        incorrectSlots.push(index);
      }
      return incorrectSlots;
    }, []);
  }

  function notify() {
    onChange?.(cloneState(state));
  }

  function clearTyping(type) {
    const element = type === 'eve' ? eveMessage : status;
    const timer = type === 'eve' ? eveMessageTimer : statusTimer;
    window.clearInterval(timer);
    if (type === 'eve') {
      eveMessageTimer = null;
    } else {
      statusTimer = null;
    }
    element?.classList.remove('is-typing');
    element?.setAttribute('aria-busy', 'false');
  }

  function typeMessage(element, message, type, onComplete = null) {
    clearTyping(type);
    if (!element) {
      onComplete?.();
      return;
    }
    if (prefersReducedMotion || !message) {
      element.textContent = message;
      onComplete?.();
      return;
    }
    const characters = Array.from(message);
    let characterIndex = 0;
    element.textContent = '';
    element.classList.add('is-typing');
    element.setAttribute('aria-busy', 'true');
    const timer = window.setInterval(() => {
      element.textContent += characters[characterIndex];
      characterIndex += 1;
      if (characterIndex < characters.length) {
        return;
      }
      clearTyping(type);
      onComplete?.();
    }, 34);
    if (type === 'eve') {
      eveMessageTimer = timer;
    } else {
      statusTimer = timer;
    }
  }

  function setStatusTone(tone = '') {
    status?.classList.toggle('is-error', tone === 'error');
  }

  function setStatusMessage(key, params = {}, tone = '') {
    statusMessage = { key, params, tone };
    statusMessageVersion += 1;
    setStatusTone(tone);
    typeMessage(status, t(key, params), 'status');
  }

  function prepareStageDialogue(key = 'mission.repairReady', params = {}) {
    clearTyping('eve');
    clearTyping('status');
    stageDialogueStarted = false;
    statusMessage = { key, params, tone: '' };
    statusMessageVersion += 1;
    setStatusTone();
    if (eveMessage) {
      eveMessage.textContent = '';
    }
    if (status) {
      status.textContent = '';
    }
  }

  function startStageDialogue() {
    if (stageDialogueStarted) {
      return;
    }
    stageDialogueStarted = true;
    const queuedStatusVersion = statusMessageVersion;
    typeMessage(eveMessage, t(getStage().eveMessage), 'eve', () => {
      if (queuedStatusVersion === statusMessageVersion) {
        typeMessage(status, t(statusMessage.key, statusMessage.params), 'status');
      }
    });
  }

  function refreshDialogueLanguage() {
    const wasStarted = stageDialogueStarted;
    clearTyping('eve');
    clearTyping('status');
    if (!wasStarted) {
      if (eveMessage) {
        eveMessage.textContent = '';
      }
      if (status) {
        status.textContent = '';
      }
      return;
    }
    if (eveMessage) {
      eveMessage.textContent = t(getStage().eveMessage);
    }
    if (status) {
      setStatusTone(statusMessage.tone);
      status.textContent = t(statusMessage.key, statusMessage.params);
    }
  }

  function renderBoard() {
    if (!board) {
      return;
    }
    const stage = getStage();
    const boardNodes = stage.board.tiles.map((tile) => {
      const node = document.createElement('span');
      node.className = 'rail-repair__tile';
      positionBoardNode(node, tile);
      node.append(createPiece(tile, tile.rotation, 'rail-repair__piece'));
      return node;
    });
    const isComplete = state.completed[state.stage];
    stage.cells.forEach((cell, slotIndex) => {
      const slot = document.createElement(isComplete ? 'span' : 'button');
      const placement = isComplete ? stage.targets[slotIndex] : state.placements[slotIndex];
      const candidate = placement ? stage.candidates.find((item) => item.id === placement.candidateId) : null;
      const isInvalid = invalidSlots.has(slotIndex);
      slot.className = 'rail-repair__slot';
      slot.dataset.slotNumber = String(slotIndex + 1).padStart(2, '0');
      slot.classList.toggle('is-current', !isComplete);
      slot.classList.toggle('is-complete', isComplete);
      slot.classList.toggle('is-error', isInvalid);
      if (!isComplete) {
        slot.type = 'button';
        slot.dataset.repairSlot = String(slotIndex);
        slot.disabled = locked;
        slot.setAttribute('aria-pressed', String(state.activeSlot === slotIndex));
        slot.setAttribute('aria-label', t('mission.slotLabel', { number: slotIndex + 1 }));
        if (isInvalid) {
          slot.setAttribute('aria-invalid', 'true');
        }
      } else {
        slot.setAttribute('aria-hidden', 'true');
      }
      positionBoardNode(slot, cell);
      if (candidate) {
        slot.append(createPiece(candidate, placement.rotation, 'rail-repair__piece'));
      } else {
        const empty = document.createElement('span');
        empty.className = 'rail-repair__slot-empty';
        empty.textContent = String(slotIndex + 1).padStart(2, '0');
        slot.append(empty);
      }
      boardNodes.push(slot);
    });
    const start = document.createElement('span');
    start.className = 'rail-repair__endpoint rail-repair__endpoint--start';
    const startTitle = document.createElement('strong');
    const startName = document.createElement('small');
    start.setAttribute('aria-hidden', 'true');
    startTitle.setAttribute('aria-hidden', 'true');
    startName.setAttribute('aria-hidden', 'true');
    startTitle.textContent = 'START';
    startName.textContent = t('mission.startPoint');
    start.append(startTitle, startName);
    const goal = document.createElement('span');
    goal.className = 'rail-repair__endpoint rail-repair__endpoint--goal';
    const goalTitle = document.createElement('strong');
    const goalName = document.createElement('small');
    goal.setAttribute('aria-hidden', 'true');
    goalTitle.setAttribute('aria-hidden', 'true');
    goalName.setAttribute('aria-hidden', 'true');
    goalTitle.textContent = 'GOAL';
    goalName.textContent = t('mission.goalPoint');
    goal.append(goalTitle, goalName);
    const station = document.createElement('span');
    station.className = 'rail-repair__station';
    station.setAttribute('role', 'img');
    station.setAttribute('aria-label', t('mission.startPoint'));
    const train = document.createElement('span');
    train.className = 'rail-repair__train';
    train.setAttribute('aria-hidden', 'true');
    station.append(start, train);
    positionFacilityNode(station, stage.board.start, 'right');
    boardNodes.push(station);
    const gate = document.createElement('span');
    gate.className = 'rail-repair__gate';
    gate.setAttribute('role', 'img');
    gate.setAttribute('aria-label', t('mission.goalPoint'));
    gate.append(goal);
    positionFacilityNode(gate, stage.board.goal, 'left');
    boardNodes.push(gate);
    stage.board.branchTerminals?.forEach((cell) => {
      const terminal = document.createElement('span');
      const label = document.createElement('small');
      terminal.className = 'rail-repair__branch-terminal';
      terminal.setAttribute('role', 'img');
      terminal.setAttribute('aria-label', t(cell.label));
      label.setAttribute('aria-hidden', 'true');
      label.textContent = t(cell.label);
      terminal.append(label);
      positionBoardNode(terminal, cell);
      boardNodes.push(terminal);
    });
    setBoardDimensions(board);
    board.replaceChildren(...boardNodes);
  }

  function renderCandidates() {
    if (!candidates) {
      return;
    }
    candidates.dataset.candidateCount = String(getStage().candidates.length);
    candidates.style.setProperty('--candidate-count', String(getStage().candidates.length));
    candidates.replaceChildren(...getStage().candidates.map((candidate, index) => {
      const item = document.createElement('div');
      const button = document.createElement('button');
      const rotateCandidateButton = document.createElement('button');
      const activePlacement = state.placements[state.activeSlot];
      const isActiveCandidate = activePlacement?.candidateId === candidate.id;
      const candidateKey = String.fromCharCode(65 + index);
      const candidateName = t(candidate.label);
      item.className = 'rail-repair__candidate';
      item.classList.toggle('has-rotation', getStage().allowRotation);
      button.type = 'button';
      button.className = 'rail-repair__candidate-select';
      button.dataset.repairCandidate = candidate.id;
      button.disabled = locked;
      button.setAttribute('aria-label', `${candidateKey} ${candidateName}`);
      rotateCandidateButton.type = 'button';
      rotateCandidateButton.className = 'rail-repair__candidate-rotate';
      rotateCandidateButton.dataset.repairCandidateRotate = candidate.id;
      rotateCandidateButton.hidden = !getStage().allowRotation;
      rotateCandidateButton.disabled = locked || !isActiveCandidate;
      rotateCandidateButton.setAttribute('aria-label', t('mission.rotateCandidate', { piece: candidateName }));
      rotateCandidateButton.innerHTML = '<span aria-hidden="true">↻</span>';
      const label = document.createElement('span');
      label.className = 'rail-repair__candidate-key';
      label.textContent = candidateKey;
      const copy = document.createElement('span');
      copy.className = 'rail-repair__candidate-copy';
      const name = document.createElement('strong');
      name.textContent = candidateName;
      copy.append(name);
      button.append(label, createPiece(candidate, getCandidatePreviewRotation(candidate.id), 'rail-repair__piece'), copy);
      item.append(button, rotateCandidateButton);
      return item;
    }));
  }

  function render() {
    const stage = getStage();
    const completedConnections = STAGES.reduce((total, item, index) => total + (state.completed[index] ? item.targets.length : 0), 0);
    const placedCount = state.placements.filter(Boolean).length;
    if (root) {
      root.dataset.repairStep = String(state.stage + 1);
    }
    connectionLabels.forEach((label) => { label.textContent = `${completedConnections} / ${TOTAL_CONNECTIONS}`; });
    connectionSegments.forEach((segment, index) => { segment.classList.toggle('is-active', index < completedConnections); });
    if (route) {
      route.setAttribute('aria-label', t('mission.networkStageLabel', { current: state.stage + 1, total: STAGES.length }));
    }
    if (stepProgress) {
      stepProgress.textContent = t('mission.stepProgress', { current: String(state.stage + 1).padStart(2, '0'), total: String(STAGES.length).padStart(2, '0') });
    }
    if (description) {
      description.textContent = t(stage.description);
    }
    renderBoard();
    renderCandidates();
    if (resetButton) {
      resetButton.disabled = locked || placedCount === 0;
    }
    if (confirmButton) {
      confirmButton.disabled = locked || !canConfirm();
    }
  }

  function selectCandidate(candidateId) {
    const candidate = getCandidate(candidateId);
    if (locked || !candidate) {
      return;
    }
    const activePlacement = state.placements[state.activeSlot];
    if (activePlacement?.candidateId === candidateId) {
      const clearedSlot = state.activeSlot;
      state.placements[clearedSlot] = null;
      invalidSlots.delete(clearedSlot);
      replaceRequested = false;
      setStatusMessage('mission.pieceRemoved', { number: clearedSlot + 1 });
      render();
      notify();
      return;
    }
    const nextEmptySlot = state.placements.findIndex((placement) => !placement);
    const targetSlot = !replaceRequested && activePlacement && nextEmptySlot !== -1 ? nextEmptySlot : state.activeSlot;
    state.activeSlot = targetSlot;
    state.placements[targetSlot] = { candidateId, rotation: normalizeRotation(candidate.rotation) };
    invalidSlots.delete(targetSlot);
    replaceRequested = false;
    const statusKey = canConfirm() ? 'mission.allPiecesPlaced' : getStage().allowRotation ? 'mission.pieceSelected' : 'mission.pieceSelectedBasic';
    setStatusMessage(statusKey);
    render();
    notify();
  }

  function selectSlot(index) {
    if (locked || !Number.isInteger(index) || index < 0 || index >= getStage().targets.length) {
      return;
    }
    state.activeSlot = index;
    replaceRequested = true;
    setStatusMessage('mission.slotSelected', { number: String(index + 1).padStart(2, '0') });
    render();
    notify();
  }

  function rotateCandidate(candidateId) {
    const stage = getStage();
    const placement = state.placements[state.activeSlot];
    if (locked || !stage.allowRotation || placement?.candidateId !== candidateId) {
      return;
    }
    replaceRequested = false;
    placement.rotation = (placement.rotation + 1) % 4;
    invalidSlots.delete(state.activeSlot);
    setStatusMessage('mission.pieceRotated');
    render();
    notify();
  }

  function resetCurrentStage() {
    if (locked || !state.placements.some(Boolean)) {
      return;
    }
    state.placements = getStage().targets.map(() => null);
    state.activeSlot = 0;
    replaceRequested = false;
    invalidSlots.clear();
    root?.classList.remove('is-repair-error');
    setStatusMessage('mission.stageReset');
    render();
    notify();
  }

  function confirm() {
    if (locked || !canConfirm()) {
      return;
    }
    const incorrectSlots = getIncorrectSlots();
    if (incorrectSlots.length) {
      invalidSlots = new Set(incorrectSlots);
      state.activeSlot = incorrectSlots[0];
      replaceRequested = true;
      const slotReferences = incorrectSlots.map((index) => t('mission.slotReference', { number: String(index + 1).padStart(2, '0') })).join(', ');
      setStatusMessage('mission.repairErrorSlots', { slots: slotReferences }, 'error');
      root?.classList.remove('is-repair-success');
      root?.classList.add('is-repair-error');
      render();
      notify();
      board?.querySelector(`[data-repair-slot="${state.activeSlot}"]`)?.focus();
      window.setTimeout(() => root?.classList.remove('is-repair-error'), 450);
      return;
    }
    invalidSlots.clear();
    locked = true;
    state.completed[state.stage] = true;
    setStatusMessage('mission.repairSuccess', { number: state.stage + 1 });
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
    state.placements = getStage().targets.map(() => null);
    state.activeSlot = 0;
    locked = false;
    replaceRequested = false;
    invalidSlots.clear();
    root?.classList.remove('is-repair-success');
    prepareStageDialogue('mission.nextStage', { number: state.stage + 1 });
    render();
    notify();
    startStageDialogue();
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
    replaceRequested = false;
    invalidSlots.clear();
    root?.classList.remove('is-repair-error', 'is-repair-success');
    showTransition(false);
    prepareStageDialogue();
    render();
  }

  candidates?.addEventListener('click', (event) => {
    const rotateCandidateButton = event.target.closest('[data-repair-candidate-rotate]');
    if (rotateCandidateButton) {
      rotateCandidate(rotateCandidateButton.dataset.repairCandidateRotate);
      return;
    }
    const candidate = event.target.closest('[data-repair-candidate]');
    if (candidate) {
      selectCandidate(candidate.dataset.repairCandidate);
    }
  });
  resetButton?.addEventListener('click', resetCurrentStage);
  board?.addEventListener('click', (event) => {
    const slot = event.target.closest('[data-repair-slot]');
    if (slot) {
      selectSlot(Number(slot.dataset.repairSlot));
    }
  });
  confirmButton?.addEventListener('click', confirm);
  reset();

  return {
    advance,
    focus: () => {
      startStageDialogue();
      candidates?.querySelector('button')?.focus();
    },
    getCheckpoint: () => cloneState(state),
    isComplete: () => state.completed.every(Boolean),
    refreshLanguage: () => {
      render();
      refreshDialogueLanguage();
    },
    reset,
    showTransition
  };
}
