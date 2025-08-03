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

    <!-- Empty State -->
    <div v-else class="text-center text-gray-500">
      <p>Aucun enfant enregistré pour le moment.</p>
      <p class="text-sm">Cliquez sur "Ajouter un enfant" pour commencer.</p>
    </div>

    <!-- Add Child Button -->
    <Button
      icon="i-ci-plus"
      label="Ajouter un enfant"
      rounded
      @click="showAddChildDialog = true"
    />
  </div>
</template>
