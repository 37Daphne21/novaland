export const facilities = [
  {
    id: 'coaster',
    name: 'NOVA COASTER',
    type: 'Movement Facility',
    state: 'active',
    stateLabel: 'ONLINE',
    thumbnail: './assets/images/map/thumbnail-coaster.webp',
    message: '탐험가님, NOVA COASTER에 진입할 준비가 됐어요.'
  },
  {
    id: 'luna',
    name: 'LUNA LIGHT GARDEN',
    type: 'Energy Facility',
    state: 'locked',
    stateLabel: 'LOCKED',
    thumbnail: './assets/images/map/thumbnail-luna.webp',
    message: 'LUNA LIGHT GARDEN은 아직 잠겨 있어요.'
  },
  {
    id: 'spark',
    name: 'SPARK ENERGY TOWER',
    type: 'Play Facility',
    state: 'locked',
    stateLabel: 'LOCKED',
    thumbnail: './assets/images/map/thumbnail-spark.webp',
    message: 'SPARK ENERGY TOWER는 아직 잠겨 있어요.'
  },
  {
    id: 'wonder',
    name: 'WONDER PARADE HALL',
    type: 'Culture Facility',
    state: 'locked',
    stateLabel: 'LOCKED',
    thumbnail: './assets/images/map/thumbnail-wonder.webp',
    message: 'WONDER PARADE HALL은 아직 잠겨 있어요.'
  }
];

export const recentLogs = [
  {
    time: '09:40',
    datetime: '09:40',
    message: 'NOVA COASTER 연결 신호를 확인했어요.'
  },
  {
    time: '09:15',
    datetime: '09:15',
    message: '탐험가 등록이 완료됐어요.'
  },
  {
    time: '08:50',
    datetime: '08:50',
    message: 'Nova Land 시스템이 시작됐어요.'
  }
];

export const languages = [
  { code: 'ko', label: '한국어', default: true },
  { code: 'en', label: 'English', default: false }
];

export const uiCopy = {
  lockedFacility: '이전 시설을 먼저 복구해주세요.',
  languageKorean: '한국어를 선택했어요.',
  languageEnglish: '영어 전환은 공통 시스템 단계에서 연결돼요.'
};
