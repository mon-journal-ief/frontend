<script setup lang="ts">
const child = ref<IChild>()
const route = useRoute('/enfant/[id]')
const router = useRouter()

const uiStore = useUIStore()
const { showDialogAddEntry } = storeToRefs(uiStore)
const loading = ref(true)

// Compute active tab based on URL query parameter
const activeTab = computed(() => {
  const tab = route.query.tab as string
  if (tab === 'programme') return '1'

  return '0' // default to journal
})

// Update URL when tab changes
function onTabChange(tabValue: string | number) {
  const tab = tabValue === '1' ? 'programme' : 'journal'
  router.push({
    path: route.path,
    query: { ...route.query, tab },
  })
}

function addEntry(entry: IJournalEntry) {
  child.value?.journalEntries.push(entry)
}

async function fetchChild() {
  child.value = await api.children.get(route.params.id)
}

// refresh child when route changes and set default tab if needed
watch(
  () => route.params.id,
  async (id) => {
    if (!id) return
    loading.value = true
    await fetchChild()
    loading.value = false

    // Set default tab in URL if no tab parameter exists
    if (!route.query.tab) {
      router.replace({
        path: route.path,
        query: { ...route.query, tab: 'journal' },
      })
    }
  },
  { immediate: true },
)
</script>

<template>
  <div v-if="loading" class="flex h-full items-center justify-center">
    <CustomSpinner />
  </div>

  <div v-else-if="child" class="flex h-full flex-col gap-4">
    <DialogJournalEntryForm
      v-if="showDialogAddEntry && child.program"
      v-model="showDialogAddEntry"
      :child-id="child.id"
      :program-id="child.program.id"
      @add-entry="addEntry"
    />

    <ChildCard :child @refresh="fetchChild" />

    <Card v-if="child.program" class="flex flex-1 flex-col">
      <template #content>
        <Tabs class="flex size-full flex-col" :value="activeTab" @update:value="onTabChange">
          <TabList class="-mt-4 mb-4 md:mb-8">
            <Tab class="flex-1 text-lg" value="0">Journal de bord</Tab>
            <Tab class="flex-1 text-lg" value="1">Programme</Tab>
          </TabList>

          <!-- Journal de bord -->
          <TabPanel class="flex flex-1 flex-col" value="0">
            <div class="flex flex-1 flex-col gap-4">
              <Button
                class="hidden md:block"
                icon="i-ci-plus"
                label="Ajouter une entrée"
                rounded
                severity="secondary"
                variant="outlined"
                @click="showDialogAddEntry = true"
              />

              <div class="flex-1 overflow-y-auto">
                <Accordion
                  collapse-icon="i-ci-remove-minus text-3xl"
                  expand-icon="i-ci-add-plus text-3xl"
                  multiple
                >
                  <JournalEntry
                    v-for="entry in child.journalEntries"
                    :key="entry.id"
                    :child-id="child.id"
                    :entry
                    :program-id="child.program?.id"
                    @refresh="fetchChild"
                  />
                </Accordion>
              </div>
            </div>
          </TabPanel>

          <!-- Programme -->
          <TabPanel class="flex flex-1 flex-col" value="1">
            <div class="flex-1 overflow-y-auto">
              <ProgramViewer :program="child.program" />
            </div>
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
