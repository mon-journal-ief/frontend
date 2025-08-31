import PrimeVue from 'primevue/config'
import Tooltip from 'primevue/tooltip'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { VueUmamiPlugin } from '@jaseeey/vue-umami-plugin'
import { createHead } from '@unhead/vue'
import { customPtConfig, customizedAuraPreset } from '@/primevue.config'
import '@/assets/main.css'
import { router } from '@/router'
import App from '@/App.vue'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

const primeVueSettings = {
  theme: {
    preset: customizedAuraPreset,
    options: {
      darkModeSelector: '.dark',
      cssLayer: {
        name: 'primevue',
        order: 'tailwind-base, primevue, tailwind-utilities',
      },
    },
  },
  ptOptions: {
    mergeProps: true,
  },
  locale: { noFileChosenMessage: 'Pas de fichier sélectionné' },
  ...customPtConfig,
}

async function initializeApp() {
  try {
    app.use(VueUmamiPlugin({
      websiteID: import.meta.env.VITE_UMAMI_WEBSITE_ID ?? 'Dummy',
      allowLocalhost: true,
      scriptSrc: import.meta.env.VITE_UMAMI_ENDPOINT,
      router,
    }))

    // Vue
    app.use(router)
    app.use(createHead())

    // PrimeVue
    app.use(PrimeVue, primeVueSettings)
    app.directive('tooltip', Tooltip)
    app.use(ToastService)
    app.use(ConfirmationService)

    app.mount('#app')
  }
  catch (err) {
    console.error('⚠️ Error initializing app', err)
  }
}

initializeApp()
