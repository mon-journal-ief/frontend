<script setup lang="ts">
const props = defineProps<{
  program?: IProgram
}>()

const programCopy = computed(() => props.program)

const showDialogCreateProgram = ref(false)
</script>

<template>
  <DialogProgramCreate v-model="showDialogCreateProgram" />

  <div v-if="programCopy" class="flex flex-col gap-8">
    <div class="flex flex-col gap-2">
      <h2>{{ programCopy.name }}</h2>
      <p v-if="programCopy.description" class="text-slate-600 dark:text-slate-400">
        {{ programCopy.description }}
      </p>
    </div>

    <div class="flex flex-col gap-4">
      <ProgramElement
        v-for="(_element, index) in programCopy.elements"
        :key="index"
        v-model="programCopy.elements[index]!"
      />

      <Button
        icon="i-ci-plus"
        label="Ajouter une compétence"
        rounded
        severity="secondary"
        variant="outlined"
      />
    </div>
  </div>

  <div v-else class="flex flex-col items-center gap-8 py-16">
    <h2>Aucun programme associé à cet enfant</h2>

    <Button
      icon="i-ci-plus"
      label="Associer ou créer un programme"
      rounded
      severity="secondary"
      variant="outlined"
      @click="showDialogCreateProgram = true"
    />
  </div>
</template>
