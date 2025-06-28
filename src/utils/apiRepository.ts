import { createFetch } from '@vueuse/core'
import { handleTokenRefresh } from './tokenRefresh'
import { useUserStore } from '@/stores/user'

export const useApiFetch = createFetch({
  baseUrl: import.meta.env.VITE_API_URL,
  options: {
    beforeFetch(ctx) {
      const userStore = useUserStore()
      const { accessToken } = storeToRefs(userStore)

      if (accessToken.value) {
        ctx.options.headers = {
          ...ctx.options.headers,
          'x-auth-token': accessToken.value,
        }
      }
    },

    async onFetchError(ctx) {
      console.error('❌ API Error:', ctx.error)

      // Handle token refresh
      if (ctx.response?.status === 401 && !ctx.context.url?.includes('/auth/refresh')) {
        // Get and store access and refresh tokens
        await handleTokenRefresh()

        // Retry the original request with new token
        const userStore = useUserStore()
        const { accessToken } = storeToRefs(userStore)

        ctx.context.options.headers = {
          ...ctx.context.options.headers,
          'x-auth-token': accessToken.value,
        }

        // Return a new fetch with updated token
        const retryResponse = await fetch(ctx.context.url, ctx.context.options)
        if (retryResponse.ok) {
          ctx.data = await retryResponse.json()
          ctx.response = retryResponse

          return ctx
        }
      }

      return ctx
    },

    afterFetch(ctx) {
      if (!ctx.data) console.warn('ℹ️ No data found')

      return ctx
    },
  },
})

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

  programTemplates: {
    get: (id: string) =>
      useApiFetch<IProgramTemplate>(`/program/templates/${id}`).json(),
    getAll: () =>
      useApiFetch<IProgramTemplate[]>(`/program/templates`).json(),
    create: (template: Partial<IProgramTemplate>) =>
      useApiFetch<IProgramTemplate>(`/program/templates`, { method: 'POST', body: JSON.stringify(template) }).json(),
    update: (id: string, template: Partial<IProgramTemplate>) =>
      useApiFetch<IProgramTemplate>(`/program/templates/${id}`, { method: 'PUT', body: JSON.stringify(template) }).json(),
    delete: (id: string) =>
      useApiFetch<void>(`/program/templates/${id}`, { method: 'DELETE' }).json(),
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
