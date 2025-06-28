import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const api = useApi()
  const accessToken = ref('')
  const user = ref<IUser | null>(null)

  watch(accessToken, async (newToken) => {
    if (newToken) {
      const response = await api.auth.me(newToken)

      user.value = response.data.value
    }

    user.value = null
  })

  return {
    accessToken,
    user,
  }
}, { persist: true })
