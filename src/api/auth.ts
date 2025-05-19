import type { ToastServiceMethods } from 'primevue'

export function authApiRepository() {
  let toast: ToastServiceMethods | undefined
  try {
    toast = useToast()
  }
  catch (e) {
    if (e instanceof Error && e.message.includes('No PrimeVue Toast provided')) {
      console.warn('⚠️ No PrimeVue Toast provided! Proceeding without toast notification.')
      toast = undefined
    }
  }

  function login(credentials: { email: string, password: string }, toast?: ToastServiceMethods) {
    return useApiFetch<IUser>(
      `/auth/login`,
      {
        method: 'POST',
        body: JSON.stringify(credentials),
      },
      {
        success: {
          summary: 'Login successful',
          detail: 'You have been logged in successfully',
        },
        error: {
          summary: 'Login failed',
          detail: 'Invalid email or password',
        },
      },
      toast,
    ).json()
  }

  function register(credentials: { email: string, password: string }, toast?: ToastServiceMethods) {
    return useApiFetch<IUser>(
      `/auth/register`,
      {
        method: 'POST',
        body: JSON.stringify(credentials),
      },
      {
        success: {
          summary: 'Registration successful',
          detail: 'You have been registered successfully',
        },
        error: {
          summary: 'Registration failed',
          detail: 'Registration error',
        },
      },
      toast,
    ).json()
  }

  function logout(toast?: ToastServiceMethods) {
    return useApiFetch<void>(
      `/auth/logout`,
      { method: 'POST' },
      {
        success: {
          summary: 'Logout successful',
          detail: 'You have been logged out',
        },
        error: {
          summary: 'Logout failed',
          detail: 'Logout error',
        },
      },
      toast,
    ).json()
  }

  function me() {
    return useApiFetch<IUser>(
      `/auth/me`,
      {},
      {
        success: {
          summary: 'Me successful',
          detail: 'You have been fetched successfully',
        },
        error: {
          summary: 'Me failed',
          detail: 'Could not fetch user',
        },
      },
      toast,
    ).json()
  }

  return {
    login,
    register,
    logout,
    me,
  }
}
