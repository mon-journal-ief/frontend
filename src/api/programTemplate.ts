import { useApi } from '@/utils/apiRepository'

export function programTemplateApiRepository() {
  async function getAll() {
    const { response, data, error } = await useApi<IProgramTemplate[]>(`/program/template`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) return data

    toast.error('Échec de récupération des modèles de programme', error || 'Erreur lors de la récupération des templates de programmes')
    throw new Error(error || 'Erreur lors de la récupération des templates de programmes')
  }

  async function get(id: string) {
    const { response, data, error } = await useApi<IProgramTemplate>(`/program/template/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) return data

    toast.error('Échec de récupération du modèle de programme', error || 'Erreur lors de la récupération du template de programme')
    throw new Error(error || 'Erreur lors de la récupération du template de programme')
  }

  async function create(programTemplate: IProgramTemplate) {
    const { response, data, error } = await useApi<IProgramTemplate>(`/program/template`, {
      method: 'POST',
      body: JSON.stringify(programTemplate),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      toast.success('Modèle de programme créé avec succès', 'Le modèle a été créé avec succès')

      return data
    }

    toast.error('Échec de création du modèle de programme', error || 'Erreur lors de la crération du template de programme')
    throw new Error(error || 'Erreur lors de la crération du template de programme')
  }

  async function update(id: string, programElement: IProgramTemplate) {
    const { response, data, error } = await useApi<IProgramTemplate>(`/program/template/${id}`, {
      method: 'PUT',
      body: JSON.stringify(programElement),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      toast.success('Modèle de programme mis à jour avec succès', 'Le modèle a été mis à jour avec succès')

      return data
    }

    toast.error('Échec de mise à jour du modèle de programme', error || 'Erreur lors de la mise à jour du template de programme')
    throw new Error(error || 'Erreur lors de la mise à jour du template de programme')
  }

  async function remove(id: string) {
    const { response, data, error } = await useApi<IProgramTemplate>(`/program/template/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      toast.success('Modèle de programme supprimé avec succès', 'Le modèle a été supprimé avec succès')

      return data
    }

    toast.error('Échec de suppression du modèle de programme', error || 'Erreur lors de la suppression du template de programme')
    throw new Error(error || 'Erreur lors de la suppression du template de programme')
  }

  async function copy(templateId: string, childId: string) {
    const { response, data, error } = await useApi<IProgramTemplate>(`/program/template/copy`, {
      method: 'POST',
      body: JSON.stringify({ templateId, childId }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      toast.success('Programme importé avec succès', 'Vous pouvez désormais personnaliser le programme')

      return data
    }

    toast.error('Échec de copie du modèle de programme', error || 'Erreur lors de l\'import du template de programme')
    throw new Error(error || 'Erreur lors de l\'import du template de programme')
  }

  return {
    getAll,
    get,
    create,
    update,
    remove,
    copy,
  }
}
