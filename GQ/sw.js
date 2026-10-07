const CACHE_NAME = 'gymquest-v3.1-cache';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './js/util.js',
  './js/catalog.js',
  './js/store.js',
  './js/stats.js',
  './js/timer.js',
  './js/shader.js',
  './js/card.js',
  './js/anatomy.js',
  './js/app.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((k) => {
          if (k !== CACHE_NAME) return caches.delete(k);
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request).catch(() => cached);
    })
  );
});
