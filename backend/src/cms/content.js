import sanitizeHtml from 'sanitize-html'
import { load } from 'cheerio'
import { BLOG_CATEGORIES } from '@pragmatic/shared/blog'

export const slugify = (value) =>
  String(value || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 140)
    .replace(/-$/, '')
const text = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '')
function fail(message) {
  throw Object.assign(new Error(message), { status: 400 })
}
export function safeImageUrl(value) {
  const url = text(value, 2000)
  return /^https:\/\/[^\s]+$/i.test(url) ||
    /^\/api\/cms\?resource=media&id=[a-f0-9]{24}$/.test(url) ||
    /^\/images\/[\w./%-]+$/.test(url)
    ? url
    : ''
}
export function cleanContent(html) {
  const sanitized = sanitizeHtml(String(html || '').slice(0, 500_000), {
    allowedTags: [
      'p',
      'br',
      'h2',
      'h3',
      'h4',
      'strong',
      'em',
      'u',
      's',
      'ul',
      'ol',
      'li',
      'blockquote',
      'a',
      'img',
      'figure',
      'figcaption',
      'table',
      'thead',
      'tbody',
      'tr',
      'th',
      'td',
      'hr',
      'sup',
      'sub',
      'div',
      'span'
    ],
    allowedAttributes: {
      a: ['href', 'title'],
      img: ['src', 'alt', 'title', 'width', 'height'],
      th: ['colspan', 'rowspan'],
      td: ['colspan', 'rowspan'],
      ol: ['start']
    },
    allowedSchemes: ['https', 'http', 'mailto', 'tel'],
    allowProtocolRelative: false,
    transformTags: { a: sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer' }) }
  })
  const $ = load(sanitized, null, false)
  $('img').each((_, image) => {
    const src = safeImageUrl($(image).attr('src'))
    if (!src) $(image).remove()
    else $(image).attr('loading', 'lazy')
  })
  const headings = []
  const used = new Set()
  $('h2,h3,h4').each((_, el) => {
    const label = $(el).text().trim()
    const base = slugify(label) || 'section'
    let id = base
    let n = 2
    while (used.has(id)) id = `${base}-${n++}`
    used.add(id)
    $(el).attr('id', id)
    headings.push({ id, text: label, level: el.tagName })
  })
  const plain = $.root().text().replace(/\s+/g, ' ').trim()
  return {
    contentHtml: $.html(),
    headings,
    wordCount: plain ? plain.split(/\s+/).length : 0,
    plain
  }
}
export function normalizePost(body, previous = null, now = new Date()) {
  const title = text(body.title, 220)
  const slug = slugify(body.slug || title)
  if (!title || !slug) fail('Add an article title and a valid URL slug.')
  if (!['draft', 'published', 'archived'].includes(body.status))
    fail('Choose a valid publishing status.')
  const category = BLOG_CATEGORIES.find((c) => c.slug === body.categorySlug)
  if (!category) fail('Choose an article category.')
  const content = cleanContent(body.contentHtml)
  if (body.coverImage && !safeImageUrl(body.coverImage))
    fail('Use an HTTPS image URL or a link from the media library.')
  if (body.status === 'published' && content.wordCount < 10)
    fail('Add article content before publishing (at least 10 words).')
  const publishedAt = new Date(previous?.publishedAt || now)
  if (body.status === 'published' && publishedAt > now) publishedAt.setTime(now.getTime())
  const tags = [
    ...new Set(
      (Array.isArray(body.tags) ? body.tags : [])
        .filter((t) => typeof t === 'string')
        .map((t) => text(t, 60))
        .filter(Boolean)
    )
  ].slice(0, 15)
  return {
    title,
    slug,
    status: body.status,
    category: category.label,
    categorySlug: category.slug,
    categories: [category.label],
    categorySlugs: [category.slug],
    tags,
    excerpt: text(body.excerpt, 700) || content.plain.slice(0, 250),
    contentHtml: content.contentHtml,
    headings: content.headings,
    wordCount: content.wordCount,
    readTime: `${Math.max(1, Math.ceil(content.wordCount / 220))} min read`,
    coverImage: safeImageUrl(body.coverImage),
    coverAlt: text(body.coverAlt, 250),
    author: text(body.author, 150) || 'Meenu Balaji, M.H.Sc',
    reviewer: text(body.reviewer, 150),
    reviewedAt: /^\d{4}-\d{2}-\d{2}$/.test(body.reviewedAt || '') ? body.reviewedAt : '',
    seoTitle: text(body.seoTitle, 120),
    seoDescription: text(body.seoDescription, 320),
    publishedAt: body.status === 'draft' && !previous?.publishedAt ? null : publishedAt,
    postDate: publishedAt.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'Asia/Kolkata'
    }),
    updatedAt: now
  }
}
export function isPublished(post) {
  return post.status === 'published'
}
export function publicPost(post, full = false) {
  const {
    _id,
    revisions,
    revision,
    createdBy,
    updatedBy,
    aliases,
    createdAt,
    status,
    reservedSlugs,
    ...safe
  } = post
  void revisions
  void revision
  void createdBy
  void updatedBy
  void aliases
  void createdAt
  void status
  void reservedSlugs
  if (!full) {
    delete safe.contentHtml
    delete safe.headings
  }
  return { ...safe, id: _id?.toString() }
}
