<script setup lang="ts">
const props = defineProps<{
  value?: string | number
  color?: 'blue' | 'yellow' | 'orange' | 'red' | 'green' | 'fuchsia' | 'gray'
}>()

const colorClasses = computed(() => {
  switch (props.color) {
    case 'blue':
      return {
        background: 'bg-theme-blue-50',
        text: 'text-theme-blue-600',
      }
    case 'yellow':
      return {
        background: 'bg-theme-yellow-50',
        text: 'text-theme-yellow-600',
      }
    case 'orange':
      return {
        background: 'bg-theme-orange-50',
        text: 'text-theme-orange-600',
      }
    case 'red':
      return {
        background: 'bg-theme-red-50',
        text: 'text-theme-red-600',
      }
    case 'green':
      return {
        background: 'bg-theme-green-50',
        text: 'text-theme-green-600',
      }
    case 'fuchsia':
      return {
        background: 'bg-theme-fuchsia-50',
        text: 'text-theme-fuchsia-600',
      }
    case 'gray':
    default:
      return {
        background: 'bg-theme-gray-50',
        text: 'text-theme-gray-600',
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
