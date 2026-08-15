import { getExplorerProfile } from './data.js';

export function renderPassportData(root, explorer) {
  if (!root || !explorer) {
    return;
  }

  const profile = getExplorerProfile(explorer.gender);
  root.querySelectorAll('[data-passport-name]').forEach((element) => { element.textContent = explorer.name; });
  root.querySelectorAll('[data-passport-id]').forEach((element) => { element.textContent = explorer.id; });
  root.querySelectorAll('[data-passport-date]').forEach((element) => { element.textContent = explorer.issueDate; });
  root.querySelectorAll('[data-passport-gender]').forEach((element) => { element.textContent = profile.label; });
  root.querySelectorAll('[data-passport-cover-name]').forEach((element) => { element.textContent = explorer.name; });
  root.querySelectorAll('[data-passport-serial]').forEach((element) => { element.textContent = `${explorer.id} · INITIAL ISSUE`; });
  root.querySelectorAll('[data-passport-portrait]').forEach((element) => {
    element.src = profile.image;
    element.alt = profile.alt;
  });
}
