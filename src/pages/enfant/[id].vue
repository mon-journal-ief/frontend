<script setup lang="ts">
// const route = useRoute()
// const { id } = route.params as { id: string }

const mockedProgramElement = ref<IProgramElement>({
  id: '1',
  name: 'Mathématiques',
  description: 'Mathématiques',
})

const mockedProgram = ref<IProgram>({
  id: '1',
  name: 'CP',
  grade: 'CP',
  elements: [mockedProgramElement.value],
})

const mockedJournalEntries = ref<IJournalEntry[]>([
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
])

const mockedChild = ref<IChild>({
  id: '1',
  firstName: 'Thimothé',
  name: 'Benjaoui',
  birthDate: new Date('2020-01-01'),
  age: 5,
  gender: 'MALE',
  program: mockedProgram.value,
  journalEntries: mockedJournalEntries.value,
})
</script>

<template>
  <div class="flex flex-col gap-8">
    <div class="flex items-center gap-2 rounded-lg bg-gray-900 p-4">
      <img
        alt="Avatar enfant"
        class="mr-4 size-16 rounded-full border-4 object-cover"
        :class="mockedChild.gender === 'MALE' ? 'border-blue-500' : 'border-pink-500'"
        onerror="console.log('🖼️ Image not found'); this.src='https://via.placeholder.com/150?text=Enfant'"
        src="https://img.freepik.com/photos-gratuite/enfant-jouant-cookies-forme_23-2148738665.jpg"
      >
      <div class="flex flex-col gap-1 rounded-lg bg-gray-900 p-4">
        <h1>{{ mockedChild.firstName }} {{ mockedChild.name }}</h1>
        <p>{{ mockedChild.age }} ans</p>
        <p>{{ mockedChild.program.grade }}</p>
      </div>
    </div>

    <div class="mt-4 space-y-4">
      <JournalEntry
        v-for="entry in mockedJournalEntries"
        :key="entry.id"
        :entry
      />
      <div class="flex justify-center">
        <Button
          class="rounded-lg text-white"
          icon="i-ci-plus"
          severity="secondary"
          variant="outlined"
        />
      </div>
    </div>
  </div>
</template>
