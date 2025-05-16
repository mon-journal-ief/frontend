import { defineStore } from 'pinia'

const api = useApi()
export const useUserStore = defineStore('user', () => {
  const token = ref(localStorage.getItem('token') || '')
  const user = ref<IUser | null>(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : null)

  watch(token, async (newToken) => {
    if (newToken) {
      localStorage.setItem('token', newToken)
      const response = await api.auth.me(newToken)
      user.value = response.data.value
    }
    else {
      localStorage.removeItem('token')
      user.value = null
    }
  })

  watch(user, async (newUser) => {
    if (newUser) {
      localStorage.setItem('user', JSON.stringify(newUser))
    }
    else {
      localStorage.removeItem('user')
    }
  })

  return { token, user }
})
