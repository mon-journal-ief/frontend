import { useApiFetch } from '@/utils/apiRepository'

export function childrenApiRepository() {
  const toast = useToast()

  async function get(id: string) {
    const response = await useApiFetch<IChild>(`/children/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.response.value?.ok) {
      return JSON.parse(response.json().data.value)
    }

    console.error('Registration error:', response.error)
    toast.add({
      summary: 'Enfant',
      detail: 'Erreur lors de la récupération de l\'enfant',
      severity: 'error',
      life: _.TOAST_LIFE,
    })
  }

  async function getAll() {
    const response = await useApiFetch<IChild[]>(`/children`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.response.value?.ok) {
      return JSON.parse(response.json().data.value)
    }

    console.error('Children retrieval error:', response.error)
  }

  async function create(child: IChildCreation) {
    const response = await useApiFetch<IChild>(`/children`, {
      method: 'POST',
      body: JSON.stringify(child),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.response.value?.ok) {
      toast.add({
        summary: 'Enfant',
        detail: 'Enfant enregistré avec succès',
        severity: 'success',
        life: _.TOAST_LIFE,
      })

      return JSON.parse(response.json().data.value)
    }

    console.error('Child creation error:', response.error)
    toast.add({
      summary: 'Enfant',
      detail: 'Erreur lors de l\'enregistrement de l\'enfant',
      severity: 'error',
      life: _.TOAST_LIFE,
    })
  }

  async function update(id: string, program: IChild) {
    const response = await useApiFetch<IChild>(`/children/${id}`, {
      method: 'PUT',
      body: JSON.stringify(program),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.response.value?.ok) {
      toast.add({
        summary: 'Enfant',
        detail: 'Modification enregistrée',
        severity: 'success',
        life: _.TOAST_LIFE,
      })

      return JSON.parse(response.json().data.value)
    }

    console.error('Enfant update error:', response.error)
    toast.add({
      summary: 'Enfant',
      detail: 'Erreur lors de la modification',
      severity: 'error',
      life: _.TOAST_LIFE,
    })
  }

  async function remove(id: string) {
    const response = await useApiFetch<IChild>(`/children/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.response.value?.ok) {
      toast.add({
        summary: 'Enfant',
        detail: 'Suppression enregistrée',
        severity: 'success',
        life: _.TOAST_LIFE,
      })

      return JSON.parse(response.json().data.value)
    }

    console.error('Enfant deletion error:', response.error)
    toast.add({
      summary: 'Enfant',
      detail: 'Erreur lors de la suppression',
      severity: 'error',
      life: _.TOAST_LIFE,
    })
  }

  return {
    get,
    getAll,
    create,
    update,
    remove,
  }
}
