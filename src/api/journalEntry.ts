import { useApi } from '@/utils/apiRepository'

export function journalEntryApiRepository() {
  async function getAll() {
    const response = await useApi<IJournalEntry[]>(`/journal-entries`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.response.value?.ok) {
      return JSON.parse(response.json().data.value)
    }

    console.error('Journal entries fetch error:', response.error.value)
    toast.error('Entrée de journal', 'Erreur lors de la récupération des entrées de journal')
  }

  async function get(id: string) {
    const response = await useApi<IJournalEntry>(`/journal-entries/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.response.value?.ok) {
      return JSON.parse(response.json().data.value)
    }

    console.error('Journal entry fetch error:', response.error.value)
    toast.error('Entrée de journal', 'Erreur lors de la récupération de l\'entrée de journal')
  }

  async function create(entry: IJournalEntryCreation) {
    const response = await useApi<IJournalEntryCreation>(`/journal-entries`, {
      method: 'POST',
      body: JSON.stringify(entry),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.response.value?.ok) {
      toast.success('Entrée de journal', 'Entrée enregistrée avec succès')

      return JSON.parse(response.json().data.value)
    }

    console.error('Journal entry creation error:', response.error.value)
    toast.error('Entrée de journal', 'Erreur lors de l\'enregistrement de l\'entrée de journal')
  }

  async function update(id: string, entry: IJournalEntry) {
    const response = await useApi<IJournalEntry>(`/journal-entries/${id}`, {
      method: 'PUT',
      body: JSON.stringify(entry),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.response.value?.ok) {
      toast.success('Entrée de journal', 'Modification enregistrée avec succès')

      return JSON.parse(response.json().data.value)
    }

    console.error('Journal entry update error:', response.error.value)
    toast.error('Entrée de journal', 'Erreur lors de la modification de l\'entrée de journal')
  }

  async function remove(id: string) {
    const response = await useApi<IJournalEntry>(`/journal-entries/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.response.value?.ok) {
      toast.success('Entrée de journal', 'Suppression enregistrée avec succès')

      return JSON.parse(response.json().data.value)
    }

    console.error('Journal entry deletion error:', response.error.value)
    toast.error('Entrée de journal', 'Erreur lors de la suppression de l\'entrée de journal')
  }

  return {
    getAll,
    get,
    create,
    update,
    remove,
  }
}
