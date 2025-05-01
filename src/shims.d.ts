declare interface Window {
  // extend the window
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<object, object, any>
  export default component
}

// This allows sending toasts from a .ts file.
// see https://stackoverflow.com/questions/70635606/how-to-create-reusable-toastservice-with-primevue-toast
declare module 'primevue/toasteventbus' {
  import type { EventBus } from 'primevue/utils'

  export default {} as ReturnType<typeof EventBus>
}
