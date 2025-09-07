import { useApi } from '@/utils/apiRepository'
import downloadFile from '@/utils/downloadFile'

export function exportApiRepository() {
  async function exportToPDF(child: IChild) {
    try {
      const { response, data } = await useApi<Blob>(`/export/pdf/${child.id}`, { responseType: 'blob' })

      if (response?.ok) {
        const blob = data
        const contentDisposition = response.headers.get('Content-Disposition') || ''
        const fileNameMatch = contentDisposition.match(/filename="(.+)"/)
        const fileName = fileNameMatch?.[1] ?? `Journal-${child.name}-${new Date().toISOString().split('T')[0]}.pdf`

        downloadFile({
          data: blob,
          filename: fileName,
          type: 'application/pdf',
        })
      }
      else {
        throw new Error(`Export failed : ${response.status}`)
      }
    }
    catch (error) {
      console.error('PDF export error:', error)
      toast.error('Export PDF', 'Erreur lors de l\'export PDF')
    }
  }

  async function exportToWord(child: IChild) {
    try {
      const { response, data } = await useApi<Blob>(`/export/word/${child.id}`, { responseType: 'blob' })

      if (response?.ok) {
        const blob = data
        const contentDisposition = response.headers.get('Content-Disposition') || ''
        const fileNameMatch = contentDisposition.match(/filename="(.+)"/)
        const fileName = fileNameMatch?.[1] ?? `Journal-${child.name}-${new Date().toISOString().split('T')[0]}.docx`

        downloadFile({
          data: blob,
          filename: fileName,
          type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        })
      }
      else {
        throw new Error(`Export failed : ${response.status}`)
      }
    }
    catch (error) {
      console.error('Word export error:', error)
      toast.error('Export Word', 'Erreur lors de l\'export Word')
    }
  }

  return {
    exportToPDF,
    exportToWord,
  }
}
