import { useApi } from '@/utils/apiRepository'

export function programElementApiRepository() {
  async function get(id: string) {
    const { response, error, data } = await useApi<IProgramElement>(`/program/element/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      return data
    }

    console.error('Registration error:', error)
    toast.error('Program Element fetch failed', error || 'There was an error fetching the program element')
  }

  async function create(programElement: Partial<IProgramElement>) {
    const { response, error, data } = await useApi<IProgramElement>(`/program/element`, {
      method: 'POST',
      body: JSON.stringify(programElement),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      return data
    }

    console.error('Program Element creation error:', error)
    toast.error('Program Element creation failed', error || 'There was an error creating the program element')
  }

  async function update(id: string, programElement: IProgramElement) {
    const { response, error, data } = await useApi<IProgramElement>(`/program/element/${id}`, {
      method: 'PUT',
      body: JSON.stringify(programElement),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      return data
    }

    console.error('Program Element update error:', error)
    toast.error('Program Element update failed', error || 'There was an error updating the program element')
  }

  async function validate(id: string, isValidated: boolean) {
    const { response, error, data } = await useApi<IProgramElement>(`/program/element/${id}/validate`, {
      method: 'PUT',
      body: JSON.stringify({ isValidated }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      return data
    }

    console.error('Program Element validation error:', error)
    toast.error('Validation failed', error || 'There was an error validating the program element')
  }

  async function remove(id: string) {
    const { response, error, data } = await useApi<IProgramElement>(`/program/element/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      return data
    }

    console.error('Program Element deletion error:', error)
    toast.error('Program Element deletion failed', error || 'There was an error deleting the program element')
  }

  return {
    get,
    create,
    update,
    validate,
    remove,
  }
}
