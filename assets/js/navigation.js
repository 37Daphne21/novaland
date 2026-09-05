import { t } from './locales.js';

const HISTORY_STATE_KEY = 'novaLandRoute';

function createHistoryState(route) {
  return { [HISTORY_STATE_KEY]: route };
}

function getBackLabel(route) {
  if (route?.overlay) {
    return t('navigation.closeOverlay');
  }
  if (route?.panel) {
    return t('navigation.closePanel');
  }
  if (route?.screen === 'control-room') {
    return t('navigation.toMap');
  }
  if (route?.screen !== 'intro') {
    return '';
  }
  if (route.scene === 'passport') {
    return t('navigation.toIdentity');
  }
  if (route.scene === 'register' && route.step === 'identity') {
    return t('navigation.toName');
  }
  if (route.scene === 'register') {
    return t('navigation.toSignal');
  }
  if (route.scene === 'signal') {
    return t('navigation.toWelcome');
  }
  return '';
}

export function createNavigationController({ button, onNavigate }) {
  let currentRoute = null;

  function updateButton(route) {
    if (!button) {
      return;
    }

    const label = getBackLabel(route);
    button.hidden = !label;
    if (label) {
      button.setAttribute('aria-label', label);
      button.title = label;
    } else {
      button.removeAttribute('aria-label');
      button.removeAttribute('title');
    }
  }

  function apply(route, source) {
    const previousRoute = currentRoute;
    currentRoute = route;
    updateButton(route);
    onNavigate?.(route, { previousRoute, source });
  }

  function replace(route, { applyRoute = true } = {}) {
    window.history.replaceState(createHistoryState(route), '', window.location.href);
    if (applyRoute) {
      apply(route, 'replace');
      return;
    }
    currentRoute = route;
    updateButton(route);
  }

  function push(route, { applyRoute = true } = {}) {
    window.history.pushState(createHistoryState(route), '', window.location.href);
    if (applyRoute) {
      apply(route, 'push');
      return;
    }
    currentRoute = route;
    updateButton(route);
  }

  function back() {
    window.history.back();
  }

  function handlePopState(event) {
    const route = event.state?.[HISTORY_STATE_KEY];
    if (route) {
      apply(route, 'popstate');
    }
  }

  button?.addEventListener('click', back);
  window.addEventListener('popstate', handlePopState);

  return { back, current: () => currentRoute, push, refresh: () => updateButton(currentRoute), replace };
}
