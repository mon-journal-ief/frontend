import { authApiRepository } from '@/api/auth'
import { programApiRepository } from '@/api/program'
import { programElementApiRepository } from '@/api/programElement'
import { programTemplateApiRepository } from '@/api/programTemplate'

export function useApi() {
  return {
    auth: authApiRepository(),
    program: programApiRepository(),
    programElement: programElementApiRepository(),
    programTemplate: programTemplateApiRepository(),
  }
}
