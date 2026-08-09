import { createEveController } from './eve.js';
import { createIntroController } from './intro.js';
import { createMapController } from './map.js';
import { createMobileMapController } from './mobile.js';
import { createSettingsController } from './settings.js';
import { createOverlayController, createToast } from './ui.js';

const screens = document.querySelectorAll('[data-screen]');
const controlRoomTitle = document.querySelector('#control-room-title');
const controlRoomType = document.querySelector('#control-room-type');
const explorerProfileName = document.querySelector('#explorer-profile-name');
const worldTitle = document.querySelector('#world-title');
const toast = createToast();
const overlay = createOverlayController();
const eve = createEveController();
const mobileMap = createMobileMapController();
let map = null;
let mapStarted = false;
let intro = null;

function showScreen(screenName) {
  screens.forEach((screen) => {
    const isActive = screen.dataset.screen === screenName;
    screen.hidden = !isActive;
    screen.classList.toggle('is-active', isActive);
  });

  if (screenName === 'map' && mapStarted) {
    map.render();
    map.playIntro();
  }
}

function enterMap(explorer, { focusMap = false } = {}) {
  if (explorerProfileName) {
    explorerProfileName.textContent = explorer.name;
  }

  showScreen('map');
  if (!mapStarted) {
    map.start(eve.initialMessage);
    mapStarted = true;
  }

  if (focusMap) {
    window.setTimeout(() => worldTitle?.focus({ preventScroll: true }), 120);
  }
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
    controlRoomTitle?.focus({ preventScroll: true });
    toast.show(facility.controlRoomMessage);
  }, 180);
}

map = createMapController({
  cancelEveSpeech: eve.cancel,
  onEnterControlRoom: enterControlRoom,
  speakEve: eve.speak
});

intro = createIntroController({ onComplete: enterMap });

const settings = createSettingsController({ showToast: toast.show });

function handleDocumentClick(event) {
  const facilityButton = event.target.closest('[data-facility]');
  if (facilityButton) {
    if (facilityButton.closest('.mission-panel')) {
      mobileMap.collapseMission();
    }
    map.selectFacility(facilityButton);
    return;
  }

  const mobilePanelToggle = event.target.closest('[data-mobile-panel-toggle]');
  if (mobilePanelToggle) {
    mobileMap.toggle(mobilePanelToggle);
    return;
  }

  const toastButton = event.target.closest('[data-toast]');
  if (toastButton) {
    toast.show(toastButton.dataset.toast);
    return;
  }

  const overlayOpenButton = event.target.closest('[data-overlay-open]');
  if (overlayOpenButton) {
    overlay.open(document.querySelector(`#${overlayOpenButton.dataset.overlayOpen}`));
    return;
  }

  if (event.target.closest('[data-overlay-close]')) {
    overlay.close();
    return;
  }

  if (event.target.closest('[data-fullscreen-toggle]')) {
    settings.toggleFullscreen();
    return;
  }

  if (event.target.closest('[data-reset-progress]')) {
    const shouldReset = window.confirm('Explorer 정보와 Intro 등록 상태를 초기화하고 처음부터 다시 시작할까요?');
    if (shouldReset) {
      intro.reset();
      window.location.href = window.location.pathname;
    }
    return;
  }

  const languageButton = event.target.closest('[data-language]');
  if (languageButton) {
    settings.selectLanguage(languageButton);
    return;
  }

  const screenBackButton = event.target.closest('[data-screen-back]');
  if (screenBackButton) {
    showScreen(screenBackButton.dataset.screenBack);
    map.focusReturnTarget();
  }
}

function handleKeydown(event) {
  if (!overlay.handleKeydown(event)) {
    mobileMap.handleKeydown(event);
  }
}

settings.render();
intro.start();

document.addEventListener('click', handleDocumentClick);
document.addEventListener('keydown', handleKeydown);
document.addEventListener('fullscreenchange', settings.syncFullscreenToggle);
