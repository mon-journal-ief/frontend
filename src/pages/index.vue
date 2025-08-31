<script setup lang="ts">
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const router = useRouter()

onMounted(async () => {
  if (user.value?.children?.length === 1) {
    router.push(`/enfant/${user.value.children[0]!.id}`)
  }
})
</script>

<template>
  <div class="flex flex-col gap-6">
    <h1>Bienvenue sur votre journal IEF</h1>

    <ChildrenList />
  </div>
</template>
