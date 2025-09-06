<script setup lang="ts">
const props = defineProps<{
  src: string
  size?: 'small' | 'medium' | 'large'
}>()

const loadingUpload = defineModel<boolean>('loading', { required: false, default: false })
const images = defineModel<string[]>('images', { required: true })

const userStore = useUserStore()

const showMaximizedDialog = ref(false)

const sizeClasses = computed(() => {
  if (props.size === 'small') return 'max-w-32'
  if (props.size === 'large') return 'max-w-96'

  return 'max-w-64'
})

async function handleDelete() {
  loadingUpload.value = true
  try {
    await api.upload.deleteJournalEntryImage(props.src)
    images.value = images.value.filter(img => img !== props.src)
    userStore.fetchSelectedChild()
  }
  finally {
    loadingUpload.value = false
  }
}
</script>

<template>
  <div class="relative min-w-32" :class="sizeClasses">
    <img class="w-full rounded-xl object-cover" :src>

    <div class="absolute right-2 top-2 flex gap-2">
      <Button
        class="w-fit"
        icon="i-ci-show text-xl"
        severity="secondary"
        size="small"
        @click="showMaximizedDialog = true"
      />
      <Button
        class="w-fit"
        icon="i-ci-trash-full text-xl"
        :loading="loadingUpload"
        severity="danger"
        size="small"
        @click="handleDelete"
      />
    </div>

    <Dialog
      v-model:visible="showMaximizedDialog"
      class="max-h-[90vh] w-auto max-w-[90vw] lg:max-w-[80vw] xl:max-w-[70vw] 2xl:max-w-[60vw]"
      dismissable-mask
      :draggable="false"
      modal
      pt:content:class="p-0"
      :show-header="false"
      @click="showMaximizedDialog = false"
    >
      <img class="max-w-full object-contain" :src>
    </Dialog>
  </div>
</template>
