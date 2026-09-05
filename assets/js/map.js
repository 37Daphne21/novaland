import { cosmicVoyage as cosmicVoyageDefinition, facilities as facilityDefinitions, getFacilityState, getFacilityText } from './data.js';
import { uiCopy } from './locales.js';
import { getProgressLogs, readProgress, recordFacilityCompletion } from './progress.js';
import { getIcon } from './ui.js';

const mapVisuals = {
  base: './assets/images/map/bg-map.webp',
  dim: './assets/images/map/bg-map-dim.webp',
  coaster: './assets/images/map/bg-map-coaster.webp',
  luna: './assets/images/map/bg-map-luna.webp',
  spark: './assets/images/map/bg-map-spark.webp',
  wonder: './assets/images/map/bg-map-wonder.webp',
  cosmic: './assets/images/map/bg-map-cosmic.webp'
};

function cloneFacility(facility) {
  return {
    ...facility,
    position: { ...facility.position },
    mobilePosition: { ...facility.mobilePosition },
    glow: { ...facility.glow },
    mobileGlow: { ...facility.mobileGlow }
  };
}

function createRuntimeState(progress = null) {
  const facilities = facilityDefinitions.map((facility) => ({
    ...cloneFacility(facility),
    state: progress?.facilities[facility.id]?.status ?? facility.state
  }));
  const cosmicVoyage = {
    ...cloneFacility(cosmicVoyageDefinition),
    openPosition: { ...cosmicVoyageDefinition.openPosition },
    openMobilePosition: { ...cosmicVoyageDefinition.openMobilePosition }
  };
  return { cosmicVoyage, facilities, guidedFacilityId: null, selectedFacilityId: null };
}

export function createMapController({ cancelEveSpeech, onEnterControlRoom, speakEve }) {
  const screen = document.querySelector('.screen--map');
  const facilityList = document.querySelector('#facility-list');
  const mapCardList = document.querySelector('#map-card-list');
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
  const backdropLayers = [...document.querySelectorAll('.screen--map .screen__backdrop-layer')];
  const worldMapTitleText = worldMapTitle?.textContent.trim() ?? '';
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const desktopMapMedia = window.matchMedia('(min-width: 56.0625rem)');
  let progress = null;
  let state = createRuntimeState();
  let worldMapTypingTimer = null;
  let activeBackdropIndex = 0;
  let currentMapVisual = null;
  let requestedMapVisual = 'base';
  let mapVisualRequestId = 0;
  let mapVisualTransition = Promise.resolve();

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
      state: getFacilityState(facility.state)
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
  }



  function getProgressVisual() {
    if (isRestored()) {
      return 'cosmic';
    }

    const completedFacilities = state.facilities.filter((facility) => facility.state === 'completed');
    return completedFacilities[completedFacilities.length - 1]?.id ?? 'dim';
  }

  function clearMapVisualLayers() {
    backdropLayers.forEach((layer) => {
      layer.classList.remove('is-active');
      layer.style.backgroundImage = '';
      layer.style.zIndex = '0';
    });

    activeBackdropIndex = 0;
    currentMapVisual = null;
  }

  function initializeMapVisual(visualState = 'base') {
    if (!screen || !mapVisuals[visualState] || backdropLayers.length < 2) {
      return;
    }

    requestedMapVisual = visualState;
    mapVisualRequestId += 1;

    if (!desktopMapMedia.matches) {
      clearMapVisualLayers();
      return;
    }

    backdropLayers[0].style.backgroundImage = `url("${mapVisuals[visualState]}")`;
    backdropLayers[0].style.zIndex = '1';
    backdropLayers[0].classList.add('is-active');
    backdropLayers[1].style.backgroundImage = '';
    backdropLayers[1].style.zIndex = '0';
    backdropLayers[1].classList.remove('is-active');
    screen.dataset.mapVisual = visualState;
    currentMapVisual = visualState;
    activeBackdropIndex = 0;
  }

  function preloadMapVisual(visualState) {
    return new Promise((resolve, reject) => {
      const image = new Image();

      image.addEventListener('load', resolve, { once: true });
      image.addEventListener('error', reject, { once: true });
      image.src = mapVisuals[visualState];

      if (image.complete && image.naturalWidth > 0) {
        resolve();
      }
    });
  }

  function transitionMapVisual(visualState, { immediate = false } = {}) {
    if (!screen || !mapVisuals[visualState] || backdropLayers.length < 2) {
      return Promise.resolve();
    }

    requestedMapVisual = visualState;
    const requestId = ++mapVisualRequestId;

    if (!desktopMapMedia.matches || visualState === currentMapVisual) {
      return Promise.resolve();
    }

    mapVisualTransition = mapVisualTransition.then(async () => {
      try {
        await preloadMapVisual(visualState);
      } catch {
        return;
      }

      if (!desktopMapMedia.matches || requestId !== mapVisualRequestId) {
        return;
      }

      const currentLayer = backdropLayers[activeBackdropIndex];
      const nextBackdropIndex = activeBackdropIndex === 0 ? 1 : 0;
      const nextLayer = backdropLayers[nextBackdropIndex];

      nextLayer.classList.remove('is-active');
      nextLayer.style.backgroundImage = `url("${mapVisuals[visualState]}")`;
      nextLayer.style.zIndex = '2';
      currentLayer.style.zIndex = '1';
      screen.dataset.mapVisual = visualState;

      if (immediate || prefersReducedMotion) {
        nextLayer.classList.add('is-active');
        currentLayer.classList.remove('is-active');
      } else {
        void nextLayer.offsetWidth;
        nextLayer.classList.add('is-active');

        await new Promise((resolve) => {
          const finish = () => {
            nextLayer.removeEventListener('transitionend', onTransitionEnd);
            window.clearTimeout(fallbackTimer);
            resolve();
          };
          const onTransitionEnd = (event) => {
            if (event.propertyName === 'opacity') {
              finish();
            }
          };
          const fallbackTimer = window.setTimeout(finish, 1500);

          nextLayer.addEventListener('transitionend', onTransitionEnd);
        });

        currentLayer.classList.remove('is-active');
      }

      if (!desktopMapMedia.matches || requestId !== mapVisualRequestId) {
        if (desktopMapMedia.matches) {
          initializeMapVisual(requestedMapVisual);
        } else {
          clearMapVisualLayers();
        }
        return;
      }

      currentLayer.style.backgroundImage = '';
      currentLayer.style.zIndex = '0';
      nextLayer.style.zIndex = '1';
      activeBackdropIndex = nextBackdropIndex;
      currentMapVisual = visualState;
    });

    return mapVisualTransition;
  }

  function handleMapVisualMediaChange(event) {
    if (event.matches) {
      initializeMapVisual(requestedMapVisual);
      return;
    }

    mapVisualRequestId += 1;
    clearMapVisualLayers();
  }

  function renderMissionProgress() {
    if (!missionProgress || !missionProgressValue || !missionProgressBar || !missionProgressLabel) {
      return;
    }

    const currentStep = Math.max(1, state.facilities.filter((facility) => facility.state !== 'locked').length);
    const progress = currentStep / state.facilities.length * 100;
    const restored = isRestored();
    const progressLabel = restored ? uiCopy.progressComplete : uiCopy.progressActive;
    const currentFacility = state.facilities[currentStep - 1];
    const progressText = restored
      ? `${currentStep} / ${state.facilities.length}, ${progressLabel}`
      : `${currentStep} / ${state.facilities.length}, ${currentFacility.name} ${progressLabel}`;

    missionProgress.setAttribute('aria-valuenow', String(currentStep));
    missionProgress.setAttribute('aria-valuetext', progressText);
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
      const description = getFacilityText(facility, 'type');

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
            ${view.isDisabled ? `<small class="facility-card__description">${getFacilityText(facility, 'lockedMessage')}</small>` : ''}
          </button>
        </li>
      `;
    }).join('');
  }

  function renderMapCards() {
    if (!mapCardList) {
      return;
    }

    const facilityCards = state.facilities.map((facility, index) => {
      const view = getFacilityView(facility);
      const marker = view.isDisabled ? getIcon('lock') : String(index + 1).padStart(2, '0');
      const isEntryEnabled = state.guidedFacilityId === facility.id && !view.isDisabled;
      const isAwaitingGuide = !view.isDisabled && !isEntryEnabled;

      return `
        <button class="map-facility-card is-state-${facility.state}${view.isSelected ? ' is-selected' : ''}${isAwaitingGuide ? ' is-awaiting-guide' : ''}" type="button" data-facility="${facility.id}" data-control-room-entry aria-pressed="${view.isSelected}"${isEntryEnabled ? '' : ' aria-disabled="true" tabindex="-1"'} style="--marker-x: ${facility.position.x}%; --marker-y: ${facility.position.y}%; --mobile-marker-x: ${facility.mobilePosition.x}%; --mobile-marker-y: ${facility.mobilePosition.y}%; --facility-color: var(--color-${facility.id});">
          <span class="map-facility-card__number">${marker}</span>
          <span class="map-facility-card__content"><strong>${facility.name}</strong><small>${getFacilityText(facility, 'type')}</small><i>${getIcon(view.state.icon)}${view.state.label}</i></span>
          <span class="map-facility-card__enter" aria-hidden="true">${getIcon('arrow-right')}</span>
        </button>
      `;
    }).join('');

    const cosmicState = getFacilityState(state.cosmicVoyage.state);
    const isCosmicSealed = state.cosmicVoyage.state === 'sealed';
    const cosmicName = isCosmicSealed ? '???' : state.cosmicVoyage.name;
    const cosmicPosition = isCosmicSealed ? state.cosmicVoyage.position : state.cosmicVoyage.openPosition;
    const cosmicMobilePosition = isCosmicSealed ? state.cosmicVoyage.mobilePosition : state.cosmicVoyage.openMobilePosition;
    const isCosmicSelected = state.selectedFacilityId === 'cosmic';
    const isCosmicEntryEnabled = !isCosmicSealed && state.guidedFacilityId === 'cosmic';
    const cosmicCard = `
      <button class="map-facility-card map-facility-card--cosmic is-state-${state.cosmicVoyage.state}${isCosmicSelected ? ' is-selected' : ''}${!isCosmicSealed && !isCosmicEntryEnabled ? ' is-awaiting-guide' : ''}" type="button" data-facility="cosmic" data-control-room-entry aria-pressed="${isCosmicSelected}"${isCosmicEntryEnabled ? '' : ' aria-disabled="true" tabindex="-1"'} style="--marker-x: ${cosmicPosition.x}%; --marker-y: ${cosmicPosition.y}%; --mobile-marker-x: ${cosmicMobilePosition.x}%; --mobile-marker-y: ${cosmicMobilePosition.y}%;">
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

    const cosmicState = getFacilityState(state.cosmicVoyage.state);
    const isCosmicSealed = state.cosmicVoyage.state === 'sealed';
    const cosmicName = isCosmicSealed ? '???' : state.cosmicVoyage.name;

    const isSelected = state.selectedFacilityId === 'cosmic';

    cosmicStatus.className = `cosmic-status is-state-${state.cosmicVoyage.state}${isSelected ? ' is-selected' : ''}`;
    cosmicStatus.setAttribute('aria-disabled', String(isCosmicSealed));
    cosmicStatus.setAttribute('aria-pressed', String(isSelected));
    cosmicStatus.innerHTML = `
      <span class="cosmic-status__icon" aria-hidden="true">${getIcon(cosmicState.icon)}</span>
      <span class="cosmic-status__content">
        <strong>${cosmicName}</strong>
        <small>${isCosmicSealed ? uiCopy.cosmicCondition : getFacilityText(state.cosmicVoyage, 'type')}</small>
        <i>${getIcon(cosmicState.icon)}${cosmicState.label}</i>
      </span>
    `;
  }

  function renderRecentLogs() {
    if (!recentLogList) {
      return;
    }

    const visibleLogs = progress ? getProgressLogs(progress, 3) : [];

    recentLogList.innerHTML = visibleLogs.map((log) => `
      <li class="recent-log__item">
        <time class="recent-log__time" datetime="${log.datetime}">${log.time}</time>
        <span>${log.message}</span>
      </li>
    `).join('');
  }

  function renderSelection() {
    [facilityList, mapCardList, cosmicStatus].forEach((container) => {
      const buttons = container?.matches?.('[data-facility]')
        ? [container]
        : container?.querySelectorAll('[data-facility]');

      buttons?.forEach((button) => {
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
    facilityGlow.style.setProperty('--mobile-glow-x', `${facility.mobileGlow.x}%`);
    facilityGlow.style.setProperty('--mobile-glow-y', `${facility.mobileGlow.y}%`);
    facilityGlow.style.setProperty('--facility-color', `var(--color-${facility.id})`);
    facilityGlow.classList.add('is-visible');
  }

  function guideFacility(facility) {
    state.guidedFacilityId = facility.id;
    const guidedCard = mapCardList?.querySelector(`[data-facility="${facility.id}"]`);

    guidedCard?.removeAttribute('aria-disabled');
    guidedCard?.removeAttribute('tabindex');
    guidedCard?.classList.remove('is-awaiting-guide');
    guidedCard?.classList.add('is-guided');
    renderSelection();

    if (facility.state === 'available') {
      updateFacilityGlow(facility);
    } else {
      facilityGlow?.classList.remove('is-visible');
    }
  }

  function render() {
    syncMapState();
    const completed = state.facilities.filter((facility) => facility.state === 'completed');
    const lighting = completed.map((facility) => `radial-gradient(ellipse 25% 18% at ${facility.mobileGlow.x}% ${facility.mobileGlow.y}%, transparent 30%, #000 100%)`);
    screen.style.setProperty('--mobile-restoration-mask', isRestored() ? 'linear-gradient(transparent, transparent)' : lighting.join(', ') || 'linear-gradient(#000, #000)');
    renderFacilities();
    renderMapCards();
    renderCosmicStatus();
    renderMissionProgress();
    renderRecentLogs();
  }

  function completeFacility(facilityId) {
    const facilityIndex = state.facilities.findIndex((facility) => facility.id === facilityId);
    const facility = state.facilities[facilityIndex];

    if (!facility || facility.state === 'locked' || facility.state === 'completed') {
      return false;
    }

    progress = recordFacilityCompletion(progress, facility);
    state = createRuntimeState(progress);
    const nextFacility = state.facilities[facilityIndex + 1];

    state.selectedFacilityId = null;
    state.guidedFacilityId = null;
    clearFacilityGuide();

    render();

    if (!nextFacility) {
      transitionMapVisual('wonder');
    }

    speakEve(() => getFacilityText(facility, 'completionMessage'), () => {
      transitionMapVisual(nextFacility ? facility.id : 'cosmic');
      if (!nextFacility) {
        state.selectedFacilityId = 'cosmic';
        guideFacility(state.cosmicVoyage);
      }
    });

    return true;
  }

  function completeCosmicVoyage() {
    if (state.cosmicVoyage.state !== 'open') {
      return false;
    }

    speakEve(() => getFacilityText(state.cosmicVoyage, 'completionMessage'), () => {
      transitionMapVisual('base');
    });

    return true;
  }

  function selectFacility(button) {
    const facility = getFacility(button?.dataset.facility);
    const isMapEntry = button?.hasAttribute('data-control-room-entry');

    if (!facility) {
      return;
    }

    if (isMapEntry && state.guidedFacilityId !== facility.id) {
      return;
    }

    if (facility.state === 'locked' || facility.state === 'sealed') {
      speakEve(() => getFacilityText(facility, 'lockedMessage'));
      return;
    }

    if (isMapEntry) {
      cancelEveSpeech();
      onEnterControlRoom(facility);
      return;
    }

    state.selectedFacilityId = facility.id;
    state.guidedFacilityId = null;
    clearFacilityGuide();
    renderMapCards();
    renderSelection();

    const progressVisual = getProgressVisual();
    if (!isRestored() && requestedMapVisual !== progressVisual) {
      transitionMapVisual(progressVisual);
    }

    const messageField = facility.state === 'completed' ? 'completionMessage' : 'message';
    speakEve(() => getFacilityText(facility, messageField), () => guideFacility(facility));
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
    document.querySelector(`[data-screen="map"] [data-control-room-entry][data-facility="${facilityId}"]`)?.focus();
  }

  function getStartupMessage(defaultMessage) {
    return isRestored() ? () => uiCopy.mapRestored : defaultMessage;
  }

  function start(defaultMessage, explorer) {
    progress = readProgress(explorer);
    state = createRuntimeState(progress);
    const restored = isRestored();

    initializeMapVisual(restored ? 'cosmic' : 'base');
    render();
    playIntro();
    speakEve(getStartupMessage(defaultMessage), () => {
      transitionMapVisual(restored ? 'base' : getProgressVisual());
      if (restored) {
        state.selectedFacilityId = 'cosmic';
        guideFacility(state.cosmicVoyage);
      }
    });
  }

  desktopMapMedia.addEventListener('change', handleMapVisualMediaChange);

  return {
    completeCosmicVoyage,
    completeFacility,
    focusReturnTarget,
    playIntro,
    render,
    selectFacility,
    start,
    transitionMapVisual
  };
}
