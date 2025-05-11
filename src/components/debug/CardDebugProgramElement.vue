<script setup lang="ts">
defineProps<{
  title: string
  programElement: IProgramElement
}>()
</script>

<template>
  <Card>
    <template #title>
      <h3 class="mb-2">{{ title }}</h3>
    </template>
    <template #content>
      <p><strong>ID:</strong> {{ programElement.id }}</p>
      <p><strong>Name:</strong> {{ programElement.name }}</p>
      <p><strong>Description:</strong> {{ programElement.description }}</p>
      <p v-if="programElement.journalEntries"><strong>Journal Entries:</strong> {{ programElement.journalEntries }}</p>
      <p><strong>Created at:</strong> {{ programElement.createdAt }}</p>
      <p><strong>Updated at:</strong> {{ programElement.updatedAt }}</p>
    </template>
  </Card>
</template>
