<script setup lang="ts">
const selectedChild = defineModel<IChild>({ required: true })

const uiStore = useUIStore()
const { showDialogAddEntry } = storeToRefs(uiStore)

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

    <Button
      class="hidden md:block"
      icon="i-ci-plus text-lg -mb-1 mr-1"
      label="Ajouter une entrée"
      rounded
      severity="secondary"
      variant="outlined"
      @click="showDialogAddEntry = true"
    />

    <div
      v-if="selectedChild.journalEntries.length === 0"
      class="flex h-full flex-col place-items-end items-center justify-end gap-8 text-2xl md:hidden"
    >
      <p> Appuyez ici pour ajouter une entrée</p>
      <i class="i-ci-arrow-down-md animate-bounce text-5xl" />
    </div>

    <div class="flex-1 overflow-y-auto">
      <Accordion
        collapse-icon="i-ci-caret-down-md text-3xl"
        expand-icon="i-ci-caret-up-md text-3xl"
        multiple
      >
        <JournalEntry
          v-for="entry in selectedChild.journalEntries"
          :key="entry.id"
          :child-id="selectedChild.id"
          :entry
          :program-id="selectedChild.program!.id"
        />
      </Accordion>
    </div>
  </div>
</template>
