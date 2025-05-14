<script setup lang="ts">
const children = ref([mockedChild, mockedChild, mockedChild])

const items = [
  {
    label: 'IEF',
    icon: 'i-ci-house-01',
    url: '/',
  },
  {
    label: 'Enfants',
    icon: 'i-ci-users-group',
    items: children.value.map(child => ({
      label: child.firstName,
      image: child.image,
      url: `/enfant/${child.id}`,
    })),
  },
]
</script>

<template>
  <div class="sticky top-0 z-20">
    <Menubar :model="items">
      <template #item="{ item, props, hasSubmenu, root }">
        <a
          v-ripple
          class="flex items-center"
          v-bind="props.action"
          :href="item.url"
        >
          <span v-if="item.icon" class="mr-2 flex items-center">
            <i :class="item.icon" />
          </span>
          <span v-if="item.image" class="mr-2">
            <Avatar :image="item.image" shape="circle" />
          </span>
          <span>{{ item.label }}</span>
          <i v-if="hasSubmenu" class="ml-auto" :class="[{ 'i-ci-chevron-down': root, 'i-ci-chevron-right': !root }]" />
        </a>
      </template>

      <template #end>
        <div class="flex items-center gap-2">
          <TheHeaderButtonDarkMode />
          <TheHeaderButtonProfile />
        </div>
      </template>
    </Menubar>
  </div>
</template>
