<script setup lang="ts">
const props = defineProps<{
  entry: IJournalEntry
  programId: string
  childId: string
}>()

const images = ref<string[]>(props.entry.images)

watch(props.entry, () => {
  images.value = props.entry.images
})
</script>

<template>
  <AccordionPanel class="group" :value="entry.id">
    <AccordionHeader class="place-items-start" pt:toggle-icon:class="mt-0.5">
      <div class="flex w-full flex-col gap-2">
        <!-- Date and Actions Row -->
        <div class="flex w-full items-center justify-between gap-2">
          <!-- Date -->
          <p class="text-sm font-normal text-surface-500">{{ new Date(props.entry.date).toLocaleDateString() }}</p>

          <!-- Actions -->
          <div class="mr-2 flex items-center gap-2">
            <JournalEntryActions
              :child-id
              :entry
              :program-id
            />
          </div>
        </div>

        <!-- Comment Row -->
        <div class="w-full">
          <p class="whitespace-pre-wrap">{{ entry.comment }}</p>
        </div>
      </div>
    </AccordionHeader>

    <AccordionContent>
      <div class="flex flex-col gap-4">

        <!-- Validated elements -->
        <div v-if="entry.validatedElements.length > 0" class="text-theme-surface-600 flex flex-col gap-1 text-sm">
          <div class="font-semibold"> Éléments du programme travaillés </div>
          <ul v-for="element in entry.validatedElements" :key="element.id" class="list-disc">
            <li>{{ element.name }}</li>
          </ul>
        </div>
        <p v-else class="text-sm font-normal text-surface-500">
          Aucun élément du programme associé
        </p>

        <!-- Images -->
        <div class="flex gap-4">
          <ImageWithDelete
            v-for="image in images"
            :key="image"
            v-model:images="images"
            :src="image"
          />
        </div>
      </div>
    </AccordionContent>
  </AccordionPanel>
</template>
