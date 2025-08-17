import { defineStore } from 'pinia'
import { useMediaQuery } from '@vueuse/core'

export const useUIStore = defineStore('ui', () => {
  // Modify mode state
  const isModifyMode = ref(false)
  const isMobile = useMediaQuery('(max-width: 768px)') // md breakpoint

  // Add dialog state
  const showDialogAddEntry = ref(false)
  const showAddDialogProgram = ref(false)

  // Global function to add new element (will be set by child page)
  const addNewElement = ref<(() => void) | null>(null)

  return {
    // State
    isModifyMode,
    isMobile,
    showDialogAddEntry,
    showAddDialogProgram,
    addNewElement,
  }
})
