import { createEveController } from './eve.js';
import { cosmicVoyage, facilities, getExplorerProfile, getFacilityText } from './data.js';
import { createIntroController } from './intro.js';
import { initializeLanguage, t } from './locales.js';
import { createMapController } from './map.js';
import { createMobileMapController } from './mobile.js';
import { createNavigationController } from './navigation.js';
import { createSettingsController } from './settings.js';
import { createOverlayController, createToast } from './ui.js';

initializeLanguage();

const screens = document.querySelectorAll('[data-screen]');
const controlRoomTitle = document.querySelector('#control-room-title');
const controlRoomType = document.querySelector('#control-room-type');
const explorerProfileName = document.querySelector('#explorer-profile-name');
const explorerProfileImage = document.querySelector('.explorer-profile__image');
const appBackButton = document.querySelector('[data-app-back]');
const worldTitle = document.querySelector('#world-title');
const toast = createToast();
let navigation = null;
const overlay = createOverlayController({ onRequestClose: () => navigation?.back() });
const eve = createEveController();
const mobileMap = createMobileMapController();
let map = null;
let mapStarted = false;
let intro = null;
let currentExplorer = null;

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
  currentExplorer = explorer;
  const profile = getExplorerProfile(explorer.gender);
  if (explorerProfileName) {
    explorerProfileName.textContent = explorer.name;
  }
  if (explorerProfileImage) {
    explorerProfileImage.src = profile.image;
    explorerProfileImage.alt = profile.alt;
  }

  showScreen('map');
  if (!mapStarted) {
    map.start(eve.initialMessage);
    mapStarted = true;
  }

  navigation?.replace({ screen: 'map' }, { applyRoute: false });

  if (focusMap) {
    window.setTimeout(() => worldTitle?.focus({ preventScroll: true }), 120);
  }
}

function getFacility(facilityId) {
  return [...facilities, cosmicVoyage].find((facility) => facility.id === facilityId) ?? null;
}

function showControlRoom(facility, { announce = false } = {}) {
  if (controlRoomTitle) {
    controlRoomTitle.textContent = facility.name;
  }

  if (controlRoomType) {
    controlRoomType.textContent = getFacilityText(facility, 'type');
  }

  showScreen('control-room');
  controlRoomTitle?.focus({ preventScroll: true });
  if (announce) {
    toast.show(getFacilityText(facility, 'controlRoomMessage'));
  }
}

function enterControlRoom(facility) {
  window.setTimeout(() => {
    showControlRoom(facility, { announce: true });
    navigation?.push({ screen: 'control-room', facilityId: facility.id }, { applyRoute: false });
  }, 180);
}

map = createMapController({
  cancelEveSpeech: eve.cancel,
  onEnterControlRoom: enterControlRoom,
  speakEve: eve.speak
});

intro = createIntroController({
  onComplete: enterMap,
  onRouteChange: (route, { replace = false } = {}) => {
    if (replace) {
      navigation?.replace(route, { applyRoute: false });
      return;
    }
    navigation?.push(route, { applyRoute: false });
  }
});

function applyNavigationRoute(route, { previousRoute, source } = {}) {
  if (!route) {
    return;
  }

  if (route.screen === 'intro' && currentExplorer?.introCompleted) {
    navigation?.back();
    return;
  }

  overlay.close();
  mobileMap.reset();

  if (route.screen === 'intro') {
    if (previousRoute?.screen !== 'intro') {
      showScreen('intro');
    }
    const introStateChanged = previousRoute?.screen !== 'intro'
      || previousRoute.scene !== route.scene
      || previousRoute.step !== route.step;
    if (introStateChanged) {
      intro.navigate(route);
    }
  } else if (route.screen === 'control-room') {
    const facility = getFacility(route.facilityId);
    if (facility) {
      showControlRoom(facility);
    }
  } else {
    if (previousRoute?.screen !== 'map') {
      showScreen('map');
    }
    if (route.panel) {
      mobileMap.open(route.panel);
    } else if (previousRoute?.panel) {
      document.querySelector(`[data-mobile-panel-toggle="${previousRoute.panel}"]`)?.focus({ preventScroll: true });
    } else if (source === 'popstate' && previousRoute?.screen === 'control-room') {
      map.focusReturnTarget();
    }
  }

  if (route.overlay) {
    settings.setScope(route.settingsScope);
    overlay.open(document.querySelector(`#${route.overlay}`));
  }
}

navigation = createNavigationController({ button: appBackButton, onNavigate: applyNavigationRoute });

const settings = createSettingsController({ showToast: toast.show });

function handleDocumentClick(event) {
  if (event.target.closest('[data-register-back]')) {
    navigation.back();
    return;
  }

  const facilityButton = event.target.closest('[data-facility]');
  if (facilityButton) {
    if (facilityButton.closest('.mission-panel')) {
      if (navigation.current()?.panel) {
        navigation.back();
      } else {
        mobileMap.collapseMission();
      }
    }
    map.selectFacility(facilityButton);
    return;
  }

  const mobilePanelToggle = event.target.closest('[data-mobile-panel-toggle]');
  if (mobilePanelToggle) {
    const panelName = mobilePanelToggle.dataset.mobilePanelToggle;
    const currentRoute = navigation.current();
    if (currentRoute?.panel === panelName) {
      navigation.back();
    } else if (currentRoute?.panel) {
      navigation.replace({ ...currentRoute, panel: panelName });
    } else {
      navigation.push({ ...currentRoute, panel: panelName });
    }
    return;
  }

  const toastButton = event.target.closest('[data-toast]');
  if (toastButton) {
    toast.show(toastButton.dataset.toast);
    return;
  }

  const overlayOpenButton = event.target.closest('[data-overlay-open]');
  if (overlayOpenButton) {
    const settingsScope = overlayOpenButton.dataset.settingsScope || 'full';
    settings.setScope(settingsScope);
    navigation.push({ ...navigation.current(), overlay: overlayOpenButton.dataset.overlayOpen, settingsScope });
    return;
  }

  if (event.target.closest('[data-overlay-close]')) {
    if (navigation.current()?.overlay) {
      navigation.back();
    } else {
      overlay.close();
    }
    return;
  }

  if (event.target.closest('[data-fullscreen-toggle]')) {
    settings.toggleFullscreen();
    return;
  }

  if (event.target.closest('[data-reset-progress]')) {
    const shouldReset = window.confirm(t('common.resetConfirm'));
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

}

function handleLanguageChange() {
  settings.render();
  navigation.refresh();
  mobileMap.refreshLanguage();
  intro.refreshLanguage();
  eve.refreshLanguage();
  if (currentExplorer && explorerProfileImage) {
    explorerProfileImage.alt = getExplorerProfile(currentExplorer.gender).alt;
  }
  if (mapStarted) {
    map.render();
  }
  if (navigation.current()?.screen === 'control-room') {
    const facility = getFacility(navigation.current().facilityId);
    if (facility) {
      showControlRoom(facility);
    }
  }
}

function handleKeydown(event) {
  if (overlay.handleKeydown(event)) {
    return;
  }
  if (event.key === 'Escape' && navigation.current()?.panel) {
    event.preventDefault();
    navigation.back();
    return;
  }
  mobileMap.handleKeydown(event);
}

settings.render();
intro.start();

document.addEventListener('click', handleDocumentClick);
document.addEventListener('keydown', handleKeydown);
document.addEventListener('fullscreenchange', settings.syncFullscreenToggle);
window.addEventListener('novaland:languagechange', handleLanguageChange);
