<script setup lang="ts">
const userStore = useUserStore()
const { children } = storeToRefs(userStore)

const showAddChildDialog = ref(false)
const isOnboarding = computed(() => children.value.length === 0)
</script>

<template>
  <div class="flex h-full flex-col gap-6">
    <DialogChildForm v-model:visible="showAddChildDialog" />

    <!-- Children List -->
    <div v-if="children?.length" class="flex flex-col gap-4">
      <h2 class="text-xl font-semibold">Mes enfants</h2>
      <div class="flex flex-col gap-4">
        <ChildCard
          v-for="child in children"
          :key="child.id"
          :child
          link
        />
      </div>
    </div>

    <!-- Add Child Card -->
    <ChildCardEmpty :is-onboarding @click="showAddChildDialog = true" />
  </div>
</template>
