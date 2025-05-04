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
  }

  interface IProgram {
    id: string
    name: string
    grade: string
    elements: IProgramElement[]
  }

  interface IProgramElement {
    id: string
    name: string
    description: string
  }

  interface IChild {
    id: string
    name: string
    firstName: string
    age: number
    gender: string
    birthDate: Date
    program: IProgram
    journalEntries: IJournalEntry[]
  }

  interface IJournalEntry {
    id: string
    date: Date
    comment: string
    images: string[]
    validatedElements: IProgramElement[]
  }
}

export {}
