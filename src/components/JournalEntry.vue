<script setup lang="ts">
import useDateFormatter from '@/composables/useDateFormatter'
import { useInplaceEdit } from '@/composables/useInplaceEdit'

const entry = defineModel<IJournalEntry>({ required: true })

const {
  editingValue: editingComment,
  onEditOpen: onEditOpenComment,
  onCancel: onCancelComment,
  onSave: onSaveComment,
} = useInplaceEdit(entry.value.comment)

const {
  editingValue: editingDate,
  onEditOpen: onEditOpenDate,
  onCancel: onCancelDate,
  onSave: onSaveDate,
} = useInplaceEdit(entry.value.date)
</script>

<template>
  <div class="rounded-lg border p-4 shadow-sm">
    <div class="flex items-center justify-between">
      <h3 class="flex items-center font-medium">
        <i class="i-ci-calendar mr-1 shrink-0" />
        <Inplace @open="() => onEditOpenDate(entry.date)">
          <template #display>
            {{ useDateFormatter(entry.date) }}
          </template>
          <template #content="{ closeCallback }">
            <div class="flex gap-3">
              <DatePicker
                v-model="editingDate"
                class="w-full"
              />
              <div class="mt-2 flex justify-end gap-2">
                <Button
                  class="rounded-lg"
                  icon="i-ci-close"
                  label="Annuler"
                  severity="secondary"
                  text
                  @click="() => onCancelDate(entry.date, closeCallback)"
                />
                <Button
                  class="rounded-lg text-white"
                  icon="i-ci-save"
                  label="Enregistrer"
                  severity="primary"
                  @click="() => onSaveDate(v => entry.date = v, closeCallback)"
                />
              </div>
            </div>
          </template>
        </Inplace>
      </h3>
      <span class="text-sm text-gray-500">{{ entry.validatedElements.length }} éléments validés</span>
    </div>
    <Inplace @open="() => onEditOpenComment(entry.comment)">
      <template #display>
        <p class="mt-2">{{ entry.comment }}</p>
      </template>
      <template #content="{ closeCallback }">
        <div class="flex w-full flex-col gap-3">
          <Textarea
            v-model="editingComment"
            auto-resize
            class="w-full"
            placeholder="Ajoutez votre commentaire ici..."
          />
          <div class="flex justify-end gap-2">
            <Button
              class="rounded-lg"
              icon="i-ci-close"
              label="Annuler"
              severity="secondary"
              text
              @click="() => onCancelComment(entry.comment, closeCallback)"
            />
            <Button
              class="rounded-lg text-white"
              icon="i-ci-save"
              label="Enregistrer"
              severity="primary"
              @click="() => onSaveComment(v => entry.comment = v, closeCallback)"
            />
          </div>
        </div>
      </template>
    </Inplace>

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
