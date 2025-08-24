<script setup lang="ts">
interface TableOfContentsItem {
  title: string
  page: number
  subtitle?: string
}

interface Props {
  config: {
    pages: {
      cover?: boolean | { display: boolean }
      tableOfContents?: boolean
      programElementsReference?: boolean
    }
  }
  journalEntriesCount?: number
  customItems?: TableOfContentsItem[]
}

const props = withDefaults(defineProps<Props>(), {
  journalEntriesCount: 0,
  customItems: undefined,
})

// Calculate the page number for each section based on configuration
const tableOfContentsItems = computed((): TableOfContentsItem[] => {
  if (props.customItems) {
    return props.customItems
  }

  const items: TableOfContentsItem[] = []
  let currentPage = 1

  // Cover page (if enabled)
  const hasCoverPage = props.config.pages.cover === true
    || (typeof props.config.pages.cover === 'object' && props.config.pages.cover.display)

  if (hasCoverPage) {
    items.push({
      title: 'Page de couverture',
      page: currentPage,
    })
    currentPage += 2 // Cover page + table of contents page
  }
  else {
    currentPage += 1 // Just table of contents page
  }

  // Child information page
  items.push({
    title: 'Informations de l\'enfant',
    page: currentPage,
  })
  currentPage += 1

  // Journal entries
  if (props.journalEntriesCount > 0) {
    items.push({
      title: 'Entrées du journal',
      subtitle: `${props.journalEntriesCount} entrée${props.journalEntriesCount > 1 ? 's' : ''}`,
      page: currentPage,
    })
  }

  return items
})
</script>

<template>
  <div class="mx-auto mb-12 max-w-2xl break-before-page break-after-page">
    <div class="my-16 text-center text-4xl font-bold text-surface-800">
      Table des matières
    </div>

    <div class="space-y-6">
      <div
        v-for="item in tableOfContentsItems"
        :key="item.title"
        class="flex items-center justify-between border-b border-surface-100 pb-3 text-lg"
      >
        <span class="flex flex-col">
          <span class="font-semibold text-surface-800">{{ item.title }}</span>
          <span v-if="item.subtitle" class="mt-1 text-base text-surface-600">
            ({{ item.subtitle }})
          </span>
        </span>
        <span class="text-xl font-bold text-primary-600">{{ item.page }}</span>
      </div>
    </div>
  </div>
</template>
