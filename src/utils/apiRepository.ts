import { useFetch } from '@vueuse/core'

interface User {
  id: string
  email: string
  name: string
}

export const apiRepository = {
  user: {
    get: async () => {
      return useFetch<User>('/api/user', {
        method: 'GET',
      })
    },

    update: async (userData: Partial<User>) => {
      return useFetch<User>('/api/user', {
        method: 'PUT',
        body: JSON.stringify(userData)
      })
    },

    login: async (credentials: { email: string; password: string }) => {
      return useFetch<User>('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials)
      })
    },


    logout: async () => {
      return useFetch<void>('/api/auth/logout', {
        method: 'POST',
      })
    }
  },

  child: {
    create: async (childData: Partial<User>) => {
      return useFetch<User>('/api/child', {
        method: 'POST',
        body: JSON.stringify(childData)
      })
    },

    get: async () => {
      return useFetch<User>('/api/child', {
        method: 'GET',
      })
    },

    update: async (childData: Partial<User>) => {
      return useFetch<User>('/api/child', {
        method: 'PUT',
        body: JSON.stringify(childData)
      })
    },

    delete: async (childId: string) => {
      return useFetch<void>('/api/child', {
        method: 'DELETE',
        body: JSON.stringify(childId)
      })
    }
  },

  program: {
    create: async (programData: Partial<User>) => {
      return useFetch<User>('/api/program', {
        method: 'POST',
        body: JSON.stringify(programData)
      })
    },

    get: async (level: string) => {
      return useFetch<User>(`/api/program:${level}`, {
        method: 'GET',
      })
    },

    update: async (programData: Partial<User>) => {
      return useFetch<User>('/api/program', {
        method: 'PUT',
        body: JSON.stringify(programData)
      })
    },

    delete: async (programId: string) => {
      return useFetch<void>('/api/program', {
        method: 'DELETE',
        body: JSON.stringify(programId)
      })
    }
  }
}


