import { isPreviewLocation } from './preview-location.js';
// Initial play preview entry; never inject progress or write storage.
export function applyLunaPreview(game, location) {

  const params = new URLSearchParams(location.search);
  const name = params.get('mission-preview');
  if (params.get('facility') !== 'luna' || params.has('luna-preview')) return null;
  if (!isPreviewLocation(location) || name !== 'play') return null;
  game.reset();
  return { name, messageKey: 'luna.sample.initial' };
}
