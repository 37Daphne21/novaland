const MOBILE_MEDIA_QUERY = '(max-width: 56rem)';

export function createMobileMapController() {
  const mediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY);
  const mapLayout = document.querySelector('.map-layout');
  const panels = {
    'mission-panel': document.querySelector('.mission-panel'),
    'recent-log': document.querySelector('.recent-log')
  };

  function setPanelState(panelName, isOpen) {
    const panel = panels[panelName];
    const toggle = document.querySelector(`[data-mobile-panel-toggle="${panelName}"]`);

    if (!panel || !toggle) {
      return;
    }

    panel.classList.toggle('is-mobile-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', `${panelName === 'mission-panel' ? '미션 목록' : '최근 기록'} ${isOpen ? '접기' : '펼치기'}`);
  }

  function syncLayoutState() {
    const hasOpenPanel = Object.values(panels).some((panel) => panel?.classList.contains('is-mobile-open'));
    const isMissionOpen = panels['mission-panel']?.classList.contains('is-mobile-open') ?? false;
    const isRecentLogOpen = panels['recent-log']?.classList.contains('is-mobile-open') ?? false;

    mapLayout?.classList.toggle('has-mobile-panel-open', mediaQuery.matches && hasOpenPanel);
    mapLayout?.classList.toggle('has-mobile-mission-open', mediaQuery.matches && isMissionOpen);
    mapLayout?.classList.toggle('has-mobile-recent-open', mediaQuery.matches && isRecentLogOpen);
  }

  function closePanels(exceptPanelName = null) {
    Object.keys(panels).forEach((panelName) => {
      if (panelName !== exceptPanelName) {
        setPanelState(panelName, false);
      }
    });
    syncLayoutState();
  }

  function toggle(button) {
    if (!mediaQuery.matches) {
      return;
    }

    const panelName = button?.dataset.mobilePanelToggle;
    const panel = panels[panelName];

    if (!panel) {
      return;
    }

    const willOpen = !panel.classList.contains('is-mobile-open');
    closePanels(panelName);
    setPanelState(panelName, willOpen);
    syncLayoutState();
  }

  function collapseMission() {
    if (!mediaQuery.matches) {
      return;
    }

    setPanelState('mission-panel', false);
    syncLayoutState();
  }

  function handleKeydown(event) {
    if (!mediaQuery.matches || event.key !== 'Escape') {
      return false;
    }

    const openPanel = Object.entries(panels).find(([, panel]) => panel?.classList.contains('is-mobile-open'));

    if (!openPanel) {
      return false;
    }

    event.preventDefault();
    const [panelName] = openPanel;
    setPanelState(panelName, false);
    syncLayoutState();
    document.querySelector(`[data-mobile-panel-toggle="${panelName}"]`)?.focus();
    return true;
  }

  function reset() {
    closePanels();
  }

  mediaQuery.addEventListener('change', reset);
  reset();

  return { collapseMission, handleKeydown, toggle };
}
