<script setup lang="ts">
const props = defineProps<{
  child: IChild
}>()

const showEditDialog = ref(false)
const loading = ref(false)

function handleEditChild() {
  showEditDialog.value = true
}

const confirm = useConfirm()
function confirmDeleteChild() {
  confirm.require({
    header: 'Retirer cet enfant ?',
    message: 'Cet enfant sera retiré de votre compte. Cette action est irréversible.',
    icon: 'i-ci-triangle-warning text-theme-red-600',
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

const router = useRouter()
const userStore = useUserStore()
async function deleteChild() {
  await api.children.remove(props.child.id)
  router.push('/enfants')
  userStore.fetchSelectedChild()
}

async function exportJournal(type: 'pdf' | 'word') {
  try {
    loading.value = true
    if (type === 'pdf') {
      await api.export.exportToPDF(props.child)
    }
    else {
      await api.export.exportToWord(props.child)
    }
  }
  finally {
    loading.value = false
  }
}

const menuRef = ref()
function toggleMenu(event: Event) {
  menuRef.value.toggle(event)
}

const menuActionsOptions = ref([
  {
    label: 'Exporter en PDF',
    icon: 'i-ci-file-pdf',
    command: async () => await exportJournal('pdf'),
  },
  { separator: true },
  {
    label: 'Exporter en Word',
    icon: 'i-ci-file-document',
    command: async () => await exportJournal('word'),
  },
])
</script>

<template>
  <DialogChildForm
    v-if="showEditDialog"
    v-model:visible="showEditDialog"
    :child="props.child"
  />

  <BaseDialog v-model="loading">
    <template #header> Export en cours... </template>
    <CustomSpinner class="mx-auto size-16" />
  </BaseDialog>

  <BaseMenu ref="menuRef" :model="menuActionsOptions" />

  <div class="flex items-center self-start">
    <!-- Export -->
    <Button
      class="p-0"
      icon="i-ci-share-ios-export !text-xl"
      :loading
      severity="secondary"
      variant="text"
      @click.stop="toggleMenu"
    />

    <!-- Edit -->
    <Button
      class="p-0"
      icon="i-ci-edit !text-xl"
      severity="secondary"
      variant="text"
      @click.stop="handleEditChild"
    />

    <!-- Delete -->
    <Button
      class="p-0"
      icon="i-ci-trash-full !text-xl"
      severity="secondary"
      variant="text"
      @click.stop="confirmDeleteChild"
    />
  </div>
</template>
