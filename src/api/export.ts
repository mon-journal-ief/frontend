import { useApiFetch } from '@/utils/apiRepository'
import downloadFile from '@/utils/downloadFile'

export function exportApiRepository() {
  async function exportToPDF(childId: string, childName: string) {
    try {
      const userStore = useUserStore()
      const { response } = await useApiFetch(`${import.meta.env.VITE_API_URL}/export/pdf/${childId}`, {
        method: 'GET',
        headers: {
          'x-auth-token': userStore.accessToken || '',
        },
      })

      if (response.value?.ok) {
        const blob = await response.value.blob()
        const contentDisposition = response.value.headers.get('Content-Disposition') || ''
        const fileNameMatch = contentDisposition.match(/filename="(.+)"/)
        const fileName = fileNameMatch?.[1] ?? `Journal-${childName}-${new Date().toISOString().split('T')[0]}.pdf`

        downloadFile({
          data: blob,
          filename: fileName,
          type: 'application/pdf',
        })
      }
      else {
        throw new Error(`Export failed : ${response.value?.status}`)
      }
    }
    catch (error) {
      console.error('PDF export error:', error)
      toast.error('Export PDF', 'Erreur lors de l\'export PDF')
    }
  }

  return {
    exportToPDF,
  }
}
