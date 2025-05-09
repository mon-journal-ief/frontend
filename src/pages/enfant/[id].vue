<script setup lang="ts">
const childRef = ref<IChild>(mockedChild)
</script>

<template>
  <div class="flex flex-col gap-4">
    <Card>
      <template #title>
        <div class="flex items-center gap-2">
          <img
            v-if="childRef.image"
            alt="Avatar enfant"
            class="size-16 rounded-full border-4 object-cover"
            :class="childRef.gender === 'MALE' ? 'dark:border-blue-800 border-blue-400' : 'dark:border-pink-800 border-pink-400'"
            :src="childRef.image"
          >
          <h1>{{ childRef.firstName }} {{ childRef.name }}</h1>
        </div>
      </template>

      <template #content>
        <div class="flex flex-col gap-1">
          <p>{{ childRef.age }} ans</p>
          <p>{{ childRef.program.grade }}</p>
        </div>
      </template>
    </Card>

    <div class="flex w-full flex-col gap-4 md:flex-row">
      <Card class="w-full md:w-2/3">
        <template #title>
          <h2>Journal de bord de {{ childRef.firstName }} </h2>
        </template>

        <template #content>
          <div class="flex flex-col gap-4">
            <JournalEntry
              v-for="entry in childRef.journalEntries"
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

      <Card class="w-full md:w-1/3">
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
