import { defineStore } from 'pinia'
import { identifyUmamiSession } from '@jaseeey/vue-umami-plugin'

export const useUserStore = defineStore('user', () => {
  const accessToken = ref('')
  const user = ref<IUser | null>(null)

  async function fetchUser() {
    const response = await api.auth.me()
    user.value = response.data.value
  }

  async function logout() {
    await api.auth.logout()
    deleteCookieRefreshToken()
    accessToken.value = ''
    user.value = null
  }

  watch(accessToken, async (newToken) => {
    if (newToken) {
      fetchUser()

      identifyUmamiSession({
        userId: user.value?.id,
        email: user.value?.email,
        name: user.value?.name,
      })
    }
    else {
      user.value = null
    }
  })

  return {
    accessToken,
    fetchUser,
    user,
    logout,
  }
}, { persist: true })
