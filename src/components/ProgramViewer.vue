<script setup lang="ts">
const api = useApi()
const template = ref<IProgramTemplate>()

onMounted(async () => {
  template.value = (await api.programTemplate.getAll())[0]
})
</script>

<template>
  <Card class="w-full">
    <template #title>
      <h2>{{ template?.name }}</h2>
      <p class="text-base text-slate-600 dark:text-slate-400">{{ template?.description }}</p>
    </template>

    <template #content>
      <div class="mt-4 flex flex-col gap-4">
        <ProgramElement
          v-for="element in template?.elements"
          :key="element.id"
          :element
        />
      </div>
    </template>
  </Card>
</template>
