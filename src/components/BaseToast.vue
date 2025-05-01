<script setup lang="ts">
type ISeverity = 'success' | 'error' | 'info' | 'warn'

function getToastClasses(severity: ISeverity) {
  if (severity === 'warn') {
    return {
      background: 'bg-yellow-200 dark:bg-yellow-800',
      text: 'text-yellow-600 dark:text-yellow-400',
      icon: 'i-ci-triangle-warning',
    }
  }
  else if (severity === 'error') {
    return {
      background: 'bg-red-200 dark:bg-red-800',
      text: 'text-red-600 dark:text-red-400',
      icon: 'i-ci-triangle-warning',
    }
  }
  else if (severity === 'success') {
    return {
      background: 'bg-green-200 dark:bg-green-800',
      text: 'text-green-600 dark:text-green-400',
      icon: 'i-ci-check',
    }
  }

  // Defaults to info
  return {
    background: 'bg-blue-200 dark:bg-blue-800',
    text: 'text-blue-600 dark:text-blue-400',
    icon: 'i-ci-info',
  }
}
</script>

<template>
  <Toast>
    <template #message="slotProps">
      <div class="flex flex-1 gap-3">
        <!-- icon -->
        <div class="flex size-12 shrink-0 items-center justify-center rounded-lg" :class="getToastClasses(slotProps.message.severity).background">
          <i class="text-2xl" :class="[getToastClasses(slotProps.message.severity).text, getToastClasses(slotProps.message.severity).icon]" />
        </div>

        <!-- content -->
        <div>
          <span v-if="slotProps.message.summary" class="font-semibold">{{ slotProps.message.summary }}</span>
          <p v-if="slotProps.message.detail" class="text-sm">{{ slotProps.message.detail }}</p>
        </div>
      </div>
    </template>
  </Toast>
</template>
