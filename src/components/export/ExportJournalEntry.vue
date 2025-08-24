<script setup lang="ts">
defineProps<{
  entry: IJournalEntry
  index: number
  config: {
    showComments: boolean
    showValidatedElements: boolean
    showImages: boolean
  }
}>()
</script>

<template>
  <div class="mb-8 break-inside-avoid rounded-3xl border border-surface-200 bg-white p-6">
    <!-- Header with date only -->
    <div class="mb-6 border-b border-surface-100 pb-4">
      <div class="text-xl font-semibold text-surface-700">
        {{ new Date(entry.date).toLocaleDateString('fr-FR', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }) }}
      </div>
    </div>

    <div class="space-y-6">
      <!-- Commentaire -->
      <div v-if="config.showComments" class="space-y-3">
        <div class="rounded-lg border-l-4 border-primary-400 bg-primary-50 p-4">
          <div class="flex items-start space-x-3">
            <i class="i-ci-book-open text-2xl text-primary-600" />
            <div class="min-w-0 flex-1">
              <div class="text-sm leading-relaxed text-surface-700">
                {{ entry.comment }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Éléments validés -->
      <div v-if="entry.validatedElements?.length > 0 && config.showValidatedElements" class="space-y-3">
        <div class="rounded-lg border-l-4 border-green-400 bg-green-50 p-4">
          <div class="space-y-3">
            <div
              v-for="element in entry.validatedElements"
              :key="element.id"
              class="flex items-start space-x-3"
            >
              <i class="i-ci-circle-check text-2xl text-green-600" />
              <div class="min-w-0 flex-1">
                <div class="text-sm font-medium text-green-800">
                  {{ element.name }}
                </div>
                <div v-if="element.description" class="mt-1 text-xs leading-relaxed text-green-700">
                  {{ element.description }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Images -->
      <div v-if="entry.images?.length > 0 && config.showImages" class="space-y-3">
        <div class="grid gap-4" :class="entry.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'">
          <div
            v-for="(image, imageIndex) in entry.images"
            :key="imageIndex"
            class="overflow-hidden rounded-xl"
          >
            <img
              :alt="`Image ${imageIndex + 1}`"
              class="h-auto w-full rounded-xl object-contain"
              :src="image"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
