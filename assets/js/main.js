import { cosmicVoyage, facilities, facilityStates, languages, recentLogs, uiCopy } from './data.js';

const facilityList = document.querySelector('#facility-list');
const mapCardList = document.querySelector('#map-card-list');
const cosmicStatus = document.querySelector('#cosmic-status');
const facilityGlow = document.querySelector('#facility-glow');
const recentLogList = document.querySelector('#recent-log-list');
const eveMessage = document.querySelector('#eve-message');
const evePanel = document.querySelector('.eve-panel');
const eveSignalWave = document.querySelector('#eve-signal-wave');
const missionProgress = document.querySelector('#mission-progress');
const missionProgressValue = document.querySelector('#mission-progress-value');
const missionProgressBar = document.querySelector('#mission-progress-bar');
const toast = document.querySelector('#app-toast');
const languageOptions = document.querySelector('#language-options');
const controlRoomTitle = document.querySelector('#control-room-title');
const controlRoomType = document.querySelector('#control-room-type');
const screens = document.querySelectorAll('[data-screen]');
const worldMapHeading = document.querySelector('.world-map__heading');
const worldMapTitle = document.querySelector('#world-title');
const worldMapSubtitle = worldMapHeading?.querySelector('p');
const initialEveMessage = eveMessage?.textContent.trim() ?? '';
const worldMapTitleText = worldMapTitle?.textContent.trim() ?? '';
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let toastTimer = null;
let eveTypingTimer = null;
let worldMapTypingTimer = null;
let eveSpeechComplete = null;
let activeOverlay = null;
let previouslyFocused = null;
let selectedFacilityId = 'coaster';

function getIcon(icon) {
  return `<svg class="ui-icon" aria-hidden="true"><use href="./assets/images/common/icon-sprite.svg#icon-${icon}"></use></svg>`;
}

function getFacilityDisplayName(facility) {
  return facility.state === 'sealed' ? '???' : facility.name;
}

function showToast(message) {
  if (!toast || !message) {
    return;
  }

  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add('is-visible');

  toastTimer = window.setTimeout(() => {
    toast.classList.remove('is-visible');
  }, 2200);
}

function cancelEveSpeech() {
  window.clearInterval(eveTypingTimer);
  eveTypingTimer = null;
  eveSpeechComplete = null;
  eveSignalWave?.classList.add('is-paused');
  evePanel?.setAttribute('aria-busy', 'false');
}

function finishEveSpeech() {
  window.clearInterval(eveTypingTimer);
  eveTypingTimer = null;
  eveSignalWave?.classList.add('is-paused');
  evePanel?.setAttribute('aria-busy', 'false');

  const onComplete = eveSpeechComplete;
  eveSpeechComplete = null;
  onComplete?.();
}

function speakEve(message, onComplete = null) {
  if (!eveMessage || !message) {
    return;
  }

  cancelEveSpeech();
  eveSpeechComplete = onComplete;

  if (prefersReducedMotion) {
    eveMessage.textContent = message;
    finishEveSpeech();
    return;
  }

  const characters = Array.from(message);
  let characterIndex = 0;

  eveMessage.textContent = '';
  evePanel?.setAttribute('aria-busy', 'true');
  eveSignalWave?.classList.add('is-speaking');
  eveSignalWave?.classList.remove('is-paused');

  eveTypingTimer = window.setInterval(() => {
    eveMessage.textContent += characters[characterIndex];
    characterIndex += 1;

    if (characterIndex >= characters.length) {
      finishEveSpeech();
    }
  }, 34);
}

function renderMissionProgress() {
  if (!missionProgress || !missionProgressValue || !missionProgressBar) {
    return;
  }

  const currentStep = Math.max(1, facilities.filter((facility) => facility.state !== 'locked').length);
  const progress = currentStep / facilities.length * 100;

  missionProgress.setAttribute('aria-valuenow', String(currentStep));
  missionProgressValue.textContent = `${currentStep} / ${facilities.length}`;
  missionProgressBar.style.width = `${progress}%`;
}

function renderFacilities() {
  if (!facilityList) {
    return;
  }

  facilityList.innerHTML = facilities.map((facility, index) => {
    const state = facilityStates[facility.state];
    const isSelected = facility.id === selectedFacilityId;
    const isDisabled = facility.state === 'locked';
    const facilityColor = isDisabled ? 'var(--color-locked)' : `var(--color-${facility.id})`;
    const description = isDisabled ? uiCopy.lockedCondition : facility.type;

    return `
      <li>
        <button class="facility-card ui-card is-state-${facility.state}${isSelected ? ' is-selected' : ''}" type="button" data-facility="${facility.id}" aria-pressed="${isSelected}"${isDisabled ? ' aria-disabled="true"' : ''} style="--facility-color: ${facilityColor};">
          <span class="facility-card__number">${String(index + 1).padStart(2, '0')}</span>
          <span class="facility-card__icon" aria-hidden="true"><img src="./assets/images/common/facility-${facility.id}.png" alt="" width="256" height="256"></span>
          <span class="facility-card__content">
            <strong class="facility-card__name">${facility.name}</strong>
            <span class="facility-card__description">${description}</span>
            <span class="facility-card__state">${getIcon(state.icon)}${state.label}</span>
          </span>
        </button>
      </li>
    `;
  }).join('');
}

function renderMapCards() {
  if (!mapCardList) {
    return;
  }

  const facilityCards = facilities.map((facility, index) => {
    const state = facilityStates[facility.state];
    const isSelected = facility.id === selectedFacilityId;
    const isDisabled = facility.state === 'locked';
    const marker = isDisabled ? getIcon('lock') : String(index + 1).padStart(2, '0');

    return `
      <button class="map-facility-card is-state-${facility.state}${isSelected ? ' is-selected' : ''}" type="button" data-facility="${facility.id}" data-control-room-entry aria-pressed="${isSelected}"${isDisabled ? ' aria-disabled="true"' : ''} style="--marker-x: ${facility.position.x}%; --marker-y: ${facility.position.y}%; --facility-color: var(--color-${facility.id});">
        <span class="map-facility-card__number">${marker}</span>
        <span class="map-facility-card__content"><strong>${facility.name}</strong><small>${facility.type}</small><i>${getIcon(state.icon)}${state.label}</i></span>
        <span class="map-facility-card__enter" aria-hidden="true">${getIcon('arrow-right')}</span>
      </button>
    `;
  }).join('');

  const cosmicState = facilityStates[cosmicVoyage.state];
  const cosmicName = getFacilityDisplayName(cosmicVoyage);
  const cosmicCard = `
    <button class="map-facility-card map-facility-card--cosmic is-state-${cosmicVoyage.state}" type="button" data-facility="cosmic" data-control-room-entry aria-disabled="${cosmicVoyage.state === 'sealed'}" style="--marker-x: ${cosmicVoyage.position.x}%; --marker-y: ${cosmicVoyage.position.y}%; --facility-color: var(--color-cosmic);">
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

  const state = facilityStates[cosmicVoyage.state];
  const cosmicName = getFacilityDisplayName(cosmicVoyage);
  cosmicStatus.className = `cosmic-status is-state-${cosmicVoyage.state}`;
  cosmicStatus.setAttribute('aria-disabled', String(cosmicVoyage.state === 'sealed'));
  cosmicStatus.innerHTML = `
    <span class="cosmic-status__icon" aria-hidden="true">${getIcon(state.icon)}</span>
    <span class="cosmic-status__content">
      <strong>${cosmicName}</strong>
      <small>${cosmicVoyage.state === 'sealed' ? uiCopy.cosmicCondition : cosmicVoyage.type}</small>
      <i>${getIcon(state.icon)}${state.label}</i>
    </span>
  `;
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

function clearFacilityGuide() {
  facilityGlow?.classList.remove('is-visible');
  mapCardList?.querySelector('.map-facility-card.is-guided')?.classList.remove('is-guided');
}

function guideFacility(facility) {
  mapCardList?.querySelector(`[data-facility="${facility.id}"]`)?.classList.add('is-guided');
  updateFacilityGlow(facility);
}

function renderRecentLogs() {
  if (!recentLogList) {
    return;
  }

  recentLogList.innerHTML = recentLogs.map((log) => `
    <li class="recent-log__item">
      <time class="recent-log__time" datetime="${log.datetime}">${log.time}</time>
      <span>${log.message}</span>
    </li>
  `).join('');
}

function renderLanguages() {
  if (!languageOptions) {
    return;
  }

  languageOptions.innerHTML = languages.map((language) => `
    <button class="${language.default ? 'is-selected' : ''}" type="button" data-language="${language.code}" aria-pressed="${language.default}">${language.label}</button>
  `).join('');
}

function selectFacility(button) {
  const facilityId = button.dataset.facility;
  const facility = facilityId === 'cosmic'
    ? cosmicVoyage
    : facilities.find((item) => item.id === facilityId);

  if (!facility) {
    return;
  }

  if (facility.state === 'locked' || facility.state === 'sealed') {
    clearFacilityGuide();
    renderMapCards();
    speakEve(facility.lockedMessage);
    return;
  }

  if (facility.id === 'cosmic') {
    showToast('COSMIC VOYAGE는 마지막 경험 단계에서 연결돼요.');
    return;
  }

  selectedFacilityId = facility.id;
  clearFacilityGuide();
  renderFacilities();
  renderMapCards();

  if (button.hasAttribute('data-control-room-entry')) {
    cancelEveSpeech();
    enterControlRoom(facility);
    return;
  }

  speakEve(facility.message, () => guideFacility(facility));
}

function showScreen(screenName) {
  screens.forEach((screen) => {
    const isActive = screen.dataset.screen === screenName;
    screen.hidden = !isActive;
    screen.classList.toggle('is-active', isActive);
  });

  if (screenName === 'map') playWorldMapIntro();
}

function playWorldMapIntro() {
  if (!worldMapHeading || !worldMapTitle || !worldMapSubtitle || !worldMapTitleText) return;

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

function enterControlRoom(facility) {
  if (controlRoomTitle) {
    controlRoomTitle.textContent = facility.name;
  }

  if (controlRoomType) {
    controlRoomType.textContent = facility.type;
  }

  window.setTimeout(() => {
    showScreen('control-room');
    showToast(facility.controlRoomMessage);
  }, 180);
}

function openOverlay(overlay) {
  if (!overlay) {
    return;
  }

  previouslyFocused = document.activeElement;
  activeOverlay = overlay;
  overlay.hidden = false;
  document.body.classList.add('is-overlay-open');
  overlay.querySelector('.ui-overlay__dialog')?.focus();
}

function closeOverlay() {
  if (!activeOverlay) {
    return;
  }

  activeOverlay.hidden = true;
  activeOverlay = null;
  document.body.classList.remove('is-overlay-open');
  previouslyFocused?.focus();
}

function handleDocumentClick(event) {
  const facilityButton = event.target.closest('[data-facility]');
  const toastButton = event.target.closest('[data-toast]');
  const overlayOpenButton = event.target.closest('[data-overlay-open]');
  const overlayCloseButton = event.target.closest('[data-overlay-close]');
  const languageButton = event.target.closest('[data-language]');
  const screenBackButton = event.target.closest('[data-screen-back]');

  if (facilityButton) {
    selectFacility(facilityButton);
  }

  if (toastButton) {
    showToast(toastButton.dataset.toast);
  }

  if (overlayOpenButton) {
    openOverlay(document.querySelector(`#${overlayOpenButton.dataset.overlayOpen}`));
  }

  if (overlayCloseButton) {
    closeOverlay();
  }

  if (languageButton) {
    languageOptions.querySelectorAll('button').forEach((button) => {
      const isSelected = button === languageButton;
      button.classList.toggle('is-selected', isSelected);
      button.setAttribute('aria-pressed', String(isSelected));
    });

    showToast(languageButton.dataset.language === 'ko' ? uiCopy.languageKorean : uiCopy.languageEnglish);
  }

  if (screenBackButton) {
    showScreen(screenBackButton.dataset.screenBack);
    document.querySelector(`[data-screen="map"] [data-facility="${selectedFacilityId}"]`)?.focus();
  }
}

function handleKeydown(event) {
  if (event.key === 'Escape') {
    closeOverlay();
  }
}

renderFacilities();
renderMapCards();
renderCosmicStatus();
renderMissionProgress();
renderRecentLogs();
renderLanguages();
playWorldMapIntro();
speakEve(initialEveMessage);

document.addEventListener('click', handleDocumentClick);
document.addEventListener('keydown', handleKeydown);
