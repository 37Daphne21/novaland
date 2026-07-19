import { facilities, languages, recentLogs, uiCopy } from './data.js';

const facilityList = document.querySelector('#facility-list');
const recentLogList = document.querySelector('#recent-log-list');
const eveMessage = document.querySelector('#eve-message');
const toast = document.querySelector('#app-toast');
const languageOptions = document.querySelector('#language-options');

let toastTimer = null;
let activeOverlay = null;
let previouslyFocused = null;

function getIcon(icon) {
  return `<svg class="ui-icon" aria-hidden="true"><use href="./assets/images/common/icon-sprite.svg#icon-${icon}"></use></svg>`;
}

function showToast(message) {
  if (!toast || !message) {
    return;
  }

  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add('is-visible');

  toastTimer = window.setTimeout(() => {
    toast.classList.remove('is-visible');
  }, 2200);
}

function renderFacilities() {
  if (!facilityList) {
    return;
  }

  facilityList.innerHTML = facilities.map((facility, index) => {
    const isSelected = facility.state === 'active';
    const isDisabled = facility.state === 'locked';
    const stateIcon = isDisabled ? 'lock' : 'check';

    return `
      <li>
        <button class="facility-card ui-card${isSelected ? ' is-selected' : ''}" type="button" data-facility="${facility.id}" aria-pressed="${isSelected}"${isDisabled ? ' aria-disabled="true"' : ''} style="--facility-color: var(--color-${facility.id});">
          <img class="facility-card__image" src="${facility.thumbnail}" alt="">
          <span class="facility-card__content">
            <strong class="facility-card__name">${String(index + 1).padStart(2, '0')} · ${facility.name}</strong>
            <span class="facility-card__type">${facility.type}</span>
          </span>
          <span class="facility-card__state">${getIcon(stateIcon)}${facility.stateLabel}</span>
        </button>
      </li>
    `;
  }).join('');
}

function renderRecentLogs() {
  if (!recentLogList) {
    return;
  }

  recentLogList.innerHTML = recentLogs.map((log) => `
    <li class="recent-log__item">
      <time class="recent-log__time" datetime="${log.datetime}">${log.time}</time>
      <span>${log.message}</span>
    </li>
  `).join('');
}

function renderLanguages() {
  if (!languageOptions) {
    return;
  }

  languageOptions.innerHTML = languages.map((language) => `
    <button class="${language.default ? 'is-selected' : ''}" type="button" data-language="${language.code}" aria-pressed="${language.default}">${language.label}</button>
  `).join('');
}

function selectFacility(button) {
  const facility = facilities.find((item) => item.id === button.dataset.facility);

  if (!facility) {
    return;
  }

  if (facility.state === 'locked') {
    showToast(uiCopy.lockedFacility);
    return;
  }

  document.querySelectorAll('[data-facility]').forEach((item) => {
    const isSelected = item === button;
    item.classList.toggle('is-selected', isSelected);
    item.setAttribute('aria-pressed', String(isSelected));
  });

  if (eveMessage) {
    eveMessage.textContent = facility.message;
  }

  showToast(`${facility.name} 시설을 선택했어요.`);
}

function openOverlay(overlay) {
  if (!overlay) {
    return;
  }

  previouslyFocused = document.activeElement;
  activeOverlay = overlay;
  overlay.hidden = false;
  document.body.classList.add('is-overlay-open');
  overlay.querySelector('.ui-overlay__dialog')?.focus();
}

function closeOverlay() {
  if (!activeOverlay) {
    return;
  }

  activeOverlay.hidden = true;
  activeOverlay = null;
  document.body.classList.remove('is-overlay-open');
  previouslyFocused?.focus();
}

function handleDocumentClick(event) {
  const facilityButton = event.target.closest('[data-facility]');
  const toastButton = event.target.closest('[data-toast]');
  const overlayOpenButton = event.target.closest('[data-overlay-open]');
  const overlayCloseButton = event.target.closest('[data-overlay-close]');
  const languageButton = event.target.closest('[data-language]');

  if (facilityButton) {
    selectFacility(facilityButton);
  }

  if (toastButton) {
    showToast(toastButton.dataset.toast);
  }

  if (overlayOpenButton) {
    openOverlay(document.querySelector(`#${overlayOpenButton.dataset.overlayOpen}`));
  }

  if (overlayCloseButton) {
    closeOverlay();
  }

  if (languageButton) {
    languageOptions.querySelectorAll('button').forEach((button) => {
      const isSelected = button === languageButton;
      button.classList.toggle('is-selected', isSelected);
      button.setAttribute('aria-pressed', String(isSelected));
    });

    showToast(languageButton.dataset.language === 'ko' ? uiCopy.languageKorean : uiCopy.languageEnglish);
  }
}

function handleKeydown(event) {
  if (event.key === 'Escape') {
    closeOverlay();
  }
}

renderFacilities();
renderRecentLogs();
renderLanguages();

document.addEventListener('click', handleDocumentClick);
document.addEventListener('keydown', handleKeydown);
