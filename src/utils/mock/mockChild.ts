export const mockedJournalEntries: IJournalEntry[] = [
  {
    id: '1',
    date: new Date('2020-01-01'),
    comment: 'Le petit Thimothé a fait ses devoirs de mathématiques, il a appris à compter les nombres jusqu\'à 10.',
    images: [
      'https://img.freepik.com/photos-gratuite/planification-livres-conversation-planification-participation-universite_1418-94.jpg',
      'https://img.freepik.com/photos-gratuite/concept-education-etudiant-etudiant-faisant-remue-meninges-concept-du-campus-gros-plan-etudiants-qui-discutent-leur-sujet-livres-manuels-scolaires-mise-au-point-selective_1418-645.jpg',
    ],
    validatedElements: [],
  },
]

export const mockedChild: IChild = {
  id: '1',
  firstName: 'Thimothé',
  name: 'Benjaoui',
  birthDate: new Date('2020-01-01'),
  age: 5,
  gender: 'MALE',
  program: mockedProgram,
  journalEntries: mockedJournalEntries,
  image: 'https://img.freepik.com/photos-gratuite/enfant-jouant-cookies-forme_23-2148738665.jpg',
}
