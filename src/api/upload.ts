import { useApi } from '@/utils/apiRepository'

export function uploadApiRepository() {
  async function uploadJournalEntryImage(file: File, journalEntryId: string): Promise<{ filename: string, url: string, size: number } | null> {
    try {
      const userStore = useUserStore()
      const formData = new FormData()
      formData.append('image', file)
      formData.append('journalEntryId', journalEntryId)

      const response = await fetch(`${import.meta.env.VITE_API_URL}/journal-entries/images`, {
        method: 'POST',
        body: formData,
        headers: {
          'x-auth-token': userStore.accessToken,
        },
      })

      if (response.ok) {
        const result = await response.json()

        return result.data
      }

      const error = await response.json()
      console.error('Image upload error:', error)
      toast.error('Upload', error.message || 'Erreur lors de l\'upload de l\'image')

      return null
    }
    catch (error) {
      console.error('Image upload error:', error)
      toast.error('Upload', 'Erreur lors de l\'upload de l\'image')

      return null
    }
  }

  async function deleteJournalEntryImage(filename: string): Promise<boolean> {
    try {
      // Extract filename after '/image' if it exists in the path
      const actualFilename = filename.includes('/images/')
        ? filename.split('/images/')[1]
        : filename

      const response = await useApi(`/journal-entries/images/${actualFilename}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.response.value?.ok) {
        return true
      }

      console.error('Image delete error:', response.error.value)
      toast.error('Upload', 'Erreur lors de la suppression de l\'image')

      return false
    }
    catch (error) {
      console.error('Image delete error:', error)
      toast.error('Upload', 'Erreur lors de la suppression de l\'image')

      return false
    }
  }

  async function uploadChildProfileImage(file: File, childId: string): Promise<{ filename: string, url: string, size: number } | null> {
    try {
      const userStore = useUserStore()
      const formData = new FormData()
      formData.append('image', file)
      formData.append('childId', childId)

      const response = await fetch(`${import.meta.env.VITE_API_URL}/children/profile-images`, {
        method: 'POST',
        body: formData,
        headers: {
          'x-auth-token': userStore.accessToken,
        },
      })

      if (response.ok) {
        const result = await response.json()

        return result.data
      }

      const error = await response.json()
      console.error('Profile image upload error:', error)
      toast.error('Upload', error.message || 'Erreur lors de l\'upload de l\'image de profil')

      return null
    }
    catch (error) {
      console.error('Profile image upload error:', error)
      toast.error('Upload', 'Erreur lors de l\'upload de l\'image de profil')

      return null
    }
  }

  async function deleteChildProfileImage(filename: string): Promise<boolean> {
    try {
      // Extract filename after '/images/' if it exists in the path
      const actualFilename = filename.includes('/images/')
        ? filename.split('/images/')[1]
        : filename

      const response = await useApi(`/children/profile-images/${actualFilename}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.response.value?.ok) return true

      console.error('Profile image delete error:', response.error.value)
      toast.error('Upload', 'Erreur lors de la suppression de l\'image de profil')

      return false
    }
    catch (error) {
      console.error('Profile image delete error:', error)
      toast.error('Upload', 'Erreur lors de la suppression de l\'image de profil')

      return false
    }
  }

  return {
    uploadJournalEntryImage,
    deleteJournalEntryImage,
    uploadChildProfileImage,
    deleteChildProfileImage,
  }
}
