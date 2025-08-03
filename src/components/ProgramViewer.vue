<script setup lang="ts">
const props = defineProps<{
  program?: IProgram
}>()

const programCopy = computed(() => props.program)

const showDialogCreateProgram = ref(false)
const reorderMode = ref(false)

async function addNewElement() {
  if (!programCopy.value) return

  // Create a temporary element that will be in edit mode
  const tempElement: IProgramElement = {
    id: `temp-${Date.now()}`,
    name: 'Nouvel élément',
    description: '',
    journalEntries: [],
    programId: programCopy.value.id,
    children: [],
    parentId: undefined,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  // Prevent some annoying bugs
  reorderMode.value = false

  // Add to the top of the elements array in edit mode
  programCopy.value.elements.unshift(tempElement)
}
</script>

<template>
  <div v-if="programCopy" class="flex flex-col gap-8">
    <div class="flex items-center justify-between gap-2">
      <div class="flex flex-col gap-2">
        <h2>{{ programCopy.name }}</h2>
        <p v-if="programCopy.description" class="text-surface-600 dark:text-surface-400">
          {{ programCopy.description }}
        </p>
      </div>

      <Button
        icon="i-ci-list-unordered"
        label="Réorganiser"
        pt:icon:class="text-xl"
        rounded
        severity="secondary"
        variant="outlined"
        @click="reorderMode = !reorderMode"
      />
    </div>

    <div class="flex flex-col gap-8">
      <Button
        icon="i-ci-plus"
        label="Ajouter un élément de programme"
        rounded
        severity="secondary"
        variant="outlined"
        @click="addNewElement"
      />

      <DraggableProgramElements
        v-model:elements="programCopy.elements"
        :parent-id="null"
        :reorder-mode
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
