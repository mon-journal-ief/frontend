import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const api = useApi()
  const token = ref('')
  const user = ref<IUser | null>(null)

  watch(token, async (newToken) => {
    if (newToken) {
      const response = await api.auth.me(newToken)

      user.value = response.data.value
    }

    user.value = null
  })

  return { token, user }
}, { persist: true })
