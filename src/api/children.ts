import { useApi } from '@/utils/apiRepository'

export function childrenApiRepository() {
  async function get(id: string) {
    const response = await useApi<IChild>(`/children/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.response.value?.ok) {
      return JSON.parse(response.json().data.value)
    }

    console.error('Registration error:', response.error.value)
    toast.error('Enfant', 'Erreur lors de la récupération de l\'enfant')
  }

  async function getAll() {
    const response = await useApi<IChild[]>(`/children`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.response.value?.ok) {
      return JSON.parse(response.json().data.value)
    }

    console.error('Children retrieval error:', response.error.value)
  }

  async function create(child: IChildCreation) {
    const response = await useApi<IChild>(`/children`, {
      method: 'POST',
      body: JSON.stringify(child),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.response.value?.ok) {
      toast.success('Enfant', 'Enfant enregistré avec succès')

      return JSON.parse(response.json().data.value)
    }

    console.error('Child creation error:', response.error.value)
    toast.error('Enfant', 'Erreur lors de l\'enregistrement de l\'enfant')
  }

  async function update(id: string, program: IChild) {
    const response = await useApi<IChild>(`/children/${id}`, {
      method: 'PUT',
      body: JSON.stringify(program),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.response.value?.ok) {
      toast.success('Enfant', 'Modification enregistrée')

      return JSON.parse(response.json().data.value)
    }

    console.error('Enfant update error:', response.error.value)
    toast.error('Enfant', 'Erreur lors de la modification')
  }

  async function remove(id: string) {
    const response = await useApi<IChild>(`/children/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.response.value?.ok) {
      toast.success('Enfant', 'Suppression enregistrée')

      return JSON.parse(response.json().data.value)
    }

    console.error('Enfant deletion error:', response.error.value)
    toast.error('Enfant', 'Erreur lors de la suppression')
  }

  return {
    get,
    getAll,
    create,
    update,
    remove,
  }
}
