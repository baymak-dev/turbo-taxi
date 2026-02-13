const CACHE_NAME = 'turbo-taxi-v1'
const ASSETS = [
  './',
  './index.html',
  './css/index.css',
  './assets/icons/logo.svg',
  './assets/images/hero-panoramic-car.webp',
  './assets/images/qr-code-google.svg',
  '../assets/images/qr-code-google-app-store.svg',
  './assets/images/google_maps_icon.svg',
]

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS)
    }),
  )
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request)
    }),
  )
})
