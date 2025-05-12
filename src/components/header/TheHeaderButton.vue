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
    :to="props.route"
    variant="ghost"
  >
    <template #icon>
      <i :class="props.icon" />
      <slot />
    </template>
  </Button>
</template>
