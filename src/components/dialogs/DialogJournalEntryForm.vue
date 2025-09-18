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

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

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
const loadingSuggestion = ref(false)
const showDialogAiOnboarding = ref(false)

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

async function handleSuggestion() {
  if (!comment.value.trim()) return

  loadingSuggestion.value = true
  try {
    validatedElements.value = await api.journalEntry.getSuggestion({ comment: comment.value.trim(), childId: childId.value })
  }
  finally {
    loadingSuggestion.value = false
  }
}

onMounted(async () => {
  childrenOptions.value = await api.children.getAll()
  programElementsOptions.value = (await api.program.get(props.programId)).elements
  filteredProgramElements.value = programElementsOptions.value
})
</script>

<template>
  <BaseDialog v-model="visible">
    <template #header>
      <h2 class="text-2xl font-bold">
        {{ isEditing ? 'Modifier l\'entrée de journal' : 'Ajouter une entrée de journal' }}
      </h2>
    </template>

    <DialogAiOnboarding v-if="showDialogAiOnboarding" v-model="showDialogAiOnboarding" />

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

      <FormContainer input-id="comment" title="Commentaire *">
        <Textarea
          id="comment"
          v-model="comment"
          auto-resize
          placeholder="Ex: Lecture de 30min, exercices de math p.24-25, expérience sur les volcans..."
        />
      </FormContainer>

      <FormContainer input-id="validatedElements" title="Éléments du programme travaillés">
        <div class="flex w-full items-center justify-between  gap-4">
          <AutoComplete
            id="validatedElements"
            v-model="validatedElements"
            class="w-full"
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

          <!-- Onboarding button -->
          <IconSparkles
            v-if="!user!.aiSuggestionsEnabled && !user!.aiOnboardingShown"
            class="hover:text-theme-yellow-600 animate-ai-sparkle size-12 cursor-pointer text-yellow-500"
            @click="showDialogAiOnboarding = true"
          />

          <!-- Actual suggestion button -->
          <IconSparkles
            v-else-if="user!.aiSuggestionsEnabled && !loadingSuggestion"
            v-tooltip.top="comment.trim() ? '' : 'Écrivez un commentaire pour utiliser les suggestions'"
            class="size-8"
            :class="comment.trim() ? 'cursor-pointer text-yellow-500 hover:text-theme-yellow-600' : 'text-theme-surface-400'"
            @click="handleSuggestion"
          />
          <CustomSpinner v-else-if="loadingSuggestion" class="size-8 !fill-yellow-500" />
        </div>
      </FormContainer>

      <FormContainer input-id="images" title="Images">
        <FileUpload
          v-if="!loadingUpload"
          id="images"
          accept="image/*"
          :choose-button-props="{ class: 'p-button-secondary' }"
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
        <div class="flex cursor-pointer items-center gap-2">
          <Checkbox
            v-if="!isEditing"
            v-model="continueCreating"
            binary
            input-id="continueCreating"
          />
          <label class="text-theme-surface-600" for="continueCreating"> Continuer d'ajouter des entrées </label>
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

<style scoped>
@keyframes ai-sparkle {
  0%, 100% {
    transform: scale(1);
    filter: drop-shadow(0 0 2px rgba(234, 179, 8, 0.4));
  }
  50% {
    transform: scale(1.3);
    filter: drop-shadow(0 0 8px rgba(234, 179, 8, 0.6));
  }
}

.animate-ai-sparkle {
  animation: ai-sparkle 2s ease-in-out infinite;
}

.animate-ai-sparkle:hover {
  animation-play-state: paused;
}
</style>
