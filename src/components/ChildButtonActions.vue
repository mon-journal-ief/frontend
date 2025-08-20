<script setup lang="ts">
const props = defineProps<{
  child: IChild
}>()

const emits = defineEmits<{
  refresh: []
}>()

const showEditDialog = ref(false)

function handleEditChild() {
  showEditDialog.value = true
}

const confirm = useConfirm()
function confirmDeleteChild() {
  confirm.require({
    header: 'Retirer cet enfant ?',
    message: 'Cet enfant sera retiré de votre compte.',
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
      deleteChild()
    },
  })
}

async function deleteChild() {
  await api.children.remove(props.child.id)
  emits('refresh')
}

const menuRef = ref()
function toggleMenu(event: Event) {
  menuRef.value.toggle(event)
}

const menuActionsOptions = ref([
  {
    label: 'Modifier',
    icon: 'i-ci-edit-pencil-01',
    command: () => handleEditChild(),
  },
  { separator: true },
  {
    label: 'Supprimer',
    icon: 'i-ci-trash-full',
    command: () => confirmDeleteChild(),
    class: 'text-red-500 hover:text-red-600',
  },
])
</script>

<template>
  <DialogChildForm
    v-if="showEditDialog"
    v-model:visible="showEditDialog"
    :child="props.child"
    @refresh="emits('refresh')"
  />

  <BaseMenu ref="menuRef" :model="menuActionsOptions" />

  <Button
    icon="i-ci-more-horizontal"
    outlined
    rounded
    severity="secondary"
    @click.stop="toggleMenu"
  />
</template>
