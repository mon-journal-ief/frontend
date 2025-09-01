<script setup lang="ts">
const userStore = useUserStore()
const { children } = storeToRefs(userStore)

const router = useRouter()

onMounted(async () => {
  if (children.value.length === 1) {
    router.push(`/enfant/${children.value[0]!.name}`)
  }
})
</script>

<template>
  <div class="flex flex-col gap-6">
    <h1>Bienvenue sur votre journal IEF</h1>

    <ChildrenList />
  </div>
</template>
