import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const api = useApi()
  const accessToken = ref('')
  const user = ref<IUser | null>(null)

  async function fetchUser() {
    const response = await api.auth.me()
    user.value = response.data.value
  }

  watch(accessToken, async (newToken) => {
    if (newToken) {
      fetchUser()
    }
    else {
      user.value = null
    }
  })

  return {
    accessToken,
    fetchUser,
    user,
  }
}, { persist: true })
