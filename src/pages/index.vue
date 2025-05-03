<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { apiRepository } from '@/utils/apiRepository'

const programs = ref<IProgram[]>([])
const error = ref<string | null>(null)
const isLoading = ref(false)

onMounted(async () => {
  isLoading.value = true
  const { data, error: apiError, isFetching } = await apiRepository.programs.getAll()
  isLoading.value = isFetching

  if (apiError) {
    error.value = apiError
  }
  else if (data) {
    programs.value = data
  }
})
</script>

<template>
  <div>
    <h1>Programs</h1>
    <div v-if="isLoading" class="text-gray-500">
      Loading programs...
    </div>
    <div v-else-if="error" class="text-red-500">
      {{ error }}
    </div>
    <ul v-else>
      <li v-for="program in programs" :key="program.id">{{ program.name }}</li>
    </ul>
  </div>
</template>
