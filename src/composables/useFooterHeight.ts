import { ref } from 'vue'

const footerHeight = ref(0)

export function useFooterHeight() {
  return {
    footerHeight,
    setFooterHeight: (height: number) => {
      footerHeight.value = height
    },
  }
}
