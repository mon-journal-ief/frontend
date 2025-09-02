<script setup lang="ts">
const props = defineProps<{
  child: IChild
}>()

const userStore = useUserStore()

const visible = defineModel<boolean>({ required: true })

async function handleProfileImageUpload(event: { files: File[] }) {
  if (!event.files.length) return

  const file = event.files[0]
  if (!file) return

  const result = await api.upload.uploadChildProfileImage(file, props.child.id)

  if (result) {
    userStore.fetchSelectedChild()
    visible.value = false
  }
}

async function handleProfileImageDelete() {
  await api.upload.deleteChildProfileImage(props.child!.profileImage!)

  userStore.fetchSelectedChild()
  userStore.fetchChildren()
  visible.value = false
}
</script>

<template>
  <BaseDialog v-model="visible">
    <template #header>
      <h2 class="text-2xl font-bold">
        {{ child.profileImage ? 'Modifier l\'image de profil' : 'Ajouter une image de profil' }}
      </h2>
    </template>

    <div class="flex flex-col gap-4">
      <p class="text-surface-600 dark:text-surface-400">
        Sélectionnez une nouvelle image de profil pour {{ child.name }}.
      </p>

      <FileUpload
        accept="image/*"
        choose-label="Choisir une image"
        class="my-4"
        custom-upload
        mode="basic"
        upload-label="Envoyer"
        @select="handleProfileImageUpload"
      />
    </div>

    <template #footer>
      <Button
        v-if="child.profileImage"
        label="Supprimer la photo actuelle"
        severity="danger"
        variant="outlined"
        @click="handleProfileImageDelete"
      />

      <Button
        label="Annuler"
        severity="secondary"
        @click="visible = false"
      />
    </template>
  </BaseDialog>
</template>
