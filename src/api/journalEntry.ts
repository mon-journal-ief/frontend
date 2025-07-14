import { _ } from '@/utils/constants'
import { useApiFetch } from '@/utils/apiRepository'

export function journalEntryApiRepository() {
  const toast = useToast()

  async function getAll() {
    const response = await useApiFetch<IJournalEntry[]>(`/journal-entries`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.response.value?.ok) {
      return JSON.parse(response.json().data.value)
    }

    console.error('Journal entries fetch error:', response.error)
    toast.add({
      summary: 'Entrée de journal',
      detail: 'Erreur lors de la récupération des entrées de journal',
      severity: 'error',
      life: _.TOAST_LIFE,
    })
  }

  async function get(id: string) {
    const response = await useApiFetch<IJournalEntry>(`/journal-entries/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.response.value?.ok) {
      return JSON.parse(response.json().data.value)
    }

    console.error('Journal entry fetch error:', response.error)
    toast.add({
      summary: 'Entrée de journal',
      detail: 'Erreur lors de la récupération de l\'entrée de journal',
      severity: 'error',
      life: _.TOAST_LIFE,
    })
  }

  async function create(entry: IJournalEntryCreation) {
    const response = await useApiFetch<IJournalEntryCreation>(`/journal-entries`, {
      method: 'POST',
      body: JSON.stringify(entry),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.response.value?.ok) {
      toast.add({
        summary: 'Entrée de journal',
        detail: 'Entrée enregistrée avec succès',
        severity: 'success',
        life: _.TOAST_LIFE,
      })

      return JSON.parse(response.json().data.value)
    }

    console.error('Journal entry creation error:', response.error)
    toast.add({
      summary: 'Entrée de journal',
      detail: 'Erreur lors de l\'enregistrement de l\'entrée de journal',
      severity: 'error',
      life: _.TOAST_LIFE,
    })
  }

  async function update(id: string, entry: IJournalEntry) {
    const response = await useApiFetch<IJournalEntry>(`/journal-entries/${id}`, {
      method: 'PUT',
      body: JSON.stringify(entry),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.response.value?.ok) {
      toast.add({
        summary: 'Entrée de journal',
        detail: 'Modification enregistrée avec succès',
        severity: 'success',
        life: _.TOAST_LIFE,
      })

      return JSON.parse(response.json().data.value)
    }

    console.error('Journal entry update error:', response.error)
    toast.add({
      summary: 'Entrée de journal',
      detail: 'Erreur lors de la modification de l\'entrée de journal',
      severity: 'error',
      life: _.TOAST_LIFE,
    })
  }

  async function remove(id: string) {
    const response = await useApiFetch<IJournalEntry>(`/journal-entries/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.response.value?.ok) {
      toast.add({
        summary: 'Entrée de journal',
        detail: 'Suppression enregistrée avec succès',
        severity: 'success',
        life: _.TOAST_LIFE,
      })

      return JSON.parse(response.json().data.value)
    }

    console.error('Journal entry deletion error:', response.error)
    toast.add({
      summary: 'Entrée de journal',
      detail: 'Erreur lors de la suppression de l\'entrée de journal',
      severity: 'error',
      life: _.TOAST_LIFE,
    })
  }

  return {
    getAll,
    get,
    create,
    update,
    remove,
  }
}
