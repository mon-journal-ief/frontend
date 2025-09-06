import {
  type ParamValue,
  type RouteRecordInfo,
  createRouter,
  createWebHistory,
} from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import { useUserStore } from '@/stores/user'

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

// manual extension of route types
declare module 'vue-router/auto-routes' {
  export interface RouteNamedMap {
    'custom-dynamic-name': RouteRecordInfo<
      'custom-dynamic-name',
      '/added-during-runtime/[...path]',
      { path: ParamValue<true> },
      { path: ParamValue<false> }
    >
  }
}

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const { accessToken, children } = storeToRefs(userStore)
  const isAuthenticated = !!accessToken.value

  const isPublic = PUBLIC_PAGES.includes(to.path)

  if (!isPublic && !isAuthenticated) {
    next({ name: '/login' })
  }
  else if (to.path === '/' && !from.name && isAuthenticated && children.value.length === 1) {
    // QOL: redirect to the only child when starting the app
    next(`/enfant/${children.value[0]!.name}`)
  }
  else {
    next()
  }
})
