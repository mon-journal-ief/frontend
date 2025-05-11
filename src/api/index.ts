import { authApiRepository } from '@/api/auth'
import { programApiRepository } from '@/api/program'
import { programElementApiRepository } from '@/api/programElement'

export function useApi() {
  return {
    auth: authApiRepository(),
    program: programApiRepository(),
    programElement: programElementApiRepository(),
  }
}
