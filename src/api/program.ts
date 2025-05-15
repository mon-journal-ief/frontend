import { useApiFetch } from '@/utils/apiRepository'

const token = 'placeholder'

export function programApiRepository() {
  const toast = useToast()

  async function getAll() {
    const response = await useApiFetch<IProgram[]>(`/program`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    })

    if (response.response.value?.ok) {
      return JSON.parse(response.json().data.value)
    }

    console.error('Programs fetch error:', response.error)
    toast.add({
      summary: 'Programs fetch failed',
      detail: response.error,
      severity: 'error',
      life: _.TOAST_LIFE,
    })
  }

  async function get(id: string) {
    const response = await useApiFetch<IProgram>(`/program/${id}`, {
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
      summary: 'Program fetch failed',
      detail: response.error,
      severity: 'error',
      life: _.TOAST_LIFE,
    })
  }

  async function create(program: IProgram) {
    const response = await useApiFetch<IProgram>(`/program`, {
      method: 'POST',
      body: JSON.stringify(program),
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    })

    if (response.response.value?.ok) {
      toast.add({
        summary: 'Program created successfully',
        detail: 'You have been created successfully',
        severity: 'success',
        life: _.TOAST_LIFE,
      })

      return JSON.parse(response.json().data.value)
    }

    console.error('Program creation error:', response.error)
    toast.add({
      summary: 'Program creation failed',
      detail: response.error,
      severity: 'error',
      life: _.TOAST_LIFE,
    })
  }

  async function update(id: string, program: IProgram) {
    const response = await useApiFetch<IProgram>(`/program/${id}`, {
      method: 'PUT',
      body: JSON.stringify(program),
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    })

    if (response.response.value?.ok) {
      toast.add({
        summary: 'Program updated successfully',
        detail: 'You have been updated successfully',
        severity: 'success',
        life: _.TOAST_LIFE,
      })

      return JSON.parse(response.json().data.value)
    }

    console.error('Program update error:', response.error)
    toast.add({
      summary: 'Program update failed',
      detail: response.error,
      severity: 'error',
      life: _.TOAST_LIFE,
    })
  }

  async function remove(id: string) {
    const response = await useApiFetch<IProgram>(`/program/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    })

    if (response.response.value?.ok) {
      toast.add({
        summary: 'Program deleted successfully',
        detail: 'You have been deleted successfully',
        severity: 'success',
        life: _.TOAST_LIFE,
      })

      return JSON.parse(response.json().data.value)
    }

    console.error('Program deletion error:', response.error)
    toast.add({
      summary: 'Program deletion failed',
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
