import { URL, fileURLToPath } from 'node:url'
import path from 'node:path'

import { defineConfig } from 'vite'

/* Vue & devtools */
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

/* Router */
import VueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'

/* Autoimport & components */
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

/* Fonts */
import Unfonts from 'unplugin-fonts/vite'

/* Icons */
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

/* Primevue */
import { PrimeVueResolver } from '@primevue/auto-import-resolver'

// TODO update
const isDebugMode = process.env.DEBUG === 'True'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueRouter({
      extensions: ['.vue', '.md'],
      routesFolder: 'src/pages',
      dts: 'src/typed-router.d.ts',
    }),
    vue(),

    AutoImport({
      imports: [
        'vue',
        VueRouterAutoImports,
        'pinia',
        { 'vue-router/auto': ['useLink'] },
        { 'primevue/usetoast': ['useToast'] },
        { 'primevue/useconfirm': ['useConfirm'] },
        { '@/services/toastService': ['toast'] },
        { '@/api': ['useApi'] },
      ],
      dts: 'src/auto-imports.d.ts',
      dirs: [
        'src/stores/**/*.ts',
        'src/utils/**/*.ts',
      ],
      vueTemplate: true,
    }),

    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: 'src/components.d.ts',
      resolvers: [
        PrimeVueResolver(),
        IconsResolver(),
      ],
    }),
    vueDevTools(),
    Unfonts({
      google: {
        families: [
          {
            name: 'Madimi One',
            styles: 'ital,wght@0,400;0,600;1,400;1,600',
            defer: true,
          },
        ],
      },
    }),
    Icons({ defaultClass: 'transition-all duration-100' }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  server: {
    port: 4173,
  },
  optimizeDeps: {
    include: [
      'pinia-plugin-persistedstate',
      'primevue/progressspinner',
      'primevue/card',
      'primevue/chart',
      'primevue/datatable',
      'primevue/column',
      'primevue/tag',
      'primevue/message',
      'primevue/password',
      'primevue/checkbox',
      'primevue/inputtext',
      'primevue/stepper',
      'primevue/dialog',
      'primevue/divider',
      'primevue/stepitem',
      'primevue/steppanel',
      'primevue/radiobutton',
      'primevue/step',
      'primevue/inputnumber',
      'primevue/tree',
      'primevue/tabs',
      'primevue/tabpanels',
      'primevue/tabpanel',
      'primevue/tablist',
      'primevue/tab',
      'primevue/badge',
      'primevue/accordion',
      'primevue/accordionpanel',
      'primevue/accordioncontent',
      'primevue/accordionheader',
      'primevue/panel',
      'primevue/textarea',
      'primevue/toggleswitch',
      'primevue/confirmdialog',
      'primevue/autocomplete',
      'primevue/iconfield',
      'primevue/inputicon',
      'primevue/selectbutton',
      'primevue/multiselect',
      'primevue/popover',
      'primevue/buttongroup',
      'primevue/toasteventbus',
      'primevue/timeline',
      'primevue/fileupload',
      'lodash-es',
      'tldjs',
    ],
  },
  build: {
    emptyOutDir: true,
    outDir: 'dist',
    assetsDir: 'static',
    cssMinify: !isDebugMode,
    minify: !isDebugMode,
  },
})
