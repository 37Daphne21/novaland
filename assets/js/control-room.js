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
      const restoredKey = nextFacility.id === 'luna' ? 'control.lunaRestoredEve' : nextFacility.id === 'spark' ? 'control.sparkRestoredEve' : 'control.restoredEve';
      return t(restoredKey, { facility: nextFacility.name });
    }
    if (readProgress(getExplorer?.()).missions[nextFacility.id]?.checkpoint) {
      const resumeKey = nextFacility.id === 'luna' ? 'control.lunaResumeEve' : nextFacility.id === 'spark' ? 'control.sparkResumeEve' : 'control.resumeEve';
      return t(resumeKey);
    }
    if (nextFacility.id === 'coaster') return t('control.coasterEve');
    if (nextFacility.id === 'luna') return t('control.lunaEve');
    if (nextFacility.id === 'spark') return t('control.sparkEve');
    return getFacilityText(nextFacility, 'controlRoomMessage');
  }

  function render(nextFacility) {
    facility = nextFacility;
    const progress = readProgress(getExplorer?.());
    const isCompleted = progress.facilities[nextFacility.id]?.status === 'completed';
    const isCoaster = nextFacility.id === 'coaster';
    const isLuna = nextFacility.id === 'luna';
    const isSpark = nextFacility.id === 'spark';
    const checkpoint = progress.missions[nextFacility.id]?.checkpoint;
    const restoredPrefix = isLuna ? 'control.lunaRestored' : isSpark ? 'control.sparkRestored' : 'control.restored';
    const objectivePrefix = isCompleted ? (isLuna ? 'lunaRestoredObjective' : isSpark ? 'sparkRestoredObjective' : 'restoredObjective') : isLuna ? 'lunaObjective' : isSpark ? 'sparkObjective' : 'objective';
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
      alert.textContent = t(isCompleted ? `${restoredPrefix}Alert` : isLuna ? 'control.lunaAlert' : isSpark ? 'control.sparkAlert' : 'control.systemAlert');
    }
    if (status) {
      status.textContent = t(isCompleted ? `${restoredPrefix}Status` : checkpoint ? 'control.inProgress' : isLuna ? 'control.lunaStatus' : isSpark ? 'control.sparkStatus' : isCoaster ? 'control.coasterStatus' : 'control.pendingStatus');
    }
    if (objectiveEyebrow) {
      objectiveEyebrow.textContent = t(isCompleted ? 'control.restoredObjectiveEyebrow' : 'control.objectiveEyebrow');
    }
    if (objectiveTitle) {
      objectiveTitle.textContent = t(isCompleted ? `${restoredPrefix}ObjectiveTitle` : isLuna ? 'control.lunaObjectiveTitle' : isSpark ? 'control.sparkObjectiveTitle' : 'control.objectiveTitle');
    }
    if (objective) {
      objective.textContent = t(isCompleted ? `${restoredPrefix}Objective` : isLuna ? 'control.lunaObjective' : isSpark ? 'control.sparkObjective' : isCoaster ? 'control.coasterObjective' : 'control.pendingObjective');
    }
    objectiveSteps.forEach((step) => {
      if (step.title) {
        step.title.textContent = t(`control.${objectivePrefix}${step.key}`);
      }
      if (step.description) {
        step.description.textContent = t(`control.${objectivePrefix}${step.key}Help`);
      }
    });
    if (service) {
      service.textContent = t(isLuna ? (isCompleted ? 'control.lunaRestored' : 'control.lunaService') : isSpark ? (isCompleted ? 'control.sparkRestored' : 'control.sparkService') : isCompleted ? 'control.trainRunning' : 'control.trainStopped');
    }
    if (rail) {
      rail.textContent = isLuna ? t('control.lunaPrisms') : isSpark ? t(isCompleted ? 'control.sparkCoreStable' : 'control.sparkCoreUnstable') : `${coasterProgress.connections} / 9`;
    }
    railSegments.forEach((segment, index) => { segment.classList.toggle('is-active', index < coasterProgress.connections); });
    document.querySelector('.control-room__segments').hidden = isLuna || isSpark;
    [['connection', 'railConnection', 'lunaConnection', 'sparkConnection'], ['step', 'restorationStep', 'lunaFlowers', 'sparkSequence'], ['check', 'systemCheck', 'lunaLotus', 'sparkCharge']].forEach(([name, commonKey, lunaKey, sparkKey]) => {
      const label = document.querySelector(`[data-control-room-${name}-label]`);
      label.textContent = t(`control.${isLuna ? lunaKey : isSpark ? sparkKey : commonKey}`);
    });
    document.querySelector('[data-control-room-start-description]').textContent = t(isLuna ? 'control.lunaStartDescription' : isSpark ? 'control.sparkStartDescription' : 'control.startDescription');
    const roomIcons = screen.querySelectorAll('use');
    roomIcons.forEach(icon => {
      if (!icon.dataset.originalHref) icon.dataset.originalHref = icon.getAttribute('href');
      const original = icon.dataset.originalHref;
      const facilityIcon = isLuna || isSpark ? original.replace('#icon-rail', '#icon-signal').replace('#icon-shield', '#icon-mission') : original;
      icon.setAttribute('href', facilityIcon);
    });
    if (step) {
      step.textContent = isLuna ? `${isCompleted ? 3 : checkpoint?.collected?.length ?? 0} / 3` : isSpark ? `${isCompleted ? 3 : 0} / 3` : `${coasterProgress.steps} / 3`;
    }
    checkItem?.classList.toggle('is-warning', !isCompleted);
    if (check) {
      check.textContent = t(isLuna ? (isCompleted ? 'control.lunaBloom' : checkpoint?.collected?.length === 3 ? 'control.lunaReady' : 'control.lunaSleeping') : isSpark ? (isCompleted ? 'control.sparkChargeComplete' : 'control.sparkChargeEmpty') : isCompleted ? 'control.inspectionComplete' : 'control.inspectionRequired');
    }
    if (missionStart) {
      missionStart.hidden = (!isCoaster && !isLuna && !isSpark) || isCompleted;
      missionStart.disabled = isSpark;
      missionStart.classList.toggle('is-pending', isSpark);
      const label = missionStart.querySelector('strong');
      label.dataset.i18n = isSpark ? 'control.sparkPreparing' : checkpoint && !isCompleted ? 'mission.resume' : 'mission.start';
      label.textContent = t(label.dataset.i18n);
    }
    if (operationStatus) {
      operationStatus.hidden = (!isCoaster && !isLuna) || !isCompleted;
      ['Title', 'Description'].forEach(suffix => {
        const label = operationStatus.querySelector(suffix === 'Title' ? 'strong' : '.control-room__start-copy > span');
        label.dataset.i18n = 'control.' + (isLuna ? 'lunaOperation' : 'operation') + suffix;
        label.textContent = t(label.dataset.i18n);
      });
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
    refreshState: () => {
      if (!facility) return null;
      const state = render(facility);
      eve.speak(() => getMessage(facility, state.isCompleted));
      return state;
    },
    refreshLanguage,
    show
  };
}
