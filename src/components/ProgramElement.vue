<script setup lang="ts">
withDefaults(defineProps<{ reorderMode?: boolean }>(), {
  reorderMode: false,
})

const emit = defineEmits<{
  remove: []
}>()

const element = defineModel<IProgramElement>({ required: true })

// Check if this is an element being created
const isNewElement = computed(() => element.value.id.startsWith('temp-'))

const editMode = ref(isNewElement.value) // Start in edit mode for new elements

const api = useApi()

const originalData = ref({
  name: element.value.name,
  description: element.value.description,
})

function startEdit(originalName: string, originalDescription: string) {
  originalData.value = {
    name: originalName,
    description: originalDescription,
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
      Object.assign(element.value, newElement)
    }
  }
  else {
    await api.programElement.update(element.value.id, element.value)
  }

  editMode.value = false
}
</script>

<template>
  <Card v-if="!editMode">
    <template #content>
      <div class="group flex justify-between gap-2">

        <div class="flex items-center gap-2">
          <i v-if="reorderMode" class="drag-handle i-ci-hamburger-md mr-3 self-center text-2xl" />

          <div class="flex flex-col">
            <h3>{{ element.name }}</h3>
            <p v-if="element.description" class="text-slate-500">
              {{ element.description }}
            </p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <Button
            class="opacity-0 transition-opacity group-hover:opacity-100"
            icon="i-ci-edit"
            rounded
            severity="secondary"
            variant="outlined"
            @click="startEdit(element.name, element.description)"
          />
        </div>
      </div>

      <DraggableProgramElements
        v-if="element.children.length > 0 || reorderMode"
        v-model:elements="element.children"
        class="ml-8 mt-4"
        :parent-id="element.id"
        :reorder-mode
      />
    </template>
  </Card>

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

<style scoped>
.drag-handle {
  cursor: grab;
  user-select: none;
  padding-right: 4px;
  display: flex;
  align-items: center;
}
</style>
