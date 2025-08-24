<script setup lang="ts">
import { setToastInstance } from '@/services/toastService'

type ISeverity = 'success' | 'error' | 'info' | 'warn'

const toast = useToast()
setToastInstance(toast)

function getToastClasses(severity: ISeverity) {
  if (severity === 'warn') {
    return {
      background: 'bg-theme-yellow-200',
      text: 'text-theme-yellow-600',
      icon: 'i-ci-triangle-warning',
    }
  }
  else if (severity === 'error') {
    return {
      background: 'bg-theme-red-200',
      text: 'text-theme-red-600',
      icon: 'i-ci-triangle-warning',
    }
  }
  else if (severity === 'success') {
    return {
      background: 'bg-theme-green-200',
      text: 'text-theme-green-600',
      icon: 'i-ci-check',
    }
  }

  // Defaults to info
  return {
    background: 'bg-theme-blue-200',
    text: 'text-theme-blue-600',
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
