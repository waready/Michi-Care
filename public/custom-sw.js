const CACHE_NAME = 'michi-cache-v1'

const urlsToCache = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/manifest.json',
  '/js/app.js',
  '/css/app.css',
  '/img/icons/icon-192x192.png'
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache)
    })
  )
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request)
    })
  )
})

self.addEventListener('push', function (event) {
  const data = event.data.json()
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/img/icons/icon-192x192.png'
    })
  )
})

self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {}

  const title = data.title || 'Notificación'
  const options = {
    body: data.body || '',
    icon: '/img/icons/android-chrome-192x192.png'
  }

  event.waitUntil(
    self.registration.showNotification(title, options)
  )

  // También envía a ventana abierta
  self.clients.matchAll({ includeUncontrolled: true }).then(clients => {
    clients.forEach(client => {
      client.postMessage(data)
    })
  })
})
