<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

import { useHeaderHeight } from '@/composables/useHeaderHeight'

const emit = defineEmits<{
  toggleSidebar: []
}>()

const breakpoints = useBreakpoints(breakpointsTailwind)
const isDesktopView = ref(breakpoints.md.value)
watch(breakpoints.md, (value: boolean) => {
  isDesktopView.value = value
})

const activeSection = ref<Section | null>(null)
function toggleSection(section: Section) {
  activeSection.value = activeSection.value === section ? null : section
}

const headerRef = ref<HTMLElement>()
const { setHeaderHeight } = useHeaderHeight()

function updateHeaderHeight() {
  if (!headerRef.value) return

  setHeaderHeight(headerRef.value.offsetHeight)
}

onMounted(() => {
  updateHeaderHeight()
  window.addEventListener('resize', updateHeaderHeight)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateHeaderHeight)
})
</script>

<template>
  <div ref="headerRef" class="sticky top-0 z-20 flex w-full justify-between bg-surface-50 dark:bg-surface-950">

    <div class="flex w-full flex-col">
      <div class="flex flex-row justify-between gap-2 p-4 md:gap-4">
        <div class="flex items-center gap-2 md:gap-4">
          <!-- BURGER -->
          <i class="i-ci-hamburger-md my-auto cursor-pointer text-4xl text-primary-700 dark:text-primary-200 md:hidden" @click="emit('toggleSidebar')" />

          <TheHeaderButton
            icon="i-ci-house-01"
            label="IEF"
            route="/"
          />
          <TheHeaderSection
            icon="i-ci-users-group"
            :model-value="activeSection === 'enfant'"
            title="Enfants"
            @update:model-value="toggleSection('enfant')"
          >
            <TheHeaderButton
              icon="i-ci-house-01"
              label="IEF"
              route="/"
            />
            <TheHeaderButton
              icon="i-ci-house-01"
              label="IEF"
              route="/"
            />
          </TheHeaderSection>

        </div>

        <div class="flex gap-2 md:gap-4">
          <div class="flex items-center gap-2 md:gap-4">
            <TheHeaderButtonDarkMode />

            <TheHeaderButtonProfile />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
