<script setup lang="ts">
const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const router = useRouter()

// Form state
const name = ref('')
const email = ref('')
const aiSuggestionsEnabled = ref(false)

const loading = ref(false)
const showOnboardingDialog = ref(false)

watchEffect(() => {
  if (user.value) {
    name.value = user.value.name
    email.value = user.value.email
    aiSuggestionsEnabled.value = user.value.aiSuggestionsEnabled
  }
})

async function handleSave() {
  if (!user.value) return

  loading.value = true

  try {
    await api.user.updatePreferences({
      name: name.value,
      aiSuggestionsEnabled: aiSuggestionsEnabled.value,
    })

    toast.success('Paramètres sauvegardés', 'Vos préférences ont été mises à jour avec succès.')
    router.push('/')
  }
  catch (error) {
    toast.error('Erreur', 'Une erreur est survenue lors de la sauvegarde.')
    console.error('Error updating preferences:', error)
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex flex-col place-items-center gap-12">
    <DialogAiOnboarding v-if="showOnboardingDialog" v-model="showOnboardingDialog" />

    <h1>Mon compte</h1>

    <div class="flex flex-col gap-6">
      <FormContainer input-id="account-name" title="Nom">
        <InputText
          id="account-name"
          v-model="name"
          placeholder="Votre nom"
        />
      </FormContainer>

      <FormContainer input-id="account-email" title="Email">
        <InputText
          id="account-email"
          v-model="email"
          disabled
          placeholder="Votre email"
        />
      </FormContainer>

      <FormContainer input-id="account-ai-suggestions" title="Suggestions IA">
        <div class="flex flex-col gap-3">
          <div class="flex items-center gap-2">

            <Checkbox
              v-model="aiSuggestionsEnabled"
              binary
              input-id="account-ai-suggestions"
            />
            <label class="cursor-pointer" for="account-ai-suggestions">
              Activer les suggestions d'IA pour les entrées de journal
            </label>

            <Button
              icon="i-ci-circle-help text-2xl"
              severity="secondary"
              variant="text"
              @click="showOnboardingDialog = true"
            />
          </div>

        </div>
      </FormContainer>

      <div class="flex justify-end gap-2 pt-8">
        <Button
          label="Annuler"
          severity="secondary"
          @click="router.push('/')"
        />
        <Button
          :disabled="loading"
          label="Sauvegarder"
          :loading
          @click="handleSave"
        />
      </div>
    </div>
  </div>
</template>
