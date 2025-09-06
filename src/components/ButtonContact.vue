<script setup lang="ts">
const showContactDialog = ref(false)
</script>

<template>
  <DialogContact
    v-if="showContactDialog"
    v-model="showContactDialog"
  />

  <Button
    class="hidden md:block"
    icon="i-ci-mail"
    outlined
    rounded
    severity="secondary"
    @click="showContactDialog = true"
  />

  <Button
    class="text-2xl md:hidden"
    icon="i-ci-mail"
    severity="secondary"
    text
    @click="showContactDialog = true"
  />
</template>
