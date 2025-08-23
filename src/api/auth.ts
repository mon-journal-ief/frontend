import { useApi } from '@/utils/apiRepository'

export function authApiRepository() {
  async function login(credentials: { email: string, password: string }): Promise<IAuthResponse<ITokenResponse>> {
    const response = await useApi<IAuthResponse<ITokenResponse>>(`/auth/login`, {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // With our new backend response format, we always get a 200 status
    // The actual success/error is indicated by the response.success field
    return JSON.parse(response.json().data.value)
  }

  async function register(credentials: { email: string, password: string, name: string }): Promise<IAuthResponse> {
    const response = await useApi<IAuthResponse>(`/auth/register`, {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return JSON.parse(response.json().data.value)
  }

  async function logout() {
    return await useApi(`/auth/logout`, {
      method: 'POST',
    }).json()
  }

  async function me() {
    return await useApi<IUser>(`/auth/me`).json()
  }

  async function requestPasswordReset(email: string): Promise<IAuthResponse> {
    const response = await useApi<IAuthResponse>(`/auth/request-password-reset`, {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return JSON.parse(response.json().data.value)
  }

  async function confirmPasswordReset(token: string, password: string): Promise<IAuthResponse> {
    const response = await useApi<IAuthResponse>(`/auth/confirm-password-reset`, {
      method: 'POST',
      body: JSON.stringify({ token, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return JSON.parse(response.json().data.value)
  }

  async function verifyEmail(token: string): Promise<IAuthResponse<ITokenResponse & { message: string }>> {
    const response = await useApi<IAuthResponse<ITokenResponse & { message: string }>>(`/auth/verify-email`, {
      method: 'POST',
      body: JSON.stringify({ token }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return JSON.parse(response.json().data.value)
  }

  async function resendEmailVerification(email: string): Promise<IAuthResponse> {
    const response = await useApi<IAuthResponse>(`/auth/resend-verification`, {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return JSON.parse(response.json().data.value)
  }

  return {
    login,
    register,
    logout,
    me,
    requestPasswordReset,
    confirmPasswordReset,
    verifyEmail,
    resendEmailVerification,
  }
}
