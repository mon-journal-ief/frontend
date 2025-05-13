<script setup lang="ts">
defineProps<{
  programElement: IProgramElement
}>()

const emit = defineEmits<{
  refetch: []
}>()

const api = useApi()

async function handleDeleteProgramElement(id: string) {
  await api.programElement.remove(id)
  emit('refetch')
}
</script>

<template>
  <Card>
    <template #title>
      <h3 class="mb-2">{{ programElement.name }}</h3>
    </template>
    <template #content>
      <div class="flex flex-col gap-4">
        <div>
          <p><strong>ID:</strong> {{ programElement.id }}</p>
          <p><strong>Name:</strong> {{ programElement.name }}</p>
          <p><strong>Description:</strong> {{ programElement.description }}</p>
          <p v-if="programElement.journalEntries"><strong>Journal Entries:</strong> {{ programElement.journalEntries }}</p>
          <p><strong>Created at:</strong> {{ programElement.createdAt }}</p>
          <p><strong>Updated at:</strong> {{ programElement.updatedAt }}</p>
        </div>

        <Button
          label="Delete"
          severity="danger"
          @click="handleDeleteProgramElement(programElement.id)"
        />
      </div>
    </template>
  </Card>
</template>
