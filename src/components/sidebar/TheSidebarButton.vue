<script setup lang="ts">
const props = defineProps<{
  // The route is mandatory here
  // If you pass :to from the parent, the router-link-active class won't be applied
  route: string
  icon?: string
}>()
</script>

<template>
  <Button
    as="router-link"
    class="justify-start whitespace-nowrap rounded-xl p-4 transition-colors duration-200 hover:bg-slate-100 dark:hover:bg-slate-900"
    severity="contrast"
    text
    :to="props.route"
  >
    <template #icon>
      <i class="text-2xl" :class="props.icon" />
    </template>
  </Button>
</template>

<style scoped>
.router-link-active {
  @apply bg-primary-50 dark:bg-primary-950 text-primary-500 font-semibold;
}

.router-link-active :deep(.p-button-label) {
  @apply font-semibold
}
</style>
