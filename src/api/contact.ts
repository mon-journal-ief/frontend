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
  async function sendMessage(data: ContactFormData): Promise<ContactResponse | null> {
    const response = await useApi<ContactResponse>(`/contact`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.response.value?.ok) {
      return JSON.parse(response.json().data.value)
    }

    console.error('Contact form error:', response.error.value)
    toast.error('Erreur', 'Erreur lors de l\'envoi du message. Veuillez réessayer.')

    return null
  }

  return {
    sendMessage,
  }
}
