import { getExplorerProfile } from './data.js';
import { t } from './locales.js';
import { getRestorationState, readProgress } from './progress.js';

function setText(root, selector, value) {
  root.querySelectorAll(selector).forEach((element) => {
    element.textContent = value;
  });
}

export function renderPassportData(root, explorer) {
  if (!root || !explorer) {
    return;
  }

  const profile = getExplorerProfile(explorer.gender);
  const progress = readProgress(explorer);
  const restoration = getRestorationState(progress);
  const coupon = progress.coupons.find((item) => item.facilityId === 'coaster');
  const passport = root.matches?.('[data-passport]') ? root : root.querySelector('[data-passport]');
  passport?.classList.toggle('is-restored', restoration.completed > 0);
  setText(root, '[data-passport-coaster-coupon]', coupon ? t('passport.couponPending') : '—');
  const coasterStamp = restoration.stamps.find((stamp) => stamp.facilityId === 'coaster');
  setText(root, '[data-passport-name]', explorer.name);
  setText(root, '[data-passport-id]', explorer.id);
  setText(root, '[data-passport-date]', explorer.issueDate);
  setText(root, '[data-passport-gender]', profile.label);
  setText(root, '[data-passport-restoration]', `${restoration.completed} / ${restoration.total}`);
  setText(root, '[data-passport-coaster-date]', coasterStamp ? new Intl.DateTimeFormat('en-CA').format(new Date(coasterStamp.earnedAt)).replaceAll('-', '.') : '—');
  setText(root, '[data-passport-cover-name]', explorer.name);
  setText(root, '[data-passport-serial]', `${explorer.id} · INITIAL ISSUE`);
  root.querySelectorAll('[data-passport-portrait]').forEach((element) => {
    element.src = profile.image;
    element.alt = profile.alt;
  });
}
