import { explorerProfiles } from './data.js';
import { t } from './locales.js';

const STORAGE_KEY = 'novaLandExplorer';

export function getExplorerNameCharacterCount(value) {
  return Array.from(value).length;
}

export function normalizeExplorerName(value) {
  return value.trim().replace(/\s+/g, ' ');
}

export function validateExplorerName(value) {
  const name = normalizeExplorerName(value);
  const characterCount = getExplorerNameCharacterCount(name);

  if (!name) {
    return { error: t('intro.validation.required'), name };
  }
  if (characterCount < 2 || characterCount > 12) {
    return { error: t('intro.validation.length'), name };
  }
  if (!/^[가-힣A-Za-z0-9]+(?: [가-힣A-Za-z0-9]+)*$/u.test(name)) {
    return { error: t('intro.validation.characters'), name };
  }

  return { error: '', name };
}

export function createExplorerNameField({ input, count, error, onInput } = {}) {
  function updateCount() {
    if (count && input) {
      count.textContent = String(getExplorerNameCharacterCount(input.value));
    }
  }

  function clearError() {
    input?.removeAttribute('aria-invalid');
    if (error) {
      error.textContent = '';
    }
  }

  function setValue(value, { clearValidation = true } = {}) {
    if (input) {
      input.value = value ?? '';
    }
    updateCount();
    if (clearValidation) {
      clearError();
    }
  }

  function validate({ focus = true } = {}) {
    const result = validateExplorerName(input?.value ?? '');
    setValue(result.name, { clearValidation: !result.error });
    if (result.error) {
      input?.setAttribute('aria-invalid', 'true');
      if (error) {
        error.textContent = result.error;
      }
      if (focus) {
        input?.focus();
      }
    }
    return result;
  }

  function refreshError() {
    if (input?.getAttribute('aria-invalid') === 'true' && error) {
      error.textContent = validateExplorerName(input.value).error;
    }
  }

  input?.addEventListener('input', () => {
    clearError();
    updateCount();
    onInput?.(input.value);
  });

  updateCount();
  return { clearError, refreshError, setValue, validate };
}

export function readExplorer() {
  try {
    const value = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
    if (!value?.introCompleted || !value?.name || !value?.id) {
      return null;
    }
    return { ...value, gender: explorerProfiles[value.gender] ? value.gender : 'female' };
  } catch {
    return null;
  }
}

export function saveExplorer(explorer) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(explorer));
    return true;
  } catch {
    return false;
  }
}

export function clearExplorer() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // 저장소 접근이 제한되어도 현재 화면 초기화는 계속한다.
  }
}
