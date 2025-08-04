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
          <p class="text-sm font-normal text-surface-500">{{ new Date(props.entry.date).toLocaleDateString() }}</p>
          <p>{{ entry.validatedElements.map((element) => element.name).join(', ') }}</p>
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
      <div class="text-theme-surface-600 text-sm">
        <p v-if="entry.comment">{{ entry.comment }}</p>
        <p v-else>Aucun commentaire</p>
      </div>
    </AccordionContent>
  </AccordionPanel>
</template>
