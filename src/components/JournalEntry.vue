<script setup lang="ts">
const props = defineProps<{
  entry: IJournalEntry
}>()
</script>

<template>
  <AccordionPanel class="group" :value="entry.id">
    <AccordionHeader>
      <div class="flex w-full items-center justify-between gap-2">
        <div class="flex flex-col gap-1">
          <p>{{ entry.validatedElements[0]?.name }}</p>
          <p class="text-sm font-normal text-slate-500">{{ new Date(entry.date).toLocaleDateString() }}</p>
        </div>

        <div class="mr-8 flex items-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Button
            icon="i-ci-edit-pencil-01"
            rounded
            severity="secondary"
            variant="outlined"
          />
          <Button
            icon="i-ci-trash-full"
            rounded
            severity="secondary"
            variant="outlined"
          />
        </div>
      </div>
    </AccordionHeader>

    <AccordionContent>
      <p>{{ entry.comment }}</p>
    </AccordionContent>
  </AccordionPanel>
</template>
