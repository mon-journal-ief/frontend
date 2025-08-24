<script setup lang="ts">
const props = defineProps<{
  childId: string
  programId: string
  entry?: IJournalEntry // If provided, we're editing
}>()

const emit = defineEmits<{
  addEntry: [entry: IJournalEntry]
  updateEntry: [entry: IJournalEntry]
}>()

const visible = defineModel<boolean>({ required: true })

const isEditing = computed(() => !!props.entry)

// Initialize form data
const date = ref<Date>(props.entry ? new Date(props.entry.date) : new Date())
const comment = ref(props.entry?.comment || '')
const images = ref<string[]>(props.entry?.images || [])
const childId = ref<string>(props.childId)
const validatedElements = ref<IProgramElement[]>(props.entry?.validatedElements || [])

const childrenOptions = ref<IChild[]>([])
const programElementsOptions = ref<IProgramElement[]>([])
const filteredProgramElements = ref<IProgramElement[]>([])

onMounted(async () => {
  childrenOptions.value = await api.children.getAll()
  programElementsOptions.value = (await api.program.get(props.programId)).elements
  filteredProgramElements.value = programElementsOptions.value
})

async function handleSubmit() {
  if (!date.value || !comment.value.trim()) return

  if (isEditing.value) {
    // Update existing entry
    const updatedEntry = await api.journalEntry.update(props.entry!.id, {
      date: date.value,
      comment: comment.value,
      images: images.value,
      validatedElementIds: validatedElements.value.map(element => element.id),
    })
    emit('updateEntry', updatedEntry)
  }
  else {
    // Create new entry
    const newEntry = await api.journalEntry.create({
      date: date.value,
      comment: comment.value,
      images: images.value,
      childId: childId.value,
      validatedElementIds: validatedElements.value.map(element => element.id),
    })
    emit('addEntry', newEntry)
  }

  visible.value = false
}

// Handle file upload (convert to base64 or upload and get URLs)
function handleFileUpload(event: { files: File[] }) {
  // Example: just push file names for now
  for (const file of event.files) {
    images.value.push(file.name)
  }
}

function search(event: any) {
  filteredProgramElements.value = programElementsOptions.value.filter(element =>
    element.name.toLowerCase().includes(event.query.toLowerCase()),
  )
}
</script>

<template>
  <BaseDialog v-model="visible">
    <template #header>
      <h2 class="text-2xl font-bold">
        {{ isEditing ? 'Modifier l\'entrée de journal' : 'Ajouter une entrée de journal' }}
      </h2>
    </template>

    <div class="flex flex-col gap-4">
      <FormContainer input-id="date" title="Date *">
        <DatePicker
          id="date"
          v-model="date"
          date-format="dd/mm/yy"
          placeholder="Sélectionnez la date de l'entrée"
          show-icon
        />
      </FormContainer>

      <FormContainer input-id="child" title="Enfant *">
        <Select
          id="child"
          v-model="childId"
          option-label="name"
          option-value="id"
          :options="childrenOptions"
          placeholder="Sélectionner un enfant"
        />
      </FormContainer>

      <FormContainer input-id="validatedElements" title="Éléments du programme travaillés">
        <AutoComplete
          id="validatedElements"
          v-model="validatedElements"
          dropdown
          dropdown-mode="current"
          empty-search-message="Aucun élément du programme trouvé"
          force-selection
          multiple
          option-label="name"
          placeholder="Rechercher dans le programme"
          :suggestions="filteredProgramElements"
          @complete="search"
        />
      </FormContainer>

      <FormContainer input-id="comment" title="Commentaire *">
        <Textarea
          id="comment"
          v-model="comment"
          auto-resize
          placeholder="Ex: Lecture de 30min, exercices de math p.24-25, expérience sur les volcans..."
        />
      </FormContainer>

      <FormContainer input-id="images" title="Images">
        <FileUpload
          id="images"
          accept="image/*"
          choose-label="Ajouter des images"
          class="my-4"
          custom-upload
          mode="basic"
          multiple
          @select="handleFileUpload"
        />
      </FormContainer>
    </div>

    <template #footer>
      <Button label="Annuler" severity="secondary" @click="visible = false" />
      <Button
        :disabled="!date || !comment.trim()"
        :label="isEditing ? 'Modifier' : 'Ajouter'"
        @click="handleSubmit"
      />
    </template>
  </BaseDialog>
</template>
