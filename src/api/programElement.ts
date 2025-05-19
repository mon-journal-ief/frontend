import type { ToastServiceMethods } from 'primevue'

export function programElementApiRepository() {
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

  // TODO There should be a programId as parameter be cause there is no use case for fetching all program elements and the route should be /program-elements/program/:programId
  async function getAll() {
    const { data } = await useApiFetch<IProgramElement[]>(
      `/program/elements`,
      {},
      {
        success: { summary: 'Program Elements fetched successfully', detail: 'Elements fetched successfully' },
        error: { summary: 'Program Elements fetch failed', detail: 'Could not fetch program elements.' },
      },
      toast,
    ).json()

    return data.value
  }

  async function get(id: string) {
    const { data } = await useApiFetch<IProgramElement>(
      `/program-elements/${id}`,
      {},
      {
        success: { summary: 'Program Element fetched successfully', detail: 'Element fetched successfully' },
        error: { summary: 'Program Element fetch failed', detail: 'Could not fetch program element.' },
      },
      toast,
    ).json()

    return data.value
  }

  async function create(programElement: Partial<IProgramElement>) {
    const { data } = await useApiFetch<IProgramElement>(
      `/program-elements`,
      {
        method: 'POST',
        body: JSON.stringify(programElement),
        headers: { 'Content-Type': 'application/json' },
      },
      {
        success: { summary: 'Program Element created!', detail: 'Element created successfully.' },
        error: { summary: 'Creation failed', detail: 'Could not create program element.' },
      },
      toast,
    ).json()

    return data.value
  }

  async function update(id: string, programElement: Partial<IProgramElement>) {
    const { data } = await useApiFetch<IProgramElement>(
      `/program-elements/${id}`,
      {
        method: 'PUT',
        body: JSON.stringify(programElement),
      },
      {
        success: { summary: 'Program Element updated successfully', detail: 'Element updated successfully.' },
        error: { summary: 'Program Element update failed', detail: 'Could not update program element.' },
      },
      toast,
    ).json()

    return data.value
  }

  async function remove(id: string) {
    const { data } = await useApiFetch<IProgramElement>(
      `/program-elements/${id}`,
      { method: 'DELETE' },
      {
        success: { summary: 'Program Element deleted successfully', detail: 'Element deleted successfully.' },
        error: { summary: 'Program Element deletion failed', detail: 'Could not delete program element.' },
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
