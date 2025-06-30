<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { useHeaderHeight } from '@/composables/useHeaderHeight'

const route = useRoute()

const pageWithNavigation = computed(() =>
  route.name && !['/login', '/[...404]'].includes(route.name),
)

const isSidebarOpen = ref(false)
const { headerHeight } = useHeaderHeight()

const env = import.meta.env.VITE_MODE
useHead({
  title: () => {
    if (env === 'development') return 'DEV IEF'
    if (env === 'int') return 'INT IEF'

    return 'IEF'
  },
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: () => {
        if (env === 'development') return '/favicon_green.ico'
        if (env === 'int') return 'static/favicon_red.ico'

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
        class="bg-surface-100 px-4 py-6 dark:bg-surface-900 md:mb-4 md:mr-4 md:rounded-xl md:px-6 md:py-8"
        :style="{ minHeight: `calc(100vh - ${headerHeight}px` }"
      />
    </div>
  </div>

  <div v-else class="flex h-screen w-full bg-surface-50 p-4 dark:bg-surface-950">
    <RouterView class="w-full bg-surface-100 px-4 py-6 dark:bg-surface-900 md:rounded-xl" />
  </div>
</template>
