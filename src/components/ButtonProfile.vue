<script setup>
const menu = ref()
const router = useRouter()
const items = ref([
  // {
  //   label: 'Compte',
  //   icon: 'i-ci-user',
  //   route: '/account',
  // },
  // {
  //   label: 'Confidentialité',
  //   icon: 'i-ci-book-open',
  //   route: '/privacy',
  // },
  // {
  //   label: 'À propos',
  //   icon: 'i-ci-info',
  //   route: '/about',
  // },
  // {
  //   separator: true,
  // },
  {
    label: 'Déconnexion',
    icon: 'i-ci-log-out',
    class: 'text-red-600 dark:text-red-500',
    async command() {
      useUserStore().logout()
      router.push('/login')
    },
  },
])

function toggle(event) {
  menu.value.toggle(event)
}
</script>

<template>
  <div class="card flex justify-center">
    <Button
      aria-controls="profile_menu"
      aria-haspopup="true"
      class="hidden pl-1 md:block"
      icon="i-ci-user"
      outlined
      rounded
      severity="secondary"
      @click="toggle"
    />

    <Button
      aria-controls="profile_menu"
      aria-haspopup="true"
      class="text-2xl md:hidden"
      icon="i-ci-user"
      severity="secondary"
      text
      @click="toggle"
    />

    <Menu
      id="profile_menu"
      ref="menu"
      class="mt-2"
      :model="items"
      popup
    >
      <template #item="{ item, props }">
        <router-link
          v-if="item.route"
          v-slot="{ href, navigate }"
          custom
          :to="item.route"
        >
          <a
            v-bind="props.action"
            :class="item.class"
            :href
            @click="navigate"
          >
            <i v-if="item.icon" :class="item.icon" />
            <span>{{ item.label }}</span>
          </a>
        </router-link>
        <a
          v-else
          :class="item.class"
          :href="item.url"
          target="_blank"
          v-bind="props.action"
        >
          <i v-if="item.icon" :class="item.icon" />
          <span>{{ item.label }}</span>
        </a>
      </template>
    </Menu>
  </div>
</template>
