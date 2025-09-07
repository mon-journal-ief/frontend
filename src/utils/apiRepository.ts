import { handleTokenRefresh } from './token'
import { useUserStore } from '@/stores/user'

interface ApiOptions extends RequestInit {
  baseUrl?: string
  responseType?: 'json' | 'text' | 'blob' | 'arrayBuffer' | 'none'
}

interface ApiResponse<T> {
  data: T
  response: Response
  error?: string
}

export async function useApi<T>(url: string, options: ApiOptions = {}): Promise<ApiResponse<T>> {
  const baseUrl = options.baseUrl || import.meta.env.VITE_API_URL
  const fullUrl = `${baseUrl}${url}`

  // Get user store and access token
  const userStore = useUserStore()
  const { accessToken } = storeToRefs(userStore)

  // Detect if we're sending FormData (e.g., file uploads)
  const isFormData = typeof FormData !== 'undefined' && options.body instanceof FormData

  // Prepare headers
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  }

  // Only set JSON content type when NOT sending FormData
  if (!isFormData && !('Content-Type' in headers)) {
    headers['Content-Type'] = 'application/json'
  }

  // Add auth token if available
  if (accessToken.value) {
    headers['x-auth-token'] = accessToken.value
  }

  // Prepare fetch options
  const fetchOptions: RequestInit = {
    ...options,
    headers,
  }

  try {
    // Make the initial request
    let response = await fetch(fullUrl, fetchOptions)

    // Handle 401 errors with token refresh
    if (response.status === 401 && !url.includes('/auth/refresh')) {
      try {
        // Attempt to refresh the token
        await handleTokenRefresh()

        // Update headers with new token
        const updatedHeaders = {
          ...headers,
          'x-auth-token': accessToken.value,
        }

        // Retry the request with new token
        response = await fetch(fullUrl, {
          ...fetchOptions,
          headers: updatedHeaders,
        })
      }
      catch (refreshError) {
        console.error('❌ Token refresh failed:', refreshError)
        throw new Error('Authentication failed')
      }
    }

    // Handle other error responses
    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ API Error:', {
        status: response.status,
        statusText: response.statusText,
        url: fullUrl,
        error: errorText,
      })

      return {
        data: null as T,
        response,
        error: errorText || `${response.status} ${response.statusText}`,
      }
    }

    // Parse response data
    let data: T
    const contentType = response.headers.get('content-type')

    if (options.responseType === 'blob') {
      data = await response.blob() as unknown as T
    }
    else if (options.responseType === 'arrayBuffer') {
      data = await response.arrayBuffer() as unknown as T
    }
    else if (options.responseType === 'text') {
      data = await response.text() as unknown as T
    }
    else if (options.responseType === 'none') {
      data = null as T
    }
    else if (contentType && contentType.includes('application/json')) {
      data = await response.json()
    }
    else {
      data = await response.text() as unknown as T
    }

    if (!data) {
      console.warn('ℹ️ No data found in response')
    }

    return { data, response, error: undefined }
  }
  catch (error) {
    console.error('❌ Network Error:', error)
    throw error
  }
}
