import { useApiFetch } from '@/utils/apiRepository'

export function programElementApiRepository() {
  async function getAll() {
    const response = await useApiFetch<IProgramElement[]>(`/program/element`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.response.value?.ok) {
      return JSON.parse(response.json().data.value)
    }

    console.error('Program Elements fetch error:', response.error.value)
    toast.error('Program Elements fetch failed', response.error.value)
  }

  async function get(id: string) {
    const response = await useApiFetch<IProgramElement>(`/program/element/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.response.value?.ok) {
      return JSON.parse(response.json().data.value)
    }

    console.error('Registration error:', response.error.value)
    toast.error('Program Element fetch failed', response.error.value)
  }

  async function create(programElement: IProgramElement) {
    const response = await useApiFetch<IProgramElement>(`/program/element`, {
      method: 'POST',
      body: JSON.stringify(programElement),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.response.value?.ok) {
      toast.success('Program Element created successfully', 'You have been created successfully')

      return JSON.parse(response.json().data.value)
    }

    console.error('Program Element creation error:', response.error.value)
    toast.error('Program Element creation failed', response.error.value)
  }

  async function update(id: string, programElement: IProgramElement) {
    const response = await useApiFetch<IProgramElement>(`/program/element/${id}`, {
      method: 'PUT',
      body: JSON.stringify(programElement),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.response.value?.ok) {
      toast.success('Program Element updated successfully', 'You have been updated successfully')

      return JSON.parse(response.json().data.value)
    }

    console.error('Program Element update error:', response.error.value)
    toast.error('Program Element update failed', response.error.value)
  }

  async function remove(id: string) {
    const response = await useApiFetch<IProgramElement>(`/program/element/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.response.value?.ok) {
      toast.success('Program Element deleted successfully', 'You have been deleted successfully')

      return JSON.parse(response.json().data.value)
    }

    console.error('Program Element deletion error:', response.error.value)
    toast.error('Program Element deletion failed', response.error.value)
  }

  return {
    getAll,
    get,
    create,
    update,
    remove,
  }
}
