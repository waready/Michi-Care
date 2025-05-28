const CACHE_NAME = 'michi-cache-v1'

self.addEventListener('install', event => {
  console.log('🧩 Service Worker instalado.')
  self.skipWaiting()
})

self.addEventListener('activate', event => {
  console.log('🚀 SW activo.')
  event.waitUntil(self.clients.claim())
})

// Cache dinámico
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) return response

      return fetch(event.request).then(fetchRes => {
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, fetchRes.clone())
          return fetchRes
        })
      }).catch(() => {
        // fallback opcional:
        if (event.request.mode === 'navigate') {
          return caches.match('/Michi-Care/index.html')
        }
      })
    })
  )
})

// Notificaciones Push
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

  // Si la app está abierta, enviarle el mensaje
  self.clients.matchAll({ includeUncontrolled: true }).then(clients => {
    clients.forEach(client => client.postMessage(data))
  })
})
