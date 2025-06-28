import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'

let isRefreshing = false
let refreshPromise: Promise<any> | null = null

export async function handleTokenRefresh(): Promise<void> {
  try {
    // Prevent multiple concurrent refresh attempts
    if (isRefreshing) {
      await refreshPromise

      return
    }

    isRefreshing = true

    // Get refresh token from cookie
    const cookies = document.cookie.split(';')
    const refreshTokenCookie = cookies.find(cookie => cookie.trim().startsWith('iefRefreshToken='))
    const refreshToken = refreshTokenCookie?.split('=')[1] ?? null

    if (!refreshToken) {
      throw new Error('No refresh token available')
    }

    refreshPromise = fetch(`${import.meta.env.VITE_API_URL}/auth/refresh`, {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const response = await refreshPromise

    if (!response.ok) {
      throw new Error('Failed to refresh token')
    }

    const responseData = await response.json()

    // Store access and refresh tokens
    if (responseData?.accessToken) {
      const userStore = useUserStore()
      const { accessToken } = storeToRefs(userStore)

      accessToken.value = responseData.accessToken
      document.cookie = `iefRefreshToken=${responseData.refreshToken}; path=/; max-age=${60 * 60 * 24 * 30}; secure; samesite=strict`

      return
    }

    throw new Error('No access token in response')
  }
  catch (error) {
    console.error('Failed to refresh token:', error)

    const router = useRouter()
    router.push('/login')

    throw error
  }
  finally {
    isRefreshing = false
    refreshPromise = null
  }
}
