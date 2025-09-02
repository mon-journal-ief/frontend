<script setup lang="ts">
const props = defineProps<{
  program?: IProgram
}>()

const programCopy = computed(() => props.program)

const reorderMode = ref(false)

const uiStore = useUIStore()
const { showDialogAddProgramElement } = storeToRefs(uiStore)

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
  <DialogAddProgramElement
    v-if="programCopy && showDialogAddProgramElement"
    v-model="showDialogAddProgramElement"
    :program-id="programCopy.id"
    @add-element="handleAddElement"
  />

  <div v-if="programCopy" class="flex flex-col gap-4">
    <div class="flex flex-col gap-2">
      <h2>{{ programCopy.name }}</h2>
      <p v-if="programCopy.description" class="text-theme-surface-600">
        {{ programCopy.description }}
      </p>
      <div class="flex gap-2">
        <a
          v-for="source in programCopy.sources"
          :key="source.name"
          v-tooltip.top="source.name"
          class="text-theme-surface-300 hover:text-theme-primary-600 flex items-center gap-2 transition-colors"
          :href="source.url"
          target="_blank"
        >
          <i class="i-ci-external-link text-lg" />
        </a>
      </div>
    </div>

    <div class="flex flex-col gap-4">
      <Button
        class="hidden md:block"
        icon="i-ci-plus text-lg -mb-1 mr-1"
        label="Ajouter un élément de programme"
        rounded
        severity="secondary"
        variant="outlined"
        @click="showDialogAddProgramElement = true"
      />

      <Button
        v-if="programCopy.elements.length > 0"
        class="w-full md:w-auto"
        icon="i-ci-list-unordered"
        label="Réorganiser"
        pt:icon:class="text-xl"
        rounded
        severity="secondary"
        variant="outlined"
        @click="reorderMode = !reorderMode"
      />

      <Accordion
        collapse-icon="i-ci-caret-down-md text-3xl"
        expand-icon="i-ci-caret-up-md text-3xl"
        multiple
      >
        <!-- Accordion Items (Main node) -->
        <DraggableProgramElements
          v-model:elements="programCopy.elements"
          :parent-id="null"
          :reorder-mode
        />
      </Accordion>
    </div>
  </div>
</template>
