import { useApiFetch } from '@/utils/apiRepository'

export function authApiRepository() {
  async function login(credentials: { email: string, password: string }) {
    const response = await useApiFetch<IUser>(`/auth/login`, {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.response.value?.ok) {
      toast.success('Login successful', 'You have been logged in successfully')

      return response.json()
    }

    console.error('Login error:', response.error.value)
    toast.error('Login failed', response.error.value)
  }

  async function register(credentials: { email: string, password: string }) {
    const response = await useApiFetch<IUser>(`/auth/register`, {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.response.value?.ok) {
      toast.success('Registration successful', 'You have been registered successfully')

      return response.json()
    }

    console.error('Registration error:', response.error.value)
    toast.error('Registration failed', response.error.value)
  }

  async function logout() {
    const response = await useApiFetch<void>(`/auth/logout`, {
      method: 'POST',
    })

    return response.json()
  }

  async function me() {
    return await useApiFetch<IUser>(`/auth/me`).json()
  }

  return {
    login,
    register,
    logout,
    me,
  }
}
