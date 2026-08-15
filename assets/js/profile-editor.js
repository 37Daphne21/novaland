import { explorerProfiles } from './data.js';
import { getExplorerNameCharacterCount, saveExplorer, validateExplorerName } from './explorer.js';
import { t } from './locales.js';
import { createModalController } from './ui.js';

export function createProfileEditor({ onSave } = {}) {
  const dialog = document.querySelector('#explorer-profile-dialog');
  const form = dialog?.querySelector('[data-profile-editor-form]');
  const title = dialog?.querySelector('[data-profile-editor-title]');
  const description = dialog?.querySelector('[data-profile-editor-description]');
  const fields = dialog ? [...dialog.querySelectorAll('[data-profile-editor-field]')] : [];
  const nameInput = dialog?.querySelector('#profile-editor-name');
  const nameCount = dialog?.querySelector('[data-profile-editor-count]');
  const nameError = dialog?.querySelector('[data-profile-editor-error]');
  const genderInputs = dialog ? [...dialog.querySelectorAll('input[name="profileGender"]')] : [];
  const cancelButton = dialog?.querySelector('[data-profile-editor-cancel]');
  const modal = createModalController(dialog);
  let currentExplorer = null;
  let currentField = 'name';

  function updateNameCount() {
    if (nameCount && nameInput) {
      nameCount.textContent = String(getExplorerNameCharacterCount(nameInput.value));
    }
  }

  function setField(fieldName) {
    currentField = fieldName === 'gender' ? 'gender' : 'name';
    fields.forEach((field) => { field.hidden = field.dataset.profileEditorField !== currentField; });
    if (title) {
      title.textContent = t(currentField === 'gender' ? 'profile.genderTitle' : 'profile.nameTitle');
    }
    if (description) {
      description.textContent = t(currentField === 'gender' ? 'profile.genderDescription' : 'profile.nameDescription');
    }
  }

  function open(fieldName, explorer, opener = document.activeElement) {
    if (!dialog || !explorer) {
      return;
    }

    currentExplorer = explorer;
    setField(fieldName);
    if (nameInput) {
      nameInput.value = explorer.name;
      nameInput.removeAttribute('aria-invalid');
    }
    if (nameError) {
      nameError.textContent = '';
    }
    updateNameCount();
    genderInputs.forEach((input) => { input.checked = input.value === explorer.gender; });
    modal.open({ opener });
    window.requestAnimationFrame(() => {
      if (currentField === 'gender') {
        (genderInputs.find((input) => input.checked) || genderInputs[0])?.focus();
      } else {
        nameInput?.focus();
        nameInput?.select();
      }
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!currentExplorer) {
      return;
    }

    let updatedExplorer = currentExplorer;
    if (currentField === 'name') {
      const result = validateExplorerName(nameInput?.value ?? '');
      if (result.error) {
        if (nameInput) {
          nameInput.setAttribute('aria-invalid', 'true');
        }
        if (nameError) {
          nameError.textContent = result.error;
        }
        nameInput?.focus();
        return;
      }
      updatedExplorer = { ...currentExplorer, name: result.name };
    } else {
      const selectedGender = genderInputs.find((input) => input.checked)?.value;
      if (!explorerProfiles[selectedGender]) {
        return;
      }
      updatedExplorer = { ...currentExplorer, gender: selectedGender };
    }

    saveExplorer(updatedExplorer);
    currentExplorer = updatedExplorer;
    onSave?.(updatedExplorer, currentField);
    modal.close();
  }

  function refreshLanguage() {
    if (dialog?.open) {
      setField(currentField);
    }
  }

  nameInput?.addEventListener('input', () => {
    nameInput.removeAttribute('aria-invalid');
    if (nameError) {
      nameError.textContent = '';
    }
    updateNameCount();
  });
  cancelButton?.addEventListener('click', () => modal.close('cancel'));
  form?.addEventListener('submit', handleSubmit);

  return { isOpen: modal.isOpen, open, refreshLanguage };
}
