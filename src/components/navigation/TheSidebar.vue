<script setup lang="ts">
const isDevelopmentMode = ref(import.meta.env.VITE_MODE === 'development')

const userStore = useUserStore()
const { children } = storeToRefs(userStore)
const placeholderBoy = '/placeholder-boy.png'
const placeholderGirl = '/placeholder-girl.png'

function getChildImage(child: IChild) {
  return computed(() => {
    return child.profileImage || (child.gender === 'MALE' ? placeholderBoy : placeholderGirl)
  })
}
</script>

<template>
  <div class="sticky top-0 flex h-screen w-full flex-col justify-between md:w-64">
    <div class="flex flex-col gap-4 overflow-y-auto p-4">
      <RouterLink to="/">
        <div class="flex items-center gap-2">
          <img alt="Mon journal IEF" class="size-8" src="/chasti_logo_md.png">
          <p class="text-theme-surface-800 text-2xl font-bold">Mon journal IEF</p>
        </div>
      </RouterLink>

      <!-- NAVIGATION -->
      <nav class="mb-4 flex flex-col gap-2">

        <!-- HOME -->
        <TheSidebarButton
          icon="i-ci-house-01"
          label="Accueil"
          route="/"
        />

        <!-- ENFANTS SECTION -->
        <TheSidebarButton
          icon="i-ci-users-group"
          label="Enfants"
          route="/enfants"
        />

        <div class="flex flex-col gap-1 pl-4">
          <TheSidebarButton
            v-for="child in children"
            :key="child.id"
            :image="getChildImage(child).value"
            :label="child.name"
            :route="`/enfant/${child.name}`"
          />
        </div>

        <!-- DEBUG -->
        <TheSidebarButton
          v-if="isDevelopmentMode"
          icon="i-ci-cookie"
          label="Debug"
          route="/debug"
        />

        <!-- EXPORT (Development) -->
        <TheSidebarButton
          v-if="isDevelopmentMode"
          icon="i-ci-share-ios-export"
          label="Debug PDF"
          route="/export/pdf"
        />
      </nav>
    </div>

    <div class="flex gap-4 p-4">
      <ButtonProfile />
      <ButtonContact />
      <ButtonDarkMode />
    </div>
  </div>
</template>
