import { ObjectId, GridFSBucket } from 'mongodb'
import { readFile } from 'node:fs/promises'
import { getDb } from '../src/cms/db.js'
import {
  checkMutation,
  checkLoginRate,
  createSession,
  getUser,
  logout,
  verifyPassword
} from '../src/cms/auth.js'
import { isPublished, normalizePost, publicPost } from '../src/cms/content.js'
import { mediaFile, optimizedFilename, optimizeUpload } from '../src/cms/images.js'
import { MAX_SOURCE_BYTES } from '@pragmatic/shared/image-policy'
import { BLOG_POSTS } from '../data/blogPosts.js'
import { LEGACY_BLOG_SLUG_REDIRECTS } from '@pragmatic/shared/blog'

const error = (message, status = 400) => Object.assign(new Error(message), { status })
const legacySlugs = new Set(BLOG_POSTS.map((post) => post.slug))
const objectId = (value) => {
  if (!/^[a-f0-9]{24}$/i.test(value || '')) throw error('Invalid record ID.')
  return new ObjectId(value)
}
const adminPost = (post) => ({
  ...post,
  // Retired publication states stay private and can be edited as drafts.
  status: post.status === 'scheduled' ? 'draft' : post.status,
  id: post._id.toString(),
  _id: undefined,
  revisions: undefined
})
async function legacyPost(slug) {
  if (!BLOG_POSTS.some((p) => p.slug === slug)) return null
  const article = JSON.parse(
    await readFile(new URL(`../data/blog/${slug}.json`, import.meta.url), 'utf8')
  )
  return {
    ...article,
    id: `legacy:${slug}`,
    status: 'published',
    revision: 0,
    author: 'Meenu Balaji, M.H.Sc',
    aliases: []
  }
}
async function findAdminPost(posts, id) {
  if (!id.startsWith('legacy:')) return posts.findOne({ _id: objectId(id) })
  const slug = id.slice(7)
  return await posts.findOne({ $or: [{ slug }, { aliases: slug }] }) || legacyPost(slug)
}
async function readBody(req) {
  if (req.body !== undefined) {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
    if (Buffer.byteLength(JSON.stringify(body)) > 3_000_000)
      throw error('Upload is too large.', 413)
    return body && typeof body === 'object' && !Array.isArray(body) ? body : {}
  }
  let size = 0
  const chunks = []
  for await (const chunk of req) {
    size += chunk.length
    if (size > 3_000_000) throw error('Upload is too large.', 413)
    chunks.push(chunk)
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString() || '{}')
  } catch {
    throw error('Invalid request body.')
  }
}
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  res.setHeader('X-Content-Type-Options', 'nosniff')
  try {
    if (!['GET', 'POST', 'PUT'].includes(req.method)) {
      res.setHeader('Allow', 'GET, POST, PUT')
      throw error('Method not allowed.', 405)
    }
    checkMutation(req)
    const url = new URL(req.url, 'http://localhost')
    const resource = url.searchParams.get('resource') || 'posts'
    const id = url.searchParams.get('id')
    if (
      !process.env.MONGODB_URI &&
      resource === 'posts' &&
      req.method === 'GET' &&
      !url.searchParams.has('admin')
    ) {
      const slug = url.searchParams.get('slug')
      if (slug) {
        const post = await legacyPost(slug)
        return post
          ? res.status(200).json({ post: publicPost(post, true) })
          : res.status(404).json({ error: 'Article not found.', managed: false })
      }
      return res.status(200).json({ posts: BLOG_POSTS, managedSlugs: [] })
    }
    const db = await getDb()
    const posts = db.collection('posts')

    if (resource === 'posts' && req.method === 'GET' && !url.searchParams.has('admin')) {
      const slug = url.searchParams.get('slug')
      if (slug) {
        const post = await posts.findOne({ $or: [{ slug }, { aliases: slug }] })
        if (!post) {
          const legacy = await legacyPost(slug)
          return legacy
            ? res.status(200).json({ post: publicPost(legacy, true) })
            : res.status(404).json({ error: 'Article not found.', managed: false })
        }
        if (!isPublished(post))
          return res.status(404).json({ error: 'Article not found.', managed: true })
        return res.status(200).json({ post: publicPost(post, true) })
      }
      const visible = await posts
        .find(
          { status: 'published' },
          { projection: { revisions: 0, contentHtml: 0, headings: 0 } }
        )
        .sort({ publishedAt: -1 })
        .toArray()
      // Every managed slug overrides the bundled legacy copy, including drafts.
      const managed = await posts.find({}, { projection: { slug: 1, aliases: 1 } }).toArray()
      const overridden = new Set(managed.flatMap(p => [p.slug, ...(p.aliases || [])]))
      return res.status(200).json({
        posts: [
          ...visible.map((p) => publicPost(p)),
          ...BLOG_POSTS.filter(p => !overridden.has(p.slug))
        ].sort((a, b) => new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0)),
        managedSlugs: managed
          .flatMap((p) => [p.slug, ...(p.aliases || [])])
          .filter((slug) => legacySlugs.has(slug))
      })
    }
    if (resource === 'media' && req.method === 'GET' && id) {
      const _id = objectId(id)
      const file = await db.collection('media.files').findOne({ _id })
      if (!file) throw error('Image not found.', 404)
      res.setHeader('Content-Type', file.metadata.mimeType)
      res.setHeader('Content-Length', file.length)
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
      const stream = new GridFSBucket(db, { bucketName: 'media' }).openDownloadStream(_id)
      return await new Promise((resolve, reject) => {
        stream.on('error', reject)
        res.on('finish', resolve)
        stream.pipe(res)
      })
    }
    if (resource === 'login' && req.method === 'POST') {
      await checkLoginRate(db, req)
      const body = await readBody(req)
      const email =
        typeof body.email === 'string' ? body.email.toLowerCase().trim().slice(0, 254) : ''
      const password = typeof body.password === 'string' ? body.password.slice(0, 512) : ''
      const user = await db.collection('users').findOne({ email })
      // Run the same expensive hash even when the account does not exist.
      const valid = await verifyPassword(
        password,
        user?.passwordHash || `${'0'.repeat(32)}:${'0'.repeat(128)}`
      )
      if (!valid || !user) throw error('Email or password is incorrect.', 401)
      await createSession(db, user, res)
      return res.status(200).json({ user: { email: user.email, name: user.name } })
    }
    const user = await getUser(db, req)
    if (!user) throw error('Please sign in to continue.', 401)
    if (resource === 'session' && req.method === 'GET')
      return res.status(200).json({ user: { email: user.email, name: user.name } })
    if (resource === 'logout' && req.method === 'POST') {
      await logout(db, req, res)
      return res.status(200).json({ ok: true })
    }
    if (resource === 'media') {
      if (req.method === 'GET') {
        const files = await db
          .collection('media.files')
          .find({}, { projection: { filename: 1, metadata: 1, uploadDate: 1, length: 1 } })
          .sort({ uploadDate: -1 })
          .limit(100)
          .toArray()
        return res.status(200).json({
          files: files.map(mediaFile)
        })
      }
      if (req.method === 'POST') {
        const body = await readBody(req)
        if (typeof body.data !== 'string') throw error('Choose an image to upload.')
        const data = Buffer.from(body.data, 'base64')
        const optimized = await optimizeUpload(data)
        const filename = optimizedFilename(body.name)
        const originalSize =
          Number.isSafeInteger(body.originalSize) &&
          body.originalSize > 0 &&
          body.originalSize <= MAX_SOURCE_BYTES
            ? body.originalSize
            : data.length
        const metadata = {
          mimeType: optimized.mimeType,
          alt: String(body.alt || '').slice(0, 250),
          uploadedBy: user.email,
          originalSize,
          uploadedSize: data.length,
          width: optimized.width,
          height: optimized.height,
          optimized: true
        }
        const stream = new GridFSBucket(db, { bucketName: 'media' }).openUploadStream(filename, {
          metadata
        })
        await new Promise((resolve, reject) => {
          stream.on('finish', resolve)
          stream.on('error', reject)
          stream.end(optimized.data)
        })
        return res.status(201).json({
          file: mediaFile({ _id: stream.id, filename, metadata, length: optimized.size })
        })
      }
    }
    if (resource === 'posts' && req.method === 'GET') {
      if (id) {
        const post = await findAdminPost(posts, id)
        if (!post) throw error('Article not found.', 404)
        return res.status(200).json({ post: post._id ? adminPost(post) : post })
      }
      const managed = await posts
        .find({}, { projection: { revisions: 0, contentHtml: 0, headings: 0 } })
        .sort({ updatedAt: -1 })
        .toArray()
      const slugs = new Set(managed.flatMap((p) => [p.slug, ...(p.aliases || [])]))
      return res.status(200).json({
        posts: [
          ...managed.map(adminPost),
          ...BLOG_POSTS.filter((p) => !slugs.has(p.slug)).map((p) => ({
            ...p,
            id: `legacy:${p.slug}`,
            status: 'published',
            revision: 0
          }))
        ]
      })
    }
    if (resource === 'revisions' && req.method === 'GET') {
      const post = await posts.findOne({ _id: objectId(id) })
      if (!post) throw error('Article not found.', 404)
      return res.status(200).json({ revisions: (post.revisions || []).reverse() })
    }
    if (resource === 'posts' && ['POST', 'PUT'].includes(req.method)) {
      const body = await readBody(req)
      const previous = id ? await findAdminPost(posts, id) : null
      const legacy = previous && !previous._id ? previous : null
      if (req.method === 'PUT' && !previous) throw error('Article not found.', 404)
      if (previous && body.revision !== previous.revision)
        throw error('This article changed in another window. Reload before saving.', 409)
      const normalized = normalizePost(body, previous)
      if (Object.hasOwn(LEGACY_BLOG_SLUG_REDIRECTS, normalized.slug))
        throw error('That URL is reserved for an existing article redirect.', 409)
      const aliases = [
        ...new Set([
          ...(previous?.aliases || []),
          ...(previous && previous.slug !== normalized.slug ? [previous.slug] : [])
        ])
      ].filter((s) => s !== normalized.slug)
      const reserved = [normalized.slug, ...aliases]
      const collision = await posts.findOne({
        ...(previous?._id ? { _id: { $ne: previous._id } } : {}),
        $or: [{ slug: { $in: reserved } }, { aliases: { $in: reserved } }]
      })
      if (
        collision ||
        BLOG_POSTS.some(
          (p) =>
            reserved.includes(p.slug) &&
            p.slug !== previous?.slug &&
            !previous?.aliases?.includes(p.slug)
        )
      )
        throw error('That URL is already used by another article.', 409)
      const now = new Date()
      if (previous?._id) {
        const { revisions, _id, ...snapshot } = previous
        void revisions
        void _id
        const saved = await posts.findOneAndUpdate(
          { _id: previous._id, revision: body.revision },
          {
            $set: { ...normalized, aliases, reservedSlugs: reserved, updatedBy: user.email },
            $inc: { revision: 1 },
            $push: { revisions: { $each: [{ ...snapshot, savedAt: now }], $slice: -20 } }
          },
          { returnDocument: 'after' }
        )
        if (!saved)
          throw error('This article changed in another window. Reload before saving.', 409)
        return res.status(200).json({ post: adminPost(saved) })
      }
      const post = {
        ...normalized,
        aliases,
        reservedSlugs: reserved,
        revision: 1,
        createdAt: now,
        createdBy: user.email,
        updatedBy: user.email,
        revisions: legacy ? [{ ...legacy, savedAt: now }] : []
      }
      const { insertedId } = await posts.insertOne(post)
      return res.status(201).json({ post: adminPost({ ...post, _id: insertedId }) })
    }
    throw error('Endpoint not found.', 404)
  } catch (err) {
    const status = err.code === 11000 ? 409 : err.status || 500
    if (status >= 500) console.error('CMS request failed:', err.name, err.code || '')
    if (res.headersSent) return res.destroy()
    return res.status(status).json({
      code: err.code === 'CMS_NOT_CONFIGURED' ? err.code : undefined,
      error:
        status === 409
          ? err.status
            ? err.message
            : 'That URL is already used by another article.'
          : status === 500
            ? 'The blog service could not complete this request. Please try again.'
            : err.message
    })
  }
}
