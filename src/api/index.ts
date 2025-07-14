import { authApiRepository } from '@/api/auth'
import { programApiRepository } from '@/api/program'
import { programElementApiRepository } from '@/api/programElement'
import { programTemplateApiRepository } from '@/api/programTemplate'
import { childrenApiRepository } from '@/api/children'
import { journalEntryApiRepository } from '@/api/journalEntry'

export function useApi() {
  return {
    auth: authApiRepository(),
    program: programApiRepository(),
    programElement: programElementApiRepository(),
    programTemplate: programTemplateApiRepository(),
    children: childrenApiRepository(),
    journalEntry: journalEntryApiRepository(),
  }
}
