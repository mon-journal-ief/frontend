<script setup lang="ts">
const route = useRoute()
const uiStore = useUIStore()
const { showDialogAddEntry, showDialogAddProgramElement } = storeToRefs(uiStore)

const router = useRouter()
// Determine if we can add entries/program elements on current page
const isEnfantPage = computed(() => route.name === '/enfant/[name]')
const canAddEntry = computed(() => isEnfantPage.value && route.query.tab === 'journal')
const canAddProgramElement = computed(() => isEnfantPage.value && route.query.tab === 'programme')

function handleAddClick() {
  if (canAddProgramElement.value) {
    showDialogAddProgramElement.value = true
  }
  else if (canAddEntry.value) {
    showDialogAddEntry.value = true
  }
}

// const hasNavHistory = computed(() => window.history.length > 1)
</script>

<template>
  <div
    class="
  bg-theme-surface-50 border-theme-surface-200
  fixed inset-x-0 bottom-0 z-30
  flex justify-around px-4 py-2"
  >

    <!-- Home page -->
    <template v-if="route.path === '/'">
      <ButtonProfile />
      <ButtonContact />
      <ButtonDarkMode />
    </template>

    <!-- Account page -->
    <template v-else-if="route.path === '/compte'">
      <!-- Home Button -->
      <Button
        class="footer-button"
        icon="i-ci-house-01"
        severity="secondary"
        text
        @click="router.push('/')"
      />
      <ButtonContact />
      <ButtonDarkMode />
    </template>

    <!-- Other pages -->
    <template v-else>
      <!-- Home Button -->
      <Button
        class="footer-button"
        icon="i-ci-house-01"
        severity="secondary"
        text
        @click="router.push('/')"
      />

      <!-- Add Button -->
      <Button
        v-if="canAddEntry || canAddProgramElement"
        class="footer-button"
        icon="i-ci-add-plus-square"
        severity="secondary"
        text
        @click="handleAddClick"
      />
      <div v-else class="w-9 rounded-lg" />

      <!-- Space that would occupy the add button -->
      <div class="w-9 rounded-lg" />

      <!-- Modify Mode Button -->
      <!-- <Button
        v-if="canAddEntry || canAddProgramElement"
        class="footer-button"
        :icon="isModifyMode ? 'i-ci-show' : 'i-ci-edit-pencil-01'"
        severity="secondary"
        text
        @click="isModifyMode = !isModifyMode"
      /> -->
    </template>
  </div>
</template>

<style scoped>
.footer-button {
  @apply text-3xl;
}
</style>
