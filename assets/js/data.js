import { t } from './locales.js';

export const explorerProfiles = {
  female: {
    label: 'FEMALE',
    altKey: 'profile.femaleAlt',
    image: './assets/images/common/explorer-female.webp'
  },
  male: {
    label: 'MALE',
    altKey: 'profile.maleAlt',
    image: './assets/images/common/explorer-male.webp'
  }
};

export function getExplorerProfile(gender) {
  const profile = explorerProfiles[gender] || explorerProfiles.female;
  return { ...profile, alt: t(profile.altKey) };
}

export function getFacilityText(facility, field) {
  const key = facility?.[`${field}Key`];
  return key ? t(key) : '';
}

export const facilities = [
  {
    id: 'coaster',
    name: 'NOVA COASTER',
    typeKey: 'facility.coaster.type',
    state: 'available',
    position: { x: 17, y: 14 },
    mobilePosition: { x: 24, y: 37 },
    glow: { x: 23, y: 31 },
    mobileGlow: { x: 25, y: 43 },
    messageKey: 'facility.coaster.message',
    lockedMessageKey: '',
    controlRoomMessageKey: 'facility.coaster.control',
    completionMessageKey: 'facility.coaster.complete'
  },
  {
    id: 'luna',
    name: 'LUNA LIGHT GARDEN',
    typeKey: 'facility.luna.type',
    state: 'locked',
    position: { x: 72, y: 19 },
    mobilePosition: { x: 76, y: 37 },
    glow: { x: 64, y: 30 },
    mobileGlow: { x: 75, y: 43 },
    messageKey: 'facility.luna.message',
    lockedMessageKey: 'facility.luna.locked',
    controlRoomMessageKey: 'facility.luna.control',
    completionMessageKey: 'facility.luna.complete'
  },
  {
    id: 'spark',
    name: 'SPARK ENERGY TOWER',
    typeKey: 'facility.spark.type',
    state: 'locked',
    position: { x: 18, y: 47 },
    mobilePosition: { x: 24, y: 59 },
    glow: { x: 27, y: 58 },
    mobileGlow: { x: 24, y: 61 },
    messageKey: 'facility.spark.message',
    lockedMessageKey: 'facility.spark.locked',
    controlRoomMessageKey: 'facility.spark.control',
    completionMessageKey: 'facility.spark.complete'
  },
  {
    id: 'wonder',
    name: 'WONDER PARADE HALL',
    typeKey: 'facility.wonder.type',
    state: 'locked',
    position: { x: 72, y: 46 },
    mobilePosition: { x: 76, y: 59 },
    glow: { x: 72, y: 55 },
    mobileGlow: { x: 76, y: 61 },
    messageKey: 'facility.wonder.message',
    lockedMessageKey: 'facility.wonder.locked',
    controlRoomMessageKey: 'facility.wonder.control',
    completionMessageKey: 'facility.wonder.complete'
  }
];

export const cosmicVoyage = {
  id: 'cosmic',
  name: 'COSMIC VOYAGE',
  typeKey: 'facility.cosmic.type',
  state: 'sealed',
  position: { x: 49, y: 71 },
  mobilePosition: { x: 50, y: 76 },
  openPosition: { x: 49, y: 82 },
  openMobilePosition: { x: 50, y: 81 },
  glow: { x: 50, y: 66 },
  mobileGlow: { x: 50, y: 80 },
  messageKey: 'facility.cosmic.message',
  lockedMessageKey: 'facility.cosmic.locked',
  completionMessageKey: 'facility.cosmic.complete'
};

export const facilityStates = {
  available: { labelKey: 'facility.state.available', icon: 'check' },
  locked: { labelKey: 'facility.state.locked', icon: 'lock' },
  completed: { labelKey: 'facility.state.completed', icon: 'check' },
  sealed: { labelKey: 'facility.state.sealed', icon: 'lock' },
  open: { labelKey: 'facility.state.open', icon: 'check' }
};

export function getFacilityState(state) {
  const metadata = facilityStates[state];
  return { ...metadata, label: t(metadata.labelKey) };
}

export const recentLogs = [
  {
    time: '09:40',
    datetime: '09:40',
    messageKey: 'log.coaster'
  },
  {
    time: '09:15',
    datetime: '09:15',
    messageKey: 'log.registered'
  },
  {
    time: '08:50',
    datetime: '08:50',
    messageKey: 'log.started'
  }
];

export function getRecentLogs() {
  return recentLogs.map((log) => ({ ...log, message: t(log.messageKey) }));
}
