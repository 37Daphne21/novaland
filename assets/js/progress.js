import { facilities } from './data.js';
import { getLanguage, t } from './locales.js';
import { MISSION_PHASES } from './mission-state.js';

const STORAGE_KEY = 'novaLandProgress';
const SCHEMA_VERSION = 1;
const LOG_LIMIT = 100;
const FACILITY_STATUSES = new Set(['available', 'locked', 'completed']);
const facilityIds = facilities.map((facility) => facility.id);

function toIsoString(value, fallback = new Date()) {
  const date = value ? new Date(value) : fallback;
  return Number.isNaN(date.getTime()) ? fallback.toISOString() : date.toISOString();
}

function createId(prefix) {
  const randomId = globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  return `${prefix}-${randomId}`;
}

function cloneProgress(progress) {
  return JSON.parse(JSON.stringify(progress));
}

function createLog(messageKey, createdAt, { facilityId = '', values = {} } = {}) {
  return {
    id: createId('log'),
    messageKey,
    facilityId,
    values,
    createdAt: toIsoString(createdAt)
  };
}

function createInitialLogs(issuedAt) {
  const registeredAt = new Date(toIsoString(issuedAt));
  const startedAt = new Date(registeredAt.getTime() - 25 * 60 * 1000);
  const signalAt = new Date(registeredAt.getTime() + 1000);

  return [
    createLog('log.coaster', signalAt, { facilityId: 'coaster' }),
    createLog('log.registered', registeredAt),
    createLog('log.started', startedAt)
  ];
}

export function createProgress(explorer = null) {
  const createdAt = toIsoString(explorer?.issuedAt);
  return {
    version: SCHEMA_VERSION,
    explorerId: explorer?.id ?? '',
    facilities: Object.fromEntries(facilityIds.map((facilityId, index) => [facilityId, {
      status: index === 0 ? 'available' : 'locked',
      completedAt: null
    }])),
    missions: Object.fromEntries(facilityIds.map((facilityId) => [facilityId, {
      phase: 'idle',
      checkpoint: null,
      attempts: 0,
      updatedAt: null
    }])),
    logs: createInitialLogs(createdAt),
    stamps: [],
    coupons: [],
    createdAt,
    updatedAt: createdAt
  };
}

function normalizeProgress(value, explorer) {
  const fallback = createProgress(explorer);
  if (!value || value.version !== SCHEMA_VERSION || (explorer?.id && value.explorerId !== explorer.id)) {
    return fallback;
  }

  const progress = {
    ...fallback,
    explorerId: explorer?.id ?? value.explorerId ?? '',
    createdAt: toIsoString(value.createdAt, new Date(fallback.createdAt)),
    updatedAt: toIsoString(value.updatedAt, new Date(fallback.updatedAt))
  };

  facilityIds.forEach((facilityId) => {
    const savedFacility = value.facilities?.[facilityId];
    const savedMission = value.missions?.[facilityId];
    progress.facilities[facilityId] = {
      status: FACILITY_STATUSES.has(savedFacility?.status) ? savedFacility.status : fallback.facilities[facilityId].status,
      completedAt: savedFacility?.completedAt ? toIsoString(savedFacility.completedAt) : null
    };
    progress.missions[facilityId] = {
      phase: MISSION_PHASES.has(savedMission?.phase) ? savedMission.phase : 'idle',
      checkpoint: savedMission?.checkpoint ?? null,
      attempts: Number.isInteger(savedMission?.attempts) && savedMission.attempts >= 0 ? savedMission.attempts : 0,
      updatedAt: savedMission?.updatedAt ? toIsoString(savedMission.updatedAt) : null
    };
    if (progress.facilities[facilityId].status === 'completed') {
      progress.missions[facilityId].phase = 'completed';
      progress.missions[facilityId].checkpoint = null;
    } else if (progress.facilities[facilityId].status === 'locked') {
      progress.missions[facilityId].phase = 'idle';
      progress.missions[facilityId].checkpoint = null;
      progress.missions[facilityId].attempts = 0;
    }
  });

  progress.logs = Array.isArray(value.logs)
    ? value.logs.filter((log) => log?.id && log?.messageKey && log?.createdAt).slice(0, LOG_LIMIT).map((log) => ({
      id: String(log.id),
      messageKey: String(log.messageKey),
      facilityId: facilityIds.includes(log.facilityId) ? log.facilityId : '',
      values: log.values && typeof log.values === 'object' ? log.values : {},
      createdAt: toIsoString(log.createdAt)
    }))
    : fallback.logs;
  progress.stamps = Array.isArray(value.stamps)
    ? value.stamps.filter((stamp) => facilityIds.includes(stamp?.facilityId)).map((stamp) => ({
      id: String(stamp.id || `${stamp.facilityId}-restored`),
      facilityId: stamp.facilityId,
      earnedAt: toIsoString(stamp.earnedAt)
    }))
    : [];

  progress.coupons = facilityIds.filter((id) => progress.facilities[id].status === 'completed').map((facilityId) => ({
    facilityId,
    status: 'pending',
    earnedAt: progress.facilities[facilityId].completedAt || progress.stamps.find((stamp) => stamp.facilityId === facilityId)?.earnedAt || progress.updatedAt
  }));

  return progress;
}

export function isRestoredPreview() {
  const hostname = window.location.hostname;
  return (hostname === 'localhost' || hostname.startsWith('127.'))
    && new URLSearchParams(window.location.search).get('map-state') === 'restored';
}

export function isMissionPreview() {
  const hostname = window.location.hostname;
  const previewPhase = new URLSearchParams(window.location.search).get('mission-preview');
  return (hostname === 'localhost' || hostname.startsWith('127.'))
    && ['guide', 'countdown', 'testing', 'completed'].includes(previewPhase);
}

function createRestoredPreview(progress) {
  const restored = cloneProgress(progress);
  const restoredAt = new Date().toISOString();
  facilityIds.forEach((facilityId) => {
    restored.facilities[facilityId] = { status: 'completed', completedAt: restoredAt };
    restored.missions[facilityId] = { phase: 'completed', checkpoint: null, attempts: 1, updatedAt: restoredAt };
  });
  restored.stamps = facilityIds.map((facilityId) => ({ id: `${facilityId}-restored`, facilityId, earnedAt: restoredAt }));
  restored.coupons = facilityIds.map((facilityId) => ({ facilityId, status: 'pending', earnedAt: restoredAt }));
  if (!restored.logs.some((log) => log.messageKey === 'map.restoredLog')) {
    restored.logs.unshift(createLog('map.restoredLog', restoredAt));
  }
  restored.updatedAt = restoredAt;
  return restored;
}

export function saveProgress(progress) {
  const normalized = normalizeProgress(progress, { id: progress?.explorerId ?? '' });
  normalized.updatedAt = new Date().toISOString();
  if (isRestoredPreview()) {
    return createRestoredPreview(normalized);
  }
  if (isMissionPreview()) {
    return normalized;
  }
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
  } catch {
    // 저장소 접근이 제한된 환경에서도 현재 세션의 진행은 유지한다.
  }
  return normalized;
}

export function readProgress(explorer = null) {
  if (isMissionPreview() && new URLSearchParams(window.location.search).get('mission-preview') === 'completed') {
    return recordFacilityCompletion(createProgress(explorer), facilities.find((facility) => facility.id === 'coaster'));
  }
  let progress = null;
  let shouldSave = false;
  try {
    const savedValue = window.localStorage.getItem(STORAGE_KEY);
    const parsedValue = savedValue ? JSON.parse(savedValue) : null;
    shouldSave = !parsedValue
      || !Array.isArray(parsedValue.coupons)
      || parsedValue.version !== SCHEMA_VERSION
      || Boolean(explorer?.id && parsedValue.explorerId !== explorer.id)
      || facilityIds.some((facilityId) => {
        const savedStatus = parsedValue?.facilities?.[facilityId]?.status;
        const savedMission = parsedValue?.missions?.[facilityId];
        return savedStatus === 'completed' && (savedMission?.phase !== 'completed' || savedMission?.checkpoint !== null)
          || savedStatus === 'locked' && (savedMission?.phase !== 'idle' || savedMission?.checkpoint !== null || savedMission?.attempts > 0);
      });
    progress = normalizeProgress(parsedValue, explorer);
  } catch {
    progress = createProgress(explorer);
    shouldSave = true;
  }

  if (isRestoredPreview()) {
    return createRestoredPreview(progress);
  }
  if (shouldSave) {
    return saveProgress(progress);
  }
  return progress;
}

export function clearProgress() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // 저장소 접근이 제한된 환경에서도 현재 화면 초기화는 계속한다.
  }
}

export function getProgressLogs(progress, limit = LOG_LIMIT) {
  const locale = getLanguage() === 'ko' ? 'ko-KR' : 'en-US';
  const formatter = new Intl.DateTimeFormat(locale, { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
  return progress.logs.slice(0, limit).map((log) => ({
    ...log,
    time: formatter.format(new Date(log.createdAt)),
    datetime: log.createdAt,
    message: t(log.messageKey, log.values)
  }));
}

export function getRestorationState(progress) {
  const completed = facilityIds.filter((facilityId) => progress.facilities[facilityId]?.status === 'completed');
  return { completed: completed.length, total: facilityIds.length, stamps: [...progress.stamps] };
}

export function updateMissionProgress(progress, facilityId, updates = {}) {
  if (!facilityIds.includes(facilityId)) {
    return progress;
  }
  const currentMission = progress.missions[facilityId];
  const phase = MISSION_PHASES.has(updates.phase) ? updates.phase : currentMission.phase;
  const updatedAt = new Date().toISOString();
  const nextProgress = cloneProgress(progress);
  nextProgress.missions[facilityId] = {
    phase,
    checkpoint: Object.prototype.hasOwnProperty.call(updates, 'checkpoint') ? updates.checkpoint : currentMission.checkpoint,
    attempts: Number.isInteger(updates.attempts) && updates.attempts >= 0 ? updates.attempts : currentMission.attempts,
    updatedAt
  };
  return saveProgress(nextProgress);
}

export function recordFacilityCompletion(progress, facility) {
  const facilityIndex = facilityIds.indexOf(facility?.id);
  const savedFacility = progress.facilities[facility?.id];
  if (facilityIndex < 0 || !savedFacility || savedFacility.status === 'locked' || savedFacility.status === 'completed') {
    return progress;
  }

  const completedAt = new Date().toISOString();
  const nextProgress = cloneProgress(progress);
  nextProgress.facilities[facility.id] = { status: 'completed', completedAt };
  nextProgress.missions[facility.id] = {
    ...nextProgress.missions[facility.id],
    phase: 'completed',
    checkpoint: null,
    updatedAt: completedAt
  };
  nextProgress.stamps = nextProgress.stamps.filter((stamp) => stamp.facilityId !== facility.id);
  nextProgress.stamps.push({ id: `${facility.id}-restored`, facilityId: facility.id, earnedAt: completedAt });
  nextProgress.logs.unshift(createLog('log.facilityCompleted', completedAt, { facilityId: facility.id, values: { facility: facility.name } }));

  const nextFacilityId = facilityIds[facilityIndex + 1];
  if (nextFacilityId) {
    nextProgress.facilities[nextFacilityId].status = 'available';
    nextProgress.logs.unshift(createLog('log.facilityUnlocked', completedAt, {
      facilityId: nextFacilityId,
      values: { facility: facilities[facilityIndex + 1].name }
    }));
  } else {
    nextProgress.logs.unshift(createLog('map.restoredLog', completedAt));
  }
  nextProgress.logs = nextProgress.logs.slice(0, LOG_LIMIT);
  return saveProgress(nextProgress);
}
