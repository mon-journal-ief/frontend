<script setup lang="ts">
const props = defineProps<{
  // The route is mandatory here
  // If you pass :to from the parent, the router-link-active class won't be applied
  route: string
  icon?: string
  label?: string
  image?: string
}>()
</script>

<template>
  <Button
    as="router-link"
    class="hover:bg-theme-surface-100 h-12 justify-start whitespace-nowrap rounded-xl p-4 transition-colors duration-200"
    :label="props.label"
    severity="contrast"
    text
    :to="props.route"
  >
    <template #icon>
      <span class="flex shrink-0 items-center gap-2">
        <img
          v-if="props.image"
          alt="icon"
          class="size-10 rounded-full border-2 border-surface-400 object-cover dark:border-surface-600"
          :src="props.image"
        >
        <i v-if="props.icon" class="text-2xl" :class="props.icon" />
      </span>
    </template>
  </Button>
</template>

<style scoped>
.router-link-active {
  @apply bg-surface-100 dark:bg-surface-900 text-primary-700 dark:text-primary-300 font-semibold;
}

.router-link-active :deep(.p-button-label) {
  @apply font-semibold
}
</style>
