<script setup lang="ts">
const emits = defineEmits<{
  click: []
}>()

function handleClick() {
  emits('click')
}
</script>

<template>
  <Card
    class="border-color-class bg-color-class group cursor-pointer hover:border-slate-400 dark:border-slate-600"
    @click="handleClick"
  >
    <template #content>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-8">
          <div class="border-color-class flex size-16 items-center justify-center rounded-full group-hover:border-slate-400 md:size-24 lg:size-32">
            <i class="text-color-class i-ci-plus text-2xl md:text-3xl lg:text-4xl" />
          </div>

          <h3 class="text-color-class text-lg font-medium">Ajouter un enfant</h3>
        </div>
      </div>
    </template>
  </Card>
</template>

<style scoped>
.bg-color-class {
  @apply bg-slate-100 dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-950;
}

.text-color-class {
  @apply text-slate-400 group-hover:text-slate-500 dark:text-slate-500 dark:group-hover:text-slate-400 transition-colors duration-300;
}

.border-color-class {
  @apply border-2 border-dashed border-slate-300 hover:border-slate-400 dark:border-slate-600 transition-all duration-300;
}
</style>
