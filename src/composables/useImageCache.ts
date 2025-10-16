// Global cache busters map for all images
const imageCacheBusters = ref<Record<string, number>>({})

export function useImageCache() {
  function getImageUrl(src: string): string {
    const cacheBuster = imageCacheBusters.value[src] || Date.now()

    return `${src}?v=${cacheBuster}`
  }

  function bustCache(src: string): void {
    imageCacheBusters.value[src] = Date.now()
  }

  function removeFromCache(src: string): void {
    delete imageCacheBusters.value[src]
  }

  return {
    getImageUrl,
    bustCache,
    removeFromCache,
  }
}
