import { t } from './locales.js';
import { renderPassportData } from './passport.js';
import { getProgressLogs, readProgress } from './progress.js';
import { createTabsController } from './ui.js';

export function createArchiveController({ onTabChange, showToast } = {}) {
  const root = document.querySelector('#explorer-archive-overlay');
  const title = root?.querySelector('[data-archive-title]');
  const logList = root?.querySelector('[data-archive-log-list]');
  const passportHost = root?.querySelector('[data-archive-passport]');
  const passport = document.querySelector('[data-passport]');
  const book = passport?.querySelector('.passport__book');
  const pageNavigation = root?.querySelector('.passport__navigation');
  const previousPage = root?.querySelector('[data-passport-previous]');
  const nextPage = root?.querySelector('[data-passport-next]');
  const pageNumber = root?.querySelector('[data-passport-page-number]');
  const mobilePassport = window.matchMedia('(max-width: 56rem)');
  let explorer = null;
  let facilityRecord = '';
  let pageTurn = null;
  let pageHintShown = false;

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
    if (book && pageNavigation?.parentElement !== book) {
      book.append(pageNavigation);
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
    const identityPage = passport.querySelector('.passport__page--profile');
    identityPage?.classList.toggle('is-blank', showCoasterRecord);
    if (showCoasterRecord) {
      identityPage?.setAttribute('aria-hidden', 'true');
    } else {
      identityPage?.removeAttribute('aria-hidden');
    }
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
      previousPage.hidden = pageIndex === 0;
    }
    if (nextPage) {
      nextPage.hidden = pageIndex === pages.length - 1;
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
    if (pageTurn || !book) {
      return;
    }
    const pages = getPassportPages();
    const pageIndex = Math.max(0, pages.indexOf(facilityRecord));
    const nextIndex = pageIndex + direction;
    if (nextIndex < 0 || nextIndex >= pages.length) {
      return;
    }
    pageNavigation?.classList.add('is-turning');
    const front = clonePage(mobilePassport.matches ? facilityRecord !== 'identity' : direction < 0);
    const restingPage = mobilePassport.matches ? null : clonePage(direction > 0);
    const focusedCorner = document.activeElement === previousPage || document.activeElement === nextPage;
    facilityRecord = pages[nextIndex];
    preparePassport();
    const back = clonePage(mobilePassport.matches ? facilityRecord !== 'identity' : direction > 0);
    const sheet = document.createElement('div');
    sheet.className = 'passport__turn';
    sheet.classList.toggle('is-backward', direction < 0);
    sheet.setAttribute('aria-hidden', 'true');
    sheet.inert = true;
    sheet.append(front, back);
    if (restingPage) {
      restingPage.classList.add('passport__turn-underlay');
      restingPage.classList.toggle('is-backward', direction < 0);
      restingPage.setAttribute('aria-hidden', 'true');
      restingPage.inert = true;
      book.append(restingPage);
    }
    book.append(sheet);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const angle = direction > 0 ? -180 : 180;
    const animation = sheet.animate(reducedMotion ? [{ opacity: 1 }, { opacity: 0 }] : [{ transform: 'rotateY(0deg)' }, { transform: `rotateY(${angle}deg)` }], { duration: reducedMotion ? 140 : 1150, easing: 'cubic-bezier(.55, .08, .25, 1)', fill: 'forwards' });
    pageTurn = animation;
    animation.finished.catch(() => {}).finally(() => {
      sheet.remove();
      restingPage?.remove();
      if (pageTurn === animation) {
        pageTurn = null;
        pageNavigation?.classList.remove('is-turning');
      }
    });
    if (focusedCorner) {
      const currentCorner = direction > 0 ? nextPage : previousPage;
      (currentCorner.hidden ? direction > 0 ? previousPage : nextPage : currentCorner)?.focus({ preventScroll: true });
    }
  }

  function clonePage(authority) {
    const page = passport.querySelector(authority ? '.passport__page--authority' : '.passport__page--profile').cloneNode(true);
    page.classList.remove('passport__leaf-back');
    [page, ...page.querySelectorAll('*')].forEach((element) => {
      [...element.attributes].forEach((attribute) => {
        if (attribute.name === 'id' || attribute.name.startsWith('data-')) {
          element.removeAttribute(attribute.name);
        }
      });
    });
    return page;
  }

  function cancelPageTurn() {
    pageTurn?.cancel();
    pageTurn = null;
    pageNavigation?.classList.remove('is-turning');
    book?.querySelectorAll('.passport__turn, .passport__turn-underlay').forEach((page) => page.remove());
  }

  previousPage?.addEventListener('click', () => movePassportPage(-1));
  nextPage?.addEventListener('click', () => movePassportPage(1));
  mobilePassport.addEventListener('change', () => {
    cancelPageTurn();
    if (!mobilePassport.matches && facilityRecord === 'identity') {
      facilityRecord = '';
    }
    if (passport?.classList.contains('is-archive')) {
      preparePassport();
    }
  });

  function handleTabChange(tabName) {
    cancelPageTurn();
    if (tabName === 'passport') {
      preparePassport();
      showPageHint();
    }
    onTabChange?.(tabName);
  }

  const tabs = createTabsController(root, { onChange: handleTabChange });

  function showPageHint() {
    if (!pageHintShown && getPassportPages().length > 1) {
      pageHintShown = true;
      showToast?.(t('passport.pageHint'));
    }
  }

  function open(tabName = 'log', explorerData = explorer, { stamp = '' } = {}) {
    cancelPageTurn();
    explorer = explorerData;
    facilityRecord = stamp;
    renderTitle();
    renderLogs();
    if (tabName === 'passport') {
      preparePassport();
      showPageHint();
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
