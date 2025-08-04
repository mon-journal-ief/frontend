<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

import { useHeaderHeight } from '@/composables/useHeaderHeight'

const emit = defineEmits<{
  toggleSidebar: []
}>()

const breakpoints = useBreakpoints(breakpointsTailwind)
const isDesktopView = ref(breakpoints.md.value)
watch(breakpoints.md, (value: boolean) => {
  isDesktopView.value = value
})
const isDialogVisible = ref(false)

const headerRef = ref<HTMLElement>()
const { setHeaderHeight } = useHeaderHeight()

function updateHeaderHeight() {
  if (!headerRef.value) return

  setHeaderHeight(headerRef.value.offsetHeight)
}

onMounted(() => {
  updateHeaderHeight()
  window.addEventListener('resize', updateHeaderHeight)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateHeaderHeight)
})

const userStore = useUserStore()

const loading = ref({
  pdf: false,
  word: false,
})
async function exportToPDF() {
  const child = userStore.user!.children[1]!
  try {
    loading.value.pdf = true
    await api.export.exportToPDF(child.id, child.name)
  }
  finally {
    loading.value.pdf = false
  }
}

async function exportToWord() {
  const child = userStore.user!.children[1]!
  try {
    loading.value.word = true
    await api.export.exportToWord(child.id, child.name)
  }
  finally {
    loading.value.word = false
  }
}
</script>

<template>
  <div ref="headerRef" class="bg-theme-surface-50 sticky top-0 z-20 flex w-full justify-between">
    <DialogAddEntry v-model="isDialogVisible" />

    <div class="flex w-full flex-col">
      <div class="flex flex-row justify-between gap-2 p-4 md:gap-4">
        <div class="flex items-center gap-2 md:gap-4">
          <!-- BURGER -->
          <i class="text-theme-primary-700 i-ci-hamburger-md my-auto cursor-pointer text-4xl md:hidden" @click="emit('toggleSidebar')" />

        </div>

        <div class="flex gap-2 md:gap-4">
          <Button
            icon="i-ci-plus"
            label="Ajouter une entrée"
            severity="secondary"
            variant="outlined"
            @click="isDialogVisible = true"
          />

          <Button
            icon="i-ci-file-pdf"
            label="Exporter en PDF"
            :loading="loading.pdf"
            severity="success"
            @click="exportToPDF"
          />

          <Button
            icon="i-ci-file-document"
            label="Exporter en Word"
            :loading="loading.word"
            severity="success"
            @click="exportToWord"
          />

          <div class="flex items-center gap-2 md:gap-4">
            <TheHeaderButtonDarkMode />

            <TheHeaderButtonProfile />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
