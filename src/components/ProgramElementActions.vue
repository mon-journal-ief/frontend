<script setup lang="ts">
const props = defineProps<{
  element: IProgramElement
}>()

const emit = defineEmits<{
  validate: []
  startEdit: []
  remove: []
}>()

const confirm = useConfirm()
function confirmDelete() {
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
    accept: () => {
      deleteElement()
    },
  })
}

async function deleteElement() {
  await api.programElement.remove(props.element.id)
  emit('remove')
}
</script>

<template>
  <div class="mr-2 flex items-center gap-2">
    <Button
      v-tooltip.top="element.isValidated ? 'Marquer comme non validé' : 'Marquer comme validé'"
      :icon="element.isValidated ? 'i-ci-close-md' : 'i-ci-check'"
      rounded
      :severity="element.isValidated ? 'danger' : 'success'"
      variant="outlined"
      @click="emit('validate')"
    />
    <Button
      icon="i-ci-edit"
      rounded
      severity="secondary"
      variant="outlined"
      @click="emit('startEdit')"
    />
    <Button
      icon="i-ci-trash-full"
      rounded
      severity="danger"
      variant="outlined"
      @click="confirmDelete"
    />
  </div>
</template>
