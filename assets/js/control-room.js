import { getFacilityText } from './data.js';
import { createEveController } from './eve.js';
import { t } from './locales.js';
import { readProgress } from './progress.js';

const COASTER_STAGE_CONNECTIONS = [2, 3, 4];

function getCoasterProgress(progress, isCompleted) {
  if (isCompleted) {
    return { connections: 9, steps: 3 };
  }
  const completed = progress.missions.coaster?.checkpoint?.completed;
  if (!Array.isArray(completed)) {
    return { connections: 0, steps: 0 };
  }
  return completed.reduce((result, stageCompleted, index) => {
    if (stageCompleted) {
      result.connections += COASTER_STAGE_CONNECTIONS[index] ?? 0;
      result.steps += 1;
    }
    return result;
  }, { connections: 0, steps: 0 });
}

export function createControlRoomController({ getExplorer, onShowScreen, showToast } = {}) {
  const screen = document.querySelector('[data-screen="control-room"]');
  const title = document.querySelector('#control-room-title');
  const type = document.querySelector('#control-room-type');
  const alert = document.querySelector('[data-control-room-alert]');
  const status = document.querySelector('[data-control-room-status]');
  const objectiveEyebrow = document.querySelector('[data-control-room-objective-eyebrow]');
  const objectiveTitle = document.querySelector('[data-control-room-objective-title]');
  const objective = document.querySelector('[data-control-room-objective]');
  const objectiveSteps = [
    { title: document.querySelector('[data-control-room-objective-inspect]'), description: document.querySelector('[data-control-room-objective-inspect-help]'), key: 'Inspect' },
    { title: document.querySelector('[data-control-room-objective-repair]'), description: document.querySelector('[data-control-room-objective-repair-help]'), key: 'Repair' },
    { title: document.querySelector('[data-control-room-objective-test]'), description: document.querySelector('[data-control-room-objective-test-help]'), key: 'Test' }
  ];
  const service = document.querySelector('[data-control-room-service]');
  const rail = document.querySelector('[data-control-room-rail]');
  const railSegments = [...document.querySelectorAll('.control-room__segments i')];
  const step = document.querySelector('[data-control-room-step]');
  const checkItem = document.querySelector('[data-control-room-check-item]');
  const check = document.querySelector('[data-control-room-check]');
  const missionStart = document.querySelector('[data-mission-open]');
  const operationStatus = document.querySelector('[data-control-room-operation]');
  const eve = createEveController(document.querySelector('.eve-panel--control'), {
    persistent: true,
    focusMotion: false,
    initialMessage: () => t('control.coasterEve')
  });
  let facility = null;

  function getMessage(nextFacility, isCompleted) {
    if (isCompleted) {
      return t('control.restoredEve', { facility: nextFacility.name });
    }
    return nextFacility.id === 'coaster' ? t('control.coasterEve') : nextFacility.id === 'luna' ? t('control.lunaEve') : getFacilityText(nextFacility, 'controlRoomMessage');
  }

  function render(nextFacility) {
    facility = nextFacility;
    const progress = readProgress(getExplorer?.());
    const isCompleted = progress.facilities[nextFacility.id]?.status === 'completed';
    const isCoaster = nextFacility.id === 'coaster';
    const isLuna = nextFacility.id === 'luna';
    const detail = document.querySelector('[data-control-room-detail]');
    const objectivePanel = document.querySelector('.control-room__objective');
    const statusPanel = document.querySelector('.control-room__status');
    if (detail && objectivePanel && statusPanel) {
      detail.hidden = !isLuna;
      if (isLuna) {
        detail.append(statusPanel, objectivePanel);
      } else {
        document.querySelector('.control-room__column--brief').append(objectivePanel);
        document.querySelector('.control-room__layout').append(statusPanel);
      }
    }
    const coasterProgress = isCoaster ? getCoasterProgress(progress, isCompleted) : { connections: 0, steps: 0 };

    if (screen) {
      screen.dataset.facility = nextFacility.id;
      screen.classList.toggle('is-state-completed', isCompleted);
    }
    if (title) {
      title.textContent = nextFacility.name;
    }
    if (type) {
      type.textContent = getFacilityText(nextFacility, 'type');
    }
    if (alert) {
      alert.textContent = t(isCompleted ? 'control.restoredAlert' : isLuna ? 'control.lunaAlert' : 'control.systemAlert');
    }
    if (status) {
      status.textContent = t(isCompleted ? 'control.restoredStatus' : isLuna ? 'control.lunaStatus' : isCoaster ? 'control.coasterStatus' : 'control.pendingStatus');
    }
    if (objectiveEyebrow) {
      objectiveEyebrow.textContent = t(isCompleted ? 'control.restoredObjectiveEyebrow' : 'control.objectiveEyebrow');
    }
    if (objectiveTitle) {
      objectiveTitle.textContent = t(isCompleted ? 'control.restoredObjectiveTitle' : isLuna ? 'control.lunaObjectiveTitle' : 'control.objectiveTitle');
    }
    if (objective) {
      objective.textContent = t(isCompleted ? 'control.restoredObjective' : isLuna ? 'control.lunaObjective' : isCoaster ? 'control.coasterObjective' : 'control.pendingObjective');
    }
    objectiveSteps.forEach((step) => {
      if (step.title) {
        step.title.textContent = t(`control.${isCompleted ? 'restoredObjective' : isLuna ? 'lunaObjective' : 'objective'}${step.key}`);
      }
      if (step.description) {
        step.description.textContent = t(`control.${isCompleted ? 'restoredObjective' : isLuna ? 'lunaObjective' : 'objective'}${step.key}Help`);
      }
    });
    if (service) {
      service.textContent = t(isLuna ? (isCompleted ? 'control.lunaRestored' : 'control.lunaService') : isCompleted ? 'control.trainRunning' : 'control.trainStopped');
    }
    if (rail) {
      rail.textContent = isLuna ? t('control.lunaPrisms') : `${coasterProgress.connections} / 9`;
    }
    railSegments.forEach((segment, index) => { segment.classList.toggle('is-active', index < coasterProgress.connections); });
    document.querySelector('.control-room__segments').hidden = isLuna;
    [['connection', 'railConnection', 'lunaConnection'], ['step', 'restorationStep', 'lunaFlowers'], ['check', 'systemCheck', 'lunaLotus']].forEach(([name, commonKey, lunaKey]) => {
      const label = document.querySelector(`[data-control-room-${name}-label]`);
      label.textContent = t(`control.${isLuna ? lunaKey : commonKey}`);
    });
    document.querySelector('[data-control-room-start-description]').textContent = t(isLuna ? 'control.lunaStartDescription' : 'control.startDescription');
    const roomIcons = screen.querySelectorAll('use');
    roomIcons.forEach(icon => {
      if (!icon.dataset.originalHref) icon.dataset.originalHref = icon.getAttribute('href');
      const original = icon.dataset.originalHref;
      icon.setAttribute('href', isLuna ? original.replace('#icon-rail', '#icon-signal').replace('#icon-shield', '#icon-mission') : original);
    });
    if (step) {
      step.textContent = isLuna ? t('control.lunaBeds') : `${coasterProgress.steps} / 3`;
    }
    checkItem?.classList.toggle('is-warning', !isCompleted);
    if (check) {
      check.textContent = t(isLuna ? (isCompleted ? 'control.lunaBloom' : 'control.lunaSleeping') : isCompleted ? 'control.inspectionComplete' : 'control.inspectionRequired');
    }
    if (missionStart) {
      missionStart.hidden = (!isCoaster && !isLuna) || isCompleted;
      const label = missionStart.querySelector('strong');
      label.dataset.i18n = 'mission.start';
      label.textContent = t(label.dataset.i18n);
    }
    if (operationStatus) {
      operationStatus.hidden = !isCoaster || !isCompleted;
    }

    return { isCompleted };
  }

  function show(nextFacility, { announce = false } = {}) {
    const state = render(nextFacility);
    eve.speak(() => getMessage(nextFacility, state.isCompleted));
    onShowScreen?.('control-room');
    if (nextFacility.id === 'luna') screen.scrollTop = 0;
    title?.focus({ preventScroll: true });
    if (announce) {
      showToast?.(getFacilityText(nextFacility, 'controlRoomMessage'));
    }
  }

  function refreshLanguage() {
    eve.refreshLanguage();
    if (facility) {
      render(facility);
    }
  }

  return {
    cancel: eve.cancel,
    getFacility: () => facility,
    getFocusTarget: () => title,
    refreshState: () => facility ? render(facility) : null,
    refreshLanguage,
    show
  };
}
