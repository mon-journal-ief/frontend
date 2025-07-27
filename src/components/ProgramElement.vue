<script setup lang="ts">
const element = defineModel<IProgramElement>({ required: true })

const editMode = ref(false)

const api = useApi()

const originalData = ref({
  name: element.value.name,
  description: element.value.description,
})

function startEdit(originalName: string, originalDescription: string) {
  originalData.value = {
    name: originalName,
    description: originalDescription,
  }
  editMode.value = true
}

function cancelEdit() {
  element.value.name = originalData.value.name
  element.value.description = originalData.value.description
  editMode.value = false
}

async function saveEdit() {
  await api.programElement.update(element.value.id, element.value)
  editMode.value = false
}
</script>

<template>
  <Card v-if="!editMode">
    <template #content>
      <div class="group flex justify-between gap-2">
        <div class="flex flex-col">
          <h3>{{ element.name }}</h3>
          <p v-if="element.description" class="text-slate-500">
            {{ element.description }}
          </p>
        </div>
        <Button
          class="opacity-0 transition-opacity group-hover:opacity-100"
          icon="i-ci-edit"
          rounded
          severity="secondary"
          variant="outlined"
          @click="startEdit(element.name, element.description)"
        />
      </div>

      <div
        v-for="(_child, index) in element.children"
        :key="index"
        class="mt-4 flex flex-col gap-2"
      >
        <ProgramElement v-model="element.children[index]!" />
      </div>
    </template>
  </Card>

  <Card v-else>
    <template #content>
      <div class="flex flex-col gap-4">
        <FormContainer input-id="name" title="Nom">
          <InputText id="name" v-model="element.name" />
        </FormContainer>

        <FormContainer input-id="description" title="Description">
          <InputText id="description" v-model="element.description" />
        </FormContainer>

        <div class="mt-4 flex justify-end gap-2">
          <Button
            icon="i-ci-close-md"
            label="Annuler"
            severity="secondary"
            variant="outlined"
            @click="cancelEdit()"
          />
          <Button
            icon="i-ci-check"
            label="Enregistrer"
            variant="outlined"
            @click="saveEdit"
          />
        </div>
      </div>
    </template>
  </Card>
</template>
