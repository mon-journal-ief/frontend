import { useApiFetch } from '@/utils/apiRepository'

const token = 'placeholder'

export function programApiRepository() {
  const toast = useToast()

  async function getAll() {
    return useApiFetch<IProgram[]>(
      `/program`,
      { },
      {
        success: { summary: 'Programs fetched successfully', detail: 'You have been fetched successfully' },
        error: { summary: 'Programs fetch failed', detail: 'Could not fetch programs.' },
      },
      toast,
    ).json()
  }

  async function get(id: string) {
    return useApiFetch<IProgram>(
      `/program/${id}`,
      { },
      {
        success: { summary: 'Program fetched successfully', detail: 'You have been fetched successfully' },
        error: { summary: 'Program fetch failed', detail: 'Could not fetch program.' },
      },
      toast,
    ).json()
  }

  async function create(program: IProgram) {
    return useApiFetch<IProgram>(
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
  }

  async function update(id: string, program: IProgram) {
    return useApiFetch<IProgram>(
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
  }

  async function remove(id: string) {
    return useApiFetch<IProgram>(
      `/program/${id}`,
      { method: 'DELETE' },
      {
        success: { summary: 'Program deleted successfully', detail: 'You have been deleted successfully' },
        error: { summary: 'Program deletion failed', detail: 'Could not delete program.' },
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
