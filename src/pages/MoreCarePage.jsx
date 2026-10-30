import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import PageHero from '../components/PageHero'
import ChildNutritionPage from './ChildNutritionPage'
import AdhdNutritionPage from './AdhdNutritionPage'
import DiabetesPage from './DiabetesPage'
import PcosPage from './PcosPage'
import Section from '../components/Section'
import { useSeo } from '../components/Seo'
import { useBook } from '../context/bookContext'
import { RESULTS } from '../data/site'
import content from '../data/moreCareContent.json'
import meenuPhoto from '../assets/Faithfully Enhanced Portrait.png'
import './moreCare.css'

const routes = Object.entries(content)
const parent = { label: 'More Care', to: '/more-care' }
const careLabels = {
  'child-teen-nutrition': 'Growing Families',
  'adhd-nutrition': 'Neurodiversity & Focus',
  diabetes: 'Blood Sugar Support',
  pcos: 'Hormonal Health',
  'weight-loss': 'Sustainable Habits'
}
const careImages = {
  'child-teen-nutrition': { src: '/images/more-care/child-nutrition.webp', alt: 'Child eating breakfast with cereal, milk and an apple' },
  'adhd-nutrition': { src: '/images/more-care/adhd-nutrition.webp', alt: 'Child eating breakfast at the kitchen table' },
  diabetes: { src: '/images/more-care/diabetes-nutrition.webp', alt: 'Man checking his blood glucose at home' },
  pcos: { src: '/images/more-care/pcos-nutrition.webp', alt: 'Indian meals with rice, vegetables, dal and roti' },
  'weight-loss': { src: '/images/more-care/weight-management.webp', alt: 'Blue plate with tiles spelling weight loss' }
}

function withoutEmoji(text) {
  return text.replace(/[\p{Extended_Pictographic}\uFE0F\u200D]/gu, '').trim()
}

function BookingButton({ label = 'Book a Free Discovery Call' }) {
  const openBook = useBook()
  return <button type="button" className="btn btn-primary" onClick={openBook}>{withoutEmoji(label)}<ArrowRight size={16} aria-hidden="true" /></button>
}

function Copy({ paragraphs }) {
  return paragraphs.map((text, index) => {
    if (/^(Book|CONTACT US|Select)/i.test(text)) return null
    if (text.includes('Explore PCOS Nutrition Support')) return <p key={index}><Link to="/more-care/pcos" className="subtopic-action">Explore PCOS nutrition<ArrowRight size={14} aria-hidden="true" /></Link></p>
    if (text.includes('Explore Weight Management Nutrition')) return <p key={index}><Link to="/more-care/weight-loss" className="subtopic-action">Explore weight management<ArrowRight size={14} aria-hidden="true" /></Link></p>
    if (text.includes('dedicated ADHD nutrition program')) return <p className="placeholder-desc" key={index}>{text} <Link to="/more-care/adhd-nutrition" className="subtopic-action">Explore ADHD support<ArrowRight size={14} aria-hidden="true" /></Link></p>
    if (text.includes('dedicated sports nutrition program')) return <p className="placeholder-desc" key={index}>{text} <Link to="/sports-nutrition/youth-teen-athletes" className="subtopic-action">Explore young athlete support<ArrowRight size={14} aria-hidden="true" /></Link></p>
    return <p className="placeholder-desc" key={index}>{text}</p>
  })
}

function EditorialSection({ section }) {
  return <Section width="wide" bg="white" className="care-editorial">
    <div className="care-editorial-grid"><h2 className="placeholder-heading">{section.title}</h2><div><Copy paragraphs={section.paragraphs} />{section.features && <div className="care-feature-grid">{section.features.map(feature => <article className="gut-pillar-card" key={feature.title}><h3 className="subtopics-title">{feature.title}</h3><p className="placeholder-desc">{feature.description}</p></article>)}</div>}</div></div>
  </Section>
}

function Testimonials({ items }) {
  return <Section width="wide" bg="base" title="What people say about working with Meenu" eyebrow="CLIENT EXPERIENCES">
    <div className="care-testimonials">{items.map(item => <figure className="gut-pillar-card care-quote" key={item.name}>
      <blockquote>{item.quote}</blockquote><figcaption><strong>{item.name}</strong><span>{item.role}</span></figcaption>
    </figure>)}</div>
    <p className="care-note">Client experiences are self-reported. Individual results vary.</p>
  </Section>
}

export default function MoreCarePage({ slug }) {
  const page = content[slug]
  useSeo(page ? `${page.label} | Meenu Balaji` : 'More Care | Pragmatic Nutrition', page?.description || 'Personalised nutrition support for children, teens, diabetes, PCOS and weight management.')
  if (!page) return <div className="care-pages">
    <PageHero title="More Care" blurb="Nutrition support for specific health needs." />
    <Section width="wide" bg="base" className="care-overview-section">
      <div className="care-service-grid">{routes.map(([key, item], index) => (
        <Link className="gut-phase-card care-service" to={`/more-care/${key}`} key={key}>
          <div className="care-service-image"><img src={careImages[key].src} alt={careImages[key].alt} width="960" height="540" loading="lazy" decoding="async" /></div>
          <div className="phase-card-top care-service-top">
            <span className="phase-card-step" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <span className="phase-card-badge">{careLabels[key]}</span>
          </div>
          <h2 className="phase-card-heading">{item.label}</h2>
          <p className="phase-card-desc">{item.description}</p>
          <div className="phase-card-highlights care-service-action"><span className="subtopic-action">Explore care<ArrowRight size={16} aria-hidden="true" /></span></div>
        </Link>
      ))}</div>
    </Section>
  </div>

  if (slug === 'child-teen-nutrition') return <ChildNutritionPage />
  if (slug === 'adhd-nutrition' || slug === 'adhd') return <AdhdNutritionPage />
  if (slug === 'diabetes') return <DiabetesPage />
  if (slug === 'pcos') return <PcosPage />
  if (slug === 'weight-loss') return <PcosPage variant="weight-loss" />

  const testimonials = page.testimonials || RESULTS.filter(item => item.t === (page.resultCategory || 'Diabetes'))
  return <div className="care-pages">
    <PageHero title={page.label} blurb={page.description} parent={parent} />
    <Section width="wide" bg="white" className="care-intro">
      <div className="care-intro-grid"><div><span className="section-eyebrow">PRACTICAL, PERSONALISED NUTRITION</span><Copy paragraphs={page.intro} /><BookingButton />
        {slug === 'child-teen-nutrition' && <p className="care-jump"><Link to="/more-care/adhd-nutrition" className="subtopic-action">Looking for ADHD nutrition support?<ArrowRight size={16} aria-hidden="true" /></Link></p>}
      </div><figure className="care-portrait"><img src={meenuPhoto} alt="Meenu Balaji, founder and clinical nutritionist" /><figcaption>Meenu Balaji · M.H.Sc. Food Science & Nutrition<br /><Link to="/about">Meet your nutritionist</Link></figcaption></figure></div>
    </Section>
    <div className="care-flow">{page.sections.map(section => <EditorialSection key={section.title} section={section} />)}</div>
    <Testimonials items={testimonials} />
    <Section width="wide" bg="brand" title="Start with a conversation" lead="Discuss your goals, routines and health concerns with Meenu to find the right support."><BookingButton /><p className="care-note">Nutrition guidance complements your medical care. Consult your treating healthcare professional about changes to medication or treatment.</p></Section>
    <Section width="wide" bg="white" title="Explore more care"><nav aria-label="Other nutrition services" className="care-related">{routes.filter(([key]) => key !== slug).map(([key,item]) => <Link className="subtopic-action" key={key} to={`/more-care/${key}`}>{item.label}<ArrowRight size={16} aria-hidden="true" /></Link>)}</nav></Section>
  </div>
}
