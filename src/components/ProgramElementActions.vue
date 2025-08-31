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
  <div class="flex items-center">
    <Button
      v-tooltip.top="element.isValidated ? 'Marquer comme non validé' : 'Marquer comme validé'"
      class="p-0"
      :icon="element.isValidated ? 'i-ci-close-md !text-xl' : 'i-ci-check !text-2xl'"
      :severity="element.isValidated ? 'secondary' : 'success'"
      variant="text"
      @click="emit('validate')"
    />
    <Button
      class="p-0"
      icon="i-ci-edit !text-xl"
      severity="secondary"
      variant="text"
      @click="emit('startEdit')"
    />
    <Button
      class="p-0"
      icon="i-ci-trash-full !text-xl"
      severity="secondary"
      variant="text"
      @click="confirmDelete"
    />
  </div>
</template>
