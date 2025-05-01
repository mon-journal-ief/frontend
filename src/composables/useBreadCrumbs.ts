import capitalize from '@/utils/capitalize'

const param = ref('')
const visible = ref(false)

export function useBreadcrumbs() {
  const route = useRoute()

  function setBreadcrumbs(options?: { slug: string }) {
    // Static mode - just enable breadcrumbs
    visible.value = true

    // Dynamic mode - set slug
    if (options?.slug) {
      param.value = options.slug
    }
  }

  // Reset breadcrumbs state when navigating away
  function reset() {
    param.value = ''
    visible.value = false
  }

  const isDynamicPath = computed(() => {
    return Object.keys(route.params).length > 0
  })

  const breadcrumbs = computed(() => {
    // Return empty array if breadcrumbs are not enabled
    if (!visible.value) return []

    let fullPath = ''

    // Get path segments
    const segments = route.path.split('/').slice(1)

    if (segments.length === 0) return []

    return segments.map((item, idx, arr) => {
      fullPath += `/${item}`

      const isLastDynamicSegment = isDynamicPath.value && idx === arr.length - 1 && param.value
      const label = isLastDynamicSegment ? capitalize(param.value) : capitalize(item)

      return { label, route: fullPath }
    })
  })

  onUnmounted(() => {
    reset()
  })

  return {
    breadcrumbs,
    setBreadcrumbs,
  }
}
