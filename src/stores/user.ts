import { defineStore } from 'pinia'
import { identifyUmamiSession } from '@jaseeey/vue-umami-plugin'

export const useUserStore = defineStore('user', () => {
  const accessToken = ref('')
  const user = ref<IUser | null>(null)
  const children = ref<IChild[]>([])
  const selectedChild = ref<IChild | null>(null)

  async function fetchUser() {
    user.value = await api.auth.me()
  }

  async function fetchChildren() {
    children.value = await api.children.getAll()
  }

  async function fetchSelectedChild() {
    if (!selectedChild.value?.id) return

    selectedChild.value = await api.children.get(selectedChild.value?.id)
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
      fetchChildren()

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
    fetchChildren,
    children,
    fetchSelectedChild,
    selectedChild,
    logout,
  }
}, { persist: true })
