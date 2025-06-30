<script setup lang="ts">
const props = defineProps<{
  child: IChild
}>()

const child = computed(() => props.child)
const placeholderImage = computed(() => {
  return child.value.gender === 'MALE' ? 'https://static.vecteezy.com/system/resources/thumbnails/056/866/270/small/child-with-curly-hair-and-blue-eyes-wearing-a-navy-jacket-against-a-dark-background-in-an-indoor-setting-photo.jpeg' : 'https://img.freepik.com/free-photo/portrait-cute-little-girl-with-long-hair-standing-park_23-2147893135.jpg?w=360'
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
            <p class="text-lg text-slate-500 dark:text-slate-400">{{ child.program?.grade }} - {{ child.age }} ans</p>
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
