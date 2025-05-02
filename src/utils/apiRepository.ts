import { useFetch } from '@vueuse/core'

interface User {
  id: string
  email: string
  name: string
}

export const apiRepository = {
  user: {
    get: async (userId?: string) => {
      return useFetch<User>(`/api/user/${userId}`, {
        method: 'GET',
      })
    },

    getAll: async () => {
      return useFetch<User>('/api/user', {
        method: 'GET',
      })
    },

    update: async (userData: Partial<User>) => {
      return useFetch<User>('/api/user', {
        method: 'PUT',
        body: JSON.stringify(userData),
      })
    },

    login: async (credentials: { email: string, password: string }) => {
      return useFetch<User>('/api/auth/login', {
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

  child: {
    create: async (childData: Partial<User>) => {
      return useFetch<User>('/api/child', {
        method: 'POST',
        body: JSON.stringify(childData),
      })
    },

    get: async (childId: string) => {
      return useFetch<User>(`/api/child/${childId}`, {
        method: 'GET',
      })
    },

    getAll: async (userId: string) => {
      return useFetch<User>(`/api/child?userId=${userId}`, {
        method: 'GET',
      })
    },

    update: async (childData: Partial<User>) => {
      return useFetch<User>('/api/child', {
        method: 'PUT',
        body: JSON.stringify(childData),
      })
    },

    delete: async (childId: string) => {
      return useFetch<void>(`/api/child/${childId}`, {
        method: 'DELETE',
      })
    },
  },

  program: {
    create: async (programData: Partial<User>) => {
      return useFetch<User>('/api/program', {
        method: 'POST',
        body: JSON.stringify(programData),
      })
    },

    get: async (level: string) => {
      return useFetch<User>(`/api/program:${level}`, {
        method: 'GET',
      })
    },

    getAll: async () => {
      return useFetch<User>('/api/program', {
        method: 'GET',
      })
    },

    update: async (programData: Partial<User>) => {
      return useFetch<User>('/api/program', {
        method: 'PUT',
        body: JSON.stringify(programData),
      })
    },

    delete: async (programId: string) => {
      return useFetch<void>('/api/program', {
        method: 'DELETE',
        body: JSON.stringify(programId),
      })
    },
  },

  programElement: {
    create: async (programElementData: Partial<User>) => {
      return useFetch<User>('/api/programElement', {
        method: 'POST',
        body: JSON.stringify(programElementData),
      })
    },

    get: async (programElementId: string) => {
      return useFetch<User>(`/api/programElement/${programElementId}`, {
        method: 'GET',
      })
    },

    getAll: async (programId: string) => {
      return useFetch<User>(`/api/programElement?programId=${programId}`, {
        method: 'GET',
      })
    },

    update: async (programElementData: Partial<User>) => {
      return useFetch<User>('/api/programElement', {
        method: 'PUT',
        body: JSON.stringify(programElementData),
      })
    },

    delete: async (programElementId: string) => {
      return useFetch<void>(`/api/programElement/${programElementId}`, {
        method: 'DELETE',
      })
    },
  },

  journalEntry: {
    create: async (journalEntryData: Partial<User>) => {
      return useFetch<User>('/api/journalEntry', {
        method: 'POST',
        body: JSON.stringify(journalEntryData),
      })
    },

    get: async (journalEntryId: string) => {
      return useFetch<User>(`/api/journalEntry/${journalEntryId}`, {
        method: 'GET',
      })
    },

    getAll: async (childId: string) => {
      return useFetch<User>(`/api/journalEntry?childId=${childId}`, {
        method: 'GET',
      })
    },

    update: async (journalEntryData: Partial<User>) => {
      return useFetch<User>('/api/journalEntry', {
        method: 'PUT',
        body: JSON.stringify(journalEntryData),
      })
    },

    delete: async (journalEntryId: string) => {
      return useFetch<void>(`/api/journalEntry/${journalEntryId}`, {
        method: 'DELETE',
      })
    },
  },

}
