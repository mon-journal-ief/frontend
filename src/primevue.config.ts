// see https://primevue.org/theming/styled/

import { definePreset } from '@primevue/themes'
import Aura from '@primevue/themes/aura'
import type { AccordionDesignTokens } from '@primevue/themes/aura/accordion'
import type { BreadcrumbDesignTokens } from '@primevue/themes/aura/breadcrumb'
import type { ButtonDesignTokens } from '@primevue/themes/aura/button'
import type { CardDesignTokens } from '@primevue/themes/aura/card'
import type { CheckboxDesignTokens } from '@primevue/themes/aura/checkbox'
import type { DialogDesignTokens } from '@primevue/themes/aura/dialog'
import type { DataTableDesignTokens } from '@primevue/themes/aura/datatable'
import type {
  AutoCompletePassThroughOptions,
  CardPassThroughOptions,
  ChipPassThroughOptions,
  DataTablePassThroughOptions,
  DialogPassThroughOptions,
  DrawerPassThroughOptions,
  MessagePassThroughOptions,
  SelectButtonPassThroughOptions,
  TabListPassThroughOptions,
  ToastPassThroughOptions,
} from 'primevue'
import type { ToggleSwitchPassThroughOptions } from 'primevue/toggleswitch'
import { palette } from '~/palette.ts'

export const customizedAuraPreset = definePreset(Aura, {
  // We will apply border radius/ padding / etc on a component basis, via Design Tokens.
  // Applying it via global semantic.content.borderRadius would have too many side effects.
  // primitive: {
  //   borderRadius: {
  //     '2xl': '16px',
  //     '3xl': '24px',
  //   },
  // },
  primitive: palette,

  semantic: {
    primary: palette.primary,
    content: {
      borderRadius: '{border.radius.lg}',
    },
    colorScheme: {
      light: {
        surface: palette.surface,
        content: {
          background: '{surface.50}',
          hoverBackground: '{surface.100}',
          borderColor: '{surface.200}',
        },
        highlight: {
          background: '{primary.50}',
          color: '{primary.500}',
          focusBackground: '{primary.50}',
          focusColor: '{primary.500}',
        },
        list: {
          option: {
            selectedBackground: '{highlight.focusBackground}',
            selectedColor: '{highlight.focusColor}',
          },
        },
        mask: {
          background: 'rgba(1, 1, 31, 0.15)', // #01011f/15 (not in palette)
        },
        overlay: {
          modal: {
            background: '{surface.50}',
            borderColor: '{surface.200}',
          },
          popover: {
            background: '{slate-50}',
          },
        },
        formField: {
          borderColor: '{surface.300}',
          shadow: 'none',
        },
        text: {
          color: '{surface.950}',
        },
      },

      dark: {
        surface: palette.surface,
        content: {
          background: '{surface.950}',
          hoverBackground: '{surface.900}',
          borderColor: '{surface.800}',
        },
        highlight: {
          background: '{primary.950}',
          color: '{primary.500}',
          focusBackground: '{primary.950}',
          focusColor: '{primary.500}',
        },
        list: {
          option: {
            selectedBackground: '{highlight.focusBackground}',
            selectedColor: '{highlight.focusColor}',
          },
        },
        mask: {
          background: 'rgba(157, 157, 190, 0.05)', // #9d9dbe/50 (not in palette)
        },
        overlay: {
          modal: {
            background: '{surface.950}',
            borderColor: '{surface.800}',
          },
          popover: {
            background: '{slate-950}',
          },
        },
        formField: {
          borderColor: '{surface.700}',
          shadow: 'none',
        },
      },
    },
  },
  components: {
    accordion: {
      colorScheme: {
        light: {
          header: {
            color: '{surface.950}',
          },
        },
        dark: {
          header: {
            color: '{surface.50}',
          },
        },
      },
    } as AccordionDesignTokens,
    breadcrumb: {
      root: {
        padding: '0',
        gap: '0',
      },
    } as BreadcrumbDesignTokens,
    card: {
      root: {
        shadow: 'none',
        // borderRadius: '{border.radius.3xl}',
      },
    } as CardDesignTokens,
    checkbox: {
      checked: {
        background: '{primary.500}',
        borderColor: '{primary.500}',
      },
    } as CheckboxDesignTokens,
    datatable: {
      colorScheme: {
        light: {
          row: {
            hover: {
              background: 'rgba(116, 114, 134, 0.02)', // slate-500/2
              color: '{surface.950}',
            },
            color: '{surface.950}',
            selected: {
              background: 'rgba(248, 87, 23, 0.05)', // primary-500/5
              color: '{surface.950}',
            },
          },
        },
        dark: {
          row: {
            hover: {
              background: 'rgba(116, 114, 134, 0.05)', // slate-500/5
              color: '{surface.100}',
            },
            color: '{surface.100}',
            selected: {
              background: 'rgba(248, 87, 23, 0.1)', // primary-500/10
              color: '{surface.100}',
            },
          },
        },
      },
    } as DataTableDesignTokens,
    dialog: {
      footer: {
        padding: '{overlay.modal.padding}',
      },
      content: {
        padding: '{overlay.modal.padding}',
      },
    } as DialogDesignTokens,
    button: {
      // root: {
      //   borderRadius: '{border.radius.lg}',
      // },
      colorScheme: {
        light: {
          outlined: {
            secondary: {
              color: '{surface.700}',
              borderColor: '{surface.300}',
              hoverBackground: '{surface.200}',
            },
          },
          text: {
            contrast: {
              color: '{surface.900}',
            },
          },
        },
        dark: {
          outlined: {
            secondary: {
              color: '{surface.300}',
              borderColor: '{surface.700}',
              hoverBackground: '{surface.800}',
            },
          },
          text: {
            contrast: {
              color: '{surface.100}',
            },
          },
        },
      },
    } as ButtonDesignTokens,
    paginator: {
      navButton: {
        borderRadius: '{border.radius.lg}',
      },
    },
    toast: {
      colorScheme: {
        light: {
          blur: 0,
          success: {
            background: '{green.50}',
            borderColor: '{green.300}',
          },
          warn: {
            background: '{yellow.50}',
            borderColor: '{yellow.300}',
          },
          info: {
            background: '{blue.50}',
            borderColor: '{blue.300}',
          },
          error: {
            background: '{red.50}',
            borderColor: '{red.300}',
          },
        },
        dark: {
          blur: 0,
          success: {
            background: '{green.950}',
            borderColor: '{green.700}',
          },
          warn: {
            background: '{yellow.950}',
            borderColor: '{yellow.700}',
          },
          info: {
            background: '{blue.950}',
            borderColor: '{blue.700}',
          },
          error: {
            background: '{red.950}',
            borderColor: '{red.700}',
          },
        },
      },
    } as ToastPassThroughOptions,
    toggleswitch: {
      colorScheme: {
        light: {
          disabled: {
            background: 'rgba(236, 236, 255, 0.5)', // #ececff/50 (not in palette)
          },
          handle: {
            disabled: {
              background: 'rgba(157, 157, 190, 0.5)', // #9d9dbe/50 (not in palette)
            },
          },
        },
        dark: {
          disabled: {
            background: 'rgba(119, 119, 161, 0.5)', // #7777a1/50 (not in palette)
          },
          handle: {
            disabled: {
              background: 'rgba(20, 20, 46, 0.5)', // #14142e/50 (not in palette)
            },
          },
        },
      },
    } as ToggleSwitchPassThroughOptions,
  },
})

export const customPtConfig = {
  pt: {
    autoComplete: {
      // This style matches the Select component
      // root: {
      //   class: `bg-surface-50 dark:bg-surface-950 rounded-lg transition
      //           border border-surface-300 dark:border-surface-700
      //           hover:border-surface-400 dark:hover:border-surface-500
      //           [&.p-focus]:!border-primary-500 [&.p-focus]:dark:!border-primary-400`,
      // },
      inputMultiple: {
        //   class: 'border-0 bg-inherit',
        class: 'bg-inherit',
      },
      // dropdown: {
      //   class: 'border-0 bg-inherit',
      // },
      dropdownIcon: {
        class: 'text-surface-400',
      },
    } as AutoCompletePassThroughOptions,
    datatable: {
      pcPaginator: {
        paginatorContainer: {
          class: 'border-0', // Remove the border-bottom on table's paginator
        },
      },
      emptyMessage: {
        class: 'hover:bg-transparent', // fix hover background on empty state (DAS-2709)
      },
      emptyMessageCell: {
        class: 'border-0',
      },
      column: {
        // We need to override everything since primevue is using {content.background} by default and it's not customized by theme
        headerCell: {
          class: `bg-surface-100 dark:bg-surface-900 hover:bg-surface-200 dark:hover:bg-surface-800
          [&.p-datatable-column-sorted]:bg-primary-50 [&.p-datatable-column-sorted]:dark:bg-primary-950
          [&.p-datatable-column-sorted]:text-primary-400 [&.p-datatable-column-sorted]:dark:text-primary-600`,
        },
      },
      bodyRow: {
        class: `[&[data-p-selected="true"]>td]:border-primary-500
                [&[data-p-selected="false"]:has(+tr[data-p-selected="true"])>td]:border-surface-200
                [&[data-p-selected="false"]:has(+tr[data-p-selected="true"])>td]:dark:border-surface-800`,
      },
    } as DataTablePassThroughOptions,
    dialog: {
      root: {
        class: 'w-full max-w-screen-sm xl:max-w-screen-md overflow-hidden rounded-3xl',
      },
      mask: {
        class: 'p-4 backdrop-blur-sm',
      },
      title: {
        class: 'text-xl',
      },
      header: {
        class: 'bg-surface-100 dark:bg-surface-900 rounded-t-3xl border-b border-surface-200 dark:border-surface-800',
      },
      headerActions: {
        class: 'ml-auto',
      },
      footer: {
        class: 'border-t border-surface-200 dark:border-surface-800 z-10',
      },
    } as DialogPassThroughOptions,
    chip: {
      label: {
        class: 'text-sm',
      },
    } as ChipPassThroughOptions,
    card: {
      root: {
        class: 'border border-surface-200 dark:border-surface-800',
      },
      title: {
        class: 'font-semibold',
      },
    } as CardPassThroughOptions,
    drawer: {
      mask: {
        class: 'p-5 backdrop-blur-sm',
      },
      header: {
        class: 'bg-surface-100 dark:bg-surface-900 rounded-t-3xl border-b border-surface-200 dark:border-surface-800',
      },
      content: {
        class: 'p-5',
      },
      root: {
        class: 'rounded-3xl border-surface-200 dark:border-surface-800',
      },
      footer: {
        class: 'p-5 border-t border-surface-200 dark:border-surface-800',
      },
    } as DrawerPassThroughOptions,
    message: {
      root: {
        class: 'p-2 rounded-xl',
      },
      icon: {
        class: 'text-2xl mr-2',
      },
    } as MessagePassThroughOptions,
    selectButton: {
      root: {
        class: 'border border-surface-300 dark:border-surface-700', // same border as colorScheme.formField.borderColor
      },
      pcToggleButton: {
        root: {
          class: 'grow bg-transparent border-none [&.p-togglebutton-checked>.p-togglebutton-content]:bg-primary-50 [&.p-togglebutton-checked>.p-togglebutton-content]:dark:bg-primary-950 [&.p-togglebutton-checked]:text-primary-500 [&.p-togglebutton-checked]:font-semibold',
        },
      },
    } as SelectButtonPassThroughOptions,
    tabList: {
      root: {
        class: 'overflow-x-auto overflow-y-hidden',
      },
    } as TabListPassThroughOptions,
  },
}
