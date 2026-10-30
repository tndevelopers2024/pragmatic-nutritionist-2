import { ArrowRight, ShieldCheck, Sparkles, CheckCircle2, Trophy } from 'lucide-react'
import WhatsAppIcon from './WhatsAppIcon'
import { useBook } from '../context/bookContext'
import { wa } from '../data/site'
import meenuPortrait from '../assets/Faithfully Enhanced Portrait.png'

export default function Hero() {
  const openBook = useBook()

  return (
    <section className="hero-editorial-section" aria-label="Welcome to Pragmatic Nutrition by Meenu Balaji">
      <div className="hero-editorial-container">
        {/* Left Editorial Content Column */}
        <div className="hero-editorial-content">
          {/* Eyebrow badge */}
          <div className="hero-eyebrow-pill" aria-label="Clinical focus areas">
            <Sparkles size={14} className="eyebrow-icon" aria-hidden="true" />
            <span>CLINICAL NUTRITION • GUT HEALTH • SPORTS NUTRITION</span>
          </div>

          {/* Main Heading with selective emphasis on Gut Health and Sports Nutrition */}
          <h1 className="hero-editorial-h1">
            Meenu Balaji-Best Online Nutritionist in India for{' '}
            <span className="hero-accent-text">Gut Health</span> and{' '}
            <span className="hero-accent-text">Sports Nutrition</span>
          </h1>

          {/* Primary Supporting Statement */}
          <p className="hero-primary-lead">
            From Gut recovery to peak performance: personalised plans built on real clinical expertise
          </p>

          {/* Secondary Statement */}
          <p className="hero-secondary-desc">
            No generic charts, no extreme diets. A nutrition plan built around Indian food, your symptoms, and your goals.
          </p>

          {/* CTA Actions */}
          <div className="hero-cta-group">
            <button
              type="button"
              className="hero-primary-cta-btn"
              onClick={openBook}
              aria-label="Talk to A Nutritionist"
            >
              <span>Talk to A Nutritionist</span>
              <ArrowRight size={18} strokeWidth={2.25} aria-hidden="true" />
            </button>

            <a
              href={wa('Hi Meenu, I would like to consult with you about personalised gut health and sports nutrition.')}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-secondary-cta-btn"
              aria-label="Whatsapp Meenu"
            >
              <WhatsAppIcon size={18} />
              <span>Whatsapp Meenu</span>
            </a>
          </div>

          {/* Highlighted Award & Clinical Credentials Showcase */}
          <div className="hero-highlight-showcase" role="region" aria-label="Award recognition and clinical credentials">
            {/* Best Nutritionist & Dietitian Award 2026 Card */}
            <div className="hero-award-card">
              <div className="hero-award-trophy" aria-hidden="true">
                <Trophy size={22} strokeWidth={2.2} />
              </div>
              <div className="hero-award-details">
                <div className="hero-award-header">
                  <strong className="hero-award-title">BEST NUTRITIONIST &amp; DIETITIAN AWARD 2026</strong>
                  <span className="hero-award-badge">9TH EDITION REALISTIC AWARDS</span>
                </div>
                <p className="hero-award-desc">
                  Meenu Balaji was presented with the Best Nutritionist & Dietitian Award at the Realistic Awards 2026 in Chennai, alongside women achievers from various fields.
                </p>
                <a
                  href="https://republicnewsindia.com/9th-edition-realistic-awards-2026-an-evening-celebrating-the-power-and-grace-of-womanhood/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-award-link"
                >
                  <span>Read Feature on Republic News India</span>
                  <ArrowRight size={14} strokeWidth={2.4} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Editorial Portrait Presentation */}
        <div className="hero-editorial-visual">
          <div className="hero-portrait-card">
            {/* Subtle background ambient graphic frame */}
            <div className="portrait-backdrop-frame" aria-hidden="true" />
            
            {/* Meenu Balaji Portrait Frame */}
            <div className="portrait-image-wrapper">
              <img
                src={meenuPortrait}
                alt="Meenu Balaji, Clinical Nutritionist specialising in Gut Health and Sports Nutrition"
                className="portrait-main-img"
                loading="eager"
                fetchPriority="high"
              />
            </div>

            {/* Floating Editorial Practitioner Card */}
            <div className="portrait-floating-badge" aria-label="Founder credentials">
              <div className="floating-badge-icon" aria-hidden="true">
                <ShieldCheck size={18} />
              </div>
              <div className="floating-badge-text">
                <strong className="badge-name">Meenu Balaji, M.H.Sc</strong>
                <span className="badge-role">Founder • Clinical Nutritionist</span>
              </div>
            </div>

            {/* Subtle secondary clinical tag */}
            <div className="portrait-secondary-tag" aria-hidden="true">
              <CheckCircle2 size={13} className="tag-check" />
              <span>Root-Cause Indian Nutrition</span>
            </div>
          </div>
        </div>

        {/* Credentials strip: full-width row beneath both columns so nothing is cut at the fold */}
        <div className="hero-credentials-pills-grid" aria-label="Professional qualifications">
          <div className="hero-credential-pill">
            <CheckCircle2 size={16} strokeWidth={2.5} className="pill-check-icon" aria-hidden="true" />
            <span>Registered Clinical Nutritionist (14+ Years)</span>
          </div>
          <div className="hero-credential-pill">
            <CheckCircle2 size={16} strokeWidth={2.5} className="pill-check-icon" aria-hidden="true" />
            <span>M.H.Sc Food Science &amp; Nutrition</span>
          </div>
          <div className="hero-credential-pill">
            <CheckCircle2 size={16} strokeWidth={2.5} className="pill-check-icon" aria-hidden="true" />
            <span>ICAR JRF &amp; UGC NET JRF Qualified</span>
          </div>
          <div className="hero-credential-pill">
            <CheckCircle2 size={16} strokeWidth={2.5} className="pill-check-icon" aria-hidden="true" />
            <span>Peer Reviewer, European Journal of Nutrition</span>
          </div>
        </div>
      </div>
    </section>
  )
}
