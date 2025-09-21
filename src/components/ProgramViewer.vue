<script setup lang="ts">
const props = defineProps<{
  program?: IProgram
}>()

const programCopy = computed(() => props.program)

const reorderMode = ref(false)
const searchQuery = ref('')

const uiStore = useUIStore()
const { showDialogAddProgramElement } = storeToRefs(uiStore)

const filteredElements = computed(() => {
  if (!programCopy.value) return []

  let elements = [...programCopy.value.elements]

  const query = searchQuery.value.toLowerCase().trim()
  if (query) {
    elements = filterElementsRecursively(elements, query)
  }

  return elements
})

function filterElementsRecursively(elements: IProgramElement[], query: string): IProgramElement[] {
  return elements.reduce((filtered: IProgramElement[], element) => {
    // Check if current element matches
    const nameMatch = element.name.toLowerCase().includes(query)
    const descriptionMatch = element.description?.toLowerCase().includes(query)
    const currentMatches = nameMatch || descriptionMatch

    // Filter children recursively
    const filteredChildren = element.children ? filterElementsRecursively(element.children, query) : []

    // Include element if it matches or has matching children
    if (currentMatches || filteredChildren.length > 0) {
      filtered.push({
        ...element,
        children: filteredChildren.length > 0 ? filteredChildren : element.children,
      })
    }

    return filtered
  }, [])
}

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

  <div v-if="programCopy" class="flex h-full flex-col gap-4">
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

    <div class="flex h-full flex-col gap-4">
      <!-- Controls Row -->
      <div class="flex items-center justify-between gap-4">
        <!-- Add Element and Reorder Buttons -->
        <div class="flex flex-col gap-2 lg:flex-row">
          <Button
            class="hidden whitespace-nowrap md:block"
            icon="i-ci-plus text-lg -mb-1 mr-1"
            label="Ajouter un élément de programme"
            rounded
            severity="secondary"
            variant="outlined"
            @click="showDialogAddProgramElement = true"
          />

          <Button
            v-if="programCopy.elements.length > 0"
            class="whitespace-nowrap"
            icon="i-ci-list-unordered"
            label="Réorganiser"
            pt:icon:class="text-xl"
            rounded
            severity="secondary"
            variant="outlined"
            @click="reorderMode = !reorderMode"
          />
        </div>

        <!-- Search Controls -->
        <InputText
          v-if="programCopy.elements.length > 0"
          v-model="searchQuery"
          class="self-start"
          placeholder="Rechercher un élément"
        />
      </div>

      <!-- Empty State -->
      <div
        v-if="programCopy.elements.length === 0"
        class="flex h-full flex-col place-items-end items-center justify-end gap-8 text-2xl md:hidden"
      >
        <p> Appuyez ici pour ajouter un élément de programme</p>
        <i class="i-ci-arrow-down-md animate-bounce text-5xl" />
      </div>

      <!-- No Results State -->
      <div
        v-else-if="filteredElements.length === 0 && searchQuery.trim()"
        class="flex h-full flex-col items-center justify-center gap-4 text-center text-surface-500"
      >
        <i class="i-ci-search text-4xl" />
        <div>
          <p class="text-lg">Aucun élément trouvé</p>
          <p class="text-sm">Essayez de modifier votre recherche</p>
        </div>
      </div>

      <!-- Program Elements List -->
      <Accordion
        v-else
        collapse-icon="i-ci-caret-down-md text-3xl"
        expand-icon="i-ci-caret-up-md text-3xl"
        multiple
      >
        <!-- Accordion Items (Main node) -->
        <DraggableProgramElements
          v-if="reorderMode"
          v-model:elements="programCopy.elements"
          :parent-id="null"
          :reorder-mode
        />
        <DraggableProgramElements
          v-else
          v-model:elements="filteredElements"
          :parent-id="null"
          :reorder-mode="false"
        />
      </Accordion>
    </div>
  </div>
</template>
