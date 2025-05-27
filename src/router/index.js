import Vue from 'vue'
import VueRouter from 'vue-router'

// Layout principal con la barra de navegación inferior
import Dashboard from '../views/Dashboard.vue'

// Vistas hijas que se mostrarán dentro de Dashboard
import Calendar from '../views/Calendar.vue'
import Tips from '../views/Tips.vue'
import Chat from '../views/Chat.vue'
import Home from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Dashboard,
    children: [
      {
        path: '',
        name: 'home',
        component: Home
      },
      {
        path: 'calendar',
        name: 'calendar',
        component: Calendar
      },
      {
        path: 'tips',
        name: 'tips',
        component: Tips
      },
      {
        path: 'chat',
        name: 'chat',
        component: Chat
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
