<script setup lang="ts">
import useDateFormatter from '@/composables/useDateFormatter'

const entry = defineModel<IJournalEntry>({ required: true })
</script>

<template>
  <div class="rounded-lg border p-4 shadow-sm">
    <div class="flex items-center justify-between">
      <h3 class="flex items-center font-medium">
        <i class="i-ci-calendar mr-1 shrink-0" />
        <Inplace>
          <template #display>
            {{ useDateFormatter(entry.date) }}
          </template>
          <template #content="{ closeCallback }">
            <DatePicker v-model="entry.date" @update:model-value="closeCallback" />
          </template>
        </Inplace>
      </h3>
      <span class="text-sm text-gray-500">{{ entry.validatedElements.length }} éléments validés</span>
    </div>
    <p class="mt-2">{{ entry.comment }}</p>

    <div class="mt-3 flex items-center gap-2">
      <template v-if="entry.images.length">
        <img
          v-for="(image, index) in entry.images"
          :key="index"
          alt="Journal image"
          class="size-20 rounded object-cover"
          :src="image"
        >
      </template>
      <Inplace>
        <template #display>
          <Button
            class="rounded-lg text-white"
            icon="i-ci-plus"
            severity="secondary"
            variant="outlined"
          />
        </template>
        <template #content>
          <InputText />
        </template>
      </Inplace>
    </div>
  </div>
</template>
