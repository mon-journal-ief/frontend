<script setup lang="ts">
import { useColorMode } from '@vueuse/core'

const props = defineProps<{
  child: IChild
}>()

const emit = defineEmits<{
  refresh: []
}>()

const loading = ref({
  templates: true,
  copy: false,
})

const availablePrograms = ref<IProgram[]>([])
const selectedTemplate = ref<IProgram | null>(null)

onMounted(async () => {
  const programs = await api.programTemplate.getAll()
  availablePrograms.value = programs || []
  loading.value.templates = false
})

const projectedGrade = computed(() => {
  if (!props.child.age) return null

  if (props.child.age < 6) return 'Maternelle'
  if (props.child.age < 7) return 'CP'
  if (props.child.age < 8) return 'CE1'
  if (props.child.age < 9) return 'CE2'
  if (props.child.age < 10) return 'CM1'
  if (props.child.age < 11) return 'CM2'
  if (props.child.age < 12) return 'Sixième'
  if (props.child.age < 13) return 'Cinquième'
  if (props.child.age < 14) return 'Quatrième'
  if (props.child.age < 15) return 'Troisième'
  if (props.child.age < 16) return 'Seconde'
  if (props.child.age < 17) return 'Première'

  return 'Terminale'
})

const colorMode = useColorMode()
function getCardBorderClasses(program: IProgram) {
  const isRecommended = projectedGrade.value === program.grade
  const isSelected = selectedTemplate.value?.id === program.id
  const isDarkMode = colorMode.store.value === 'dark'

  if (isSelected) return 'border-primary-700 dark:!border-primary-300'

  // Somehow the classes are bugged with the tailwinddark selector
  if (isRecommended) return isDarkMode ? ' dark:!border-blue-600' : ' !border-blue-400'

  return 'hover:border-primary-400 hover:dark:!border-primary-600'
}

async function copyTemplate() {
  if (!selectedTemplate.value?.id) return

  loading.value.copy = true
  await api.programTemplate.copy(selectedTemplate.value.id, props.child.id)
  loading.value.copy = false

  emit('refresh')
}
</script>

<template>
  <div class="m-auto flex flex-col gap-8 p-6">
    <!-- Header text -->
    <div class="flex flex-col gap-2">
      <h2 class="text-theme-surface-800 !text-3xl font-semibold">
        Choisissez un programme pour votre enfant
      </h2>
      <p class="text-theme-surface-600 text-lg">
        Vous pouvez sélectionner un programme existant ou créer le vôtre de toutes pièces.<br>
        Quelque soit votre choix, vous pourrez toujours personnaliser le programme après sélection.
      </p>
    </div>

    <!-- Available programs section -->
    <div class="flex flex-col gap-4">
      <h4 class="text-theme-surface-700 text-lg font-medium">Programmes existants</h4>

      <div v-if="loading.templates" class="flex justify-center">
        <ProgressSpinner />
      </div>

      <div v-else class="grid gap-3 xl:grid-cols-2">
        <Card
          v-for="program in availablePrograms"
          :key="program.id"
          class="cursor-pointer"
          :pt:root:class="getCardBorderClasses(program)"
          @click="selectedTemplate = program"
        >
          <template #content>
            <div class="flex flex-col gap-2">
              <div class="flex items-center justify-between">
                <Badge severity="info" :value="program.grade" />
                <span class="text-theme-surface-600 text-xs">
                  {{ program.elements?.length || 0 }} éléments
                </span>
              </div>

              <div class="flex flex-col">
                <h5 class="text-theme-surface-800 font-semibold">{{ program.name }}</h5>
                <p v-if="program.description" class="text-theme-surface-600 text-sm">
                  {{ program.description }}
                </p>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </div>

    <!-- Action buttons -->
    <div v-if="!loading.templates" class="flex flex-col gap-4 sm:flex-row">
      <Button
        v-if="availablePrograms.length > 0"
        :disabled="!selectedTemplate"
        icon="i-ci-check"
        label="Utiliser ce programme"
        :loading="loading.copy"
        severity="success"
        size="large"
        @click="copyTemplate"
      />

      <Button
        icon="i-ci-plus"
        label="Créer un nouveau programme"
        severity="secondary"
        size="large"
        variant="outlined"
      />
    </div>

  </div>
</template>
