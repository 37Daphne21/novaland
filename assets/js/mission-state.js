export const MISSION_PHASES = new Set(['idle', 'guide', 'countdown', 'playing', 'testing', 'paused', 'failed', 'completed']);

export function getMissionRestoreState(savedMission = {}) {
  const checkpoint = savedMission.checkpoint ?? null;

  if (savedMission.phase === 'guide') {
    return { phase: 'guide', resumeMode: 'playing', shouldRestore: true };
  }
  if (savedMission.phase === 'countdown') {
    return { phase: 'countdown', resumeMode: 'playing', shouldRestore: true };
  }
  if (savedMission.phase === 'failed' && checkpoint) {
    return { phase: 'failed', resumeMode: 'playing', shouldRestore: true };
  }
  if (['playing', 'testing', 'paused'].includes(savedMission.phase) && checkpoint) {
    const resumeMode = savedMission.phase === 'testing' || checkpoint.mode === 'testing' ? 'testing' : 'playing';
    return { phase: 'paused', resumeMode, shouldRestore: true };
  }

  return { phase: 'guide', resumeMode: 'playing', shouldRestore: false };
}

export function findRestorableMissionId(progress) {
  return Object.keys(progress?.missions ?? {}).find((facilityId) => progress.facilities?.[facilityId]?.status === 'available'
    && getMissionRestoreState(progress.missions[facilityId]).shouldRestore) ?? '';
}
