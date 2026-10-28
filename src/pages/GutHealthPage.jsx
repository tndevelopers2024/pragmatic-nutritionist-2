import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Utensils,
  UserCheck,
  Activity,
  Apple,
  Moon,
  Pill,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Award
} from 'lucide-react'
import { useSeo } from '../components/Seo'
import Section from '../components/Section'
import CtaBand from '../components/CtaBand'
import WhatsAppIcon from '../components/WhatsAppIcon'
import { useBook } from '../context/bookContext'
import { wa } from '../data/site'
import {
  GUT_HERO,
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
                Not sure where to begin? In this quick call, Meenu will understand your gut health concerns and guide you on next steps, no obligation.
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

      <Section width="wide" bg="base" className="gut-symptoms-section" title="Who Is This Gut Health Program For?">
        <p className="lead">Persistent bloating, IBS-type symptoms, SIBO, acid reflux, constipation, diarrhoea, and food intolerances can feel overwhelming, especially after trying multiple diets, supplements, or quick-fix remedies. The problem is rarely a lack of willpower. It is almost always a lack of clarity about what is actually driving your gut issues.</p>
        <p>At Pragmatic Nutrition, we take a holistic, behaviour-first approach. Rather than prescribing a generic diet chart, we focus on understanding why your digestion reacts the way it does, and design practical strategies that fit real life, including your work schedule, family routine, and Indian eating habits.</p>
        <p>When clinically appropriate, we use advanced gut testing including GI-MAP, stool microbiome analysis, and SIBO breath testing to identify root causes with precision. Targeted supplement and probiotic support is used selectively, reviewed regularly, and never recommended as a default. All nutrition strategies are adapted to Indian food culture, alongside lifestyle and stress-gut modulation tools that support long-term healing.</p>
        <p>Online consultations are available across India and internationally for clients in the USA, UK, Australia, and the Middle East. In-person appointments are available at our Chennai clinic.</p>
        <h3>Why This Program Works</h3>
        <p>Every program follows a structured three-phase journey: Reset, Restore, and Rebuild, so your gut has time to heal progressively rather than being overwhelmed all at once. We use a hybrid model combining online and in-clinic support, lab test interpretation with data-backed tracking, gut-friendly Indian meal plans, and behaviour-based guidance that delivers sustainable results within weeks, not months of guesswork.</p>
        <h3>Every Gut Health Program Includes</h3>
        <p>Each program comes with an online initial assessment via video call, a personalised gut health plan with recipes, follow-up support over WhatsApp or email, ongoing symptom tracking with plan adjustments, and evidence-driven nutrition guidance rooted in digestive physiology and behavioural science.</p>
      </Section>

      {/* 7. PROGRAMS & PRICING */}
      <Section width="wide" bg="base" className="gut-programs-section" id="pricing">
        <div className="sec-wide">
          <div className="gut-section-header">
            <span className="gut-sec-eyebrow">TRANSPARENT CLINICAL CARE</span>
            <h2 className="gut-sec-title">Personalized Gut Health Programs & Pricing</h2>
            <p className="gut-sec-subtitle">
              Each program includes an initial video assessment, a personalised gut health plan with recipes, follow-up support and symptom tracking. Review frequency varies by plan.
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
              Overseas clients: personalised nutrition plans start from USD $99 per month.
            </p>
            <p className="disclaimer-subtext">
              These programs provide nutrition and health coaching support and do not replace medical advice. Please consult your physician for medical conditions or medication changes.
            </p>
          </div>
          <div className="gut-section-header">
            <h3>Best Gut Health Programs</h3>
            <p>Online consultations are available in Chennai, across India, and internationally. International clients are supported through health coaching–based programs.</p>
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

      <Section width="wide" bg="white" title="What’s Included">
        <div className="gut-pillars-grid">
          <article className="gut-pillar-card"><h3>Ongoing Online Support</h3><p>Stay supported between consultations through email or WhatsApp for guidance, clarification, and timely course-correction when symptoms or questions arise.</p></article>
          <article className="gut-pillar-card"><h3>Structured Follow-Ups</h3><p>Your progress is reviewed at regular intervals (typically every 10 days), with personalised adjustments based on symptoms, tolerance, and real-life feedback, not rigid timelines.</p></article>
          <article className="gut-pillar-card"><h3>Personalised Nutrition Plan with Recipes</h3><p>Receive gut-friendly, Indian-food-based nutrition plans along with practical recipes designed to support digestion, reduce symptoms, and fit seamlessly into daily life.</p></article>
          <article className="gut-pillar-card"><h3>Lifestyle &amp; Behavioural Guidance</h3><p>Get targeted, expert recommendations to strengthen gut-supportive habits — including meal timing, stress-gut regulation, and sustainable routines that support long-term results.</p></article>
        </div>
        <h3>Join the Gut Health Plan Today!</h3>
        <button type="button" className="btn btn-primary" onClick={openBook}>Book Now<ArrowRight size={16} aria-hidden="true" /></button>
      </Section>

      {/* 9. CLINICAL DIFFERENTIATORS */}
      <Section width="wide" bg="base" className="gut-differentiators-section">
        <div className="sec-wide">
          <div className="differentiators-card">
            <div className="diff-header">
              <span className="gut-sec-eyebrow">CLINICAL EXCELLENCE</span>
              <h2 className="diff-title">What makes someone the best gut health nutritionist in India?</h2>
              <p className="diff-lead">
                The best gut health nutritionist is someone who:
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
            <p>Read our blog on how to choose the right Gut health nutritionist for you.</p>
          </div>
        </div>
      </Section>

      {/* 10. WHO IS THIS FOR? */}
      <Section width="wide" bg="alt" className="gut-who-for-section">
        <div className="sec-wide">
          <div className="gut-section-header">
            <span className="gut-sec-eyebrow">CLIENT PROFILES</span>
            <h2 className="gut-sec-title">Who Is This For?</h2>
            <p className="gut-sec-subtitle">
              This plan is ideal for:
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
                Meenu is a trusted gut health nutritionist in Chennai with 14+ years of global experience (UK, NZ and India) and has worked with 4500+ clients. She offers personalized, evidence-based plans to help with IBS, bloating, food sensitivities, and microbiome balance.
              </p>

              <p className="gut-meet-p">Available for in-person and online consultations, she supports your journey to better digestion and overall wellness.</p>
              <p className="gut-meet-p">My approach combines nutrition science, digestive physiology, microbiome testing, and behavioral nutrition to create lasting, measurable improvement.</p>

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
                  <li>4,500+ clients</li>
                  <li>Chennai Clinic (Guindy / OMR) + Global Online</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section width="wide" bg="white" title="Take the First Step Towards a Healthier Gut!">
        <p>Join the Gut Health Diet Plan today to transform your well-being from the inside out.</p>
        <Link to="/programs-pricing" className="btn btn-primary">Sign Up Now!<ArrowRight size={16} aria-hidden="true" /></Link>
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

      <Section width="wide" bg="white" title="Disclaimer">
        <p>The guidance and content provided by Pragmatic Nutrition are intended for general educational and wellness purposes only. While Meenu Balaji is a qualified nutritionist practicing in India, these services are not a substitute for medical care, diagnosis, or treatment in any country.</p>
        <p>If you have any pre-existing medical conditions or are under medical treatment, please consult your doctor, registered dietitian, or a licensed healthcare provider in your country before starting any nutrition or wellness program.</p>
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
