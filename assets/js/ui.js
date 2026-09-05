const FOCUSABLE_SELECTOR = 'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function isVisibleFocusable(element) {
  return !element.closest('[hidden]') && element.getClientRects().length > 0 && window.getComputedStyle(element).visibility !== 'hidden';
}

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
    const host = [...document.querySelectorAll('dialog[open]')].at(-1) || document.body;
    if (toast.parentElement !== host) {
      host.append(toast);
    }
    toast.textContent = message;
    toast.classList.add('is-visible');

    timer = window.setTimeout(() => {
      toast.classList.remove('is-visible');
    }, 2200);
  }

  return { show };
}

export function createModalController(dialog, { onClose } = {}) {
  let returnTarget = null;

  function close(returnValue = '') {
    if (dialog?.open) {
      dialog.close(returnValue);
    }
  }

  function open({ focusTarget = null, opener = document.activeElement } = {}) {
    if (!dialog || dialog.open) {
      return;
    }

    returnTarget = opener instanceof HTMLElement ? opener : null;
    document.body.classList.add('is-dialog-open');
    dialog.showModal();
    if (focusTarget) {
      window.requestAnimationFrame(() => focusTarget.focus());
    }
  }

  function handleCancel(event) {
    event.preventDefault();
    close('cancel');
  }

  function handleBackdropClick(event) {
    if (event.target !== dialog) {
      return;
    }

    const rect = dialog.getBoundingClientRect();
    const isInside = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
    if (!isInside) {
      close('cancel');
    }
  }

  function handleClose() {
    document.body.classList.remove('is-dialog-open');
    onClose?.(dialog.returnValue);
    returnTarget?.focus({ preventScroll: true });
    returnTarget = null;
  }

  dialog?.addEventListener('cancel', handleCancel);
  dialog?.addEventListener('click', handleBackdropClick);
  dialog?.addEventListener('close', handleClose);

  return { close, isOpen: () => Boolean(dialog?.open), open };
}

export function createDialogController(selector = '#app-dialog') {
  const dialog = document.querySelector(selector);
  const eyebrow = dialog?.querySelector('[data-dialog-eyebrow]');
  const title = dialog?.querySelector('[data-dialog-title]');
  const description = dialog?.querySelector('[data-dialog-description]');
  const cancelButton = dialog?.querySelector('[data-dialog-cancel]');
  const confirmButton = dialog?.querySelector('[data-dialog-confirm]');
  let resolveRequest = null;
  const modal = createModalController(dialog, {
    onClose: (returnValue) => {
      const resolve = resolveRequest;
      resolveRequest = null;
      resolve?.(returnValue === 'confirm');
    }
  });

  function finish(result) {
    modal.close(result ? 'confirm' : 'cancel');
  }

  function open({ type = 'alert', tone = 'default', eyebrowText = '', titleText = '', descriptionText = '', cancelText = '', confirmText = '' } = {}) {
    if (!dialog || !title || !description || !cancelButton || !confirmButton) {
      return Promise.resolve(false);
    }

    const isConfirm = type === 'confirm';
    dialog.classList.toggle('ui-dialog--danger', tone === 'danger');
    dialog.classList.toggle('ui-dialog--alert', !isConfirm);
    if (eyebrow) {
      eyebrow.textContent = eyebrowText;
    }
    title.textContent = titleText;
    description.textContent = descriptionText;
    cancelButton.hidden = !isConfirm;
    cancelButton.textContent = cancelText;
    confirmButton.textContent = confirmText;
    confirmButton.classList.toggle('ui-button--danger', tone === 'danger');

    const result = new Promise((resolve) => {
      resolveRequest = resolve;
    });
    modal.open({ focusTarget: isConfirm ? cancelButton : confirmButton });
    return result;
  }

  cancelButton?.addEventListener('click', () => finish(false));
  confirmButton?.addEventListener('click', () => finish(true));

  return {
    alert: (options) => open({ ...options, type: 'alert' }),
    cancel: () => finish(false),
    confirm: (options) => open({ ...options, type: 'confirm' }),
    isOpen: modal.isOpen
  };
}

export function createTabsController(root, { onChange } = {}) {
  const tabs = root ? [...root.querySelectorAll('[role="tab"][data-tab]')] : [];
  const panels = root ? [...root.querySelectorAll('[role="tabpanel"][data-tab-panel]')] : [];

  function select(tabName, { focus = false, notify = false } = {}) {
    const selectedTab = tabs.find((tab) => tab.dataset.tab === tabName) || tabs[0];
    if (!selectedTab) {
      return;
    }

    tabs.forEach((tab) => {
      const isSelected = tab === selectedTab;
      tab.setAttribute('aria-selected', String(isSelected));
      tab.tabIndex = isSelected ? 0 : -1;
    });
    panels.forEach((panel) => {
      panel.hidden = panel.dataset.tabPanel !== selectedTab.dataset.tab;
    });

    if (focus) {
      selectedTab.focus({ preventScroll: true });
    }
    if (notify) {
      onChange?.(selectedTab.dataset.tab);
    }
  }

  function handleKeydown(event) {
    const currentIndex = tabs.indexOf(event.currentTarget);
    let nextIndex = currentIndex;
    if (event.key === 'ArrowRight') {
      nextIndex = (currentIndex + 1) % tabs.length;
    } else if (event.key === 'ArrowLeft') {
      nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = tabs.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    select(tabs[nextIndex].dataset.tab, { focus: true, notify: true });
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => select(tab.dataset.tab, { notify: true }));
    tab.addEventListener('keydown', handleKeydown);
  });

  return { select };
}

export function createChoiceGroupController(root, { onChange } = {}) {
  const controls = root ? [...root.querySelectorAll('input[type="radio"]')] : [];

  function getValue() {
    return controls.find((control) => control.checked)?.value ?? '';
  }

  function setValue(value) {
    controls.forEach((control) => {
      control.checked = control.value === value;
    });
  }

  function focusSelected({ preventScroll = true } = {}) {
    (controls.find((control) => control.checked) || controls[0])?.focus({ preventScroll });
  }

  function handleKeydown(event) {
    const direction = ['ArrowRight', 'ArrowDown'].includes(event.key) ? 1 : ['ArrowLeft', 'ArrowUp'].includes(event.key) ? -1 : 0;
    if (!direction || controls.length < 2) {
      return;
    }

    event.preventDefault();
    const currentIndex = controls.indexOf(event.currentTarget);
    const nextControl = controls[(currentIndex + direction + controls.length) % controls.length];
    setValue(nextControl.value);
    nextControl.focus({ preventScroll: true });
    nextControl.dispatchEvent(new Event('change', { bubbles: true }));
  }

  controls.forEach((control) => {
    control.addEventListener('change', (event) => onChange?.(event));
    control.addEventListener('keydown', handleKeydown);
  });

  return { focusSelected, getValue, setValue };
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
      ? [...dialog.querySelectorAll(FOCUSABLE_SELECTOR)].filter(isVisibleFocusable)
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
