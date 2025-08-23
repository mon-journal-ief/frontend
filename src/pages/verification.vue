<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const { accessToken } = storeToRefs(userStore)

const token = computed(() => route.query.token as string)
const isVerifying = ref(false)
const verificationComplete = ref(false)
const verificationError = ref('')

// Auto-verify when token is present
onMounted(async () => {
  if (token.value) {
    await verifyEmail()
  }
})

async function verifyEmail() {
  if (!token.value) {
    verificationError.value = 'Token de vérification manquant'

    return
  }

  isVerifying.value = true
  verificationError.value = ''

  try {
    const response = await api.auth.verifyEmail(token.value)

    if (response.success && response.data?.accessToken) {
      // Store tokens and mark as verified
      accessToken.value = response.data.accessToken
      document.cookie = `iefRefreshToken=${response.data.refreshToken}; path=/; max-age=${60 * 60 * 24 * 30}; secure; samesite=strict`

      verificationComplete.value = true
      toast.success('Email vérifié !', 'Votre compte a été activé avec succès')

      // Redirect to dashboard after 3 seconds
      setTimeout(() => {
        router.push('/')
      }, 3000)
    }
    else {
      verificationError.value = response.error?.message || 'Une erreur est survenue lors de la vérification'
      toast.error('Erreur de vérification', verificationError.value)
    }
  }
  catch (error) {
    console.error('Verification error:', error)
    verificationError.value = 'Une erreur est survenue lors de la vérification'
    toast.error('Erreur', verificationError.value)
  }
  finally {
    isVerifying.value = false
  }
}
</script>

<template>
  <div class="flex items-center justify-center">
    <Card>
      <template #title>
        <h1 class="text-center text-2xl font-bold">Vérification de votre email</h1>
      </template>

      <template #content>
        <!-- Loading State -->
        <div v-if="isVerifying" class="text-center">
          <Message
            class="mb-6"
            icon="i-ci-loading"
            severity="info"
          >
            <div class="flex flex-col">
              <p class="font-medium">Vérification en cours...</p>
              <p class="text-sm">Veuillez patienter pendant que nous vérifions votre email.</p>
            </div>
          </Message>
          <ProgressSpinner />
        </div>

        <!-- Success State -->
        <div v-else-if="verificationComplete" class="text-center">
          <Message
            class="mb-6"
            icon="i-ci-check"
            severity="success"
          >
            <div class="flex flex-col">
              <p class="text-theme-green-600 font-medium">Email vérifié avec succès ! 🎉</p>
              <p class="text-theme-green-400 text-sm font-normal">Votre compte a été activé. Vous allez être redirigé vers votre tableau de bord.</p>
            </div>
          </Message>

          <Button @click="router.push('/')">
            Accéder au tableau de bord
            <i class="i-ci-arrow-right ml-2" />
          </Button>
        </div>

        <!-- Error State -->
        <div v-else-if="verificationError">
          <Message
            class="mb-6"
            icon="i-ci-circle-warning"
            severity="error"
          >
            <div class="flex flex-col">
              <p class="text-theme-red-700 font-medium">Erreur de vérification</p>
              <p class="text-theme-red-600 text-sm">{{ verificationError }}</p>
            </div>
          </Message>

          <div class="flex flex-col gap-3">
            <Button
              v-if="token"
              @click="verifyEmail"
            >
              Réessayer
            </Button>
            <Button
              fluid
              severity="secondary"
              @click="router.push('/login')"
            >
              Retour
            </Button>
          </div>
        </div>

        <!-- No Token State -->
        <div v-else>
          <Message
            class="mb-6"
            icon="i-ci-circle-warning"
            severity="warn"
          >
            <div class="flex flex-col">
              <p class="font-medium">Token de vérification manquant</p>
              <p class="text-sm">Il semble que le lien de vérification soit incomplet. Veuillez vérifier votre email et cliquer sur le bon lien.</p>
            </div>
          </Message>

          <Button
            fluid
            severity="secondary"
            @click="router.push('/login')"
          >
            Retour
          </Button>
        </div>
      </template>
    </Card>
  </div>
</template>
