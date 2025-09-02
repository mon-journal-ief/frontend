<script setup lang="ts">
const props = defineProps<{
  element: IProgramElement
}>()

const emits = defineEmits<{
  remove: []
}>()

const visible = defineModel<boolean>('visible', { required: true })

const selectedParent = ref<IProgramElement | null>(null)
const filteredProgramElements = ref<IProgramElement[]>([])

const name = ref(props.element.name)
const description = ref(props.element.description)
const programElementsOptions = ref<IProgramElement[]>([])

onMounted(async () => {
  programElementsOptions.value = (await api.program.get(props.element.programId)).elements
  filteredProgramElements.value = programElementsOptions.value
})

const userStore = useUserStore()
async function handleSubmit() {
  await api.programElement.update(props.element.id, {
    ...props.element,
    name: name.value,
    description: description.value,
    parentId: selectedParent.value?.id || undefined,
  })

  userStore.fetchUser()
  userStore.fetchSelectedChild()
  visible.value = false
}

function searchParent(event: any) {
  filteredProgramElements.value = programElementsOptions.value.filter(element =>
    element.name.toLowerCase().includes(event.query.toLowerCase()),
  )
}

const confirm = useConfirm()
function confirmDelete() {
  if (!props.element) return

  confirm.require({
    header: 'Supprimer cet élément ?',
    // TODO: add a checkbox to allow deleting the associated journal entries
    message: 'Cette action est irréversible. Les entrées associées à cet élément ne seront pas supprimées.',
    icon: 'i-ci-circle-warning',
    acceptProps: {
      severity: 'danger',
      label: 'Supprimer',
    },
    rejectProps: {
      severity: 'secondary',
      label: 'Annuler',
      outlined: true,
    },
    accept: async () => {
      if (props.element) {
        await api.programElement.remove(props.element.id)
        emits('remove')
        visible.value = false
      }
    },
  })
}
</script>

<template>
  <BaseDialog v-model="visible">
    <template #header>
      <h2 class="text-2xl font-bold">
        Modifier l'élément de programme
      </h2>
    </template>

    <div class="flex flex-col gap-4">
      <FormContainer input-id="name" title="Nom *">
        <InputText
          id="name"
          v-model="name"
          placeholder="Nom"
          @keyup.enter="handleSubmit"
        />
      </FormContainer>

      <FormContainer input-id="description" title="Description">
        <InputText
          id="description"
          v-model="description"
          placeholder="Description (optionnel)"
          @keyup.enter="handleSubmit"
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

      <FormContainer class="mt-12" title="Actions">
        <Button
          class="w-fit"
          icon="i-ci-trash-full"
          label="Supprimer"
          severity="danger"
          variant="outlined"
          @click="confirmDelete"
        />
      </FormContainer>
    </div>

    <template #footer>
      <Button label="Annuler" severity="secondary" @click="visible = false" />
      <Button label="Valider" @click="handleSubmit" />
    </template>
  </BaseDialog>
</template>
