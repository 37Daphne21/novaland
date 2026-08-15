const HISTORY_STATE_KEY = 'novaLandRoute';

function createHistoryState(route) {
  return { [HISTORY_STATE_KEY]: route };
}

function getBackLabel(route) {
  if (route?.overlay) {
    return '열린 창 닫기';
  }
  if (route?.panel) {
    return '열린 패널 닫기';
  }
  if (route?.screen === 'control-room') {
    return 'WORLD MAP으로 돌아가기';
  }
  if (route?.screen !== 'intro') {
    return '';
  }
  if (route.scene === 'passport') {
    return 'Explorer 선택으로 돌아가기';
  }
  if (route.scene === 'register' && route.step === 'identity') {
    return '이름 입력으로 돌아가기';
  }
  if (route.scene === 'register') {
    return '구조 신호로 돌아가기';
  }
  if (route.scene === 'signal') {
    return 'Welcome으로 돌아가기';
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

  return { back, current: () => currentRoute, push, replace };
}
