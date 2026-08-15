import { getRecentLogs } from './data.js';
import { t } from './locales.js';
import { renderPassportData } from './passport.js';
import { createTabsController } from './ui.js';

export function createArchiveController({ onTabChange } = {}) {
  const root = document.querySelector('#explorer-archive-overlay');
  const title = root?.querySelector('[data-archive-title]');
  const logList = root?.querySelector('[data-archive-log-list]');
  const passportHost = root?.querySelector('[data-archive-passport]');
  const passport = document.querySelector('[data-passport]');
  let explorer = null;

  function renderTitle() {
    if (!title) {
      return;
    }

    if (!explorer) {
      title.textContent = t('archive.defaultTitle');
      return;
    }

    const name = document.createElement('strong');
    name.className = 'explorer-archive__name';
    name.textContent = explorer.name;
    title.replaceChildren(name, document.createTextNode(t('archive.titleSuffix')));
  }

  function renderLogs() {
    if (!logList) {
      return;
    }
    logList.innerHTML = getRecentLogs().map((log, index) => `
      <li class="archive-log__item">
        <span class="archive-log__marker" aria-hidden="true"><i></i></span>
        <time datetime="${log.datetime}">${log.time}</time>
        <span><small>${t('archive.logEntry', { number: String(index + 1).padStart(2, '0') })}</small><strong>${log.message}</strong></span>
      </li>
    `).join('');
  }

  function preparePassport() {
    if (!passportHost || !passport || !explorer) {
      return;
    }
    if (passport.parentElement !== passportHost) {
      passportHost.append(passport);
    }
    passport.classList.remove('is-closing');
    passport.classList.add('is-open', 'is-mobile-identity', 'is-writing', 'is-stamped', 'is-archive');
    passport.querySelectorAll('[data-passport-edit]').forEach((button) => { button.hidden = false; });
    passport.querySelector('[data-passport-status]')?.replaceChildren('REGISTERED');
    renderPassportData(passport, explorer);
  }

  function handleTabChange(tabName) {
    if (tabName === 'passport') {
      preparePassport();
    }
    onTabChange?.(tabName);
  }

  const tabs = createTabsController(root, { onChange: handleTabChange });

  function open(tabName = 'log', explorerData = explorer) {
    explorer = explorerData;
    renderTitle();
    renderLogs();
    if (tabName === 'passport') {
      preparePassport();
    }
    tabs.select(tabName);
  }

  function refreshLanguage() {
    renderTitle();
    renderLogs();
    if (explorer && passport?.classList.contains('is-archive')) {
      renderPassportData(passport, explorer);
    }
  }

  function setExplorer(explorerData) {
    explorer = explorerData;
    renderTitle();
    if (passport?.classList.contains('is-archive')) {
      renderPassportData(passport, explorer);
    }
  }

  return { open, refreshLanguage, setExplorer };
}
