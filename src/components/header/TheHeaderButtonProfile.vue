<script setup>
const userStore = useUserStore()
const { user, token } = storeToRefs(userStore)

const menu = ref()

const items = ref([
  {
    label: 'Account',
    icon: 'i-ci-user',
    route: '/account',
  },
  {
    label: 'Privacy',
    icon: 'i-ci-book-open',
    route: '/privacy',
  },
  {
    separator: true,
  },
  {
    label: 'Logout',
    icon: 'i-ci-log-out',
    class: 'text-red-600 dark:text-red-500',
    async command() {
      token.value = ''
      user.value = null
    },
  },
])

function toggle(event) {
  menu.value.toggle(event)
}
</script>

<template>
  <Button
    aria-controls="profile_menu"
    aria-haspopup="true"
    icon="i-ci-user"
    outlined
    rounded
    severity="secondary"
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
</template>
