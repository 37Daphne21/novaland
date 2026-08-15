export function createEveController() {
  const panel = document.querySelector('.eve-panel');
  const messageElement = document.querySelector('#eve-message');
  const speechControl = panel?.querySelector('[data-eve-skip="map"]');
  const signalWave = document.querySelector('#eve-signal-wave');
  const initialMessage = messageElement?.textContent.trim() ?? '';
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let typingTimer = null;
  let visibilityTimer = null;
  let onSpeechComplete = null;
  let activeMessage = '';

  function cancel() {
    window.clearInterval(typingTimer);
    window.clearTimeout(visibilityTimer);
    typingTimer = null;
    visibilityTimer = null;
    onSpeechComplete = null;
    activeMessage = '';
    speechControl?.setAttribute('disabled', '');
    signalWave?.classList.add('is-paused');
    panel?.classList.remove('is-visible');
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
    visibilityTimer = window.setTimeout(() => {
      panel?.classList.remove('is-visible');
      panel?.classList.remove('is-focused');
      visibilityTimer = null;
    }, 3200);

    const onComplete = onSpeechComplete;
    onSpeechComplete = null;
    activeMessage = '';
    onComplete?.();
  }

  function reveal() {
    if (!typingTimer || !activeMessage) {
      return;
    }
    finish({ reveal: true });
  }

  function handleGlobalReveal(event) {
    if (!typingTimer || !activeMessage) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    reveal();
  }

  function speak(message, onComplete = null) {
    if (!messageElement || !message) {
      return;
    }

    cancel();
    activeMessage = message;
    onSpeechComplete = onComplete;
    panel?.classList.add('is-visible');
    panel?.classList.add('is-focused');
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

  document.addEventListener('click', handleGlobalReveal, true);

  return { cancel, initialMessage, speak };
}
