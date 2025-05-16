import type { ToastServiceMethods } from 'primevue'

export function programElementApiRepository() {
  async function getAll(programId: string, toast?: ToastServiceMethods) {
    return useApiFetch<IProgramElement[]>(
      `/program-elements/program/${programId}`,
      {},
      {
        success: { summary: 'Program Elements fetched successfully', detail: 'Elements fetched successfully' },
        error: { summary: 'Program Elements fetch failed', detail: 'Could not fetch program elements.' },
      },
      toast,
    ).json()
  }

  async function get(id: string, toast?: ToastServiceMethods) {
    return useApiFetch<IProgramElement>(
      `/program-elements/${id}`,
      {},
      {
        success: { summary: 'Program Element fetched successfully', detail: 'Element fetched successfully' },
        error: { summary: 'Program Element fetch failed', detail: 'Could not fetch program element.' },
      },
      toast,
    ).json()
  }

  async function create(programElement: Partial<IProgramElement>, toast?: ToastServiceMethods) {
    return useApiFetch<IProgramElement>(
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
  }

  async function update(id: string, programElement: Partial<IProgramElement>, toast?: ToastServiceMethods) {
    return useApiFetch<IProgramElement>(
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
  }

  async function remove(id: string, toast?: ToastServiceMethods) {
    return useApiFetch<IProgramElement>(
      `/program-elements/${id}`,
      { method: 'DELETE' },
      {
        success: { summary: 'Program Element deleted successfully', detail: 'Element deleted successfully.' },
        error: { summary: 'Program Element deletion failed', detail: 'Could not delete program element.' },
      },
      toast,
    ).json()
  }

  return {
    getAll,
    get,
    create,
    update,
    remove,
  }
}
