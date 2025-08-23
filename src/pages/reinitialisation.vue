<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const token = computed(() => route.query.token as string)
const isSubmitting = ref(false)
const resetComplete = ref(false)
const resetError = ref('')

const passwordForm = ref({
  password: '',
  confirmPassword: '',
})

const isFormValid = computed(() => {
  return passwordForm.value.password.length >= 6
    && passwordForm.value.password === passwordForm.value.confirmPassword
})

async function handlePasswordReset() {
  if (!token.value) {
    resetError.value = 'Token de réinitialisation manquant'

    return
  }

  if (!isFormValid.value) {
    resetError.value = 'Veuillez vérifier que les mots de passe correspondent et font au moins 6 caractères'

    return
  }

  isSubmitting.value = true
  resetError.value = ''

  try {
    const response = await api.auth.confirmPasswordReset(token.value, passwordForm.value.password)

    if (response.success) {
      resetComplete.value = true
      toast.success('Mot de passe réinitialisé !', 'Votre mot de passe a été mis à jour avec succès', 8000)

      router.push('/login')
    }
    else {
      resetError.value = response.error?.message || 'Une erreur est survenue lors de la réinitialisation'
      toast.error('Erreur', resetError.value)
    }
  }
  catch (error) {
    console.error('Password reset error:', error)
    resetError.value = 'Une erreur est survenue lors de la réinitialisation'
    toast.error('Erreur', resetError.value)
  }
  finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="flex items-center justify-center">
    <Card>
      <template #title>
        <h1 class="mb-6 text-center text-2xl font-bold">Réinitialiser votre mot de passe</h1>
      </template>

      <template #content>
        <!-- Reset Form -->
        <div v-if="token">
          <form class="flex flex-col gap-4" @submit.prevent="handlePasswordReset">
            <!-- New Password -->
            <Password
              v-model="passwordForm.password"
              :feedback="false"
              fluid
              placeholder="Nouveau mot de passe"
              toggle-mask
            />

            <!-- Confirm Password -->
            <Password
              v-model="passwordForm.confirmPassword"
              :feedback="false"
              fluid
              placeholder="Confirmer le mot de passe"
              toggle-mask
            />

            <!-- Error Message -->
            <Message v-if="resetError" icon="i-ci-circle-warning" severity="error">
              <p class="text-theme-red-700 font-medium">Erreur</p>
              <p class="text-theme-red-600 text-sm">{{ resetError }}</p>
            </Message>

            <!-- Submit Button -->
            <Button
              :disabled="!isFormValid || isSubmitting"
              :loading="isSubmitting"
              type="submit"
            >
              {{ isSubmitting ? 'Réinitialisation...' : 'Réinitialiser le mot de passe' }}
            </Button>

            <Button
              fluid
              severity="secondary"
              @click="router.push('/login')"
            >
              Retour
            </Button>
          </form>

          <!-- Password Requirements -->
          <Card class="mt-6">
            <template #content>
              <div class="mb-3 text-lg font-medium">Exigences du mot de passe :</div>
              <div class="space-y-2 text-sm">
                <div class="flex items-center">
                  <i
                    class="mr-2 size-4"
                    :class="passwordForm.password.length >= 6 ? 'i-ci-check text-green-500' : 'i-ci-circle text-gray-400'"
                  />
                  Au moins 6 caractères
                </div>
                <div class="flex items-center">
                  <i
                    class="mr-2 size-4"
                    :class="/[A-Z]/.test(passwordForm.password) ? 'i-ci-check text-green-500' : 'i-ci-circle text-gray-400'"
                  />
                  Une lettre majuscule (recommandé)
                </div>
                <div class="flex items-center">
                  <i
                    class="mr-2 size-4"
                    :class="/[0-9]/.test(passwordForm.password) ? 'i-ci-check text-green-500' : 'i-ci-circle text-gray-400'"
                  />
                  Un chiffre (recommandé)
                </div>
              </div>
            </template>
          </Card>
        </div>

        <!-- No Token State -->
        <div v-else>
          <Message
            class="mb-6"
            icon="i-ci-circle-warning"
            severity="warn"
          >
            <div class="flex flex-col">
              <p class="font-medium">Token de réinitialisation manquant</p>
              <p class="text-sm">Il semble que le lien de réinitialisation soit incomplet. Veuillez vérifier votre email et cliquer sur le bon lien.</p>
            </div>
          </Message>

          <div class="flex flex-col gap-3">
            <Button
              fluid
              severity="secondary"
              @click="router.push('/login')"
            >
              Retour
            </Button>
            <Button
              fluid
              @click="router.push('/mot-de-passe-oublie')"
            >
              Demander un nouveau lien
            </Button>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>
