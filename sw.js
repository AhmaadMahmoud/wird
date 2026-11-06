/* Service worker: caches the app's files so it works offline.
 *
 * Strategy:
 * - Pages and code (HTML/CSS/JS): network first, revalidated with the server,
 *   falling back to the cache when offline. Updates reach users as soon as they're published.
 * - Fonts and icons: cache first, since they don't change.
 *
 * When adding a new file to the app, add it to SHELL and bump VERSION.
 */
const VERSION = 'wird-v11';

const SHELL = [
  './',
  './index.html',
  './css/style.css',
  './css/fonts.css',
  './js/app.js',
  './js/adhkar.js',
  './js/quran.js',
  './js/adhan.min.js',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './fonts/amiri-arabic-400-normal.woff2',
  './fonts/amiri-arabic-700-normal.woff2',
  './fonts/amiri-quran-arabic-400-normal.woff2',
  './fonts/readex-pro-arabic-300-normal.woff2',
  './fonts/readex-pro-arabic-400-normal.woff2',
  './fonts/readex-pro-arabic-500-normal.woff2',
  './fonts/readex-pro-arabic-600-normal.woff2',
];

const NETWORK_TIMEOUT = 3500;

self.addEventListener('install', (event) => {
  // cache: 'reload' bypasses the browser's HTTP cache so we store the server's latest copy
  event.waitUntil(
    caches.open(VERSION)
      .then((c) => c.addAll(SHELL.map((u) => new Request(u, { cache: 'reload' }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function isStatic(url) {
  return /\.(woff2?|png|jpg|jpeg|svg|ico)$/i.test(url.pathname);
}

async function networkFirst(req) {
  const cache = await caches.open(VERSION);
  try {
    const res = await Promise.race([
      fetch(req, { cache: 'no-cache' }),
      new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), NETWORK_TIMEOUT)),
    ]);
    if (res && res.ok) cache.put(req, res.clone());
    return res;
  } catch (e) {
    const cached = await cache.match(req, { ignoreSearch: true });
    if (cached) return cached;
    if (req.mode === 'navigate') return cache.match('./index.html');
    throw e;
  }
}

async function cacheFirst(req) {
  const cache = await caches.open(VERSION);
  const cached = await cache.match(req, { ignoreSearch: true });
  if (cached) return cached;
  const res = await fetch(req);
  if (res.ok) cache.put(req, res.clone());
  return res;
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith(isStatic(url) ? cacheFirst(req) : networkFirst(req));
});
