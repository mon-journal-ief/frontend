<script setup>
const toast = useToast()

const userStore = useUserStore()
const { token, user } = storeToRefs(userStore)

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

const api = useApi()

async function handleLogin() {
  const response = await api.auth.login(loginForm.value)

  token.value = response.data.value.token
}

async function handleRegister() {
  const { name, email, password, confirmPassword } = registerForm.value
  if (!name || !email || !password || !confirmPassword) return
  if (password !== confirmPassword) return

  const response = await api.auth.register(registerForm.value, toast)
  token.value = response.data.value.token
}

async function handleGetMe() {
  const response = await api.auth.me(token.value, toast)
  user.value = response.data.value
}
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-8">
    <Card>
      <template #content>
        <Tabs value="0">
          <TabList class="mb-8">
            <Tab value="0">Login</Tab>
            <Tab value="1">Register</Tab>
          </TabList>

          <!-- Login -->
          <TabPanel value="0">
            <form class="flex flex-col gap-4" @submit.prevent="handleLogin">
              <InputText v-model="loginForm.email" placeholder="Email" />
              <Password v-model="loginForm.password" :feedback="false" placeholder="Password" />
              <Button type="submit">Login</Button>
            </form>
          </TabPanel>

          <!-- Register -->
          <TabPanel value="1">
            <form class="flex flex-col gap-4" @submit.prevent="handleRegister">
              <InputText v-model="registerForm.name" placeholder="Name" />
              <InputText v-model="registerForm.email" placeholder="Email" />
              <Password v-model="registerForm.password" :feedback="false" placeholder="Password" />
              <Password v-model="registerForm.confirmPassword" :feedback="false" placeholder="Confirm Password" />
              <Button type="submit">Register</Button>
            </form>
          </TabPanel>
        </Tabs>
      </template>
    </Card>
  </div>
</template>
