<script setup lang="ts">
const userStore = useUserStore()
const { accessToken } = storeToRefs(userStore)

const router = useRouter()

const loginForm = ref({
  email: '',
  password: '',
})

const registerForm = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const tabValue = ref('0')

const loginError = ref('')
const showEmailVerificationPrompt = ref(false)
const unverifiedUserEmail = ref('')

function storeTokens(responseData: { accessToken: string, refreshToken: string }) {
  accessToken.value = responseData.accessToken
  document.cookie = `iefRefreshToken=${responseData.refreshToken}; path=/; max-age=${60 * 60 * 24 * 30}; secure; samesite=strict`
}

async function handleLogin() {
  loginError.value = ''
  showEmailVerificationPrompt.value = false

  try {
    const result = await api.auth.login(loginForm.value)

    if (result.success) {
      // Successful login
      if (result.data) {
        storeTokens(result.data)
        router.push('/')
      }
    }
    else if (result.error?.requiresVerification) {
      // User needs to verify email
      showEmailVerificationPrompt.value = true
      unverifiedUserEmail.value = result.error.email || loginForm.value.email
      loginError.value = result.error.message || `Activez d'abord votre compte en cliquant sur le lien reçu par email.`
    }
    else {
      // Other errors
      loginError.value = result.error?.message || 'Une erreur est survenue lors de la connexion'
      toast.error('Erreur de connexion', result.error?.message || 'Une erreur est survenue')
    }
  }
  catch (error: any) {
    console.error('Login error:', error)
    loginError.value = 'Erreur de connexion. Vérifiez votre connexion internet.'
    toast.error('Erreur de connexion', 'Erreur de connexion. Vérifiez votre connexion internet.')
  }
}

async function resendVerificationEmail() {
  try {
    const result = await api.auth.resendEmailVerification(unverifiedUserEmail.value)

    if (result.success) {
      showEmailVerificationPrompt.value = false
      loginError.value = ''
      toast.success('Email envoyé', 'Un nouvel email de vérification a été envoyé')
    }
    else {
      toast.error('Erreur', result.error?.message || `Une erreur est survenue lors de l'envoi de l'email`)
    }
  }
  catch (error) {
    console.error('Resend verification error:', error)
    toast.error('Erreur', `Une erreur est survenue lors de l'envoi de l'email`)
  }
}

const registrationSuccess = ref(false)

async function handleRegister() {
  const { name, email, password, confirmPassword } = registerForm.value

  if (!name || !email || !password || !confirmPassword) {
    toast.error('Erreur', 'Veuillez remplir tous les champs')

    return
  }

  if (password !== confirmPassword) {
    toast.error('Erreur', 'Les mots de passe ne correspondent pas')

    return
  }

  try {
    const result = await api.auth.register(registerForm.value)

    if (result.success) {
      // Registration successful, but requires email verification
      registrationSuccess.value = true
      tabValue.value = '0'

      toast.success('Compte créé !', 'Consultez votre boîte mail pour activer votre compte')
    }
    else {
      // Registration error
      toast.error(`Erreur lors de l'inscription`, result.error?.message || `Une erreur est survenue lors de l'inscription`)
    }
  }
  catch (error) {
    console.error('Registration error:', error)
    toast.error(`Erreur lors de l'inscription`, `Une erreur est survenue lors de l'inscription`)
  }
}
</script>

<template>
  <div class="flex items-center justify-center">
    <Card>
      <template #title>
        <h1 class="text-center text-2xl font-bold">Content de vous revoir !</h1>
      </template>

      <template #content>
        <!-- Registration Success Message -->
        <Message
          v-if="registrationSuccess"
          class="my-2"
          icon="i-ci-mail"
          severity="success"
        >
          <div class="flex flex-col">
            <p class="text-theme-green-600 font-medium">Félicitations ! Votre compte a été créé</p>
            <p class="text-theme-green-400 font-normal">Un email de confirmation vous a été envoyé. Cliquez sur le lien pour activer votre compte.</p>
            <Button
              class="ml-[-0.6rem] mt-2 self-start"
              severity="secondary"
              size="small"
              text
              @click="resendVerificationEmail"
            >
              Renvoyer l'email
            </Button>
          </div>
        </Message>

        <Tabs v-model:value="tabValue" class="w-full">
          <TabList class="mb-8">
            <Tab class="flex-1" value="0">Se connecter</Tab>
            <Tab class="flex-1" value="1">S'inscrire</Tab>
          </TabList>

          <!-- Login -->
          <TabPanel value="0">
            <form class="flex flex-col gap-4" @submit.prevent="handleLogin">
              <InputText v-model="loginForm.email" placeholder="Email" />
              <Password v-model="loginForm.password" :feedback="false" placeholder="Mot de passe" />

              <!-- Login Error -->
              <Message v-if="loginError" icon="i-ci-circle-warning" severity="error">
                <p class="text-theme-red-700 font-medium">Erreur de connexion</p>
                <p class="text-theme-red-600 text-sm">{{ loginError }}</p>
              </Message>

              <!-- Email Verification Prompt -->
              <Message v-if="showEmailVerificationPrompt" icon="i-ci-mail" severity="warn">
                <div class="flex flex-col">
                  <p class="font-medium">Compte non activé</p>
                  <p class="mt-1 text-sm">Consultez votre boîte mail et cliquez sur le lien de confirmation pour accéder à votre compte.</p>
                  <Button
                    class="ml-[-0.6rem] mt-2 self-start"
                    severity="secondary"
                    size="small"
                    text
                    @click="resendVerificationEmail"
                  >
                    Renvoyer l'email
                  </Button>
                </div>
              </Message>

              <Button type="submit">Se connecter</Button>

              <!-- Forgot Password Link -->
              <div class="text-center">
                <Button
                  fluid
                  severity="secondary"
                  size="small"
                  text
                  @click="router.push('/mot-de-passe-oublie')"
                >
                  Mot de passe oublié ?
                </Button>
              </div>
            </form>
          </TabPanel>

          <!-- Register -->
          <TabPanel value="1">
            <form class="flex flex-col gap-4" @submit.prevent="handleRegister">
              <InputText v-model="registerForm.name" placeholder="Nom" />
              <InputText v-model="registerForm.email" placeholder="Email" />
              <Password v-model="registerForm.password" :feedback="false" placeholder="Mot de passe" />
              <Password v-model="registerForm.confirmPassword" :feedback="false" placeholder="Confirmation du mot de passe" />
              <Button type="submit">Créer un compte</Button>
            </form>
          </TabPanel>
        </Tabs>
      </template>
    </Card>
  </div>
</template>
