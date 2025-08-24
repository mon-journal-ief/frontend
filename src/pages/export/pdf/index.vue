<script setup lang="ts">
import { mockExportData } from '@/utils/mockExportData'
import ExportTableOfContents from '@/components/export/ExportTableOfContents.vue'

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
  <div v-if="loading" class="text-gray-800">
    <CustomSpinner />
    <p>Chargement des données du journal...</p>
  </div>

  <div v-else-if="error" class="text-gray-800">
    <div class="py-10 text-center text-red-600">
      <p>{{ error }}</p>
    </div>
  </div>

  <div v-else-if="child" id="pdf-container" class="text-gray-800">
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
    <div class="mt-8 break-before-page">
      <div
        v-for="(entry, index) in journalEntries"
        :key="entry.id"
        class="mb-8 break-inside-avoid rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
      >
        <div class="mb-4 flex items-center justify-between border-b border-gray-100 pb-3">
          <div class="text-base font-bold text-indigo-600">Entrée {{ index + 1 }}</div>
          <div v-if="entry.date" class="text-sm text-gray-500">
            {{ new Date(entry.date).toLocaleDateString('fr-FR') }}
          </div>
        </div>

        <div class="mb-4">
          <!-- Comment -->
          <div v-if="entry.comment" class="mb-4">
            <div class="mb-2 text-sm font-semibold text-gray-600">Commentaires :</div>
            <div class="rounded border-l-4 border-amber-400 bg-amber-50 p-3 text-sm ">{{ entry.comment }}</div>
          </div>

          <!-- Validated Elements -->
          <div v-if="entry.validatedElements?.length > 0" class="mb-4">
            <div class="mb-2 text-sm font-semibold text-gray-600">Éléments validés :</div>
            <div class="rounded border-l-4 border-emerald-400 bg-emerald-50 p-3">
              <div
                v-for="element in entry.validatedElements"
                :key="element.id"
                class="relative mb-2 pl-4"
              >
                <span class="absolute left-0 font-bold text-emerald-500">✓</span>
                <div class="text-sm font-medium text-emerald-700">{{ element.name }}</div>
                <div v-if="element.description" class="mt-1 text-xs leading-snug text-emerald-600">
                  {{ element.description }}
                </div>
              </div>
            </div>
          </div>

          <!-- Images -->
          <div v-if="entry.images?.length > 0" class="mb-4">
            <div class="rounded border-l-4 border-blue-400 bg-blue-50 p-2 text-xs text-blue-800">
              📷 Images associées : {{ entry.images.length }} fichier(s)
            </div>

            <img
              v-for="image in entry.images"
              :key="image"
              alt="Image"
              :src="image"
            >
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="mt-10 border-t border-gray-200 pt-5 text-center text-xs text-gray-400">
      Généré le {{ new Date().toLocaleString('fr-FR') }}
    </div>
  </div>

  <div v-else class="text-gray-800">
    <div class="py-10 text-center text-gray-500">
      <p>Aucune donnée disponible</p>
    </div>
  </div>
</template>
