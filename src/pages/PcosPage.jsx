import { Link } from 'react-router-dom'
import { ArrowRight, Quote } from 'lucide-react'
import PageHero from '../components/PageHero'
import { BookButton, Paragraphs, Chapter, Checklist } from './ChildNutritionPage'
import content from '../data/moreCareContent.json'
import { RESULTS } from '../data/site'
import meenuPhoto from '../assets/Faithfully Enhanced Portrait.png'
import './pcos.css'

export default function PcosPage({ variant = 'pcos' }) {
  const page = content[variant]
  const [approach, metabolic, expert] = page.sections
  const review = RESULTS.find(item => item.t === page.resultCategory)
  // The legacy source is diabetes-focused. Keep only the neutral first sentence.
  const approachIntroduction = approach.paragraphs[0].split('. ')[0] + '.'
  const heroImage = variant === 'weight-loss'
    ? { src: '/images/more-care/weight-management.webp', alt: 'Blue plate with tiles spelling weight loss' }
    : { src: '/images/more-care/pcos-nutrition.webp', alt: 'Indian meals with rice, vegetables, dal and roti' }
  return <div className="cn-page pn-page">
    <PageHero title={page.label} blurb={page.description} parent={{ label: 'More Care', to: '/more-care' }} />
    <Chapter className="cn-intro-section"><div className="cn-intro"><div><Paragraphs lines={page.intro} /><BookButton text="Book a Free Discovery Call" /></div><img src={heroImage.src} alt={heroImage.alt} width="960" height="540" /></div></Chapter>
    <Chapter title={approach.title} tinted className="pn-approach-section">
      <div className="pn-approach"><p>{approachIntroduction}</p><p>{approach.paragraphs[3]}</p></div>
      <div className="cn-card pn-process"><p>{approach.paragraphs[1]}</p><ol className="pn-step-list">{approach.paragraphs[2].split(' → ').map((step, i) => <li key={step}><span>{step}</span>{i < 4 && <span className="cn-visually-hidden" aria-hidden="true"> → </span>}</li>)}</ol></div>
    </Chapter>
    <Chapter title={metabolic.title}>
      <div className="pn-metabolic"><img className="pn-metabolic-image" src="/images/more-care/pcos-metabolic-health-generated.jpg" alt="Woman preparing a balanced Indian meal with dal, vegetables, rice and curd" width="1200" height="800" loading="lazy" /><div><p>{metabolic.paragraphs[0]}</p><div className="cn-card"><p>{metabolic.paragraphs[1]}</p><Checklist lines={metabolic.paragraphs.slice(2, 7)} /></div><p className="pn-metabolic-note">{metabolic.paragraphs[7]}</p></div></div>
    </Chapter>
    <Chapter title="What people say about working with Meenu" tinted>
      <figure className="pn-testimonial cn-card"><div><Quote className="pn-quote-icon" size={32} strokeWidth={1.5} aria-hidden="true" /><blockquote>{review.quote}</blockquote></div><figcaption><strong>{review.name}</strong><p>{review.role}</p></figcaption></figure>
    </Chapter>
    <Chapter title={expert.title}>
      <div className="cn-expert"><img src={meenuPhoto} alt="Meenu Balaji, founder and clinical nutritionist" width="480" height="600" loading="lazy" /><div><p>{expert.paragraphs[0]}</p><Checklist lines={expert.paragraphs.slice(1, 10)} /><div className="pn-expert-closing"><Paragraphs lines={expert.paragraphs.slice(10)} /><Link to="/about" className="pn-text-link">About Meenu<ArrowRight size={16} aria-hidden="true" /></Link></div></div></div>
    </Chapter>
    <Chapter tinted className="pn-closing-section"><div className="cn-consultation"><div><h2>Start with a conversation</h2><p>Discuss your goals, routines and health concerns with Meenu to find the right support.</p></div><BookButton text="Book a Free Discovery Call" /></div><p className="pn-care-note">Nutrition guidance complements your medical care. Consult your treating healthcare professional about changes to medication or treatment.</p></Chapter>
    <Chapter title="Explore more care" className="cn-related"><nav aria-label="Other nutrition services">{Object.entries(content).filter(([slug]) => slug !== variant).map(([slug, item]) => <Link key={slug} to={`/more-care/${slug}`}>{item.label}<ArrowRight size={16} aria-hidden="true" /></Link>)}</nav></Chapter>
  </div>
}
