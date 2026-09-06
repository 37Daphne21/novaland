import { t } from './locales.js';

// The two games share the same pause content, action order and translation keys.
export function renderMissionPause(panel, { titleId = 'mission-paused-title', descriptionKey = 'mission.pausedDescription' } = {}) {
  if (!panel) return;
  panel.innerHTML = `<div class="mission-result__seal" aria-hidden="true">Ⅱ</div><span class="ui-panel__eyebrow" data-i18n="mission.status.paused">${t('mission.status.paused')}</span><h3 id="${titleId}" data-i18n="mission.pausedTitle">${t('mission.pausedTitle')}</h3><p data-i18n="${descriptionKey}">${t(descriptionKey)}</p><div class="mission-result__actions"><button class="ui-button ui-button--primary" type="button" data-mission-resume data-i18n="mission.resume">${t('mission.resume')}</button><button class="ui-button ui-button--secondary" type="button" data-mission-restart data-i18n="mission.restart">${t('mission.restart')}</button><button class="ui-button ui-button--secondary" type="button" data-mission-control-room data-i18n="mission.toControlRoom">${t('mission.toControlRoom')}</button><button class="ui-button ui-button--secondary" type="button" data-mission-exit data-i18n="mission.toMap">${t('mission.toMap')}</button></div>`;
}
