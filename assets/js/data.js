export const facilities = [
  {
    id: 'coaster',
    name: 'NOVA COASTER',
    type: '이동 시설',
    state: 'available',
    position: { x: 17, y: 14 },
    glow: { x: 28, y: 31 },
    dim: { x: 27, y: 31, width: 44, height: 38, opacity: .62 },
    message: '탐험가님, NOVA COASTER에 진입할 준비가 됐어요.',
    lockedMessage: '',
    controlRoomMessage: '열차 시스템 관제실에 연결했어요.'
  },
  {
    id: 'luna',
    name: 'LUNA LIGHT GARDEN',
    type: '생명 시설',
    state: 'locked',
    position: { x: 72, y: 19 },
    glow: { x: 64, y: 30 },
    dim: { x: 66, y: 31, width: 38, height: 34, opacity: .66 },
    message: 'LUNA LIGHT GARDEN의 빛 에너지가 안정됐어요.',
    lockedMessage: 'NOVA COASTER를 먼저 복구하면 LUNA LIGHT GARDEN이 열려요.',
    controlRoomMessage: '정원 에너지 관제실에 연결했어요.'
  },
  {
    id: 'spark',
    name: 'SPARK ENERGY TOWER',
    type: '에너지 시설',
    state: 'locked',
    position: { x: 18, y: 47 },
    glow: { x: 27, y: 58 },
    dim: { x: 24, y: 62, width: 34, height: 48, opacity: .68 },
    message: 'SPARK ENERGY TOWER의 에너지를 확인할 수 있어요.',
    lockedMessage: 'LUNA LIGHT GARDEN을 먼저 복구하면 SPARK ENERGY TOWER가 열려요.',
    controlRoomMessage: '에너지 타워 관제실에 연결했어요.'
  },
  {
    id: 'wonder',
    name: 'WONDER PARADE HALL',
    type: '즐거움 시설',
    state: 'locked',
    position: { x: 72, y: 46 },
    glow: { x: 72, y: 55 },
    dim: { x: 76, y: 61, width: 38, height: 40, opacity: .68 },
    message: 'WONDER PARADE HALL의 퍼레이드를 준비할 수 있어요.',
    lockedMessage: 'SPARK ENERGY TOWER를 먼저 복구하면 WONDER PARADE HALL이 열려요.',
    controlRoomMessage: '퍼레이드 관제실에 연결했어요.'
  }
];

export const cosmicVoyage = {
  id: 'cosmic',
  name: 'COSMIC VOYAGE',
  type: '마지막 경험',
  state: 'sealed',
  position: { x: 49, y: 71 },
  openPosition: { x: 49, y: 82 },
  glow: { x: 50, y: 66 },
  dim: { x: 50, y: 52, width: 34, height: 94, opacity: .72 },
  lockedMessage: '네 개의 시설을 모두 복구하면 COSMIC VOYAGE가 개방돼요.'
};

export const facilityStates = {
  available: { label: '활성화', icon: 'check' },
  locked: { label: '잠금', icon: 'lock' },
  completed: { label: '복구 완료', icon: 'check' },
  sealed: { label: '봉인', icon: 'lock' },
  open: { label: '개방', icon: 'check' }
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
