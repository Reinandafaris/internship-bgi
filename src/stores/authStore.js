import { defineStore } from 'pinia'
import authService from '@/services/authService'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    status: 'idle', // idle | loading | success | error
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    isLoading: (state) => state.status === 'loading',
  },
  actions: {
    async login(credentials) {
      this.status = 'loading'
      try {
        const response = await authService.login(credentials)
        const { user, token } = response.data
        this.user = user
        this.token = token
        localStorage.setItem('token', token) // Simpan token
        this.status = 'success'
        return true
      } catch {
        this.status = 'error'
        return false
      }
    },
    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
    },
  },
})
