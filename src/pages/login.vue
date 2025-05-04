<script setup>
const token = ref('')
const user = ref({})

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

const toast = useToast()

async function handleLogin() {
  try {
    const response = await fetch('http://localhost:4000/auth/login', {
      method: 'POST',
      body: JSON.stringify(loginForm.value),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    token.value = data.token

    toast.add({
      summary: 'Login successful',
      detail: 'You have been logged in successfully',
      severity: 'success',
      life: _.TOAST_LIFE,
    })
  }
  catch (error) {
    console.error('Login error:', error)
    toast.add({
      summary: 'Login failed',
      detail: 'Invalid credentials',
      severity: 'error',
      life: _.TOAST_LIFE,
    })
  }
}

async function handleRegister() {
  const { name, email, password, confirmPassword } = registerForm.value
  if (!name || !email || !password || !confirmPassword) return
  if (password !== confirmPassword) return

  try {
    const response = await fetch('http://localhost:4000/auth/register', {
      method: 'POST',
      body: JSON.stringify(registerForm.value),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    token.value = data.token

    toast.add({
      summary: 'Registration successful',
      detail: 'You have been registered successfully',
      severity: 'success',
      life: _.TOAST_LIFE,
    })
  }
  catch (error) {
    console.error('Registration error:', error)
    toast.add({
      summary: 'Registration failed',
      detail: 'Invalid credentials',
      severity: 'error',
      life: _.TOAST_LIFE,
    })
  }
}

async function handleGetMe() {
  const response = await fetch('http://localhost:4000/auth/me', {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token.value,
    },
  })
  const data = await response.json()
  user.value = data
  if (response.ok) {
    toast.add({
      summary: 'Get /me successful',
      detail: 'You have been fetched successfully',
      severity: 'success',
      life: _.TOAST_LIFE,
    })
  }
  else {
    toast.add({
      summary: 'Get /me failed',
      detail: data.message,
      severity: 'error',
      life: _.TOAST_LIFE,
    })
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-8">
    <Card>
      <template #content>
        <h1>Token: {{ token?.slice(0, 20) }}...</h1>
        <h1>User: <pre>{{ user }}</pre></h1>
        <Button @click="handleGetMe">Get /me</Button>
      </template>
    </Card>

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
