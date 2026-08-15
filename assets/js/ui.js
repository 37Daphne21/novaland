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

export function createDialogController(selector = '#app-dialog') {
  const dialog = document.querySelector(selector);
  const eyebrow = dialog?.querySelector('[data-dialog-eyebrow]');
  const title = dialog?.querySelector('[data-dialog-title]');
  const message = dialog?.querySelector('[data-dialog-message]');
  const cancelButton = dialog?.querySelector('[data-dialog-cancel]');
  const confirmButton = dialog?.querySelector('[data-dialog-confirm]');
  let resolveRequest = null;

  function finish(result) {
    if (!dialog?.open) {
      return;
    }
    dialog.close(result ? 'confirm' : 'cancel');
  }

  function open({ type = 'alert', tone = 'default', eyebrowText = '', titleText = '', messageText = '', cancelText = '', confirmText = '' } = {}) {
    if (!dialog || !title || !message || !cancelButton || !confirmButton) {
      return Promise.resolve(false);
    }

    const isConfirm = type === 'confirm';
    dialog.classList.toggle('ui-dialog--danger', tone === 'danger');
    dialog.classList.toggle('ui-dialog--alert', !isConfirm);
    if (eyebrow) {
      eyebrow.textContent = eyebrowText;
    }
    title.textContent = titleText;
    message.textContent = messageText;
    cancelButton.hidden = !isConfirm;
    cancelButton.textContent = cancelText;
    confirmButton.textContent = confirmText;
    confirmButton.classList.toggle('ui-button--danger', tone === 'danger');

    const result = new Promise((resolve) => {
      resolveRequest = resolve;
    });
    document.body.classList.add('is-dialog-open');
    dialog.showModal();
    window.requestAnimationFrame(() => (isConfirm ? cancelButton : confirmButton).focus());
    return result;
  }

  function handleClose() {
    document.body.classList.remove('is-dialog-open');
    const resolve = resolveRequest;
    resolveRequest = null;
    resolve?.(dialog.returnValue === 'confirm');
  }

  function handleCancel(event) {
    event.preventDefault();
    finish(false);
  }

  function handleBackdropClick(event) {
    if (event.target !== dialog) {
      return;
    }
    const rect = dialog.getBoundingClientRect();
    const isInside = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
    if (!isInside) {
      finish(false);
    }
  }

  cancelButton?.addEventListener('click', () => finish(false));
  confirmButton?.addEventListener('click', () => finish(true));
  dialog?.addEventListener('cancel', handleCancel);
  dialog?.addEventListener('click', handleBackdropClick);
  dialog?.addEventListener('close', handleClose);

  return {
    alert: (options) => open({ ...options, type: 'alert' }),
    cancel: () => finish(false),
    confirm: (options) => open({ ...options, type: 'confirm' }),
    isOpen: () => Boolean(dialog?.open)
  };
}

export function createOverlayController({ onRequestClose } = {}) {
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

  function requestClose() {
    if (!activeOverlay) {
      return;
    }
    if (onRequestClose) {
      onRequestClose();
      return;
    }
    close();
  }

  function handleKeydown(event) {
    if (!activeOverlay) {
      return false;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      requestClose();
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
