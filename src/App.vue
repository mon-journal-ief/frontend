<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { useColorMode } from '@vueuse/core'

const route = useRoute()
useColorMode() // so that the color scheme loads at app start

const hasNavLayout = computed(() =>
  route.name && !PUBLIC_PAGES.includes(route.name),
)

const isExportPdf = computed(() =>
  route.name === '/export/pdf/',
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
      type: 'image/png',
      href: () => {
        if (env === 'development') return '/chasti_logo_xs.png'
        if (env === 'int') return '/chasti_logo_xs.png'

        return '/chasti_logo_xs.png'
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
    <div class="flex grow flex-col" :class="isMobile && 'pb-[4.5rem]'">
      <RouterView class="border-theme-surface-200 bg-theme-surface-100 flex-1 overflow-y-auto border p-2 sm:p-4 md:my-4 md:mr-4 md:rounded-xl md:px-6 md:py-8" />
    </div>

    <!-- Fixed Mobile Footer -->
    <MobileFooter v-if="isMobile" />
  </div>

  <RouterView v-else-if="isExportPdf" class="h-screen w-full px-4" />

  <div v-else class="bg-theme-surface-50 flex h-screen w-full p-4">
    <RouterView class="bg-theme-surface-100 w-full px-4 py-6 md:rounded-xl" />
  </div>
</template>
