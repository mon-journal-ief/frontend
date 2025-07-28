<script setup lang="ts">
const props = defineProps<{
  childId?: string
}>()

const emit = defineEmits<{
  (e: 'addEntry', entry: IJournalEntry): void
}>()

const visible = defineModel<boolean>({ required: true })
const api = useApi()

const date = ref<Date>()
const comment = ref('')
const images = ref<string[]>([])
const childId = ref<string | undefined>(props.childId)
const validatedElements = ref<IProgramElement[]>([])

const childrenOptions = ref<IChild[]>([])
const programElementsOptions = ref<IProgramElement[]>([])

onMounted(async () => {
  childrenOptions.value = await api.children.getAll()
  programElementsOptions.value = await api.programElement.getAll()
})

async function handleAddEntry() {
  if (!childId.value) return

  const entry = await api.journalEntry.create({
    date: date.value,
    comment: comment.value,
    images: images.value,
    childId: childId.value,
    validatedElementIds: validatedElements.value.map(element => element.id),
  })

  emit('addEntry', entry)
  visible.value = false
}

// Handle file upload (convert to base64 or upload and get URLs)
function handleFileUpload(event: { files: File[] }) {
  // Example: just push file names for now
  for (const file of event.files) {
    images.value.push(file.name)
  }
}
</script>

<template>
  <BaseDialog v-model="visible">
    <template #header>
      <h2 class="text-2xl font-bold">
        Ajouter une entrée de journal
      </h2>
    </template>

    <div class="flex flex-col gap-4">
      <FormContainer input-id="date" title="Date">
        <Calendar
          id="date"
          v-model="date"
          date-format="dd/mm/yy"
          placeholder="Sélectionnez la date de l'entrée"
          show-icon
        />
      </FormContainer>

      <FormContainer input-id="child" title="Enfant *">
        <Dropdown
          id="child"
          v-model="childId"
          option-label="name"
          option-value="id"
          :options="childrenOptions"
          placeholder="Sélectionner un enfant"
        />
      </FormContainer>

      <FormContainer input-id="validatedElements" title="Éléments validés">
        <MultiSelect
          id="validatedElements"
          v-model="validatedElements"
          display="chip"
          option-label="name"
          :options="programElementsOptions"
          placeholder="Sélectionner des éléments"
        />
      </FormContainer>

      <FormContainer input-id="comment" title="Commentaire">
        <Textarea
          id="comment"
          v-model="comment"
          auto-resize
          placeholder="Commentaire"
        />
      </FormContainer>

      <FormContainer input-id="images" title="Images">
        <FileUpload
          id="images"
          accept="image/*"
          choose-label="Ajouter des images"
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
        :disabled="!childId || (!validatedElements.length && !comment)"
        label="Ajouter"
        @click="handleAddEntry"
      />
    </template>
  </BaseDialog>
</template>
