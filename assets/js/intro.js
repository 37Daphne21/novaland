const STORAGE_KEY = 'novaLandExplorer';
const REGISTER_DIALOGUE_MESSAGE = '응답을 확인했습니다.\n저는 노바랜드 중앙 관제 AI, EVE입니다.\n중심 순환의 복구에는 외부 연결 권한이 필요합니다.\nExplorer Passport에 기록할 이름을 알려주세요.';

function getCharacterCount(value) {
  return Array.from(value).length;
}

function normalizeName(value) {
  return value.trim().replace(/\s+/g, ' ');
}

function validateName(value) {
  const name = normalizeName(value);
  const characterCount = getCharacterCount(name);

  if (!name) {
    return { error: 'Explorer 이름을 입력해 주세요.', name };
  }

  if (characterCount < 2 || characterCount > 12) {
    return { error: 'Explorer 이름은 2~12자로 입력해 주세요.', name };
  }

  if (!/^[가-힣A-Za-z0-9]+(?: [가-힣A-Za-z0-9]+)*$/u.test(name)) {
    return { error: '한글, 영문, 숫자와 단어 사이 공백만 사용할 수 있어요.', name };
  }

  return { error: '', name };
}

function createExplorerId() {
  const date = new Date();
  const dateCode = `${String(date.getFullYear()).slice(-2)}${String(date.getMonth() + 1).padStart(2, '0')}`;
  const randomValues = new Uint32Array(1);
  window.crypto?.getRandomValues(randomValues);
  const randomCode = (randomValues[0] || Date.now()).toString(36).slice(-4).toUpperCase().padStart(4, '0');
  return `NL-${dateCode}-${randomCode}`;
}

function createIssueDate() {
  const date = new Date();
  const display = new Intl.DateTimeFormat('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(date).replace(/\s/g, '');
  return { display, iso: date.toISOString() };
}

function readSavedExplorer() {
  try {
    const value = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
    return value?.introCompleted && value?.name && value?.id ? value : null;
  } catch {
    return null;
  }
}

export function createIntroController({ onComplete }) {
  const screen = document.querySelector('[data-screen="intro"]');
  const scenes = new Map(Array.from(document.querySelectorAll('[data-intro-scene]')).map((scene) => [scene.dataset.introScene, scene]));
  const welcomeBrand = document.querySelector('.intro-welcome__brand');
  const welcomeTitle = welcomeBrand?.querySelector('span');
  const welcomeSubtitle = welcomeBrand?.querySelector('strong');
  const welcomeTitleText = welcomeTitle?.textContent.trim() ?? '';
  const startButton = document.querySelector('[data-intro-start]');
  const respondButton = document.querySelector('[data-intro-respond]');
  const registerDialogue = document.querySelector('.intro-dialogue');
  const registerDialogueMessage = document.querySelector('[data-intro-dialogue-message]');
  const form = document.querySelector('[data-intro-form]');
  const nameInput = document.querySelector('#explorer-name-input');
  const nameCount = document.querySelector('[data-name-count]');
  const nameError = document.querySelector('#explorer-name-error');
  const status = document.querySelector('.intro-status');
  const passport = document.querySelector('[data-passport]');
  const passportMessage = document.querySelector('[data-passport-message]');
  const passportStatus = document.querySelector('[data-passport-status]');
  const passportRoute = document.querySelector('[data-passport-route]');
  const passportEnterMap = document.querySelector('[data-passport-enter-map]');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const timers = new Set();
  let currentScene = scenes.get('welcome');
  let isTransitioning = false;
  let pendingExplorer = null;
  let welcomeTypingTimer = null;
  let registerTypingTimer = null;
  let passportTypingTimer = null;

  function delay(callback, duration) {
    const timer = window.setTimeout(() => {
      timers.delete(timer);
      callback();
    }, prefersReducedMotion ? Math.min(duration, 80) : duration);
    timers.add(timer);
    return timer;
  }

  function announce(message) {
    if (status) {
      status.textContent = message;
    }
  }

  function typeRegisterDialogue(message, onComplete) {
    if (!registerDialogue || !registerDialogueMessage || !message) {
      onComplete?.();
      return;
    }

    window.clearInterval(registerTypingTimer);
    registerTypingTimer = null;
    registerDialogue.classList.remove('is-typing');
    registerDialogue.setAttribute('aria-busy', 'false');
    registerDialogueMessage.setAttribute('aria-label', message.replace(/\n/g, ' '));
    announce(message.replace(/\n/g, ' '));

    if (prefersReducedMotion) {
      registerDialogueMessage.textContent = message;
      onComplete?.();
      return;
    }

    const visualMessage = document.createElement('span');
    const characters = Array.from(message);
    let characterIndex = 0;

    visualMessage.setAttribute('aria-hidden', 'true');
    registerDialogueMessage.replaceChildren(visualMessage);
    registerDialogue.classList.add('is-typing');
    registerDialogue.setAttribute('aria-busy', 'true');

    registerTypingTimer = window.setInterval(() => {
      visualMessage.textContent += characters[characterIndex];
      characterIndex += 1;

      if (characterIndex >= characters.length) {
        window.clearInterval(registerTypingTimer);
        registerTypingTimer = null;
        registerDialogue.classList.remove('is-typing');
        registerDialogue.setAttribute('aria-busy', 'false');
        registerDialogueMessage.textContent = message;
        onComplete?.();
      }
    }, 34);
  }

  function typePassportMessage(message, onComplete) {
    if (!passportMessage || !message) {
      onComplete?.();
      return;
    }

    window.clearInterval(passportTypingTimer);
    passportTypingTimer = null;
    passportMessage.parentElement?.classList.remove('is-typing');
    passportMessage.setAttribute('aria-label', message.replace(/\n/g, ' '));
    announce(message.replace(/\n/g, ' '));

    if (prefersReducedMotion) {
      passportMessage.textContent = message;
      onComplete?.();
      return;
    }

    const visualMessage = document.createElement('span');
    const characters = Array.from(message);
    let characterIndex = 0;

    visualMessage.setAttribute('aria-hidden', 'true');
    passportMessage.replaceChildren(visualMessage);
    passportMessage.parentElement?.classList.add('is-typing');

    passportTypingTimer = window.setInterval(() => {
      visualMessage.textContent += characters[characterIndex];
      characterIndex += 1;

      if (characterIndex >= characters.length) {
        window.clearInterval(passportTypingTimer);
        passportTypingTimer = null;
        passportMessage.parentElement?.classList.remove('is-typing');
        passportMessage.textContent = message;
        onComplete?.();
      }
    }, 34);
  }

  function playWelcomeIntro() {
    if (!welcomeBrand || !welcomeTitle || !welcomeSubtitle || !welcomeTitleText) {
      return;
    }

    window.clearInterval(welcomeTypingTimer);
    welcomeTypingTimer = null;
    welcomeBrand.classList.add('is-intro-ready');
    welcomeSubtitle.classList.remove('is-visible');
    welcomeTitle.dataset.text = welcomeTitleText;
    welcomeTitle.setAttribute('aria-label', welcomeTitleText);

    if (prefersReducedMotion) {
      welcomeTitle.textContent = welcomeTitleText;
      welcomeTitle.classList.remove('is-typing');
      welcomeSubtitle.classList.add('is-visible');
      return;
    }

    const visualTitle = document.createElement('i');
    const characters = Array.from(welcomeTitleText);
    let characterIndex = 0;

    visualTitle.setAttribute('aria-hidden', 'true');
    welcomeTitle.classList.add('is-typing');
    welcomeTitle.replaceChildren(visualTitle);

    welcomeTypingTimer = window.setInterval(() => {
      visualTitle.textContent += characters[characterIndex];
      characterIndex += 1;

      if (characterIndex >= characters.length) {
        window.clearInterval(welcomeTypingTimer);
        welcomeTypingTimer = null;
        welcomeTitle.classList.remove('is-typing');
        welcomeTitle.textContent = welcomeTitleText;
        welcomeSubtitle.classList.add('is-visible');
      }
    }, 90);
  }

  function showScene(name, focusTarget) {
    const nextScene = scenes.get(name);
    if (!nextScene || nextScene === currentScene) {
      return;
    }

    isTransitioning = true;
    currentScene?.classList.add('is-leaving');
    delay(() => {
      if (currentScene) {
        currentScene.hidden = true;
        currentScene.classList.remove('is-active', 'is-leaving');
      }
      nextScene.hidden = false;
      requestAnimationFrame(() => nextScene.classList.add('is-active'));
      currentScene = nextScene;
      isTransitioning = false;
      delay(() => focusTarget?.focus({ preventScroll: true }), 160);
    }, 800);
  }

  function handleStart() {
    if (isTransitioning) {
      return;
    }
    const signalScene = scenes.get('signal');
    respondButton?.setAttribute('disabled', '');
    signalScene?.classList.add('is-acquiring');
    announce('노바랜드 구조 신호를 분석하는 중입니다.');
    showScene('signal');
    delay(() => {
      signalScene?.classList.remove('is-acquiring');
      signalScene?.classList.add('is-locked');
      announce('노바랜드 구조 신호의 발신 위치를 확인했습니다.');
      delay(() => {
        respondButton?.removeAttribute('disabled');
        announce('구조 신호를 수신했습니다. 외부 응답 채널이 요청되었습니다.');
        respondButton?.focus({ preventScroll: true });
      }, 900);
    }, 2150);
  }

  function handleRespond() {
    if (isTransitioning || !respondButton) {
      return;
    }
    respondButton.disabled = true;
    registerDialogue?.setAttribute('aria-hidden', 'true');
    form?.setAttribute('inert', '');
    announce('응답 채널을 연결하고 신호 발신자의 영상을 복원하는 중입니다.');
    showScene('register');
    delay(() => {
      const registerScene = scenes.get('register');
      registerScene?.classList.add('is-projecting');
      delay(() => {
        registerScene?.classList.add('is-eve-visible');
        delay(() => {
          registerScene?.classList.add('is-dialogue-visible');
          registerDialogue?.removeAttribute('aria-hidden');
          typeRegisterDialogue(REGISTER_DIALOGUE_MESSAGE, () => {
            delay(() => {
              registerScene?.classList.add('is-form-ready');
              form?.removeAttribute('inert');
              nameInput?.focus({ preventScroll: true });
            }, 420);
          });
        }, 820);
      }, 180);
    }, 860);
  }

  function updateNameCount() {
    if (nameCount && nameInput) {
      nameCount.textContent = String(getCharacterCount(nameInput.value));
    }
    if (nameInput?.getAttribute('aria-invalid') === 'true') {
      nameInput.removeAttribute('aria-invalid');
      if (nameError) {
        nameError.textContent = '';
      }
    }
  }

  function setPassportData(explorer) {
    document.querySelectorAll('[data-passport-name]').forEach((element) => { element.textContent = explorer.name; });
    document.querySelectorAll('[data-passport-id]').forEach((element) => { element.textContent = explorer.id; });
    document.querySelectorAll('[data-passport-date]').forEach((element) => { element.textContent = explorer.issueDate; });
    document.querySelectorAll('[data-passport-cover-name]').forEach((element) => { element.textContent = explorer.name; });
    document.querySelectorAll('[data-passport-serial]').forEach((element) => { element.textContent = `${explorer.id} · INITIAL ISSUE`; });
  }

  function issuePassport(explorer) {
    pendingExplorer = explorer;
    setPassportData(explorer);
    passport?.classList.remove('is-open', 'is-mobile-identity', 'is-writing', 'is-stamped', 'is-closing');
    passportRoute?.classList.remove('is-visible', 'is-departing');
    passportRoute.hidden = true;
    passportEnterMap?.removeAttribute('disabled');
    if (passportStatus) {
      passportStatus.textContent = 'PENDING';
    }
    if (passportMessage) {
      passportMessage.textContent = 'Explorer Passport를 발급합니다.';
    }
    showScene('passport');
    announce('Explorer Passport를 발급합니다.');

    delay(() => {
      passport?.classList.add('is-open');
      if (passportMessage) {
        passportMessage.textContent = '외부 공명 응답과 복구 권한을 확인합니다.';
      }
      announce('외부 공명 응답과 복구 권한을 확인합니다.');
    }, 1700);
    delay(() => passport?.classList.add('is-mobile-identity'), 2600);
    delay(() => {
      passport?.classList.add('is-writing');
      if (passportMessage) {
        passportMessage.textContent = `${explorer.name}님의 Explorer 식별 정보를 기록합니다.`;
      }
      announce(`${explorer.name}님의 Explorer 정보를 기록합니다.`);
    }, 2800);
    delay(() => {
      passport?.classList.add('is-stamped');
      if (passportStatus) {
        passportStatus.textContent = 'REGISTERED';
      }
      typePassportMessage(`Explorer ${explorer.name}. 외부 복구 권한이 등록되었습니다.\nWORLD MAP 연결 경로를 열었습니다.`, () => {
        passportRoute.hidden = false;
        requestAnimationFrame(() => passportRoute.classList.add('is-visible'));
        announce('WORLD MAP 연결 경로가 준비되었습니다. 연결 장치를 선택해 주세요.');
        delay(() => passportEnterMap?.focus({ preventScroll: true }), 260);
      });
    }, 4400);
  }

  function handleEnterMap() {
    if (!pendingExplorer || passportEnterMap?.disabled) {
      return;
    }

    passportEnterMap.disabled = true;
    passportRoute?.classList.add('is-departing');
    if (passportMessage) {
      passportMessage.textContent = 'Passport를 닫고 WORLD MAP으로 이동합니다.';
    }
    announce('Passport를 닫고 WORLD MAP으로 이동합니다.');
    delay(() => passport?.classList.add('is-closing'), 220);
    delay(() => {
      const completedExplorer = { ...pendingExplorer, introCompleted: true };
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(completedExplorer));
      } catch {
        // 저장이 제한된 환경에서도 현재 진입 흐름은 이어간다.
      }
      pendingExplorer = null;
      onComplete(completedExplorer, { focusMap: true });
    }, 2050);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!nameInput || isTransitioning) {
      return;
    }

    const result = validateName(nameInput.value);
    if (result.error) {
      nameInput.setAttribute('aria-invalid', 'true');
      nameInput.value = result.name;
      updateNameCount();
      if (nameError) {
        nameError.textContent = result.error;
      }
      nameInput.focus();
      return;
    }

    nameInput.value = result.name;
    const issueDate = createIssueDate();
    const explorer = {
      name: result.name,
      id: createExplorerId(),
      issueDate: issueDate.display,
      issuedAt: issueDate.iso
    };
    form.querySelector('button[type="submit"]')?.setAttribute('disabled', '');
    scenes.get('register')?.classList.add('is-name-departing');
    announce(`${explorer.name}님의 이름을 Explorer Passport로 전송합니다.`);
    delay(() => issuePassport(explorer), 720);
  }

  function start() {
    const forceIntro = new URLSearchParams(window.location.search).get('intro') === '1';
    const savedExplorer = readSavedExplorer();
    if (savedExplorer && !forceIntro) {
      screen.hidden = true;
      screen.classList.remove('is-active');
      onComplete(savedExplorer, { focusMap: false });
      return;
    }

    screen.hidden = false;
    screen.classList.add('is-active');
    playWelcomeIntro();
    announce('멈춘 노바랜드. 화면을 눌러 시작해 주세요.');
  }

  function reset() {
    window.localStorage.removeItem(STORAGE_KEY);
  }

  startButton?.addEventListener('click', handleStart);
  respondButton?.addEventListener('click', handleRespond);
  passportEnterMap?.addEventListener('click', handleEnterMap);
  nameInput?.addEventListener('input', updateNameCount);
  form?.addEventListener('submit', handleSubmit);

  return { reset, start };
}
