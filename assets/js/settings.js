import { languages, uiCopy } from './locales.js';

export function createSettingsController({ showToast }) {
  const languageOptions = document.querySelector('#language-options');
  const fullscreenToggle = document.querySelector('#fullscreen-toggle');
  const fullscreenToggleLabel = fullscreenToggle?.querySelector('b');

  function renderLanguages() {
    if (!languageOptions) {
      return;
    }

    languageOptions.innerHTML = languages.map((language) => `
      <button class="${language.default ? 'is-selected' : ''}" type="button" data-language="${language.code}" aria-pressed="${language.default}">${language.label}</button>
    `).join('');
  }

  function selectLanguage(button) {
    if (!languageOptions || !button) {
      return;
    }

    languageOptions.querySelectorAll('button').forEach((option) => {
      const isSelected = option === button;
      option.classList.toggle('is-selected', isSelected);
      option.setAttribute('aria-pressed', String(isSelected));
    });

    const language = languages.find(({ code }) => code === button.dataset.language);
    showToast(language?.feedback);
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

  return { render, selectLanguage, syncFullscreenToggle, toggleFullscreen };
}
