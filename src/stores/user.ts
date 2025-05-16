import { defineStore } from 'pinia'

const api = useApi()
export const useUserStore = defineStore('user', () => {
  const token = ref(localStorage.getItem('token') || '')
  const user = ref<IUser | null>(null)

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

  return { token, user }
})
