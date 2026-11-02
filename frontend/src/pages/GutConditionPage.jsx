import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import {
  CheckCircle2,
  ArrowRight,
  Activity,
  ChevronRight,
  ChevronDown,
  ChevronUp
} from 'lucide-react'
import { useSeo } from '../components/Seo'
import Section from '../components/Section'
import CtaBand from '../components/CtaBand'
import WhatsAppIcon from '../components/WhatsAppIcon'
import { useBook } from '../context/bookContext'
import { wa } from '../data/site'
import {
  SUB_PAGES_DATA,
  THREE_PHASE_ROADMAP,
  PROGRAMS
} from '../data/gutHealthData'

export default function GutConditionPage({ conditionSlug }) {
  const params = useParams()
  const slug = conditionSlug || params.slug
  const condition = SUB_PAGES_DATA[slug]

  useSeo(condition?.metaTitle || 'Gut Health', condition?.metaDesc || 'Gut health protocol')

  const openBook = useBook()
  const [activeFaq, setActiveFaq] = useState(0)

  if (!condition) {
    return <Navigate to="/gut-health" replace />
  }

  // Find the recommended program tier
  const recommendedProgram =
    PROGRAMS.find((p) => p.id === condition.recommendedTier) || PROGRAMS[1]

  // Get sibling conditions for cross-navigation
  const siblingSlugs = Object.keys(SUB_PAGES_DATA).filter((s) => s !== slug)

  return (
    <div className="gut-condition-page-container">
      {/* 1. HERO SECTION */}
      <header className="gut-condition-hero">
        <div className="sec-wide condition-hero-inner">
          <nav className="breadcrumbs-nav" aria-label="Breadcrumbs">
            <Link to="/" className="breadcrumb-link">Home</Link>
            <ChevronRight size={13} strokeWidth={2} className="breadcrumb-separator" aria-hidden="true" />
            <Link to="/gut-health" className="breadcrumb-link">Gut Health</Link>
            <ChevronRight size={13} strokeWidth={2} className="breadcrumb-separator" aria-hidden="true" />
            <span className="breadcrumb-current" aria-current="page">{condition.heroBadge}</span>
          </nav>

          <div className="condition-hero-grid">
            <div className="condition-hero-content">
              <div className="condition-badge-wrap">
                <span className="condition-badge-dot" aria-hidden="true" />
                <span className="condition-badge-text">{condition.heroBadge}</span>
              </div>

              <h1 className="condition-hero-title">{condition.title}</h1>
              <p className="condition-hero-subtitle">{condition.subtitle}</p>

              <div className="condition-hero-actions">
                <button
                  type="button"
                  className="clinical-btn-primary"
                  onClick={openBook}
                >
                  <span>Book Free Discovery Call</span>
                  <ArrowRight size={18} strokeWidth={2.5} className="btn-arrow-icon" />
                </button>

                <Link to="/gut-health-checker" className="gut-hero-secondary-btn">
                  <span>Check Your Gut Score</span>
                  <Activity size={16} strokeWidth={2} />
                </Link>

                <a
                  href={wa(`Hi Meenu, I want to discuss a clinical plan for ${condition.title}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gut-hero-wa-btn"
                >
                  <WhatsAppIcon size={18} />
                  <span>WhatsApp Meenu</span>
                </a>
              </div>

              <div className="condition-trust-strip">
                {(condition.trustItems || [
                  '14+ Years Clinical Experience',
                  'Food-First Indian Nutrition',
                  'No Extreme Elimination'
                ]).map((item) => (
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
                  src={condition.heroImage || '/images/heroes/stock/ibs-bloating.jpg'}
                  alt={condition.heroImageAlt || condition.title}
                  className="condition-hero-img"
                  loading="eager"
                />
                <div className="condition-hero-media-caption">
                  <CheckCircle2 size={15} className="text-leaf" aria-hidden="true" />
                  <span>{condition.heroImageCaption || 'Food-First Indian Gut Protocol'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 2. ROOT CAUSES BREAKDOWN */}
      <Section width="wide" bg="base" className="condition-root-causes-section">
        <div className="gut-section-header">
          <span className="gut-sec-eyebrow">CLINICAL ETIOLOGY</span>
          <h2 className="gut-sec-title">What Is Actually Driving Your Symptoms?</h2>
          <p className="gut-sec-subtitle">
            Digestive distress isn't random. Understanding the underlying biochemical and motility factors is the first step toward lasting healing.
          </p>
        </div>

        <div className="condition-causes-grid">
          {condition.rootCauses.map((cause, idx) => (
            <div key={idx} className="cause-card">
              <div className="cause-card-num">0{idx + 1}</div>
              <h3 className="cause-title">{cause.title}</h3>
              <p className="cause-desc">{cause.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 3. THE FOOD-FIRST INDIAN PROTOCOL */}
      <Section width="wide" bg="alt" className="condition-protocol-section">
        <div className="gut-section-header">
          <span className="gut-sec-eyebrow">EVIDENCE-BASED NUTRITION</span>
          <h2 className="gut-sec-title">The Food-First Clinical Protocol</h2>
          <p className="gut-sec-subtitle">
            We modify your home cooking methods, spice ratios, and meal timing to soothe your gut while keeping meals satisfying and culturally familiar.
          </p>
        </div>

        <div className="protocol-steps-grid">
          {condition.protocolPoints.map((pt, i) => (
            <div key={i} className="protocol-step-card">
              <div className="step-badge">Step {pt.step}</div>
              <h3 className="step-title">{pt.title}</h3>
              <p className="step-desc">{pt.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 4. 3-PHASE RECOVERY ROADMAP */}
      <Section width="wide" bg="base" className="condition-roadmap-section">
        <div className="gut-section-header">
          <span className="gut-sec-eyebrow">RECOVERY TIMELINE</span>
          <h2 className="gut-sec-title">How Your Gut Restores Progressively</h2>
          <p className="gut-sec-subtitle">
            Healing takes place in structured stages to avoid overwhelming an inflamed digestive tract.
          </p>
        </div>

        <div className="condition-phases-grid">
          {THREE_PHASE_ROADMAP.map((ph) => (
            <div key={ph.step} className="condition-phase-card">
              <div className="cond-phase-header">
                <span className="cond-step-num">{ph.step}</span>
                <span className="cond-phase-timeline">{ph.timeline}</span>
              </div>
              <h3 className="cond-phase-title">{ph.phase}</h3>
              <h4 className="cond-phase-subtitle">{ph.title}</h4>
              <p className="cond-phase-desc">{ph.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 5. RECOMMENDED PROGRAM PACKAGE */}
      <Section width="wide" bg="alt" className="condition-recommended-package-section">
        <div className="gut-section-header">
          <span className="gut-sec-eyebrow">RECOMMENDED PROTOCOL</span>
          <h2 className="gut-sec-title">Recommended Clinical Program For This Condition</h2>
          <p className="gut-sec-subtitle">
            Based on clinical timelines for gut mucosal repair and symptom resolution, here is our targeted care package.
          </p>
        </div>

        <div className="condition-package-card-wrap">
          <div className="condition-package-card">
            <div className="package-card-left">
              <span className="package-tier-badge">{recommendedProgram.badge || 'RECOMMENDED CLINICAL PROGRAM'}</span>
              <h3 className="package-title">{recommendedProgram.title}</h3>
              <p className="package-ideal">
                <strong>Designed for:</strong> {recommendedProgram.idealFor}
              </p>

              <div className="package-features-block">
                <strong>Program Inclusions:</strong>
                <ul>
                  {recommendedProgram.features.map((f, i) => (
                    <li key={i}>
                      <CheckCircle2 size={16} className="feature-check" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="package-card-right">
              <div className="package-price-tag">
                <span className="tag-currency">{recommendedProgram.currency}</span>
                <span className="tag-amount">{recommendedProgram.price}</span>
                <span className="tag-duration">{recommendedProgram.duration}</span>
              </div>

              <button
                type="button"
                className="clinical-btn-primary w-full"
                onClick={openBook}
              >
                <span>Book Free Discovery Call</span>
                <ArrowRight size={16} />
              </button>

              <p className="package-note">
                Need a different program? Explore all our{' '}
                <Link to="/gut-health#pricing" className="text-leaf underline">
                  Gut Health Programs
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* 6. CONDITION FREQUENTLY ASKED QUESTIONS */}
      <Section width="wide" bg="base" className="condition-faq-section">
        <div className="gut-section-header">
          <span className="gut-sec-eyebrow">COMMON QUERIES</span>
          <h2 className="gut-sec-title">Questions About {condition.heroBadge}</h2>
        </div>

        <div className="gut-faq-accordion-list">
          {condition.faq.map((item, idx) => {
            const isOpen = activeFaq === idx
            return (
              <div key={idx} className={`gut-faq-item ${isOpen ? 'faq-item-open' : ''}`}>
                <button
                  type="button"
                  className="gut-faq-question-btn"
                  onClick={() => setActiveFaq(isOpen ? -1 : idx)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-num">0{idx + 1}</span>
                  <span className="faq-q-text">{item.q}</span>
                  <span className="faq-toggle-icon">
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </span>
                </button>

                {isOpen && (
                  <div className="gut-faq-answer-panel">
                    <p className="faq-a-text">{item.a}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </Section>

      {/* 7. CROSS-LINKS TO RELATED SUB-PAGES */}
      <Section width="wide" bg="alt" className="condition-crosslinks-section">
        <div className="gut-section-header">
          <span className="gut-sec-eyebrow">RELATED CONDITIONS</span>
          <h2 className="gut-sec-title">Explore Other Specialized Gut Protocols</h2>
        </div>

        <div className="crosslinks-grid">
            <Link to="/gut-health" className="crosslink-card main-hub-card">
              <span className="crosslink-tag">Clinical Hub</span>
              <h3 className="crosslink-title">All Gut Health Programs & Methodology</h3>
              <p className="crosslink-desc">
                Review our complete 3-phase clinical methodology, 5 program tiers, and 8 core pillars.
              </p>
              <div className="crosslink-arrow">
                <span>View Full Gut Protocol</span>
                <ArrowRight size={14} />
              </div>
            </Link>

            {siblingSlugs.map((s) => {
              const sib = SUB_PAGES_DATA[s]
              return (
                <Link key={s} to={`/gut-health/${s}`} className="crosslink-card">
                  <span className="crosslink-tag">{sib.heroBadge}</span>
                  <h3 className="crosslink-title">{sib.title}</h3>
                  <p className="crosslink-desc">{sib.subtitle}</p>
                  <div className="crosslink-arrow">
                    <span>Explore Protocol</span>
                    <ArrowRight size={14} />
                  </div>
                </Link>
              )
            })}
          </div>
        </Section>

      {/* 8. CTA BAND */}
      <CtaBand
        eyebrow="GET STARTED TODAY"
        headline={`Ready to Heal Your ${condition.heroBadge}?`}
        headlineHighlight="Book Your Discovery Call."
        text="Speak directly with Meenu Balaji to review your symptoms and get a clear, clinical roadmap tailored to your body and lifestyle."
        primaryCtaText="Book Free 10-Min Discovery Call"
        secondaryCtaText="Chat on WhatsApp"
        trustStatement="Evidence-Led Nutrition • Chennai Clinic & Global Online"
      />
    </div>
  )
}
