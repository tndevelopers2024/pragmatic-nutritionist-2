import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Brain,
  HeartPulse,
  ShieldCheck,
  CheckCircle2,
  Plus,
  MessageCircle,
  Apple
} from 'lucide-react'
import PageHero from '../components/PageHero'
import { useSeo } from '../components/Seo'
import { useBook } from '../context/bookContext'
import source from '../data/moreCareSourceContent.json'
import meenuPhoto from '../assets/Faithfully Enhanced Portrait.png'
import './childNutrition.css'

const adhd = source['adhd-nutrition']
const a = adhd.sections
const adhdHeroImage = '/images/more-care/adhd-nutrition.webp'

const clean = (text) => text.replace(/[\p{Extended_Pictographic}\uFE0F\u200D]/gu, '').trim()

function BookButton({ text, secondary = false }) {
  const book = useBook()
  return (
    <button
      type="button"
      className={`btn ${secondary ? 'cn-button-secondary' : 'btn-primary'}`}
      onClick={book}
    >
      {clean(text)}
      <ArrowRight size={16} aria-hidden="true" />
    </button>
  )
}

function Paragraphs({ lines }) {
  return lines.map((line, index) => (
    <p key={index}>{clean(typeof line === 'string' ? line : line.text)}</p>
  ))
}

function Chapter({ title, eyebrow, children, tinted = false, id, className = '' }) {
  return (
    <section id={id} className={`cn-section ${tinted ? 'cn-section-tint' : ''} ${className}`}>
      <div className="cn-container">
        {(title || eyebrow) && (
          <header className="cn-section-heading">
            {eyebrow && <p className="cn-eyebrow">{eyebrow}</p>}
            {title && <h2>{title}</h2>}
          </header>
        )}
        {children}
      </div>
    </section>
  )
}

function Checklist({ lines }) {
  return (
    <ul className="cn-checklist">
      {lines.map((line, i) => (
        <li key={i}>
          <CheckCircle2 size={18} strokeWidth={1.8} aria-hidden="true" />
          <span>{clean(typeof line === 'string' ? line : line.text)}</span>
        </li>
      ))}
    </ul>
  )
}

export default function AdhdNutritionPage() {
  useSeo(
    'ADHD Nutritionist for Children | India & Online Support',
    'Personalised, evidence-based nutrition support for children and teens with ADHD. Balancing gut health, neurotransmitters, appetite, and school routines.'
  )

  const [openFaq, setOpenFaq] = useState(0)

  // Section 1: Groups breakdown (How Nutrition Influences ADHD, Gut Health, Common Challenges)
  const groups = []
  for (const line of a[1].lines.slice(2)) {
    if (line.heading) {
      groups.push({ title: line.text, lines: [] })
    } else {
      groups[groups.length - 1].lines.push(line)
    }
  }

  // Section 2: 5 Key Features of Our Diet Plan
  const featureIcons = [Brain, HeartPulse, Apple, ShieldCheck, MessageCircle]
  const featureList = [
    { title: a[2].lines[0].text, desc: a[2].lines[1].text },
    { title: a[2].lines[2].text, desc: a[2].lines[3].text },
    { title: a[2].lines[4].text, desc: a[2].lines[5].text },
    { title: a[2].lines[6].text, desc: a[2].lines[7].text },
    { title: a[2].lines[8].text, desc: a[2].lines[9].text }
  ]

  // Testimonials lines
  const reviewLines = a[6].lines

  return (
    <div className="cn-page adhd-dedicated-page" data-source-url={adhd.sourceUrl}>
      <PageHero
        title="ADHD Nutrition for Children"
        blurb="Personalised nutrition support for children and teens with ADHD, designed around adequate nutrition, eating patterns, appetite, growth, school routines and practical Indian food habits."
        parent={{ label: 'More Care', to: '/more-care' }}
      />

      {/* Hero Intro Section with Image */}
      <Chapter className="cn-intro-section">
        <div className="cn-intro">
          <div>
            <p className="cn-eyebrow">ROOT-CAUSE, EVIDENCE-BASED NUTRITION</p>
            <p className="cn-intro-copy">{a[0].lines[0].text}</p>
            <p className="placeholder-desc" style={{ marginBottom: '24px' }}>
              {a[0].lines[1].text}
            </p>
            <BookButton text={a[0].lines[2].text} />
          </div>
          <img
            src={adhdHeroImage}
            alt="Child eating breakfast with cereal and milk at the kitchen table"
            width="1200"
            height="800"
          />
        </div>
      </Chapter>

      {/* Understanding the Root Cause vs Restriction */}
      <Chapter tinted id="root-cause">
        <div className="cn-section-heading">
          <p className="cn-eyebrow">A ROOT-CAUSE PERSPECTIVE</p>
          <h2>{a[1].title}</h2>
        </div>
        <div className="cn-reading">
          <p className="placeholder-desc" style={{ fontSize: '1.05rem', lineHeight: '1.8' }}>
            {a[1].lines[0].text}
          </p>
          <p className="placeholder-desc" style={{ fontSize: '1.05rem', lineHeight: '1.8' }}>
            {a[1].lines[1].text}
          </p>
        </div>
      </Chapter>

      {/* 3 Biological Pillars: How Nutrition Influences ADHD, Gut-Brain Connection, Common Challenges */}
      <Chapter title="How Nutrition Supports Brain Health & Behaviour">
        <div className="cn-topic-list" style={{ marginTop: '0', borderTop: 'none' }}>
          {groups.map((group, index) => {
            const isGut = index === 1
            const isChallenges = index === 2

            return (
              <article className="cn-topic" key={group.title}>
                <div>
                  <span className="cn-eyebrow">
                    {index === 0 && 'BIOLOGICAL PATHWAYS'}
                    {index === 1 && 'GUT-BRAIN AXIS'}
                    {index === 2 && 'EVERYDAY CHALLENGES'}
                  </span>
                  <h3>{group.title}</h3>
                </div>

                <div>
                  {index === 0 && (
                    <>
                      <p>{group.lines[0].text}</p>
                      <ul className="cn-bullet-list">
                        {group.lines.slice(1, 5).map((line, i) => (
                          <li key={i}>
                            <strong>{line.text}</strong>
                          </li>
                        ))}
                      </ul>
                      <p style={{ marginTop: '16px', fontStyle: 'italic', color: 'var(--color-text-main)' }}>
                        {group.lines[5]?.text}
                      </p>
                      <p style={{ marginTop: '12px' }}>
                        <Link
                          to="/blog"
                          className="subtopic-action"
                        >
                          Explore our nutrition articles
                          <ArrowRight size={14} aria-hidden="true" />
                        </Link>
                      </p>
                    </>
                  )}

                  {isGut && (
                    <>
                      <p>{group.lines[0].text}</p>
                      <p style={{ marginTop: '8px' }}>{group.lines[1].text}</p>
                      <ul className="cn-bullet-list">
                        {group.lines.slice(2).map((line, i) => (
                          <li key={i}>
                            {line.text}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  {isChallenges && (
                    <>
                      <p>{group.lines[0].text}</p>
                      <ul className="cn-bullet-list">
                        {group.lines.slice(1).map((line, i) => (
                          <li key={i}>
                            {line.text}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </Chapter>

      {/* 5 Key Features of Our Diet Plan */}
      <Chapter title={a[2].title} eyebrow="PRACTICAL, PERSONALISED CARE" tinted>
        <div className="cn-feature-grid">
          {featureList.map((item, i) => {
            const Icon = featureIcons[i]
            return (
              <article className="cn-card cn-feature" key={i}>
                <div className="cn-card-top">
                  <span className="cn-icon">
                    <Icon size={24} strokeWidth={1.7} aria-hidden="true" />
                  </span>
                  <span className="cn-number" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </article>
            )
          })}
        </div>

        {/* Consultation Prompt */}
        <div className="cn-consultation cn-adhd-consultation" style={{ marginTop: '36px' }}>
          <div>
            <h3>{a[2].lines[10].text}</h3>
            <p>{a[2].lines[11].text}</p>
            <p className="cn-source-note">{a[3].title}</p>
          </div>
          <BookButton text={a[3].lines[0].text} />
        </div>
      </Chapter>

      {/* Why Choose Pragmatic Nutrition & Who Is This For */}
      <Chapter title="Why Choose Pragmatic Nutrition?">
        <div className="cn-principles">
          <div className="cn-card">
            <header className="cn-principle-header" style={{ marginBottom: '16px' }}>
              <span className="cn-eyebrow">CLINICAL PHILOSOPHY</span>
              <h3>{a[4].lines[0].text}</h3>
            </header>
            <Checklist lines={a[4].lines.slice(1)} />
          </div>

          <div className="cn-card">
            <header className="cn-principle-header" style={{ marginBottom: '16px' }}>
              <span className="cn-eyebrow">AUDIENCE &amp; FIT</span>
              <h3>{a[5].title}</h3>
              <p style={{ margin: '4px 0 16px', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                {a[5].lines[0].text}:
              </p>
            </header>
            <Checklist lines={a[5].lines.slice(1)} />
          </div>
        </div>
      </Chapter>

      {/* Testimonials */}
      <Chapter title={a[6].title} eyebrow={reviewLines[0].text} tinted>
        <div className="cn-review-grid">
          {/* Review 1: Suganya */}
          <figure className="cn-card cn-review">
            <span className="cn-stars">★★★★★</span>
            <blockquote style={{ margin: '12px 0 20px', flex: 1, fontStyle: 'normal' }}>
              <p>{reviewLines[2].text}</p>
              <p style={{ marginTop: '8px' }}>{reviewLines[3].text}</p>
            </blockquote>
            <figcaption style={{ paddingTop: '16px', borderTop: '1px solid var(--cn-border)' }}>
              <strong>{reviewLines[1].text}</strong>
            </figcaption>
          </figure>

          {/* Review 2: Parul */}
          <figure className="cn-card cn-review">
            <span className="cn-stars">★★★★★</span>
            <blockquote style={{ margin: '12px 0 20px', flex: 1, fontStyle: 'normal' }}>
              <p>{reviewLines[5].text}</p>
            </blockquote>
            <figcaption style={{ paddingTop: '16px', borderTop: '1px solid var(--cn-border)' }}>
              <strong>{reviewLines[4].text}</strong>
            </figcaption>
          </figure>

          {/* Review 3: Anonymous Parent */}
          <figure className="cn-card cn-review">
            <span className="cn-stars">★★★★★</span>
            <blockquote style={{ margin: '12px 0 20px', flex: 1, fontStyle: 'normal' }}>
              <p>{reviewLines[7].text}</p>
            </blockquote>
            <figcaption style={{ paddingTop: '16px', borderTop: '1px solid var(--cn-border)' }}>
              <strong>{reviewLines[6].text}</strong>
            </figcaption>
          </figure>
        </div>

        {/* Expert Profile & CTA */}
        <div className="cn-expert" style={{ marginTop: '48px' }}>
          <img
            src={meenuPhoto}
            alt="Meenu Balaji, child and adolescent ADHD nutritionist"
            width="480"
            height="600"
            loading="lazy"
          />
          <div>
            <span className="cn-eyebrow">CLINICAL PRACTITIONER</span>
            <h3 style={{ fontSize: '1.4rem', margin: '4px 0 16px' }}>{reviewLines[8].text}</h3>
            <p className="placeholder-desc" style={{ lineHeight: '1.8', marginBottom: '24px' }}>
              {reviewLines[9].text}
            </p>
            <div className="cn-inline-action" style={{ border: 0, padding: 0 }}>
              <div>
                <h4 style={{ margin: '0 0 6px', fontSize: '1.1rem' }}>{a[7].title}</h4>
                <p style={{ margin: '0 0 14px', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                  Take the first step toward calm mealtimes and sustainable nutrition for your child.
                </p>
              </div>
              <BookButton text={a[7].lines[0].text} />
            </div>
            {adhd.tail.length > 2 && (
              <div className="cn-price-notes">
                <Paragraphs lines={adhd.tail.slice(2)} />
              </div>
            )}
          </div>
        </div>
      </Chapter>

      {/* Frequently Asked Questions */}
      <Chapter title="Frequently asked questions" className="cn-faq-section">
        <div className="cn-faq-list">
          {adhd.faqs.map((item, i) => (
            <article
              className={`cn-faq-item ${openFaq === i ? 'is-open' : ''}`}
              key={item.question}
            >
              <h3>
                <button
                  type="button"
                  className="faq-question-btn cn-faq-trigger"
                  aria-expanded={openFaq === i}
                  aria-controls={`adhd-faq-answer-${i}`}
                  id={`adhd-faq-question-${i}`}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="cn-faq-number">{item.number}</span>
                  <span>{item.question}</span>
                  <Plus size={19} className="cn-faq-plus" aria-hidden="true" />
                </button>
              </h3>
              <div
                className="cn-faq-answer"
                id={`adhd-faq-answer-${i}`}
                role="region"
                aria-labelledby={`adhd-faq-question-${i}`}
                hidden={openFaq !== i}
              >
                <Paragraphs lines={item.paragraphs} />
              </div>
            </article>
          ))}
        </div>

        <div className="cn-contact-line">
          <h3>{adhd.tail[0]}</h3>
          <Link to="/contact" className="btn btn-secondary cn-button-secondary">
            {adhd.tail[1]}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

      </Chapter>

      {/* Related More Care Navigation */}
      <Chapter title="Explore More Nutrition Services" tinted className="cn-related">
        <nav aria-label="Other nutrition services">
          <Link to="/more-care/child-teen-nutrition">
            Child &amp; Teen Nutrition
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link to="/more-care/diabetes">
            Diabetes
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link to="/more-care/pcos">
            PCOS
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link to="/more-care/weight-loss">
            Weight Loss
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </nav>
      </Chapter>
    </div>
  )
}
