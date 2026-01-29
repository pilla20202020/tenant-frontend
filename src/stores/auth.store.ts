import { defineStore } from 'pinia'
import api from '@/api/http'
import { toast } from 'vue3-toastify'
import { useRouter } from 'vue-router'


export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as any,
    token: localStorage.getItem('token'),
    loading: false,
  }),

  actions: {
    // -------------------
    // Login
    // -------------------
    async login(email: string, password: string) {
      try {
        this.loading = true

        const res = await api.post('/tenants/login', { email, password })

        // Updated for new API structure
        this.token = res.data.data.token
        this.user = res.data.data.user

        localStorage.setItem('token', this.token!)
        toast.success('Logged in successfully')
      } catch (e: any) {
        toast.error(e.response?.data?.message || 'Login failed')
        throw e
      } finally {
        this.loading = false
      }
    },

    // -------------------
    // Logout
    // -------------------
    async logout() {
      try {
        this.loading = true

        // Call backend logout if you want to invalidate token
        if (this.token) {
          await api.post('/logout')
        }

        // Clear local state
        this.user = null
        this.token = null
        localStorage.removeItem('token')

        toast.success('Logged out successfully')

        // Redirect to login page
        const router = useRouter()
        router.push('/')
      } catch (e: any) {
        toast.error(e.response?.data?.message || 'Logout failed')
      } finally {
        this.loading = false
      }
    },
  },
})
