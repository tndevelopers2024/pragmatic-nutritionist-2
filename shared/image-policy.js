export const MAX_SOURCE_BYTES = 15_000_000
export const MAX_UPLOAD_BYTES = 2_000_000
export const MAX_IMAGE_EDGE = 1600
export const TARGET_IMAGE_BYTES = 500_000
export const MAX_IMAGE_PIXELS = 60_000_000
export const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']

export function formatImageSize(bytes) {
  return bytes >= 1_000_000
    ? `${(bytes / 1_000_000).toFixed(1)} MB`
    : `${Math.max(1, Math.round(bytes / 1000))} KB`
}

export function imageUploadMessage(file) {
  const saved = Math.max(0, Math.round((1 - file.size / file.originalSize) * 100))
  return `Image uploaded · ${formatImageSize(file.size)}${saved ? ` · ${saved}% smaller` : ''}`
}
