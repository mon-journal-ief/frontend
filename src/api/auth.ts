import { useApiFetch } from '@/utils/apiRepository'

export function authApiRepository() {
  const toast = useToast()

  async function login(credentials: { email: string, password: string }) {
    const response = await useApiFetch<IUser>(`/auth/login`, {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json',
      },
    }).json()

    if (response.response.value?.ok) {
      toast.add({
        summary: 'Login successful',
        detail: 'You have been logged in successfully',
        severity: 'success',
        life: _.TOAST_LIFE,
      })

      return response
    }

    console.error('Login error:', response.error)
    toast.add({
      summary: 'Login failed',
      detail: response.error,
      severity: 'error',
      life: _.TOAST_LIFE,
    })
  }

  async function register(credentials: { email: string, password: string }) {
    const response = await useApiFetch<IUser>(`/auth/register`, {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json',
      },
    }).json()

    if (response.data.value.token) {
      toast.add({
        summary: 'Registration successful',
        detail: 'You have been registered successfully',
        severity: 'success',
        life: _.TOAST_LIFE,
      })

      return response
    }

    console.error('Registration error:', response.error)
    toast.add({
      summary: 'Registration failed',
      detail: response.error,
      severity: 'error',
      life: _.TOAST_LIFE,
    })
  }

  async function logout() {
    const response = await useApiFetch<void>(`/auth/logout`, {
      method: 'POST',
    }).json()

    return response
  }

  async function me(token: string) {
    const response = await useApiFetch<IUser>(`/auth/me`, {
      headers: {
        'x-auth-token': token,
      },
    }).json()

    if (response.data.value.token) {
      toast.add({
        summary: 'Me successful',
        detail: 'You have been fetched successfully',
        severity: 'success',
        life: _.TOAST_LIFE,
      })

      return response
    }

    return response
  }

  return {
    login,
    register,
    logout,
    me,
  }
}
