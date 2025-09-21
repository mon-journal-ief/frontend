<script setup lang="ts">
const selectedChild = defineModel<IChild>({ required: true })

const uiStore = useUIStore()
const { showDialogAddEntry } = storeToRefs(uiStore)

// Search and sort state
const searchQuery = ref('')
const sortOrder = ref<'asc' | 'desc'>('desc')

// Computed property to filter and sort entries
const filteredAndSortedEntries = computed(() => {
  let entries = [...selectedChild.value.journalEntries]

  // Filter by search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim()
    entries = entries.filter((entry) => {
      // Search in comment
      const commentMatch = entry.comment?.toLowerCase().includes(query)

      // Search in program elements (name and description)
      const programElementMatch = entry.validatedElements.some(element =>
        element.name.toLowerCase().includes(query)
        || element.description.toLowerCase().includes(query),
      )

      return commentMatch || programElementMatch
    })
  }

  // Sort entries by date
  entries.sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()

    if (sortOrder.value === 'asc') {
      return dateA - dateB
    }

    return dateB - dateA
  })

  return entries
})

// Toggle sort order
function toggleSortOrder() {
  sortOrder.value = sortOrder.value === 'desc' ? 'asc' : 'desc'
}

function addEntry(entry: IJournalEntry) {
  selectedChild.value.journalEntries.push(entry)
}
</script>

<template>
  <div class="flex flex-1 flex-col gap-4">
    <DialogJournalEntryForm
      v-if="showDialogAddEntry && selectedChild.program"
      v-model="showDialogAddEntry"
      :child-id="selectedChild.id"
      :program-id="selectedChild.program.id"
      @add-entry="addEntry"
    />

    <!-- Controls Row -->
    <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <!-- Add Entry Button -->
      <Button
        class="hidden whitespace-nowrap md:block"
        :fluid="!selectedChild.journalEntries.length"
        icon="i-ci-plus text-lg -mb-1 mr-1"
        label="Ajouter une entrée"
        rounded
        variant="outlined"
        @click="showDialogAddEntry = true"
      />

      <!-- Search and Sort Controls -->
      <div v-if="selectedChild.journalEntries.length" class="flex gap-2">
        <InputText
          v-model="searchQuery"
          class="flex-1 whitespace-nowrap"
          placeholder="Rechercher une entrée"
        />

        <Button
          class="whitespace-nowrap"
          :icon="sortOrder === 'desc' ? 'i-ci-sort-descending' : 'i-ci-sort-ascending'"
          :label="sortOrder === 'desc' ? 'Plus récent' : 'Plus ancien'"
          severity="secondary"
          variant="outlined"
          @click="toggleSortOrder"
        />
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-if="selectedChild.journalEntries.length === 0"
      class="flex h-full flex-col place-items-end items-center justify-end gap-8 text-2xl md:hidden"
    >
      <p> Appuyez ici pour ajouter une entrée</p>
      <i class="i-ci-arrow-down-md animate-bounce text-5xl" />
    </div>

    <!-- No Results State -->
    <div
      v-else-if="filteredAndSortedEntries.length === 0 && searchQuery.trim()"
      class="flex h-full flex-col items-center justify-center gap-4 text-center text-surface-500"
    >
      <i class="i-ci-search text-4xl" />
      <div>
        <p class="text-lg">Aucune entrée trouvée</p>
        <p class="text-sm">Essayez de modifier votre recherche</p>
      </div>
    </div>

    <!-- Entries List -->
    <div v-else class="flex-1 overflow-y-auto">
      <Accordion
        collapse-icon="i-ci-caret-down-md text-3xl"
        expand-icon="i-ci-caret-up-md text-3xl"
        multiple
      >
        <JournalEntry
          v-for="entry in filteredAndSortedEntries"
          :key="entry.id"
          :child-id="selectedChild.id"
          :entry
          :program-id="selectedChild.program!.id"
        />
      </Accordion>
    </div>
  </div>
</template>
