export const facilities = [
  {
    id: 'coaster',
    name: 'NOVA COASTER',
    type: 'Movement Facility',
    state: 'available',
    thumbnail: './assets/images/map/thumbnail-coaster.webp',
    position: { x: 17, y: 12 },
    glow: { x: 28, y: 31 },
    message: '탐험가님, NOVA COASTER에 진입할 준비가 됐어요.',
    lockedMessage: '',
    controlRoomMessage: '열차 시스템 관제실에 연결했어요.'
  },
  {
    id: 'luna',
    name: 'LUNA LIGHT GARDEN',
    type: 'Energy Facility',
    state: 'locked',
    thumbnail: './assets/images/map/thumbnail-luna.webp',
    position: { x: 63, y: 13 },
    glow: { x: 64, y: 30 },
    message: 'LUNA LIGHT GARDEN의 빛 에너지가 안정됐어요.',
    lockedMessage: 'NOVA COASTER를 먼저 복구하면 LUNA LIGHT GARDEN이 열려요.',
    controlRoomMessage: '정원 에너지 관제실에 연결했어요.'
  },
  {
    id: 'spark',
    name: 'SPARK ENERGY TOWER',
    type: 'Play Facility',
    state: 'locked',
    thumbnail: './assets/images/map/thumbnail-spark.webp',
    position: { x: 8, y: 45 },
    glow: { x: 27, y: 58 },
    message: 'SPARK ENERGY TOWER의 에너지를 확인할 수 있어요.',
    lockedMessage: 'LUNA LIGHT GARDEN을 먼저 복구하면 SPARK ENERGY TOWER가 열려요.',
    controlRoomMessage: '에너지 타워 관제실에 연결했어요.'
  },
  {
    id: 'wonder',
    name: 'WONDER PARADE HALL',
    type: 'Culture Facility',
    state: 'locked',
    thumbnail: './assets/images/map/thumbnail-wonder.webp',
    position: { x: 72, y: 43 },
    glow: { x: 72, y: 55 },
    message: 'WONDER PARADE HALL의 퍼레이드를 준비할 수 있어요.',
    lockedMessage: 'SPARK ENERGY TOWER를 먼저 복구하면 WONDER PARADE HALL이 열려요.',
    controlRoomMessage: '퍼레이드 관제실에 연결했어요.'
  }
];

export const cosmicVoyage = {
  id: 'cosmic',
  name: 'COSMIC VOYAGE',
  type: 'Final Experience',
  state: 'sealed',
  position: { x: 49, y: 68 },
  glow: { x: 50, y: 66 },
  lockedMessage: '네 개의 시설을 모두 복구하면 COSMIC VOYAGE가 개방돼요.'
};

export const facilityStates = {
  available: { label: 'ONLINE', icon: 'check' },
  locked: { label: 'LOCKED', icon: 'lock' },
  completed: { label: 'RESTORED', icon: 'check' },
  sealed: { label: 'SEALED', icon: 'lock' },
  open: { label: 'OPEN', icon: 'check' }
};

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
