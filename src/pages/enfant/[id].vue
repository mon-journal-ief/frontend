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
  </div>
</template>
