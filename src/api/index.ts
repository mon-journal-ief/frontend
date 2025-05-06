import { authApiRepository } from '@/api/auth'

export function useApi() {
  return {
    auth: authApiRepository(),
  }
}
