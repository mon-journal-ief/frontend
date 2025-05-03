import { useFetch } from '@vueuse/core'

const apiUrl = 'http://localhost:8000'

interface ApiResponse<T> {
  data: T | null
  error: string | null
  isFetching: boolean
}

async function apiFetch<T>(
  url: string,
  options: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
    body?: any
  } = {},
): Promise<ApiResponse<T>> {
  try {
    const { data, error: fetchError, isFetching } = await useFetch<T>(url, {
      method: options.method || 'GET',
      body: options.body ? JSON.stringify(options.body) : undefined,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })

    if (fetchError.value) {
      console.error('❌ API Error:', fetchError.value)

      return {
        data: null,
        error: fetchError.value.message,
        isFetching: isFetching.value,
      }
    }

    if (!data.value) {
      console.log('ℹ️ No data found')

      return {
        data: null,
        error: null,
        isFetching: isFetching.value,
      }
    }

    return {
      data: data.value,
      error: null,
      isFetching: isFetching.value,
    }
  }
  catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred'
    console.error('❌ Error:', e)

    return {
      data: null,
      error: errorMessage,
      isFetching: false,
    }
  }
}

export const apiRepository = {
  programs: {
    getAll: () => apiFetch<IProgram[]>(`${apiUrl}/programs`),
    get: (id: string) => apiFetch<IProgram>(`${apiUrl}/programs/${id}`),
    create: (program: Partial<IProgram>) =>
      apiFetch<IProgram>(`${apiUrl}/programs`, { method: 'POST', body: program }),
    update: (id: string, program: Partial<IProgram>) =>
      apiFetch<IProgram>(`${apiUrl}/programs/${id}`, { method: 'PUT', body: program }),
    delete: (id: string) =>
      apiFetch<void>(`${apiUrl}/programs/${id}`, { method: 'DELETE' }),
  },

  programElements: {
    get: (id: string) =>
      apiFetch<IProgramElement>(`${apiUrl}/program-elements/${id}`),
    getAll: (programId: string) =>
      apiFetch<IProgramElement[]>(`${apiUrl}/program-elements/program/${programId}`),
    create: (element: Partial<IProgramElement>) =>
      apiFetch<IProgramElement>(`${apiUrl}/program-elements`, { method: 'POST', body: element }),
    update: (id: string, element: Partial<IProgramElement>) =>
      apiFetch<IProgramElement>(`${apiUrl}/program-elements/${id}`, { method: 'PUT', body: element }),
    delete: (id: string) =>
      apiFetch<void>(`${apiUrl}/program-elements/${id}`, { method: 'DELETE' }),
  },

  users: {
    get: (id: string) =>
      apiFetch<IUser>(`${apiUrl}/users/${id}`),
    getAll: () =>
      apiFetch<IUser[]>(`${apiUrl}/users`),
    update: (id: string, user: Partial<IUser>) =>
      apiFetch<IUser>(`${apiUrl}/users/${id}`, { method: 'PUT', body: user }),
    login: (credentials: { email: string, password: string }) =>
      apiFetch<IUser>(`${apiUrl}/auth/login`, { method: 'POST', body: credentials }),
    logout: () =>
      apiFetch<void>(`${apiUrl}/auth/logout`, { method: 'POST' }),
  },

  children: {
    create: (child: Partial<IUser>) =>
      apiFetch<IUser>(`${apiUrl}/children`, { method: 'POST', body: child }),
    get: (id: string) =>
      apiFetch<IUser>(`${apiUrl}/children/${id}`),
    getAll: (userId: string) =>
      apiFetch<IUser[]>(`${apiUrl}/users/${userId}/children`),
    update: (id: string, child: Partial<IUser>) =>
      apiFetch<IUser>(`${apiUrl}/children/${id}`, { method: 'PUT', body: child }),
    delete: (id: string) =>
      apiFetch<void>(`${apiUrl}/children`, { method: 'DELETE', body: id }),
  },

  journalEntries: {
    create: (entry: Partial<IJournalEntry>) =>
      apiFetch<IJournalEntry>(`${apiUrl}/journal-entries`, { method: 'POST', body: entry }),
    get: (id: string) =>
      apiFetch<IJournalEntry>(`${apiUrl}/journal-entries/${id}`),
    getAll: (childId: string) =>
      apiFetch<IJournalEntry[]>(`${apiUrl}/journal-entries/child/${childId}`),
    update: (id: string, entry: Partial<IJournalEntry>) =>
      apiFetch<IJournalEntry>(`${apiUrl}/journal-entries/${id}`, { method: 'PUT', body: entry }),
    delete: (id: string) =>
      apiFetch<void>(`${apiUrl}/journal-entries/${id}`, { method: 'DELETE' }),
  },
}
