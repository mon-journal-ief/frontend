<script setup lang="ts">
const props = defineProps<{
  program?: IProgram
}>()

const programCopy = computed(() => props.program)

const showDialogCreateProgram = ref(false)
const reorderMode = ref(false)

const uiStore = useUIStore()
const { showAddDialogProgram, addNewElement } = storeToRefs(uiStore)

// Watch for mobile add program dialog
watch(showAddDialogProgram, (show) => {
  if (show) {
    addNewElementLocal()
    showAddDialogProgram.value = false
  }
})

async function addNewElementLocal() {
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

// Register the function with the store
onMounted(() => {
  addNewElement.value = addNewElementLocal
})

onUnmounted(() => {
  addNewElement.value = null
})
</script>

<template>
  <div v-if="programCopy" class="flex flex-col gap-8">
    <div class="flex items-center justify-between gap-2">
      <div class="flex flex-col gap-2">
        <h2>{{ programCopy.name }}</h2>
        <p v-if="programCopy.description" class="text-theme-surface-600">
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
        @click="addNewElementLocal"
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
