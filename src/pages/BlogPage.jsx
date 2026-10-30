import { useRef } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { ArrowRight, ChevronLeft, ChevronRight, Clock, Search, X } from 'lucide-react'
import PageHero from '../components/PageHero'
import Section from '../components/Section'
import CtaBand from '../components/CtaBand'
import { useSeo } from '../components/Seo'
import { BLOG_CATEGORIES, BLOG_POSTS } from '../data/blogPosts'
import './blog.css'
import './blog-topics.css'

const PAGE_SIZE = 12

const FALLBACK_CARD_IMAGE_BY_CATEGORY = {
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

function buildPageNumbers(current, total) {
  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }
  const pages = new Set([1, total, current, current - 1, current + 1])
  const valid = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b)
  const out = []
  for (let i = 0; i < valid.length; i++) {
    if (i > 0 && valid[i] - valid[i - 1] > 1) {
      out.push('ellipsis-' + valid[i])
    }
    out.push(valid[i])
  }
  return out
}

export default function BlogPage() {
  const { categorySlug, pageNum } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const sectionTopRef = useRef(null)

  const query = searchParams.get('q') || ''
  const activeCategoryObj = categorySlug
    ? BLOG_CATEGORIES.find((c) => c.slug === categorySlug) || null
    : null

  const activeCategorySlug = activeCategoryObj ? activeCategoryObj.slug : 'all'

  const qLower = query.trim().toLowerCase()
  const filteredPosts = BLOG_POSTS.filter((post) => {
    if (activeCategorySlug !== 'all' && !post.categorySlugs?.includes(activeCategorySlug)) {
      return false
    }
    if (!qLower) return true
    const haystack = `${post.title} ${post.excerpt} ${post.category} ${(post.tags || []).join(' ')}`.toLowerCase()
    return haystack.includes(qLower)
  })

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / PAGE_SIZE))
  const parsedPage = Number.parseInt(pageNum || searchParams.get('page') || '1', 10)
  const currentPage = Number.isFinite(parsedPage)
    ? Math.min(Math.max(1, parsedPage), totalPages)
    : 1

  const startIdx = (currentPage - 1) * PAGE_SIZE
  const visiblePosts = filteredPosts.slice(startIdx, startIdx + PAGE_SIZE)

  useSeo(
    activeCategoryObj
      ? `${activeCategoryObj.label} Articles | Pragmatic Nutrition Blog`
      : 'Clinical Nutrition Blog | Meenu Balaji, M.H.Sc',
    activeCategoryObj
      ? `Read ${activeCategoryObj.count} evidence-based clinical guides on ${activeCategoryObj.label.toLowerCase()} by Meenu Balaji, M.H.Sc.`
      : 'Explore all 151 evidence-based clinical nutrition articles on gut health, sports nutrition, child nutrition, PCOS, diabetes, and Indian whole-food protocols by Meenu Balaji, M.H.Sc.'
  )

  function handleCategorySelect(slug) {
    const nextSearch = query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ''
    if (slug === 'all') {
      navigate(`/blog${nextSearch}`)
    } else {
      navigate(`/blog/categories/${slug}${nextSearch}`)
    }
  }

  function handleSearchChange(val) {
    const next = new URLSearchParams(searchParams)
    if (val) next.set('q', val)
    else next.delete('q')
    next.delete('page')
    setSearchParams(next, { replace: true })
  }

  function goToPage(targetPage) {
    const clamped = Math.min(Math.max(1, targetPage), totalPages)
    const qStr = query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ''
    if (activeCategorySlug === 'all') {
      navigate(clamped === 1 ? `/blog${qStr}` : `/blog/page/${clamped}${qStr}`)
    } else {
      navigate(
        clamped === 1
          ? `/blog/categories/${activeCategorySlug}${qStr}`
          : `/blog/categories/${activeCategorySlug}/page/${clamped}${qStr}`
      )
    }
    if (sectionTopRef.current) {
      sectionTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const pageTokens = buildPageNumbers(currentPage, totalPages)

  return (
    <>
      {activeCategoryObj ? (
        <PageHero
          dynamic
          breadcrumb={activeCategoryObj.label.toUpperCase()}
          badge={`${activeCategoryObj.label.toUpperCase()} • ${activeCategoryObj.count} CLINICAL GUIDES`}
          title={`${activeCategoryObj.label}: Evidence-Based Clinical Guides`}
          blurb={`Explore ${activeCategoryObj.count} in-depth clinical articles on ${activeCategoryObj.label.toLowerCase()} written by Meenu Balaji, M.H.Sc.`}
          parent={{ label: 'Blog', to: '/blog' }}
          trustItems={[
            `${activeCategoryObj.count} ${activeCategoryObj.label} Guides`,
            'By Meenu Balaji, M.H.Sc',
            'Practical Indian Food Context'
          ]}
          image={
            FALLBACK_CARD_IMAGE_BY_CATEGORY[activeCategoryObj.slug] ||
            '/images/heroes/stock/clinical-blog.jpg'
          }
          imageAlt={`${activeCategoryObj.label} clinical articles`}
          imageCaption={`${activeCategoryObj.label} • Clinical Guides`}
        />
      ) : (
        <PageHero heroKey="/blog" />
      )}

      <div ref={sectionTopRef}>
        <Section
          width="wide"
          bg="base"
          title={activeCategoryObj ? `${activeCategoryObj.label} Articles` : 'Explore All Clinical Articles'}
          lead="Peer-reviewed nutrition science translated into practical Indian meal strategies by Meenu Balaji, M.H.Sc."
        >
          {/* Search & Count Toolbar */}
          <div className="blog-hub-toolbar">
            <div className="blog-search-box">
              <Search size={18} className="blog-search-icon" aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search 151 articles by symptom, food, lab test, or topic..."
                aria-label="Search blog articles"
                className="blog-search-input"
              />
              {query && (
                <button
                  type="button"
                  className="blog-search-clear"
                  onClick={() => handleSearchChange('')}
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <p className="blog-results-summary" aria-live="polite">
              {filteredPosts.length === 0
                ? 'No matching articles found'
                : `Showing ${startIdx + 1}–${Math.min(startIdx + PAGE_SIZE, filteredPosts.length)} of ${filteredPosts.length} articles`}
            </p>
          </div>

          {/* 10 Canonical Category Filter Pills */}
          <nav className="blog-topics" aria-label="Filter articles by topic">
            <button
              type="button"
              aria-pressed={activeCategorySlug === 'all'}
              onClick={() => handleCategorySelect('all')}
            >
              <span>All Articles</span>
              <span className="blog-topic-count">{BLOG_POSTS.length}</span>
            </button>
            {BLOG_CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                type="button"
                aria-pressed={activeCategorySlug === cat.slug}
                onClick={() => handleCategorySelect(cat.slug)}
              >
                <span>{cat.label}</span>
                <span className="blog-topic-count">{cat.count}</span>
              </button>
            ))}
          </nav>

          {/* Article Cards Grid */}
          {visiblePosts.length === 0 ? (
            <div className="blog-empty-state">
              <h3>No articles matched &ldquo;{query}&rdquo;</h3>
              <p>Try searching for another symptom, nutrient, or condition, or view all 151 articles.</p>
              <button
                type="button"
                className="clinical-btn-primary"
                onClick={() => {
                  handleSearchChange('')
                  if (activeCategorySlug !== 'all') navigate('/blog')
                }}
              >
                <span>View All {BLOG_POSTS.length} Articles</span>
              </button>
            </div>
          ) : (
            <div className="blog-grid">
              {visiblePosts.map((post, idx) => {
                const fallbackImg =
                  FALLBACK_CARD_IMAGE_BY_CATEGORY[post.categorySlug] ||
                  '/images/heroes/stock/clinical-blog.jpg'
                return (
                  <article className="blog-card" key={post.slug}>
                    <Link
                      className="blog-card-image"
                      to={`/blog/${post.slug}`}
                      tabIndex={-1}
                      aria-hidden="true"
                    >
                      <img
                        src={post.coverImage || fallbackImg}
                        alt={post.title}
                        loading={idx < 6 ? 'eager' : 'lazy'}
                        onError={(e) => {
                          if (e.currentTarget.src !== window.location.origin + fallbackImg) {
                            e.currentTarget.src = fallbackImg
                          }
                        }}
                      />
                    </Link>

                    <div className="blog-card-body">
                      <div className="blog-card-top-row">
                        <span className="blog-card-category">{post.category}</span>
                        <span className="blog-card-read">
                          <Clock size={12} aria-hidden="true" />
                          <span>{post.readTime}</span>
                        </span>
                      </div>

                      <h2 className="blog-card-title">
                        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                      </h2>

                      <p className="blog-card-desc">{post.excerpt}</p>

                      <div className="blog-card-footer">
                        <div className="blog-card-meta">
                          <span className="blog-card-author-name">Meenu Balaji, M.H.Sc</span>
                          <span className="blog-card-date">{post.postDate}</span>
                        </div>
                        <Link to={`/blog/${post.slug}`} className="blog-card-cta" aria-label={`Read ${post.title}`}>
                          <span>Read</span>
                          <ArrowRight size={14} strokeWidth={2.3} aria-hidden="true" />
                        </Link>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          )}

          {/* Responsive Pagination */}
          {totalPages > 1 && (
            <nav className="blog-pagination" aria-label="Blog pagination">
              <button
                type="button"
                className="blog-page-btn blog-page-nav"
                disabled={currentPage <= 1}
                onClick={() => goToPage(currentPage - 1)}
                aria-label="Previous page"
              >
                <ChevronLeft size={16} aria-hidden="true" />
                <span className="blog-page-nav-label">Previous</span>
              </button>

              <div className="blog-page-numbers">
                {pageTokens.map((tok) =>
                  typeof tok === 'string' ? (
                    <span key={tok} className="blog-page-ellipsis" aria-hidden="true">
                      &hellip;
                    </span>
                  ) : (
                    <button
                      key={tok}
                      type="button"
                      className="blog-page-btn"
                      aria-current={tok === currentPage ? 'page' : undefined}
                      onClick={() => goToPage(tok)}
                    >
                      {tok}
                    </button>
                  )
                )}
              </div>

              <button
                type="button"
                className="blog-page-btn blog-page-nav"
                disabled={currentPage >= totalPages}
                onClick={() => goToPage(currentPage + 1)}
                aria-label="Next page"
              >
                <span className="blog-page-nav-label">Next</span>
                <ChevronRight size={16} aria-hidden="true" />
              </button>
            </nav>
          )}
        </Section>
      </div>

      <CtaBand />
    </>
  )
}
