import { createRouter, createWebHistory } from 'vue-router'
import timeTracker from '@/views/timeTracker.vue'
import dashboard from '@/views/dashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'timeTracker',
      component: timeTracker
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: dashboard
    }
  ]
})

export default router
