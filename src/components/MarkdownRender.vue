<script setup lang="ts">
import MarkdownIt from 'markdown-it'
import DOMPurify from 'dompurify'

const props = defineProps<{
  markdownString: string
}>()

const md = MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
})

const sanitizedHtml = computed(() => DOMPurify.sanitize(md.render(props.markdownString)))
</script>

<template>
  <div class="text-slate-900 dark:text-slate-100" v-html="sanitizedHtml" />
</template>

<style scoped>
:deep(h1) {
  @apply text-3xl text-slate-950 dark:text-slate-50 font-semibold mt-8 mb-4
}

:deep(h2) {
  @apply text-2xl text-slate-950 dark:text-slate-50 font-semibold mt-6 mb-3
}

:deep(h3) {
  @apply text-xl text-slate-950 dark:text-slate-50 font-semibold mt-5 mb-2
}

:deep(h4) {
  @apply text-lg text-slate-950 dark:text-slate-50 font-semibold mt-4 mb-2
}

:deep(h5) {
  @apply text-base text-slate-950 dark:text-slate-50 font-semibold mt-4 mb-2
}

:deep(h6) {
  @apply text-sm text-slate-950 dark:text-slate-50 font-semibold mt-4 mb-2
}

:deep(blockquote) {
  @apply pl-4 border-l-4 border-slate-300 dark:border-slate-700 my-4
}

:deep(blockquote > blockquote) {
  @apply mt-2 mb-2
}

:deep(blockquote p) {
  @apply text-slate-600 dark:text-slate-400
}

:deep(ul) {
  @apply list-disc list-inside
}

:deep(ol) {
  @apply list-decimal list-inside
}

:deep(ul ul), :deep(ol ol), :deep(ul ol), :deep(ol ul) {
  @apply ml-4
}

:deep(li p) {
  @apply inline-block
}

:deep(pre) {
  @apply bg-slate-100 dark:bg-slate-800 p-4 rounded-md
}

:deep(pre > code) {
  @apply text-sm
}

:deep(p) {
  @apply mb-2 leading-relaxed
}

:deep(a) {
  @apply text-primary-500 dark:text-primary-400 hover:underline
}

:deep(hr) {
  @apply my-8 border-t border-slate-200 dark:border-slate-700
}

:deep(code:not(pre code)) {
  @apply bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-sm font-mono
}

:deep(table) {
  @apply w-full mb-4 border-collapse
}

:deep(th), :deep(td) {
  @apply border border-slate-300 dark:border-slate-700 px-4 py-2
}

:deep(th) {
  @apply bg-slate-100 dark:bg-slate-800 font-semibold
}

:deep(img) {
  @apply max-w-full h-auto rounded-lg my-4
}

:deep(strong) {
  @apply font-semibold
}

:deep(em) {
  @apply italic
}

:deep(del) {
  @apply line-through
}
</style>
