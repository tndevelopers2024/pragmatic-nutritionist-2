import { Link, useLocation } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export default function PageHero({ title, blurb, parent, image }) {
  const { pathname } = useLocation()
  const heroImage = pathname.includes('sports') ? 'sports' : pathname.includes('gut') ? 'gut' : /child|teen|adhd/.test(pathname) ? 'family' : pathname.includes('pcos') ? 'pcos' : pathname.includes('diabetes') ? 'diabetes' : pathname.includes('weight-loss') ? 'weight-loss' : pathname.startsWith('/programs-pricing') ? 'programs' : pathname.startsWith('/results') ? 'results' : pathname.startsWith('/about') ? 'about' : pathname.startsWith('/blog') ? 'blog' : 'care'
  return (
    <header className="page-hero-section" style={{ '--page-hero-image': `url(/images/heroes/${image || heroImage}.webp)` }}>
      <div className="page-hero-container">
        <nav className="breadcrumbs-nav" aria-label="Breadcrumbs">
          <Link to="/" className="breadcrumb-link">Home</Link>
          {parent && (
            <>
              <ChevronRight size={13} strokeWidth={2} className="breadcrumb-separator" aria-hidden="true" />
              <Link to={parent.to} className="breadcrumb-link">{parent.label}</Link>
            </>
          )}
          <ChevronRight size={13} strokeWidth={2} className="breadcrumb-separator" aria-hidden="true" />
          <span className="breadcrumb-current" aria-current="page" title={title}>{typeof title === 'string' ? title.split(' — ')[0] : title}</span>
        </nav>

        <h1 className={`page-hero-title${typeof title === 'string' && title.length > 70 ? ' page-hero-title-long' : ''}`}>{title}</h1>
        {blurb && <p className="page-hero-blurb">{blurb}</p>}
      </div>
    </header>
  )
}
