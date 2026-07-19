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
const initialEveMessage = eveMessage?.textContent.trim() ?? '';
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let toastTimer = null;
let eveTypingTimer = null;
let activeOverlay = null;
let previouslyFocused = null;
let selectedFacilityId = 'coaster';

function getIcon(icon) {
  return `<svg class="ui-icon" aria-hidden="true"><use href="./assets/images/common/icon-sprite.svg#icon-${icon}"></use></svg>`;
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

function finishEveSpeech() {
  window.clearInterval(eveTypingTimer);
  eveTypingTimer = null;
  eveSignalWave?.classList.remove('is-speaking');
  evePanel?.setAttribute('aria-busy', 'false');
}

function speakEve(message) {
  if (!eveMessage || !message) {
    return;
  }

  finishEveSpeech();

  if (prefersReducedMotion) {
    eveMessage.textContent = message;
    return;
  }

  const characters = Array.from(message);
  let characterIndex = 0;

  eveMessage.textContent = '';
  evePanel?.setAttribute('aria-busy', 'true');
  eveSignalWave?.classList.add('is-speaking');

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

    return `
      <li>
        <button class="facility-card ui-card is-state-${facility.state}${isSelected ? ' is-selected' : ''}" type="button" data-facility="${facility.id}" aria-pressed="${isSelected}"${isDisabled ? ' aria-disabled="true"' : ''} style="--facility-color: ${facilityColor};">
          <span class="facility-card__icon" aria-hidden="true">${getIcon(facility.icon)}</span>
          <span class="facility-card__content">
            <strong class="facility-card__name">${String(index + 1).padStart(2, '0')} · ${facility.name}</strong>
            <span class="facility-card__type">${facility.type}</span>
          </span>
          <span class="facility-card__state">${getIcon(state.icon)}${state.label}</span>
          ${isSelected && !isDisabled ? `<span class="facility-card__enter" aria-hidden="true">${getIcon('arrow-right')}</span>` : ''}
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
      </button>
    `;
  }).join('');

  const cosmicState = facilityStates[cosmicVoyage.state];
  const cosmicName = cosmicVoyage.state === 'sealed' ? '???' : cosmicVoyage.name;
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
  const cosmicName = cosmicVoyage.state === 'sealed' ? '???' : cosmicVoyage.name;
  cosmicStatus.className = `cosmic-status is-state-${cosmicVoyage.state}`;
  cosmicStatus.setAttribute('aria-disabled', String(cosmicVoyage.state === 'sealed'));
  cosmicStatus.innerHTML = `${getIcon(state.icon)}<span><strong>${cosmicName}</strong><small>${state.label}</small></span>`;
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
    speakEve(facility.lockedMessage);

    showToast(uiCopy.lockedFacility);
    return;
  }

  if (facility.id === 'cosmic') {
    showToast('COSMIC VOYAGE는 마지막 경험 단계에서 연결돼요.');
    return;
  }

  selectedFacilityId = facility.id;
  renderFacilities();
  renderMapCards();
  updateFacilityGlow(facility);

  speakEve(facility.message);

  if (button.hasAttribute('data-control-room-entry')) {
    enterControlRoom(facility);
    return;
  }

  showToast(facility.name + ' 시설을 선택했어요.');
}

function showScreen(screenName) {
  screens.forEach((screen) => {
    const isActive = screen.dataset.screen === screenName;
    screen.hidden = !isActive;
    screen.classList.toggle('is-active', isActive);
  });
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
updateFacilityGlow(facilities.find((facility) => facility.id === selectedFacilityId));
speakEve(initialEveMessage);

document.addEventListener('click', handleDocumentClick);
document.addEventListener('keydown', handleKeydown);
