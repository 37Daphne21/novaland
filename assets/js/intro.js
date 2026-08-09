const STORAGE_KEY = 'novaLandExplorer';

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
  const form = document.querySelector('[data-intro-form]');
  const nameInput = document.querySelector('#explorer-name-input');
  const nameCount = document.querySelector('[data-name-count]');
  const nameError = document.querySelector('#explorer-name-error');
  const status = document.querySelector('.intro-status');
  const passport = document.querySelector('[data-passport]');
  const passportMessage = document.querySelector('[data-passport-message]');
  const passportRoute = document.querySelector('[data-passport-route]');
  const passportEnterMap = document.querySelector('[data-passport-enter-map]');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const timers = new Set();
  let currentScene = scenes.get('welcome');
  let isTransitioning = false;
  let pendingExplorer = null;
  let welcomeTypingTimer = null;

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
    announce('노바랜드 구조 신호 연결 화면');
    showScene('signal', respondButton);
  }

  function handleRespond() {
    if (isTransitioning || !respondButton) {
      return;
    }
    respondButton.disabled = true;
    announce('Explorer 연결을 확인하고 EVE를 구성하는 중입니다.');
    showScene('register', nameInput);
    delay(() => scenes.get('register')?.classList.add('is-eve-visible'), 900);
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
    showScene('passport');
    announce('Explorer Passport를 발급합니다.');

    delay(() => passport?.classList.add('is-open'), 1050);
    delay(() => {
      passport?.classList.add('is-writing');
      if (passportMessage) {
        passportMessage.textContent = `${explorer.name}님의 정보를 기록합니다.`;
      }
      announce(`${explorer.name}님의 Explorer 정보를 기록합니다.`);
    }, 1900);
    delay(() => {
      passport?.classList.add('is-stamped');
      if (passportMessage) {
        passportMessage.textContent = `Explorer ${explorer.name}. 등록이 완료되었습니다.`;
      }
      announce(`Explorer ${explorer.name}. 등록이 완료되었습니다.`);
    }, 3100);
    delay(() => {
      if (passportMessage) {
        passportMessage.textContent = 'WORLD MAP 연결 경로가 준비되었습니다.';
      }
      passportRoute.hidden = false;
      requestAnimationFrame(() => passportRoute.classList.add('is-visible'));
      announce('WORLD MAP 연결 경로가 준비되었습니다. 연결 장치를 선택해 주세요.');
      delay(() => passportEnterMap?.focus({ preventScroll: true }), 260);
    }, 4500);
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
    }, 1350);
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
    issuePassport(explorer);
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
