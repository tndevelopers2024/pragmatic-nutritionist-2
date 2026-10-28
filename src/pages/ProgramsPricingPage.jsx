import { Link } from 'react-router-dom'
import signatureImage from '../assets/signature-nutrition.jpg'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import PageHero from '../components/PageHero'
import Section from '../components/Section'
import { useBook } from '../context/bookContext'
import { useSeo } from '../components/Seo'
import content from '../data/programsPricing.json'
import './programsPricing.css'

const specialistPrograms = [
  { title: 'Gut Health', description: 'Explore gut health programs and pricing.', to: '/gut-health#pricing' },
  { title: 'Sports Nutrition', description: 'Compare Fuel & Focus, Competition Ready, and long-term performance plans.', to: '/sports-nutrition/competitive-athletes' },
  { title: 'Child & Teen Nutrition', description: 'Explore nutrition support for children and teenagers.', to: '/more-care/child-teen-nutrition' }
]

export default function ProgramsPricingPage() {
  const openBook = useBook()
  useSeo('Programs & Pricing', 'Compare nutrition plans, specialist care and the Signature Nutrition Program at Pragmatic Nutrition.')
  return (
    <div className="programs-pricing-page">
      <PageHero title="Programs & Pricing" blurb="Nutrition plans and the Signature Program." />
      <Section width="wide" bg="base" title="Choose your nutrition plan" lead="Healthy eating is about eating right not eating less.">
        <p className="placeholder-desc">Every meal you eat is an opportunity to nourish your body. Your eating habits can affect both your physical and mental health. Do you often feel that your energy levels are low or you have difficulty sleeping?</p>
        <p className="placeholder-desc">That is why finding the right balance of nutrients will help you transform your health and make you feel good about yourself.</p>
        <div className="gut-programs-grid pricing-plans-grid">
          {content.plans.map(plan => (
            <article className="gut-program-card" key={plan.title}>
              <h2 className="program-title">{plan.title}</h2>
              <p className="program-ideal-text">{plan.description}</p>
              <div className="program-price-box"><span className="price-currency">₹</span><span className="price-number">{plan.price}</span><span className="price-duration">{plan.duration}</span></div>
              <div className="program-features-list"><strong className="features-head">What is included:</strong><ul>{plan.features.map(feature => <li key={feature}><CheckCircle2 size={16} className="feature-check" aria-hidden="true" /><span>{feature}</span></li>)}</ul></div>
              <div className="program-action"><button className="program-select-btn" type="button" onClick={openBook}>Discuss this plan<ArrowRight size={16} aria-hidden="true" /></button></div>
            </article>
          ))}
        </div>
        <p>Choose your pricing plan and find one that works for you.</p>
        <a className="btn btn-secondary" href="https://pages.razorpay.com/stores/st_QifXYeHOUUdx9x" target="_blank" rel="noopener noreferrer">Join Now — visit payment page<ArrowRight size={16} aria-hidden="true" /></a>
      </Section>
      <Section width="wide" bg="white" eyebrow="SPECIALIST CARE" title="Find support for your goals">
        <div className="subtopics-grid">{specialistPrograms.map(program => <Link className="subtopic-card btn-no-underline" key={program.to} to={program.to}><h3 className="subtopic-name">{program.title}</h3><p className="subtopic-blurb">{program.description}</p><span className="subtopic-action">View programs<ArrowRight size={14} aria-hidden="true" /></span></Link>)}</div>
      </Section>
      <Section className="pricing-signature-section" width="wide" bg="base">
        <div className="pricing-signature-grid">
          <div>
            <div className="section-header">
              <span className="section-eyebrow">SELECTIVE INTAKE</span>
              <h2 className="section-title">Signature Nutrition Program</h2>
              <p className="lead">Exclusive Nutrition for Leaders Who Cannot Afford Suboptimal Performance.</p>
            </div>
            <p className="placeholder-desc">Nutrition and metabolic performance support for business leaders, where cognitive endurance and metabolic stability directly influence leadership performance. This program is structured, data-led, and designed for elite demands.</p>
            <p className="placeholder-desc">Engagements typically begin at ₹1.25 lakh for a 24-week period, depending on diagnostic depth and performance goals.</p>
            <p className="placeholder-desc">Three clients per quarter. Final pricing is discussed during the application process.</p>
            <Link className="btn btn-primary" to="/signature-nutrition-program">Explore the Signature Program<ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
          <img className="pricing-signature-image" src={signatureImage} alt="Professional enjoying a balanced meal at work" loading="lazy" />
          <div className="program-features-list pricing-signature-features"><strong className="features-head">Program inclusions</strong><ul>{['Personal blood work review', 'Body composition tracking', 'Gut microbiome testing or DNA nutrigenomics, clinically selected by Meenu', 'Two focused review consultations each month with Meenu', 'Monthly plan adaptation', 'Structured WhatsApp or email support between sessions'].map(feature => <li key={feature}><CheckCircle2 size={16} className="feature-check" aria-hidden="true" /><span>{feature}</span></li>)}</ul></div>
        </div>
      </Section>
      <Section width="wide" bg="white" title="Ready to take the first step?" lead="Schedule a free, no-obligation consultation with our nutrition expert and discover the right plan for you.">
        <button className="btn btn-primary" type="button" onClick={openBook}>Book a Free Health Assessment<ArrowRight size={16} aria-hidden="true" /></button>
      </Section>
    </div>
  )
}
