<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { useMediaQuery } from '@vueuse/core'

const route = useRoute()

const isPageWithNavigation = computed(() =>
  route.name && !['/login', '/[...404]', '/export/pdf/'].includes(route.name),
)

const userStore = useUserStore()
if (isPageWithNavigation.value) {
  userStore.fetchUser()
}

const isMobile = useMediaQuery('(max-width: 768px)')

const env = import.meta.env.VITE_MODE
useHead({
  title: () => {
    if (env === 'development') return '[dev] Mon journal IEF'
    if (env === 'int') return '[int] Mon journal IEF'

    return 'Mon journal IEF'
  },
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: () => {
        if (env === 'development') return '/logo6.ico'
        if (env === 'int') return '/logo5.ico'

        return '/logo6.ico'
      },
    },
  ],
})
</script>

<template>
  <BaseToast />
  <ConfirmDialog dismissable-mask />

  <div v-if="isPageWithNavigation" class="bg-theme-surface-50 text-theme-surface-900 flex h-screen flex-col md:flex-row">
    <TheSidebar v-if="!isMobile" />
    <div class="flex grow flex-col overflow-hidden">
      <RouterView class="bg-theme-surface-100 h-full p-4 md:my-4 md:mr-4 md:rounded-xl md:px-6 md:py-8" />
    </div>

    <MobileFooter v-if="isMobile" />
  </div>

  <div v-else class="bg-theme-surface-50 flex h-screen w-full p-4">
    <RouterView class="bg-theme-surface-100 w-full px-4 py-6 md:rounded-xl" />
  </div>
</template>
