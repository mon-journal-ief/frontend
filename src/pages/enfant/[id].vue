<script setup lang="ts">
const route = useRoute()
// const id = route.params.id
const id = '1'

// const { data: child } = await apiRepository.child.get(id)
const child = ref({
  id: '1',
  name: 'Benjaoui',
  firstName: 'Thimoté',
  age: 10,
  gender: 'male',
  birthDate: '2020-01-01',
  class: 'cp',
})

// const { data: program } = await apiRepository.program.get(child.value.class)
const program = ref({
  id: '1',
  name: 'Programme du CP',
  level: 'cp',
})
</script>

<template>
  <div>
    <h1>{{ child.firstName }} {{ child.name }}</h1>
    <p>{{ program.name }}</p>
    <p>Bonjour</p>
  </div>
</template>
