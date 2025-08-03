import { createFetch } from '@vueuse/core'
import { handleTokenRefresh } from './token'
import { useUserStore } from '@/stores/user'

export const useApi = createFetch({
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
    getAll: () => useApi<IProgram[]>(`/programs`).json(),
    get: (id: string) => useApi<IProgram>(`/programs/${id}`).json(),
    create: (program: Partial<IProgram>) =>
      useApi<IProgram>(`/prosrams`, { method: 'POST', body: JSON.stringify(program) }).json(),
    update: (id: string, program: Partial<IProgram>) =>
      useApi<IProgram>(`/programs/${id}`, { method: 'PUT', body: JSON.stringify(program) }).json(),
    delete: (id: string) =>
      useApi<void>(`/programs/${id}`, { method: 'DELETE' }).json(),
  },

  programElements: {
    get: (id: string) =>
      useApi<IProgramElement>(`/program-elements/${id}`).json(),
    getAll: (programId: string) =>
      useApi<IProgramElement[]>(`/program-elements/program/${programId}`).json(),
    create: (element: Partial<IProgramElement>) =>
      useApi<IProgramElement>(`/program-elements`, { method: 'POST', body: JSON.stringify(element) }).json(),
    update: (id: string, element: Partial<IProgramElement>) =>
      useApi<IProgramElement>(`/program-elements/${id}`, { method: 'PUT', body: JSON.stringify(element) }).json(),
    delete: (id: string) =>
      useApi<void>(`/program-elements/${id}`, { method: 'DELETE' }).json(),
  },

  programTemplates: {
    get: (id: string) =>
      useApi<IProgramTemplate>(`/program/templates/${id}`).json(),
    getAll: () =>
      useApi<IProgramTemplate[]>(`/program/templates`).json(),
    create: (template: Partial<IProgramTemplate>) =>
      useApi<IProgramTemplate>(`/program/templates`, { method: 'POST', body: JSON.stringify(template) }).json(),
    update: (id: string, template: Partial<IProgramTemplate>) =>
      useApi<IProgramTemplate>(`/program/templates/${id}`, { method: 'PUT', body: JSON.stringify(template) }).json(),
    delete: (id: string) =>
      useApi<void>(`/program/templates/${id}`, { method: 'DELETE' }).json(),
  },

  users: {
    get: (id: string) =>
      useApi<IUser>(`/users/${id}`).json(),
    getAll: () =>
      useApi<IUser[]>(`/users`).json(),
    update: (id: string, user: Partial<IUser>) =>
      useApi<IUser>(`/users/${id}`, { method: 'PUT', body: JSON.stringify(user) }).json(),
    login: (credentials: { email: string, password: string }) =>
      useApi<IUser>(`/auth/login`, { method: 'POST', body: JSON.stringify(credentials) }).json(),
    logout: () =>
      useApi<void>(`/auth/logout`, { method: 'POST' }).json(),
  },

  children: {
    create: (child: Partial<IUser>) =>
      useApi<IUser>(`/children`, { method: 'POST', body: JSON.stringify(child) }).json(),
    get: (id: string) =>
      useApi<IUser>(`/children/${id}`).json(),
    getAll: (userId: string) =>
      useApi<IUser[]>(`/users/${userId}/children`).json(),
    update: (id: string, child: Partial<IUser>) =>
      useApi<IUser>(`/children/${id}`, { method: 'PUT', body: JSON.stringify(child) }).json(),
    delete: (id: string) =>
      useApi<void>(`/children`, { method: 'DELETE', body: id }).json(),
  },

  journalEntries: {
    create: (entry: Partial<IJournalEntry>) =>
      useApi<IJournalEntry>(`/journal-entries`, { method: 'POST', body: JSON.stringify(entry) }).json(),
    get: (id: string) =>
      useApi<IJournalEntry>(`/journal-entries/${id}`).json(),
    getAll: (childId: string) =>
      useApi<IJournalEntry[]>(`/journal-entries/child/${childId}`).json(),
    update: (id: string, entry: Partial<IJournalEntry>) =>
      useApi<IJournalEntry>(`/journal-entries/${id}`, { method: 'PUT', body: JSON.stringify(entry) }).json(),
    delete: (id: string) =>
      useApi<void>(`/journal-entries/${id}`, { method: 'DELETE' }).json(),
  },
}
