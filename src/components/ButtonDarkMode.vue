<script setup lang="ts">
import { useColorMode } from '@vueuse/core'

const colorMode = useColorMode()
const menu = ref()

const themeIcons = {
  light: 'i-ci-sun',
  dark: 'i-ci-moon',
  system: 'i-ci-monitor',
}

const items = ref([
  {
    label: 'Light',
    icon: themeIcons.light,
    command: () => colorMode.value = 'light',
  },
  {
    label: 'Dark',
    icon: themeIcons.dark,
    command: () => colorMode.value = 'dark',
  },
  {
    label: 'System',
    icon: themeIcons.system,
    command: () => colorMode.value = 'auto',
  },
])

const iconClass = computed(() => {
  if (colorMode.store.value === 'light') return themeIcons.light
  if (colorMode.store.value === 'dark') return themeIcons.dark

  return themeIcons.system
})

function toggleMenu(event: MouseEvent) {
  menu.value.toggle(event)
}
</script>

<template>
  <Button
    aria-controls="theme_menu"
    aria-haspopup="true"
    :icon="iconClass"
    outlined
    rounded
    severity="secondary"
    @click="toggleMenu"
  />
  <Menu
    id="theme_menu"
    ref="menu"
    class="mt-2"
    :model="items"
    popup
  />
</template>
