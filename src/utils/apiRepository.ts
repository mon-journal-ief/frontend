import { useFetch } from '@vueuse/core'

export const apiRepository = {
  users: {
    get: async (userId: string) => {
      return useFetch<IUser>(`/api/users/${userId}`, {
        method: 'GET',
      })
    },

    getAll: async () => {
      return useFetch<IUser[]>('/api/users', {
        method: 'GET',
      })
    },

    update: async (userId: string, userData: Partial<IUser>) => {
      return useFetch<IUser>(`/api/users/${userId}`, {
        method: 'PUT',
        body: JSON.stringify(userData),
      })
    },

    login: async (credentials: { email: string, password: string }) => {
      return useFetch<IUser>('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      })
    },

    logout: async () => {
      return useFetch<void>('/api/auth/logout', {
        method: 'POST',
      })
    },
  },

  children: {
    create: async (childData: Partial<IUser>) => {
      return useFetch<IUser>('/api/children', {
        method: 'POST',
        body: JSON.stringify(childData),
      })
    },

    get: async (childId: string) => {
      return useFetch<IUser>(`/api/children/${childId}`, {
        method: 'GET',
      })
    },

    getAll: async (userId: string) => {
      return useFetch<IUser[]>(`/api/users/${userId}/children`, {
        method: 'GET',
      })
    },

    update: async (childId: string, childData: Partial<IUser>) => {
      return useFetch<IUser>(`/api/children/${childId}`, {
        method: 'PUT',
        body: JSON.stringify(childData),
      })
    },

    delete: async (childId: string) => {
      return useFetch<void>('/api/children', {
        method: 'DELETE',
        body: JSON.stringify(childId),
      })
    },
  },

  programs: {
    get: async () => {
      return useFetch<IProgram>('/api/programs', {
        method: 'GET',
      })
    },

    getAll: async () => {
      return useFetch<IProgram[]>('/api/programs', {
        method: 'GET',
      })
    },

    create: async (programData: Partial<IProgram>) => {
      return useFetch<IProgram>('/api/programs', {
        method: 'POST',
        body: JSON.stringify(programData),
      })
    },

    update: async (programId: string, programData: Partial<IProgram>) => {
      return useFetch<IProgram>(`/api/programs/${programId}`, {
        method: 'PUT',
        body: JSON.stringify(programData),
      })
    },

    delete: async (programId: string) => {
      return useFetch<void>(`/api/programs/${programId}`, {
        method: 'DELETE',
      })
    },
  },

  programElements: {
    get: async (programElementId: string) => {
      return useFetch<IProgramElement>(`/api/program-elements/${programElementId}`, {
        method: 'GET',
      })
    },

    getAll: async (programId: string) => {
      return useFetch<IProgramElement[]>(`/api/program-elements/program/${programId}`, {
        method: 'GET',
      })
    },

    create: async (programElementData: Partial<IProgramElement>) => {
      return useFetch<IProgramElement>('/api/program-elements', {
        method: 'POST',
        body: JSON.stringify(programElementData),
      })
    },

    update: async (programElementId: string, programElementData: Partial<IProgramElement>) => {
      return useFetch<IProgramElement>(`/api/program-elements/${programElementId}`, {
        method: 'PUT',
        body: JSON.stringify(programElementData),
      })
    },

    delete: async (programElementId: string) => {
      return useFetch<void>(`/api/program-elements/${programElementId}`, {
        method: 'DELETE',
      })
    },
  },

  journalEntries: {
    create: async (journalEntryData: Partial<IJournalEntry>) => {
      return useFetch<IJournalEntry>('/api/journal-entries', {
        method: 'POST',
        body: JSON.stringify(journalEntryData),
      })
    },

    get: async (journalEntryId: string) => {
      return useFetch<IJournalEntry>(`/api/journal-entries/${journalEntryId}`, {
        method: 'GET',
      })
    },

    getAll: async (childId: string) => {
      return useFetch<IJournalEntry[]>(`/api/journal-entries/child/${childId}`, {
        method: 'GET',
      })
    },

    update: async (journalEntryId: string, journalEntryData: Partial<IJournalEntry>) => {
      return useFetch<IJournalEntry>(`/api/journal-entries/${journalEntryId}`, {
        method: 'PUT',
        body: JSON.stringify(journalEntryData),
      })
    },

    delete: async (journalEntryId: string) => {
      return useFetch<void>(`/api/journal-entries/${journalEntryId}`, {
        method: 'DELETE',
      })
    },
  },
}
