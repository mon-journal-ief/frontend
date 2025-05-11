<script setup>
import { useApi } from '@/api'

// ProgramElement CRUD forms
const newProgramElementForm = ref({
  name: '',
  description: '',
  programId: '',
})

const updateProgramElementForm = ref({
  id: '',
  name: '',
  description: '',
  programId: '',
})

const selectedProgramElementId = ref('')

const api = useApi()

const programElement = ref()
const programElements = ref([])
async function handleGetProgramElement() {
  programElements.value = await api.programElement.getAll()
}

// CRUD operations for programElements
const createProgramElementResponse = ref()
const updateProgramElementResponse = ref()
async function handleCreateProgramElement() {
  const response = await api.programElement.create(newProgramElementForm.value)
  createProgramElementResponse.value = response
  if (response) {
    newProgramElementForm.value = { name: '', description: '', programId: '' }
    handleGetProgramElement()
  }
}

async function handleGetProgramElementById() {
  const response = await api.programElement.get(selectedProgramElementId.value)
  if (response) {
    programElement.value = response
    updateProgramElementForm.value.id = response.id
    updateProgramElementForm.value.name = response.name
    updateProgramElementForm.value.description = response.description
    updateProgramElementForm.value.programId = response.programId
  }
}

async function handleUpdateProgramElement() {
  const response = await api.programElement.update(updateProgramElementForm.value.id, {
    name: updateProgramElementForm.value.name,
    description: updateProgramElementForm.value.description,
    programId: updateProgramElementForm.value.programId,
  })
  if (response) {
    updateProgramElementResponse.value = response
    updateProgramElementForm.value = { id: '', name: '', description: '', programId: '' }
    handleGetProgramElement()
  }
}

async function handleDeleteProgramElement(id) {
  const response = await api.programElement.remove(id)
  if (response) {
    handleGetProgramElement()
  }
}

onMounted(() => {
  handleGetProgramElement()
})
</script>

<template>
  <Card>
    <template #content>
      <Tabs value="0">
        <TabList>
          <Tab value="0">Get</Tab>
          <Tab value="1">Create</Tab>
          <Tab value="2">Update</Tab>
          <Tab value="3">Delete</Tab>
        </TabList>

        <!-- GET -->
        <TabPanel value="0">
          <div class="flex flex-col gap-4">
            <Button @click="handleGetProgramElement">Get All Program Elements</Button>
            <div class="flex gap-4">
              <InputText v-model="selectedProgramElementId" class="grow" placeholder="Program Element ID" />
              <Button @click="handleGetProgramElementById">Get By ID</Button>
            </div>

            <!-- Display programElement single -->
            <Card v-if="programElement">
              <template #title>
                <h3 class="mb-2">Results get by ID:</h3>
              </template>
              <template #content>
                <CardDebugProgramElement
                  :program-element
                  :title="programElement.name"
                />
              </template>
            </Card>

            <!-- Display programElements list -->
            <Card v-if="programElements && programElements.length">
              <template #title>
                <h3 class="mb-2">Results get ALL:</h3>
              </template>
              <template #content>
                <ul class="flex flex-col gap-2">
                  <li v-for="p in programElements" :key="p.id">
                    <CardDebugProgramElement
                      :program-element="p"
                      :title="p.name"
                    />
                  </li>
                </ul>
              </template>
            </Card>
          </div>
        </TabPanel>

        <!-- CREATE -->
        <TabPanel value="1">
          <div class="flex flex-col gap-4">
            <form class="flex flex-col gap-4" @submit.prevent="handleCreateProgramElement">
              <InputText v-model="newProgramElementForm.name" placeholder="Program Element Name" />
              <InputText v-model="newProgramElementForm.description" placeholder="Program Element Description" />
              <InputText v-model="newProgramElementForm.programId" placeholder="Program ID" />
              <Button type="submit">Create Program Element</Button>
            </form>

            <!-- Display create programElement response -->
            <CardDebugProgramElement
              v-if="createProgramElementResponse"
              :program-element="createProgramElementResponse"
              :title="createProgramElementResponse.name"
            />
          </div>
        </TabPanel>

        <!-- UPDATE -->
        <TabPanel value="2">
          <div class="flex flex-col gap-4">
            <form class="flex flex-col gap-4" @submit.prevent="handleUpdateProgramElement">
              <InputText v-model="updateProgramElementForm.id" class="grow" placeholder="Program Element ID" />
              <InputText v-model="updateProgramElementForm.name" placeholder="Program Element Name" />
              <InputText v-model="updateProgramElementForm.description" placeholder="Program Element Description" />
              <Button type="submit">Update Program Element</Button>
            </form>

            <!-- Display update programElement response -->
            <CardDebugProgramElement
              v-if="updateProgramElementResponse"
              :program-element="updateProgramElementResponse"
              :title="updateProgramElementResponse.name"
            />
          </div>
        </TabPanel>

        <!-- DELETE -->
        <TabPanel value="3">
          <div class="flex flex-col gap-4">
            <ul v-if="programElements && programElements.length" class="flex flex-col gap-8">
              <li v-for="p in programElements" :key="p.id">
                <div class="flex flex-col justify-between gap-2">
                  <CardDebugProgramElement
                    :program-element="p"
                    :title="p.name"
                  />
                  <Button
                    severity="danger"
                    @click="handleDeleteProgramElement(p.id)"
                  >
                    Delete
                  </Button>
                </div>
              </li>
            </ul>
          </div>
        </TabPanel>
      </Tabs>
    </template>
  </Card>
</template>
