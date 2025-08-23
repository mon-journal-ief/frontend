<script setup lang="ts">
import { useColorMode } from '@vueuse/core'

const colorMode = useColorMode()

const themeIcons = {
  light: 'i-ci-sun',
  dark: 'i-ci-moon',
}

const iconClass = computed(() => {
  if (colorMode.store.value === 'light') return themeIcons.light
  if (colorMode.store.value === 'dark') return themeIcons.dark

  return themeIcons.light
})
</script>

<template>
  <Button
    :icon="iconClass"
    outlined
    rounded
    severity="secondary"
    @click="colorMode = colorMode === 'light' ? 'dark' : 'light'"
  />
</template>
