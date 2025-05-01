import antfu from '@antfu/eslint-config'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat()

const ignores = ['dist/*', 'node_modules/*', '.pnpm-store/*', 'src/schema.d.ts', 'openapi.json']

export default await antfu(
  {
    vue: {
      overrides: {
        'vue/attribute-hyphenation': 'error',
        'vue/v-on-event-hyphenation': 'error',
        'vue/custom-event-name-casing': ['error', 'camelCase'],
        'vue/attributes-order': ['error', {
          alphabetical: true,
        }],
        'vue/prop-name-casing': 'off',
        'vue/singleline-html-element-content-newline': 'off',
        'vue/max-attributes-per-line': ['error', {
          singleline: 3,
          multiline: 1,
        }],
        'vue/multiline-html-element-content-newline': ['error', {
          allowEmptyLines: true,
        }],
        'vue/require-typed-object-prop': 'warn', // TODO: turn to error into type refactor PR
        'vue/define-props-declaration': 'error',
        'vue/define-emits-declaration': 'error',
        'vue/v-bind-style': ['error', 'shorthand', {
          sameNameShorthand: 'always',
        }],
        'vue/no-empty-component-block': 'error',
        'vue/block-order': ['error', {
          order: ['script', 'template', 'styles'],
        }],
        'vue/no-required-prop-with-default': 'error',
        'vue/prefer-true-attribute-shorthand': 'error',
      },
    },
    rules: {
      'antfu/if-newline': 'off',
      'curly': ['error', 'multi-line'],
      'eqeqeq': 'error',
      'func-style': ['error', 'declaration'],
      'newline-before-return': 'error',
      'no-console': 'warn',
      'no-duplicate-imports': 'error',
      'no-else-return': 'error',
      'no-lonely-if': 'error',
      'no-negated-condition': 'error',
      'node/prefer-global/process': 'off',
      'object-shorthand': 'error',
      'unused-imports/no-unused-vars': 'warn',
      'no-useless-catch': 'error',
    },
    yaml: false,
    markdown: false,
  },
  ...compat.config({
    // https://github.com/francoismassart/eslint-plugin-tailwindcss
    extends: ['plugin:tailwindcss/recommended'],
    rules: {
      'tailwindcss/no-custom-classname': 'off',
    },
  }),
  { ignores },
)
