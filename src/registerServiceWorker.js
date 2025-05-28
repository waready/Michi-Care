/* eslint-disable no-console */
import { register } from 'register-service-worker'

// Tu clave VAPID pública (base64url)
const applicationServerKey = urlBase64ToUint8Array('BMdZrbD4kaL3u0IIh3DeCnnn9YR0XHMTCP8k-1yZ2JIRtEg8joRB17aghRyEmC7Ohgfb7spF2siQnCC8lo8hfdE')

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const rawData = atob(base64)
  return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)))
}

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}custom-sw.js`, {
    ready(registration) {
      console.log('✅ App lista con Service Worker (modo offline activado).')

      // 🟢 Detectar pérdida o recuperación de conexión
      window.addEventListener('offline', () => {
        alert('📴 ¡Sin conexión! Estás usando la app offline.')
      })
      window.addEventListener('online', () => {
        console.log('🔌 Conexión restaurada.')
      })

      // 🔔 Notificaciones Push
      if ('Notification' in window && Notification.permission !== 'granted') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            console.log('🔔 Notificaciones permitidas.')

            registration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey
            }).then(subscription => {
              fetch('https://michicute.waready.org.pe/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(subscription)
              }).then(() => {
                console.log('📬 Suscripción enviada al servidor.')
              }).catch(console.error)
            }).catch(err => console.error('❌ Error al suscribirse al push:', err))
          }
        })
      }
    },
    registered() {
      console.log('🆗 Service Worker registrado.')
    },
    cached() {
      console.log('📦 Contenido cacheado para uso offline.')
      // Puedes mostrar un toast o banner aquí si quieres
    },
    updatefound() {
      console.log('⬇️ Nueva versión detectada. Descargando...')
    },
    updated() {
      console.log('♻️ Nueva versión disponible. Refresca la app.')
      alert('¡Hay una nueva versión de MichiCute! Recarga la página.')
    },
    offline() {
      console.log('📴 App sin conexión (offline activado).')
    },
    error(error) {
      console.error('❌ Error durante el registro del Service Worker:', error)
    }
  })
}
