<script setup lang="ts">
import draggable from 'vuedraggable'

const props = withDefaults(defineProps<{
  parentId?: string | null
  reorderMode?: boolean
}>(), {
  parentId: null,
  reorderMode: false,
})

const elements = defineModel<IProgramElement[]>('elements', { required: true })

const api = useApi()

function removeElement(index: number) {
  elements.value.splice(index, 1)
}

function onReorder(evt: any) {
  if (evt.added || evt.moved) {
    const movedElement = evt.added?.element || evt.moved?.element
    if (movedElement) {
      api.programElement.update(movedElement.id, { ...movedElement, parentId: props.parentId })
    }
  }
}
</script>

<template>
  <draggable
    v-model="elements"
    :animation="200"
    class="flex flex-col gap-4"
    :class="[
      parentId && 'gap-2',
      reorderMode && elements.length === 0 && 'min-h-16 rounded-md border border-dashed border-slate-500 p-2',
    ]"
    :disabled="!reorderMode"
    group="program-elements"
    item-key="id"
    @change="onReorder"
  >
    <template #item="{ index }">
      <ProgramElement
        v-model="elements[index]!"
        :reorder-mode
        @remove="removeElement(index)"
      />
    </template>
  </draggable>
</template>
