import { ref } from 'vue'

const headerHeight = ref(0)

export function useHeaderHeight() {
  return {
    headerHeight,
    setHeaderHeight: (height: number) => {
      headerHeight.value = height
    },
  }
}
