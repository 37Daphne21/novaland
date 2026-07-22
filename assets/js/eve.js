export function createEveController() {
  const panel = document.querySelector('.eve-panel');
  const messageElement = document.querySelector('#eve-message');
  const signalWave = document.querySelector('#eve-signal-wave');
  const initialMessage = messageElement?.textContent.trim() ?? '';
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let typingTimer = null;
  let visibilityTimer = null;
  let onSpeechComplete = null;

  function cancel() {
    window.clearInterval(typingTimer);
    window.clearTimeout(visibilityTimer);
    typingTimer = null;
    visibilityTimer = null;
    onSpeechComplete = null;
    signalWave?.classList.add('is-paused');
    panel?.classList.remove('is-visible');
    panel?.setAttribute('aria-busy', 'false');
  }

  function finish() {
    window.clearInterval(typingTimer);
    typingTimer = null;
    signalWave?.classList.add('is-paused');
    panel?.setAttribute('aria-busy', 'false');
    visibilityTimer = window.setTimeout(() => {
      panel?.classList.remove('is-visible');
      visibilityTimer = null;
    }, 3200);

    const onComplete = onSpeechComplete;
    onSpeechComplete = null;
    onComplete?.();
  }

  function speak(message, onComplete = null) {
    if (!messageElement || !message) {
      return;
    }

    cancel();
    onSpeechComplete = onComplete;
    panel?.classList.add('is-visible');

    if (prefersReducedMotion) {
      messageElement.textContent = message;
      finish();
      return;
    }

    const characters = Array.from(message);
    let characterIndex = 0;

    messageElement.textContent = '';
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

  return { cancel, initialMessage, speak };
}
