import { createEveController } from './eve.js';
import { createMapController } from './map.js';
import { createSettingsController } from './settings.js';
import { createOverlayController, createToast } from './ui.js';

const screens = document.querySelectorAll('[data-screen]');
const controlRoomTitle = document.querySelector('#control-room-title');
const controlRoomType = document.querySelector('#control-room-type');
const toast = createToast();
const overlay = createOverlayController();
const eve = createEveController();
let map = null;

function showScreen(screenName) {
  screens.forEach((screen) => {
    const isActive = screen.dataset.screen === screenName;
    screen.hidden = !isActive;
    screen.classList.toggle('is-active', isActive);
  });

  if (screenName === 'map') {
    map.render();
    map.playIntro();
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
    toast.show(facility.controlRoomMessage);
  }, 180);
}

map = createMapController({
  cancelEveSpeech: eve.cancel,
  onEnterControlRoom: enterControlRoom,
  showToast: toast.show,
  speakEve: eve.speak
});

const settings = createSettingsController({ showToast: toast.show });

function handleDocumentClick(event) {
  const facilityButton = event.target.closest('[data-facility]');
  if (facilityButton) {
    map.selectFacility(facilityButton);
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
  overlay.handleKeydown(event);
}

map.render();
settings.render();
map.playIntro();
eve.speak(map.getStartupMessage(eve.initialMessage));

document.addEventListener('click', handleDocumentClick);
document.addEventListener('keydown', handleKeydown);
document.addEventListener('fullscreenchange', settings.syncFullscreenToggle);
