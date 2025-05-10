<script setup lang="ts">
defineProps<{
  title: string
  icon: string
}>()

const popoverRef = ref()

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
        <span>{{ title }}</span>
      </div>

      <i class="i-ci-chevron-right mr-4 transition-transform" :class="{ 'rotate-90': popoverRef?.visible }" />
    </Button>

    <Popover ref="popoverRef">
      <div class="flex flex-col gap-2">
        <slot />
      </div>
    </Popover>
  </div>
</template>
