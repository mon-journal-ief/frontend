<template>
  <div class="flex flex-col gap-8">
    <div class="flex items-center gap-2 rounded-lg bg-gray-900 p-4">
      <img
        v-if="mockedChild.image"
        alt="Avatar enfant"
        class="mr-4 size-16 rounded-full border-4 object-cover"
        :class="mockedChild.gender === 'MALE' ? 'border-blue-500' : 'border-pink-500'"
        src="https://img.freepik.com/photos-gratuite/enfant-jouant-cookies-forme_23-2148738665.jpg"
      >
      <div class="flex flex-col gap-1 rounded-lg bg-gray-900 p-4">
        <h1>{{ mockedChild.firstName }} {{ mockedChild.name }}</h1>
        <p>{{ mockedChild.age }} ans</p>
        <p>{{ mockedChild.program.grade }}</p>
      </div>
    </div>
    <div class="flex w-full gap-4">
      <Card class="w-2/3">
        <template #title>
          <h2>Journal de bord de l'enfant</h2>
        </template>
        <template #content>
          <div class="flex flex-col gap-4">
            <JournalEntry
              v-for="entry in mockedChild.journalEntries"
              :key="entry.id"
              :model-value="entry"
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
        </template>
      </Card>

      <Card class="w-1/3">
        <template #title>
          <h2>Program</h2>
        </template>
        <template #content>
          <p>{{ mockedProgram }}</p>
        </template>
      </Card>
    </div>
  </div>
</template>
