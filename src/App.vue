<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { useColorMode } from '@vueuse/core'

const route = useRoute()
useColorMode() // so that the color scheme loads at app start

const hasNavLayout = computed(() =>
  route.name && !PUBLIC_PAGES.includes(route.name),
)

const userStore = useUserStore()
if (hasNavLayout.value) {
  userStore.fetchUser()
}

const uiStore = useUIStore()
const { isMobile } = storeToRefs(uiStore)

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

  <div v-if="hasNavLayout" class="bg-theme-surface-50 text-theme-surface-900 flex h-screen flex-col md:flex-row">
    <!-- Desktop Sidebar -->
    <TheSidebar v-if="!isMobile" />

    <!-- Content Area -->
    <div class="flex grow flex-col overflow-hidden" :class="{ 'pb-16': isMobile }">
      <RouterView class="bg-theme-surface-100 h-full p-4 md:my-4 md:mr-4 md:rounded-xl md:px-6 md:py-8" />
    </div>

    <!-- Fixed Mobile Footer -->
    <MobileFooter v-if="isMobile" />
  </div>

  <div v-else class="bg-theme-surface-50 flex h-screen w-full p-4">
    <RouterView class="bg-theme-surface-100 w-full px-4 py-6 md:rounded-xl" />
  </div>
</template>
