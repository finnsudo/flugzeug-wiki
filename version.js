// Update this value whenever a new website update is prepared.
window.AIRCRAFT_WIKI_VERSION = '1.69';

const versionBadge = document.getElementById('siteVersion');
if (versionBadge) {
  versionBadge.textContent = `V${window.AIRCRAFT_WIKI_VERSION}`;
  versionBadge.setAttribute('aria-label', `Version ${window.AIRCRAFT_WIKI_VERSION}`);
}
