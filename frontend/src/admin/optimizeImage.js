import {
  IMAGE_TYPES,
  MAX_IMAGE_EDGE,
  MAX_IMAGE_PIXELS,
  MAX_SOURCE_BYTES,
  MAX_UPLOAD_BYTES
} from '@pragmatic/shared/image-policy'

async function decodeImage(file) {
  if (typeof createImageBitmap === 'function') {
    const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' })
    return { image: bitmap, release: () => bitmap.close() }
  }
  const url = URL.createObjectURL(file)
  try {
    const image = new Image()
    image.src = url
    await image.decode()
    return { image, release: () => URL.revokeObjectURL(url) }
  } catch (error) {
    URL.revokeObjectURL(url)
    throw error
  }
}

export async function optimizeImage(file) {
  if (!file || !IMAGE_TYPES.includes(file.type))
    throw new Error('Choose a JPEG, PNG, or WebP image.')
  if (!file.size || file.size > MAX_SOURCE_BYTES)
    throw new Error('Choose an image smaller than 15 MB.')
  let decoded
  try {
    decoded = await decodeImage(file)
  } catch {
    throw new Error('This image could not be read. Choose another JPEG, PNG, or WebP image.')
  }
  try {
    const { image } = decoded
    const width = image.naturalWidth || image.width
    const height = image.naturalHeight || image.height
    if (!width || !height || width * height > MAX_IMAGE_PIXELS)
      throw new Error('Choose an image under 60 megapixels.')
    // Small inputs can go straight to the server for one high-quality encoding.
    if (file.size <= MAX_UPLOAD_BYTES && Math.max(width, height) <= MAX_IMAGE_EDGE) return file
    const scale = Math.min(1, MAX_IMAGE_EDGE / Math.max(width, height))
    const canvas = document.createElement('canvas')
    canvas.width = Math.max(1, Math.round(width * scale))
    canvas.height = Math.max(1, Math.round(height * scale))
    const context = canvas.getContext('2d')
    if (!context)
      throw new Error('Your browser could not prepare the image. Please try another browser.')
    context.drawImage(image, 0, 0, canvas.width, canvas.height)
    for (const quality of [0.9, 0.8, 0.7]) {
      const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/webp', quality))
      if (blob && IMAGE_TYPES.includes(blob.type) && blob.size <= MAX_UPLOAD_BYTES) return blob
    }
    throw new Error('This image is too detailed to upload. Choose a smaller image.')
  } finally {
    decoded.release()
  }
}
