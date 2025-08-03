<script setup lang="ts">
const props = defineProps<{
  child: IChild
}>()

const child = computed(() => props.child)
const placeholderImage = computed(() => {
  return child.value.gender === 'MALE' ? '/src/assets/placeholder-boy.png' : '/src/assets/placeholder-girl.png'
})

const subtitle = computed(() => {
  const grade = child.value.program?.grade
  const age = child.value.age
  if (grade && age) return `${grade} - ${age} ans`
  if (grade) return grade
  if (age) return `${age} ans`

  return ''
})
</script>

<template>
  <Card class="group">
    <template #content>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-8">
          <img
            alt="Avatar enfant"
            class="size-16 rounded-full border-2 border-slate-100 object-cover dark:border-slate-800 md:size-24 lg:size-32"
            :src="child.image || placeholderImage"
          >

          <div class="flex flex-col gap-1">
            <h2>{{ child.name }} {{ child.lastName }}</h2>
            <p class="text-lg text-slate-500 dark:text-slate-400">{{ subtitle }}</p>
          </div>
        </div>

        <div class="flex items-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Button
            icon="i-ci-edit-pencil-01"
            rounded
            severity="secondary"
            variant="outlined"
          />
          <Button
            icon="i-ci-trash-full"
            rounded
            severity="secondary"
            variant="outlined"
          />
        </div>
      </div>
    </template>
  </Card>
</template>
