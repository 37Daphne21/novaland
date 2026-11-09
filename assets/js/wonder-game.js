import { initializeLanguage, t } from './locales.js';
import { isParadeReady, normalizeParadeLineup, paradeOrder, placeParadeCharacter } from './wonder-game-state.js';

const stage = document.querySelector('[data-wonder-stage]');
const status = document.querySelector('[data-wonder-status]');
const returnButton = document.querySelector('[data-wonder-return]');
const launchButton = document.querySelector('[data-wonder-launch]');
const exitButton = document.querySelector('[data-wonder-exit]');
const embedded = new URLSearchParams(window.location.search).get('embedded') === '1';
const symbols = { drummer: '♫', flag: '⚑', star: '✦' };
const dragType = 'application/x-novaland-wonder-character';

let lineup = paradeOrder.map(() => null);
let selected = null;
let dragging = null;
let running = false;
let feedback = 'progress';
let restored = !embedded;

function createCard(list) {
  const item = document.createElement('li');
  const button = document.createElement('button');
  const symbol = document.createElement('span');
  const label = document.createElement('span');
  button.className = 'ui-button ui-button--secondary';
  button.type = 'button';
  symbol.className = 'wonder-game__symbol';
  symbol.setAttribute('aria-hidden', 'true');
  button.append(symbol, label);
  item.append(button);
  list.append(item);
  return { button, symbol, label };
}

const positions = paradeOrder.map(() => createCard(document.querySelector('[data-wonder-lineup]')));
const cast = ['star', 'drummer', 'flag'].map(character => ({ character, ...createCard(document.querySelector('[data-wonder-cast]')) }));

function render() {
  positions.forEach((card, index) => {
    const character = lineup[index];
    const name = t(character ? `wonder.game.${character}` : 'wonder.game.empty');
    card.symbol.textContent = character ? symbols[character] : '◇';
    card.label.textContent = t('wonder.game.position', { number: index + 1, name });
    card.button.disabled = !restored || running;
    card.button.draggable = restored && !running && Boolean(character);
    card.button.setAttribute('aria-pressed', String(Boolean(character && character === selected)));
  });
  cast.forEach(card => {
    card.symbol.textContent = symbols[card.character];
    card.label.textContent = t(`wonder.game.${card.character}`);
    const placed = lineup.includes(card.character);
    card.button.disabled = !restored || placed || running;
    card.button.draggable = restored && !placed && !running;
    card.button.setAttribute('aria-pressed', String(card.character === selected && !placed));
  });
  const count = lineup.filter(Boolean).length;
  returnButton.disabled = running || !selected || !lineup.includes(selected);
  launchButton.disabled = running || count !== lineup.length;
  stage.classList.toggle('is-running', running);
  status.textContent = t(`wonder.game.${feedback}`, { count, total: lineup.length, name: selected ? t(`wonder.game.${selected}`) : '' });
}

function saveLineup() {
  if (embedded) window.parent.postMessage({ type: 'novaland:wonder-state', lineup }, window.location.origin);
}

function selectCharacter(character) {
  selected = character;
  feedback = 'selected';
  render();
}

function placeCharacter(character, index) {
  const next = placeParadeCharacter(lineup, character, index);
  if (next === lineup) {
    feedback = 'occupied';
    render();
    return;
  }
  lineup = next;
  saveLineup();
  selected = null;
  feedback = 'progress';
  render();
  positions[index].button.focus();
}

function clearDrag() {
  dragging = null;
  positions.forEach(({ button }) => button.classList.remove('is-drop-target'));
}

function bindDrag(button, getCharacter) {
  button.addEventListener('dragstart', event => {
    const character = getCharacter();
    if (!character || running || button.disabled || !event.dataTransfer) {
      event.preventDefault();
      return;
    }
    dragging = character;
    event.dataTransfer.setData(dragType, character);
    event.dataTransfer.effectAllowed = 'move';
  });
  button.addEventListener('dragend', clearDrag);
}

cast.forEach(({ character, button }) => {
  button.addEventListener('click', () => selectCharacter(character));
  bindDrag(button, () => character);
});

positions.forEach(({ button }, index) => {
  button.addEventListener('click', () => {
    if (lineup[index]) selectCharacter(lineup[index]);
    else if (selected) placeCharacter(selected, index);
    else { feedback = 'choose'; render(); }
  });
  bindDrag(button, () => lineup[index]);
  button.addEventListener('dragover', event => {
    if (!dragging || running || lineup[index] || !event.dataTransfer?.types.includes(dragType)) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    button.classList.add('is-drop-target');
  });
  button.addEventListener('dragleave', () => button.classList.remove('is-drop-target'));
  button.addEventListener('drop', event => {
    event.preventDefault();
    const character = dragging;
    clearDrag();
    if (!character || running || event.dataTransfer?.getData(dragType) !== character) return;
    placeCharacter(character, index);
  });
});

returnButton.addEventListener('click', () => {
  if (running || !selected || !lineup.includes(selected)) return;
  const character = selected;
  lineup = lineup.map(item => item === character ? null : item);
  saveLineup();
  selected = null;
  feedback = 'progress';
  render();
  cast.find(card => card.character === character).button.focus();
});

launchButton.addEventListener('click', () => {
  if (running || lineup.includes(null)) return;
  if (!isParadeReady(lineup)) {
    feedback = 'incorrect';
    render();
    return;
  }
  clearDrag();
  running = true;
  selected = null;
  feedback = 'running';
  render();
  exitButton.focus();
});

function exitMission() {
  if (embedded) window.parent.postMessage({ type: 'novaland:wonder-exit', destination: 'control-room' }, window.location.origin);
  else window.location.assign('./index.html');
}

exitButton.addEventListener('click', exitMission);
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape' || event.repeat) return;
  event.preventDefault();
  exitMission();
});
window.addEventListener('message', event => {
  if (!embedded || event.source !== window.parent || event.origin !== window.location.origin) return;
  if (event.data?.type === 'novaland:wonder-pause') exitMission();
  if (event.data?.type === 'novaland:wonder-restore' && !restored) {
    lineup = normalizeParadeLineup(event.data.lineup);
    restored = true;
    render();
  }
});
window.addEventListener('storage', event => {
  if (event.key !== 'novaLandLanguage') return;
  initializeLanguage();
  render();
});

initializeLanguage();
render();
document.querySelector('[data-wonder-title]').focus();
if (embedded) window.parent.postMessage({ type: 'novaland:wonder-ready' }, window.location.origin);
