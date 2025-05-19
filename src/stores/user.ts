import { defineStore } from 'pinia'

const api = useApi()
export const useUserStore = defineStore('user', () => {
  const token = ref('')
  const user = ref<IUser | null>(null)

  watch(token, async (newToken) => {
    if (newToken) {
      const response = await api.auth.me()
      user.value = response.data.value
    }
    else {
      user.value = null
    }
  })

  return { token, user }
}, { persist: true })
