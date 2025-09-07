import { useApi } from '@/utils/apiRepository'

export function authApiRepository() {
  async function login(credentials: { email: string, password: string }): Promise<IAuthResponse<ITokenResponse>> {
    const { data } = await useApi<IAuthResponse<ITokenResponse>>(`/auth/login`, {
      method: 'POST',
      body: JSON.stringify(credentials),
    })

    // With our new backend response format, we always get a 200 status
    // The actual success/error is indicated by the response.success field
    return data
  }

  async function register(credentials: { email: string, password: string, name: string }): Promise<IAuthResponse> {
    const { data } = await useApi<IAuthResponse>(`/auth/register`, {
      method: 'POST',
      body: JSON.stringify(credentials),
    })

    return data
  }

  async function logout() {
    const { data } = await useApi(`/auth/logout`, {
      method: 'POST',
    })

    return data
  }

  async function me() {
    const { data } = await useApi<IUser>(`/auth/me`)

    return data
  }

  async function requestPasswordReset(email: string): Promise<IAuthResponse> {
    const { data } = await useApi<IAuthResponse>(`/auth/request-password-reset`, {
      method: 'POST',
      body: JSON.stringify({ email }),
    })

    return data
  }

  async function confirmPasswordReset(token: string, password: string): Promise<IAuthResponse> {
    const { data } = await useApi<IAuthResponse>(`/auth/confirm-password-reset`, {
      method: 'POST',
      body: JSON.stringify({ token, password }),
    })

    return data
  }

  async function verifyEmail(token: string): Promise<IAuthResponse<ITokenResponse & { message: string }>> {
    const { data } = await useApi<IAuthResponse<ITokenResponse & { message: string }>>(`/auth/verify-email`, {
      method: 'POST',
      body: JSON.stringify({ token }),
    })

    return data
  }

  async function resendEmailVerification(email: string): Promise<IAuthResponse> {
    const { data } = await useApi<IAuthResponse>(`/auth/resend-verification`, {
      method: 'POST',
      body: JSON.stringify({ email }),
    })

    return data
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
