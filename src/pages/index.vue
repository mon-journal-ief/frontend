<script setup lang="ts">
const showAddChildDialog = ref(false)
</script>

<template>
  <div>
    <DialogAddChild v-model:visible="showAddChildDialog" />

    <h1>Bienvenue sur l'application Ief</h1>

    <Button
      class="mt-4"
      label="Ajouter un enfant"
      @click="showAddChildDialog = true"
    />
  </div>
</template>
