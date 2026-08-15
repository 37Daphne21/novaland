import { explorerProfiles, getExplorerProfile } from './data.js';
import { t } from './locales.js';

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
    return { error: t('intro.validation.required'), name };
  }

  if (characterCount < 2 || characterCount > 12) {
    return { error: t('intro.validation.length'), name };
  }

  if (!/^[가-힣A-Za-z0-9]+(?: [가-힣A-Za-z0-9]+)*$/u.test(name)) {
    return { error: t('intro.validation.characters'), name };
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
    if (!value?.introCompleted || !value?.name || !value?.id) {
      return null;
    }
    return { ...value, gender: explorerProfiles[value.gender] ? value.gender : 'female' };
  } catch {
    return null;
  }
}

export function createIntroController({ onComplete, onRouteChange }) {
  const screen = document.querySelector('[data-screen="intro"]');
  const scenes = new Map(Array.from(document.querySelectorAll('[data-intro-scene]')).map((scene) => [scene.dataset.introScene, scene]));
  const settingsButton = document.querySelector('.intro-settings-button');
  const welcomeBrand = document.querySelector('.intro-welcome__brand');
  const welcomeTitle = welcomeBrand?.querySelector('span');
  const welcomeSubtitle = welcomeBrand?.querySelector('strong');
  const welcomeTitleText = welcomeTitle?.textContent.trim() ?? '';
  const startButton = document.querySelector('[data-intro-start]');
  const respondButton = document.querySelector('[data-intro-respond]');
  const registerDialogue = document.querySelector('.intro-dialogue');
  const registerDialogueMessage = document.querySelector('[data-intro-dialogue-message]');
  const form = document.querySelector('[data-intro-form]');
  const registrationBody = document.querySelector('[data-registration-body]');
  const registrationStep = document.querySelector('[data-registration-step]');
  const registrationNameStep = document.querySelector('[data-register-step="name"]');
  const registrationIdentityStep = document.querySelector('[data-register-step="identity"]');
  const nameInput = document.querySelector('#explorer-name-input');
  const nameCount = document.querySelector('[data-name-count]');
  const nameError = document.querySelector('#explorer-name-error');
  const registerSubmitButton = document.querySelector('[data-register-submit]');
  const genderFieldset = document.querySelector('.intro-avatar-select');
  const genderInputs = Array.from(document.querySelectorAll('input[name="explorerGender"]'));
  const genderError = document.querySelector('#explorer-gender-error');
  const status = document.querySelector('.intro-status');
  const passport = document.querySelector('[data-passport]');
  const passportPortrait = document.querySelector('[data-passport-portrait]');
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
  let registerTypingState = null;
  let passportTypingState = null;
  let validatedName = '';
  let isRegistrationTransitioning = false;

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

  function createRoute(scene, step = null) {
    return { screen: 'intro', scene, ...(step ? { step } : {}) };
  }

  function recordRoute(scene, step = null, options = {}) {
    onRouteChange?.(createRoute(scene, step), options);
  }

  function cancelPendingEffects() {
    timers.forEach((timer) => window.clearTimeout(timer));
    timers.clear();
    window.clearInterval(welcomeTypingTimer);
    window.clearInterval(registerTypingTimer);
    window.clearInterval(passportTypingTimer);
    welcomeTypingTimer = null;
    registerTypingTimer = null;
    passportTypingTimer = null;
    registerTypingState = null;
    passportTypingState = null;
    registerDialogue?.setAttribute('disabled', '');
    passportMessage?.parentElement?.setAttribute('disabled', '');
    registerDialogue?.classList.remove('is-typing');
    registerDialogue?.setAttribute('aria-busy', 'false');
    passportMessage?.parentElement?.classList.remove('is-typing');
    isTransitioning = false;
    isRegistrationTransitioning = false;
    scenes.forEach((scene) => scene.classList.remove('is-leaving'));
    form?.classList.remove('is-step-transitioning', 'is-step-reverse');
    registrationNameStep?.classList.remove('is-step-leaving', 'is-step-entering', 'is-step-active');
    registrationIdentityStep?.classList.remove('is-step-leaving', 'is-step-entering', 'is-step-active');
    if (registrationBody) {
      registrationBody.style.height = '';
    }
  }

  function finishRegisterDialogue() {
    if (!registerTypingState || !registerDialogue || !registerDialogueMessage) {
      return;
    }

    const { message, onComplete } = registerTypingState;
    registerTypingState = null;
    window.clearInterval(registerTypingTimer);
    registerTypingTimer = null;
    registerDialogue.classList.remove('is-typing');
    registerDialogue.setAttribute('aria-busy', 'false');
    registerDialogue.setAttribute('disabled', '');
    registerDialogueMessage.textContent = message;
    onComplete?.();
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
    registerTypingState = { message, onComplete };
    registerDialogue.removeAttribute('disabled');

    if (prefersReducedMotion) {
      finishRegisterDialogue();
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
        finishRegisterDialogue();
      }
    }, 34);
  }

  function finishPassportMessage() {
    if (!passportTypingState || !passportMessage) {
      return;
    }

    const { message, onComplete } = passportTypingState;
    passportTypingState = null;
    window.clearInterval(passportTypingTimer);
    passportTypingTimer = null;
    passportMessage.parentElement?.classList.remove('is-typing');
    passportMessage.parentElement?.setAttribute('disabled', '');
    passportMessage.textContent = message;
    onComplete?.();
  }

  function handleGlobalDialogueReveal(event) {
    if (!registerTypingState && !passportTypingState) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    if (registerTypingState) {
      finishRegisterDialogue();
      return;
    }
    finishPassportMessage();
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
    passportTypingState = { message, onComplete };
    passportMessage.parentElement?.removeAttribute('disabled');

    if (prefersReducedMotion) {
      finishPassportMessage();
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
        finishPassportMessage();
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
      if (settingsButton) {
        settingsButton.hidden = name === 'welcome';
      }
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
    announce(t('intro.status.analyzing'));
    showScene('signal');
    recordRoute('signal');
    delay(() => {
      signalScene?.classList.remove('is-acquiring');
      signalScene?.classList.add('is-locked');
      announce(t('intro.status.located'));
      delay(() => {
        respondButton?.removeAttribute('disabled');
        announce(t('intro.status.received'));
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
    announce(t('intro.status.connecting'));
    showScene('register');
    recordRoute('register', 'name');
    delay(() => {
      const registerScene = scenes.get('register');
      registerScene?.classList.add('is-projecting');
      delay(() => {
        registerScene?.classList.add('is-eve-visible');
        delay(() => {
          registerScene?.classList.add('is-dialogue-visible');
          registerDialogue?.removeAttribute('aria-hidden');
          typeRegisterDialogue(t('intro.register.dialogue'), () => {
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

  function handleNameKeydown(event) {
    if (event.key !== 'Enter' || registrationIdentityStep?.hidden === false) {
      return;
    }
    event.preventDefault();
    advanceNameStep();
  }

  function focusRegistrationStep(showIdentity) {
    if (showIdentity) {
      const selectedGender = genderInputs.find((input) => input.checked);
      (selectedGender || genderInputs[0])?.focus({ preventScroll: true });
      return;
    }
    nameInput?.focus({ preventScroll: true });
  }

  function updateRegistrationStep(showIdentity) {
    if (registrationStep) {
      registrationStep.textContent = showIdentity ? '02 / 02' : '01 / 02';
    }
    if (form) {
      form.dataset.currentRegistrationStep = showIdentity ? 'identity' : 'name';
    }
  }

  function setRegistrationStepImmediate(step) {
    const showIdentity = step === 'identity';
    if (!registrationNameStep || !registrationIdentityStep) {
      return;
    }

    registrationNameStep.hidden = showIdentity;
    registrationIdentityStep.hidden = !showIdentity;
    updateRegistrationStep(showIdentity);
  }

  function showRegistrationStep(step) {
    const showIdentity = step === 'identity';
    const transitionDuration = showIdentity ? 380 : 450;
    if (!registrationNameStep || !registrationIdentityStep || isRegistrationTransitioning) {
      return;
    }

    const currentStep = showIdentity ? registrationNameStep : registrationIdentityStep;
    const nextStep = showIdentity ? registrationIdentityStep : registrationNameStep;
    if (currentStep.hidden) {
      focusRegistrationStep(showIdentity);
      return;
    }

    if (prefersReducedMotion || !registrationBody || !form) {
      currentStep.hidden = true;
      nextStep.hidden = false;
      updateRegistrationStep(showIdentity);
      focusRegistrationStep(showIdentity);
      return;
    }

    isRegistrationTransitioning = true;
    form.classList.add('is-step-transitioning');
    form.classList.toggle('is-step-reverse', !showIdentity);
    registrationBody.style.height = `${currentStep.offsetHeight}px`;
    currentStep.classList.add('is-step-leaving');

    delay(() => {
      currentStep.hidden = true;
      currentStep.classList.remove('is-step-leaving');
      nextStep.hidden = false;
      nextStep.classList.add('is-step-entering');
      updateRegistrationStep(showIdentity);
      registrationBody.style.height = `${nextStep.offsetHeight}px`;

      requestAnimationFrame(() => nextStep.classList.add('is-step-active'));
      delay(() => {
        nextStep.classList.remove('is-step-entering', 'is-step-active');
        registrationBody.style.height = '';
        form.classList.remove('is-step-transitioning', 'is-step-reverse');
        isRegistrationTransitioning = false;
        focusRegistrationStep(showIdentity);
      }, transitionDuration);
    }, 180);
  }

  function advanceNameStep() {
    if (!nameInput || isTransitioning) {
      return;
    }

    const result = validateName(nameInput.value);
    if (result.error) {
      nameInput.value = result.name;
      updateNameCount();
      nameInput.setAttribute('aria-invalid', 'true');
      if (nameError) {
        nameError.textContent = result.error;
      }
      nameInput.focus();
      return;
    }

    validatedName = result.name;
    nameInput.value = result.name;
    showRegistrationStep('identity');
    recordRoute('register', 'identity');
    announce(t('intro.status.nameConfirmed', { name: validatedName }));
  }

  function handleGenderChange(event) {
    if (!explorerProfiles[event.currentTarget.value]) {
      return;
    }
    genderFieldset?.removeAttribute('aria-invalid');
    if (genderError) {
      genderError.textContent = '';
    }
    registerSubmitButton?.removeAttribute('disabled');
    announce(t('intro.status.identitySelected', { gender: t(`intro.gender.${event.currentTarget.value}`) }));
  }

  function handleGenderKeydown(event) {
    const direction = ['ArrowRight', 'ArrowDown'].includes(event.key) ? 1 : ['ArrowLeft', 'ArrowUp'].includes(event.key) ? -1 : 0;
    if (!direction) {
      return;
    }

    event.preventDefault();
    const currentIndex = genderInputs.indexOf(event.currentTarget);
    const nextIndex = (currentIndex + direction + genderInputs.length) % genderInputs.length;
    const nextInput = genderInputs[nextIndex];
    nextInput.checked = true;
    nextInput.focus({ preventScroll: true });
    nextInput.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function setPassportData(explorer) {
    const gender = getExplorerProfile(explorer.gender);
    document.querySelectorAll('[data-passport-name]').forEach((element) => { element.textContent = explorer.name; });
    document.querySelectorAll('[data-passport-id]').forEach((element) => { element.textContent = explorer.id; });
    document.querySelectorAll('[data-passport-date]').forEach((element) => { element.textContent = explorer.issueDate; });
    document.querySelectorAll('[data-passport-gender]').forEach((element) => { element.textContent = gender.label; });
    document.querySelectorAll('[data-passport-cover-name]').forEach((element) => { element.textContent = explorer.name; });
    document.querySelectorAll('[data-passport-serial]').forEach((element) => { element.textContent = `${explorer.id} · INITIAL ISSUE`; });
    if (passportPortrait) {
      passportPortrait.src = gender.image;
      passportPortrait.alt = gender.alt;
    }
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
      passportMessage.textContent = t('intro.passport.issue');
    }
    showScene('passport');
    recordRoute('passport');
    announce(t('intro.passport.issue'));

    delay(() => {
      passport?.classList.add('is-open');
      if (passportMessage) {
        passportMessage.textContent = t('intro.passport.verify');
      }
      announce(t('intro.passport.verify'));
    }, 1700);
    delay(() => passport?.classList.add('is-mobile-identity'), 2600);
    delay(() => {
      passport?.classList.add('is-writing');
      if (passportMessage) {
        passportMessage.textContent = t('intro.passport.record', { name: explorer.name });
      }
      announce(t('intro.passport.recordAnnounce', { name: explorer.name }));
    }, 2800);
    delay(() => {
      passport?.classList.add('is-stamped');
      if (passportStatus) {
        passportStatus.textContent = 'REGISTERED';
      }
      typePassportMessage(t('intro.passport.complete', { name: explorer.name }), () => {
        passportRoute.hidden = false;
        requestAnimationFrame(() => passportRoute.classList.add('is-visible'));
        announce(t('intro.passport.ready'));
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
      passportMessage.textContent = t('intro.passport.entering');
    }
    announce(t('intro.passport.entering'));
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
    if (registrationIdentityStep?.hidden !== false) {
      advanceNameStep();
      return;
    }
    if (!validatedName || isTransitioning || isRegistrationTransitioning) {
      return;
    }

    const selectedGender = genderInputs.find((input) => input.checked)?.value;
    if (!explorerProfiles[selectedGender]) {
      genderFieldset?.setAttribute('aria-invalid', 'true');
      if (genderError) {
        genderError.textContent = t('intro.validation.identity');
      }
      genderInputs[0]?.focus();
      return;
    }

    const issueDate = createIssueDate();
    const explorer = {
      name: validatedName,
      gender: selectedGender,
      id: createExplorerId(),
      issueDate: issueDate.display,
      issuedAt: issueDate.iso
    };
    registerSubmitButton?.setAttribute('disabled', '');
    scenes.get('register')?.classList.add('is-registration-departing');
    announce(t('intro.status.sending', { name: explorer.name }));
    delay(() => issuePassport(explorer), 720);
  }

  function prepareSignalScene() {
    const signalScene = scenes.get('signal');
    signalScene?.classList.remove('is-acquiring');
    signalScene?.classList.add('is-locked');
    respondButton?.removeAttribute('disabled');
    announce(t('intro.status.received'));
  }

  function prepareRegisterScene(step) {
    const registerScene = scenes.get('register');
    registerScene?.classList.remove('is-registration-departing');
    registerScene?.classList.add('is-projecting', 'is-eve-visible', 'is-dialogue-visible', 'is-form-ready');
    registerDialogue?.classList.remove('is-typing');
    registerDialogue?.removeAttribute('aria-hidden');
    registerDialogue?.setAttribute('aria-busy', 'false');
    if (registerDialogueMessage) {
      const registerDialogueText = t('intro.register.dialogue');
      registerDialogueMessage.textContent = registerDialogueText;
      registerDialogueMessage.setAttribute('aria-label', registerDialogueText.replace(/\n/g, ' '));
    }
    form?.removeAttribute('inert');
    setRegistrationStepImmediate(step);
    if (genderInputs.some((input) => input.checked)) {
      registerSubmitButton?.removeAttribute('disabled');
    }
    announce(step === 'identity'
      ? t('intro.status.nameConfirmed', { name: validatedName || nameInput?.value || 'Explorer' })
      : t('intro.status.askName'));
  }

  function preparePassportScene() {
    if (pendingExplorer) {
      setPassportData(pendingExplorer);
    }
    scenes.get('register')?.classList.remove('is-registration-departing');
    passport?.classList.remove('is-closing');
    passport?.classList.add('is-open', 'is-mobile-identity', 'is-writing', 'is-stamped');
    passportRoute.hidden = false;
    passportRoute?.classList.remove('is-departing');
    passportRoute?.classList.add('is-visible');
    passportEnterMap?.removeAttribute('disabled');
    if (passportStatus) {
      passportStatus.textContent = 'REGISTERED';
    }
    if (passportMessage && pendingExplorer) {
      passportMessage.textContent = t('intro.passport.complete', { name: pendingExplorer.name });
    }
    announce(t('intro.passport.ready'));
  }

  function navigate(route) {
    if (route?.screen !== 'intro' || !scenes.has(route.scene)) {
      return;
    }

    cancelPendingEffects();
    if (route.scene === 'register' && currentScene === scenes.get('register')) {
      scenes.get('register')?.classList.remove('is-registration-departing');
      if (genderInputs.some((input) => input.checked)) {
        registerSubmitButton?.removeAttribute('disabled');
      }
      showRegistrationStep(route.step === 'identity' ? 'identity' : 'name');
      announce(route.step === 'identity'
        ? t('intro.status.chooseIdentity')
        : t('intro.status.returnName'));
      return;
    }

    let focusTarget = startButton;
    if (route.scene === 'welcome') {
      playWelcomeIntro();
      announce(t('intro.status.welcome'));
    } else if (route.scene === 'signal') {
      prepareSignalScene();
      focusTarget = respondButton;
    } else if (route.scene === 'register') {
      prepareRegisterScene(route.step === 'identity' ? 'identity' : 'name');
      focusTarget = route.step === 'identity'
        ? genderInputs.find((input) => input.checked) || genderInputs[0]
        : nameInput;
    } else if (route.scene === 'passport') {
      preparePassportScene();
      focusTarget = passportEnterMap;
    }

    showScene(route.scene, focusTarget);
  }

  function refreshLanguage() {
    const registerDialogueText = t('intro.register.dialogue');
    if (registerDialogueMessage && !registerTypingState) {
      registerDialogueMessage.textContent = registerDialogueText;
      registerDialogueMessage.setAttribute('aria-label', registerDialogueText.replace(/\n/g, ' '));
    }

    if (nameInput?.getAttribute('aria-invalid') === 'true' && nameError) {
      nameError.textContent = validateName(nameInput.value).error;
    }
    if (genderFieldset?.getAttribute('aria-invalid') === 'true' && genderError) {
      genderError.textContent = t('intro.validation.identity');
    }
    if (pendingExplorer) {
      setPassportData(pendingExplorer);
    }

    const sceneName = currentScene?.dataset.introScene;
    if (sceneName === 'welcome') {
      announce(t('intro.status.welcome'));
      return;
    }
    if (sceneName === 'signal') {
      announce(t('intro.status.received'));
      return;
    }
    if (sceneName === 'register') {
      announce(registrationIdentityStep?.hidden === false
        ? t('intro.status.nameConfirmed', { name: validatedName || nameInput?.value || 'Explorer' })
        : t('intro.status.askName'));
      return;
    }
    if (sceneName !== 'passport' || !passportMessage || !pendingExplorer) {
      return;
    }

    if (passport?.classList.contains('is-stamped')) {
      passportMessage.textContent = t('intro.passport.complete', { name: pendingExplorer.name });
      announce(t('intro.passport.ready'));
    } else if (passport?.classList.contains('is-writing')) {
      passportMessage.textContent = t('intro.passport.record', { name: pendingExplorer.name });
      announce(t('intro.passport.recordAnnounce', { name: pendingExplorer.name }));
    } else if (passport?.classList.contains('is-open')) {
      passportMessage.textContent = t('intro.passport.verify');
      announce(t('intro.passport.verify'));
    } else {
      passportMessage.textContent = t('intro.passport.issue');
      announce(t('intro.passport.issue'));
    }
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
    announce(t('intro.status.welcome'));
    recordRoute('welcome', null, { replace: true });
  }

  function reset() {
    window.localStorage.removeItem(STORAGE_KEY);
  }

  startButton?.addEventListener('click', handleStart);
  respondButton?.addEventListener('click', handleRespond);
  document.addEventListener('click', handleGlobalDialogueReveal, true);
  passportEnterMap?.addEventListener('click', handleEnterMap);
  nameInput?.addEventListener('input', updateNameCount);
  nameInput?.addEventListener('keydown', handleNameKeydown);
  genderInputs.forEach((input) => {
    input.addEventListener('change', handleGenderChange);
    input.addEventListener('keydown', handleGenderKeydown);
  });
  form?.addEventListener('submit', handleSubmit);

  return { navigate, refreshLanguage, reset, start };
}
