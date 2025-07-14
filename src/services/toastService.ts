let toastInstance: ReturnType<typeof useToast> | null = null

export function setToastInstance(toast: ReturnType<typeof useToast>) {
  toastInstance = toast
}

const DEFAULT_LIFE = 3000

export const toast = {
  success: (summary: string, detail: string, life: number = DEFAULT_LIFE) => {
    toastInstance!.add({ severity: 'success', summary, detail, life })
  },
  error: (summary: string, detail: string, life: number = DEFAULT_LIFE) => {
    toastInstance!.add({ severity: 'error', summary, detail, life })
  },
  warn: (summary: string, detail: string, life: number = DEFAULT_LIFE) => {
    toastInstance!.add({ severity: 'warn', summary, detail, life })
  },
  info: (summary: string, detail: string, life: number = DEFAULT_LIFE) => {
    toastInstance!.add({ severity: 'info', summary, detail, life })
  },
}
