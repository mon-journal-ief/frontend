<script setup lang="ts">
const child = ref<IChild>()
const route = useRoute('/enfant/[id]')

const showDialogAddEntry = ref(false)
const loading = ref(true)

function addEntry(entry: IJournalEntry) {
  child.value?.journalEntries.push(entry)
}

async function fetchChild() {
  child.value = await api.children.get(route.params.id)
}

// refresh child when route changes
watch(
  () => route.params.id,
  async (id) => {
    if (!id) return
    loading.value = true
    await fetchChild()
    loading.value = false
  },
  { immediate: true },
)
</script>

<template>
  <div v-if="loading" class="flex h-full items-center justify-center">
    <ProgressSpinner />
  </div>

  <div v-else-if="child" class="flex flex-col gap-4">
    <DialogAddEntry
      v-if="showDialogAddEntry"
      v-model="showDialogAddEntry"
      :child-id="child.id"
      @add-entry="addEntry"
    />

    <ChildCard :child @refresh="fetchChild" />

    <Card v-if="child.program">
      <template #content>
        <Tabs value="0">
          <TabList class="-mt-4 mb-8">
            <Tab value="0">Journal de bord</Tab>
            <Tab value="1">Programme</Tab>
          </TabList>

          <!-- Journal de bord -->
          <TabPanel value="0">
            <div class="flex flex-col gap-4">
              <Button
                icon="i-ci-plus"
                label="Ajouter une entrée"
                rounded
                severity="secondary"
                variant="outlined"
                @click="showDialogAddEntry = true"
              />

              <Accordion multiple>
                <JournalEntry
                  v-for="entry in child.journalEntries"
                  :key="entry.id"
                  :entry
                  @refresh="fetchChild"
                />
              </Accordion>
            </div>
          </TabPanel>

          <!-- Programme -->
          <TabPanel value="1">
            <ProgramViewer :program="child.program" />
          </TabPanel>
        </Tabs>
      </template>
    </Card>

    <Card v-else class="flex h-full">
      <template #content>
        <ProgramPicker :child @refresh="fetchChild" />
      </template>
    </Card>
  </div>
</template>
