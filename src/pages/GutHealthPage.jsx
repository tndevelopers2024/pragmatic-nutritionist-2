import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Clock,
  Stethoscope,
  Utensils,
  UserCheck,
  Activity,
  Apple,
  Moon,
  Pill,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  FileCheck,
  ChevronRight,
  Award
} from 'lucide-react'
import { useSeo } from '../components/Seo'
import Section from '../components/Section'
import CtaBand from '../components/CtaBand'
import WhatsAppIcon from '../components/WhatsAppIcon'
import { useBook } from '../context/bookContext'
import { wa, PHONE } from '../data/site'
import {
  GUT_HERO,
  COMMON_SYMPTOMS,
  WHY_STANDARD_DIETS_FAIL,
  THREE_PHASE_ROADMAP,
  DIAGNOSTICS,
  PROGRAMS,
  EIGHT_PILLARS,
  CLINICAL_DIFFERENTIATORS,
  WHO_IS_THIS_FOR,
  GUT_FAQS
} from '../data/gutHealthData'

// Icon mapping helper for 8 pillars
const ICON_MAP = {
  Stethoscope: Stethoscope,
  Utensils: Utensils,
  UserCheck: UserCheck,
  Sparkles: Sparkles,
  Apple: Apple,
  Moon: Moon,
  Pill: Pill,
  ShieldCheck: ShieldCheck
}

export default function GutHealthPage() {
  useSeo(
    'Best Gut Health Nutritionist in India | Meenu Balaji, M.H.Sc',
    'Clinical gut health nutritionist with 14+ years experience. Personalised evidence-based plans for IBS, SIBO, bloating, acidity & gut healing using real Indian food.'
  )

  const openBook = useBook()
  const [activeFaq, setActiveFaq] = useState(0)
  const [pricingCycle, setPricingCycle] = useState('all') // 'all' or 'featured'

  return (
    <div className="gut-health-page-container">
      {/* 1. HERO SECTION */}
      <header className="gut-hero-section">
        <div className="sec-wide gut-hero-inner">
          {/* Breadcrumbs */}
          <nav className="breadcrumbs-nav" aria-label="Breadcrumbs">
            <Link to="/" className="breadcrumb-link">Home</Link>
            <ChevronRight size={13} strokeWidth={2} className="breadcrumb-separator" aria-hidden="true" />
            <span className="breadcrumb-current" aria-current="page">Gut Health Nutrition</span>
          </nav>

          <div className="gut-hero-grid">
            <div className="gut-hero-content">
              <div className="gut-badge-wrap">
                <span className="gut-badge-dot" aria-hidden="true" />
                <span className="gut-badge-text">{GUT_HERO.badge}</span>
              </div>

              <h1 className="gut-hero-title">{GUT_HERO.title}</h1>
              <p className="gut-hero-subtitle">{GUT_HERO.subtitle}</p>
              <p className="gut-hero-intro">{GUT_HERO.intro}</p>

              {/* Action Buttons */}
              <div className="gut-hero-actions">
                <button
                  type="button"
                  className="clinical-btn-primary"
                  onClick={openBook}
                  aria-label="Book A Free 10-Minute Discovery Call"
                >
                  <span>Book Free 10-Min Discovery Call</span>
                  <ArrowRight size={18} strokeWidth={2.5} className="btn-arrow-icon" />
                </button>

                <Link to="/gut-health-checker" className="gut-hero-secondary-btn">
                  <span>Take Free Gut Assessment</span>
                  <Activity size={16} strokeWidth={2} />
                </Link>

                <a
                  href={wa('Hi Meenu, I would like to consult with you regarding gut health.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gut-hero-wa-btn"
                  aria-label="Chat on WhatsApp with Meenu Balaji"
                >
                  <WhatsAppIcon size={18} />
                  <span>WhatsApp</span>
                </a>
              </div>

              <p className="gut-hero-note">
                <strong>No obligation:</strong> In this quick call, Meenu will understand your gut symptoms and guide you on clinical next steps.
              </p>
            </div>

            {/* Proof Card Panel */}
            <div className="gut-hero-card-panel">
              <div className="gut-stats-card">
                <div className="gut-stats-header">
                  <span className="stats-header-tag">CLINICAL TRACK RECORD</span>
                  <h3 className="stats-header-title">Science-Backed Gut Recovery</h3>
                </div>

                <div className="gut-stats-grid">
                  {GUT_HERO.stats.map((st, i) => (
                    <div key={i} className="gut-stat-item">
                      <span className="gut-stat-val">{st.value}</span>
                      <strong className="gut-stat-lbl">{st.label}</strong>
                      <span className="gut-stat-sub">{st.sub}</span>
                    </div>
                  ))}
                </div>

                <div className="gut-stats-footer">
                  <div className="stats-footer-loc">
                    <span className="loc-bullet" />
                    <span>{GUT_HERO.locationsNote}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. SUB-PAGE EXPLORATION PILLS */}
          <div className="gut-subpages-nav-banner">
            <span className="subpages-nav-label">Explore Specialized Protocols:</span>
            <div className="subpages-pills-list">
              <Link to="/gut-health/ibs-bloating" className="subpage-pill-link">
                <span>IBS & Bloating</span>
                <ChevronRight size={14} strokeWidth={2.5} />
              </Link>
              <Link to="/gut-health/acidity-gerd" className="subpage-pill-link">
                <span>Acidity & GERD</span>
                <ChevronRight size={14} strokeWidth={2.5} />
              </Link>
              <Link to="/gut-health/constipation-digestion" className="subpage-pill-link">
                <span>Constipation & Motility</span>
                <ChevronRight size={14} strokeWidth={2.5} />
              </Link>
              <Link to="/gut-health/sibo-gluten-intolerance" className="subpage-pill-link">
                <span>SIBO & Food Intolerance</span>
                <ChevronRight size={14} strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* 3. SYMPTOM AUDIT SECTION */}
      <Section width="wide" bg="base" className="gut-symptoms-section">
        <div className="sec-wide">
          <div className="gut-section-header">
            <span className="gut-sec-eyebrow">COMMON CLINICAL MANIFESTATIONS</span>
            <h2 className="gut-sec-title">Do You Struggle With Any of These Daily Symptoms?</h2>
            <p className="gut-sec-subtitle">
              Digestive distress rarely occurs in isolation. We look beyond surface discomfort to identify whether your symptoms stem from bacterial fermentation, sluggish motility, or mucosal permeability.
            </p>
          </div>

          <div className="gut-symptoms-grid">
            {COMMON_SYMPTOMS.map((item) => (
              <div key={item.id} className="gut-symptom-card">
                <div className="symptom-tag-wrap">
                  <span className="symptom-tag">{item.tag}</span>
                </div>
                <h3 className="symptom-card-title">{item.title}</h3>
                <p className="symptom-card-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 4. WHY STANDARD DIETS FAIL */}
      <Section width="wide" bg="alt" className="gut-why-fail-section">
        <div className="sec-wide">
          <div className="gut-fail-split">
            <div className="gut-fail-left">
              <span className="gut-sec-eyebrow">{WHY_STANDARD_DIETS_FAIL.eyebrow}</span>
              <h2 className="gut-sec-title">{WHY_STANDARD_DIETS_FAIL.heading}</h2>
              <p className="gut-fail-lead">{WHY_STANDARD_DIETS_FAIL.lead}</p>
              
              <div className="gut-philosophy-quote-box">
                <p className="quote-text">
                  "At Pragmatic Nutrition, we don't hand out generic elimination charts. We teach your gut how to digest real, nourishing Indian food again without fear or pain."
                </p>
                <span className="quote-author">— Meenu Balaji, M.H.Sc</span>
              </div>
            </div>

            <div className="gut-fail-right">
              <div className="gut-fail-cards-list">
                {WHY_STANDARD_DIETS_FAIL.points.map((pt, idx) => (
                  <div key={idx} className="gut-fail-card">
                    <div className="fail-card-num">0{idx + 1}</div>
                    <div className="fail-card-content">
                      <h4 className="fail-card-title">{pt.title}</h4>
                      <p className="fail-card-desc">{pt.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 5. THE 3-PHASE GUT RESTORATION METHODOLOGY */}
      <Section width="wide" bg="base" className="gut-roadmap-section">
        <div className="sec-wide">
          <div className="gut-section-header">
            <span className="gut-sec-eyebrow">STRUCTURED CLINICAL JOURNEY</span>
            <h2 className="gut-sec-title">The 3-Phase Gut Restoration Methodology</h2>
            <p className="gut-sec-subtitle">
              Every program follows a deliberate, step-by-step roadmap so your digestive system has time to heal progressively rather than being overwhelmed all at once.
            </p>
          </div>

          <div className="gut-phases-grid">
            {THREE_PHASE_ROADMAP.map((phase) => (
              <div key={phase.step} className="gut-phase-card">
                <div className="phase-card-top">
                  <span className="phase-card-step">{phase.step}</span>
                  <span className="phase-card-timeline">{phase.timeline}</span>
                </div>
                <span className="phase-card-badge">{phase.badge}</span>
                <h3 className="phase-card-heading">{phase.phase}</h3>
                <h4 className="phase-card-subheading">{phase.title}</h4>
                <p className="phase-card-desc">{phase.desc}</p>

                <div className="phase-card-highlights">
                  <strong className="highlights-title">Key Clinical Actions:</strong>
                  <ul className="highlights-list">
                    {phase.highlights.map((hl, i) => (
                      <li key={i}>
                        <CheckCircle2 size={15} className="highlight-icon" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 6. ADVANCED DIAGNOSTICS & LAB TESTING */}
      <Section width="wide" bg="alt" className="gut-diagnostics-section">
        <div className="sec-wide">
          <div className="gut-section-header">
            <span className="gut-sec-eyebrow">FUNCTIONAL MEDICINE TESTING</span>
            <h2 className="gut-sec-title">Precision Gut Diagnostics When Needed</h2>
            <p className="gut-sec-subtitle">
              When symptoms are chronic, complex, or recurring, we eliminate guesswork using advanced clinical testing to target the exact microbial imbalances.
            </p>
          </div>

          <div className="gut-diagnostics-grid">
            {DIAGNOSTICS.map((diag, index) => (
              <div key={index} className="gut-diagnostic-card">
                <div className="diag-card-header">
                  <FileCheck size={24} className="diag-icon" />
                  <span className="diag-tag">{diag.tag}</span>
                </div>
                <h3 className="diag-title">{diag.name}</h3>
                <p className="diag-desc">{diag.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 7. PROGRAMS & PRICING */}
      <Section width="wide" bg="base" className="gut-programs-section" id="pricing">
        <div className="sec-wide">
          <div className="gut-section-header">
            <span className="gut-sec-eyebrow">TRANSPARENT CLINICAL CARE</span>
            <h2 className="gut-sec-title">Personalized Gut Health Programs & Pricing</h2>
            <p className="gut-sec-subtitle">
              All programs include initial video assessment, custom Indian-food meal frameworks, continuous tracking, and bi-weekly 1-on-1 check-ins.
            </p>
          </div>

          <div className="gut-programs-grid">
            {PROGRAMS.map((prog) => (
              <div
                key={prog.id}
                className={`gut-program-card ${prog.popular ? 'popular-card' : ''}`}
              >
                {prog.badge && (
                  <div className="program-badge-wrap">
                    <span className="program-badge">{prog.badge}</span>
                  </div>
                )}

                <h3 className="program-title">{prog.title}</h3>
                <p className="program-ideal-text">
                  <strong>Target:</strong> {prog.idealFor}
                </p>

                <div className="program-price-box">
                  <span className="price-currency">{prog.currency}</span>
                  <span className="price-number">{prog.price}</span>
                  {prog.priceSub && <span className="price-sub">{prog.priceSub}</span>}
                  <span className="price-duration">{prog.duration}</span>
                </div>

                <div className="program-features-list">
                  <strong className="features-head">What is included:</strong>
                  <ul>
                    {prog.features.map((feat, idx) => (
                      <li key={idx}>
                        <CheckCircle2 size={16} className="feature-check" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="program-action">
                  <button
                    type="button"
                    className={`program-select-btn ${prog.popular ? 'btn-popular' : ''}`}
                    onClick={openBook}
                  >
                    <span>{prog.ctaText}</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="gut-pricing-footnote">
            <p>
              * Prices apply to online consultations across India. In-person consultation fees at our Chennai clinic differ.
              International clients can join via our Global Gut Health Coaching starting from USD $99 per month.
            </p>
            <p className="disclaimer-subtext">
              These programs provide clinical nutrition and lifestyle coaching support and do not replace medical emergency care. Please consult your physician for specific prescription medication adjustments.
            </p>
          </div>
        </div>
      </Section>

      {/* 8. THE 8 PILLARS OF PRAGMATIC GUT NUTRITION */}
      <Section width="wide" bg="alt" className="gut-pillars-section">
        <div className="sec-wide">
          <div className="gut-section-header">
            <span className="gut-sec-eyebrow">THE 8 PILLARS</span>
            <h2 className="gut-sec-title">Why Choose Pragmatic Nutrition for Your Gut Journey</h2>
            <p className="gut-sec-subtitle">
              Our clinical practice bridges food biochemistry, digestive physiology, and behavioral coaching to create sustainable gut healing.
            </p>
          </div>

          <div className="gut-pillars-grid">
            {EIGHT_PILLARS.map((pillar, idx) => {
              const IconComp = ICON_MAP[pillar.icon] || Sparkles
              return (
                <div key={idx} className="gut-pillar-card">
                  <div className="pillar-icon-box">
                    <IconComp size={22} className="pillar-icon" />
                  </div>
                  <h3 className="pillar-title">{pillar.title}</h3>
                  <p className="pillar-desc">{pillar.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </Section>

      {/* 9. CLINICAL DIFFERENTIATORS */}
      <Section width="wide" bg="base" className="gut-differentiators-section">
        <div className="sec-wide">
          <div className="differentiators-card">
            <div className="diff-header">
              <span className="gut-sec-eyebrow">CLINICAL EXCELLENCE</span>
              <h2 className="diff-title">What the Best Gut Health Nutritionist Does</h2>
              <p className="diff-lead">
                Navigating chronic gut dysfunction requires more than a simple meal chart. Here is our clinical standard of care:
              </p>
            </div>

            <div className="diff-checklist-grid">
              {CLINICAL_DIFFERENTIATORS.map((diff, i) => (
                <div key={i} className="diff-checklist-item">
                  <div className="diff-check-icon">
                    <CheckCircle2 size={20} />
                  </div>
                  <span className="diff-check-text">{diff}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* 10. WHO IS THIS FOR? */}
      <Section width="wide" bg="alt" className="gut-who-for-section">
        <div className="sec-wide">
          <div className="gut-section-header">
            <span className="gut-sec-eyebrow">CLIENT PROFILES</span>
            <h2 className="gut-sec-title">Who Is This Program Designed For?</h2>
            <p className="gut-sec-subtitle">
              Whether you have been newly diagnosed or have spent years searching for digestive answers, our protocols provide clarity.
            </p>
          </div>

          <div className="gut-who-grid">
            {WHO_IS_THIS_FOR.map((item, idx) => (
              <div key={idx} className="gut-who-card">
                <div className="who-card-num">0{idx + 1}</div>
                <h3 className="who-card-title">{item.title}</h3>
                <p className="who-card-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 11. MEET MEENU BALAJI */}
      <Section width="wide" bg="base" className="gut-meet-section">
        <div className="sec-wide">
          <div className="gut-meet-card">
            <div className="gut-meet-text">
              <span className="gut-sec-eyebrow">YOUR CLINICAL GUT EXPERT</span>
              <h2 className="gut-meet-name">Meenu Balaji, M.H.Sc</h2>
              <p className="gut-meet-creds">
                Master of Health Science (Food Science & Nutrition) • 14+ Years Clinical Experience (India, UK, New Zealand)
              </p>

              <p className="gut-meet-p">
                Meenu is a trusted clinical gut health nutritionist in Chennai with 14+ years of global practice, having successfully worked with over 4,500 clients. As a peer reviewer for the prestigious <em>European Journal of Nutrition</em>, she brings rigorous evidence-based science to everyday digestive challenges.
              </p>

              <p className="gut-meet-p">
                "My clinical approach combines digestive physiology, microbiome assessment, and behavioral nutrition to create lasting, measurable relief without demanding that you give up traditional Indian comfort foods."
              </p>

              <div className="gut-meet-actions">
                <button
                  type="button"
                  className="clinical-btn-primary"
                  onClick={openBook}
                >
                  <span>Book Consultation With Meenu</span>
                  <ArrowRight size={16} />
                </button>
                <Link to="/about" className="gut-meet-link">
                  <span>Read Full Clinical Bio</span>
                  <ChevronRight size={14} />
                </Link>
              </div>
            </div>

            <div className="gut-meet-sidebar">
              <div className="meet-credentials-box">
                <div className="cred-badge-row">
                  <Award size={20} className="cred-icon" />
                  <strong>Clinical Highlights</strong>
                </div>
                <ul className="cred-list">
                  <li>M.H.Sc Food Science & Nutrition</li>
                  <li>Peer Reviewer, European Journal of Nutrition</li>
                  <li>14+ Years Global Practice (India, UK, NZ)</li>
                  <li>4,500+ Gut Health Success Cases</li>
                  <li>Chennai Clinic (Guindy / OMR) + Global Online</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 12. FREQUENTLY ASKED QUESTIONS */}
      <Section width="wide" bg="alt" className="gut-faq-section">
        <div className="sec-wide">
          <div className="gut-section-header">
            <span className="gut-sec-eyebrow">COMMON QUESTIONS</span>
            <h2 className="gut-sec-title">Frequently Asked Questions</h2>
            <p className="gut-sec-subtitle">
              Clear answers regarding our gut health consultations, in-person clinic visits, testing, and food protocols.
            </p>
          </div>

          <div className="gut-faq-accordion-list">
            {GUT_FAQS.map((item, index) => {
              const isOpen = activeFaq === index
              return (
                <div
                  key={index}
                  className={`gut-faq-item ${isOpen ? 'faq-item-open' : ''}`}
                >
                  <button
                    type="button"
                    className="gut-faq-question-btn"
                    onClick={() => setActiveFaq(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                  >
                    <span className="faq-num">0{index + 1}</span>
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
        </div>
      </Section>

      {/* 13. CTA BAND */}
      <CtaBand
        eyebrow="TAKE THE FIRST STEP"
        headline="Ready to End Chronic Gut Discomfort?"
        headlineHighlight="Start With Real Clinical Care."
        text="Book a free 10-minute discovery call with Meenu Balaji to map your symptoms and understand the right protocol for your digestive recovery."
        primaryCtaText="Book Your Free Discovery Call"
        secondaryCtaText="Chat on WhatsApp"
        trustStatement="Available at Chennai Clinic & Online Across India and Globally"
      />
    </div>
  )
}
