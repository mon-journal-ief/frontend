import { useApi } from '@/utils/apiRepository'

export function programElementApiRepository() {
  async function get(id: string) {
    const response = await useApi<IProgramElement>(`/program/element/${id}`, {
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

  async function create(programElement: Partial<IProgramElement>) {
    const response = await useApi<IProgramElement>(`/program/element`, {
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
    const response = await useApi<IProgramElement>(`/program/element/${id}`, {
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

  async function validate(id: string, isValidated: boolean) {
    const response = await useApi<IProgramElement>(`/program/element/${id}/validate`, {
      method: 'PUT',
      body: JSON.stringify({ isValidated }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.response.value?.ok) {
      const action = isValidated ? 'validé' : 'invalidé'
      toast.success(`Élément ${action}`, `L'élément a été ${action} avec succès`)

      return JSON.parse(response.json().data.value)
    }

    console.error('Program Element validation error:', response.error.value)
    toast.error('Validation failed', response.error.value)
  }

  async function remove(id: string) {
    const response = await useApi<IProgramElement>(`/program/element/${id}`, {
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
    get,
    create,
    update,
    validate,
    remove,
  }
}
