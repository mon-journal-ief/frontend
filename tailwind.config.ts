import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'
import { getIconCollections, iconsPlugin } from '@egoist/tailwindcss-icons'
import { palette } from './src/palette.cjs'

export default <Partial<Config>>{
  content: [
    './index.html',
    './src/**/*.{vue,js,ts}',
  ],
  theme: {
    extend: {
      colors: palette,
      fontFamily: {
        sans: ['Urbanist', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  darkMode: 'class',
  plugins: [
    iconsPlugin({
      collections: getIconCollections(['ci']),
    }),
  ],
  // Be careful using this option, it can lead to a lot of unused CSS being generated
  safelist: [
    {
      // line-clamp class used in ReadMore.vue is generated dynamically
      pattern: /^line-clamp-(\d+)$/,
    },
  ],
}
