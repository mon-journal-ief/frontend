const mockedProgramElement: IProgramElement = {
  id: '1',
  name: 'Mathématiques',
  description: 'Mathématiques',
  journalEntries: [],
  program: {} as IProgram, // should be mockedProgram but it would create a circular dependency
  createdAt: new Date('2020-01-01'),
  updatedAt: new Date('2020-01-01'),
}

export const mockedProgram: IProgram = {
  id: '1',
  name: 'CP',
  grade: 'CP',
  elements: [mockedProgramElement],
  children: [],
  createdAt: new Date('2020-01-01'),
  updatedAt: new Date('2020-01-01'),
}
