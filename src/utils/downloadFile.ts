export default function downloadFile({
  data,
  filename,
  isStatic = false,
  type,
}: {
  data?: unknown
  type?: string
  filename: string
  isStatic?: boolean
}) {
  let url

  if (isStatic) {
    url = `/static/${filename}`
  }
  else {
    if (!data || !type) {
      throw new Error('For a dynamic download, \'data\' and \'type\' are required.')
    }
    const blob = new Blob([data as BlobPart], { type })
    url = window.URL.createObjectURL(blob)
  }

  const a = document.createElement('a')
  a.style.display = 'none'
  a.href = url
  a.download = filename

  document.body.appendChild(a)
  a.click()

  if (!isStatic) {
    window.URL.revokeObjectURL(url)
  }

  document.body.removeChild(a)
}
