<script setup lang="ts">
const props = defineProps<{
  title: string
  // Used to link the label to the input (accessibility)
  inputId?: string
}>()
</script>

<template>
  <div class="flex flex-col gap-1">
    <div class="text-theme-surface-950 flex gap-1 font-semibold">
      <label v-if="inputId" :for="inputId">{{ props.title }}</label>
      <span v-else>{{ props.title }}</span>
    </div>

    <slot v-bind="$attrs" />
  </div>
</template>
