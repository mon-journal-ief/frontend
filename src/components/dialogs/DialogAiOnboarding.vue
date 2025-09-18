<script setup lang="ts">
const visible = defineModel<boolean>({ required: true })

async function handleClose(enabled: boolean) {
  await api.user.updatePreferences({ aiSuggestionsEnabled: enabled })

  visible.value = false
}

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
onMounted(() => {
  if (!user.value?.aiOnboardingShown) {
    api.user.updatePreferences({ aiOnboardingShown: true })
  }
})
</script>

<template>
  <BaseDialog v-if="visible" v-model="visible">
    <template #header>
      <h2 class="text-2xl font-bold">
        Suggestions par IA
      </h2>
    </template>

    <div class="flex flex-col gap-6">

      <div class="flex flex-col gap-2">
        <h3 class="text-lg font-semibold">Fonctionnement</h3>
        <p class="text-theme-surface-600 leading-relaxed">
          Pour gagner du temps dans vos saisies, vous pouvez utiliser les suggestions par IA.
          Celle-ci se basera sur votre commentaire pour vous proposer des éléments du programme en lien.
        </p>
      </div>

      <div class="flex flex-col gap-2">
        <h3 class="text-lg font-semibold">Respect de votre vie privée</h3>
        <ul class="text-theme-surface-600 leading-relaxed">
          <li>• J'utilise OpenAI pour générer les suggestions </li>
          <li>• Seul le texte de votre commentaire et le programme sont communiqués</li>
          <li>• Aucune autre information personnelle n'est transmise (noms, dates, mails, images, etc.)</li>
        </ul>
      </div>

      <Message icon="i-ci-info" severity="info">
        Vous pourrez toujours activer ou désactiver cette fonctionnalité dans vos paramètres.
      </Message>

    </div>

    <template #footer>
      <Button
        label="Continuer sans IA"
        @click="handleClose(false)"
      />
      <Button
        label="Activer les suggestions"
        @click="handleClose(true)"
      />
    </template>
  </BaseDialog>
</template>
