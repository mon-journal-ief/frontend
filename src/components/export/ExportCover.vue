<script setup lang="ts">
interface Props {
  child: IChild
  config: {
    display: boolean
    progress: boolean
    progressLegend: boolean
    generationDate: boolean
    picture: boolean
  }
}

const props = defineProps<Props>()
</script>

<template>
  <div v-if="props.config.display" class="cover-page flex min-h-screen flex-col justify-center px-8 text-center">
    <!-- Main Title -->
    <div class="my-16">
      <div class="text-6xl font-bold text-surface-800">
        Journal de suivi
      </div>
    </div>

    <!-- Child Information -->
    <div class="mb-16 space-y-8">

      <!-- Child Picture -->
      <div v-if="props.config.picture && props.child.profileImage" class="flex justify-center">
        <img
          class="max-h-[600px] w-auto rounded-3xl border-4 border-surface-200 object-cover"
          :src="props.child.profileImage"
        >
      </div>

      <div class="flex flex-col place-items-center text-lg text-surface-600">
        <div class="text-4xl font-semibold text-surface-700">
          {{ props.child.name }}{{ props.child.lastName ? ` ${props.child.lastName}` : '' }}
        </div>

        <div class="flex space-x-8">
          <div v-if="calculateAge(props.child.birthdate)" class="flex items-center space-x-2">
            <span class="font-medium">Âge :</span>
            <span>{{ calculateAge(props.child.birthdate) }} ans</span>
          </div>
          <div v-if="props.child.gender" class="flex items-center space-x-2">
            <span class="font-medium">Classe :</span>
            <span>{{ props.child.program?.grade }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Progress Statistics -->
    <div
      v-if="props.child.program?.elements && props.config.progress"
      class="mx-auto flex max-w-md flex-col gap-4"
    >
      <div class="text-2xl font-bold text-surface-700">Avancement du programme</div>
      <ProgressBar
        :elements="props.child.program.elements"
        :pt="{ labelList: { class: props.config.progressLegend ? 'text-sm' : 'hidden' } }"
      />
    </div>

    <!-- Footer -->
    <div class="mt-auto text-surface-500">
      <div v-if="props.config.generationDate" class="text-lg">
        Au {{ new Date().toLocaleDateString('fr-FR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }) }}
      </div>
    </div>
  </div>
</template>
