<script setup lang="ts">
const props = defineProps<{
  program?: IProgram
}>()

const programCopy = computed(() => props.program)

const showDialogCreateProgram = ref(false)
const showDialogAddElement = ref(false)
const reorderMode = ref(false)

const uiStore = useUIStore()
const { showAddDialogProgram } = storeToRefs(uiStore)

// Watch for mobile add program dialog
watch(showAddDialogProgram, (show) => {
  if (show) {
    showDialogAddElement.value = true
    showAddDialogProgram.value = false
  }
})

function handleAddElement(element: IProgramElement) {
  if (!programCopy.value) return

  // If the element has a parent, add it to the parent's children array
  if (element.parentId) {
    const parent = findElementById(programCopy.value.elements, element.parentId)
    if (parent) {
      if (!parent.children) {
        parent.children = []
      }
      parent.children.unshift(element)

      return
    }
  }

  // If no parent or parent not found, add to root level
  programCopy.value.elements.unshift(element)
}

// Helper function to recursively find an element by ID
function findElementById(elements: IProgramElement[], id: string): IProgramElement | null {
  for (const element of elements) {
    if (element.id === id) {
      return element
    }
    if (element.children?.length) {
      const found = findElementById(element.children, id)
      if (found) return found
    }
  }

  return null
}
</script>

<template>
  <div v-if="programCopy" class="flex flex-col gap-4 md:gap-8">
    <div class="flex flex-col gap-2">
      <h2>{{ programCopy.name }}</h2>
      <p v-if="programCopy.description" class="text-theme-surface-600">
        {{ programCopy.description }}
      </p>
    </div>

    <Button
      class="w-full md:w-auto"
      icon="i-ci-list-unordered"
      label="Réorganiser"
      pt:icon:class="text-xl"
      rounded
      severity="secondary"
      variant="outlined"
      @click="reorderMode = !reorderMode"
    />

    <div class="flex flex-col gap-8">
      <Button
        class="hidden md:block"
        icon="i-ci-plus"
        label="Ajouter un élément de programme"
        rounded
        severity="secondary"
        variant="outlined"
        @click="showDialogAddElement = true"
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

  <DialogAddElement
    v-if="programCopy"
    v-model="showDialogAddElement"
    :program-id="programCopy.id"
    @add-element="handleAddElement"
  />
</template>
