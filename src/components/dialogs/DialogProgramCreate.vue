<script setup lang="ts">
import { z } from 'zod'

const props = defineProps<{
  child: IChild
}>()

const userStore = useUserStore()

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  grade: z.string().optional(),
  childId: z.string().min(1),
})

const visible = defineModel<boolean>({ required: true })

const form = ref<IProgramCreation>({
  name: '',
  description: undefined,
  grade: undefined,
  childId: props.child.id,
})

async function handleCreateProgram() {
  if (!formSchema.safeParse(form.value).success) return

  await api.program.create(form.value)

  userStore.fetchSelectedChild()
  visible.value = false
}
</script>

<template>
  <BaseDialog v-model="visible">
    <template #header>
      <h2 class="text-2xl font-bold">
        Créer un nouveau programme
      </h2>
    </template>

    <div class="flex flex-col gap-4">
      <FormContainer input-id="name" title="Nom *">
        <InputText
          id="name"
          v-model="form.name"
          placeholder="Nom du programme"
        />
      </FormContainer>

      <FormContainer input-id="description" title="Description">
        <InputText
          id="description"
          v-model="form.description"
          placeholder="Description (optionnelle)"
        />
      </FormContainer>

      <FormContainer input-id="grade" title="Niveau">
        <Select
          id="grade"
          v-model="form.grade"
          option-label="label"
          option-value="value"
          :options="[
            { label: 'Maternelle', value: 'Maternelle' },
            { label: 'CP', value: 'CP' },
            { label: 'CE1', value: 'CE1' },
            { label: 'CE2', value: 'CE2' },
            { label: 'CM1', value: 'CM1' },
            { label: 'CM2', value: 'CM2' },
            { label: 'Sixième', value: 'Sixième' },
            { label: 'Cinquième', value: 'Cinquième' },
            { label: 'Quatrième', value: 'Quatrième' },
            { label: 'Troisième', value: 'Troisième' },
            { label: 'Seconde', value: 'Seconde' },
            { label: 'Première', value: 'Première' },
            { label: 'Terminale', value: 'Terminale' },
          ]"
          placeholder="Niveau (optionnel)"
        />
      </FormContainer>

    </div>

    <template #footer>
      <Button label="Annuler" severity="secondary" @click="visible = false" />
      <Button
        :disabled="!formSchema.safeParse(form).success"
        label="Valider"
        @click="handleCreateProgram"
      />
    </template>
  </BaseDialog>
</template>
