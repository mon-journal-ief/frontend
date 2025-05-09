<script setup lang="ts">
const props = defineProps<{
  child: IChild
}>()
const borderColor = computed(() => {
  if (props.child.gender === 'MALE') return 'blue'
  if (props.child.gender === 'FEMALE') return 'pink'

  return 'gray'
})
</script>

<template>
  <TheSidebarButton
    :image="props.child.image"
    :image-border="borderColor"
    :label="props.child.firstName"
    :route="`/enfant/${props.child.id}`"
  />
</template>
