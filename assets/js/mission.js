import { t } from './locales.js';
import { getMissionRestoreState } from './mission-state.js';
import { readProgress, updateMissionProgress } from './progress.js';
import { createModalController } from './ui.js';

export function createMissionController({ createGame, duration = 90, getExplorer, onComplete, onControlRoom, onExit, onRecord, showToast, testSteps = [] } = {}) {
  const dialog = document.querySelector('#mission-dialog');
  const panels = dialog ? [...dialog.querySelectorAll('[data-mission-phase]')] : [];
  const timer = dialog?.querySelector('[data-mission-timer]');
  const status = dialog?.querySelector('[data-mission-status]');
  const startButton = dialog?.querySelector('[data-mission-start]');
  const guideButton = dialog?.querySelector('[data-mission-guide]');
  const guideCloseButton = dialog?.querySelector('[data-mission-guide-close]');
  const guideReturnButton = dialog?.querySelector('[data-mission-guide-return]');
  const guideDemo = dialog?.querySelector('[data-guide-demo]');
  const demoSlot = guideDemo?.querySelector('[data-guide-slot]');
  const demoPlace = guideDemo?.querySelector('[data-guide-place]');
  const demoRotate = guideDemo?.querySelector('[data-guide-rotate]');
  const demoReset = guideDemo?.querySelector('[data-guide-reset]');
  let demoStep = 0;
  let demoRotation = 0;
  const pauseButton = dialog?.querySelector('[data-mission-pause]');
  const countdownPanel = dialog?.querySelector('[data-mission-phase="countdown"]');
  const countdownElement = dialog?.querySelector('[data-mission-countdown]');
  const countdownMessage = dialog?.querySelector('[data-mission-countdown-message]');
  const gameRoot = dialog?.querySelector('[data-mission-game]');
  const testingStatus = dialog?.querySelector('[data-testing-status]');
  const testingItems = new Map(testSteps.map((step) => [step, dialog?.querySelector(`[data-test-step="${step}"]`)]));
  let facility = null;
  let progress = null;
  let phase = 'guide';
  let resumeMode = 'playing';
  let remaining = duration;
  let timerId = null;
  let countdownId = null;
  let countdownCompletionId = null;
  let stageTransitionId = null;
  let game = null;
  let testingTimerIds = [];
  let isPreviewMode = false;
  let awardPending = false;
  let completionTimer = null;
  const modal = createModalController(dialog, { onCancel: handleCancel, onClose: () => {
    if (game && ['playing', 'testing'].includes(phase)) {
      save({ phase: 'paused', checkpoint: getCheckpoint(phase) });
    }
    stopActivity();
    isPreviewMode = false;
    onControlRoom?.();
  } });

  function stopActivity() {
    stopTimer();
    stopCountdown();
    stopStageTransition();
    stopTesting();
    window.clearTimeout(completionTimer);
  }

  function handleCancel() {
    if (phase === 'playing') {
      pause();
    } else if (phase === 'guide') {
      returnFromGuide();
    } else {
      close();
    }
  }

  function save(updates) {
    if (isPreviewMode) {
      return;
    }
    progress = updateMissionProgress(progress, facility.id, updates);
  }

  function getCheckpoint(mode = phase) {
    return { ...game.getCheckpoint(), remaining, mode };
  }

  function renderTimer() {
    if (timer) {
      const minutes = Math.floor(remaining / 60);
      const seconds = remaining % 60;
      timer.closest('.mission-flow__time').classList.toggle('is-urgent', remaining > 0 && remaining <= 15);
      timer.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
  }

  function stopTimer() {
    window.clearInterval(timerId);
    timerId = null;
  }

  function stopCountdown() {
    window.clearInterval(countdownId);
    window.clearTimeout(countdownCompletionId);
    countdownId = null;
    countdownCompletionId = null;
  }

  function stopStageTransition() {
    window.clearTimeout(stageTransitionId);
    stageTransitionId = null;
    game?.showTransition(false);
  }

  function stopTesting() {
    testingTimerIds.forEach((id) => window.clearTimeout(id));
    testingTimerIds = [];
  }

  function setPhase(nextPhase, { saveState = true, checkpointMode = nextPhase } = {}) {
    phase = nextPhase;
    const isResult = ['paused', 'testing', 'failed', 'completed'].includes(phase);
    panels.forEach((panel) => {
      const isBoard = panel.dataset.missionPhase === 'playing';
      panel.hidden = panel.dataset.missionPhase !== phase && !(isResult && isBoard);
      panel.inert = isResult && isBoard;
      if (isResult && isBoard) {
        panel.setAttribute('aria-hidden', 'true');
      } else {
        panel.removeAttribute('aria-hidden');
      }
    });
    dialog.classList.toggle('is-result', isResult);
    dialog.querySelector('.mission-flow__header').inert = isResult;
    dialog.dataset.phase = phase;
    const title = dialog.querySelector('#mission-title');
    title.dataset.i18n = phase === 'guide' ? 'mission.status.guide' : 'mission.title';
    title.textContent = t(title.dataset.i18n);
    const visibleTitle = panels.find((panel) => panel.dataset.missionPhase === phase)?.querySelector('h3[id]');
    dialog.setAttribute('aria-labelledby', visibleTitle?.id || 'mission-title');
    if (status) {
      status.textContent = t(`mission.status.${phase}`);
    }
    if (!saveState) {
      return;
    }
    const checkpointPhases = new Set(['playing', 'paused', 'testing', 'failed']);
    save({ phase, checkpoint: checkpointPhases.has(phase) ? getCheckpoint(checkpointMode) : null });
  }

  function fail() {
    stopTimer();
    resumeMode = 'playing';
    setPhase('failed', { checkpointMode: 'playing' });
    dialog?.querySelector('[data-mission-phase="failed"] [data-mission-restart]')?.focus();
  }

  function startTimer() {
    stopTimer();
    timerId = window.setInterval(() => {
      remaining -= 1;
      renderTimer();
      if (remaining === 15) {
        showToast?.(t('mission.timeUrgent'));
      }
      if (remaining <= 0) {
        fail();
      } else if (remaining % 3 === 0) {
        save({ phase: 'playing', checkpoint: getCheckpoint('playing') });
      }
    }, 1000);
  }

  function renderCountdown(nextStep, nextValue) {
    if (!countdownPanel || !countdownElement) {
      return;
    }
    countdownPanel.classList.remove('is-changing');
    countdownPanel.setAttribute('data-countdown-step', nextStep);
    countdownElement.textContent = nextValue;
    void countdownPanel.offsetWidth;
    countdownPanel.classList.add('is-changing');
  }

  function beginCountdown({ countAttempt = true } = {}) {
    stopCountdown();
    stopStageTransition();
    setPhase('countdown');
    if (countAttempt) {
      save({ attempts: (progress.missions[facility.id].attempts ?? 0) + 1 });
    }
    let count = 3;
    countdownPanel?.classList.remove('is-online');
    renderCountdown(String(count), count);
    if (countdownMessage) {
      countdownMessage.textContent = t('mission.countdown');
    }
    countdownId = window.setInterval(() => {
      count -= 1;
      if (count <= 0) {
        window.clearInterval(countdownId);
        countdownId = null;
        countdownPanel?.classList.add('is-online');
        renderCountdown('ready', 'ONLINE');
        if (countdownMessage) {
          countdownMessage.textContent = t('mission.countdownReady');
        }
        countdownCompletionId = window.setTimeout(() => {
          countdownCompletionId = null;
          remaining = duration;
          resumeMode = 'playing';
          game.reset();
          renderTimer();
          setPhase('playing');
          startTimer();
          game.focus();
        }, 650);
      } else {
        renderCountdown(String(count), count);
      }
    }, 800);
  }

  function pause() {
    if (phase !== 'playing') {
      return;
    }
    stopTimer();
    stopStageTransition();
    resumeMode = 'playing';
    setPhase('paused', { checkpointMode: resumeMode });
    dialog?.querySelector('[data-mission-resume]')?.focus();
  }

  function showGuide() {
    if (phase !== 'playing') {
      return;
    }
    stopTimer();
    stopStageTransition();
    resumeMode = 'playing';
    save({ phase: 'paused', checkpoint: getCheckpoint('playing') });
    if (startButton) {
      startButton.hidden = true;
    }
    if (guideReturnButton) {
      guideReturnButton.hidden = false;
    }
    if (guideCloseButton) {
      guideCloseButton.hidden = false;
    }
    setPhase('guide', { saveState: false });
    renderDemo(0);
    guideReturnButton?.focus();
  }

  function returnFromGuide() {
    if (phase !== 'guide') {
      return;
    }
    if (guideReturnButton?.hidden) {
      close('control-room');
      return;
    }
    if (startButton) {
      startButton.hidden = false;
    }
    if (guideCloseButton) {
      guideCloseButton.hidden = true;
    }
    guideReturnButton.hidden = true;
    resume();
  }

  function resetTestingView() {
    renderTestingStep(-1);
    if (testingStatus) {
      testingStatus.textContent = '';
    }
  }

  function complete() {
    stopTimer();
    stopTesting();
    setPhase('completed', { saveState: false });
    if (!isPreviewMode) {
      onComplete?.(facility);
      awardPending = true;
      completionTimer = window.setTimeout(openRecord, 5000);
    }
    dialog?.querySelector('[data-mission-record]')?.focus();
  }

  function renderTestingStep(index) {
    testingItems.forEach((item, step) => {
      const stepIndex = testSteps.indexOf(step);
      item?.classList.toggle('is-active', stepIndex === index);
      item?.classList.toggle('is-complete', stepIndex < index);
      if (!item) {
        return;
      }
      const state = stepIndex < index ? 'done' : stepIndex === index ? 'active' : 'pending';
      if (state === 'active') {
        item.setAttribute('aria-current', 'step');
      } else {
        item.removeAttribute('aria-current');
      }
      const marker = item.querySelector('[aria-hidden]');
      if (marker) {
        marker.textContent = state === 'done' ? '✓' : '';
      }
      const label = item.querySelector('[data-test-state]');
      if (label) {
        label.dataset.i18n = `mission.testingState.${state}`;
        label.textContent = t(label.dataset.i18n);
      }
    });
    if (testingStatus && index >= 0 && index < testSteps.length) {
      testingStatus.textContent = t(`mission.testingStatus.${testSteps[index]}`);
    }
  }

  function beginTesting() {
    stopTimer();
    stopTesting();
    resumeMode = 'testing';
    setPhase('testing', { checkpointMode: 'testing' });
    resetTestingView();
    testSteps.forEach((_, index) => {
      testingTimerIds.push(window.setTimeout(() => {
        renderTestingStep(index);
      }, index * 900));
    });
    testingTimerIds.push(window.setTimeout(() => {
      renderTestingStep(testSteps.length);
      complete();
    }, testSteps.length * 900 + 450));
  }

  function resume() {
    const checkpoint = game.getCheckpoint();
    if (!game.isComplete() && checkpoint.completed?.[checkpoint.stage]) {
      game.advance();
    }
    if (resumeMode === 'testing' || game.isComplete()) {
      beginTesting();
      return;
    }
    setPhase('playing', { checkpointMode: 'playing' });
    startTimer();
    game.focus();
  }

  function restart() {
    stopCountdown();
    stopStageTransition();
    stopTesting();
    remaining = duration;
    if (phase === 'failed') {
      game.reset(game.getCheckpoint());
    } else {
      game.reset();
    }
    resumeMode = 'playing';
    renderTimer();
    setPhase('playing', { checkpointMode: 'playing' });
    save({ attempts: (progress.missions[facility.id].attempts ?? 0) + 1, checkpoint: getCheckpoint('playing') });
    startTimer();
    game.focus();
  }

  function handleStageComplete({ stage, complete: allStagesComplete }) {
    stopTimer();
    stopStageTransition();
    game.showTransition(true, stage + 1);
    if (status) {
      status.textContent = t('mission.sectionRestored');
    }
    save({ phase: 'playing', checkpoint: getCheckpoint('playing') });
    stageTransitionId = window.setTimeout(() => {
      stageTransitionId = null;
      game.showTransition(false);
      if (allStagesComplete) {
        beginTesting();
        return;
      }
      game.advance();
      if (status) {
        status.textContent = t('mission.status.playing');
      }
      save({ phase: 'playing', checkpoint: getCheckpoint('playing') });
      startTimer();
    }, 1050);
  }

  function open(nextFacility, opener, { previewPhase = '' } = {}) {
    renderDemo(0);
    stopActivity();
    awardPending = previewPhase === 'completed';
    facility = nextFacility;
    isPreviewMode = ['guide', 'countdown', 'testing', 'completed'].includes(previewPhase);
    if (startButton) {
      startButton.hidden = false;
    }
    if (guideReturnButton) {
      guideReturnButton.hidden = true;
    }
    if (guideCloseButton) {
      guideCloseButton.hidden = false;
    }
    dialog.dataset.facility = facility.id;
    progress = readProgress(getExplorer?.());
    const savedMission = progress.missions[facility.id];
    remaining = savedMission.checkpoint?.remaining ?? duration;
    game ??= createGame(gameRoot, {
      onChange: () => {
        if (phase === 'playing') {
          save({ phase, checkpoint: getCheckpoint('playing') });
        }
      },
      onStageComplete: handleStageComplete
    });
    if (previewPhase === 'testing') {
      game.showCompleted();
      setPhase('testing', { saveState: false });
      resetTestingView();
      renderTestingStep(Math.min(1, testSteps.length - 1));
      modal.open({ focusTarget: dialog, opener });
      return;
    }
    if (previewPhase === 'completed' || !isPreviewMode && progress.facilities[facility.id]?.status === 'completed') {
      game.showCompleted();
      setPhase('completed', { saveState: false });
      modal.open({ focusTarget: dialog.querySelector('[data-mission-record]'), opener });
      return;
    }
    if (isPreviewMode) {
      remaining = duration;
      resumeMode = 'playing';
      game.reset();
      renderTimer();
      setPhase('guide', { saveState: false });
      modal.open({ focusTarget: guideCloseButton, opener });
      if (previewPhase === 'countdown') {
        window.setTimeout(beginCountdown, 0);
      }
      return;
    }
    game.reset(savedMission.checkpoint);
    renderTimer();
    const restoreState = getMissionRestoreState(savedMission);
    resumeMode = restoreState.resumeMode;
    setPhase(restoreState.phase, { saveState: !restoreState.shouldRestore, checkpointMode: resumeMode });
    const focusTarget = restoreState.phase === 'failed'
      ? dialog.querySelector('[data-mission-phase="failed"] [data-mission-restart]')
      : restoreState.phase === 'paused'
        ? dialog.querySelector('[data-mission-resume]')
        : guideCloseButton;
    modal.open({ focusTarget, opener });
    if (restoreState.phase === 'countdown') {
      window.setTimeout(() => beginCountdown({ countAttempt: false }), 0);
    }
  }

  function renderDemo(step = demoStep) {
    if (!guideDemo) {
      return;
    }
    demoStep = step;
    if (step < 2) {
      demoRotation = 0;
    }
    demoSlot.style.setProperty('--demo-rotation', `${demoRotation * 90}deg`);
    guideDemo.classList.toggle('is-placed', step >= 2);
    guideDemo.classList.toggle('is-connected', step === 3);
    demoSlot.setAttribute('aria-pressed', String(step >= 1));
    demoPlace.disabled = step === 0;
    demoPlace.dataset.i18n = step >= 2 ? 'mission.demoRemove' : 'mission.demoPlace';
    demoPlace.textContent = t(demoPlace.dataset.i18n);
    demoRotate.disabled = step < 2;
    demoReset.hidden = step === 0;
    const feedback = guideDemo.querySelector('[data-guide-feedback]');
    const message = feedback.querySelector('span');
    feedback.dataset.sizingText = t('mission.demoConnected');
    message.dataset.i18n = `mission.${['demoHint', 'demoSelected', 'demoPlaced', 'demoConnected'][step]}`;
    message.textContent = t(message.dataset.i18n);
  }

  startButton?.addEventListener('click', beginCountdown);
  demoSlot?.addEventListener('click', () => {
    if (demoStep === 0) {
      renderDemo(1);
    }
  });
  demoPlace?.addEventListener('click', () => {
    renderDemo(demoStep >= 2 ? 1 : 2);
  });
  demoRotate?.addEventListener('click', () => {
    demoRotation += 1;
    renderDemo(demoRotation % 2 ? 3 : 2);
  });
  demoReset?.addEventListener('click', () => {
    renderDemo(0);
    demoSlot.focus();
  });
  guideButton?.addEventListener('click', showGuide);
  guideCloseButton?.addEventListener('click', returnFromGuide);
  guideReturnButton?.addEventListener('click', returnFromGuide);
  pauseButton?.addEventListener('click', pause);
  dialog?.querySelector('[data-mission-resume]')?.addEventListener('click', resume);
  dialog?.querySelectorAll('[data-mission-restart]').forEach((button) => button.addEventListener('click', restart));
  dialog?.querySelector('[data-mission-control-room]')?.addEventListener('click', () => {
    close('control-room');
  });
  dialog?.querySelectorAll('[data-mission-exit]').forEach((button) => button.addEventListener('click', () => {
    close('exit');
    onExit?.();
  }));
  function openRecord() {
    window.clearTimeout(completionTimer);
    if (!modal.isOpen()) {
      return;
    }
    const award = awardPending;
    awardPending = false;
    close('record');
    window.setTimeout(() => onRecord?.({ award }), 0);
  }

  dialog?.querySelector('[data-mission-record]')?.addEventListener('click', openRecord);

  function refreshLanguage() {
    renderDemo();
    setPhase(phase, { saveState: false });
    game?.refreshLanguage();
  }

  function close(reason = 'navigation') {
    stopActivity();
    modal.close(reason);
  }

  return { close, isOpen: modal.isOpen, open, refreshLanguage };
}
