<script setup lang="ts">
const userStore = useUserStore()

const user = computed(() => userStore.user)

const env = computed(() => import.meta.env)

function clearLocalStorage() {
  localStorage.clear()
  toast.success('Local storage cleared', 'Local storage has been cleared')
}
</script>

<template>
  <div class="flex flex-col gap-4 overflow-auto">
    <div class="flex gap-4">
      <!-- ACTIONS -->
      <Card>
        <template #title>
          Actions
        </template>
        <template #content>
          <Card class="w-full">
            <template #content>
              <div class="flex items-center justify-between gap-4">
                <label for="account_enabled">Clear local storage</label>

                <Button
                  icon="i-ci-trash-empty"
                  label="Clear"
                  outlined
                  severity="secondary"
                  size="small"
                  @click="clearLocalStorage"
                />
              </div>
            </template>
          </Card>
        </template>
      </Card>

      <!-- ENV -->
      <Card>
        <template #title>
          Environment
        </template>
        <template #content>
          <pre class="text-sm">{{ env }}</pre>
        </template>
      </Card>
    </div>

    <!-- USER INFO -->
    <Card>
      <template #title>
        User Information
      </template>
      <template #content>
        <pre class="overflow-auto text-sm">{{ user }}</pre>
      </template>
    </Card>
  </div>
</template>
