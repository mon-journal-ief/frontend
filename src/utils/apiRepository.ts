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
      if (messages?.error && toast) {
        toast.add({
          summary: messages.error.summary,
          detail: messages.error.detail,
          severity: 'error',
          life: _.TOAST_LIFE,
        })
      }

      return ctx
    },

    afterFetch(ctx) {
      if (!ctx.data) console.warn('ℹ️ No data found')
      if (messages?.success && toast) {
        toast.add({
          summary: messages.success.summary,
          detail: messages.success.detail,
          severity: 'success',
          life: _.TOAST_LIFE,
        })
      }

      return ctx
    },
  })
}

export const apiRepository = {
  programs: {
    getAll: () => useApiFetch<IProgram[]>(`/programs`).json(),
    get: (id: string) => useApiFetch<IProgram>(`/programs/${id}`).json(),
    create: (program: Partial<IProgram>) =>
      useApiFetch<IProgram>(`/prosrams`, { method: 'POST', body: JSON.stringify(program) }).json(),
    update: (id: string, program: Partial<IProgram>) =>
      useApiFetch<IProgram>(`/programs/${id}`, { method: 'PUT', body: JSON.stringify(program) }).json(),
    delete: (id: string) =>
      useApiFetch<void>(`/programs/${id}`, { method: 'DELETE' }).json(),
  },

  programElements: {
    get: (id: string) =>
      useApiFetch<IProgramElement>(`/program-elements/${id}`).json(),
    getAll: (programId: string) =>
      useApiFetch<IProgramElement[]>(`/program-elements/program/${programId}`).json(),
    create: (element: Partial<IProgramElement>) =>
      useApiFetch<IProgramElement>(`/program-elements`, { method: 'POST', body: JSON.stringify(element) }).json(),
    update: (id: string, element: Partial<IProgramElement>) =>
      useApiFetch<IProgramElement>(`/program-elements/${id}`, { method: 'PUT', body: JSON.stringify(element) }).json(),
    delete: (id: string) =>
      useApiFetch<void>(`/program-elements/${id}`, { method: 'DELETE' }).json(),
  },

  users: {
    get: (id: string) =>
      useApiFetch<IUser>(`/users/${id}`).json(),
    getAll: () =>
      useApiFetch<IUser[]>(`/users`).json(),
    update: (id: string, user: Partial<IUser>) =>
      useApiFetch<IUser>(`/users/${id}`, { method: 'PUT', body: JSON.stringify(user) }).json(),
    login: (credentials: { email: string, password: string }) =>
      useApiFetch<IUser>(`/auth/login`, { method: 'POST', body: JSON.stringify(credentials) }).json(),
    logout: () =>
      useApiFetch<void>(`/auth/logout`, { method: 'POST' }).json(),
  },

  children: {
    create: (child: Partial<IUser>) =>
      useApiFetch<IUser>(`/children`, { method: 'POST', body: JSON.stringify(child) }).json(),
    get: (id: string) =>
      useApiFetch<IUser>(`/children/${id}`).json(),
    getAll: (userId: string) =>
      useApiFetch<IUser[]>(`/users/${userId}/children`).json(),
    update: (id: string, child: Partial<IUser>) =>
      useApiFetch<IUser>(`/children/${id}`, { method: 'PUT', body: JSON.stringify(child) }).json(),
    delete: (id: string) =>
      useApiFetch<void>(`/children`, { method: 'DELETE', body: id }).json(),
  },

  journalEntries: {
    create: (entry: Partial<IJournalEntry>) =>
      useApiFetch<IJournalEntry>(`/journal-entries`, { method: 'POST', body: JSON.stringify(entry) }).json(),
    get: (id: string) =>
      useApiFetch<IJournalEntry>(`/journal-entries/${id}`).json(),
    getAll: (childId: string) =>
      useApiFetch<IJournalEntry[]>(`/journal-entries/child/${childId}`).json(),
    update: (id: string, entry: Partial<IJournalEntry>) =>
      useApiFetch<IJournalEntry>(`/journal-entries/${id}`, { method: 'PUT', body: JSON.stringify(entry) }).json(),
    delete: (id: string) =>
      useApiFetch<void>(`/journal-entries/${id}`, { method: 'DELETE' }).json(),
  },
}
