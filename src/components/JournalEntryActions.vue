<script setup lang="ts">
const props = defineProps<{
  entry: IJournalEntry
  programId: string
  childId: string
}>()

const emit = defineEmits<{
  refresh: []
}>()

const showEditDialog = ref(false)

function handleEditEntry() {
  showEditDialog.value = true
}

function handleUpdateEntry() {
  emit('refresh')
}

const confirm = useConfirm()
function confirmDeleteEntry() {
  confirm.require({
    header: 'Supprimer cette entrée ?',
    message: 'Cette entrée de journal sera définitivement supprimée.',
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
      await api.journalEntry.remove(props.entry.id)
      emit('refresh')
    },
  })
}
</script>

<template>
  <DialogJournalEntryForm
    v-if="programId && showEditDialog"
    v-model="showEditDialog"
    :child-id
    :entry
    :program-id
    @update-entry="handleUpdateEntry"
  />

  <Button
    class="p-1"
    icon="i-ci-edit !text-2xl"
    severity="secondary"
    size="small"
    variant="text"
    @click.stop="handleEditEntry"
  />
  <Button
    class="p-1"
    icon="i-ci-trash-full !text-2xl"
    severity="secondary"
    size="small"
    variant="text"
    @click.stop="confirmDeleteEntry"
  />
</template>
