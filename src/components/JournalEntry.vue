<script setup lang="ts">
import type { FileUploadSelectEvent } from 'primevue/fileupload'
import useDateFormatter from '@/composables/useDateFormatter'
import { useInplaceEdit } from '@/composables/useInplaceEdit'

const toast = useToast()

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

function onUploadImage(event: FileUploadSelectEvent) {
  if (import.meta.env.DEV) {
    const files = Array.isArray(event.files) ? event.files : [event.files]
    for (const file of files) {
      const url = URL.createObjectURL(file)
      entry.value.images.push(url)
      toast.add({
        severity: 'info',
        summary: 'Image ajoutée',
        detail: 'L\'image a été ajoutée à la liste des images',
      })
    }
  }
}
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
              <div class="flex justify-end gap-2">
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
        <p>{{ entry.comment }}</p>
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

    <div class="flex flex-wrap items-center gap-2">
      <template v-if="entry.images.length">
        <div v-for="(image, index) in entry.images" :key="index" class="relative">
          <div class="size-24 overflow-hidden rounded-lg">
            <Image
              alt="Journal image"
              class="size-full"
              image-class="size-full object-cover"
              preview
              :src="image"
            />
          </div>
          <Button
            aria-label="Supprimer l'image"
            class="absolute -right-2 -top-2 size-6 rounded-full"
            icon="i-ci-trash-empty"
            severity="danger"
            @click="entry.images.splice(index, 1)"
          />
        </div>
      </template>
      <FileUpload
        v-model="entry.images"
        accept="image/*"
        auto
        choose-label="Ajouter"
        mode="basic"
        @select="onUploadImage"
      />
    </div>
  </div>
</template>
