import { defineStore } from 'pinia'
import { userAPI } from '@/api/user'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    loading: false,
    error: null,
    isConnected: false
  }),

  getters: {
    username: (state) => state.user?.username,
    fullName: (state) => 
      state.user ? `${state.user.firstName} ${state.user.lastName}` : '',
  },

  actions: {
    async connectUser(userData) {
      this.loading = true
      try {
        const { data } = await userAPI.connectUser(userData)
        this.user = {
          ...userData,
          ...data
        }
        this.isConnected = true
        this.error = null
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    clearError() {
      this.error = null
    },

    logout() {
      this.user = null
      this.isConnected = false
    }
  },

  persist: {
    paths: ['user', 'isConnected']
  }
})
