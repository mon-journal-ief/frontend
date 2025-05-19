import type { ToastServiceMethods } from 'primevue'

export function programApiRepository() {
  let toast: ToastServiceMethods | undefined
  try {
    toast = useToast()
  }
  catch (e) {
    if (e instanceof Error && e.message.includes('No PrimeVue Toast provided')) {
      console.warn('⚠️ No PrimeVue Toast provided! Proceeding without toast notification.')
      toast = undefined
    }
  }

  async function getAll() {
    const { data } = await useApiFetch<IProgram[]>(
      `/program`,
      { },
      {
        success: { summary: 'Programs fetched successfully', detail: 'You have been fetched successfully' },
        error: { summary: 'Programs fetch failed', detail: 'Could not fetch programs.' },
      },
      toast,
    ).json()

    return data.value
  }

  async function get(id: string) {
    const { data } = await useApiFetch<IProgram>(
      `/program/${id}`,
      { },
      {
        success: { summary: 'Program fetched successfully', detail: 'You have been fetched successfully' },
        error: { summary: 'Program fetch failed', detail: 'Could not fetch program.' },
      },
      toast,
    ).json()

    return data.value
  }

  async function create(program: IProgram) {
    const { data } = await useApiFetch<IProgram>(
      `/program`,
      {
        method: 'POST',
        body: JSON.stringify(program),
        headers: { 'Content-Type': 'application/json' },
      },
      {
        success: { summary: 'Program created!', detail: 'The program was created successfully.' },
        error: { summary: 'Creation failed', detail: 'Could not create program.' },
      },
      toast,
    ).json()

    return data.value
  }

  async function update(id: string, program: IProgram) {
    const { data } = await useApiFetch<IProgram>(
      `/program/${id}`,
      {
        method: 'PUT',
        body: JSON.stringify(program),
      },
      {
        success: { summary: 'Program updated successfully', detail: 'You have been updated successfully' },
        error: { summary: 'Program update failed', detail: 'Could not update program.' },
      },
      toast,
    ).json()

    return data.value
  }

  async function remove(id: string) {
    const { data } = await useApiFetch<IProgram>(
      `/program/${id}`,
      { method: 'DELETE' },
      {
        success: { summary: 'Program deleted successfully', detail: 'You have been deleted successfully' },
        error: { summary: 'Program deletion failed', detail: 'Could not delete program.' },
      },
      toast,
    ).json()

    return data.value
  }

  return {
    getAll,
    get,
    create,
    update,
    remove,
  }
}
