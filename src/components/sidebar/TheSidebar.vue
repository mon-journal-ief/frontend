<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

type Section = 'assets' | 'enfant'

// Responsive
const isSidebarOpen = defineModel<boolean>()
const breakpoints = useBreakpoints(breakpointsTailwind)
watch(breakpoints.md, (value: boolean) => {
  isSidebarOpen.value = value
}, { immediate: true })

function closeSidebarOnMobile() {
  if (breakpoints.md.value) return

  isSidebarOpen.value = false
}

// Sections related
const route = useRoute()
const activeSection = ref<Section | null>(null)

function getSectionFromPath(path: string): Section | undefined {
  return ['assets', 'enfant'].find(
    section => path.includes(`/${section}`),
  ) as Section | undefined
}

function toggleSection(section: Section) {
  activeSection.value = activeSection.value === section ? null : section
}

// Development mode check
const isDevelopmentMode = ref(import.meta.env.VITE_MODE === 'development')

watch(() => route.path, () => {
  closeSidebarOnMobile()
})

onMounted(() => {
  // Open the correct section when the page is loaded
  const section = getSectionFromPath(route.path)

  if (section) toggleSection(section)
})
</script>

<template>
  <div v-show="isSidebarOpen" class="sticky top-0 flex h-screen min-w-[260px] flex-col">
    <div class="flex flex-col gap-4 overflow-y-auto p-4">
      <a class="m-4" href="/">
        <!-- <img alt="IEF" class="h-12" src="@/assets/ief-logo.svg"> -->
      </a>

      <!-- NAVIGATION -->
      <nav class="mb-4 flex flex-col gap-2">

        <!-- OVERVIEW -->
        <TheSidebarButton
          icon="i-ci-house-01"
          label="Overview"
          route="/"
        />

        <TheSidebarSection
          icon="i-ci-users-group"
          :model-value="activeSection === 'enfant'"
          title="Enfants"
          @update:model-value="toggleSection('enfant')"
        >
          <TheSidebarButton
            :image="mockedChild.image"
            :image-border="mockedChild.gender ? mockedChild.gender === 'MALE' ? 'blue' : 'pink' : 'gray'"
            :label="mockedChild.firstName"
            :route="`/enfant/${mockedChild.id}`"
          />
        </TheSidebarSection>

        <!-- LOGIN -->
        <TheSidebarButton
          icon="i-ci-house-01"
          label="Login"
          route="/login"
        />

        <!-- ASSETS -->
        <TheSidebarSection
          icon="i-ci-file-document"
          :model-value="activeSection === 'assets'"
          title="Assets"
          @update:model-value="toggleSection('assets')"
        >
          <TheSidebarButton label="All assets" route="/assets/all-assets" />
          <TheSidebarButton label="Groups" route="/assets/groups" />
        </TheSidebarSection>

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
