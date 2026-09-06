// Preview entry is shared by the parent page and the embedded game.
export function isPreviewLocation(location) {
  return location.hostname === 'localhost'
    || /^127\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(location.hostname)
    || (location.protocol === 'https:' && location.hostname === '37daphne21.github.io' && location.pathname.startsWith('/novaland/'));
}
