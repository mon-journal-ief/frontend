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

function storeTokens(responseData: { accessToken: string, refreshToken: string }) {
  accessToken.value = responseData.accessToken
  document.cookie = `iefRefreshToken=${responseData.refreshToken}; path=/; max-age=${60 * 60 * 24 * 30}; secure; samesite=strict`
}

async function handleLogin() {
  const response = await api.auth.login(loginForm.value)
  const responseData = JSON.parse(response?.data.value)

  storeTokens(responseData)

  router.push('/')
}

async function handleRegister() {
  const { name, email, password, confirmPassword } = registerForm.value
  if (!name || !email || !password || !confirmPassword) return
  if (password !== confirmPassword) return

  const response = await api.auth.register(registerForm.value)
  const responseData = JSON.parse(response?.data.value)

  storeTokens(responseData)

  router.push('/')
}
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-8">
    <Card>
      <template #title>
        <h1 class="text-center text-2xl font-bold">Content de vous revoir !</h1>
      </template>

      <template #content>
        <Tabs value="0">
          <TabList class="mb-8">
            <Tab value="0">Se connecter</Tab>
            <Tab value="1">S'inscrire</Tab>
          </TabList>

          <!-- Login -->
          <TabPanel value="0">
            <form class="flex flex-col gap-4" @submit.prevent="handleLogin">
              <InputText v-model="loginForm.email" placeholder="Email" />
              <Password v-model="loginForm.password" :feedback="false" placeholder="Mot de passe" />
              <Button type="submit">Se connecter</Button>
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
