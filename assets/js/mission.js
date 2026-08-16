import { createCoasterRepair } from './coaster-repair.js';
import { t } from './locales.js';
import { readProgress, updateMissionProgress } from './progress.js';
import { createModalController } from './ui.js';

const MISSION_DURATION = 90;
const TEST_STEPS = ['connection', 'trial', 'safety'];

export function createMissionController({ getExplorer, onComplete, onExit, onRecord } = {}) {
  const dialog = document.querySelector('#mission-dialog');
  const panels = dialog ? [...dialog.querySelectorAll('[data-mission-phase]')] : [];
  const timer = dialog?.querySelector('[data-mission-timer]');
  const status = dialog?.querySelector('[data-mission-status]');
  const startButton = dialog?.querySelector('[data-mission-start]');
  const pauseButton = dialog?.querySelector('[data-mission-pause]');
  const countdownPanel = dialog?.querySelector('[data-mission-phase="countdown"]');
  const countdownElement = dialog?.querySelector('[data-mission-countdown]');
  const countdownMessage = dialog?.querySelector('[data-mission-countdown-message]');
  const repairRoot = dialog?.querySelector('[data-coaster-repair]');
  const testingStatus = dialog?.querySelector('[data-testing-status]');
  const testingItems = new Map(TEST_STEPS.map((step) => [step, dialog?.querySelector(`[data-test-step="${step}"]`)]));
  let facility = null;
  let progress = null;
  let phase = 'guide';
  let resumeMode = 'playing';
  let remaining = MISSION_DURATION;
  let timerId = null;
  let countdownId = null;
  let countdownCompletionId = null;
  let stageTransitionId = null;
  let repair = null;
  let testingTimerIds = [];
  const modal = createModalController(dialog, { onClose: () => {
    stopTimer();
    stopCountdown();
    stopStageTransition();
    stopTesting();
  } });

  function save(updates) {
    progress = updateMissionProgress(progress, facility.id, updates);
  }

  function getCheckpoint(mode = phase) {
    return { ...repair.getCheckpoint(), remaining, mode };
  }

  function renderTimer() {
    if (timer) {
      const minutes = Math.floor(remaining / 60);
      const seconds = remaining % 60;
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
    repair?.showTransition(false);
  }

  function stopTesting() {
    testingTimerIds.forEach((id) => window.clearTimeout(id));
    testingTimerIds = [];
  }

  function setPhase(nextPhase, { saveState = true, checkpointMode = nextPhase } = {}) {
    phase = nextPhase;
    panels.forEach((panel) => { panel.hidden = panel.dataset.missionPhase !== phase; });
    dialog.dataset.phase = phase;
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
    dialog?.querySelector('[data-mission-restart]')?.focus();
  }

  function startTimer() {
    stopTimer();
    timerId = window.setInterval(() => {
      remaining -= 1;
      renderTimer();
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

  function beginCountdown() {
    stopCountdown();
    stopStageTransition();
    setPhase('countdown');
    save({ attempts: (progress.missions[facility.id].attempts ?? 0) + 1 });
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
          remaining = MISSION_DURATION;
          resumeMode = 'playing';
          repair.reset();
          renderTimer();
          setPhase('playing');
          startTimer();
          repair.focus();
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
    resumeMode = 'playing';
    setPhase('paused', { checkpointMode: resumeMode });
    dialog?.querySelector('[data-mission-resume]')?.focus();
  }

  function resetTestingView() {
    testingItems.forEach((item) => item?.classList.remove('is-active', 'is-complete'));
    if (testingStatus) {
      testingStatus.textContent = '';
    }
  }

  function complete() {
    stopTimer();
    stopTesting();
    setPhase('completed', { saveState: false });
    onComplete?.(facility);
    dialog?.querySelector('[data-mission-record]')?.focus();
  }

  function beginTesting() {
    stopTimer();
    stopTesting();
    resumeMode = 'testing';
    setPhase('testing', { checkpointMode: 'testing' });
    resetTestingView();
    TEST_STEPS.forEach((step, index) => {
      testingTimerIds.push(window.setTimeout(() => {
        const previousItem = testingItems.get(TEST_STEPS[index - 1]);
        previousItem?.classList.remove('is-active');
        previousItem?.classList.add('is-complete');
        const item = testingItems.get(step);
        item?.classList.add('is-active');
        if (testingStatus) {
          testingStatus.textContent = t(`mission.testingStatus.${step}`);
        }
      }, index * 900));
    });
    testingTimerIds.push(window.setTimeout(() => {
      const finalItem = testingItems.get(TEST_STEPS.at(-1));
      finalItem?.classList.remove('is-active');
      finalItem?.classList.add('is-complete');
      complete();
    }, TEST_STEPS.length * 900 + 450));
  }

  function resume() {
    if (resumeMode === 'testing' || repair.isComplete()) {
      beginTesting();
      return;
    }
    setPhase('playing', { checkpointMode: 'playing' });
    startTimer();
    repair.focus();
  }

  function restart() {
    stopCountdown();
    stopStageTransition();
    stopTesting();
    remaining = MISSION_DURATION;
    if (phase === 'failed') {
      repair.reset(repair.getCheckpoint());
    } else {
      repair.reset();
    }
    resumeMode = 'playing';
    renderTimer();
    setPhase('playing', { checkpointMode: 'playing' });
    save({ attempts: (progress.missions[facility.id].attempts ?? 0) + 1, checkpoint: getCheckpoint('playing') });
    startTimer();
    repair.focus();
  }

  function handleStageComplete({ stage, complete: allStagesComplete }) {
    stopTimer();
    stopStageTransition();
    repair.showTransition(true, stage + 1);
    if (status) {
      status.textContent = t('mission.sectionRestored');
    }
    save({ phase: 'playing', checkpoint: getCheckpoint('playing') });
    stageTransitionId = window.setTimeout(() => {
      stageTransitionId = null;
      repair.showTransition(false);
      if (allStagesComplete) {
        beginTesting();
        return;
      }
      repair.advance();
      if (status) {
        status.textContent = t('mission.status.playing');
      }
      save({ phase: 'playing', checkpoint: getCheckpoint('playing') });
      startTimer();
    }, 1050);
  }

  function open(nextFacility, opener) {
    stopTimer();
    stopCountdown();
    stopStageTransition();
    stopTesting();
    facility = nextFacility;
    dialog.dataset.facility = facility.id;
    progress = readProgress(getExplorer?.());
    const savedMission = progress.missions[facility.id];
    if (progress.facilities[facility.id]?.status === 'completed') {
      setPhase('completed', { saveState: false });
      modal.open({ focusTarget: dialog.querySelector('[data-mission-record]'), opener });
      return;
    }
    remaining = savedMission.checkpoint?.remaining ?? MISSION_DURATION;
    repair ??= createCoasterRepair(repairRoot, {
      onChange: () => {
        if (phase === 'playing') {
          save({ phase, checkpoint: getCheckpoint('playing') });
        }
      },
      onStageComplete: handleStageComplete
    });
    repair.reset(savedMission.checkpoint);
    renderTimer();
    const resumable = ['playing', 'paused', 'testing'].includes(savedMission.phase) && savedMission.checkpoint;
    resumeMode = savedMission.phase === 'testing' || savedMission.checkpoint?.mode === 'testing' ? 'testing' : 'playing';
    if (savedMission.phase === 'failed' && savedMission.checkpoint) {
      setPhase('failed', { saveState: false });
    } else {
      setPhase(resumable ? 'paused' : 'guide', { saveState: !resumable, checkpointMode: resumeMode });
    }
    modal.open({ focusTarget: savedMission.phase === 'failed' ? dialog.querySelector('[data-mission-restart]') : resumable ? dialog.querySelector('[data-mission-resume]') : startButton, opener });
  }

  startButton?.addEventListener('click', beginCountdown);
  pauseButton?.addEventListener('click', pause);
  dialog?.querySelector('[data-mission-resume]')?.addEventListener('click', resume);
  dialog?.querySelectorAll('[data-mission-restart]').forEach((button) => button.addEventListener('click', restart));
  dialog?.querySelectorAll('[data-mission-exit]').forEach((button) => button.addEventListener('click', () => {
    stopTimer();
    stopCountdown();
    stopStageTransition();
    stopTesting();
    modal.close('exit');
    onExit?.();
  }));
  dialog?.querySelector('[data-mission-record]')?.addEventListener('click', () => {
    modal.close('record');
    window.setTimeout(() => onRecord?.(), 0);
  });

  function refreshLanguage() {
    setPhase(phase, { saveState: false });
    repair?.refreshLanguage();
  }

  return { isOpen: modal.isOpen, open, refreshLanguage };
}
