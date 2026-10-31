/* عامل الخدمة: يحفظ ملفات التطبيق ليعمل دون اتصال بالإنترنت.
   عند تعديل أي ملف، غيّر رقم الإصدار ليحصل المستخدمون على النسخة الجديدة. */
const VERSION = 'wird-v1';

const SHELL = [
  './',
  './index.html',
  './css/style.css',
  './css/fonts.css',
  './js/app.js',
  './js/adhkar.js',
  './js/adhan.min.js',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './fonts/amiri-arabic-400-normal.woff2',
  './fonts/amiri-arabic-700-normal.woff2',
  './fonts/readex-pro-arabic-300-normal.woff2',
  './fonts/readex-pro-arabic-400-normal.woff2',
  './fonts/readex-pro-arabic-500-normal.woff2',
  './fonts/readex-pro-arabic-600-normal.woff2',
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  if (url.origin !== self.location.origin) return;

  // ملفات التطبيق: من الذاكرة أولًا، ثم الشبكة
  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((res) => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(VERSION).then((c) => c.put(req, copy));
        }
        return res;
      }).catch(() => (req.mode === 'navigate' ? caches.match('./index.html') : undefined));
    })
  );
});
