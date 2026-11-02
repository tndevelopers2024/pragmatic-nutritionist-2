import test from 'node:test'
import assert from 'node:assert/strict'
import { randomFillSync } from 'node:crypto'
import sharp from 'sharp'
import { optimizeUpload, optimizedFilename } from '../../src/cms/images.js'
import { MAX_UPLOAD_BYTES, TARGET_IMAGE_BYTES } from '@pragmatic/shared/image-policy'

test('large images become smaller WebP files with proportional dimensions', async () => {
  const input = await sharp({
    create: { width: 2400, height: 1200, channels: 3, background: '#297d63' }
  })
    .png()
    .toBuffer()
  const output = await optimizeUpload(input)
  assert.equal(output.mimeType, 'image/webp')
  assert.equal(output.width, 1600)
  assert.equal(output.height, 800)
  assert.ok(output.data.length < input.length)
  const metadata = await sharp(output.data).metadata()
  assert.equal(metadata.format, 'webp')
  assert.equal(metadata.width, output.width)
  assert.equal(metadata.height, output.height)
})
test('optimization preserves transparency and never enlarges a small image', async () => {
  const input = await sharp({
    create: {
      width: 320,
      height: 160,
      channels: 4,
      background: { r: 20, g: 80, b: 50, alpha: 0.35 }
    }
  })
    .png()
    .toBuffer()
  const output = await optimizeUpload(input)
  assert.equal(output.width, 320)
  assert.equal(output.height, 160)
  const metadata = await sharp(output.data).metadata()
  assert.equal(metadata.hasAlpha, true)
  const { data } = await sharp(output.data).raw().toBuffer({ resolveWithObject: true })
  assert.ok(data[3] > 0 && data[3] < 255)
})
test('EXIF rotation is applied and camera metadata is removed', async () => {
  const input = await sharp({
    create: { width: 120, height: 60, channels: 3, background: '#e0a033' }
  })
    .jpeg()
    .withMetadata({ orientation: 6, exif: { IFD0: { Artist: 'CMS image test' } } })
    .toBuffer()
  const output = await optimizeUpload(input)
  assert.equal(output.width, 60)
  assert.equal(output.height, 120)
  const metadata = await sharp(output.data).metadata()
  assert.equal(metadata.exif, undefined)
  assert.equal(metadata.orientation, undefined)
})
test('detailed images receive further compression to reach the target size', async () => {
  const pixels = randomFillSync(Buffer.alloc(1600 * 1600 * 3))
  const input = await sharp(pixels, { raw: { width: 1600, height: 1600, channels: 3 } })
    .jpeg({ quality: 65 })
    .toBuffer()
  assert.ok(input.length < MAX_UPLOAD_BYTES)
  const output = await optimizeUpload(input)
  assert.ok(output.data.length <= TARGET_IMAGE_BYTES)
  assert.ok(output.width <= 1600 && output.height <= 1600)
})
test('corrupt, unsupported and oversized files are rejected', async () => {
  for (const input of [
    Buffer.from('<svg></svg>'),
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    Buffer.alloc(MAX_UPLOAD_BYTES + 1)
  ]) {
    await assert.rejects(
      () => optimizeUpload(input),
      (error) => error.status === 400
    )
  }
  assert.equal(optimizedFilename('My cover photo.JPG'), 'My-cover-photo.webp')
})
