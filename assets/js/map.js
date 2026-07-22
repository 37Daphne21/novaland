import { cosmicVoyage as cosmicVoyageDefinition, facilities as facilityDefinitions, facilityStates, recentLogs } from './data.js';
import { uiCopy } from './locales.js';
import { getIcon } from './ui.js';

function cloneFacility(facility) {
  return {
    ...facility,
    position: { ...facility.position },
    glow: { ...facility.glow },
    dim: { ...facility.dim }
  };
}

function createRuntimeState() {
  const facilities = facilityDefinitions.map(cloneFacility);
  const cosmicVoyage = {
    ...cloneFacility(cosmicVoyageDefinition),
    openPosition: { ...cosmicVoyageDefinition.openPosition }
  };
  const isRestoredPreview = ['localhost', '127.0.0.1'].includes(window.location.hostname)
    && new URLSearchParams(window.location.search).get('map-state') === 'restored';

  if (isRestoredPreview) {
    facilities.forEach((facility) => {
      facility.state = 'completed';
    });
  }

  return { cosmicVoyage, facilities, selectedFacilityId: 'coaster' };
}

export function createMapController({ cancelEveSpeech, onEnterControlRoom, showToast, speakEve }) {
  const facilityList = document.querySelector('#facility-list');
  const mapCardList = document.querySelector('#map-card-list');
  const facilityDimList = document.querySelector('#facility-dim-list');
  const cosmicStatus = document.querySelector('#cosmic-status');
  const facilityGlow = document.querySelector('#facility-glow');
  const recentLogList = document.querySelector('#recent-log-list');
  const missionProgress = document.querySelector('#mission-progress');
  const missionProgressValue = document.querySelector('#mission-progress-value');
  const missionProgressBar = document.querySelector('#mission-progress-bar');
  const missionProgressLabel = missionProgress?.querySelector('.mission-progress__header span');
  const worldMapHeading = document.querySelector('.world-map__heading');
  const worldMapTitle = document.querySelector('#world-title');
  const worldMapSubtitle = worldMapHeading?.querySelector('p');
  const worldMapTitleText = worldMapTitle?.textContent.trim() ?? '';
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const state = createRuntimeState();
  let worldMapTypingTimer = null;

  function isRestored() {
    return state.facilities.every((facility) => facility.state === 'completed');
  }

  function getFacility(facilityId) {
    return facilityId === 'cosmic'
      ? state.cosmicVoyage
      : state.facilities.find((facility) => facility.id === facilityId);
  }

  function getFacilityView(facility) {
    return {
      isDisabled: facility.state === 'locked',
      isSelected: facility.id === state.selectedFacilityId,
      state: facilityStates[facility.state]
    };
  }

  function clearFacilityGuide() {
    facilityGlow?.classList.remove('is-visible');
    mapCardList?.querySelectorAll('.map-facility-card.is-guided').forEach((card) => {
      card.classList.remove('is-guided');
    });
  }

  function syncMapState() {
    const restored = isRestored();

    state.cosmicVoyage.state = restored ? 'open' : 'sealed';
    if (restored) {
      state.selectedFacilityId = null;
      clearFacilityGuide();
    }
  }

  function renderMissionProgress() {
    if (!missionProgress || !missionProgressValue || !missionProgressBar || !missionProgressLabel) {
      return;
    }

    const currentStep = Math.max(1, state.facilities.filter((facility) => facility.state !== 'locked').length);
    const progress = currentStep / state.facilities.length * 100;
    const restored = isRestored();
    const progressLabel = restored ? uiCopy.progressComplete : uiCopy.progressActive;

    missionProgress.setAttribute('aria-valuenow', String(currentStep));
    missionProgress.setAttribute('aria-valuetext', `${currentStep} / ${state.facilities.length}, ${progressLabel}`);
    missionProgress.classList.toggle('is-completed', restored);
    missionProgressValue.textContent = `${currentStep} / ${state.facilities.length}`;
    missionProgressLabel.textContent = progressLabel;
    missionProgressBar.style.width = `${progress}%`;
  }

  function renderFacilities() {
    if (!facilityList) {
      return;
    }

    facilityList.innerHTML = state.facilities.map((facility, index) => {
      const view = getFacilityView(facility);
      const facilityColor = view.isDisabled ? 'var(--color-locked)' : `var(--color-${facility.id})`;
      const description = view.isDisabled ? uiCopy.lockedCondition : facility.type;

      return `
        <li>
          <button class="facility-card ui-card is-state-${facility.state}${view.isSelected ? ' is-selected' : ''}" type="button" data-facility="${facility.id}" aria-pressed="${view.isSelected}"${view.isDisabled ? ' aria-disabled="true"' : ''} style="--facility-color: ${facilityColor};">
            <span class="facility-card__number">${String(index + 1).padStart(2, '0')}</span>
            <span class="facility-card__icon" aria-hidden="true"><img src="./assets/images/common/facility-${facility.id}.png" alt="" width="256" height="256"></span>
            <span class="facility-card__content">
              <strong class="facility-card__name">${facility.name}</strong>
              <span class="facility-card__description">${description}</span>
              <span class="facility-card__state">${getIcon(view.state.icon)}${view.state.label}</span>
            </span>
          </button>
        </li>
      `;
    }).join('');
  }

  function renderFacilityDims() {
    if (!facilityDimList) {
      return;
    }

    [...state.facilities, state.cosmicVoyage].forEach((facility) => {
      let dim = facilityDimList.querySelector(`[data-facility-dim="${facility.id}"]`);

      if (!dim) {
        dim = document.createElement('span');
        dim.className = 'facility-dim';
        dim.dataset.facilityDim = facility.id;
        dim.style.setProperty('--dim-x', `${facility.dim.x}%`);
        dim.style.setProperty('--dim-y', `${facility.dim.y}%`);
        dim.style.setProperty('--dim-width', `${facility.dim.width}%`);
        dim.style.setProperty('--dim-height', `${facility.dim.height}%`);
        dim.style.setProperty('--dim-opacity', facility.dim.opacity);
        facilityDimList.append(dim);
      }

      dim.classList.toggle('is-dimmed', facility.state === 'locked' || facility.state === 'sealed');
    });
  }

  function renderMapCards() {
    if (!mapCardList) {
      return;
    }

    const facilityCards = state.facilities.map((facility, index) => {
      const view = getFacilityView(facility);
      const marker = view.isDisabled ? getIcon('lock') : String(index + 1).padStart(2, '0');

      return `
        <button class="map-facility-card is-state-${facility.state}${view.isSelected ? ' is-selected' : ''}" type="button" data-facility="${facility.id}" data-control-room-entry aria-pressed="${view.isSelected}"${view.isDisabled ? ' aria-disabled="true"' : ''} style="--marker-x: ${facility.position.x}%; --marker-y: ${facility.position.y}%; --facility-color: var(--color-${facility.id});">
          <span class="map-facility-card__number">${marker}</span>
          <span class="map-facility-card__content"><strong>${facility.name}</strong><small>${facility.type}</small><i>${getIcon(view.state.icon)}${view.state.label}</i></span>
          <span class="map-facility-card__enter" aria-hidden="true">${getIcon('arrow-right')}</span>
        </button>
      `;
    }).join('');

    const cosmicState = facilityStates[state.cosmicVoyage.state];
    const isCosmicSealed = state.cosmicVoyage.state === 'sealed';
    const cosmicName = isCosmicSealed ? '???' : state.cosmicVoyage.name;
    const cosmicPosition = isCosmicSealed ? state.cosmicVoyage.position : state.cosmicVoyage.openPosition;
    const cosmicCard = `
      <button class="map-facility-card map-facility-card--cosmic is-state-${state.cosmicVoyage.state}" type="button" data-facility="cosmic" data-control-room-entry${isCosmicSealed ? ' aria-disabled="true"' : ''} style="--marker-x: ${cosmicPosition.x}%; --marker-y: ${cosmicPosition.y}%;">
        <span class="map-facility-card__number">${getIcon(cosmicState.icon)}</span>
        <span class="map-facility-card__content"><strong>${cosmicName}</strong><i>${cosmicState.label}</i></span>
      </button>
    `;

    mapCardList.innerHTML = facilityCards + cosmicCard;
  }

  function renderCosmicStatus() {
    if (!cosmicStatus) {
      return;
    }

    const cosmicState = facilityStates[state.cosmicVoyage.state];
    const isCosmicSealed = state.cosmicVoyage.state === 'sealed';
    const cosmicName = isCosmicSealed ? '???' : state.cosmicVoyage.name;

    cosmicStatus.className = `cosmic-status is-state-${state.cosmicVoyage.state}`;
    cosmicStatus.setAttribute('aria-disabled', String(isCosmicSealed));
    cosmicStatus.innerHTML = `
      <span class="cosmic-status__icon" aria-hidden="true">${getIcon(cosmicState.icon)}</span>
      <span class="cosmic-status__content">
        <strong>${cosmicName}</strong>
        <small>${isCosmicSealed ? uiCopy.cosmicCondition : state.cosmicVoyage.type}</small>
        <i>${getIcon(cosmicState.icon)}${cosmicState.label}</i>
      </span>
    `;
  }

  function renderRecentLogs() {
    if (!recentLogList) {
      return;
    }

    const visibleLogs = isRestored()
      ? [{ time: '09:45', datetime: '09:45', message: uiCopy.restoredLog }, ...recentLogs].slice(0, 3)
      : recentLogs;

    recentLogList.innerHTML = visibleLogs.map((log) => `
      <li class="recent-log__item">
        <time class="recent-log__time" datetime="${log.datetime}">${log.time}</time>
        <span>${log.message}</span>
      </li>
    `).join('');
  }

  function renderSelection() {
    [facilityList, mapCardList].forEach((container) => {
      container?.querySelectorAll('[data-facility]:not([data-facility="cosmic"])').forEach((button) => {
        const isSelected = button.dataset.facility === state.selectedFacilityId;
        button.classList.toggle('is-selected', isSelected);
        button.setAttribute('aria-pressed', String(isSelected));
      });
    });
  }

  function updateFacilityGlow(facility) {
    if (!facilityGlow || !facility) {
      return;
    }

    facilityGlow.style.setProperty('--glow-x', `${facility.glow.x}%`);
    facilityGlow.style.setProperty('--glow-y', `${facility.glow.y}%`);
    facilityGlow.style.setProperty('--facility-color', `var(--color-${facility.id})`);
    facilityGlow.classList.add('is-visible');
  }

  function guideFacility(facility) {
    if (isRestored()) {
      clearFacilityGuide();
      return;
    }

    mapCardList?.querySelector(`[data-facility="${facility.id}"]`)?.classList.add('is-guided');
    updateFacilityGlow(facility);
  }

  function render() {
    syncMapState();
    renderFacilityDims();
    renderFacilities();
    renderMapCards();
    renderCosmicStatus();
    renderMissionProgress();
    renderRecentLogs();
  }

  function selectFacility(button) {
    const facility = getFacility(button?.dataset.facility);

    if (!facility) {
      return;
    }

    if (facility.state === 'locked' || facility.state === 'sealed') {
      clearFacilityGuide();
      speakEve(facility.lockedMessage);
      return;
    }

    if (facility.id === 'cosmic') {
      showToast(uiCopy.cosmicPending);
      return;
    }

    state.selectedFacilityId = facility.id;
    clearFacilityGuide();
    renderSelection();

    if (button.hasAttribute('data-control-room-entry')) {
      cancelEveSpeech();
      onEnterControlRoom(facility);
      return;
    }

    speakEve(facility.message, () => guideFacility(facility));
  }

  function playIntro() {
    if (!worldMapHeading || !worldMapTitle || !worldMapSubtitle || !worldMapTitleText) {
      return;
    }

    window.clearInterval(worldMapTypingTimer);
    worldMapTypingTimer = null;
    worldMapHeading.classList.add('is-intro-ready');
    worldMapSubtitle.classList.remove('is-visible');
    worldMapTitle.dataset.text = worldMapTitleText;
    worldMapTitle.setAttribute('aria-label', worldMapTitleText);

    if (prefersReducedMotion) {
      worldMapTitle.textContent = worldMapTitleText;
      worldMapTitle.classList.remove('is-typing');
      worldMapSubtitle.classList.add('is-visible');
      return;
    }

    const visualTitle = document.createElement('span');
    const characters = Array.from(worldMapTitleText);
    let characterIndex = 0;

    visualTitle.setAttribute('aria-hidden', 'true');
    worldMapTitle.classList.add('is-typing');
    worldMapTitle.replaceChildren(visualTitle);

    worldMapTypingTimer = window.setInterval(() => {
      visualTitle.textContent += characters[characterIndex];
      characterIndex += 1;

      if (characterIndex >= characters.length) {
        window.clearInterval(worldMapTypingTimer);
        worldMapTypingTimer = null;
        worldMapTitle.classList.remove('is-typing');
        worldMapSubtitle.classList.add('is-visible');
      }
    }, 90);
  }

  function focusReturnTarget() {
    const facilityId = state.selectedFacilityId ?? (isRestored() ? 'cosmic' : 'coaster');
    document.querySelector(`[data-screen="map"] [data-facility="${facilityId}"]`)?.focus();
  }

  function getStartupMessage(defaultMessage) {
    return isRestored() ? uiCopy.mapRestored : defaultMessage;
  }

  return { focusReturnTarget, getStartupMessage, playIntro, render, selectFacility };
}
