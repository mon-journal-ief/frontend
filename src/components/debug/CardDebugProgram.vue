<script setup lang="ts">
defineProps<{
  title: string
  program: IProgram
}>()
</script>

<template>
  <Card>
    <template #title>
      <h3 class="mb-2">{{ title }}</h3>
    </template>
    <template #content>
      <p><strong>ID:</strong> {{ program.id }}</p>
      <p><strong>Name:</strong> {{ program.name }}</p>
      <p><strong>Grade:</strong> {{ program.grade }}</p>
      <p v-if="program.children"><strong>Children:</strong> {{ program.children }}</p>
      <p v-if="program.elements"><strong>Elements:</strong> {{ program.elements }}</p>
      <p><strong>Created at:</strong> {{ program.createdAt }}</p>
      <p><strong>Updated at:</strong> {{ program.updatedAt }}</p>
    </template>
  </Card>
</template>
