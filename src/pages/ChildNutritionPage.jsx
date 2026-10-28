import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Plus, CheckCircle2, Utensils, MessageCircle, ChefHat, HeartHandshake, CalendarClock, Sprout, ShieldCheck, BatteryLow } from 'lucide-react'
import PageHero from '../components/PageHero'
import { useBook } from '../context/bookContext'
import source from '../data/moreCareSourceContent.json'
import meenuPhoto from '../assets/Faithfully Enhanced Portrait.png'
import './childNutrition.css'

const child = source['child-teen-nutrition']
const adhd = source['adhd-nutrition']
const c = child.sections
const a = adhd.sections
const familyImage = '/images/more-care/family-nutrition-generated.jpg'
const athleteImage = '/images/more-care/youth-athlete-nutrition-generated.jpg'
const clean = text => text.replace(/[\p{Extended_Pictographic}\uFE0F\u200D]/gu, '').trim()

function BookButton({ text, secondary = false }) {
  const book = useBook()
  return <button type="button" className={`btn ${secondary ? 'cn-button-secondary' : 'btn-primary'}`} onClick={book}>{clean(text)}<ArrowRight size={16} aria-hidden="true" /></button>
}

function Paragraphs({ lines }) {
  return lines.map((line, index) => <p key={index}>{clean(typeof line === 'string' ? line : line.text)}</p>)
}

function Chapter({ title, eyebrow, children, tinted = false, id, className = '' }) {
  return <section id={id} className={`cn-section ${tinted ? 'cn-section-tint' : ''} ${className}`}><div className="cn-container">
    {(title || eyebrow) && <header className="cn-section-heading">{eyebrow && <p className="cn-eyebrow">{eyebrow}</p>}{title && <h2>{title}</h2>}</header>}
    {children}
  </div></section>
}

function FeatureGrid({ lines }) {
  const icons = [Utensils, MessageCircle, ChefHat, HeartHandshake, CalendarClock]
  return <div className="cn-feature-grid">{icons.map((Icon, i) => <article className="cn-card cn-feature" key={i}>
    <div className="cn-card-top"><span className="cn-icon"><Icon size={24} strokeWidth={1.7} aria-hidden="true" /></span><span className="cn-number" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span></div>
    <h3>{lines[i * 2].text}</h3><p>{lines[i * 2 + 1].text}</p>
  </article>)}</div>
}

function Checklist({ lines }) {
  return <ul className="cn-checklist">{lines.map((line, i) => <li key={i}><CheckCircle2 size={18} strokeWidth={1.8} aria-hidden="true" /><span>{clean(typeof line === 'string' ? line : line.text)}</span></li>)}</ul>
}

function ParentReviews() {
  const lines = c[2].lines
  return <Chapter title={c[2].title} eyebrow={c[1].lines[5].text} tinted>
    <div className="cn-rating"><strong>{lines[14].text}</strong><span>{lines[15].text}</span><span>{lines[16].text}</span></div>
    <div className="cn-review-grid">{[lines.slice(0, 7), lines.slice(7, 14), lines.slice(17, 24)].map((review, i) => <figure className="cn-card cn-review" key={i}>
      <span className="cn-stars">{review[0].text}</span><h3>{review[1].text}</h3><blockquote>{review[2].text}</blockquote>
      <figcaption><span className="cn-tag">{review[3].text}</span><div className="cn-person"><span className="cn-avatar">{review[4].text}</span><div><strong>{review[5].text}</strong><p>{review[6].text}</p></div></div></figcaption>
    </figure>)}</div>
    <div className="cn-inline-action"><p>{lines[24].text}</p><BookButton text={lines[25].text} /></div>
  </Chapter>
}

function Plans() {
  return <Chapter title={c[5].title}>
    <p className="cn-section-lead">{c[5].lines[0].text}</p>
    <div className="cn-plans">{c[4].items.map((plan, i) => <article className="cn-card cn-plan" key={plan.title}>
      <div className="cn-card-top"><span className="cn-number" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span><span className="cn-tag">{plan.lines[4].text}</span></div>
      <h3>{plan.title}</h3><p className="cn-price">{plan.lines[0].text}</p><span className="cn-visually-hidden">{plan.lines[1].text} {plan.lines[2].text}</span>
      <p>{plan.lines[3].text}</p><Checklist lines={plan.lines.slice(6)} /><BookButton text={plan.lines[5].text} />
    </article>)}</div>
    <aside className="cn-price-notes"><Paragraphs lines={c[5].lines.slice(1)} /></aside>
  </Chapter>
}

function FaqChapter({ document, prefix }) {
  const [open, setOpen] = useState(0)
  return <Chapter title="Frequently asked questions" tinted className="cn-faq-section">
    <div className="cn-faq-list">{document.faqs.map((item, i) => <article className={`cn-faq-item ${open === i ? 'is-open' : ''}`} key={item.question}>
      <h3><button type="button" className="faq-question-btn cn-faq-trigger" aria-expanded={open === i} aria-controls={`${prefix}-answer-${i}`} id={`${prefix}-question-${i}`} onClick={() => setOpen(open === i ? null : i)}><span className="cn-faq-number">{item.number}</span><span>{item.question}</span><Plus size={19} className="cn-faq-plus" aria-hidden="true" /></button></h3>
      <div className="cn-faq-answer" id={`${prefix}-answer-${i}`} role="region" aria-labelledby={`${prefix}-question-${i}`} hidden={open !== i}><Paragraphs lines={item.paragraphs} /></div>
    </article>)}</div>
    <div className="cn-contact-line"><h3>{document.tail[0]}</h3><BookButton text={document.tail[1]} secondary /></div>
    {document.tail.length > 2 && <div className="cn-price-notes"><Paragraphs lines={document.tail.slice(2)} /></div>}
  </Chapter>
}

function AdhdTopics() {
  const groups = []
  for (const line of a[1].lines.slice(2)) {
    if (line.heading) groups.push({ title: line.text, lines: [] })
    else groups[groups.length - 1].lines.push(line)
  }
  return <Chapter title={a[1].title}>
    <div className="cn-reading"><Paragraphs lines={a[1].lines.slice(0, 2)} /></div>
    <div className="cn-topic-list">{groups.map((group, index) => {
      const introLength = index === 1 ? 2 : 1
      const bulletEnd = index === 0 ? 5 : group.lines.length
      return <article className="cn-topic" key={group.title}><h3>{group.title}</h3><div><Paragraphs lines={group.lines.slice(0, introLength)} /><ul className="cn-bullet-list">{group.lines.slice(introLength, bulletEnd).map((line, i) => <li key={i}>{line.text}</li>)}</ul><Paragraphs lines={group.lines.slice(bulletEnd)} /></div></article>
    })}</div>
  </Chapter>
}

function AdhdReviews() {
  const lines = a[6].lines
  return <Chapter title={a[6].title} eyebrow={lines[0].text}>
    <div className="cn-review-grid">{[lines.slice(1, 4), lines.slice(4, 6), lines.slice(6, 8)].map((review, i) => <figure className="cn-card cn-review" key={i}><blockquote><Paragraphs lines={review.slice(1)} /></blockquote><figcaption><strong>{review[0].text}</strong></figcaption></figure>)}</div>
    <div className="cn-expert-note"><h3>{lines[8].text}</h3><p>{lines[9].text}</p></div>
    <div className="cn-inline-action"><h3>{a[7].title}</h3><BookButton text={a[7].lines[0].text} /></div>
  </Chapter>
}

export default function ChildNutritionPage() {
  const concernIcons = [Sprout, ShieldCheck, Utensils, BatteryLow]
  return <div className="cn-page">
    <div data-source-url={child.sourceUrl}>
      <PageHero title={child.title} parent={{ label: 'More Care', to: '/more-care' }} />
      <Chapter className="cn-intro-section">
        <div className="cn-intro"><div><p className="cn-eyebrow">{c[0].lines[2].text}</p><p className="cn-intro-copy">{c[0].lines[0].text}</p><BookButton text={c[0].lines[1].text} /></div><img src={familyImage} alt="Mother and child preparing a balanced Indian meal" width="1200" height="800" /></div>
      </Chapter>
      <Chapter tinted>
        <div className="cn-concerns"><header><h2>{c[1].title}</h2><p>{clean(c[1].lines[4].text)}</p></header><div className="cn-concern-grid">{c[1].lines.slice(0, 4).map((line, i) => { const Icon = concernIcons[i]; return <article className="cn-card" key={i}><span className="cn-icon"><Icon size={23} strokeWidth={1.7} aria-hidden="true" /></span><p>{clean(line.text)}</p></article> })}</div></div>
      </Chapter>
      <Chapter title={c[6].title}>
        <p className="cn-section-lead">{c[6].lines[0].text}</p><Checklist lines={c[6].lines.slice(1)} />
        <div className="cn-suitability"><h3>{c[7].title}</h3><p>{c[7].lines[0].text}</p><Checklist lines={c[7].lines.slice(1, 7)} /></div>
        <div className="cn-referrals">{[{ image: familyImage, alt: 'Family preparing a meal together', text: c[7].lines[7].text, to: '/more-care/adhd-nutrition' },{ image: athleteImage, alt: 'Young athlete eating a balanced meal beside a pool', text: c[7].lines[8].text, to: '/sports-nutrition/youth-teen-athletes' }].map((item, i) => <Link to={item.to} className="cn-referral" key={i}><img src={item.image} alt={item.alt} width="1200" height="800" loading="lazy" /><p>{item.text}</p><ArrowRight size={18} aria-hidden="true" /></Link>)}</div>
      </Chapter>
      <Chapter title={c[3].title} tinted><FeatureGrid lines={c[3].lines.slice(0, 10)} /><div className="cn-inline-action cn-inline-action-centered"><BookButton text={c[3].lines[10].text} secondary /></div></Chapter>
      <Plans />
      <ParentReviews />
      <Chapter title={c[8].lines[1].text} eyebrow={c[8].title}>
        <div className="cn-expert"><img src={meenuPhoto} alt="Meenu Balaji, child and adolescent nutritionist" width="480" height="600" loading="lazy" /><div><Paragraphs lines={c[8].lines.slice(2)} /><BookButton text={c[8].lines[0].text} /></div></div>
        <div className="cn-consultation"><div><h3>{c[9].title}</h3><p>{c[9].lines[0].text}</p></div><BookButton text={c[10].title} /></div>
      </Chapter>
      <FaqChapter document={child} prefix="cn-child" />
    </div>

    {/* Dedicated ADHD Program Spotlight */}
    <div id="adhd" className="cn-adhd-highlight-banner">
      <div className="cn-container">
        <div className="cn-adhd-banner-inner">
          <div className="cn-adhd-banner-text">
            <span className="cn-eyebrow">SPECIALIZED CARE</span>
            <h2>ADHD Nutrition for Children &amp; Adolescents</h2>
            <p>
              Looking for dedicated nutrition support for focus, mood, sensory eating, and appetite challenges related to ADHD? We provide root-cause, evidence-based nutrition strategies tailored to Indian family routines and school schedules.
            </p>
            <div className="cn-adhd-banner-actions">
              <Link to="/more-care/adhd-nutrition" className="btn btn-primary">
                View Complete ADHD Nutrition Program
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="cn-adhd-banner-visual">
            <img
              src="/images/more-care/adhd-nutrition.webp"
              alt="Child eating breakfast with cereal at kitchen table"
              width="480"
              height="320"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>

    <Chapter title="More Care" className="cn-related">
      <nav aria-label="Other nutrition services">
        <Link to="/more-care/adhd-nutrition">ADHD Nutrition<ArrowRight size={16} aria-hidden="true" /></Link>
        <Link to="/more-care/diabetes">Diabetes<ArrowRight size={16} aria-hidden="true" /></Link>
        <Link to="/more-care/pcos">PCOS<ArrowRight size={16} aria-hidden="true" /></Link>
        <Link to="/more-care/weight-loss">Weight Loss<ArrowRight size={16} aria-hidden="true" /></Link>
      </nav>
    </Chapter>
  </div>
}

export { BookButton, Paragraphs, Chapter, Checklist, FaqChapter }
