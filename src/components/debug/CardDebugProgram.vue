<script setup lang="ts">
defineProps<{
  program: IProgram
}>()

const emit = defineEmits<{
  refetch: []
}>()

async function handleDeleteProgram(id: string) {
  await api.program.remove(id)
  emit('refetch')
}
</script>

<template>
  <Card>
    <template #title>
      <h3 class="mb-2">{{ program.name }}</h3>
    </template>
    <template #content>
      <div class="flex flex-col gap-4">
        <div>
          <p><strong>ID:</strong> {{ program.id }}</p>
          <p><strong>Name:</strong> {{ program.name }}</p>
          <p><strong>Grade:</strong> {{ program.grade }}</p>
          <p v-if="program.children"><strong>Children:</strong> {{ program.children }}</p>
          <p v-if="program.elements"><strong>Elements:</strong> {{ program.elements }}</p>
          <p><strong>Created at:</strong> {{ program.createdAt }}</p>
          <p><strong>Updated at:</strong> {{ program.updatedAt }}</p>
        </div>

        <Button
          label="Delete"
          severity="danger"
          @click="handleDeleteProgram(program.id)"
        />
      </div>
    </template>
  </Card>
</template>
