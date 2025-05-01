<script setup lang="ts">
const props = defineProps<{
  value?: string | number
  color?: 'blue' | 'yellow' | 'orange' | 'red' | 'green' | 'fuchsia' | 'gray'
}>()

const colorClasses = computed(() => {
  switch (props.color) {
    case 'blue':
      return {
        background: 'bg-blue-50 dark:bg-slate-900',
        text: 'text-blue-600 dark:text-blue-400',
      }
    case 'yellow':
      return {
        background: 'bg-yellow-50 dark:bg-slate-900',
        text: 'text-yellow-600 dark:text-yellow-400',
      }
    case 'orange':
      return {
        background: 'bg-orange-50 dark:bg-slate-900',
        text: 'text-orange-600 dark:text-orange-400',
      }
    case 'red':
      return {
        background: 'bg-red-50 dark:bg-slate-900',
        text: 'text-red-600 dark:text-red-400',
      }
    case 'green':
      return {
        background: 'bg-green-50 dark:bg-slate-900',
        text: 'text-green-600 dark:text-green-400',
      }
    case 'fuchsia':
      return {
        background: 'bg-fuchsia-50 dark:bg-slate-900',
        text: 'text-fuchsia-600 dark:text-fuchsia-400',
      }
    case 'gray':
    default:
      return {
        background: 'bg-gray-50 dark:bg-slate-900',
        text: 'text-gray-600 dark:text-gray-400',
      }
  }
})
</script>

<template>
  <Tag
    :class="[colorClasses.background, colorClasses.text]"
    pt:label:class="whitespace-nowrap"
    :value
  >
    <slot />
  </Tag>
</template>
