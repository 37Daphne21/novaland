const FOCUSABLE_SELECTOR = 'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function getIcon(icon) {
  return `<svg class="ui-icon" aria-hidden="true"><use href="./assets/images/common/icon-sprite.svg#icon-${icon}"></use></svg>`;
}

export function createToast(selector = '#app-toast') {
  const toast = document.querySelector(selector);
  let timer = null;

  function show(message) {
    if (!toast || !message) {
      return;
    }

    window.clearTimeout(timer);
    toast.textContent = message;
    toast.classList.add('is-visible');

    timer = window.setTimeout(() => {
      toast.classList.remove('is-visible');
    }, 2200);
  }

  return { show };
}

export function createOverlayController() {
  let activeOverlay = null;
  let previouslyFocused = null;

  function open(overlay) {
    if (!overlay) {
      return;
    }

    previouslyFocused = document.activeElement;
    activeOverlay = overlay;
    overlay.hidden = false;
    document.body.classList.add('is-overlay-open');
    overlay.querySelector('.ui-overlay__dialog')?.focus();
  }

  function close() {
    if (!activeOverlay) {
      return;
    }

    activeOverlay.hidden = true;
    activeOverlay = null;
    document.body.classList.remove('is-overlay-open');
    previouslyFocused?.focus();
  }

  function handleKeydown(event) {
    if (!activeOverlay) {
      return false;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      close();
      return true;
    }

    if (event.key !== 'Tab') {
      return false;
    }

    const dialog = activeOverlay.querySelector('.ui-overlay__dialog');
    const focusableElements = dialog
      ? [...dialog.querySelectorAll(FOCUSABLE_SELECTOR)].filter((element) => !element.hidden)
      : [];

    if (!focusableElements.length) {
      event.preventDefault();
      dialog?.focus();
      return true;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements.at(-1);

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
      return true;
    }

    if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
      return true;
    }

    return false;
  }

  return { close, handleKeydown, open };
}
