import { t } from './locales.js';
import { renderPassportData } from './passport.js';
import { getProgressLogs, readProgress } from './progress.js';
import { createTabsController } from './ui.js';

export function createArchiveController({ onTabChange } = {}) {
  const root = document.querySelector('#explorer-archive-overlay');
  const title = root?.querySelector('[data-archive-title]');
  const logList = root?.querySelector('[data-archive-log-list]');
  const passportHost = root?.querySelector('[data-archive-passport]');
  const passport = document.querySelector('[data-passport]');
  const previousPage = root?.querySelector('[data-passport-previous]');
  const nextPage = root?.querySelector('[data-passport-next]');
  const pageNumber = root?.querySelector('[data-passport-page-number]');
  const mobilePassport = window.matchMedia('(max-width: 56rem)');
  let explorer = null;
  let facilityRecord = '';

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
    const logs = explorer ? getProgressLogs(readProgress(explorer)) : [];
    const items = logs.map((log, index) => {
      const item = document.createElement('li');
      const marker = document.createElement('span');
      const time = document.createElement('time');
      const content = document.createElement('span');
      const label = document.createElement('small');
      const message = document.createElement('strong');

      item.className = 'archive-log__item';
      marker.className = 'archive-log__marker';
      marker.setAttribute('aria-hidden', 'true');
      marker.append(document.createElement('i'));
      time.dateTime = log.datetime;
      time.textContent = log.time;
      label.textContent = t('archive.logEntry', { number: String(index + 1).padStart(2, '0') });
      message.textContent = log.message;
      content.append(label, message);
      item.append(marker, time, content);
      return item;
    });
    logList.replaceChildren(...items);
  }

  function refreshPassport() {
    if (explorer && passport?.classList.contains('is-archive')) {
      renderPassportData(passport, explorer);
    }
  }

  function preparePassport() {
    if (!passportHost || !passport || !explorer) {
      return;
    }
    if (passport.parentElement !== passportHost) {
      passportHost.append(passport);
    }
    passport.classList.remove('is-closing');
    passport.classList.add('is-open', 'is-writing', 'is-stamped', 'is-archive');
    passport.classList.toggle('is-mobile-identity', facilityRecord === 'identity');
    passport.querySelectorAll('[data-passport-edit]').forEach((button) => { button.hidden = false; });
    passport.querySelector('[data-passport-status]')?.replaceChildren('REGISTERED');
    const record = passport.querySelector('[data-passport-facility-record]');
    const authorityContent = passport.querySelector('.passport__page-content--authority');
    const authorityLabel = passport.querySelector('[data-passport-authority-label]');
    const pages = getPassportPages();
    const showCoasterRecord = facilityRecord === 'coaster' && pages.includes('coaster');
    if (record) {
      record.hidden = !showCoasterRecord;
    }
    if (authorityContent) {
      authorityContent.hidden = showCoasterRecord;
    }
    if (authorityLabel) {
      authorityLabel.textContent = showCoasterRecord ? 'FACILITY RESTORATION 01' : 'NOVA LAND AUTHORITY';
    }
    const pageIndex = Math.max(0, pages.indexOf(facilityRecord));
    if (previousPage) {
      previousPage.disabled = pageIndex === 0;
    }
    if (nextPage) {
      nextPage.disabled = pageIndex === pages.length - 1;
    }
    if (pageNumber) {
      pageNumber.textContent = `${pageIndex + 1} / ${pages.length}`;
    }
    renderPassportData(passport, explorer);
  }

  function getPassportPages() {
    const pages = mobilePassport.matches ? ['', 'identity'] : [''];
    if (explorer && readProgress(explorer).stamps.some((stamp) => stamp.facilityId === 'coaster')) {
      pages.push('coaster');
    }
    return pages;
  }

  function movePassportPage(direction) {
    const pages = getPassportPages();
    const pageIndex = Math.max(0, pages.indexOf(facilityRecord));
    facilityRecord = pages[Math.max(0, Math.min(pages.length - 1, pageIndex + direction))];
    preparePassport();
    if (document.activeElement?.disabled) {
      (direction > 0 ? previousPage : nextPage)?.focus();
    }
  }

  previousPage?.addEventListener('click', () => movePassportPage(-1));
  nextPage?.addEventListener('click', () => movePassportPage(1));
  mobilePassport.addEventListener('change', () => {
    if (!mobilePassport.matches && facilityRecord === 'identity') {
      facilityRecord = '';
    }
    if (passport?.classList.contains('is-archive')) {
      preparePassport();
    }
  });

  function handleTabChange(tabName) {
    if (tabName === 'passport') {
      preparePassport();
    }
    onTabChange?.(tabName);
  }

  const tabs = createTabsController(root, { onChange: handleTabChange });

  function open(tabName = 'log', explorerData = explorer, { stamp = '' } = {}) {
    explorer = explorerData;
    facilityRecord = stamp;
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
    refreshPassport();
  }

  function setExplorer(explorerData) {
    explorer = explorerData;
    renderTitle();
    refreshPassport();
  }

  return { open, refreshLanguage, setExplorer };
}
