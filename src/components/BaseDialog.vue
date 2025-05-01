<script setup lang="ts">
const visible = defineModel<boolean>({ required: true })

const dialogRef = useTemplateRef('dialogRef')
const dialogContentElement = ref<HTMLElement>()
const isContentElementScrollable = ref(false)

function checkScrollOnContentElement() {
  if (!dialogContentElement.value) return

  isContentElementScrollable.value = dialogContentElement.value.scrollHeight > dialogContentElement.value.clientHeight
}

const resizeObserver = new ResizeObserver(() => {
  // Used to check if the content has scroll when it's dimensions change
  checkScrollOnContentElement()
})

onUnmounted(() => {
  resizeObserver.disconnect()
})

// When Dialog becomes visible, set the content element and check if it's scrollable
// All this code to apply a box-shadow on footer
watch(visible, (value) => {
  if (!value) return

  nextTick(() => {
    dialogContentElement.value = (dialogRef.value as unknown as { content: HTMLElement })?.content

    if (dialogContentElement.value) {
      resizeObserver.observe(dialogContentElement.value)
    }
  })
}, { immediate: true })
</script>

<template>
  <Dialog
    ref="dialogRef"
    v-model:visible="visible"
    dismissable-mask
    :draggable="false"
    modal
    :pt:footer:class="isContentElementScrollable && 'shadow-[0px_-4px_16px_0px] shadow-slate-950/[.06] dark:shadow-slate-950'"
  >
    <template #header>
      <slot name="header" />
    </template>

    <slot />

    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </Dialog>
</template>
