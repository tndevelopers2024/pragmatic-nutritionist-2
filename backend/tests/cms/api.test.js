import { before, after, test } from 'node:test'
import assert from 'node:assert/strict'
import { createServer } from 'node:http'
import sharp from 'sharp'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { app } from '../../src/app.js'
import { closeDb, getDb } from '../../src/cms/db.js'
import { hashPassword } from '../../src/cms/auth.js'
import { BLOG_POSTS } from '../../data/blogPosts.js'
import { readBundledPosts, migrateBundledPosts } from '../../src/cms/migration.js'

let mongo,
  server,
  base,
  db,
  cookie = '',
  post
const sample = {
  title: 'Nutrition publishing test',
  slug: 'nutrition-publishing-test',
  categorySlug: 'gut-health',
  tags: ['Fibre'],
  status: 'draft',
  contentHtml:
    '<h2>A useful guide</h2><p>This guide contains useful information about everyday food choices for readers and their families.</p>',
  coverImage: '',
  excerpt: 'Practical food choices.',
  revision: 0
}
async function request(
  resource,
  { method = 'GET', body, id, slug, admin = true, headers = {}, authenticated = true } = {}
) {
  const query = new URLSearchParams({ resource })
  if (admin) query.set('admin', '1')
  if (id) query.set('id', id)
  if (slug) query.set('slug', slug)
  const response = await fetch(`${base}/api/cms?${query}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-CMS-Request': '1',
      ...(authenticated && cookie ? { Cookie: cookie } : {}),
      ...headers
    },
    ...(body ? { body: JSON.stringify(body) } : {})
  })
  const data = response.headers.get('content-type')?.includes('application/json')
    ? await response.json()
    : Buffer.from(await response.arrayBuffer())
  return { response, data }
}
before(
  async () => {
    mongo = await MongoMemoryServer.create()
    process.env.MONGODB_URI = mongo.getUri()
    process.env.MONGODB_DB = 'cms_integration_test'
    db = await getDb()
    await db.collection('users').insertOne({
      name: 'Test Editor',
      email: 'editor@example.test',
      passwordHash: await hashPassword('a-strong-test-password')
    })
    server = createServer(app)
    await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
    base = `http://127.0.0.1:${server.address().port}`
  },
  { timeout: 180000 }
)
after(async () => {
  if (server) await new Promise((resolve) => server.close(resolve))
  await closeDb()
  await mongo?.stop()
})

test('missing configuration preserves bundled public articles and blocks admin', async () => {
  const uri = process.env.MONGODB_URI
  delete process.env.MONGODB_URI
  try {
    const publicList = await request('posts', { admin: false })
    assert.equal(publicList.response.status, 200)
    assert.deepEqual(publicList.data.managedSlugs, [])
    assert.equal(publicList.data.posts.length, BLOG_POSTS.length)
    const article = await request('posts', { admin: false, slug: BLOG_POSTS[0].slug })
    assert.equal(article.response.status, 200)
    assert.ok(article.data.post.contentHtml.length > 1000)
    const admin = await request('session')
    assert.equal(admin.response.status, 503)
    assert.equal(admin.data.code, 'CMS_NOT_CONFIGURED')
  } finally {
    process.env.MONGODB_URI = uri
  }
})
test('admin requires authentication and mutations require same-origin protection', async () => {
  assert.equal((await request('posts')).response.status, 401)
  assert.equal(
    (await request('login', { method: 'POST', body: {}, headers: { 'X-CMS-Request': '' } }))
      .response.status,
    403
  )
  assert.equal(
    (
      await request('login', {
        method: 'POST',
        body: {},
        headers: { Origin: 'https://untrusted.example' }
      })
    ).response.status,
    403
  )
  assert.equal(
    (
      await request('login', {
        method: 'POST',
        body: { email: 'editor@example.test', password: 'incorrect' }
      })
    ).response.status,
    401
  )
  const login = await request('login', {
    method: 'POST',
    body: { email: 'editor@example.test', password: 'a-strong-test-password' }
  })
  assert.equal(login.response.status, 200)
  assert.match(login.response.headers.get('set-cookie'), /HttpOnly; SameSite=Strict/)
  cookie = login.response.headers.get('set-cookie').split(';')[0]
  assert.equal((await request('session')).data.user.name, 'Test Editor')
})
test('drafts are stored but never returned publicly', async () => {
  const created = await request('posts', { method: 'POST', body: sample })
  assert.equal(created.response.status, 201)
  post = created.data.post
  assert.equal(post.revision, 1)
  const result = await request('posts', { admin: false, slug: post.slug })
  assert.equal(result.response.status, 404)
  assert.equal(result.data.managed, true)
  const list = await request('posts', { admin: false })
  assert.equal(list.data.posts.some(p => p.slug === post.slug), false)
  assert.equal(list.data.posts.length, BLOG_POSTS.length)
  assert.equal(list.data.managedSlugs.includes(post.slug), false)
})
test('publishing sanitizes content, exposes metadata and rejects stale edits', async () => {
  const result = await request('posts', {
    id: post.id,
    method: 'PUT',
    body: {
      ...post,
      status: 'published',
      seoTitle: 'Search title',
      contentHtml: sample.contentHtml + '<script>bad()</script>'
    }
  })
  assert.equal(result.response.status, 200)
  const stale = await request('posts', { id: post.id, method: 'PUT', body: post })
  assert.equal(stale.response.status, 409)
  post = result.data.post
  const publicResult = await request('posts', { admin: false, slug: post.slug })
  assert.equal(publicResult.response.status, 200)
  assert.equal(publicResult.data.post.seoTitle, 'Search title')
  assert.equal(publicResult.data.post.revisions, undefined)
  assert.equal(publicResult.data.post.updatedBy, undefined)
  assert.equal(publicResult.data.post.reservedSlugs, undefined)
  assert.doesNotMatch(publicResult.data.post.contentHtml, /<script>/)
  const revisions = await request('revisions', { id: post.id })
  assert.equal(revisions.data.revisions.length, 1)
})
test('retired scheduling is rejected and old timed articles remain editable private drafts', async () => {
  const rejected = await request('posts', {
    method: 'POST',
    body: {
      ...sample,
      slug: 'future-article',
      status: 'scheduled',
      publishedAt: new Date(Date.now() + 3600000).toISOString()
    }
  })
  assert.equal(rejected.response.status, 400)
  assert.equal(await db.collection('posts').countDocuments({ slug: 'future-article' }), 0)
  const { insertedId } = await db.collection('posts').insertOne({
    ...sample,
    slug: 'retired-timed-article',
    status: 'scheduled',
    publishedAt: new Date('2000-01-01T00:00:00Z'),
    revision: 1
  })
  const hidden = await request('posts', { admin: false, slug: 'retired-timed-article' })
  assert.equal(hidden.response.status, 404)
  assert.equal(hidden.data.managed, true)
  const publicList = await request('posts', { admin: false })
  assert.equal(
    publicList.data.posts.some((p) => p.slug === 'retired-timed-article'),
    false
  )
  const editable = await request('posts', { id: insertedId.toString() })
  assert.equal(editable.data.post.status, 'draft')
  const saved = await request('posts', {
    id: insertedId.toString(),
    method: 'PUT',
    body: editable.data.post
  })
  assert.equal(saved.response.status, 200)
  assert.equal(saved.data.post.status, 'draft')
})
test('slug changes retain working old URLs and prevent URL reuse', async () => {
  const result = await request('posts', {
    id: post.id,
    method: 'PUT',
    body: { ...post, slug: 'updated-nutrition-guide' }
  })
  assert.equal(result.response.status, 200)
  post = result.data.post
  const old = await request('posts', { admin: false, slug: sample.slug })
  assert.equal(old.data.post.slug, post.slug)
  assert.equal((await request('posts', { method: 'POST', body: sample })).response.status, 409)
})
test('legacy content can be edited and archived without reappearing through bundled fallback', async () => {
  const legacyId = `legacy:${BLOG_POSTS[0].slug}`
  const original = await request('posts', { id: legacyId })
  assert.equal(original.response.status, 200)
  assert.ok(original.data.post.contentHtml.length > 1000)
  const managed = await request('posts', {
    id: legacyId,
    method: 'PUT',
    body: { ...original.data.post, status: 'archived' }
  })
  assert.equal(managed.response.status, 201)
  const hidden = await request('posts', { admin: false, slug: BLOG_POSTS[0].slug })
  assert.equal(hidden.response.status, 404)
  assert.equal(hidden.data.managed, true)
  const list = await request('posts', { admin: false })
  assert.ok(list.data.managedSlugs.includes(BLOG_POSTS[0].slug))
  const adminList = await request('posts')
  assert.equal(adminList.data.posts.filter((p) => p.slug === BLOG_POSTS[0].slug).length, 1)
  const reopened = await request('posts', { id: legacyId })
  assert.equal(reopened.data.post.id, managed.data.post.id)
  assert.equal(reopened.data.post.status, 'archived')
  assert.equal((await request('posts', {
    id: legacyId, method: 'PUT', body: original.data.post
  })).response.status, 409)
  const updated = await request('posts', {
    id: legacyId, method: 'PUT', body: { ...reopened.data.post, title: 'Updated managed title' }
  })
  assert.equal(updated.response.status, 200)
  assert.equal(updated.data.post.id, managed.data.post.id)
})
test('complete migration preserves source content and never overwrites existing or renamed posts', async () => {
  const articles = await readBundledPosts()
  assert.equal(articles.length, BLOG_POSTS.length)
  const before = await db.collection('posts').countDocuments()
  const dryRun = await migrateBundledPosts(db, articles, { dryRun: true })
  assert.equal(dryRun.pending, articles.length - 1)
  assert.equal(await db.collection('posts').countDocuments(), before)
  const result = await migrateBundledPosts(db, articles)
  assert.equal(result.inserted, articles.length - 1)
  assert.equal(result.verified, articles.length)
  for (const source of articles.slice(1)) {
    const saved = await db.collection('posts').findOne({ slug: source.slug })
    for (const [key, value] of Object.entries(source)) {
      assert.deepEqual(key === 'publishedAt' ? saved[key].toISOString() : saved[key], value)
    }
    assert.equal(saved.status, 'published')
    const publicArticle = await request('posts', { admin: false, slug: source.slug })
    assert.equal(publicArticle.response.status, 200)
    assert.equal(publicArticle.data.post.contentHtml, source.contentHtml)
  }
  const retained = await db.collection('posts').findOne({ slug: articles[0].slug })
  assert.equal(retained.status, 'archived')
  assert.equal(retained.title, 'Updated managed title')
  const renamed = await request('posts', {
    id: `legacy:${articles[1].slug}`, method: 'PUT',
    body: { ...(await request('posts', { id: `legacy:${articles[1].slug}` })).data.post,
      slug: 'renamed-imported-article', status: 'draft' }
  })
  assert.equal(renamed.response.status, 200)
  const rerun = await migrateBundledPosts(db, articles)
  assert.equal(rerun.inserted, 0)
  assert.equal(await db.collection('posts').countDocuments(), before + articles.length - 1)
  const oldEditor = await request('posts', { id: `legacy:${articles[1].slug}` })
  assert.equal(oldEditor.data.post.slug, 'renamed-imported-article')
  assert.equal(oldEditor.data.post.status, 'draft')
  const list = await request('posts', { admin: false })
  assert.equal(new Set(list.data.managedSlugs).size, articles.length)
})
test('media optimizes uploads, stores WebP in GridFS and serves the saved image', async () => {
  assert.equal(
    (
      await request('media', {
        method: 'POST',
        body: { name: 'bad.svg', data: Buffer.from('<svg>bad</svg>').toString('base64') }
      })
    ).response.status,
    400
  )
  const bytes = await sharp({
    create: { width: 2000, height: 1200, channels: 3, background: '#296850' }
  })
    .png()
    .toBuffer()
  const uploaded = await request('media', {
    method: 'POST',
    body: { name: 'test.png', data: bytes.toString('base64'), alt: 'A test image' }
  })
  assert.equal(uploaded.response.status, 201)
  const image = await request('media', {
    id: uploaded.data.file.id,
    admin: false,
    authenticated: false
  })
  assert.equal(image.response.headers.get('content-type'), 'image/webp')
  assert.equal(uploaded.data.file.name, 'test.webp')
  assert.equal(uploaded.data.file.optimized, true)
  assert.equal(uploaded.data.file.originalSize, bytes.length)
  assert.equal(uploaded.data.file.size, image.data.length)
  assert.ok(image.data.length < bytes.length)
  const metadata = await sharp(image.data).metadata()
  assert.equal(metadata.format, 'webp')
  assert.equal(metadata.width, 1600)
  assert.equal(metadata.height, 960)
  const stored = await db.collection('media.files').findOne({ filename: 'test.webp' })
  assert.equal(stored.metadata.mimeType, 'image/webp')
  assert.equal(stored.length, image.data.length)
  const list = await request('media')
  assert.equal(list.data.files[0].alt, 'A test image')
  assert.equal(list.data.files[0].size, image.data.length)
  assert.equal(list.data.files[0].width, 1600)
})
test('signing out revokes the server session', async () => {
  assert.equal((await request('logout', { method: 'POST' })).response.status, 200)
  assert.equal((await request('session')).response.status, 401)
})
test('repeated sign-in attempts are rate limited in the database', async () => {
  let result
  for (let i = 0; i < 11; i++)
    result = await request('login', {
      method: 'POST',
      body: { email: 'missing@example.test', password: 'wrong' }
    })
  assert.equal(result.response.status, 429)
})
