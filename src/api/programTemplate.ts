import { useApiFetch } from '@/utils/apiRepository'

const token = 'placeholder'

export function programTemplateApiRepository() {
  const toast = useToast()

  async function getAll() {
    const response = await useApiFetch<IProgramTemplate[]>(`/program/template`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    })

    if (response.response.value?.ok) {
      return JSON.parse(response.json().data.value)
    }

    console.error('Program templates fetch error:', response.error)
    toast.add({
      summary: 'Program templates fetch failed',
      detail: response.error,
      severity: 'error',
      life: _.TOAST_LIFE,
    })
  }

  async function get(id: string) {
    const response = await useApiFetch<IProgramTemplate>(`/program/template/${id}`, {
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
      summary: 'Program template fetch failed',
      detail: response.error,
      severity: 'error',
      life: _.TOAST_LIFE,
    })
  }

  async function create(programTemplate: IProgramTemplate) {
    const response = await useApiFetch<IProgramTemplate>(`/program/template`, {
      method: 'POST',
      body: JSON.stringify(programTemplate),
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    })

    if (response.response.value?.ok) {
      toast.add({
        summary: 'Program template created successfully',
        detail: 'You have been created successfully',
        severity: 'success',
        life: _.TOAST_LIFE,
      })

      return JSON.parse(response.json().data.value)
    }

    console.error('Program template creation error:', response.error)
    toast.add({
      summary: 'Program template creation failed',
      detail: response.error,
      severity: 'error',
      life: _.TOAST_LIFE,
    })
  }

  async function update(id: string, programElement: IProgramTemplate) {
    const response = await useApiFetch<IProgramTemplate>(`/program/template/${id}`, {
      method: 'PUT',
      body: JSON.stringify(programElement),
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    })

    if (response.response.value?.ok) {
      toast.add({
        summary: 'Program template updated successfully',
        detail: 'You have been updated successfully',
        severity: 'success',
        life: _.TOAST_LIFE,
      })

      return JSON.parse(response.json().data.value)
    }

    console.error('Program template update error:', response.error)
    toast.add({
      summary: 'Program template update failed',
      detail: response.error,
      severity: 'error',
      life: _.TOAST_LIFE,
    })
  }

  async function remove(id: string) {
    const response = await useApiFetch<IProgramTemplate>(`/program/template/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    })

    if (response.response.value?.ok) {
      toast.add({
        summary: 'Program template deleted successfully',
        detail: 'You have been deleted successfully',
        severity: 'success',
        life: _.TOAST_LIFE,
      })

      return JSON.parse(response.json().data.value)
    }

    console.error('Program template deletion error:', response.error)
    toast.add({
      summary: 'Program template deletion failed',
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
