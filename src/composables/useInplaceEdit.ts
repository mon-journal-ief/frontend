import { ref } from 'vue'

export function useInplaceEdit<T>(initialValue: T) {
  const editingValue = ref<T>(initialValue)

  function onEditOpen(currentValue: T) {
    editingValue.value = currentValue
  }

  function onCancel(currentValue: T, closeCallback: () => void) {
    editingValue.value = currentValue
    closeCallback()
    // 🛑 Edit canceled
    // console.log('🛑 Edit canceled')
  }

  function onSave(applyValue: (v: T) => void, closeCallback: () => void) {
    applyValue(editingValue.value)
    closeCallback()
    // 💾 Value saved
    // console.log('💾 Value saved')
  }

  return {
    editingValue,
    onEditOpen,
    onCancel,
    onSave
  }
} 