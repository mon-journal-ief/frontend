<script setup lang="ts">
const props = defineProps<{
  label: string
  icon?: string
  route: string
}>()
</script>

<template>
  <Button
    as="router-link"
    :label="props.label"
    severity="contrast"
    text
    :to="props.route"
  >
    <template #icon>
      <i :class="props.icon" />
    </template>
  </Button>
</template>
