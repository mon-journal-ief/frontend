<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { useHeaderHeight } from '@/composables/useHeaderHeight'
import { useFooterHeight } from '@/composables/useFooterHeight'

const route = useRoute()

const pageWithNavigation = computed(() =>
  route.name && !['/login', '/[...404]'].includes(route.name),
)

const isSidebarOpen = ref(false)
const { headerHeight } = useHeaderHeight()
const { footerHeight } = useFooterHeight()

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
  <div v-if="pageWithNavigation" class="flex bg-surface-50 dark:bg-surface-950">
    <ConfirmDialog dismissable-mask />

    <TheSidebar v-model="isSidebarOpen" />
    <div class="flex grow flex-col overflow-hidden">
      <BaseToast />
      <TheHeader @toggle-sidebar="isSidebarOpen = !isSidebarOpen" />
      <RouterView
        class="bg-surface-100 px-4 py-6 dark:bg-surface-900 md:mr-4 md:rounded-xl md:px-6 md:py-8"
        :style="{ minHeight: `calc(100vh - ${headerHeight}px - ${footerHeight}px)` }"
      />
    </div>
  </div>

  <div v-else class="flex h-screen w-full bg-surface-50 p-4 dark:bg-surface-950">
    <RouterView class="w-full bg-surface-100 px-4 py-6 dark:bg-surface-900 md:rounded-xl" />
  </div>
</template>
