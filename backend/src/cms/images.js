import sharp from 'sharp'
import {
  MAX_IMAGE_EDGE,
  MAX_IMAGE_PIXELS,
  MAX_UPLOAD_BYTES,
  TARGET_IMAGE_BYTES
} from '@pragmatic/shared/image-policy'

function invalid(message) {
  throw Object.assign(new Error(message), { status: 400 })
}

export async function optimizeUpload(input) {
  if (!input.length || input.length > MAX_UPLOAD_BYTES)
    invalid('Prepare an image smaller than 2 MB before uploading.')
  try {
    const image = sharp(input, { limitInputPixels: MAX_IMAGE_PIXELS, failOn: 'warning' })
    const metadata = await image.metadata()
    if (!['jpeg', 'png', 'webp'].includes(metadata.format))
      invalid('Choose a JPEG, PNG, or WebP image.')
    if ((metadata.pages || 1) > 1)
      invalid('Choose a still image. Animated uploads are not supported.')
    let optimized
    for (const [edge, quality] of [
      [MAX_IMAGE_EDGE, 82],
      [1200, 78],
      [960, 76],
      [720, 74],
      [480, 72]
    ]) {
      optimized = await image
        .clone()
        .autoOrient()
        .resize({ width: edge, height: edge, fit: 'inside', withoutEnlargement: true })
        .webp({ quality, effort: 4 })
        .toBuffer({ resolveWithObject: true })
      if (optimized.data.length <= TARGET_IMAGE_BYTES) break
    }
    if (optimized.data.length > MAX_UPLOAD_BYTES)
      invalid('This image could not be compressed enough. Choose a smaller image.')
    return {
      data: optimized.data,
      width: optimized.info.width,
      height: optimized.info.height,
      mimeType: 'image/webp',
      size: optimized.data.length
    }
  } catch (error) {
    if (error.status) throw error
    invalid('This image is damaged or unsupported. Choose another JPEG, PNG, or WebP image.')
  }
}

export function optimizedFilename(name) {
  const base = String(name || 'image')
    .replace(/\.[^.]*$/, '')
    .replace(/[^a-z0-9_-]/gi, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 110)
  return `${base || 'image'}.webp`
}

export function mediaFile(file) {
  return {
    id: file._id.toString(),
    name: file.filename,
    alt: file.metadata?.alt || '',
    url: `/api/cms?resource=media&id=${file._id}`,
    size: file.length,
    originalSize: file.metadata?.originalSize || file.length,
    width: file.metadata?.width,
    height: file.metadata?.height,
    mimeType: file.metadata?.mimeType,
    optimized: Boolean(file.metadata?.optimized)
  }
}
