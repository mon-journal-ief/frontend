import { useApi } from '@/utils/apiRepository'

interface ContactFormData {
  subject: string
  message: string
}

interface ContactResponse {
  message: string
  success: boolean
}

export function contactApiRepository() {
  async function sendMessage(contactData: ContactFormData): Promise<ContactResponse | null> {
    const { response, data, error } = await useApi<ContactResponse>(`/contact`, {
      method: 'POST',
      body: JSON.stringify(contactData),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) return data

    toast.error('Erreur', 'Erreur lors de l\'envoi du message. Veuillez réessayer.')
    throw new Error(error || 'Erreur lors de l\'envoi du message. Veuillez réessayer.')
  }

  return {
    sendMessage,
  }
}
