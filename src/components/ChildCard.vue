<script setup lang="ts">
const props = defineProps<{
  child: IChild
  link?: boolean
}>()

const emits = defineEmits<{
  refresh: []
}>()

const child = computed(() => props.child)

const placeholderImage = computed(() => {
  return child.value.gender === 'MALE' ? '/placeholder-boy.png' : '/placeholder-girl.png'
})

const subtitle = computed(() => {
  const grade = child.value.program?.grade
  const age = child.value.age
  if (grade && age) return `${grade} - ${age} ans`
  if (grade) return grade
  if (age) return `${age} ans`

  return ''
})

const router = useRouter()
function handleClick() {
  if (!props.link) return

  router.push(`/enfant/${child.value.id}`)
}
</script>

<template>
  <Card
    class="group"
    :class="link && 'cursor-pointer'"
    @click="handleClick()"
  >
    <template #content>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-8">
          <img
            alt="Avatar enfant"
            class="size-16 rounded-full border-2 border-surface-100 object-cover dark:border-surface-800 md:size-24 lg:size-32"
            :src="child.image || placeholderImage"
          >

          <div class="flex flex-col gap-1">
            <h2>{{ child.name }} {{ child.lastName }}</h2>
            <p class="text-lg text-surface-500 dark:text-surface-400">{{ subtitle }}</p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <ChildButtonExport :child />
          <ChildButtonActions
            :child
            @click.stop
            @refresh="emits('refresh')"
          />
        </div>
      </div>
    </template>
  </Card>
</template>
