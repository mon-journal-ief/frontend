<script setup lang="ts">
const visible = defineModel<boolean>('visible', { required: true })

const api = useApi()

const name = ref('')
const age = ref<number>()
const lastName = ref('')
const gender = ref<EGender>()

async function handleAddChild() {
  await api.children.create({
    name: name.value,
    lastName: lastName.value,
    age: age.value,
    gender: gender.value,
  })

  await useUserStore().fetchUser()

  visible.value = false
}
</script>

<template>
  <BaseDialog v-model="visible">

    <template #header>
      <h2 class="text-2xl font-bold">
        Ajouter un enfant
      </h2>
    </template>

    <div class="flex flex-col gap-4">

      <FormContainer input-id="name" title="Prénom *">
        <InputText id="name" v-model="name" placeholder="Prénom" />
      </FormContainer>

      <FormContainer input-id="lastName" title="Nom de famille">
        <InputText id="lastName" v-model="lastName" placeholder="Nom de famille (optionnel)" />
      </FormContainer>

      <FormContainer input-id="age" title="Age">
        <InputNumber id="age" v-model="age" placeholder="Age (optionnel)" />
      </FormContainer>

      <FormContainer input-id="gender" title="Sexe">
        <Select
          id="gender"
          v-model="gender"
          option-label="label"
          option-value="value"
          :options="[
            {
              label: 'Garçon',
              value: 'MALE',
            },
            {
              label: 'Fille',
              value: 'FEMALE',
            },
          ]"
          placeholder="Sexe (optionnel)"
        />
      </FormContainer>

    </div>

    <template #footer>
      <Button label="Annuler" severity="secondary" @click="visible = false" />
      <Button label="Ajouter" @click="handleAddChild" />
    </template>

  </BaseDialog>
</template>
