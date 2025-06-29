import { ref } from 'vue'

const headerHeight = ref(0)
const bottomMargin1rem = 12

export function useHeaderHeight() {
  return {
    headerHeight,
    setHeaderHeight: (height: number) => {
      headerHeight.value = height + bottomMargin1rem
    },
  }
}
