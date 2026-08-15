const STORAGE_KEY = 'novaLandLanguage';
const DEFAULT_LANGUAGE = 'ko';

const translations = {
  ko: {
    'common.settings': '설정',
    'common.system': '시스템',
    'common.closeSettings': '설정 닫기',
    'common.language': '언어',
    'common.languageHelp': '화면에 표시할 언어를 선택해요.',
    'common.languageSelect': '언어 선택',
    'common.fullscreen': '전체 화면',
    'common.fullscreenHelp': '브라우저 UI를 숨기고 화면을 넓게 사용해요.',
    'common.sound': '사운드',
    'common.soundHelp': '효과음은 공통 시스템 단계에서 연결돼요.',
    'common.comingSoon': '준비 중',
    'common.restart': '처음부터 다시 시작',
    'common.restartHelp': 'Explorer 정보와 Intro 등록 상태를 초기화해요.',
    'common.reset': '초기화',
    'common.fullscreenUnsupported': '이 브라우저에서는 전체 화면을 사용할 수 없어요.',
    'common.fullscreenFailed': '전체 화면을 전환하지 못했어요.',
    'common.resetConfirm': 'Explorer 정보와 Intro 등록 상태를 초기화하고 처음부터 다시 시작할까요?',
    'common.languageFeedback.ko': '한국어를 선택했어요.',
    'common.languageFeedback.en': 'English selected.',
    'intro.title': 'Nova Land Explorer 등록',
    'intro.openSettings': 'Intro 설정 열기',
    'intro.start': '화면을 눌러 시작',
    'intro.signal.title': '구조 신호를<br>수신했습니다.',
    'intro.signal.description': '노바랜드의 중심 순환이 멈추고 있습니다.<br>외부 응답 채널을 요청합니다.',
    'intro.signal.respond': '신호에 응답하기',
    'intro.register.dialogue': '응답을 확인했습니다.\n저는 노바랜드 중앙 관제 AI, EVE입니다.\n중심 순환의 복구에는 외부 연결 권한이 필요합니다.\nExplorer Passport에 기록할 이름을 알려주세요.',
    'intro.register.nameLabel': 'Passport에 기록할 이름',
    'intro.register.namePlaceholder': '이름을 입력해 주세요',
    'intro.register.nameHelp': '한글, 영문, 숫자와 단어 사이 공백을 사용할 수 있어요.',
    'intro.register.next': '다음 단계',
    'intro.register.identityLegend': 'Passport에 등록할 Explorer를 선택해 주세요.',
    'intro.register.identityHelp': '선택한 성별과 이미지가 Passport에 함께 기록돼요.',
    'intro.register.female': '여성 Explorer',
    'intro.register.male': '남성 Explorer',
    'intro.register.editName': '이름 수정',
    'intro.register.submit': 'Explorer로 등록',
    'intro.validation.required': 'Explorer 이름을 입력해 주세요.',
    'intro.validation.length': 'Explorer 이름은 2~12자로 입력해 주세요.',
    'intro.validation.characters': '한글, 영문, 숫자와 단어 사이 공백만 사용할 수 있어요.',
    'intro.validation.identity': 'Passport에 등록할 Explorer를 선택해 주세요.',
    'intro.passport.authority': '외부 공명 응답이 확인되었습니다.<br>이 Passport는 Explorer의 제한된 복구 권한을 증명합니다.',
    'intro.passport.seal': 'Explorer 등록 완료',
    'intro.passport.issue': 'Explorer Passport 발급 중...',
    'intro.passport.verify': '외부 공명 및 복구 권한 확인 중...',
    'intro.passport.record': '{name} Explorer 식별 정보 기록 중...',
    'intro.passport.complete': 'Explorer {name}. 외부 복구 권한이 등록되었습니다.\nWORLD MAP 연결 경로를 열었습니다.',
    'intro.passport.ready': 'WORLD MAP 연결 경로가 준비되었습니다. 연결 장치를 선택해 주세요.',
    'intro.passport.entering': 'Passport를 닫고 WORLD MAP으로 이동합니다.',
    'intro.status.analyzing': '노바랜드 구조 신호를 분석하는 중입니다.',
    'intro.status.located': '노바랜드 구조 신호의 발신 위치를 확인했습니다.',
    'intro.status.received': '구조 신호를 수신했습니다. 외부 응답 채널이 요청되었습니다.',
    'intro.status.connecting': '응답 채널을 연결하고 신호 발신자의 영상을 복원하는 중입니다.',
    'intro.status.nameConfirmed': '{name}님의 이름을 확인했습니다. Passport에 등록할 Explorer 성별과 이미지를 선택해 주세요.',
    'intro.status.identitySelected': '{gender} Explorer 이미지가 선택되었습니다.',
    'intro.status.sending': '{name}님의 이름과 Explorer 이미지를 Passport로 전송합니다.',
    'intro.status.askName': 'Explorer Passport에 기록할 이름을 알려주세요.',
    'intro.status.chooseIdentity': 'Passport에 등록할 Explorer를 선택해 주세요.',
    'intro.status.returnName': 'Explorer 이름 입력 단계로 돌아왔습니다.',
    'intro.status.welcome': '멈춘 노바랜드. 화면을 눌러 시작해 주세요.',
    'intro.gender.female': '여성',
    'intro.gender.male': '남성',
    'profile.femaleAlt': '여성 Nova Land Explorer 프로필 이미지',
    'profile.maleAlt': '남성 Nova Land Explorer 프로필 이미지',
    'map.topNavigation': '상단 내비게이션',
    'map.home': 'Nova Land 홈',
    'map.profileEditPending': 'Explorer 정보 수정은 공통 시스템 단계에서 연결돼요.',
    'map.profileEdit': 'Explorer 정보 수정',
    'map.environment': '현재 환경',
    'map.day': '낮',
    'map.clear': '맑음',
    'map.userMenu': '사용자 메뉴',
    'map.openSettings': '설정 열기',
    'map.mission': '미션',
    'map.missionListExpand': '미션 목록 펼치기',
    'map.missionListCollapse': '미션 목록 접기',
    'map.facilityList': '시설 목록',
    'map.progressActive': '현재 복구 단계',
    'map.progressComplete': '전체 복구 완료',
    'map.subtitle': '노바랜드 전체 보기',
    'map.facilities': '월드맵 시설',
    'map.eveAlt': 'EVE 홀로그램',
    'map.initialEve': '노바랜드의 시설 운영이 중단됐어요. 먼저 미션 목록에서 점검할 시설을 선택해 주세요.',
    'map.recentLog': '최근 기록',
    'map.viewLog': '기록 보기',
    'map.logPending': '탐험 기록은 공통 시스템 단계에서 연결돼요.',
    'map.recentLogExpand': '최근 기록 펼치기',
    'map.recentLogCollapse': '최근 기록 접기',
    'map.lockedCondition': '잠금 해제 조건을 완료하세요.',
    'map.cosmicCondition': '모든 시설을 복구하면 개방됩니다.',
    'map.cosmicPending': 'COSMIC VOYAGE는 마지막 경험 단계에서 연결돼요.',
    'map.mapRestored': '탐험가님, 네 개의 시설 복구가 완료됐어요. COSMIC VOYAGE가 개방됐습니다.',
    'map.restoredLog': '모든 시설 복구가 완료됐어요.',
    'control.connected': '관제실 연결 완료',
    'control.message': '시설 관제실 연결이 확인됐어요. 미션 기능은 시설 구현 단계에서 이어집니다.',
    'navigation.closeOverlay': '열린 창 닫기',
    'navigation.closePanel': '열린 패널 닫기',
    'navigation.toMap': 'WORLD MAP으로 돌아가기',
    'navigation.toIdentity': 'Explorer 선택으로 돌아가기',
    'navigation.toName': '이름 입력으로 돌아가기',
    'navigation.toSignal': '구조 신호로 돌아가기',
    'navigation.toWelcome': 'Welcome으로 돌아가기',
    'facility.coaster.type': '이동 시설',
    'facility.coaster.message': 'NOVA COASTER의 레일 연결 신호가 끊겼어요. 지도에 표시된 시설을 선택해 관제실로 이동해 주세요.',
    'facility.coaster.control': '열차 시스템 관제실에 연결했어요.',
    'facility.coaster.complete': 'NOVA COASTER 복구가 완료됐어요. 미션 목록에서 LUNA LIGHT GARDEN을 선택해 주세요.',
    'facility.luna.type': '생명 시설',
    'facility.luna.message': 'LUNA LIGHT GARDEN의 빛이 약해져 중앙 정원이 멈췄어요. 지도에 표시된 시설을 선택해 주세요.',
    'facility.luna.locked': 'NOVA COASTER를 먼저 복구하면 LUNA LIGHT GARDEN이 열려요.',
    'facility.luna.control': '정원 에너지 관제실에 연결했어요.',
    'facility.luna.complete': 'LUNA LIGHT GARDEN의 빛이 돌아왔어요. 미션 목록에서 SPARK ENERGY TOWER를 선택해 주세요.',
    'facility.spark.type': '에너지 시설',
    'facility.spark.message': 'SPARK ENERGY TOWER의 코어가 불안정해 전력 공급이 중단됐어요. 지도에 표시된 시설을 선택해 주세요.',
    'facility.spark.locked': 'LUNA LIGHT GARDEN을 먼저 복구하면 SPARK ENERGY TOWER가 열려요.',
    'facility.spark.control': '에너지 타워 관제실에 연결했어요.',
    'facility.spark.complete': 'SPARK ENERGY TOWER의 에너지가 안정됐어요. 미션 목록에서 WONDER PARADE HALL을 선택해 주세요.',
    'facility.wonder.type': '즐거움 시설',
    'facility.wonder.message': 'WONDER PARADE HALL의 무대와 퍼레이드가 멈춰 있어요. 지도에 표시된 시설을 선택해 주세요.',
    'facility.wonder.locked': 'SPARK ENERGY TOWER를 먼저 복구하면 WONDER PARADE HALL이 열려요.',
    'facility.wonder.control': '퍼레이드 관제실에 연결했어요.',
    'facility.wonder.complete': '네 개의 시설이 모두 복구됐어요. 마지막 여정, COSMIC VOYAGE가 개방돼요.',
    'facility.cosmic.type': '마지막 경험',
    'facility.cosmic.message': '네 시설의 에너지가 연결되며 COSMIC VOYAGE가 모습을 드러냈어요. 지도에 표시된 시설을 선택해 주세요.',
    'facility.cosmic.locked': '네 개의 시설을 모두 복구하면 COSMIC VOYAGE가 개방돼요.',
    'facility.cosmic.complete': '탐험가님, 노바랜드의 모든 에너지가 다시 연결됐어요. 정말 멋진 여정이었어요!',
    'facility.state.available': '활성화',
    'facility.state.locked': '잠금',
    'facility.state.completed': '복구 완료',
    'facility.state.sealed': '봉인',
    'facility.state.open': '개방',
    'log.coaster': 'NOVA COASTER 연결 신호를 확인했어요.',
    'log.registered': '탐험가 등록이 완료됐어요.',
    'log.started': 'Nova Land 시스템이 시작됐어요.'
  },
  en: {
    'common.settings': 'Settings',
    'common.system': 'SYSTEM',
    'common.closeSettings': 'Close settings',
    'common.language': 'Language',
    'common.languageHelp': 'Choose the language shown on screen.',
    'common.languageSelect': 'Language selection',
    'common.fullscreen': 'Fullscreen',
    'common.fullscreenHelp': 'Hide the browser UI and use more screen space.',
    'common.sound': 'Sound',
    'common.soundHelp': 'Sound effects will be connected in the common system phase.',
    'common.comingSoon': 'COMING SOON',
    'common.restart': 'Restart from the beginning',
    'common.restartHelp': 'Reset Explorer information and Intro progress.',
    'common.reset': 'Reset',
    'common.fullscreenUnsupported': 'Fullscreen is not available in this browser.',
    'common.fullscreenFailed': 'Fullscreen could not be changed.',
    'common.resetConfirm': 'Reset Explorer information and Intro progress and start again?',
    'common.languageFeedback.ko': '한국어를 선택했어요.',
    'common.languageFeedback.en': 'English selected.',
    'intro.title': 'Nova Land Explorer Registration',
    'intro.openSettings': 'Open Intro settings',
    'intro.start': 'Tap to begin',
    'intro.signal.title': 'A distress signal<br>has been received.',
    'intro.signal.description': 'Nova Land’s central circulation has stopped.<br>An external response channel is requested.',
    'intro.signal.respond': 'Respond to signal',
    'intro.register.dialogue': 'Response confirmed.\nI am EVE, Nova Land’s central control AI.\nRestoring the central circulation requires external access.\nTell me the name to record in your Explorer Passport.',
    'intro.register.nameLabel': 'Name to record in Passport',
    'intro.register.namePlaceholder': 'Enter your name',
    'intro.register.nameHelp': 'Use Korean, English letters, numbers, and spaces between words.',
    'intro.register.next': 'Next step',
    'intro.register.identityLegend': 'Choose the Explorer for your Passport.',
    'intro.register.identityHelp': 'Your selected gender and portrait will be recorded together.',
    'intro.register.female': 'Female Explorer',
    'intro.register.male': 'Male Explorer',
    'intro.register.editName': 'Edit name',
    'intro.register.submit': 'Register Explorer',
    'intro.validation.required': 'Enter an Explorer name.',
    'intro.validation.length': 'Enter an Explorer name using 2–12 characters.',
    'intro.validation.characters': 'Use Korean, English letters, numbers, and spaces between words only.',
    'intro.validation.identity': 'Choose an Explorer for your Passport.',
    'intro.passport.authority': 'An external resonance response has been confirmed.<br>This Passport certifies the Explorer’s limited restoration access.',
    'intro.passport.seal': 'Explorer registration complete',
    'intro.passport.issue': 'Issuing Explorer Passport...',
    'intro.passport.verify': 'Verifying resonance and restoration access...',
    'intro.passport.record': 'Recording {name} Explorer identity...',
    'intro.passport.complete': 'Explorer {name}. External restoration access has been registered.\nThe WORLD MAP route is now open.',
    'intro.passport.ready': 'The WORLD MAP route is ready. Select the connection control.',
    'intro.passport.entering': 'Closing the Passport and moving to the WORLD MAP.',
    'intro.status.analyzing': 'Analyzing the Nova Land distress signal.',
    'intro.status.located': 'The source of the Nova Land distress signal has been located.',
    'intro.status.received': 'Distress signal received. An external response channel is requested.',
    'intro.status.connecting': 'Connecting the response channel and restoring the sender’s image.',
    'intro.status.nameConfirmed': 'Name confirmed for {name}. Choose the Explorer gender and portrait for the Passport.',
    'intro.status.identitySelected': '{gender} Explorer portrait selected.',
    'intro.status.sending': 'Sending {name} and the selected Explorer portrait to the Passport.',
    'intro.status.askName': 'Tell me the name to record in your Explorer Passport.',
    'intro.status.chooseIdentity': 'Choose an Explorer for your Passport.',
    'intro.status.returnName': 'Returned to the Explorer name step.',
    'intro.status.welcome': 'Nova Land has stopped. Tap the screen to begin.',
    'intro.gender.female': 'Female',
    'intro.gender.male': 'Male',
    'profile.femaleAlt': 'Female Nova Land Explorer profile portrait',
    'profile.maleAlt': 'Male Nova Land Explorer profile portrait',
    'map.topNavigation': 'Top navigation',
    'map.home': 'Nova Land home',
    'map.profileEditPending': 'Explorer editing will be connected in the common system phase.',
    'map.profileEdit': 'Edit Explorer information',
    'map.environment': 'Current environment',
    'map.day': 'Day',
    'map.clear': 'Clear',
    'map.userMenu': 'User menu',
    'map.openSettings': 'Open settings',
    'map.mission': 'Mission',
    'map.missionListExpand': 'Expand mission list',
    'map.missionListCollapse': 'Collapse mission list',
    'map.facilityList': 'Facility list',
    'map.progressActive': 'Current restoration stage',
    'map.progressComplete': 'All facilities restored',
    'map.subtitle': 'Explore all of Nova Land',
    'map.facilities': 'World Map facilities',
    'map.eveAlt': 'EVE hologram',
    'map.initialEve': 'Nova Land’s facilities are offline. Select a facility from the mission list to begin inspection.',
    'map.recentLog': 'Recent Log',
    'map.viewLog': 'View log',
    'map.logPending': 'Explorer Log will be connected in the common system phase.',
    'map.recentLogExpand': 'Expand recent log',
    'map.recentLogCollapse': 'Collapse recent log',
    'map.lockedCondition': 'Complete the unlock requirement.',
    'map.cosmicCondition': 'Restore every facility to open this route.',
    'map.cosmicPending': 'COSMIC VOYAGE will be connected in the final experience phase.',
    'map.mapRestored': 'Explorer, all four facilities are restored. COSMIC VOYAGE is now open.',
    'map.restoredLog': 'All facilities have been restored.',
    'control.connected': 'CONTROL ROOM CONNECTED',
    'control.message': 'Facility Control Room connection confirmed. Mission features continue in the facility implementation phase.',
    'navigation.closeOverlay': 'Close open dialog',
    'navigation.closePanel': 'Close open panel',
    'navigation.toMap': 'Return to WORLD MAP',
    'navigation.toIdentity': 'Return to Explorer selection',
    'navigation.toName': 'Return to name entry',
    'navigation.toSignal': 'Return to distress signal',
    'navigation.toWelcome': 'Return to Welcome',
    'facility.coaster.type': 'Movement Facility',
    'facility.coaster.message': 'NOVA COASTER’s rail link is offline. Select the marked facility on the map to enter its Control Room.',
    'facility.coaster.control': 'Connected to the train system Control Room.',
    'facility.coaster.complete': 'NOVA COASTER restored. Select LUNA LIGHT GARDEN from the mission list.',
    'facility.luna.type': 'Life Facility',
    'facility.luna.message': 'LUNA LIGHT GARDEN has lost its light and the central garden has stopped. Select the marked facility on the map.',
    'facility.luna.locked': 'Restore NOVA COASTER first to unlock LUNA LIGHT GARDEN.',
    'facility.luna.control': 'Connected to the garden energy Control Room.',
    'facility.luna.complete': 'Light has returned to LUNA LIGHT GARDEN. Select SPARK ENERGY TOWER from the mission list.',
    'facility.spark.type': 'Energy Facility',
    'facility.spark.message': 'SPARK ENERGY TOWER’s core is unstable and power delivery has stopped. Select the marked facility on the map.',
    'facility.spark.locked': 'Restore LUNA LIGHT GARDEN first to unlock SPARK ENERGY TOWER.',
    'facility.spark.control': 'Connected to the Energy Tower Control Room.',
    'facility.spark.complete': 'SPARK ENERGY TOWER is stable. Select WONDER PARADE HALL from the mission list.',
    'facility.wonder.type': 'Joy Facility',
    'facility.wonder.message': 'The stage and parade at WONDER PARADE HALL have stopped. Select the marked facility on the map.',
    'facility.wonder.locked': 'Restore SPARK ENERGY TOWER first to unlock WONDER PARADE HALL.',
    'facility.wonder.control': 'Connected to the parade Control Room.',
    'facility.wonder.complete': 'All four facilities are restored. The final journey, COSMIC VOYAGE, is opening.',
    'facility.cosmic.type': 'Final Experience',
    'facility.cosmic.message': 'The four facility energies have connected and COSMIC VOYAGE has appeared. Select it on the map.',
    'facility.cosmic.locked': 'Restore all four facilities to open COSMIC VOYAGE.',
    'facility.cosmic.complete': 'Explorer, all of Nova Land’s energy is connected again. What a remarkable journey!',
    'facility.state.available': 'Active',
    'facility.state.locked': 'Locked',
    'facility.state.completed': 'Restored',
    'facility.state.sealed': 'Sealed',
    'facility.state.open': 'Open',
    'log.coaster': 'NOVA COASTER link signal confirmed.',
    'log.registered': 'Explorer registration completed.',
    'log.started': 'Nova Land system started.'
  }
};

let currentLanguage = DEFAULT_LANGUAGE;

export const languages = [
  { code: 'ko', label: '한국어' },
  { code: 'en', label: 'English' }
];

function readLanguage() {
  try {
    const savedLanguage = window.localStorage.getItem(STORAGE_KEY);
    return translations[savedLanguage] ? savedLanguage : DEFAULT_LANGUAGE;
  } catch {
    return DEFAULT_LANGUAGE;
  }
}

function interpolate(message, values) {
  return Object.entries(values).reduce((result, [key, value]) => result.replaceAll(`{${key}}`, String(value)), message);
}

export function getLanguage() {
  return currentLanguage;
}

export function t(key, values = {}) {
  const message = translations[currentLanguage]?.[key] ?? translations[DEFAULT_LANGUAGE]?.[key] ?? key;
  return interpolate(message, values);
}

export function applyDocumentLanguage(root = document) {
  document.documentElement.lang = currentLanguage;
  root.querySelectorAll('[data-i18n]').forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  root.querySelectorAll('[data-i18n-html]').forEach((element) => {
    element.innerHTML = t(element.dataset.i18nHtml);
  });
  root.querySelectorAll('[data-i18n-aria-label]').forEach((element) => {
    element.setAttribute('aria-label', t(element.dataset.i18nAriaLabel));
  });
  root.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
    element.setAttribute('placeholder', t(element.dataset.i18nPlaceholder));
  });
  root.querySelectorAll('[data-i18n-alt]').forEach((element) => {
    element.setAttribute('alt', t(element.dataset.i18nAlt));
  });
  root.querySelectorAll('[data-i18n-toast]').forEach((element) => {
    element.dataset.toast = t(element.dataset.i18nToast);
  });
}

export function initializeLanguage() {
  currentLanguage = readLanguage();
  applyDocumentLanguage();
  return currentLanguage;
}

export function setLanguage(languageCode) {
  if (!translations[languageCode]) {
    return false;
  }

  currentLanguage = languageCode;
  try {
    window.localStorage.setItem(STORAGE_KEY, languageCode);
  } catch {
    // 저장이 제한된 환경에서도 현재 세션의 언어 전환은 유지한다.
  }
  applyDocumentLanguage();
  window.dispatchEvent(new CustomEvent('novaland:languagechange', { detail: { language: languageCode } }));
  return true;
}

export const uiCopy = {
  get lockedCondition() { return t('map.lockedCondition'); },
  get cosmicCondition() { return t('map.cosmicCondition'); },
  get cosmicPending() { return t('map.cosmicPending'); },
  get mapRestored() { return t('map.mapRestored'); },
  get restoredLog() { return t('map.restoredLog'); },
  get progressActive() { return t('map.progressActive'); },
  get progressComplete() { return t('map.progressComplete'); },
  get fullscreenUnsupported() { return t('common.fullscreenUnsupported'); },
  get fullscreenFailed() { return t('common.fullscreenFailed'); }
};
