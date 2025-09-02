<script setup lang="ts">
withDefaults(defineProps<{ reorderMode?: boolean }>(), {
  reorderMode: false,
})

const emit = defineEmits<{
  remove: []
}>()

const isExpanded = ref(false)
const showEditDialog = ref(false)

const element = defineModel<IProgramElement>({ required: true })
const elementStatus = computed(() => {
  if (element.value.isValidated) return 'validated'
  if (element.value.journalEntries?.length) return 'partiallyValidated'

  return 'notValidated'
})

// Ensure children is always an array. This fixes a bug where newly created elements
// would not be draggable. I'd like to find a better solution.
watchEffect(() => {
  if (!element.value.children) {
    element.value.children = []
  }
})

async function toggleValidation() {
  await api.programElement.validate(element.value.id, !element.value.isValidated)
}
</script>

<template>
  <div>
    <!-- Edit Dialog -->
    <DialogEditProgramElement
      v-if="showEditDialog"
      v-model:visible="showEditDialog"
      :element
      @remove="emit('remove')"
    />

    <!-- Accordion -->
    <AccordionPanel class="rounded-xl transition-all duration-300" :value="element.id">
      <!-- Header -->
      <AccordionHeader
        class="place-items-start rounded-b-xl"
        :class="[
          elementStatus === 'validated' && 'bg-green-200/20 dark:bg-green-800/20',
          elementStatus === 'partiallyValidated' && 'bg-yellow-200/20 dark:bg-yellow-800/20',
          isExpanded ? '!rounded-b-none' : 'rounded-b-xl',
        ]"
        pt:toggle-icon:class="-mt-0.5"
        @click="isExpanded = !isExpanded"
      >
        <div class="group flex w-full justify-between">
          <!-- Left Header Side -->
          <div class="flex items-center gap-2">
            <i v-if="reorderMode" class="drag-handle i-ci-hamburger-md mr-3 flex shrink-0 cursor-grab select-none items-center self-center pr-1 text-2xl" />
            <Checkbox
              v-else
              v-model="element.isValidated"
              binary
              :dt="{ checked: { background: '{green.500}', borderColor: '{green.500}', hoverBackground: '{green.500}', hoverBorderColor: '{green.500}' } }"
              @change="toggleValidation"
              @click.stop
            />

            <p
              :class="[
                elementStatus === 'validated' && 'text-green-700 dark:text-green-400',
                elementStatus === 'partiallyValidated' && 'text-yellow-700 dark:text-yellow-400',
              ]"
            >
              {{ element.name }}
            </p>

            <Badge
              v-if="element.journalEntries?.length > 0 && !reorderMode"
              v-tooltip.top="`${element.journalEntries?.length} entrée${element.journalEntries?.length > 1 ? 's' : ''} associée${element.journalEntries?.length > 1 ? 's' : ''}`"
              :severity="elementStatus === 'validated' ? 'success' : 'warning'"
              :value="element.journalEntries?.length"
            />
          </div>

          <!-- Right Header Side -->
          <Button
            class="self-start p-0"
            icon="i-ci-edit !text-xl"
            severity="secondary"
            variant="text"
            @click.stop="showEditDialog = true"
          />
        </div>
      </AccordionHeader>

      <!-- Content -->
      <AccordionContent
        v-if="(element.description || element.exercices?.length) && !reorderMode"
        :pt:content:class="[
          elementStatus === 'validated' && 'bg-green-200/20 dark:bg-green-800/20',
          elementStatus === 'partiallyValidated' && 'bg-yellow-200/20 dark:bg-yellow-800/20',
          'rounded-b-xl',
        ]"
      >
        <div class="flex flex-col justify-between gap-4 text-sm">
          <p class="text-theme-surface-700">
            {{ element.description }}
          </p>
          <div v-if="element.exercices?.length" class="flex flex-col gap-2">
            <p class="text-theme-surface-700">
              Exemples d'exercices :
            </p>
            <ul class="text-theme-surface-600 list-inside list-disc">
              <li v-for="exercice in element.exercices" :key="exercice">{{ exercice }}</li>
            </ul>
          </div>
        </div>
      </AccordionContent>
    </AccordionPanel>

    <!-- Children Accordion -->
    <DraggableProgramElements
      v-if="element.children?.length > 0 || reorderMode"
      v-model:elements="element.children"
      class="ml-4 md:ml-8"
      :class="reorderMode && '!mt-0'"
      :parent-id="element.id"
      :reorder-mode
    />
  </div>
</template>
