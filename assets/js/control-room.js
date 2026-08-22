import { getFacilityText } from './data.js';
import { createEveController } from './eve.js';
import { t } from './locales.js';
import { readProgress } from './progress.js';

export function createControlRoomController({ getExplorer, onMapRequest, onShowScreen, showToast } = {}) {
  const screen = document.querySelector('[data-screen="control-room"]');
  const title = document.querySelector('#control-room-title');
  const type = document.querySelector('#control-room-type');
  const alert = document.querySelector('[data-control-room-alert]');
  const status = document.querySelector('[data-control-room-status]');
  const objectiveEyebrow = document.querySelector('[data-control-room-objective-eyebrow]');
  const objectiveTitle = document.querySelector('[data-control-room-objective-title]');
  const objective = document.querySelector('[data-control-room-objective]');
  const service = document.querySelector('[data-control-room-service]');
  const rail = document.querySelector('[data-control-room-rail]');
  const checkItem = document.querySelector('[data-control-room-check-item]');
  const check = document.querySelector('[data-control-room-check]');
  const departure = document.querySelector('[data-control-room-departure]');
  const missionStart = document.querySelector('[data-mission-open]');
  const mapButton = document.querySelector('[data-control-room-map]');
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
    return nextFacility.id === 'coaster' ? t('control.coasterEve') : getFacilityText(nextFacility, 'controlRoomMessage');
  }

  function render(nextFacility) {
    facility = nextFacility;
    const progress = readProgress(getExplorer?.());
    const isCompleted = progress.facilities[nextFacility.id]?.status === 'completed';
    const isCoaster = nextFacility.id === 'coaster';

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
      alert.textContent = t(isCompleted ? 'control.restoredAlert' : 'control.systemAlert');
    }
    if (status) {
      status.textContent = t(isCompleted ? 'control.restoredStatus' : isCoaster ? 'control.coasterStatus' : 'control.pendingStatus');
    }
    if (objectiveEyebrow) {
      objectiveEyebrow.textContent = t(isCompleted ? 'control.restoredObjectiveEyebrow' : 'control.objectiveEyebrow');
    }
    if (objectiveTitle) {
      objectiveTitle.textContent = t(isCompleted ? 'control.restoredObjectiveTitle' : 'control.objectiveTitle');
    }
    if (objective) {
      objective.textContent = t(isCompleted ? 'control.restoredObjective' : isCoaster ? 'control.coasterObjective' : 'control.pendingObjective');
    }
    if (service) {
      service.textContent = t(isCompleted ? 'control.trainRunning' : 'control.trainStopped');
    }
    if (rail) {
      rail.textContent = isCompleted ? '12 / 12' : '9 / 12';
    }
    checkItem?.classList.toggle('is-warning', !isCompleted);
    if (check) {
      check.textContent = t(isCompleted ? 'control.inspectionComplete' : 'control.inspectionRequired');
    }
    if (departure) {
      departure.textContent = t(isCompleted ? 'control.departureReady' : 'control.suspended');
    }
    if (missionStart) {
      missionStart.hidden = !isCoaster || isCompleted;
    }

    return { isCompleted };
  }

  function show(nextFacility, { announce = false } = {}) {
    const state = render(nextFacility);
    eve.speak(() => getMessage(nextFacility, state.isCompleted));
    onShowScreen?.('control-room');
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

  mapButton?.addEventListener('click', () => onMapRequest?.());

  return {
    cancel: eve.cancel,
    getFacility: () => facility,
    getFocusTarget: () => title,
    refreshLanguage,
    show
  };
}
