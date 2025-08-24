<script setup lang="ts">
const visible = defineModel<boolean>({ required: true })

const dialogRef = useTemplateRef('dialogRef')
const dialogContentElement = ref<HTMLElement>()
const isContentElementScrollable = ref(false)
const isScrolledToBottom = ref(false)

function checkScrollOnContentElement() {
  if (!dialogContentElement.value) return

  isContentElementScrollable.value = dialogContentElement.value.scrollHeight > dialogContentElement.value.clientHeight

  // Check if scrolled to bottom
  const { scrollTop, scrollHeight, clientHeight } = dialogContentElement.value
  isScrolledToBottom.value = Math.abs(scrollHeight - scrollTop - clientHeight) <= 1
}

function onContentScroll() {
  checkScrollOnContentElement()
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
      dialogContentElement.value.addEventListener('scroll', onContentScroll)
    }
  })
}, { immediate: true })

// Clean up scroll listener when dialog is hidden
watch(visible, (value) => {
  if (!value && dialogContentElement.value) {
    dialogContentElement.value.removeEventListener('scroll', onContentScroll)
  }
})

const shouldShowShadow = computed(() => isContentElementScrollable.value && !isScrolledToBottom.value)
</script>

<template>
  <Dialog
    ref="dialogRef"
    v-model:visible="visible"
    dismissable-mask
    :draggable="false"
    modal
    :pt:footer:class="[
      'transition-shadow shadow-[0px_-4px_16px_0px]',
      shouldShowShadow ? 'shadow-surface-950/[.06] dark:shadow-surface-950' : 'shadow-surface-950/[0] dark:shadow-surface-950/[0]',
    ]"
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
