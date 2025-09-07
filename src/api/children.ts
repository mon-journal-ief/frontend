import { useApi } from '@/utils/apiRepository'

export function childrenApiRepository() {
  async function get(id: string) {
    const { response, data, error } = await useApi<IChild>(`/children/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) return data

    toast.error('Enfant', 'Erreur lors de la récupération de l\'enfant')
    throw new Error(error || 'Erreur lors de la récupération de l\'enfant')
  }

  async function getAll() {
    const { response, data, error } = await useApi<IChild[]>(`/children`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) return data

    toast.error('Enfant', 'Erreur lors de la récupération des enfants')
    throw new Error(error || 'Erreur lors de la récupération des enfants')
  }

  async function create(child: IChildCreation) {
    const { response, data, error } = await useApi<IChild>(`/children`, {
      method: 'POST',
      body: JSON.stringify(child),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) return data

    toast.error('Enfant', 'Erreur lors de l\'enregistrement de l\'enfant')
    throw new Error(error || 'Erreur lors de l\'enregistrement de l\'enfant')
  }

  async function update(id: string, program: IChild) {
    const { response, data, error } = await useApi<IChild>(`/children/${id}`, {
      method: 'PUT',
      body: JSON.stringify(program),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      toast.success('Enfant', 'Modification enregistrée')

      return data
    }

    toast.error('Enfant', 'Erreur lors de la modification')
    throw new Error(error || 'Erreur lors de la modification')
  }

  async function remove(id: string) {
    const { response, data, error } = await useApi<IChild>(`/children/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      toast.success('Profil d\'enfant supprimé', 'Suppression effectuée avec succès')

      return data
    }

    toast.error('Profil d\'enfant', 'Erreur lors de la suppression du profil')
    throw new Error(error || 'Erreur lors de la suppression du profil')
  }

  return {
    get,
    getAll,
    create,
    update,
    remove,
  }
}
