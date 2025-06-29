<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

// Responsive behavior
const isSidebarOpen = defineModel<boolean>()
const breakpoints = useBreakpoints(breakpointsTailwind)
const isMdScreen = computed(() => breakpoints.md.value)

// Auto-open sidebar on desktop, close on mobile
watch(isMdScreen, (isDesktop: boolean) => {
  isSidebarOpen.value = isDesktop
}, { immediate: true })

// Auto-close sidebar on mobile when navigating
const route = useRoute()
watch(() => route.path, () => {
  if (!isMdScreen.value) {
    isSidebarOpen.value = false
  }
})

const isDevelopmentMode = ref(import.meta.env.VITE_MODE === 'development')

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const children = computed(() => user.value?.children)
const placeholderPic = 'https://img.freepik.com/photos-gratuite/enfant-jouant-cookies-forme_23-2148738665.jpg'
</script>

<template>
  <div v-show="isSidebarOpen" class="sticky top-0 flex h-screen w-full flex-col md:w-64">
    <div class="flex flex-col gap-4 overflow-y-auto p-4">
      <a class="m-4" href="/">
        <!-- <img alt="IEF" class="h-12" src="@/assets/ief-logo.svg"> -->
      </a>

      <!-- NAVIGATION -->
      <nav class="mb-4 flex flex-col gap-2">

        <!-- HOME -->
        <TheSidebarButton
          icon="i-ci-house-01"
          label="Accueil"
          route="/"
        />

        <!-- ENFANTS SECTION -->
        <TheSidebarButton
          icon="i-ci-users-group"
          label="Enfants"
          route="/enfants"
        />

        <div class="flex flex-col gap-1 pl-4">
          <TheSidebarButton
            v-for="child in children"
            :key="child.id"
            class="h-12"
            :image="child.image || placeholderPic"
            :label="child.name"
            :route="`/enfant/${child.id}`"
          />
        </div>

        <!-- DEBUG -->
        <TheSidebarButton
          v-if="isDevelopmentMode"
          icon="i-ci-cookie"
          label="Debug"
          route="/debug"
        />
      </nav>
    </div>

  </div>
</template>
