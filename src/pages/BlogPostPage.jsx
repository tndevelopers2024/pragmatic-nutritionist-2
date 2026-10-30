import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, BookOpen, Calendar, Clock, List, Tag, UserCheck } from 'lucide-react'
import PageHero from '../components/PageHero'
import Section from '../components/Section'
import CtaBand from '../components/CtaBand'
import { useSeo } from '../components/Seo'
import NotFound from '../components/NotFound'
import { BLOG_POSTS, LEGACY_BLOG_SLUG_REDIRECTS } from '../data/blogPosts'
import meenuAvatar from '../assets/Faithfully Enhanced Portrait.png'
import './blog.css'

const articleCache = new Map()

const HERO_STOCK_BY_CATEGORY = {
  'gut-health': '/images/heroes/stock/gut-health-hub.jpg',
  'sports-nutrition': '/images/heroes/stock/sports-hub.jpg',
  'child-nutrition': '/images/heroes/stock/child-teen.jpg',
  'diabetes-management': '/images/heroes/stock/diabetes-care.jpg',
  'women-health-wellness': '/images/heroes/stock/pcos-hormonal.jpg',
  'healthy-recipe': '/images/heroes/stock/gut-recipes-hub.jpg',
  'nutrition-supplements': '/images/heroes/stock/adhd-nutrition.jpg',
  'nutrition-facts': '/images/heroes/stock/more-care-hub.jpg',
  'food-product-review': '/images/heroes/stock/pricing-catalogue.jpg',
  'nutritionists-learning-hub': '/images/heroes/stock/academy-practitioner.jpg'
}

function resolveBlogHeroStock(slug, categorySlug) {
  const s = (slug || '').toLowerCase()
  if (/constipat|piles|fibre|fiber|psyllium|isabgol|chia|flax/.test(s)) {
    return '/images/heroes/stock/constipation-digestion.jpg'
  }
  if (/acidity|gerd|reflux|stomach-acid|heartburn|vinegar/.test(s)) {
    return '/images/heroes/stock/acidity-gerd.jpg'
  }
  if (/sibo|gluten|celiac|ibd|mcas|histamine|leaky-gut/.test(s)) {
    return '/images/heroes/stock/sibo-gluten.jpg'
  }
  if (/ibs|bloat|vagus|fodmap|gut-brain|probiotic|prebiotic|ferment|kanji|kefir|curd/.test(s)) {
    return '/images/heroes/stock/ibs-bloating.jpg'
  }
  if (/adhd|methylation|theanine|saffron|serotonin|hyperactive/.test(s)) {
    return '/images/heroes/stock/adhd-nutrition.jpg'
  }
  if (/runner|marathon|endurance|creatine|pre-workout|electrolyte/.test(s)) {
    return '/images/heroes/stock/competitive-athletes.jpg'
  }
  if (/teen-athlete|teenage-swimmer|teenage-squash|teenage-athlete|young-athlete|cricket|sports-nutritionist/.test(s)) {
    return '/images/heroes/stock/youth-athletes.jpg'
  }
  if (/diabetes|blood-sugar|glycemic|insulin|cholesterol/.test(s)) {
    return '/images/heroes/stock/diabetes-care.jpg'
  }
  if (/pcos|hormon|menopause|endometriosis|period|seed-cycling|inositol|estrogen/.test(s)) {
    return '/images/heroes/stock/pcos-hormonal.jpg'
  }
  if (/weight-loss|glp-1|fat-loss|keto|calorie/.test(s)) {
    return '/images/heroes/stock/weight-loss.jpg'
  }
  if (/private-practice|nutritionist-private/.test(s)) {
    return '/images/heroes/stock/academy-practice.jpg'
  }
  return HERO_STOCK_BY_CATEGORY[categorySlug] || '/images/heroes/stock/clinical-blog.jpg'
}

export default function BlogPostPage() {
  const { slug } = useParams()
  const navigate = useNavigate()

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
    [decodedSlug]
  )

  const [state, setState] = useState({
    loadedSlug: null,
    article: null,
    failed: false
  })

  useEffect(() => {
    if (!decodedSlug || articleCache.has(decodedSlug)) return
    let cancelled = false
    fetch(`/data/blog/${encodeURIComponent(decodedSlug)}.json`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found')
        return res.json()
      })
      .then((data) => {
        articleCache.set(decodedSlug, data)
        if (!cancelled) {
          setState({ loadedSlug: decodedSlug, article: data, failed: false })
        }
      })
      .catch(() => {
        if (!cancelled) {
          setState({ loadedSlug: decodedSlug, article: null, failed: true })
        }
      })
    return () => {
      cancelled = true
    }
  }, [decodedSlug])

  const cachedArticle = articleCache.get(decodedSlug) || null
  const article = cachedArticle || (state.loadedSlug === decodedSlug ? state.article : null)
  const loading = !article && state.loadedSlug !== decodedSlug

  const title = article?.title || postMeta?.title || ''
  const category = article?.category || postMeta?.category || 'Clinical Nutrition'
  const categorySlug = article?.categorySlug || postMeta?.categorySlug || 'gut-health'
  const excerpt = article?.excerpt || postMeta?.excerpt || ''
  const readTime = article?.readTime || postMeta?.readTime || '6 min read'
  const postDate = article?.postDate || postMeta?.postDate || 'Clinical Guide'
  const coverImage = article?.coverImage || postMeta?.coverImage || ''
  const tags = article?.tags || postMeta?.tags || []
  const headings = article?.headings || []

  useSeo(title ? `${title} | Pragmatic Nutrition` : 'Article not found', excerpt)

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
  }, [postMeta])

  if (!postMeta && state.failed) {
    return <NotFound />
  }

  if (!postMeta && !loading && !article) {
    return <NotFound />
  }

  const heroStockImage = resolveBlogHeroStock(decodedSlug, categorySlug)

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
          'By Meenu Balaji, M.H.Sc',
          readTime,
          `Published ${postDate}`
        ]}
        image={heroStockImage}
        imageAlt={title}
        imageCaption={`${category} • Evidence-Based Guide`}
      />

      <Section width="medium" bg="base">
        <article className="blog-post">
          {/* Top Navigation & Article Metadata */}
          <header className="blog-post-header">
            <div className="blog-post-back-row">
              <Link className="blog-back-pill" to="/blog">
                <ArrowLeft size={15} aria-hidden="true" />
                <span>All 151 Articles</span>
              </Link>
              <Link className="blog-post-category" to={`/blog/categories/${categorySlug}`}>
                {category}
              </Link>
            </div>

            <div className="blog-post-meta">
              <span className="blog-post-meta-item">
                <UserCheck size={15} aria-hidden="true" />
                <span>Meenu Balaji, M.H.Sc (Food Sc &amp; Nutrition)</span>
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

          {/* Original Wix Featured Media */}
          {coverImage && (
            <figure className="blog-cover-figure">
              <img
                className="blog-post-image"
                src={coverImage}
                alt={title}
                onError={(e) => {
                  e.currentTarget.closest('figure').style.display = 'none'
                }}
              />
            </figure>
          )}

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
              <span className="blog-author-eyebrow">WRITTEN &amp; CLINICALLY REVIEWED BY</span>
              <h4>Meenu Balaji, M.H.Sc.</h4>
              <p>
                Award-winning Clinical Gut Health &amp; Sports Nutritionist with 14+ years of clinical experience across India, the UK, and New Zealand. Certified Peer Reviewer for the <em>European Journal of Nutrition</em>, ICAR JRF &amp; UGC NET JRF qualified.
              </p>
            </div>
          </div>

          <div className="blog-bottom-nav">
            <Link className="blog-card-link" to="/blog">
              <ArrowLeft size={16} aria-hidden="true" />
              <span>Back to all 151 articles</span>
            </Link>
            <Link className="blog-card-link" to={`/blog/categories/${categorySlug}`}>
              <BookOpen size={16} aria-hidden="true" />
              <span>More {category} guides</span>
            </Link>
          </div>
        </article>
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
              const fallbackImg =
                HERO_STOCK_BY_CATEGORY[rp.categorySlug] ||
                '/images/heroes/stock/clinical-blog.jpg'
              return (
                <article className="blog-card" key={rp.slug}>
                  <Link
                    className="blog-card-image"
                    to={`/blog/${rp.slug}`}
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    <img
                      src={rp.coverImage || fallbackImg}
                      alt={rp.title}
                      loading="lazy"
                      onError={(e) => {
                        if (e.currentTarget.src !== window.location.origin + fallbackImg) {
                          e.currentTarget.src = fallbackImg
                        }
                      }}
                    />
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
