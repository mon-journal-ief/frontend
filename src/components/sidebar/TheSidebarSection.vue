<script setup lang="ts">
const props = defineProps<{
  title: string
  modelValue: boolean
  icon: string
}>()
const emit = defineEmits<{
  'update:modelValue': [boolean]
}>()

const isOpen = computed<boolean>({
  get: () => props.modelValue,
  set: (val: boolean) => emit('update:modelValue', val),
})
</script>

<template>
  <!-- Section header -->
  <a class="flex cursor-pointer items-center justify-between rounded-xl hover:bg-slate-100 hover:dark:bg-slate-900" :class="{ 'bg-slate-100 dark:bg-slate-900': modelValue }" @click="isOpen = !isOpen">
    <div class="flex justify-center gap-2 p-4">
      <i class="text-2xl" :class="icon" />
      <span>{{ title }}</span>
    </div>

    <i class="i-ci-chevron-right mr-4 transition-transform" :class="{ 'rotate-90': isOpen }" />
  </a>

  <!-- Section items -->
  <div v-if="isOpen" class="ml-6 flex flex-col gap-1">
    <slot />
  </div>
</template>
