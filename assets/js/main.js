import { createArchiveController } from './archive.js';
import { createCoasterRepair } from './coaster-repair.js';
import { createControlRoomController } from './control-room.js';
import { createEveController } from './eve.js';
import { cosmicVoyage, facilities, getExplorerProfile } from './data.js';
import { createIntroController } from './intro.js';
import { initializeLanguage, t } from './locales.js';
import { createMapController } from './map.js';
import { createMobileMapController } from './mobile.js';
import { createMissionController } from './mission.js';
import { findRestorableMissionId } from './mission-state.js';
import { createNavigationController } from './navigation.js';
import { createProfileEditor } from './profile-editor.js';
import { clearProgress, isMissionPreview, readProgress } from './progress.js';
import { createSettingsController } from './settings.js';
import { createDialogController, createOverlayController, createToast } from './ui.js';

initializeLanguage();

const missionPreviewPhase = new URLSearchParams(window.location.search).get('mission-preview');
const shouldPreviewMission = isMissionPreview();
const previewExplorer = { name: 'TEST EXPLORER', gender: 'female', id: 'NL-TEST-0000', introCompleted: true };

const screens = document.querySelectorAll('[data-screen]');
const explorerProfileName = document.querySelector('#explorer-profile-name');
const explorerProfileImage = document.querySelector('.explorer-profile__image');
const appBackButton = document.querySelector('[data-app-back]');
const worldTitle = document.querySelector('#world-title');
const toast = createToast();
const dialog = createDialogController();
let navigation = null;
const overlay = createOverlayController({ onRequestClose: () => navigation?.back() });
const archive = createArchiveController({
  showToast: toast.show,
  onTabChange: (archiveTab) => navigation?.replace({ ...navigation.current(), archiveTab }, { applyRoute: false })
});
const profileEditor = createProfileEditor({ onSave: updateExplorer });
const eve = createEveController();
const mobileMap = createMobileMapController();
let map = null;
let mapStarted = false;
let intro = null;
let currentExplorer = null;
let controlRoom = null;

function renderExplorerProfile(explorer) {
  const profile = getExplorerProfile(explorer.gender);
  if (explorerProfileName) {
    explorerProfileName.textContent = explorer.name;
  }
  if (explorerProfileImage) {
    explorerProfileImage.src = profile.image;
    explorerProfileImage.alt = profile.alt;
  }
}

function updateExplorer(explorer) {
  currentExplorer = explorer;
  archive.setExplorer(explorer);
  renderExplorerProfile(explorer);
  toast.show(t('profile.saved'));
}

function showScreen(screenName) {
  if (screenName !== 'control-room') {
    controlRoom?.cancel();
  } else if (appBackButton) {
    appBackButton.hidden = true;
  }
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

controlRoom = createControlRoomController({
  getExplorer: () => currentExplorer,
  onMapRequest: () => navigation?.back(),
  onShowScreen: showScreen,
  showToast: toast.show
});

function enterMap(explorer, { focusMap = false } = {}) {
  currentExplorer = explorer;
  archive.setExplorer(explorer);
  renderExplorerProfile(explorer);

  showScreen('map');
  if (!mapStarted) {
    map.start(eve.initialMessage, explorer);
    mapStarted = true;
  }

  navigation?.replace({ screen: 'map' }, { applyRoute: false });

  if (!shouldPreviewMission) {
    const progress = readProgress(explorer);
    const resumableMissionId = findRestorableMissionId(progress);
    const resumableFacility = getFacility(resumableMissionId);
    if (resumableFacility) {
      controlRoom.show(resumableFacility);
      navigation?.replace({ screen: 'control-room', facilityId: resumableFacility.id }, { applyRoute: false });
      window.setTimeout(() => mission.open(resumableFacility, controlRoom.getFocusTarget()), 120);
      return;
    }
  }

  if (focusMap) {
    window.setTimeout(() => worldTitle?.focus({ preventScroll: true }), 120);
  }
}

function getFacility(facilityId) {
  return [...facilities, cosmicVoyage].find((facility) => facility.id === facilityId) ?? null;
}

function enterControlRoom(facility) {
  window.setTimeout(() => {
    controlRoom.show(facility, { announce: true });
    navigation?.push({ screen: 'control-room', facilityId: facility.id }, { applyRoute: false });
  }, 180);
}

map = createMapController({
  cancelEveSpeech: eve.cancel,
  onEnterControlRoom: enterControlRoom,
  speakEve: eve.speak
});

const mission = createMissionController({
  createGame: createCoasterRepair,
  duration: 90,
  getExplorer: () => currentExplorer,
  onComplete: (facility) => {
    map.completeFacility(facility.id);
    controlRoom.refreshState();
  },
  onControlRoom: () => controlRoom.refreshState(),
  onExit: () => navigation?.back(),
  onRecord: () => {
    navigation?.replace({ screen: 'map' });
    navigation?.push({ screen: 'map', overlay: 'explorer-archive-overlay', archiveTab: 'passport', archiveStamp: 'coaster' });
  },
  testSteps: ['connection', 'trial', 'safety']
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
      controlRoom.show(facility);
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
    if (route.overlay === 'settings-overlay') {
      settings.setScope(route.settingsScope);
    } else if (route.overlay === 'explorer-archive-overlay') {
      archive.open(route.archiveTab, currentExplorer, { stamp: route.archiveStamp });
    }
    overlay.open(document.querySelector(`#${route.overlay}`));
  }
}

navigation = createNavigationController({ button: appBackButton, onNavigate: applyNavigationRoute });

const settings = createSettingsController({ showToast: toast.show });

async function handleDocumentClick(event) {
  const missionOpenButton = event.target.closest('[data-mission-open]');
  const controlFacility = controlRoom.getFacility();
  if (missionOpenButton && controlFacility?.id === 'coaster') {
    mission.open(controlFacility, missionOpenButton);
    return;
  }

  const passportEditButton = event.target.closest('[data-passport-edit]');
  if (passportEditButton) {
    profileEditor.open(passportEditButton.dataset.passportEdit, currentExplorer, passportEditButton);
    return;
  }

  if (event.target.closest('[data-register-back]')) {
    navigation.back();
    return;
  }

  const facilityButton = event.target.closest('button[data-facility]');
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
    const archiveTab = overlayOpenButton.dataset.archiveTab;
    navigation.push({
      ...navigation.current(),
      overlay: overlayOpenButton.dataset.overlayOpen,
      ...(overlayOpenButton.dataset.overlayOpen === 'settings-overlay' ? { settingsScope } : {}),
      ...(archiveTab ? { archiveTab } : {})
    });
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
    const shouldReset = await dialog.confirm({
      tone: 'danger',
      eyebrowText: t('common.resetDialogEyebrow'),
      titleText: t('common.resetDialogTitle'),
      descriptionText: t('common.resetDialogDescription'),
      cancelText: t('common.cancel'),
      confirmText: t('common.resetDialogConfirm')
    });
    if (shouldReset) {
      clearProgress();
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
  archive.refreshLanguage();
  profileEditor.refreshLanguage();
  navigation.refresh();
  mobileMap.refreshLanguage();
  intro.refreshLanguage();
  eve.refreshLanguage();
  controlRoom.refreshLanguage();
  mission.refreshLanguage();
  if (currentExplorer && explorerProfileImage) {
    explorerProfileImage.alt = getExplorerProfile(currentExplorer.gender).alt;
  }
  if (mapStarted) {
    map.render();
  }
}

function handleKeydown(event) {
  if (mission.isOpen()) {
    return;
  }
  if (dialog.isOpen()) {
    if (event.key === 'Escape') {
      event.preventDefault();
      dialog.cancel();
    }
    return;
  }
  if (profileEditor.isOpen()) {
    return;
  }
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
if (shouldPreviewMission) {
  const facility = getFacility('coaster');
  enterMap(previewExplorer);
  controlRoom.show(facility);
  navigation?.replace({ screen: 'control-room', facilityId: facility.id }, { applyRoute: false });
  window.setTimeout(() => mission.open(facility, controlRoom.getFocusTarget(), { previewPhase: missionPreviewPhase }), 120);
} else {
  intro.start();
}

document.addEventListener('click', handleDocumentClick);
document.addEventListener('keydown', handleKeydown);
document.addEventListener('fullscreenchange', settings.syncFullscreenToggle);
window.addEventListener('novaland:languagechange', handleLanguageChange);
