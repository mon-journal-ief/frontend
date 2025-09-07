import { useApi } from '@/utils/apiRepository'

export function programApiRepository() {
  async function getAll() {
    const { response, data, error } = await useApi<IProgram[]>(`/program`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) return data

    toast.error('Programs fetch failed', error || 'Erreur lors de la récupération des programmes')
    throw new Error(error || 'Erreur lors de la récupération des programmes')
  }

  async function get(id: string) {
    const { response, data, error } = await useApi<IProgram>(`/program/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) return data

    toast.error('Program fetch failed', error || 'Erreur lors de la récupération du programme')
    throw new Error(error || 'Erreur lors de la récupération du programme')
  }

  async function create(program: IProgramCreation) {
    const { response, data, error } = await useApi<IProgram>(`/program`, {
      method: 'POST',
      body: JSON.stringify(program),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      toast.success('Program created successfully', 'You have been created successfully')

      return data
    }

    toast.error('Program creation failed', error || 'Erreur lors de la création du programme')
    throw new Error(error || 'Erreur lors de la création du programme')
  }

  async function update(id: string, program: IProgram) {
    const { response, data, error } = await useApi<IProgram>(`/program/${id}`, {
      method: 'PUT',
      body: JSON.stringify(program),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      toast.success('Program updated successfully', 'You have been updated successfully')

      return data
    }

    toast.error('Program update failed', error || 'Erreur lors de la mise à jour du programme')
    throw new Error(error || 'Erreur lors de la mise à jour du programme')
  }

  async function remove(id: string) {
    const { response, data, error } = await useApi<IProgram>(`/program/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      toast.success('Program deleted successfully', 'You have been deleted successfully')

      return data
    }

    toast.error('Program deletion failed', error || 'Erreur lors de la suppression du programme')
    throw new Error(error || 'Erreur lors de la suppression du programme')
  }

  return {
    getAll,
    get,
    create,
    update,
    remove,
  }
}
