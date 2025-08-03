import { useApi } from '@/utils/apiRepository'

export function programApiRepository() {
  async function getAll() {
    const response = await useApi<IProgram[]>(`/program`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.response.value?.ok) {
      return JSON.parse(response.json().data.value)
    }

    console.error('Programs fetch error:', response.error.value)
    toast.error('Programs fetch failed', response.error.value)
  }

  async function get(id: string) {
    const response = await useApi<IProgram>(`/program/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.response.value?.ok) {
      return JSON.parse(response.json().data.value)
    }

    console.error('Registration error:', response.error.value)
    toast.error('Program fetch failed', response.error.value)
  }

  async function create(program: IProgram) {
    const response = await useApi<IProgram>(`/program`, {
      method: 'POST',
      body: JSON.stringify(program),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.response.value?.ok) {
      toast.success('Program created successfully', 'You have been created successfully')

      return JSON.parse(response.json().data.value)
    }

    console.error('Program creation error:', response.error.value)
    toast.error('Program creation failed', response.error.value)
  }

  async function update(id: string, program: IProgram) {
    const response = await useApi<IProgram>(`/program/${id}`, {
      method: 'PUT',
      body: JSON.stringify(program),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.response.value?.ok) {
      toast.success('Program updated successfully', 'You have been updated successfully')

      return JSON.parse(response.json().data.value)
    }

    console.error('Program update error:', response.error.value)
    toast.error('Program update failed', response.error.value)
  }

  async function remove(id: string) {
    const response = await useApi<IProgram>(`/program/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.response.value?.ok) {
      toast.success('Program deleted successfully', 'You have been deleted successfully')

      return JSON.parse(response.json().data.value)
    }

    console.error('Program deletion error:', response.error.value)
    toast.error('Program deletion failed', response.error.value)
  }

  return {
    getAll,
    get,
    create,
    update,
    remove,
  }
}
