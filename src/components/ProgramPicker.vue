<script setup lang="ts">
import { calculateProjectedCycle } from '~/utils/ageCalculator'

const props = defineProps<{
  child: IChild
}>()

const userStore = useUserStore()

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

const sortedPrograms = computed(() => {
  const projectedGrade = calculateProjectedCycle(props.child.birthdate)

  return [...availablePrograms.value].sort((a, b) => {
    // If one program matches the projected grade, put it first
    const aMatches = a.cycle === projectedGrade
    const bMatches = b.cycle === projectedGrade

    if (aMatches && !bMatches) return -1
    if (!aMatches && bMatches) return 1

    // If both match or both don't match, retain the original order
    return 0
  })
})

async function copyProgramTemplate() {
  if (!selectedTemplate.value?.id) return

  loading.value.copy = true
  await api.programTemplate.copy(selectedTemplate.value.id, props.child.id)
  loading.value.copy = false

  userStore.fetchSelectedChild()
}

const showDialogProgramCreate = ref(false)
</script>

<template>
  <DialogProgramCreate
    v-model="showDialogProgramCreate"
    :child
  />

  <div class="m-auto flex flex-col gap-8 p-6">
    <!-- Header text -->
    <div class="flex flex-col gap-2">
      <h2 class="text-theme-surface-800 !text-3xl font-semibold">
        Choisissez un programme
      </h2>
      <p class="text-theme-surface-600 text-dlg">
        Vous pourrez le personnaliser après sélection.
      </p>
    </div>

    <!-- Available programs section -->
    <div class="flex flex-col gap-4">
      <h4 class="text-theme-surface-700 text-lg font-medium">Programmes officiels</h4>
      <Message
        class="mb-4"
        icon="i-ci-info text-3xl px-4"
        pt:text:class="text-sm"
        severity="info"
      >
        Les programmes ont été retranscrits avec IA selon les programmes officiels.<br>
        Ils ont été vérifiés et corrigés, mais il se peut que des erreurs persistent, n'hésitez pas à me les signaler.
      </Message>

      <!-- Additionnal comments
      Certains programmes comportent une mention d'âge. En effet, lors des mises à jours récentes
      de certaines parties du programme (notamment français et mathématiques), l'Éducation Nationale a
      choisi de donner des attendus en fonction de la classe de l'élève.
            -->

      <div v-if="loading.templates" class="flex justify-center">
        <CustomSpinner />
      </div>

      <div v-else class="grid gap-3 xl:grid-cols-2">
        <Card
          v-for="program in sortedPrograms"
          :key="program.id"
          class="cursor-pointer border-2"
          :pt:root:class="selectedTemplate?.id === program.id ? '!border-green-400 dark:!border-green-600' : 'hover:border-primary-400 hover:dark:!border-primary-600'"
          @click="selectedTemplate = program"
        >
          <template #content>
            <div class="flex flex-col gap-2">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                  <BaseTag v-if="calculateProjectedCycle(child.birthdate) === program.cycle" color="green" value="Suggeré" />
                  <div v-if="program.grades.length" class="space-x-2">
                    <BaseTag
                      v-for="grade in program.grades"
                      :key="grade"
                      color="yellow"
                      :value="grade"
                    />
                  </div>
                </div>
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
        @click="copyProgramTemplate"
      />

      <Button
        icon="i-ci-plus"
        label="Créer un nouveau programme"
        severity="secondary"
        variant="outlined"
        @click="showDialogProgramCreate = true"
      />
    </div>

  </div>
</template>
