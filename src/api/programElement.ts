import { useApiFetch } from '@/utils/apiRepository'

export function programElementApiRepository() {
  const toast = useToast()

  async function getAll() {
    const response = await useApiFetch<IProgramElement[]>(`/program/element`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.response.value?.ok) {
      return JSON.parse(response.json().data.value)
    }

    console.error('Program Elements fetch error:', response.error)
    toast.add({
      summary: 'Program Elements fetch failed',
      detail: response.error,
      severity: 'error',
      life: _.TOAST_LIFE,
    })
  }

  async function get(id: string) {
    const response = await useApiFetch<IProgramElement>(`/program/element/${id}`, {
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
      summary: 'Program Element fetch failed',
      detail: response.error,
      severity: 'error',
      life: _.TOAST_LIFE,
    })
  }

  async function create(programElement: IProgramElement) {
    const response = await useApiFetch<IProgramElement>(`/program/element`, {
      method: 'POST',
      body: JSON.stringify(programElement),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.response.value?.ok) {
      toast.add({
        summary: 'Program Element created successfully',
        detail: 'You have been created successfully',
        severity: 'success',
        life: _.TOAST_LIFE,
      })

      return JSON.parse(response.json().data.value)
    }

    console.error('Program Element creation error:', response.error)
    toast.add({
      summary: 'Program Element creation failed',
      detail: response.error,
      severity: 'error',
      life: _.TOAST_LIFE,
    })
  }

  async function update(id: string, programElement: IProgramElement) {
    const response = await useApiFetch<IProgramElement>(`/program/element/${id}`, {
      method: 'PUT',
      body: JSON.stringify(programElement),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.response.value?.ok) {
      toast.add({
        summary: 'Program Element updated successfully',
        detail: 'You have been updated successfully',
        severity: 'success',
        life: _.TOAST_LIFE,
      })

      return JSON.parse(response.json().data.value)
    }

    console.error('Program Element update error:', response.error)
    toast.add({
      summary: 'Program Element update failed',
      detail: response.error,
      severity: 'error',
      life: _.TOAST_LIFE,
    })
  }

  async function remove(id: string) {
    const response = await useApiFetch<IProgramElement>(`/program/element/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.response.value?.ok) {
      toast.add({
        summary: 'Program Element deleted successfully',
        detail: 'You have been deleted successfully',
        severity: 'success',
        life: _.TOAST_LIFE,
      })

      return JSON.parse(response.json().data.value)
    }

    console.error('Program Element deletion error:', response.error)
    toast.add({
      summary: 'Program Element deletion failed',
      detail: response.error,
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
