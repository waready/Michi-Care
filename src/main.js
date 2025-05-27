import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

// ✅ Importa PrimeVue y su configuración
import PrimeVue from 'primevue/config'

// ✅ Importa los componentes que vas a usar (ejemplo: Button)
import Button from 'primevue/button'

// ✅ Importa los estilos
import '@fullcalendar/daygrid/main.css'
import './assets/calendar-theme.css'

import 'primeflex/primeflex.css'
import 'primevue/resources/primevue.min.css'
import 'primevue/resources/themes/saga-blue/theme.css'  // Puedes cambiar el tema
import 'primeicons/primeicons.css'

import VCalendar from 'v-calendar'

Vue.use(VCalendar, {
  componentPrefix: 'vc' // usa <vc-calendar />
})

Vue.use(PrimeVue)
Vue.component('Button', Button)  // Registra los componentes que necesites

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
