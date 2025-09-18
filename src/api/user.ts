import { useApi } from '@/utils/apiRepository'

export function userApiRepository() {
  async function updatePreferences(preferences: {
    name?: string
    aiSuggestionsEnabled?: boolean
    aiOnboardingShown?: boolean
  }): Promise<{ message: string, user: IUser }> {
    const userStore = useUserStore()

    const { data } = await useApi<{ message: string, user: IUser }>(`/user/preferences`, {
      method: 'PATCH',
      body: JSON.stringify(preferences),
    })

    userStore.user = data.user

    return data
  }

  return {
    updatePreferences,
  }
}
