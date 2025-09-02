<script setup lang="ts">
const props = defineProps<{
  programId: string
}>()

const emit = defineEmits<{
  addElement: [element: IProgramElement]
}>()

const visible = defineModel<boolean>({ required: true })

const name = ref('')
const description = ref('')
const selectedParent = ref<IProgramElement | null>(null)

const programElementsOptions = ref<IProgramElement[]>([])
const filteredProgramElements = ref<IProgramElement[]>([])

onMounted(async () => {
  programElementsOptions.value = (await api.program.get(props.programId)).elements
  filteredProgramElements.value = programElementsOptions.value
})

function resetForm() {
  name.value = ''
  description.value = ''
  selectedParent.value = null
}

async function handleAddElement() {
  if (!name.value.trim()) return

  const element = await api.programElement.create({
    name: name.value.trim(),
    description: description.value.trim(),
    programId: props.programId,
    parentId: selectedParent.value?.id || undefined,
  })

  if (element) {
    emit('addElement', element)
    visible.value = false
    resetForm()
  }
}

function searchParent(event: any) {
  filteredProgramElements.value = programElementsOptions.value.filter(element =>
    element.name.toLowerCase().includes(event.query.toLowerCase()),
  )
}

// Reset form when dialog opens
watch(visible, (isVisible) => {
  if (isVisible) {
    resetForm()
  }
})
</script>

<template>
  <BaseDialog v-model="visible">
    <template #header>
      <h2 class="text-2xl font-bold">
        Ajouter un élément de programme
      </h2>
    </template>

    <div class="flex flex-col gap-4">
      <FormContainer input-id="name" title="Nom *">
        <InputText
          id="name"
          v-model="name"
          placeholder="Nom de l'élément"
        />
      </FormContainer>

      <FormContainer input-id="description" title="Description">
        <InputText
          id="description"
          v-model="description"
          placeholder="Description (optionnelle)"
        />
      </FormContainer>

      <FormContainer input-id="parent" title="Élément parent">
        <AutoComplete
          id="parent"
          v-model="selectedParent"
          dropdown
          dropdown-mode="current"
          empty-search-message="Aucun élément parent trouvé"
          force-selection
          option-label="name"
          placeholder="Rechercher un élément parent (optionnel)"
          :suggestions="filteredProgramElements"
          @complete="searchParent"
        />
      </FormContainer>
    </div>

    <template #footer>
      <Button label="Annuler" severity="secondary" @click="visible = false" />
      <Button
        :disabled="!name.trim()"
        label="Ajouter"
        @click="handleAddElement"
      />
    </template>
  </BaseDialog>
</template>
