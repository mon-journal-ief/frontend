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
const continueCreating = ref(false)

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

  if (continueCreating.value) {
    comment.value = ''
    images.value = []
    validatedElements.value = []
  }
  else {
    visible.value = false
  }
}

const loadingUpload = ref(false)
const loadingDelete = ref(false)
// Handle file upload - upload files to server and get URLs
async function handleFileUpload(event: { files: File[] }) {
  loadingUpload.value = true
  try {
    const uploadPromises = event.files.map(async (file) => {
      const result = await api.upload.uploadJournalEntryImage(file, props.entry?.id)
      if (result) images.value.push(result.url)
    })

    await Promise.all(uploadPromises)
    toast.success('Ajout d\'images', `${event.files.length} images ajoutées`)
  }
  finally {
    loadingUpload.value = false
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
          :pt="{ option: { class: 'whitespace-normal' }, overlay: { class: '!max-w-1' } }"
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
          v-if="!loadingUpload"
          id="images"
          accept="image/*"
          choose-label="Ajouter des images"
          class="my-4"
          custom-upload
          mode="basic"
          multiple
          upload-label="Envoyer"
          @select="handleFileUpload"
        />
        <CustomSpinner v-else class="m-auto min-h-16" />

        <div v-if="images.length" class="mt-8 flex flex-wrap gap-4">
          <ImageWithDelete
            v-for="image in images"
            :key="image"
            v-model:images="images"
            v-model:loading="loadingDelete"
            :src="image"
          />
        </div>
      </FormContainer>
    </div>

    <template #footer>
      <div class="flex w-full items-center justify-between gap-2">
        <div class="flex items-center gap-2">
          <Checkbox
            v-if="!isEditing"
            v-model="continueCreating"
            binary
            input-id="continueCreating"
          />
          <label class="text-theme-surface-600" for="continueCreating"> Continuer de créer </label>
        </div>

        <div class="flex gap-2">
          <Button label="Annuler" severity="secondary" @click="visible = false" />
          <Button
            :disabled="!date || !comment.trim() || loadingUpload || loadingDelete"
            :label="isEditing ? 'Valider' : 'Ajouter'"
            :loading="loadingUpload"
            @click="handleSubmit"
          />
        </div>
      </div>
    </template>
  </BaseDialog>
</template>
