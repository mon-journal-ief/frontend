<script setup lang="ts">
import { useColorMode } from '@vueuse/core'

const colorMode = useColorMode()

const themeIcons = {
  light: 'i-ci-sun',
  dark: 'i-ci-moon',
}

const iconClass = computed(() => {
  if (colorMode.store.value === 'light') return themeIcons.dark
  if (colorMode.store.value === 'dark') return themeIcons.light

  return themeIcons.light
})
</script>

<template>
  <!-- Desktop -->
  <Button
    class="hidden md:block"
    :icon="iconClass"
    outlined
    rounded
    severity="secondary"
    @click="colorMode = colorMode === 'light' ? 'dark' : 'light'"
  />

  <!-- Mobile -->
  <Button
    class="text-2xl md:hidden"
    :icon="iconClass"
    severity="secondary"
    text
    @click="colorMode = colorMode === 'light' ? 'dark' : 'light'"
  />
</template>
