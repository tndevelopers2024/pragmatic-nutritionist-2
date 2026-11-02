import { readFile } from 'node:fs/promises'
import { isDeepStrictEqual } from 'node:util'
import { BLOG_POSTS } from '../../data/blogPosts.js'

// Read and validate the entire source before making any database changes.
export async function readBundledPosts() {
  const seen = new Set()
  return Promise.all(BLOG_POSTS.map(async (metadata) => {
    const { slug } = metadata
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || seen.has(slug))
      throw new Error(`Invalid or duplicate source slug: ${slug}`)
    seen.add(slug)
    const article = JSON.parse(await readFile(
      new URL(`../../data/blog/${slug}.json`, import.meta.url), 'utf8'
    ))
    if (
      article.slug !== slug || !article.title?.trim() || !article.contentHtml?.trim() ||
      !Array.isArray(article.headings) || !Array.isArray(article.categorySlugs) ||
      !Number.isFinite(Date.parse(article.publishedAt)) ||
      !Number.isFinite(Date.parse(article.modifiedAt))
    ) throw new Error(`Incomplete source article: ${slug}`)
    return { ...metadata, ...article }
  }))
}

export async function migrateBundledPosts(db, articles, { dryRun = false } = {}) {
  const posts = db.collection('posts')
  const managed = await posts.find({}, {
    projection: { slug: 1, aliases: 1, reservedSlugs: 1 }
  }).toArray()
  const reserved = new Set(managed.flatMap(p => [
    p.slug, ...(p.aliases || []), ...(p.reservedSlugs || [])
  ]))
  const pending = articles.filter(article => !reserved.has(article.slug))
  if (dryRun) return { total: articles.length, pending: pending.length, skipped: articles.length - pending.length }

  let inserted = 0
  for (const article of pending) {
    const document = {
      ...article,
      publishedAt: new Date(article.publishedAt),
      author: 'Meenu Balaji, M.H.Sc',
      status: 'published',
      revision: 1,
      aliases: [],
      reservedSlugs: [article.slug],
      createdAt: new Date(article.publishedAt),
      updatedAt: new Date(article.modifiedAt),
      createdBy: 'legacy-migration',
      updatedBy: 'legacy-migration',
      revisions: []
    }
    // Atomic insert-only operation: reruns never overwrite a client's edits.
    const result = await posts.updateOne(
      { $or: [{ slug: article.slug }, { aliases: article.slug }, { reservedSlugs: article.slug }] },
      { $setOnInsert: document },
      { upsert: true }
    )
    if (!result.upsertedCount) continue
    const saved = await posts.findOne({ _id: result.upsertedId })
    const preserved = Object.fromEntries(Object.keys(article).map(key => [
      key, key === 'publishedAt' ? saved[key]?.toISOString() : saved[key]
    ]))
    if (!isDeepStrictEqual(preserved, article) || saved.status !== 'published')
      throw new Error(`Database verification failed for ${article.slug}`)
    inserted++
  }
  const missing = []
  for (const { slug } of articles) {
    if (!await posts.findOne({ $or: [{ slug }, { aliases: slug }] }, { projection: { _id: 1 } }))
      missing.push(slug)
  }
  if (missing.length) throw new Error(`Migration incomplete: ${missing.join(', ')}`)
  return { total: articles.length, inserted, skipped: articles.length - inserted, verified: articles.length }
}
