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

    toast.error('Échec de récupération des programmes', error || 'Erreur lors de la récupération des programmes')
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

    toast.error('Échec de récupération du programme', error || 'Erreur lors de la récupération du programme')
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
      toast.success('Programme créé avec succès', 'Le programme a été créé avec succès')

      return data
    }

    toast.error('Échec de création du programme', error || 'Erreur lors de la création du programme')
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
      toast.success('Programme mis à jour avec succès', 'Le programme a été mis à jour avec succès')

      return data
    }

    toast.error('Échec de mise à jour du programme', error || 'Erreur lors de la mise à jour du programme')
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
      toast.success('Programme supprimé avec succès', 'Le programme a été supprimé avec succès')

      return data
    }

    toast.error('Échec de suppression du programme', error || 'Erreur lors de la suppression du programme')
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
