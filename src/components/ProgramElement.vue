<script setup lang="ts">
withDefaults(defineProps<{ reorderMode?: boolean }>(), {
  reorderMode: false,
})

const emit = defineEmits<{
  remove: []
}>()
const uiStore = useUIStore()
const { isModifyMode, isMobile } = storeToRefs(uiStore)

const element = defineModel<IProgramElement>({ required: true })

// Ensure children is always an array. This fixes a bug where newly created elements
// would not be draggable. I'd like to find a better solution.
watchEffect(() => {
  if (!element.value.children) {
    element.value.children = []
  }
})

// Check if this is an element being created
const isNewElement = computed(() => element.value.id.startsWith('temp-'))

const editMode = ref(isNewElement.value) // Start in edit mode for new elements

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
  if (isNewElement.value) {
    emit('remove')

    return
  }

  element.value.name = originalData.value.name
  element.value.description = originalData.value.description
  editMode.value = false
}

async function saveEdit() {
  if (isNewElement.value) {
    const newElement = await api.programElement.create({
      name: element.value.name,
      description: element.value.description,
      programId: element.value.programId,
    })

    if (newElement) {
      element.value = newElement
    }
  }
  else {
    await api.programElement.update(element.value.id, element.value)
  }

  editMode.value = false
}
</script>

<template>
  <Panel v-if="!editMode" toggleable>
    <template #header>
      <div class="group flex w-full justify-between">
        <div class="flex items-center gap-2">
          <i v-if="reorderMode" class="drag-handle i-ci-hamburger-md mr-3 flex cursor-grab select-none items-center self-center pr-1 text-2xl" />
          <h3>{{ element.name }}</h3>
          <Badge
            v-if="element.journalEntries?.length > 0"
            v-tooltip.top="`${element.journalEntries?.length} entrée${element.journalEntries?.length > 1 ? 's' : ''} associée${element.journalEntries?.length > 1 ? 's' : ''}`"
            severity="info"
            :value="element.journalEntries?.length"
          />
        </div>

        <ProgramElementActions
          v-if="isMobile ? isModifyMode : true"
          :class="[
            !isMobile && 'transition-opacity duration-300',
            isModifyMode && isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
          ]"
          :element
          @remove="emit('remove')"
          @start-edit="startEdit"
        />
      </div>
    </template>

    <div class="flex justify-between gap-2">

      <p v-if="element.description" class="text-surface-500">
        {{ element.description }}
      </p>

    </div>

    <DraggableProgramElements
      v-if="element.children?.length > 0 || reorderMode"
      v-model:elements="element.children"
      class="ml-8 mt-4"
      :parent-id="element.id"
      :reorder-mode
    />
  </Panel>

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
