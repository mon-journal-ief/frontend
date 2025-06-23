<script setup lang="ts">
defineProps<{
  element: IProgramElement
}>()
</script>

<template>
  <Card>
    <template #content>
      <h3>{{ element.name }}</h3>
      <p>{{ element.description }}</p>

      <div
        v-for="child in element.children"
        :key="child.id"
        class="mt-4 flex flex-col gap-2"
      >
        <ProgramElement :element="child" />
      </div>
    </template>
  </Card>
</template>
