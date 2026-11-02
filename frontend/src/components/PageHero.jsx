import { Link, useLocation } from 'react-router-dom'
import {
  Activity,
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  FileText,
  GraduationCap,
  HeartHandshake,
  ShieldCheck,
  Trophy,
  Utensils
} from 'lucide-react'
import WhatsAppIcon from './WhatsAppIcon'
import { useBook } from '../context/bookContext'
import { wa } from '../data/site'
import { resolvePageHero } from '../data/pageHeroes'

const ICON_MAP = {
  Activity,
  Award,
  BookOpen,
  ClipboardList,
  FileText,
  GraduationCap,
  HeartHandshake,
  ShieldCheck,
  Trophy,
  Utensils
}

const DEFAULT_TRUST_ITEMS = [
  '14+ Years Clinical Experience',
  'Food-First Indian Nutrition',
  '100% Personalised Protocols'
]

export default function PageHero({
  title,
  blurb,
  subtitle,
  parent,
  badge,
  breadcrumb,
  primaryCta,
  secondaryCta,
  waMessage,
  waLabel = 'WhatsApp Meenu',
  trustItems,
  image,
  imageAlt,
  imageCaption,
  imagePosition,
  heroKey,
  dynamic = false
}) {
  const { pathname } = useLocation()
  const openBook = useBook()
  const config = dynamic ? null : resolvePageHero(pathname, heroKey)

  const resolvedParent = parent || config?.parent || null
  const resolvedTitle = dynamic
    ? title || config?.title
    : config?.title || title
  const resolvedSubtitle = dynamic
    ? subtitle || blurb || config?.subtitle
    : config?.subtitle || subtitle || blurb
  const resolvedBadge =
    badge ||
    config?.badge ||
    (typeof resolvedTitle === 'string'
      ? resolvedTitle.split(':')[0].toUpperCase()
      : 'PRAGMATIC CLINICAL NUTRITION')
  const resolvedBreadcrumb =
    breadcrumb ||
    config?.breadcrumb ||
    resolvedBadge

  const resolvedPrimary = primaryCta ||
    config?.primaryCta || {
      label: 'Book Free Discovery Call',
      action: 'book'
    }

  const resolvedSecondary = secondaryCta ||
    config?.secondaryCta || {
      label: 'Check Your Gut Score',
      to: '/gut-health-checker',
      icon: 'Activity'
    }

  const SecondaryIcon = ICON_MAP[resolvedSecondary.icon] || Activity

  const resolvedWaMessage =
    waMessage ||
    config?.waMessage ||
    `Hi Meenu, I would like to discuss ${typeof resolvedTitle === 'string' ? resolvedTitle.split(':')[0] : 'a personalised nutrition plan'}.`

  const resolvedTrustItems =
    (trustItems && trustItems.length > 0 ? trustItems : null) ||
    config?.trustItems ||
    DEFAULT_TRUST_ITEMS

  const validCustomImage =
    typeof image === 'string' && /^(https?:\/\/|\/|data:)/.test(image)
      ? image
      : null

  const resolvedImage =
    validCustomImage ||
    config?.image ||
    '/images/heroes/stock/more-care-hub.jpg'

  const resolvedImageAlt =
    imageAlt ||
    config?.imageAlt ||
    (typeof resolvedTitle === 'string' ? resolvedTitle : 'Pragmatic Clinical Nutrition')

  const resolvedImageCaption =
    imageCaption ||
    config?.imageCaption ||
    resolvedTrustItems[1] ||
    'Evidence-Based Clinical Nutrition'

  const resolvedImagePosition = imagePosition || config?.imagePosition || 'center center'

  return (
    <header className="gut-condition-hero">
      <div className="sec-wide condition-hero-inner">
        <nav className="breadcrumbs-nav" aria-label="Breadcrumbs">
          <Link to="/" className="breadcrumb-link">Home</Link>
          {resolvedParent && (
            <>
              <ChevronRight size={13} strokeWidth={2} className="breadcrumb-separator" aria-hidden="true" />
              <Link to={resolvedParent.to} className="breadcrumb-link">{resolvedParent.label}</Link>
            </>
          )}
          <ChevronRight size={13} strokeWidth={2} className="breadcrumb-separator" aria-hidden="true" />
          <span className="breadcrumb-current" aria-current="page">{resolvedBreadcrumb}</span>
        </nav>

        <div className="condition-hero-grid">
          <div className="condition-hero-content">
            <div className="condition-badge-wrap">
              <span className="condition-badge-dot" aria-hidden="true" />
              <span className="condition-badge-text">{resolvedBadge}</span>
            </div>

            <h1 className="condition-hero-title">{resolvedTitle}</h1>
            {resolvedSubtitle && (
              <p className="condition-hero-subtitle">{resolvedSubtitle}</p>
            )}

            <div className="condition-hero-actions">
              {resolvedPrimary.to ? (
                <Link to={resolvedPrimary.to} className="clinical-btn-primary">
                  <span>{resolvedPrimary.label}</span>
                  <ArrowRight size={18} strokeWidth={2.5} className="btn-arrow-icon" />
                </Link>
              ) : resolvedPrimary.href ? (
                <a href={resolvedPrimary.href} className="clinical-btn-primary">
                  <span>{resolvedPrimary.label}</span>
                  <ArrowRight size={18} strokeWidth={2.5} className="btn-arrow-icon" />
                </a>
              ) : (
                <button
                  type="button"
                  className="clinical-btn-primary"
                  onClick={openBook}
                >
                  <span>{resolvedPrimary.label}</span>
                  <ArrowRight size={18} strokeWidth={2.5} className="btn-arrow-icon" />
                </button>
              )}

              <Link to={resolvedSecondary.to} className="gut-hero-secondary-btn">
                <span>{resolvedSecondary.label}</span>
                <SecondaryIcon size={16} strokeWidth={2} />
              </Link>

              <a
                href={wa(resolvedWaMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="gut-hero-wa-btn"
              >
                <WhatsAppIcon size={18} />
                <span>{waLabel}</span>
              </a>
            </div>

            <div className="condition-trust-strip">
              {resolvedTrustItems.map((item) => (
                <div className="trust-item" key={item}>
                  <CheckCircle2 size={16} className="text-leaf" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="condition-hero-visual">
            <div className="condition-hero-media-card">
              <img
                src={resolvedImage}
                alt={resolvedImageAlt}
                className="condition-hero-img"
                style={{ objectPosition: resolvedImagePosition }}
                loading="eager"
              />
              <div className="condition-hero-media-caption">
                <CheckCircle2 size={15} className="text-leaf" aria-hidden="true" />
                <span>{resolvedImageCaption}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
