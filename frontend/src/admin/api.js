import { optimizeImage } from './optimizeImage'

export async function cms(resource, { id, method = 'GET', body, admin = true } = {}) {
  const query = new URLSearchParams({ resource })
  if (id) query.set('id', id)
  if (admin) query.set('admin', '1')
  const response = await fetch(`/api/cms?${query}`, {
    method,
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json', 'X-CMS-Request': '1' },
    ...(body ? { body: JSON.stringify(body) } : {})
  })
  const result = await response.json().catch(() => ({}))
  if (!response.ok)
    throw Object.assign(new Error(result.error || 'Unable to connect to the blog service.'), {
      status: response.status
    })
  return result
}
export async function uploadImage(file, alt = '') {
  const prepared = await optimizeImage(file)
  const data = await new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result.split(',')[1])
    reader.onerror = () => reject(new Error('Could not read this image. Please try again.'))
    reader.readAsDataURL(prepared)
  })
  return (
    await cms('media', {
      method: 'POST',
      body: { name: file.name, data, alt, originalSize: file.size }
    })
  ).file
}
