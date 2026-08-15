import { explorerProfiles } from './data.js';
import { createExplorerNameField, saveExplorer } from './explorer.js';
import { t } from './locales.js';
import { createChoiceGroupController, createModalController } from './ui.js';

export function createProfileEditor({ onSave } = {}) {
  const dialog = document.querySelector('#explorer-profile-dialog');
  const form = dialog?.querySelector('[data-profile-editor-form]');
  const title = dialog?.querySelector('[data-profile-editor-title]');
  const description = dialog?.querySelector('[data-profile-editor-description]');
  const fields = dialog ? [...dialog.querySelectorAll('[data-profile-editor-field]')] : [];
  const nameInput = dialog?.querySelector('#profile-editor-name');
  const nameCount = dialog?.querySelector('[data-profile-editor-count]');
  const nameError = dialog?.querySelector('[data-profile-editor-error]');
  const genderField = dialog?.querySelector('[data-profile-editor-field="gender"]');
  const cancelButton = dialog?.querySelector('[data-profile-editor-cancel]');
  const modal = createModalController(dialog);
  let currentExplorer = null;
  let currentField = 'name';
  const nameField = createExplorerNameField({ input: nameInput, count: nameCount, error: nameError });
  const genderChoice = createChoiceGroupController(genderField);

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
    nameField.setValue(explorer.name);
    genderChoice.setValue(explorer.gender);
    modal.open({ opener });
    window.requestAnimationFrame(() => {
      if (currentField === 'gender') {
        genderChoice.focusSelected({ preventScroll: false });
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
      const result = nameField.validate();
      if (result.error) {
        return;
      }
      updatedExplorer = { ...currentExplorer, name: result.name };
    } else {
      const selectedGender = genderChoice.getValue();
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

  cancelButton?.addEventListener('click', () => modal.close('cancel'));
  form?.addEventListener('submit', handleSubmit);

  return { isOpen: modal.isOpen, open, refreshLanguage };
}
