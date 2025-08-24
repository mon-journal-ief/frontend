<script setup lang="ts">
defineProps<{
  model: {
    label?: string
    icon?: string
    command?: () => void
    separator?: boolean
  }[]
}>()

const menuRef = ref()

function toggle(event: Event) {
  menuRef.value.toggle(event)
}

defineExpose({ toggle })
</script>

<template>
  <Menu
    ref="menuRef"
    class="mt-1"
    :model
    popup
  >
    <template #item="{ item, props: menuProps }">
      <a
        :class="item.class"
        v-bind="menuProps.action"
      >
        <i v-if="item.icon" :class="item.icon" />
        <span>{{ item.label }}</span>
      </a>
    </template>
  </Menu>
</template>
