let toastInstance: ReturnType<typeof useToast> | null = null

export function setToastInstance(toast: ReturnType<typeof useToast>) {
  toastInstance = toast
}

const DEFAULT_LIFE = 3000 // 3 seconds
const WARNING_LIFE = 5000 // 5 seconds
const ERROR_LIFE = 10000 // 10 seconds

export const toast = {
  success: (summary: string, detail: string, life: number = DEFAULT_LIFE) => {
    toastInstance!.add({ severity: 'success', summary, detail, life })
  },
  error: (summary: string, detail: string, life: number = ERROR_LIFE) => {
    toastInstance!.add({ severity: 'error', summary, detail, life })
  },
  warn: (summary: string, detail: string, life: number = WARNING_LIFE) => {
    toastInstance!.add({ severity: 'warn', summary, detail, life })
  },
  info: (summary: string, detail: string, life: number = DEFAULT_LIFE) => { // TODO: remove this
    toastInstance!.add({ severity: 'info', summary, detail, life })
  },
}
