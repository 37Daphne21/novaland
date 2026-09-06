import { createEveController } from './eve.js';
import { applyDocumentLanguage, initializeLanguage, t } from './locales.js';
import { createModalController } from './ui.js';
import { renderMissionPause } from './mission-pause.js';
import { LUNA_SAMPLE_BOARD, createLightGarden, prismSockets } from './luna-light.js';

initializeLanguage();
const garden = document.querySelector('[data-luna-garden]');
const rays = document.querySelector('[data-luna-rays]');
const board = LUNA_SAMPLE_BOARD;
const objects = document.querySelector('[data-luna-objects]');
// Art and ray endpoints share the board data rather than duplicate CSS coordinates.
function position(element, node) {
  element.style.setProperty('--x', `${node.x / board.width * 100}%`);
  element.style.setProperty('--y', `${node.y / board.height * 100}%`);
}
board.prisms.forEach(node => {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'luna-prism';
  button.dataset.prism = node.id;
  position(button, node);
  button.innerHTML = `<span class="luna-prism__base" aria-hidden="true"></span><span class="luna-prism__sockets" aria-hidden="true"></span><span class="luna-prism__crystal" aria-hidden="true"></span><b class="luna-prism__label" aria-hidden="true">${node.id.toUpperCase()}</b><span class="luna-prism__turn" aria-hidden="true">↻ 90°</span>`;
  objects.append(button);
});
board.targets.forEach(node => {
  const figure = document.createElement('figure');
  figure.className = `luna-cluster${node.kind === 'lotus' ? ' luna-cluster--lotus' : ''}`;
  figure.dataset.lunaCluster = node.id;
  position(figure, node);
  figure.style.setProperty('--size', `${node.width / board.width * 100}%`);
  figure.innerHTML = `<span class="luna-cluster__halo" aria-hidden="true"></span><span class="luna-cluster__bud" aria-hidden="true"></span><span class="luna-cluster__bloom" aria-hidden="true"></span><span class="luna-cluster__fragment" aria-hidden="true">◇</span><figcaption><span data-luna-flower-name></span><b data-luna-flower-state></b></figcaption>`;
  objects.append(figure);
});
position(document.querySelector('.luna-source'), board.source);
const clusters = [...document.querySelectorAll('[data-luna-cluster]')];
const prismButtons = [...document.querySelectorAll('[data-prism]')];
const dialog = document.querySelector('[data-luna-dialog]');
const pausePanel = document.querySelector('[data-luna-pause-panel]');
const guidePanel = document.querySelector('[data-luna-guide-panel]');
renderMissionPause(pausePanel, { titleId: 'luna-dialog-title', descriptionKey: 'luna.sample.paused' });
const resume = pausePanel.querySelector('[data-mission-resume]');
const guideResume = document.querySelector('[data-luna-guide-resume]');
let started = false;
let focusBoardAfterClose = false;
const game = createLightGarden();
const eve = createEveController(document.querySelector('.luna-sample__eve'), { persistent: true, focusMotion: false });
let messageKey = 'luna.sample.initial';
let modalMode = 'guide';
let paused = false;
let heldAnimations = [];

function say(key) {
  messageKey = key;
  eve.speak(() => t(messageKey));
}

function render(state = game.read()) {
  clusters.forEach(cluster => {
    const id = cluster.dataset.lunaCluster;
    const lotus = id === 'lotus';
    const awake = lotus ? state.complete : state.collected.includes(id);
    cluster.classList.toggle('is-awake', awake);
    cluster.classList.toggle('is-connected', state.light.reached.includes(id));
    cluster.classList.toggle('is-ready', lotus && state.ready);
    cluster.querySelector('[data-luna-flower-name]').textContent = t(`luna.sample.${id}`);
    cluster.querySelector('[data-luna-flower-state]').textContent = t(awake ? 'luna.sample.awake' : lotus ? (state.ready ? 'luna.sample.lotusReady' : 'luna.sample.lotusLocked') : 'luna.sample.asleep');
  });
  document.querySelector('[data-luna-count]').textContent = `${state.collected.length} / 3`;
  document.querySelector('.luna-sample__progress').classList.toggle('is-restored', state.ready);
  document.querySelector('.luna-fragment-mark').textContent = state.ready ? '◆' : '◇';
  document.querySelector('[data-luna-completion]').hidden = !state.complete;
  document.querySelector('.luna-garden__hint').hidden = state.complete;
  document.querySelector('.luna-sample__identity p').textContent = t(state.complete ? 'luna.sample.completeCopy' : state.ready ? 'luna.sample.lotusReadyTitle' : 'luna.sample.title');
  garden.classList.toggle('is-complete', state.complete);
  const directions = t('luna.sample.directions').split(',');
  prismButtons.forEach(button => {
    const id = button.dataset.prism;
    const rotation = state.rotations[id];
    button.style.setProperty('--rotation', `${rotation * 90}deg`);
    button.style.setProperty('--frame', `${(rotation % 4) * 100 / 3}%`);
    button.setAttribute('aria-disabled', String(state.complete));
    button.classList.toggle('is-lit', state.light.litPrisms.includes(id));
    button.setAttribute('aria-label', t(state.complete ? 'luna.sample.prismComplete' : 'luna.sample.prism', { id: id.toUpperCase(), sockets: prismSockets(rotation).map(value => directions[value]).join(' · '), light: t(state.light.litPrisms.includes(id) ? 'luna.sample.receiving' : 'luna.sample.waiting') }));
  });
  rays.replaceChildren(...state.light.segments.map(segment => {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    line.setAttribute('d', `M${segment.from.join(' ')} L${segment.to.join(' ')}`);
    line.setAttribute('class', `luna-garden__ray${segment.loose ? ' is-loose' : ''}`);
    return line;
  }));
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

function setPaused(value) {
  paused = value;
  if (value) {
    heldAnimations = garden.getAnimations({ subtree: true }).filter(animation => animation.playState === 'running');
    heldAnimations.forEach(animation => animation.pause());
  } else {
    heldAnimations.forEach(animation => animation.play());
    heldAnimations = [];
  }
  document.body.classList.toggle('is-paused', value);
  garden.inert = value;
  document.querySelector('.luna-sample__header').inert = value;
  document.querySelector('.luna-sample__footer').inert = value;
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
  const state = game.rotate(button.dataset.prism);
  render(state);
  if (state.complete) say('luna.sample.finished');
  else if (state.ready && !before.ready) say('luna.sample.ready');
  else if (state.light.reached.includes('lotus')) say('luna.sample.locked');
  else if (state.collected.length > before.collected.length) say('luna.sample.restored');
  else if (state.collected.length && !state.light.reached.length) say('luna.sample.retained');
  else if (state.light.reached.length) say('luna.sample.reconnected');
  else say('luna.sample.adjust');
}));

pausePanel.querySelector('[data-mission-restart]').addEventListener('click', () => {
  setPaused(false);
  render(game.reset());
  say('luna.sample.initial');
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
  if (document.hidden && !modal.isOpen()) openDialog('pause');
});
window.addEventListener('pagehide', () => eve.cancel());
window.addEventListener('pageshow', event => { if (event.persisted) openDialog('pause'); });
window.addEventListener('novaland:languagechange', () => {
  applyDocumentLanguage();
  render();
  renderDialog();
  eve.refreshLanguage();
});

render();
say('luna.sample.initial');

openDialog('guide', document.querySelector('[data-luna-guide]'));
window.addEventListener('message', event => {
  if (event.origin === window.location.origin && event.source === window.parent && event.data?.type === 'novaland:luna-pause') openDialog('pause');
});
