<script setup lang="ts">
import { mockExportData } from '@/utils/mockExportData'
import ExportTableOfContents from '@/components/export/ExportTableOfContents.vue'
import ExportJournalEntry from '@/components/export/ExportJournalEntry.vue'

declare global {
  interface Window {
    pdfData?: {
      child: IChild
      journalEntries: IJournalEntry[]
    }
  }
}

const isDev = import.meta.env.MODE === 'development' || import.meta.env.DEV

// Data will be injected by Playwright or use mock data in development
const child = ref<IChild>()
const journalEntries = ref<IJournalEntry[]>([])
const loading = ref(true)
const error = ref<string>()

const config = ref({
  pages: {
    cover: {
      display: true,
      progress: true,
      progressLegend: true,
      generationDate: true,
      picture: true,
    },
    tableOfContents: true,
    programElementsReference: true,
  },
  journalEntries: {
    showComments: true,
    showValidatedElements: true,
    showImages: true,
  },
  footer: true,
  numbering: true,
})

onMounted(async () => {
  // In development mode, use mock data automatically
  if (isDev) {
    child.value = mockExportData.child
    journalEntries.value = mockExportData.journalEntries
    loading.value = false
    console.warn('⚗️ Development mode: Using mock export data')

    return
  }

  // Check if data is already available (injected by Playwright)
  if (window.pdfData) {
    child.value = window.pdfData.child
    journalEntries.value = window.pdfData.journalEntries
    loading.value = false

    return
  }

  // Listen for data injection from Playwright
  function handlePdfDataReady(event: Event) {
    const customEvent = event as CustomEvent
    child.value = customEvent.detail.child
    journalEntries.value = customEvent.detail.journalEntries
    loading.value = false
  }

  window.addEventListener('pdfDataReady', handlePdfDataReady)

  // Fallback: if no data is injected within 5 seconds, show error
  setTimeout(() => {
    if (loading.value) {
      error.value = 'Aucune donnée reçue'
      loading.value = false
    }
  }, 5000)

  // Cleanup event listener
  onUnmounted(() => {
    window.removeEventListener('pdfDataReady', handlePdfDataReady)
  })
})
</script>

<template>
  <div v-if="loading" class="text-surface-800">
    <CustomSpinner />
    <p>Chargement des données du journal...</p>
  </div>

  <div v-else-if="error" class="text-surface-800">
    <div class="py-10 text-center text-red-600">
      <p>{{ error }}</p>
    </div>
  </div>

  <div v-else-if="child" id="pdf-container" class="text-surface-800">
    <!-- Cover Page -->
    <ExportCover
      v-if="config.pages.cover"
      :child
      :config="config.pages.cover"
    />

    <!-- Table of Contents -->
    <ExportTableOfContents
      v-if="config.pages.tableOfContents"
      :config
      :journal-entries-count="journalEntries.length"
    />

    <!-- Journal Entries -->
    <div v-if="journalEntries.length > 0" class="mt-8 break-before-page">
      <div class="mb-8 text-center">
        <div class="text-4xl font-bold text-surface-800">
          Entrées du journal
        </div>
      </div>

      <ExportJournalEntry
        v-for="(entry, index) in journalEntries"
        :key="entry.id"
        :config="config.journalEntries"
        :entry
        :index
      />
    </div>

    <!-- Footer -->
    <div class="mt-10 border-t border-surface-200 pt-5 text-center text-xs text-surface-400">
      Généré le {{ new Date().toLocaleString('fr-FR') }}
    </div>
  </div>

  <div v-else class="text-surface-800">
    <div class="py-10 text-center text-surface-500">
      <p>Aucune donnée disponible</p>
    </div>
  </div>
</template>
