<script setup lang="ts">
const props = defineProps<{
  child?: IChild
}>()

const emits = defineEmits<{
  refresh: []
}>()

const visible = defineModel<boolean>('visible', { required: true })
const router = useRouter()

const isEditing = computed(() => !!props.child)

// Initialize with existing child data if editing
const name = ref(props.child?.name || '')
const birthdate = ref<Date | undefined>(props.child?.birthdate ? new Date(props.child.birthdate) : undefined)
const lastName = ref(props.child?.lastName || '')
const gender = ref<EGender | undefined>(props.child?.gender)

async function handleSubmit() {
  if (!name.value) {
    toast.info('Champ incomplet', 'Le prénom est requis')

    return
  }

  if (isEditing.value && props.child) {
    // Update existing child
    await api.children.update(props.child.id, {
      ...props.child,
      name: name.value,
      lastName: lastName.value,
      birthdate: birthdate.value,
      gender: gender.value,
    })
  }
  else {
    // Create new child
    const child = await api.children.create({
      name: name.value,
      lastName: lastName.value,
      birthdate: birthdate.value,
      gender: gender.value,
    })

    router.push(`/enfant/${child.id}`)
  }

  emits('refresh')
  visible.value = false
}
</script>

<template>
  <BaseDialog v-model="visible">

    <template #header>
      <h2 class="text-2xl font-bold">
        {{ isEditing ? 'Modifier l\'enfant' : 'Ajouter un enfant' }}
      </h2>
    </template>

    <div class="flex flex-col gap-4">

      <FormContainer input-id="name" title="Prénom *">
        <InputText
          id="name"
          v-model="name"
          placeholder="Prénom"
          @keyup.enter="handleSubmit"
        />
      </FormContainer>

      <FormContainer input-id="lastName" title="Nom de famille">
        <InputText
          id="lastName"
          v-model="lastName"
          placeholder="Nom de famille (optionnel)"
          @keyup.enter="handleSubmit"
        />
      </FormContainer>

      <FormContainer input-id="birthdate" title="Date de naissance">
        <DatePicker
          id="birthdate"
          v-model="birthdate"
          date-format="dd/mm/yy"
          :max-date="new Date()"
          placeholder="Date de naissance (optionnel)"
          show-icon
        />
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
      <Button :label="isEditing ? 'Modifier' : 'Ajouter'" @click="handleSubmit" />
    </template>

  </BaseDialog>
</template>
