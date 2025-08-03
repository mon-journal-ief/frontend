<script setup lang="ts">
declare global {
  interface Window {
    pdfData?: {
      child: IChild
      journalEntries: IJournalEntry[]
    }
  }
}

// Data will be injected by Playwright
const child = ref<IChild>()
const journalEntries = ref<IJournalEntry[]>([])
const loading = ref(true)
const error = ref<string>()

onMounted(async () => {
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

function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString('fr-FR')
}

function formatDateTime(date: Date | string) {
  return new Date(date).toLocaleString('fr-FR')
}
</script>

<template>
  <div v-if="loading" class="text-theme-gray-800 mx-auto p-10 print:p-5">
    <ProgressSpinner />
    <p>Chargement des données du journal...</p>
  </div>

  <div v-else-if="error" class="text-theme-gray-800 mx-auto p-10 print:p-5">
    <div class="text-theme-red-600 py-10 text-center">
      <p>{{ error }}</p>
    </div>
  </div>

  <div v-else-if="child" id="pdf-container" class="text-theme-gray-800 mx-auto p-10 print:p-5">
    <!-- Header -->
    <div class="mb-10 border-b-4 border-indigo-600 pb-5 text-center">
      <h1 class="mb-2 text-3xl font-bold text-indigo-600">Journal des apprentissages</h1>
    </div>

    <!-- Child Information -->
    <div class="bg-theme-surface-50 mb-8 rounded-lg border-l-4 border-emerald-500 p-5">
      <h2 class="text-theme-gray-800 mb-3 text-lg font-semibold">Informations de l'enfant</h2>
      <div class="grid grid-cols-2 gap-3">
        <div class="text-sm">
          <span class="text-theme-gray-600 font-semibold">Nom :</span>
          {{ child.name }}{{ child.lastName ? ` ${child.lastName}` : '' }}
        </div>
        <div v-if="child.age" class="text-sm">
          <span class="text-theme-gray-600 font-semibold">Âge :</span> {{ child.age }} ans
        </div>
        <div v-if="child.gender" class="text-sm">
          <span class="text-theme-gray-600 font-semibold">Genre :</span> {{ child.gender }}
        </div>
        <div class="text-sm">
          <span class="text-theme-gray-600 font-semibold">Date d'export :</span> {{ formatDate(new Date()) }}
        </div>
        <div class="text-sm">
          <span class="text-theme-gray-600 font-semibold">Nombre d'entrées :</span> {{ journalEntries.length }}
        </div>
      </div>
    </div>

    <!-- Journal Entries -->
    <div class="mt-8">
      <div
        v-for="(entry, index) in journalEntries"
        :key="entry.id"
        class="mb-8 break-inside-avoid rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
      >
        <div class="mb-4 flex items-center justify-between border-b border-gray-100 pb-3">
          <div class="text-base font-bold text-indigo-600">Entrée {{ index + 1 }}</div>
          <div v-if="entry.date" class="text-sm text-gray-500">
            {{ formatDate(entry.date) }}
          </div>
        </div>

        <div class="mb-4">
          <!-- Comment -->
          <div v-if="entry.comment" class="mb-4">
            <div class="text-theme-gray-600 mb-2 text-sm font-semibold">Commentaires :</div>
            <div class="rounded border-l-4 border-amber-400 bg-amber-50 p-3 text-sm ">{{ entry.comment }}</div>
          </div>

          <!-- Validated Elements -->
          <div v-if="entry.validatedElements?.length > 0" class="mb-4">
            <div class="text-theme-gray-600 mb-2 text-sm font-semibold">Éléments validés :</div>
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
            <div class="bg-theme-blue-50 rounded border-l-4 border-blue-400 p-2 text-xs text-blue-800">
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
      Généré le {{ formatDateTime(new Date()) }}
    </div>
  </div>

  <div v-else class="text-theme-gray-800 mx-auto p-10 print:p-5">
    <div class="py-10 text-center text-gray-500">
      <p>Aucune donnée disponible</p>
    </div>
  </div>
</template>
