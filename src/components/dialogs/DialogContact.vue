<script setup lang="ts">
const visible = defineModel<boolean>({ required: true })

const message = ref('')
const subject = ref('')

async function handleSubmit() {
  try {
    const result = await api.contact.sendMessage({
      subject: subject.value,
      message: message.value,
    })

    if (result?.success) {
      toast.success('Message envoyé !', result.message || 'Je vous reviendrai vers vous très rapidement si nécessaire :)')
    }
  }
  catch (error) {
    console.error('Error sending contact message:', error)
    toast.error('Erreur', 'Erreur lors de l\'envoi du message. Veuillez réessayer.')
  }
}
</script>

<template>
  <BaseDialog v-if="visible" v-model="visible">
    <template #header>
      <h2 class="text-2xl font-bold">
        Contact
      </h2>
    </template>

    <div class="flex flex-col gap-4">
      <FormContainer input-id="contact-subject" title="Sujet *">
        <InputText
          id="contact-subject"
          v-model="subject"
          placeholder="Sujet de votre message"
        />
      </FormContainer>

      <FormContainer input-id="contact-message" title="Message *">
        <Textarea
          id="contact-message"
          v-model="message"
          auto-resize
          placeholder="Décrivez votre demande, question ou suggestion..."
          rows="3"
        />
      </FormContainer>
    </div>

    <template #footer>
      <Button
        label="Annuler"
        severity="secondary"
        @click="visible = false"
      />
      <Button
        :disabled="!subject || !message"
        label="Envoyer"
        @click="handleSubmit"
      />
    </template>
  </BaseDialog>
</template>
