<script setup lang="ts">
const api = useApi()
const route = useRoute()
const child = ref<IChild>()

onMounted(async () => {
  const { id } = route.params as { id: string }
  child.value = await api.children.get(id)
})
</script>

<template>
  <div v-if="child" class="flex flex-col gap-4">
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
              <JournalEntry
                v-for="entry in child.journalEntries"
                :key="entry.id"
                :model-value="entry"
              />

              <div class="flex justify-center">
                <Button
                  class="rounded-lg text-white"
                  icon="i-ci-plus"
                  severity="secondary"
                  variant="outlined"
                />
              </div>
            </div>
          </TabPanel>

          <!-- Programme -->
          <TabPanel value="1">
            <ProgramViewer />

            <div class="flex flex-col gap-4">
              <div class="flex justify-center">
                <Button
                  class="rounded-lg text-white"
                  icon="i-ci-plus"
                  severity="secondary"
                  variant="outlined"
                />
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </template>
    </Card>
  </div>
</template>
