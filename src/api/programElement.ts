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
    toast.error('Échec de récupération de l\'élément de programme', error || 'Une erreur est survenue lors de la récupération de l\'élément de programme')
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
    toast.error('Échec de création de l\'élément de programme', error || 'Une erreur est survenue lors de la création de l\'élément de programme')
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
    toast.error('Échec de mise à jour de l\'élément de programme', error || 'Une erreur est survenue lors de la mise à jour de l\'élément de programme')
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
    toast.error('Échec de validation', error || 'Une erreur est survenue lors de la validation de l\'élément de programme')
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
    toast.error('Échec de suppression de l\'élément de programme', error || 'Une erreur est survenue lors de la suppression de l\'élément de programme')
  }

  return {
    get,
    create,
    update,
    validate,
    remove,
  }
}
