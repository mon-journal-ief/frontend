import { createFetch } from '@vueuse/core'

interface IToastMessages {
  success?: { summary: string, detail: string }
  error?: { summary: string, detail: string }
}

const baseFetch = createFetch({
  baseUrl: import.meta.env.VITE_API_URL,
})

export function useApiFetch<T = unknown>(
  url: string,
  options?: RequestInit,
  messages?: IToastMessages,
  toast?: ReturnType<typeof useToast>,
) {
  const token = useUserStore().token

  // Add token to headers if it exists
  const baseHeaders = {
    'Content-Type': 'application/json',
    ...(token ? { 'x-auth-token': token } : {}),
  }

  const finalOptions = { ...options, headers: { ...baseHeaders, ...options?.headers } }

  return baseFetch<T>(url, finalOptions ?? {}, {
    onFetchError(ctx) {
      console.error('❌ API Error:', ctx.error)
      if (messages?.error) {
        if (toast && messages.error) {
          toast.add({
            summary: messages.error.summary,
            detail: messages.error.detail,
            severity: 'error',
            life: _.TOAST_LIFE,
          })
        }
      }

      return ctx
    },

    afterFetch(ctx) {
      if (!ctx.data) console.warn('ℹ️ No data found')
      if (messages?.success) {
        if (toast && messages.success) {
          toast.add({
            summary: messages.success.summary,
            detail: messages.success.detail,
            severity: 'success',
            life: _.TOAST_LIFE,
          })
        }
      }

      return ctx
    },
  })
}
