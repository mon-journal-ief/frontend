<script setup lang="ts">
const props = defineProps<{
  title: string
  icon: string
  modelValue: boolean
}>()
const popoverRef = ref()
const isOpen = ref(props.modelValue)
const selectedElement = ref(null)

if (props.modelValue) {
  popoverRef.value.open()
}

function toggle(event: Event) {
  if (popoverRef.value) {
    popoverRef.value.toggle(event)
  }
}
</script>

<template>
  <div class="gap-1">
    <Button
      class="flex cursor-pointer items-center justify-between rounded-xl hover:bg-slate-100 hover:dark:bg-slate-900"
      severity="secondary"
      @click="toggle"
    >
      <div class="flex items-center gap-2">
        <i :class="icon" />
        <span>{{ selectedElement ? selectedElement : title }}</span>
      </div>

      <i class="i-ci-chevron-right mr-4 transition-transform" :class="{ 'rotate-90': isOpen }" />
    </Button>

    <Popover ref="popoverRef">
      <div class="flex flex-col gap-2">
        <slot />
      </div>
    </Popover>
  </div>
</template>
