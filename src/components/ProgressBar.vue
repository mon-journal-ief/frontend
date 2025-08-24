<script setup lang="ts">
import { useColorMode } from '@vueuse/core'
import { palette } from '~/palette.ts'

const props = defineProps<{
  elements: IProgramElement[]
}>()

const colorMode = useColorMode()

// Recursive function to count all elements in the tree with three states
function countElementsRecursively(elements: IProgramElement[]): {
  total: number
  validated: number
  inProgress: number
  unvalidated: number
} {
  let total = 0
  let validated = 0
  let inProgress = 0
  let unvalidated = 0

  for (const element of elements) {
    total++

    if (element.isValidated) {
      validated++
    }

    else if (element.journalEntries && element.journalEntries.length > 0) {
      inProgress++
    }
    else {
      unvalidated++
    }

    // Recursively count children
    if (element.children && element.children.length > 0) {
      const childCounts = countElementsRecursively(element.children)
      total += childCounts.total
      validated += childCounts.validated
      inProgress += childCounts.inProgress
      unvalidated += childCounts.unvalidated
    }
  }

  return { total, validated, inProgress, unvalidated }
}

const progressStats = computed(() => {
  return countElementsRecursively(props.elements)
})

const meterGroupColor = computed(() => {
  if (colorMode.value === 'light') {
    return {
      green: palette.green[300],
      yellow: palette.yellow[300],
      surface: palette.surface[200],
    }
  }

  return {
    green: palette.green[700],
    yellow: palette.yellow[700],
    surface: palette.surface[800],
  }
})

const meterGroupValue = computed(() => {
  const stats = progressStats.value
  if (stats.total === 0) return []

  return [
    {
      label: 'Validé',
      value: Math.round((stats.validated / stats.total) * 100),
      color: meterGroupColor.value.green,
      icon: 'i-ci-wavy-check',
    },
    {
      label: 'En cours',
      value: Math.round((stats.inProgress / stats.total) * 100),
      color: meterGroupColor.value.yellow,
      icon: 'i-ci-clock',
    },
    {
      label: 'Non commencé',
      value: Math.round((stats.unvalidated / stats.total) * 100),
      color: meterGroupColor.value.surface,
      icon: 'i-ci-circle',
    },
  ]
})
</script>

<template>
  <MeterGroup
    v-if="progressStats.total > 0"
    class="-space-y-2"
    :pt="{ labelText: { class: 'text-surface-500 !text-sm' } }"
    :value="meterGroupValue"
  />
</template>
