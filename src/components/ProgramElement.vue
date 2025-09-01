<script setup lang="ts">
withDefaults(defineProps<{ reorderMode?: boolean }>(), {
  reorderMode: false,
})

const emit = defineEmits<{
  remove: []
}>()

const element = defineModel<IProgramElement>({ required: true })
const elementStatus = computed(() => {
  if (element.value.isValidated) {
    return 'validated'
  }
  if (element.value.journalEntries?.length > 0) {
    return 'partiallyValidated'
  }

  return 'notValidated'
})

// Ensure children is always an array. This fixes a bug where newly created elements
// would not be draggable. I'd like to find a better solution.
watchEffect(() => {
  if (!element.value.children) {
    element.value.children = []
  }
})

const editMode = ref(false)

const originalData = ref({
  name: element.value.name,
  description: element.value.description,
})

function startEdit() {
  originalData.value = {
    name: element.value.name,
    description: element.value.description,
  }
  editMode.value = true
}

function cancelEdit() {
  element.value.name = originalData.value.name
  element.value.description = originalData.value.description
  editMode.value = false
}

async function saveEdit() {
  await api.programElement.update(element.value.id, element.value)
  editMode.value = false
}

async function toggleValidation() {
  const newValidationState = !element.value.isValidated
  const updatedElement = await api.programElement.validate(element.value.id, newValidationState)
  if (updatedElement) {
    element.value.isValidated = updatedElement.isValidated
  }
}
</script>

<template>
  <div v-if="!editMode">
    <Panel
      :class="[
        elementStatus === 'validated' && 'border-l-4 border-l-green-500',
        elementStatus === 'partiallyValidated' && 'border-l-4 border-l-yellow-500',
      ]"
      collapsed
      :toggleable="!!element.description && !reorderMode"
    >
      <template #header>
        <div class="group flex w-full justify-between">
          <div class="flex items-center gap-2">
            <i v-if="reorderMode" class="drag-handle i-ci-hamburger-md mr-3 flex shrink-0 cursor-grab select-none items-center self-center pr-1 text-2xl" />

            <p
              :class="[
                elementStatus === 'validated' && 'text-green-700 dark:text-green-400',
                elementStatus === 'partiallyValidated' && 'text-yellow-700 dark:text-yellow-400',
                reorderMode && 'text-sm',
              ]"
            >
              {{ element.name }}
            </p>

            <Badge
              v-if="element.journalEntries?.length > 0 && !reorderMode"
              v-tooltip.top="`${element.journalEntries?.length} entrée${element.journalEntries?.length > 1 ? 's' : ''} associée${element.journalEntries?.length > 1 ? 's' : ''}`"
              :severity="elementStatus === 'validated' ? 'success' : 'warning'"
              :value="element.journalEntries?.length"
            />
          </div>

          <ProgramElementActions
            v-if="!reorderMode"
            :element
            @remove="emit('remove')"
            @start-edit="startEdit"
            @validate="toggleValidation"
          />
        </div>
      </template>

      <div v-if="element.description && !reorderMode" class="mt-2 flex flex-col justify-between gap-4 text-sm">
        <p class="text-theme-surface-700">
          {{ element.description }}
        </p>
        <div v-if="element.exercices?.length" class="flex flex-col gap-2">
          <p class="text-theme-surface-700">
            Exemples d'exercices :
          </p>
          <ul class="text-theme-surface-600 list-inside list-disc">
            <li v-for="exercice in element.exercices" :key="exercice">{{ exercice }}</li>
          </ul>
        </div>
      </div>
    </Panel>

    <DraggableProgramElements
      v-if="element.children?.length > 0 || reorderMode"
      v-model:elements="element.children"
      class="ml-4 md:ml-8"
      :class="reorderMode && '!mt-0'"
      :parent-id="element.id"
      :reorder-mode
    />
  </div>

  <!-- Edition card -->
  <Card v-else>
    <template #content>
      <div class="flex flex-col gap-4">
        <FormContainer input-id="name" title="Nom">
          <InputText id="name" v-model="element.name" />
        </FormContainer>

        <FormContainer input-id="description" title="Description">
          <InputText id="description" v-model="element.description" />
        </FormContainer>

        <div class="mt-4 flex justify-end gap-2">
          <Button
            icon="i-ci-close-md"
            label="Annuler"
            severity="secondary"
            variant="outlined"
            @click="cancelEdit()"
          />
          <Button
            icon="i-ci-check"
            label="Enregistrer"
            variant="outlined"
            @click="saveEdit"
          />
        </div>
      </div>
    </template>
  </Card>
</template>
