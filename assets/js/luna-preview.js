import { isPreviewLocation } from './preview-location.js';
// Isolated game previews use normal game actions and never write storage.
export function applyLunaPreview(game, location) {

  const params = new URLSearchParams(location.search);
  const name = params.get('mission-preview');
  if (params.get('facility') !== 'luna' || params.has('luna-preview')) return null;
  if (!isPreviewLocation(location) || !['play', 'completed'].includes(name)) return null;
  game.reset();
  if (name === 'completed') {
    // Stop one real rotation before Lotus bloom so the browser can show the transition.
    ['a', 'a', 'b', 'b', 'b', 'c', 'c', 'c', 'd', 'd'].forEach(id => game.rotate(id));
    return { name, messageKey: 'luna.game.ready' };
  }
  return { name, messageKey: 'luna.game.initial' };
}
