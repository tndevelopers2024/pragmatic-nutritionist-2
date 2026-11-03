import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, BookOpen, Calendar, Clock, List, Tag, UserCheck, Layers } from 'lucide-react'
import PageHero from '../components/PageHero'
import BlogCover from '../components/BlogCover'
import Section from '../components/Section'
import CtaBand from '../components/CtaBand'
import { useSeo } from '../components/Seo'
import NotFound from '../components/NotFound'
import { LEGACY_BLOG_SLUG_REDIRECTS } from '@pragmatic/shared/blog'
import { fetchArticle, useBlogPosts } from '../hooks/useBlogPosts'
import BlogSeo from '../components/BlogSeo'
import { useBook } from '../context/bookContext'
import meenuAvatar from '../assets/Faithfully Enhanced Portrait.png'
import './blog.css'


export default function BlogPostPage() {
  const { posts: BLOG_POSTS } = useBlogPosts()
  const { slug } = useParams()
  const navigate = useNavigate()
  const openBook = useBook()

  const decodedSlug = useMemo(() => {
    let raw
    try {
      raw = decodeURIComponent(slug || '')
    } catch {
      raw = slug || ''
    }
    return LEGACY_BLOG_SLUG_REDIRECTS[raw] || raw
  }, [slug])

  const postMeta = useMemo(
    () => BLOG_POSTS.find((p) => p.slug === decodedSlug) || null,
    [decodedSlug, BLOG_POSTS]
  )

  const [state, setState] = useState({
    loadedSlug: null,
    article: null,
    failed: false
  })

  useEffect(() => {
    if (!decodedSlug) return
    const controller = new AbortController()
    fetchArticle(decodedSlug, controller.signal).then(article => {
      setState({ loadedSlug: decodedSlug, article, failed: false, error: '' })
      if (article.slug !== decodedSlug) navigate(`/blog/${article.slug}`, { replace: true })
    }).catch(error => {
      if (error.name !== 'AbortError') setState({ loadedSlug: decodedSlug, article: null, failed: true, error: error.status === 404 ? '' : error.message })
    })
    return () => controller.abort()
  }, [decodedSlug, navigate])

  const article = state.loadedSlug === decodedSlug ? state.article : null
  const loading = state.loadedSlug !== decodedSlug

  const title = article?.title || postMeta?.title || ''
  const category = article?.category || postMeta?.category || 'Clinical Nutrition'
  const categorySlug = article?.categorySlug || postMeta?.categorySlug || 'gut-health'
  const excerpt = article?.excerpt || postMeta?.excerpt || ''
  const readTime = article?.readTime || postMeta?.readTime || '6 min read'
  const postDate = article?.postDate || postMeta?.postDate || 'Clinical Guide'
  const coverImage = article ? article.coverImage || '' : postMeta?.coverImage || ''
  const tags = article?.tags || postMeta?.tags || []
  const headings = article?.headings || []

  useSeo(article?.seoTitle || (title ? `${title} | Pragmatic Nutrition` : 'Article not found'), article?.seoDescription || excerpt)

  const relatedPosts = useMemo(() => {
    if (!postMeta) return []
    const sameCat = BLOG_POSTS.filter(
      (p) => p.slug !== postMeta.slug && p.categorySlug === postMeta.categorySlug
    )
    if (sameCat.length >= 3) return sameCat.slice(0, 3)
    const others = BLOG_POSTS.filter(
      (p) => p.slug !== postMeta.slug && p.categorySlug !== postMeta.categorySlug
    )
    return [...sameCat, ...others].slice(0, 3)
  }, [postMeta, BLOG_POSTS])

  const latestPosts = useMemo(
    () => BLOG_POSTS.filter((p) => p.slug !== decodedSlug).slice(0, 4),
    [decodedSlug, BLOG_POSTS]
  )

  if (state.loadedSlug === decodedSlug && state.error) return <Section><p role="alert">{state.error}</p><button type="button" onClick={() => window.location.reload()}>Try again</button></Section>
  if (state.loadedSlug === decodedSlug && state.failed) {
    return <NotFound />
  }

  if (!postMeta && !loading && !article) {
    return <NotFound />
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

  function handleArticleBodyClick(e) {
    const anchor = e.target.closest('a[href]')
    if (!anchor) return
    const href = anchor.getAttribute('href') || ''
    if (href.startsWith('/') && !href.startsWith('//')) {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
      e.preventDefault()
      navigate(href)
    }
  }

  return (
    <>
      <BlogSeo article={article} />
      <PageHero
        dynamic
        breadcrumb={category.toUpperCase()}
        badge={`${category.toUpperCase()} • EVIDENCE-BASED CLINICAL GUIDE`}
        title={title}
        blurb={excerpt}
        parent={{ label: 'Blog', to: '/blog' }}
        secondaryCta={{
          label: `More in ${category}`,
          to: `/blog/categories/${categorySlug}`,
          icon: 'BookOpen'
        }}
        waMessage={`Hi Meenu, I read your article "${title}" and would like to book a consultation.`}
        trustItems={[
          `By ${article?.author || 'Meenu Balaji, M.H.Sc'}`,
          readTime,
          `Published ${postDate}`
        ]}
        media={<BlogCover src={coverImage} alt={title} category={category} className="condition-hero-img" loading="eager" />}
        imageAlt={title}
        imageCaption={`${category} • Evidence-Based Guide`}
      />

      <Section width="wide" bg="base">
        <div className="blog-layout">
        <article className="blog-post">
          {/* Featured Cover Image */}
          <figure className="blog-cover-figure">
            <BlogCover src={coverImage} alt={article?.coverAlt || title} category={category} className="blog-post-image" />
          </figure>

          <div className="blog-post-content">
          {/* Top Navigation & Article Metadata */}
          <header className="blog-post-header">
            <div className="blog-post-back-row">
              <Link className="blog-back-pill" to="/blog">
                <ArrowLeft size={15} aria-hidden="true" />
                <span>All Articles</span>
              </Link>
              <Link className="blog-post-category" to={`/blog/categories/${categorySlug}`}>
                {category}
              </Link>
            </div>

            <div className="blog-post-meta">
              <span className="blog-post-meta-item">
                <UserCheck size={15} aria-hidden="true" />
                <span>{article?.author || 'Meenu Balaji, M.H.Sc (Food Sc & Nutrition)'}</span>
              </span>
              {readTime && (
                <span className="blog-post-meta-item">
                  <Clock size={14} aria-hidden="true" />
                  <span>{readTime}</span>
                </span>
              )}
              {postDate && (
                <span className="blog-post-meta-item">
                  <Calendar size={14} aria-hidden="true" />
                  <span>{postDate}</span>
                </span>
              )}
            </div>
          </header>

          {/* Table of Contents (shown when article has 3+ structured headings) */}
          {headings.length >= 3 && (
            <details className="blog-toc-card" open>
              <summary className="blog-toc-summary">
                <span className="blog-toc-title">
                  <List size={17} aria-hidden="true" />
                  <span>In This Clinical Guide ({headings.length} Sections)</span>
                </span>
              </summary>
              <ol className="blog-toc-list">
                {headings.map((h) => (
                  <li
                    key={h.id}
                    className={h.level === 'h3' ? 'blog-toc-item blog-toc-sub' : 'blog-toc-item'}
                  >
                    <a href={`#${h.id}`}>{h.text}</a>
                  </li>
                ))}
              </ol>
            </details>
          )}

          {/* Complete Line-by-Line Article Body */}
          {loading && !article ? (
            <div className="blog-loading-skeleton" aria-live="polite">
              <p>Loading full clinical article&hellip;</p>
            </div>
          ) : article?.contentHtml ? (
            <div
              className="blog-article-body"
              onClick={handleArticleBodyClick}
              dangerouslySetInnerHTML={{ __html: article.contentHtml }}
            />
          ) : (
            <p className="blog-post-excerpt">{excerpt}</p>
          )}

          {article?.reviewer && <p className="blog-post-meta">Reviewed by {article.reviewer}{article.reviewedAt ? ` · ${article.reviewedAt}` : ''}</p>}
          {/* Topic Tags */}
          {tags.length > 0 && (
            <div className="blog-tags-row" aria-label="Article tags">
              <span className="blog-tags-label">
                <Tag size={14} aria-hidden="true" />
                <span>Topics:</span>
              </span>
              {tags.map((t) => (
                <Link
                  key={t}
                  to={`/blog?q=${encodeURIComponent(t)}`}
                  className="blog-tag-chip"
                >
                  {t}
                </Link>
              ))}
            </div>
          )}

          {/* Clinical Author Bio */}
          <div className="blog-author-card">
            <img
              src={meenuAvatar}
              alt="Meenu Balaji, M.H.Sc."
              className="blog-author-avatar"
            />
            <div className="blog-author-details">
              <span className="blog-author-eyebrow">ABOUT THE PRACTITIONER</span>
              <h4>Meenu Balaji, M.H.Sc.</h4>
              <p>
                Award-winning Clinical Gut Health &amp; Sports Nutritionist with 14+ years of clinical experience across India, the UK, and New Zealand. Certified Peer Reviewer for the <em>European Journal of Nutrition</em>, ICAR JRF &amp; UGC NET JRF qualified.
              </p>
            </div>
          </div>

          <div className="blog-bottom-nav">
            <Link className="blog-card-link" to="/blog">
              <ArrowLeft size={16} aria-hidden="true" />
              <span>Back to all articles</span>
            </Link>
            <Link className="blog-card-link" to={`/blog/categories/${categorySlug}`}>
              <BookOpen size={16} aria-hidden="true" />
              <span>More {category} guides</span>
            </Link>
          </div>
          </div>
        </article>

        <aside className="blog-sidebar">
          <div className="blog-side-card blog-side-facts">
            <p className="blog-side-eyebrow">Quick facts</p>
            <div className="blog-side-fact-list">
              <div className="blog-side-fact">
                <Calendar size={18} aria-hidden="true" />
                <div>
                  <span>Published</span>
                  <strong>{postDate}</strong>
                </div>
              </div>
              <div className="blog-side-fact">
                <Clock size={18} aria-hidden="true" />
                <div>
                  <span>Reading time</span>
                  <strong>{readTime}</strong>
                </div>
              </div>
              <div className="blog-side-fact">
                <Layers size={18} aria-hidden="true" />
                <div>
                  <span>Focus</span>
                  <strong>{category}</strong>
                </div>
              </div>
            </div>

            <p className="blog-side-eyebrow blog-side-share-label">Share</p>
            <div className="blog-share-list">
              {[
                ['LinkedIn', `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`],
                ['X', `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`],
                ['Facebook', `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`]
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="blog-share-link"
                  aria-label={`Share on ${label}`}
                >
                  <span>{label}</span>
                  <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </div>

          <div className="blog-side-card blog-side-latest">
            <div className="blog-side-latest-head">
              <h3>Latest Posts</h3>
              <button type="button" className="blog-side-contact" onClick={openBook}>
                Contact
              </button>
            </div>
            <div className="blog-side-latest-list">
              {latestPosts.map((lp) => {
                return (
                  <Link key={lp.slug} to={`/blog/${lp.slug}`} className="blog-side-latest-item">
                    <span className="blog-side-latest-thumb">
                      <BlogCover src={lp.coverImage} alt={lp.title} category={lp.category} />
                    </span>
                    <span className="blog-side-latest-text">
                      <small>{lp.postDate}</small>
                      <strong>{lp.title}</strong>
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>
        </aside>
        </div>
      </Section>

      {/* Related Clinical Guides */}
      {relatedPosts.length > 0 && (
        <Section
          width="wide"
          bg="white"
          title={`Related ${category} Guides`}
          lead="Continue reading evidence-based clinical insights from Pragmatic Nutrition."
        >
          <div className="blog-grid">
            {relatedPosts.map((rp) => {
              return (
                <article className="blog-card" key={rp.slug}>
                  <Link
                    className="blog-card-image"
                    to={`/blog/${rp.slug}`}
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    <BlogCover src={rp.coverImage} alt={rp.title} category={rp.category} />
                  </Link>
                  <div className="blog-card-body">
                    <div className="blog-card-top-row">
                      <span className="blog-card-category">{rp.category}</span>
                      <span className="blog-card-read">
                        <Clock size={12} aria-hidden="true" />
                        <span>{rp.readTime}</span>
                      </span>
                    </div>
                    <h3 className="blog-card-title">
                      <Link to={`/blog/${rp.slug}`}>{rp.title}</Link>
                    </h3>
                    <p className="blog-card-desc">{rp.excerpt}</p>
                    <div className="blog-card-footer">
                      <div className="blog-card-meta">
                        <span className="blog-card-author-name">Meenu Balaji, M.H.Sc</span>
                        <span className="blog-card-date">{rp.postDate}</span>
                      </div>
                      <Link to={`/blog/${rp.slug}`} className="blog-card-cta">
                        <span>Read</span>
                        <ArrowRight size={14} strokeWidth={2.3} aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </Section>
      )}

      <CtaBand />
    </>
  )
}
