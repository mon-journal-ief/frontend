<script setup lang="ts">
defineProps<{
  program?: IProgram
}>()
</script>

<template>
  <Card v-if="program" class="w-full">
    <template #title>
      <h2>{{ program.name }}</h2>
      <p
        v-if="program.description"
        class="text-base text-slate-600 dark:text-slate-400"
      >
        {{ program.description }}
      </p>
    </template>

    <template #content>
      <div class="mt-4 flex flex-col gap-4">
        <ProgramElement
          v-for="element in program.elements"
          :key="element.id"
          :element
        />
      </div>
    </template>
  </Card>

  <div v-else class="flex flex-col items-center gap-8 py-16">
    <h2>Aucun programme associé à cet enfant</h2>

    <Button
      icon="i-ci-plus"
      label="Associer ou créer un programme"
      rounded
      severity="secondary"
      variant="outlined"
    />
  </div>
</template>
