<script setup lang="ts">
const props = defineProps<{
  child: IChild
}>()

const loading = ref(false)

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
  <BaseMenu ref="menuRef" :model="menuActionsOptions" />

  <Button
    icon="i-ci-chevron-down"
    label="Exporter"
    :loading
    outlined
    severity="success"
    @click="toggleMenu"
  />
</template>
