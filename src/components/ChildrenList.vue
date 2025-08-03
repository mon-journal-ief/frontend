<script setup lang="ts">
const userStore = useUserStore()

const showAddChildDialog = ref(false)
</script>

<template>
  <div class="flex flex-col gap-6">
    <DialogChildForm v-model:visible="showAddChildDialog" @refresh="userStore.fetchUser()" />

    <!-- Children List -->
    <div v-if="userStore.user?.children?.length" class="flex flex-col gap-4">
      <h2 class="text-xl font-semibold">Mes enfants</h2>
      <div class="flex flex-col gap-4">
        <ChildCard
          v-for="child in userStore.user.children"
          :key="child.id"
          :child
          link
          @refresh="userStore.fetchUser()"
        />
      </div>
    </div>

    <!-- Add Child Card -->
    <ChildCardEmpty @click="showAddChildDialog = true" />
  </div>
</template>
