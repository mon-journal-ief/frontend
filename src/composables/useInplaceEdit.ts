export function useInplaceEdit<T>(initialValue: T) {
  const editingValue = ref<T>(initialValue)

  function onEditOpen(currentValue: T) {
    editingValue.value = currentValue
  }

  function onCancel(currentValue: T, closeCallback: () => void) {
    editingValue.value = currentValue
    closeCallback()
  }

  function onSave(applyValue: (v: T) => void, closeCallback: () => void) {
    applyValue(editingValue.value)
    closeCallback()
  }

  return {
    editingValue,
    onEditOpen,
    onCancel,
    onSave,
  }
}
