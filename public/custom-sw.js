const CACHE_NAME = 'michi-cache-v1'

const urlsToCache = [
  '/Michi-Care/',
  '/Michi-Care/index.html',
  '/Michi-Care/favicon.ico',
  '/Michi-Care/manifest.json',
  '/Michi-Care/js/app.js',
  '/Michi-Care/css/app.css',
  '/Michi-Care/img/icons/icon-192x192.png'
]

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache)
    }).catch(err => {
      console.error('❌ Error al agregar al caché:', err)
    })
  )
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request)
    })
  )
})

self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {}

  const title = data.title || 'Notificación'
  const options = {
    body: data.body || '',
    icon: '/Michi-Care/img/icons/icon-192x192.png'
  }

  event.waitUntil(
    self.registration.showNotification(title, options)
  )

  // También enviar mensaje a la app si está abierta
  self.clients.matchAll({ includeUncontrolled: true }).then(clients => {
    clients.forEach(client => {
      client.postMessage(data)
    })
  })
})
