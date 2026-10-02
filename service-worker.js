// Etulia — portail faron.etulia.fr. Cache minimal : la page, les images et les
// icônes, pour que le portail s'ouvre même sans réseau. À chaque modification
// visible, bumper CACHE_NAME (sinon l'ancienne version reste en cache).
const CACHE_NAME = 'etulia-portail-v1';
const ASSETS = ['./', './index.html', './manifest.json',
  './img/logo-nom.png', './img/crm.png', './img/chantiers.png', './img/metre.png', './img/photos.png',
  './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png', './icons/favicon.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  const isNav = req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html');
  if (isNav) {
    // Page : réseau d'abord (dernière version), cache en secours
    e.respondWith(fetch(req).then((r) => { const c = r.clone(); caches.open(CACHE_NAME).then((cache) => cache.put('./index.html', c)); return r; })
      .catch(() => caches.match('./index.html')));
    return;
  }
  e.respondWith(caches.match(req).then((hit) => hit || fetch(req).then((r) => { const c = r.clone(); caches.open(CACHE_NAME).then((cache) => cache.put(req, c)); return r; })));
});
