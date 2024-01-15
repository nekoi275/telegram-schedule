import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/Main.vue'
import LoginView from '../views/Login.vue'
import { useApiStore } from '../stores/api'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/',
      name: 'main',
      component: MainView
    }
  ]
})

router.beforeEach((to) => {
  const api = useApiStore()
  if (localStorage.getItem('telegram-schedule-user') && localStorage.getItem('telegram-schedule-pass')) {
    api.isLoggedIn = true
  }
  if (!api.isLoggedIn && to.name !== 'login') {
    return { name: 'login' }
  }
})
export default router
