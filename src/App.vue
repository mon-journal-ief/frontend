<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { useHeaderHeight } from '@/composables/useHeaderHeight'
import { useFooterHeight } from '@/composables/useFooterHeight'

const route = useRoute()

const pageWithNavigation = computed(() =>
  route.name && !['/maintenance', '/[...404]'].includes(route.name),
)

useHead({
  title: () => {
    switch (import.meta.env.VITE_MODE) {
      case 'development':
        return 'DEV IEF'
      case 'int':
        return 'INT IEF'
      default:
        return 'IEF'
    }
  },
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: () => {
        switch (import.meta.env.VITE_MODE) {
          case 'development':
            return '/favicon_green.ico'
          case 'int':
            return 'static/favicon_red.ico'
          default:
            return 'static/favicon.ico'
        }
      },
    },
  ],
})
</script>

<template>
  <div class="flex flex-col bg-surface-50 dark:bg-surface-950">
    <ConfirmDialog dismissable-mask />
    <TheHeader v-if="pageWithNavigation" class="fixed" />

    <div class="flex grow flex-col overflow-hidden">
      <BaseToast />
      <div class="relative mx-auto w-full bg-surface-100 px-4 py-6 dark:bg-surface-900 md:rounded-xl md:px-6 md:py-8">
        <RouterView
          class="mx-auto w-full max-w-7xl"
        />
      </div>
    </div>
  </div>
</template>
