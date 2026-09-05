import { t } from './locales.js';
import { consumeNonInteractiveClick } from './ui.js';

export function createEveController(panel = document.querySelector('.screen--map .eve-panel'), options = {}) {
  const messageElement = panel?.querySelector('[data-eve-message]');
  const speechControl = panel?.querySelector('[data-eve-skip]');
  const signalWave = panel?.querySelector('[data-eve-signal-wave]');
  const initialMessage = options.initialMessage ?? (() => t('map.initialEve'));
  const isPersistent = options.persistent ?? false;
  const useFocusMotion = options.focusMotion ?? true;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let typingTimer = null;
  let visibilityTimer = null;
  let onSpeechComplete = null;
  let activeMessage = '';
  let activeMessageSource = null;
  let lastMessageSource = initialMessage;

  function resolveMessage(messageSource) {
    return typeof messageSource === 'function' ? messageSource() : messageSource;
  }

  function cancel() {
    window.clearInterval(typingTimer);
    window.clearTimeout(visibilityTimer);
    typingTimer = null;
    visibilityTimer = null;
    onSpeechComplete = null;
    activeMessage = '';
    activeMessageSource = null;
    speechControl?.setAttribute('disabled', '');
    signalWave?.classList.add('is-paused');
    if (!isPersistent) {
      panel?.classList.remove('is-visible');
    }
    panel?.classList.remove('is-focused');
    panel?.classList.remove('is-typing');
    panel?.setAttribute('aria-busy', 'false');
  }

  function finish({ reveal = false } = {}) {
    if (reveal && activeMessage && messageElement) {
      messageElement.textContent = activeMessage;
    }
    window.clearInterval(typingTimer);
    typingTimer = null;
    signalWave?.classList.add('is-paused');
    panel?.classList.remove('is-typing');
    panel?.setAttribute('aria-busy', 'false');
    speechControl?.setAttribute('disabled', '');
    if (!isPersistent) {
      visibilityTimer = window.setTimeout(() => {
        panel?.classList.remove('is-visible');
        panel?.classList.remove('is-focused');
        visibilityTimer = null;
      }, 3200);
    }

    const onComplete = onSpeechComplete;
    onSpeechComplete = null;
    activeMessage = '';
    activeMessageSource = null;
    onComplete?.();
  }

  function reveal() {
    if (!typingTimer || !activeMessage) {
      return;
    }
    finish({ reveal: true });
  }

  function handleGlobalReveal(event) {
    if (!typingTimer || !activeMessage || panel?.closest('[hidden], [inert]') || document.querySelector('dialog[open]')) {
      return;
    }

    consumeNonInteractiveClick(event);
    reveal();
  }

  function speak(messageSource, onComplete = null) {
    const message = resolveMessage(messageSource);
    if (!messageElement || !message) {
      return;
    }

    cancel();
    activeMessage = message;
    activeMessageSource = messageSource;
    lastMessageSource = messageSource;
    onSpeechComplete = onComplete;
    panel?.classList.add('is-visible');
    panel?.classList.toggle('is-focused', useFocusMotion);
    speechControl?.removeAttribute('disabled');

    if (prefersReducedMotion) {
      messageElement.textContent = message;
      finish();
      return;
    }

    const characters = Array.from(message);
    let characterIndex = 0;

    messageElement.textContent = '';
    panel?.classList.add('is-typing');
    panel?.setAttribute('aria-busy', 'true');
    signalWave?.classList.add('is-speaking');
    signalWave?.classList.remove('is-paused');

    typingTimer = window.setInterval(() => {
      messageElement.textContent += characters[characterIndex];
      characterIndex += 1;

      if (characterIndex >= characters.length) {
        finish();
      }
    }, 34);
  }

  function refreshLanguage() {
    if (!messageElement || !lastMessageSource) {
      return;
    }

    if (typingTimer && activeMessageSource) {
      activeMessage = resolveMessage(activeMessageSource);
      finish({ reveal: true });
      return;
    }

    messageElement.textContent = resolveMessage(lastMessageSource);
  }

  document.addEventListener('click', handleGlobalReveal, true);

  return { cancel, initialMessage, refreshLanguage, speak };
}
