<script setup lang="ts">
const route = useRoute()
const uiStore = useUIStore()
const { isModifyMode, showDialogAddEntry, addNewElement } = storeToRefs(uiStore)

const router = useRouter()
// Determine if we can add entries/program elements on current page
const isEnfantPage = computed(() => route.name === '/enfant/[id]')
const canAddEntry = computed(() => isEnfantPage.value && route.query.tab === 'journal')
const canAddProgramElement = computed(() => isEnfantPage.value && route.query.tab === 'programme')

function handleAddClick() {
  if (canAddProgramElement.value) {
    if (addNewElement.value) {
      addNewElement.value()
    }
  }
  else if (canAddEntry.value) {
    showDialogAddEntry.value = true
  }
}

const hasNavHistory = computed(() => window.history.length > 1)
</script>

<template>
  <div
    class="
  bg-theme-surface-50 border-theme-surface-200
  fixed inset-x-0 bottom-0 z-30
  flex justify-around border-t px-4 py-2"
  >

    <!-- Home page -->
    <template v-if="route.path === '/'">
      <!-- Account Button -->
      <Button
        class="footer-button"
        icon="i-ci-user"
        severity="secondary"
        text
        @click="router.push('/account')"
      />

      <div />

      <!-- Close/Back Button -->
      <Button
        v-if="hasNavHistory"
        class="footer-button"
        icon="i-ci-chevron-right"
        severity="secondary"
        text
        @click="router.back()"
      />
    </template>

    <!-- Other pages -->
    <template v-else>
      <!-- Back to Home Button -->
      <Button
        class="footer-button"
        icon="i-ci-chevron-left"
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

      <!-- Modify Mode Button -->
      <Button
        v-if="canAddEntry || canAddProgramElement"
        class="footer-button"
        :icon="isModifyMode ? 'i-ci-show' : 'i-ci-edit-pencil-01'"
        severity="secondary"
        text
        @click="isModifyMode = !isModifyMode"
      />
    </template>
  </div>
</template>

<style scoped>
.footer-button {
  @apply text-3xl;
}
</style>
