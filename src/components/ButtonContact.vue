<script setup lang="ts">
const showContactDialog = ref(false)
</script>

<template>
  <DialogContact
    v-if="showContactDialog"
    v-model="showContactDialog"
  />

  <Button
    class="hidden pl-0.5 md:block"
    icon="i-ci-paper-plane"
    outlined
    rounded
    severity="secondary"
    @click="showContactDialog = true"
  />

  <Button
    class="text-2xl md:hidden"
    icon="i-ci-paper-plane"
    severity="secondary"
    text
    @click="showContactDialog = true"
  />
</template>
