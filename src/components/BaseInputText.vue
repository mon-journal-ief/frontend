<script setup lang="ts">
const value = defineModel<string>({ required: true })
const showClearButton = computed(() => value.value.length > 0)
</script>

<template>
  <InputText
    v-model="value"
    v-bind="$attrs"
    class="relative"
  />
  <button
    v-if="showClearButton"
    aria-label="Clear"
    class="absolute right-2.5 top-1/2 flex -translate-y-1/2"
    @click="value = ''"
  >
    <i class="text-theme-surface-600 i-ci-close-md" />
  </button>
</template>
