import { useApi } from '@/utils/apiRepository'

export function programTemplateApiRepository() {
  async function getAll() {
    const response = await useApi<IProgramTemplate[]>(`/program/template`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.response.value?.ok) {
      return JSON.parse(response.json().data.value)
    }

    console.error('Program templates fetch error:', response.error.value)
    toast.error('Program templates fetch failed', response.error.value)
  }

  async function get(id: string) {
    const response = await useApi<IProgramTemplate>(`/program/template/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.response.value?.ok) {
      return JSON.parse(response.json().data.value)
    }

    console.error('Registration error:', response.error.value)
    toast.error('Program template fetch failed', response.error.value)
  }

  async function create(programTemplate: IProgramTemplate) {
    const response = await useApi<IProgramTemplate>(`/program/template`, {
      method: 'POST',
      body: JSON.stringify(programTemplate),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.response.value?.ok) {
      toast.success('Program template created successfully', 'You have been created successfully')

      return JSON.parse(response.json().data.value)
    }

    console.error('Program template creation error:', response.error.value)
    toast.error('Program template creation failed', response.error.value)
  }

  async function update(id: string, programElement: IProgramTemplate) {
    const response = await useApi<IProgramTemplate>(`/program/template/${id}`, {
      method: 'PUT',
      body: JSON.stringify(programElement),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.response.value?.ok) {
      toast.success('Program template updated successfully', 'You have been updated successfully')

      return JSON.parse(response.json().data.value)
    }

    console.error('Program template update error:', response.error.value)
    toast.error('Program template update failed', response.error.value)
  }

  async function remove(id: string) {
    const response = await useApi<IProgramTemplate>(`/program/template/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.response.value?.ok) {
      toast.success('Program template deleted successfully', 'You have been deleted successfully')

      return JSON.parse(response.json().data.value)
    }

    console.error('Program template deletion error:', response.error.value)
    toast.error('Program template deletion failed', response.error.value)
  }

  async function copy(templateId: string, childId: string) {
    const response = await useApi<IProgramTemplate>(`/program/template/copy`, {
      method: 'POST',
      body: JSON.stringify({ templateId, childId }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.response.value?.ok) {
      toast.success('Programme importé avec succès', 'Vous pouvez désormais personnaliser le programme')

      return JSON.parse(response.json().data.value)
    }

    console.error('Program template copy error:', response.error.value)
    toast.error('Program template copy failed', response.error.value)
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
