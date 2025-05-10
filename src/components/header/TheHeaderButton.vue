<script setup lang="ts">
const props = defineProps<{
  label: string
  icon?: string
  route: string
}>()
const currentRoute = useRoute()
</script>

<template>
  <Button
    as="router-link"
    :disabled="!currentRoute.path.includes(props.route)"
    :label="props.label"
    :to="props.route"
    variant="ghost"
  >
    <template #icon>
      <i :class="props.icon" />
    </template>
  </Button>
</template>
