import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import UsersView from '@/views/UsersView.vue'
import TenantCreate from '@/views/TenantCreate.vue'

const routes = [
  {
    path: '/',
    component: LoginView,
    meta: { guest: true },
  },
  {
    path: '/users',
    component: UsersView,
    meta: { requiresAuth: true },
  },
  {
    path: '/tenants/create',
    component: TenantCreate,
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

/**
 * Global Auth Guard
 */
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.meta.guest && token) {
    return next('/users')
  }

  if (to.meta.requiresAuth && !token) {
    return next('/')
  }

  next()
})

export default router
