<script setup lang="ts">
const api = useApi()
const route = useRoute()
const child = ref<IChild>()

const showDialogAddEntry = ref(false)

// refresh child when route changes
watch(
  () => (route.params as { id?: string }).id,
  async (id) => {
    if (!id) return
    child.value = await api.children.get(id)
  },
  { immediate: true },
)
</script>

<template>
  <div v-if="child" class="flex flex-col gap-4">
    <DialogAddEntry v-model="showDialogAddEntry" />

    <ChildCard :child />

    <Card>
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
  </div>
</template>
