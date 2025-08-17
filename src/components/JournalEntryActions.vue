<script setup lang="ts">
const props = defineProps<{
  entry: IJournalEntry
}>()

const emit = defineEmits<{
  refresh: []
}>()

const showEditDialog = ref(false)

function handleEditEntry() {
  showEditDialog.value = true
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
  <!-- TODO: Add DialogJournalEntryForm when modify dialog is created -->

  <Button
    icon="i-ci-edit-pencil-01"
    rounded
    severity="secondary"
    variant="outlined"
    @click.stop="handleEditEntry"
  />
  <Button
    icon="i-ci-trash-full"
    rounded
    severity="danger"
    variant="outlined"
    @click.stop="confirmDeleteEntry"
  />
</template>
