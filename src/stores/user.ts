import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const token = ref(localStorage.getItem('token') || '')
  watch(token, (newToken) => {
    if (newToken) {
      localStorage.setItem('token', newToken)
    }
    else {
      localStorage.removeItem('token')
    }
  })

  return { token }
})
