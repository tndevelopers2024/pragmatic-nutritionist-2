import { Link } from 'react-router-dom'
import { Sprout, ArrowRight, CheckCircle2, Dumbbell, Utensils, Users, Award, Droplets, Clock, Pill, HeartPulse, Plane, Target } from 'lucide-react'
import PageHero from '../components/PageHero'
import Section from '../components/Section'
import CtaBand from '../components/CtaBand'
import Faq from '../components/Faq'
import { useSeo } from '../components/Seo'
import { useBook } from '../context/bookContext'
import { PAGES } from '../data/site'
import content from '../data/sportsNutritionContent.json'
import sportsPhoto from '../assets/sports-nutrotionist.avif'
import meenuPhoto from '../assets/Faithfully Enhanced Portrait.png'
import charitaPhoto from '../assets/charita.avif'
import dhairyaPhoto from '../assets/dhairya.avif'
import './sportsContentLayout.css'

// Use full-width sections with the existing typography and button styles.
function ContentSection({ title, children, icon, eyebrow, className = '' }) {
  return (
    <Section width="wide" bg="white" className={`sports-editorial-section ${className}`}>
      <div className="gut-section-header">
        <div className="placeholder-icon" aria-hidden="true">
          {icon || <Sprout size={32} strokeWidth={2} className="text-moss" />}
        </div>
        {eyebrow && <span className="subtopic-badge">{eyebrow}</span>}
        <h2 className="placeholder-heading">{title}</h2>
      </div>
      {children}
    </Section>
  )
}

function Paragraphs({ items }) {
  const openBook = useBook()
  return items.map(text => text.startsWith('🔗 Book') ? (
    <p key={text}>
      <button type="button" className="btn btn-primary" onClick={openBook}>
        {text}<ArrowRight size={14} aria-hidden="true" />
      </button>
    </p>
  ) : <p className="placeholder-desc" key={text}>{text}</p>)
}

function Features({ items, icons }) {
  return (
    <div className={icons ? 'gut-pillars-grid' : 'gut-who-grid'}>
      {items.map((item, index) => (
        <div className={`placeholder-feature ${icons ? 'gut-pillar-card' : 'gut-who-card'}`} key={item.title}>
          {!icons && <span className="subtopic-badge">{String(index + 1).padStart(2, '0')}</span>}
          {icons?.[index] && <div className="placeholder-icon" aria-hidden="true">{icons[index]}</div>}
          <strong>{item.title}</strong>
          {item.description && <span>{item.description}</span>}
          {item.paragraphs?.map(text => <span key={text}>{text}</span>)}
        </div>
      ))}
    </div>
  )
}

function OverviewContent({ page }) {
  const openBook = useBook()
  return (
    <>
      <Section width="wide" bg="white" className="sports-editorial-section">
        <div className="sports-content-intro-grid">
          <div>
            <div className="placeholder-icon" aria-hidden="true"><Dumbbell size={32} strokeWidth={2} /></div>
            <span className="subtopic-badge">{page.eyebrow}</span>
            <h2 className="placeholder-heading">{page.title}</h2>
            <Paragraphs items={page.intro} />
            <button type="button" className="btn btn-primary" onClick={openBook}>{content.shared.heroCta}<ArrowRight size={14} aria-hidden="true" /></button>
          </div>
          <figure className="sports-content-visual">
            <img src={sportsPhoto} alt="Swimmer training for athletic performance" loading="lazy" />
          </figure>
        </div>
      </Section>
      <ContentSection title={page.features.title} icon={<Utensils size={32} strokeWidth={2} />}>
        <p className="placeholder-desc">{page.features.subtitle}</p>
        <Features items={page.features.items} icons={[
          <Dumbbell size={24} key="macros" />, <Droplets size={24} key="hydration" />,
          <Target size={24} key="composition" />, <Utensils size={24} key="food" />,
          <Clock size={24} key="timing" />, <Pill size={24} key="supplements" />,
          <HeartPulse size={24} key="recovery" />, <Plane size={24} key="travel" />
        ]} />
      </ContentSection>
      <ContentSection title={page.audience.title} icon={<Users size={32} strokeWidth={2} />}>
        <p className="placeholder-desc">{page.audience.intro}</p>
        <Features items={page.audience.items} />
      </ContentSection>
      <Section width="wide" bg="base" className="sports-editorial-section">
        <div className="sports-content-expert-grid">
          <figure className="sports-content-visual sports-content-portrait"><img src={meenuPhoto} alt="Meenu Balaji, sports nutritionist" loading="lazy" /></figure>
          <div>
            <div className="placeholder-icon" aria-hidden="true"><Award size={32} strokeWidth={2} /></div>
            <h2 className="placeholder-heading">{page.about.title}</h2>
            <Paragraphs items={page.about.paragraphs} />
            <Link to="/about" className="subtopic-action">About Meenu<ArrowRight size={14} aria-hidden="true" /></Link>
          </div>
        </div>
      </Section>
    </>
  )
}

function YouthContent({ page }) {
  return (
    <>
      <ContentSection title={page.recognition.title} icon={<Award size={32} strokeWidth={2} />}>
        <div className="sports-youth-intro"><Paragraphs items={page.intro} /></div>
        <div className="sports-youth-athletes">
          {page.recognition.athletes.map(athlete => (
            <article className="gut-pillar-card sports-youth-athlete" key={athlete.name}>
              <img src={athlete.image === 'charita' ? charitaPhoto : dhairyaPhoto} alt={athlete.name} loading="lazy" />
              <div className="placeholder-feature"><strong>{athlete.name}</strong>{athlete.achievements.map(text => <span key={text}>{text}</span>)}</div>
            </article>
          ))}
        </div>
      </ContentSection>
      <ContentSection title={page.testimonials.title} icon={<Users size={32} strokeWidth={2} />}>
        <div className="sports-youth-testimonials">{page.testimonials.items.map(item => (
          <article className="gut-fail-card" key={item.name}>
            <div className="sports-testimonial-copy">
            <span className="subtopic-badge">{item.sport}</span>
            <h3 className="subtopics-title">{item.title}</h3>
            <Paragraphs items={item.paragraphs} />
            <div className="sports-youth-testimonial-person"><div className="placeholder-icon" aria-hidden="true">{item.initial}</div><p className="placeholder-desc"><strong>{item.name}</strong><br />{item.role}</p></div>
            </div>
          </article>
        ))}</div>
      </ContentSection>
      <ContentSection title={page.results.title} icon={<Target size={32} strokeWidth={2} />} className="sports-youth-results"><Features items={page.results.items} /></ContentSection>
      <Section width="wide" bg="white" className="sports-editorial-section sports-youth-pricing">
        <div className="sports-youth-pricing-row"><div><h2 className="placeholder-heading">{content.pages.competitive.pricing.intro}</h2><p className="placeholder-desc">{content.pages.competitive.pricing.notes[0]}</p></div><Link className="subtopic-action" to="/sports-nutrition/competitive-athletes">View programs & pricing<ArrowRight size={14} aria-hidden="true" /></Link></div>
      </Section>
    </>
  )
}

function CompetitiveContent({ page }) {
  const openBook = useBook()
  return (
    <>
      <ContentSection title={page.title}>
        <h3 className="subtopics-title">{page.concerns.title}</h3>
        <Paragraphs items={page.concerns.items} />
      </ContentSection>
      <ContentSection title={page.results.title}><Features items={page.results.items} /></ContentSection>
      <ContentSection title={page.pricing.title}>
        <p className="placeholder-desc">{page.pricing.intro}</p>
        <div className="gut-programs-grid sports-program-pattern">
          {page.pricing.programs.map(program => (
            <article className="gut-program-card" key={program.id}>
              <h3 className="placeholder-heading">{program.title}</h3>
              <div className="program-price-box"><p className="placeholder-desc"><strong>{program.price}</strong><br />{program.duration}</p></div>
              <Paragraphs items={program.paragraphs} />
              <div className="program-features-list"><ul>{program.features.map(feature => <li className="placeholder-feature" key={feature}><CheckCircle2 size={16} className="feature-check" aria-hidden="true" /><strong>{feature}</strong></li>)}</ul></div>
              <div className="program-action"><button type="button" className="btn btn-primary" onClick={openBook} aria-label={`${page.pricing.selectLabel} ${program.title}`}>{page.pricing.selectLabel}<ArrowRight size={14} aria-hidden="true" /></button></div>
            </article>
          ))}
        </div>
        <div className="gut-pricing-footnote"><Paragraphs items={page.pricing.notes} /></div>
      </ContentSection>
    </>
  )
}

export default function SportsNutritionPage({ variant = 'overview' }) {
  const page = content.pages[variant]
  const route = PAGES.find(item => item.to === page.path)
  useSeo(page.title, page.description)

  return (
    <div className={`sports-content-pages sports-content-${variant}`}>
      <PageHero title={route.label} blurb={route.blurb} parent={route.parent} />
      <div className="sports-content-flow">
        {variant === 'overview' ? <OverviewContent page={page} /> : variant === 'youth' ? <YouthContent page={page} /> : <CompetitiveContent page={page} />}
      </div>
      <Faq
        items={page.faqs.map(item => [item.question, <Paragraphs items={item.paragraphs} key={item.question} />])}
        heading={content.shared.faqTitle}
        headingHighlight=""
        description=""
        idPrefix={`sports-${variant}`}
      />
      <CtaBand title={content.shared.cta.title} text={content.shared.cta.description} primaryCtaText={content.shared.cta.button} />
    </div>
  )
}
