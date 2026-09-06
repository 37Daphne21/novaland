import { createEveController } from './eve.js';
import { applyDocumentLanguage, initializeLanguage, t } from './locales.js';
import { createModalController } from './ui.js';
import { renderMissionPause } from './mission-pause.js';
import { applyLunaPreview } from './luna-preview.js';
import { LUNA_GAME_BOARD, createLightGarden, prismDirection, nextLightAction } from './luna-light.js';

initializeLanguage();
const garden = document.querySelector('[data-luna-garden]');
const scene = document.querySelector('[data-luna-scene]');
const rays = document.querySelector('[data-luna-rays]');
const board = LUNA_GAME_BOARD;
// Gold-foot centroids measured in each 543px-wide crystal atlas cell.
const crystalFootX = [309.85, 296.18, 247.1, 231.68];
const objects = document.querySelector('[data-luna-objects]');
// Art and ray endpoints share the board data rather than duplicate CSS coordinates.
function position(element, node) {
  element.style.setProperty('--x', `${node.x / board.width * 100}%`);
  element.style.setProperty('--y', `${node.y / board.height * 100}%`);
  if (node.groundY !== undefined) element.style.setProperty('--ground-offset', `${(node.groundY - node.y) / board.height * 100}cqh`);
  if (node.markerY !== undefined) element.style.setProperty('--marker-offset', `${(node.markerY - node.y) / board.height * 100}cqh`);
}
board.prisms.forEach(node => {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'luna-prism';
  button.dataset.prism = node.id;
  position(button, node);
  button.innerHTML = `<span class="luna-prism__outlet" aria-hidden="true"></span><span class="luna-prism__crystal" aria-hidden="true"></span>`;
  objects.append(button);
});
board.targets.forEach(node => {
  const region = document.createElement('img');
  region.className = 'luna-garden__restoration';
  region.src = './assets/images/luna/garden-restored.webp';
  region.alt = '';
  region.dataset.lunaRegion = node.id;
  position(region, { ...node, y: node.regionY ?? node.y });
  scene.append(region);
  const figure = document.createElement('figure');
  figure.className = `luna-cluster${node.kind === 'lotus' ? ' luna-cluster--lotus' : ''}`;
  figure.dataset.lunaCluster = node.id;
  position(figure, { ...node, markerY: node.y });
  figure.style.setProperty('--size', `${node.width / board.width * 100}%`);
  figure.innerHTML = `<span class="luna-cluster__halo" aria-hidden="true"></span><span class="luna-cluster__fragment" aria-hidden="true">◇</span>`;
  objects.append(figure);
});
position(document.querySelector('.luna-source'), board.source);
const clusters = [...document.querySelectorAll('[data-luna-cluster]')];
const regions = [...document.querySelectorAll('[data-luna-region]')];
const prismButtons = [...document.querySelectorAll('[data-prism]')];
const dialog = document.querySelector('[data-luna-dialog]');
const pausePanel = document.querySelector('[data-luna-pause-panel]');
const guidePanel = document.querySelector('[data-luna-guide-panel]');
renderMissionPause(pausePanel, { titleId: 'luna-dialog-title', descriptionKey: 'luna.game.paused' });
const resume = pausePanel.querySelector('[data-mission-resume]');
const guideResume = document.querySelector('[data-luna-guide-resume]');
let started = false;
let focusBoardAfterClose = false;
const game = createLightGarden();
const evePanel = document.querySelector('.luna-game__eve');
const eve = createEveController(evePanel, { persistent: true, focusMotion: false });
let messageKey = null;
let modalMode = 'guide';
let paused = false;
let heldAnimations = [];
let animationsHeld = false;

// Animate content-driven resizing without retaining a fixed or minimum panel height.
const eveReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let eveHeight = evePanel.getBoundingClientRect().height;
let eveResizeAnimation = null;
const eveSizeObserver = new ResizeObserver(() => {
  const style = getComputedStyle(evePanel);
  const contentHeight = Math.max(...[...evePanel.children].map(child => child.getBoundingClientRect().height));
  const nextHeight = contentHeight + parseFloat(style.paddingTop) + parseFloat(style.paddingBottom) + parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
  if (Math.abs(nextHeight - eveHeight) < .5) return;
  const fromHeight = eveResizeAnimation ? evePanel.getBoundingClientRect().height : eveHeight;
  eveResizeAnimation?.cancel();
  eveResizeAnimation = null;
  eveHeight = nextHeight;
  if (eveReducedMotion.matches || !fromHeight) return;
  eveResizeAnimation = evePanel.animate([{ height: `${fromHeight}px` }, { height: `${nextHeight}px` }], { duration: 240, easing: 'ease-out' });
  eveResizeAnimation.onfinish = () => { eveResizeAnimation = null; };
});
[...evePanel.children].forEach(child => eveSizeObserver.observe(child));
eveReducedMotion.addEventListener('change', () => {
  if (eveReducedMotion.matches) {
    eveResizeAnimation?.cancel();
    eveResizeAnimation = null;
  }
});

function say(key) {
  if (key === messageKey) return;
  messageKey = key;
  eve.speak(() => t(messageKey));
}

function render(state = game.read()) {
  const nextAction = nextLightAction(board, state);
  clusters.forEach(cluster => {
    const id = cluster.dataset.lunaCluster;
    const lotus = id === 'lotus';
    const awake = lotus ? state.complete : state.collected.includes(id);
    cluster.classList.toggle('is-awake', awake);
    cluster.classList.toggle('is-connected', state.light.reached.includes(id));
    cluster.classList.toggle('is-ready', lotus && state.ready);
    cluster.classList.toggle('is-next', id === nextAction?.target);
    cluster.setAttribute('aria-label', `${t(`luna.game.${id}`)}. ${t(awake ? 'luna.game.awake' : lotus ? (state.ready ? 'luna.game.lotusReady' : 'luna.game.lotusLocked') : 'luna.game.asleep')}`);
  });
  regions.forEach(region => region.classList.toggle('is-awake', region.dataset.lunaRegion === 'lotus' ? state.complete : state.collected.includes(region.dataset.lunaRegion)));
  document.querySelector('[data-luna-count]').textContent = `${state.collected.length} / 3`;
  document.querySelector('.luna-game__progress').classList.toggle('is-restored', state.complete);
  document.querySelector('[data-luna-progress-label]').textContent = t(state.complete ? 'luna.game.progressComplete' : state.ready ? 'luna.game.progressLotus' : 'luna.game.fragment');
  document.querySelectorAll('.luna-game__milestones i').forEach((mark, index) => mark.classList.toggle('is-filled', index < state.collected.length || (index === 3 && state.complete)));
  document.querySelector('.luna-fragment-mark').textContent = state.complete ? '✧' : '◇';
  document.querySelector('[data-luna-completion]').hidden = !state.complete;
  document.querySelector('.luna-game__identity p').textContent = t(state.complete ? 'luna.game.completeCopy' : state.ready ? 'luna.game.lotusReadyTitle' : 'luna.game.title');
  garden.classList.toggle('is-complete', state.complete);
  const directions = t('luna.game.directions').split(',');
  prismButtons.forEach(button => {
    const id = button.dataset.prism;
    const rotation = state.rotations[id];
    button.style.setProperty('--rotation', `${rotation * 90}deg`);
    button.style.setProperty('--outlet-scale-y', rotation % 4 === 0 ? '2.4' : rotation % 4 === 2 ? '1' : '.65');
    button.style.setProperty('--frame', `${rotation % 4 * 100 / 3}%`);
    button.style.setProperty('--crystal-left', `${13 + (0.5 - crystalFootX[rotation % 4] / 543) * 74}%`);
    button.setAttribute('aria-disabled', String(state.complete));
    button.classList.toggle('is-lit', state.energized.includes(id));
    button.classList.toggle('is-next', id === nextAction?.prism);
    button.setAttribute('aria-label', t(state.complete ? 'luna.game.prismComplete' : 'luna.game.prism', { id: id.toUpperCase(), direction: directions[prismDirection(rotation)], light: t(state.light.litPrisms.includes(id) ? 'luna.game.receiving' : 'luna.game.waiting') }));
  });
  const activeRays = new Set();
  state.light.segments.forEach((segment, index) => {
    const target = board.targets.find(node => node.x === segment.to[0] && node.y === segment.to[1]);
    const pending = segment.loose || (target?.kind === 'lotus' && !state.complete);
    const path = `M${segment.from.join(' ')} L${segment.to.join(' ')}`;
    const key = `${path}:${Boolean(pending)}`;
    activeRays.add(key);
    if ([...rays.children].some(line => line.dataset.ray === key)) return;
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    line.dataset.ray = key;
    line.style.setProperty('--ray-delay', `${index * 70}ms`);
    line.setAttribute('d', path);
    line.setAttribute('class', `luna-garden__ray${pending ? ' is-loose' : ''}`);
    rays.append(line);
  });
  [...rays.children].forEach(line => { if (!activeRays.has(line.dataset.ray)) line.remove(); });
}

function renderDialog() {
  const guide = modalMode === 'guide';
  pausePanel.hidden = guide;
  guidePanel.hidden = !guide;
  dialog.setAttribute('aria-labelledby', guide ? 'luna-guide-title' : 'luna-dialog-title');
  guideResume.textContent = t(started ? 'mission.resume' : 'mission.start');
  document.querySelector('[data-luna-guide-close]').hidden = started;
}

function leaveGame(destination) {
  if (window.parent !== window) window.parent.postMessage({ type: 'novaland:luna-exit', destination }, window.location.origin);
  else window.location.assign('./index.html');
}

function syncAnimations(hold = paused || document.hidden) {
  if (hold === animationsHeld) return;
  animationsHeld = hold;
  if (hold) {
    heldAnimations = garden.getAnimations({ subtree: true }).filter(animation => animation.playState === 'running');
    heldAnimations.forEach(animation => animation.pause());
  } else {
    heldAnimations.forEach(animation => animation.play());
    heldAnimations = [];
  }
}

function setPaused(value) {
  paused = value;
  syncAnimations();
  document.body.classList.toggle('is-paused', value);
  garden.inert = value;
  document.querySelector('.luna-game__header').inert = value;
  document.querySelector('.luna-game__footer').inert = value;
}

const modal = createModalController(dialog, {
  onCancel: () => {
    if (modalMode === 'guide' && started) modal.close();
    else leaveGame('control-room');
  },
  onClose: () => {
    setPaused(false); eve.refreshLanguage();
    if (focusBoardAfterClose) {
      focusBoardAfterClose = false;
      requestAnimationFrame(() => prismButtons[0].focus());
    }
  }
});

function openDialog(mode, opener = document.activeElement) {
  if (modal.isOpen()) return;
  modalMode = mode;
  eve.cancel();
  renderDialog();
  setPaused(true);
  modal.open({ focusTarget: mode === 'guide' ? guideResume : resume, opener });
}

prismButtons.forEach(button => button.addEventListener('click', () => {
  if (paused || game.read().complete) return;
  const before = game.read();
  const expected = nextLightAction(board, before);
  const state = game.rotate(button.dataset.prism);
  render(state);
  if (state.complete) say('luna.game.finished');
  else if (state.ready && !before.ready) say('luna.game.ready');
  else if (state.collected.length > before.collected.length) say('luna.game.restored');
  else if (expected && button.dataset.prism !== expected.prism) say(state.ready ? 'luna.game.connectAll' : 'luna.game.followGlow');
  else if (state.light.reached.includes('lotus')) say(state.ready ? 'luna.game.connectAll' : 'luna.game.locked');
  else if (state.collected.length && !state.light.reached.length) say('luna.game.retained');
  else if (state.light.reached.length) say('luna.game.reconnected');
  else say('luna.game.adjust');
}));

pausePanel.querySelector('[data-mission-restart]').addEventListener('click', () => {
  setPaused(false);
  render(game.reset());
  say('luna.game.initial');
  focusBoardAfterClose = true;
  modal.close();
});
pausePanel.querySelector('[data-mission-control-room]').addEventListener('click', () => leaveGame('control-room'));
pausePanel.querySelector('[data-mission-exit]').addEventListener('click', () => leaveGame('map'));
document.querySelector('[data-luna-guide-close]').addEventListener('click', () => leaveGame('control-room'));
guideResume.addEventListener('click', () => {
  focusBoardAfterClose = !started;
  started = true;
  modal.close();
});
document.querySelector('[data-luna-guide]').addEventListener('click', () => openDialog('guide'));
document.querySelector('[data-luna-pause]').addEventListener('click', () => openDialog('pause'));
resume.addEventListener('click', () => modal.close());
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !event.repeat && !modal.isOpen() && !event.defaultPrevented) {
    event.preventDefault();
    openDialog('pause');
  }
});
document.addEventListener('visibilitychange', () => {
  syncAnimations();
  if (document.hidden) eve.cancel();
  else if (!paused) eve.refreshLanguage();
});
window.addEventListener('pagehide', () => { syncAnimations(true); eve.cancel(); });
window.addEventListener('pageshow', event => {
  if (event.persisted) { syncAnimations(); if (!paused) eve.refreshLanguage(); }
});
window.addEventListener('novaland:languagechange', () => {
  applyDocumentLanguage();
  render();
  renderDialog();
  eve.refreshLanguage();
});

const preview = applyLunaPreview(game, window.location);
started = Boolean(preview);
render();
say(preview?.messageKey ?? 'luna.game.initial');

if (preview?.name === 'completed') {
  // Decode both states before counting visible, unpaused time for the bloom preview.
  Promise.all([...scene.querySelectorAll('img')].map(img => img.decode().catch(() => {}))).then(() => {
    let previous = null;
    let elapsed = 0;
    function bloomPreview(now) {
      const state = game.read();
      if (!state.ready || state.complete || state.rotations.d !== 2) return;
      if (previous !== null && !paused && !document.hidden) elapsed += Math.min(now - previous, 100);
      previous = now;
      if (elapsed < 3600) { requestAnimationFrame(bloomPreview); return; }
      render(game.rotate('d'));
      say('luna.game.finished');
    }
    requestAnimationFrame(bloomPreview);
  });
}

if (!preview) openDialog('guide', document.querySelector('[data-luna-guide]'));
window.addEventListener('message', event => {
  if (event.origin === window.location.origin && event.source === window.parent && event.data?.type === 'novaland:luna-pause') openDialog('pause');
});
