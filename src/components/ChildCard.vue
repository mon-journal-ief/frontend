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
  const age = calculateAge(child.value.birthdate)
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

const showDialogUpload = ref(false)
</script>

<template>
  <DialogEditChildPicture
    v-model="showDialogUpload"
    :child
    @refresh="emits('refresh')"
  />

  <Card
    class="group"
    :class="link && 'cursor-pointer'"
    @click="handleClick()"
  >
    <template #content>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3 md:gap-8">
          <div class="group/avatar relative shrink-0">
            <img
              alt="Avatar enfant"
              class="aspect-square size-16 rounded-full border-2 border-surface-100 object-cover dark:border-surface-800 md:size-24 lg:size-32"
              :src="child.profileImage || placeholderImage"
            >

            <!-- Hover mask with upload icon -->
            <div
              class="absolute inset-0 flex cursor-pointer items-center justify-center
              rounded-full bg-black/50 opacity-0 transition-opacity duration-200 group-hover/avatar:opacity-100"
              @click="showDialogUpload = true"
            >
              <div class="flex size-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm lg:size-12">
                <i class="i-ci-edit-pencil-01 text-2xl text-white" />
              </div>
            </div>

          </div>

          <div class="flex min-w-0 flex-1 flex-col gap-1">
            <h2 class="truncate">{{ child.name }} {{ child.lastName }}</h2>
            <p class="truncate text-sm text-surface-500 dark:text-surface-400 md:text-lg">{{ subtitle }}</p>
            <ProgressBar class="mt-2" :elements="child.program?.elements ?? []" />
          </div>
        </div>

        <div class="flex shrink-0 items-center gap-1 self-start md:gap-2">
          <ChildButtonExport :child />
          <ChildButtonActions :child @refresh="emits('refresh')" />
        </div>
      </div>
    </template>
  </Card>
</template>
