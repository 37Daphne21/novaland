import { getLanguage, languages, setLanguage, t, uiCopy } from './locales.js';

export function createSettingsController({ showToast }) {
  const languageOptions = document.querySelector('#language-options');
  const settingsOverlay = document.querySelector('#settings-overlay');
  const fullscreenToggle = document.querySelector('#fullscreen-toggle');
  const fullscreenToggleLabel = fullscreenToggle?.querySelector('b');

  function renderLanguages() {
    if (!languageOptions) {
      return;
    }

    languageOptions.innerHTML = languages.map((language) => `
      <button class="${language.code === getLanguage() ? 'is-selected' : ''}" type="button" data-language="${language.code}" aria-pressed="${language.code === getLanguage()}">${language.label}</button>
    `).join('');
  }

  function selectLanguage(button) {
    if (!languageOptions || !button) {
      return;
    }

    if (setLanguage(button.dataset.language)) {
      renderLanguages();
      showToast(t(`common.languageFeedback.${button.dataset.language}`));
    }
  }

  function setScope(scope = 'full') {
    settingsOverlay?.classList.toggle('is-language-only', scope === 'language');
  }

  function syncFullscreenToggle() {
    if (!fullscreenToggle || !fullscreenToggleLabel) {
      return;
    }

    const isFullscreen = Boolean(document.fullscreenElement);
    fullscreenToggle.setAttribute('aria-checked', String(isFullscreen));
    fullscreenToggleLabel.textContent = isFullscreen ? 'ON' : 'OFF';
  }

  async function toggleFullscreen() {
    if (!document.fullscreenEnabled) {
      showToast(uiCopy.fullscreenUnsupported);
      return;
    }

    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await document.documentElement.requestFullscreen();
      }
    } catch {
      showToast(uiCopy.fullscreenFailed);
    }
  }

  function render() {
    renderLanguages();
    syncFullscreenToggle();
  }

  return { render, selectLanguage, setScope, syncFullscreenToggle, toggleFullscreen };
}
