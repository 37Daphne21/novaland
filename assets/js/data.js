export const facilities = [
  {
    id: 'coaster',
    name: 'NOVA COASTER',
    type: '이동 시설',
    state: 'available',
    position: { x: 17, y: 14 },
    mobilePosition: { x: 24, y: 37 },
    glow: { x: 23, y: 31 },
    mobileGlow: { x: 25, y: 43 },
    message: 'NOVA COASTER의 레일 연결 신호가 끊겼어요. 지도에 표시된 시설을 선택해 관제실로 이동해 주세요.',
    lockedMessage: '',
    controlRoomMessage: '열차 시스템 관제실에 연결했어요.',
    completionMessage: 'NOVA COASTER 복구가 완료됐어요. 미션 목록에서 LUNA LIGHT GARDEN을 선택해 주세요.'
  },
  {
    id: 'luna',
    name: 'LUNA LIGHT GARDEN',
    type: '생명 시설',
    state: 'locked',
    position: { x: 72, y: 19 },
    mobilePosition: { x: 76, y: 37 },
    glow: { x: 64, y: 30 },
    mobileGlow: { x: 75, y: 43 },
    message: 'LUNA LIGHT GARDEN의 빛이 약해져 중앙 정원이 멈췄어요. 지도에 표시된 시설을 선택해 주세요.',
    lockedMessage: 'NOVA COASTER를 먼저 복구하면 LUNA LIGHT GARDEN이 열려요.',
    controlRoomMessage: '정원 에너지 관제실에 연결했어요.',
    completionMessage: 'LUNA LIGHT GARDEN의 빛이 돌아왔어요. 미션 목록에서 SPARK ENERGY TOWER를 선택해 주세요.'
  },
  {
    id: 'spark',
    name: 'SPARK ENERGY TOWER',
    type: '에너지 시설',
    state: 'locked',
    position: { x: 18, y: 47 },
    mobilePosition: { x: 24, y: 59 },
    glow: { x: 27, y: 58 },
    mobileGlow: { x: 24, y: 61 },
    message: 'SPARK ENERGY TOWER의 코어가 불안정해 전력 공급이 중단됐어요. 지도에 표시된 시설을 선택해 주세요.',
    lockedMessage: 'LUNA LIGHT GARDEN을 먼저 복구하면 SPARK ENERGY TOWER가 열려요.',
    controlRoomMessage: '에너지 타워 관제실에 연결했어요.',
    completionMessage: 'SPARK ENERGY TOWER의 에너지가 안정됐어요. 미션 목록에서 WONDER PARADE HALL을 선택해 주세요.'
  },
  {
    id: 'wonder',
    name: 'WONDER PARADE HALL',
    type: '즐거움 시설',
    state: 'locked',
    position: { x: 72, y: 46 },
    mobilePosition: { x: 76, y: 59 },
    glow: { x: 72, y: 55 },
    mobileGlow: { x: 76, y: 61 },
    message: 'WONDER PARADE HALL의 무대와 퍼레이드가 멈춰 있어요. 지도에 표시된 시설을 선택해 주세요.',
    lockedMessage: 'SPARK ENERGY TOWER를 먼저 복구하면 WONDER PARADE HALL이 열려요.',
    controlRoomMessage: '퍼레이드 관제실에 연결했어요.',
    completionMessage: '네 개의 시설이 모두 복구됐어요. 마지막 여정, COSMIC VOYAGE가 개방돼요.'
  }
];

export const cosmicVoyage = {
  id: 'cosmic',
  name: 'COSMIC VOYAGE',
  type: '마지막 경험',
  state: 'sealed',
  position: { x: 49, y: 71 },
  mobilePosition: { x: 50, y: 76 },
  openPosition: { x: 49, y: 82 },
  openMobilePosition: { x: 50, y: 81 },
  glow: { x: 50, y: 66 },
  mobileGlow: { x: 50, y: 80 },
  message: '네 시설의 에너지가 연결되며 COSMIC VOYAGE가 모습을 드러냈어요. 지도에 표시된 시설을 선택해 주세요.',
  lockedMessage: '네 개의 시설을 모두 복구하면 COSMIC VOYAGE가 개방돼요.',
  completionMessage: '탐험가님, 노바랜드의 모든 에너지가 다시 연결됐어요. 정말 멋진 여정이었어요!'
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
