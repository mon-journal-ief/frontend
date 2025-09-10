<script setup lang="ts">
const route = useRoute('/enfant/[name]')
const router = useRouter()

const userStore = useUserStore()
const { children, selectedChild } = storeToRefs(userStore)

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
  selectedChild.value?.journalEntries.push(entry)
}

// refresh child when route changes and set default tab if needed
watch(
  () => route.params.name,
  async (name) => {
    if (!name) router.push('/enfants')

    const matchingChild = children.value.find(child => child.name === name)
    if (!matchingChild) router.push('/enfants')

    selectedChild.value = matchingChild!

    loading.value = true
    await userStore.fetchSelectedChild()
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

  <div v-else-if="selectedChild" class="flex h-full flex-col gap-2 md:gap-4">
    <DialogJournalEntryForm
      v-if="showDialogAddEntry && selectedChild.program"
      v-model="showDialogAddEntry"
      :child-id="selectedChild.id"
      :program-id="selectedChild.program.id"
      @add-entry="addEntry"
    />

    <ChildCard :child="selectedChild" />

    <Card
      v-if="selectedChild.program"
      class="flex flex-1 flex-col"
      pt:body:class="h-full"
      pt:content:class="h-full"
    >
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
                icon="i-ci-plus text-lg -mb-1 mr-1"
                label="Ajouter une entrée"
                rounded
                severity="secondary"
                variant="outlined"
                @click="showDialogAddEntry = true"
              />

              <div
                v-if="selectedChild.journalEntries.length === 0"
                class="flex h-full flex-col place-items-end items-center justify-end gap-8 text-2xl md:hidden"
              >
                <p> Appuyez ici pour ajouter une entrée</p>
                <i class="i-ci-arrow-down-md animate-bounce text-5xl" />
              </div>

              <div class="flex-1 overflow-y-auto">
                <Accordion
                  collapse-icon="i-ci-caret-down-md text-3xl"
                  expand-icon="i-ci-caret-up-md text-3xl"
                  multiple
                >
                  <JournalEntry
                    v-for="entry in selectedChild.journalEntries"
                    :key="entry.id"
                    :child-id="selectedChild.id"
                    :entry
                    :program-id="selectedChild.program?.id"
                  />
                </Accordion>
              </div>
            </div>
          </TabPanel>

          <!-- Programme -->
          <TabPanel class="flex flex-1 flex-col" value="1">
            <div class="flex-1 overflow-y-auto">
              <ProgramViewer :program="selectedChild.program" />
            </div>
          </TabPanel>
        </Tabs>
      </template>
    </Card>

    <Card v-else class="flex flex-1 flex-col">
      <template #content>
        <ProgramPicker :child="selectedChild" />
      </template>
    </Card>
  </div>
</template>
