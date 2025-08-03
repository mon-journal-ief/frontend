<script setup>
// Program CRUD forms
const newProgramForm = ref({
  name: '',
  grade: 'CP',
})

const updateProgramForm = ref({
  id: '',
  name: '',
  grade: 'CP',
})

const selectedProgramId = ref('')

const program = ref()
const programs = ref([])
async function getProgram() {
  programs.value = await api.program.getAll()
}

// CRUD operations for programs
const createProgramResponse = ref()
const updateProgramResponse = ref()
async function createProgram() {
  const response = await api.program.create(newProgramForm.value)
  createProgramResponse.value = response
  if (response) {
    newProgramForm.value = { name: '', grade: 'CP' }
    getProgram()
  }
}

async function getProgramById() {
  const response = await api.program.get(selectedProgramId.value)
  if (response) {
    program.value = response
    updateProgramForm.value.id = response.id
    updateProgramForm.value.name = response.name
    updateProgramForm.value.grade = response.grade
  }
}

async function updateProgram() {
  const response = await api.program.update(updateProgramForm.value.id, {
    name: updateProgramForm.value.name,
    grade: updateProgramForm.value.grade,
  })
  if (response) {
    updateProgramResponse.value = response
    updateProgramForm.value = { id: '', name: '', grade: 'CP' }
    getProgram()
  }
}

onMounted(() => {
  getProgram()
})
</script>

<template>
  <Card>
    <template #content>
      <Tabs value="0">
        <TabList>
          <Tab value="0">Get / Delete</Tab>
          <Tab value="1">Create</Tab>
          <Tab value="2">Update</Tab>
        </TabList>

        <!-- GET -->
        <TabPanel value="0">
          <div class="flex flex-col gap-4">
            <Button @click="handleGetProgram">Get All Programs</Button>
            <div class="flex gap-4">
              <InputText v-model="selectedProgramId" class="grow" placeholder="Program ID" />
              <Button @click="getProgramById">Get By ID</Button>
            </div>

            <!-- Display program single -->
            <Card v-if="program">
              <template #title>
                <h3 class="mb-2">Results get by ID:</h3>
              </template>
              <template #content>
                <CardDebugProgram
                  :program
                  @refetch="getProgram"
                />
              </template>
            </Card>

            <!-- Display programs list -->
            <Card v-if="programs.length">
              <template #title>
                <h3 class="mb-2">Results get ALL:</h3>
              </template>
              <template #content>
                <ul class="flex flex-col gap-2">
                  <li v-for="p in programs" :key="p.id">
                    <CardDebugProgram
                      :program="p"
                      @refetch="getProgram"
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
            <form class="flex flex-col gap-4" @submit.prevent="createProgram">
              <InputText v-model="newProgramForm.name" placeholder="Program Name" />
              <Dropdown v-model="newProgramForm.grade" :options="['CP', 'CE1', 'CE2', 'CM1', 'CM2']" placeholder="Select Grade" />
              <Button type="submit">Create Program</Button>
            </form>

            <!-- Display create program response -->
            <CardDebugProgram
              v-if="createProgramResponse"
              :program="createProgramResponse"
              @refetch="getProgram"
            />
          </div>
        </TabPanel>

        <!-- UPDATE -->
        <TabPanel value="2">
          <div class="flex flex-col gap-4">
            <form class="flex flex-col gap-4" @submit.prevent="updateProgram">
              <InputText v-model="updateProgramForm.id" class="grow" placeholder="Program ID" />
              <InputText v-model="updateProgramForm.name" placeholder="Program Name" />
              <Dropdown v-model="updateProgramForm.grade" :options="['CP', 'CE1', 'CE2', 'CM1', 'CM2']" placeholder="Select Grade" />
              <Button type="submit">Update Program</Button>
            </form>

            <!-- Display update program response -->
            <CardDebugProgram
              v-if="updateProgramResponse"
              :program="updateProgramResponse"
              @refetch="getProgram"
            />
          </div>
        </TabPanel>

      </Tabs>
    </template>
  </Card>
</template>
