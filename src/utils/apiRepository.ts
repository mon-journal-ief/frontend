import { createFetch } from '@vueuse/core'

interface ToastMessages {
  success?: { summary: string, detail: string }
  error?: { summary: string, detail: string }
}

const baseFetch = createFetch({
  baseUrl: import.meta.env.VITE_API_URL,
})

export function useApiFetch<T = unknown>(
  url: string,
  options?: RequestInit,
  messages?: ToastMessages,
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
        else if (messages.error) {
          console.error(`❌ ${messages.error.summary}`, ctx.error)
        }
        else {
          console.error('❌ API Error:', ctx.error)
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
        else if (messages.success) {
          console.log(`✅ ${messages.success.summary}`, ctx.data)
        }
        else {
          console.log('✅ API Success:', ctx.data)
        }
      }

      return ctx
    },
  })
}
