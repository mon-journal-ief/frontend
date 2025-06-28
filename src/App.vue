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
    const mode = import.meta.env.VITE_MODE
    if (mode === 'development') return 'DEV IEF'
    if (mode === 'int') return 'INT IEF'

    return 'IEF'
  },
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: () => {
        const mode = import.meta.env.VITE_MODE
        if (mode === 'development') return '/favicon_green.ico'
        if (mode === 'int') return 'static/favicon_red.ico'

        return 'static/favicon.ico'
      },
    },
  ],
})

useUserStore().fetchUser()
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
