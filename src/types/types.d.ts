declare global {

  enum EGender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
  }

  enum EGrade {
    CP = 'CP',
    CE1 = 'CE1',
    CE2 = 'CE2',
    CM1 = 'CM1',
    CM2 = 'CM2',
  }

  interface IUser {
    id: string
    email: string
    name: string
    children: IChild[]
    createdAt: Date
    updatedAt: Date
  }

  interface IProgram {
    id: string
    name: string
    description?: string
    grade: string
    elements: IProgramElement[]
    children: IChild[]
    createdAt: Date
    updatedAt: Date
  }

  interface IProgramElement {
    id: string
    name: string
    description: string
    journalEntries: IJournalEntry[]
    children: IProgramElement[]
    programId: string
    parentId?: string
    createdAt: Date
    updatedAt: Date
  }

  interface IProgramTemplate {
    id: string
    name: string
    description: string
    elements: IProgramElement[]
    grade: EGrade
    createdAt: Date
    updatedAt: Date
  }

  interface IChild {
    id: string
    name: string
    lastName?: string
    image?: string
    age?: number
    gender?: EGender
    program?: IProgram
    journalEntries: IJournalEntry[]
    createdAt: Date
    updatedAt: Date
  }

  interface IChildCreation {
    name: string
    lastName?: string
    age?: number
    gender?: EGender
    programId?: string
  }

  interface IJournalEntry {
    id: string
    date: Date
    comment: string
    images: string[]
    validatedElements: IProgramElement[]
    child: IChild
    createdAt: Date
    updatedAt: Date
  }

  interface IJournalEntryCreation {
    date?: Date
    comment: string
    images: string[]
    validatedElementIds: string[]
    childId: string
  }

  interface IAuthResponse<T = any> {
    success: boolean
    data?: T
    error?: {
      code: string
      message: string
      requiresVerification?: boolean
      userId?: string
      email?: string
    }
  }

  interface ITokenResponse {
    accessToken: string
    refreshToken: string
  }
}

export {}
