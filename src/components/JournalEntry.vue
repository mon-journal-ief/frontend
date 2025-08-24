<script setup lang="ts">
const props = defineProps<{
  entry: IJournalEntry
  programId: string
  childId: string
}>()

const emit = defineEmits<{
  refresh: []
}>()

const uiStore = useUIStore()
const { isModifyMode, isMobile } = storeToRefs(uiStore)
</script>

<template>
  <AccordionPanel class="group" :value="entry.id">
    <AccordionHeader>
      <div class="flex w-full items-center justify-between gap-2">
        <div class="flex flex-col gap-1">
          <p class="text-sm font-normal text-surface-500">{{ new Date(props.entry.date).toLocaleDateString() }}</p>
          <p>{{ entry.validatedElements.map((element) => element.name).join(', ') }}</p>
        </div>

        <div
          v-if="isMobile ? isModifyMode : true"
          class="mr-8 flex items-center gap-2"
          :class="[
            !isMobile && 'transition-opacity duration-300',
            isModifyMode && isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
          ]"
        >
          <JournalEntryActions
            :child-id
            :entry
            :program-id
            @refresh="emit('refresh')"
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
