<script setup lang="ts">
import { z } from 'zod'

const router = useRouter()

const isSubmitting = ref(false)
const emailSent = ref(false)
const submitError = ref('')
const email = ref('')

async function handlePasswordResetRequest() {
  isSubmitting.value = true
  submitError.value = ''

  try {
    await api.auth.requestPasswordReset(email.value)
    emailSent.value = true
  }
  catch (error) {
    console.error('Password reset request error:', error)
    submitError.value = 'Une erreur est survenue lors de la demande'
    toast.error('Erreur', 'Une erreur est survenue lors de la demande')
  }
  finally {
    isSubmitting.value = false
  }
}

async function resendPasswordReset() {
  try {
    await api.auth.requestPasswordReset(email.value)
    toast.success('Email envoyé', 'Un nouvel email de réinitialisation a été envoyé')
  }
  catch (error) {
    console.error('Resend password reset error:', error)
    toast.error('Erreur', 'Une erreur est survenue lors de l\'envoi de l\'email')
  }
}

const isEmailValid = computed(() => {
  return z.email().safeParse(email.value).success
})
</script>

<template>
  <div class="flex items-center justify-center">
    <Card>
      <template #title>
        <h1 class="text-center text-2xl font-bold">Mot de passe oublié</h1>
      </template>

      <template #content>
        <!-- Success State -->
        <div v-if="emailSent">
          <Message
            class="mb-6"
            icon="i-ci-mail"
            severity="success"
          >
            <div class="flex flex-col">
              <p class="text-theme-green-600 font-medium">Email envoyé !</p>
              <p class="text-theme-green-400 text-sm font-normal">Si cette adresse email existe dans notre système, vous recevrez un lien de réinitialisation.</p>
              <p class="text-theme-green-400 text-sm font-normal">Le lien de réinitialisation est valide pendant 1 heure. Pensez à vérifier vos spams si vous ne le trouvez pas.</p>
            </div>
          </Message>

          <div class="flex flex-col gap-3">
            <Button @click="resendPasswordReset"> Renvoyer l'email </Button>
            <Button
              fluid
              severity="secondary"
              @click="router.push('/login')"
            >
              Retour
            </Button>
          </div>
        </div>

        <!-- Request Form -->
        <div v-else>
          <div class="mb-6 text-center">
            <p class="text-gray-600">
              Entrez votre adresse email pour recevoir un lien de réinitialisation.
            </p>
          </div>

          <form class="flex flex-col gap-4" @submit.prevent="handlePasswordResetRequest">
            <InputText
              v-model="email"
              placeholder="votre@email.com"
              required
              type="email"
            />

            <!-- Error Message -->
            <Message v-if="submitError" icon="i-ci-circle-warning" severity="error">
              <p class="text-theme-red-700 font-medium">Erreur</p>
              <p class="text-theme-red-600 text-sm">{{ submitError }}</p>
            </Message>

            <Button
              :disabled="!isEmailValid || isSubmitting"
              :loading="isSubmitting"
              type="submit"
            >
              {{ isSubmitting ? 'Envoi en cours...' : 'Envoyer le lien de réinitialisation' }}
            </Button>
          </form>

          <!-- Back to Login -->
          <div class="mt-4 text-center">
            <Button
              fluid
              severity="secondary"
              size="small"
              text
              @click="router.push('/login')"
            >
              Retour
            </Button>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>
