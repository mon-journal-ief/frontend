import { authApiRepository } from '@/api/auth'
import { programApiRepository } from '@/api/program'
import { programElementApiRepository } from '@/api/programElement'
import { programTemplateApiRepository } from '@/api/programTemplate'
import { childrenApiRepository } from '@/api/children'
import { journalEntryApiRepository } from '@/api/journalEntry'
import { exportApiRepository } from '@/api/export'
import { uploadApiRepository } from '@/api/upload'

// Create a centralized API service instance
export const api = {
  auth: authApiRepository(),
  program: programApiRepository(),
  programElement: programElementApiRepository(),
  programTemplate: programTemplateApiRepository(),
  children: childrenApiRepository(),
  journalEntry: journalEntryApiRepository(),
  export: exportApiRepository(),
  upload: uploadApiRepository(),
}
