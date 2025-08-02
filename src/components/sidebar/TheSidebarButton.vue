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
    class="h-12 justify-start whitespace-nowrap rounded-xl p-4 transition-colors duration-200 hover:bg-slate-100 dark:hover:bg-slate-900"
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
          class="size-10 rounded-full border-2 border-slate-400 object-cover dark:border-slate-600"
          :src="props.image"
        >
        <i v-if="props.icon" class="text-2xl" :class="props.icon" />
      </span>
    </template>
  </Button>
</template>

<style scoped>
.router-link-active {
  @apply bg-slate-100 dark:bg-slate-900 text-primary-500 font-semibold;
}

.router-link-active :deep(.p-button-label) {
  @apply font-semibold
}
</style>
