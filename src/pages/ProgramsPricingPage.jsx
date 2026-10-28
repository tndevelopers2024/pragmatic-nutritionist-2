import { Link } from 'react-router-dom'
import signatureImage from '../assets/signature-nutrition.jpg'
import { ArrowRight, CheckCircle2, ChevronDown } from 'lucide-react'
import PageHero from '../components/PageHero'
import Section from '../components/Section'
import { useBook } from '../context/bookContext'
import { useSeo } from '../components/Seo'
import content from '../data/programsPricing.json'
import { SignatureContent } from './SignaturePage'
import { PricingCatalogueContent } from './PricingCataloguePage'
import './programsPricing.css'

const specialistPrograms = [
  { title: 'Weight Loss', description: 'Achieve sustainable weight loss with a science-backed approach, focusing on balanced meals, personalized plans, and lasting results. Prioritizing your health ensures progress without restrictive diets. Transform your journey with practical, effective strategies!', to: '/more-care/weight-loss' },
  { title: 'Sports Nutrition', description: 'Fuel your performance with expert sports nutrition tailored to your goals. Optimize energy, recovery, and endurance with a science-backed approach. Achieve peak performance and lasting results!', to: '/sports-nutrition' },
  { title: 'PCOS/Hypothyroid', description: 'Achieve hormonal wellness with a personalized, science-backed approach that balances your hormones naturally. Enhance energy, mood, and overall health with targeted nutrition and sustainable habits. Regain harmony and thrive!', to: '/more-care/pcos' },
  { title: 'Weight Gain', description: 'Achieve healthy weight gain with a personalized, science-backed approach focusing on balanced nutrition and sustainable habits. Build strength, energy, and confidence with lasting results. Transform your journey today!' },
  { title: 'Gut Health', description: 'Restore your gut health with a science-backed approach that improves digestion, boosts immunity, and enhances overall well-being. We focus on balanced nutrition and personalized care for long-term results. Heal your gut naturally and thrive!', to: '/gut-health' },
  { title: 'Manage Diabetes', description: 'Manage lifestyle diseases with a science-backed approach focusing on balanced nutrition, sustainable habits, and personalized care. Improve your health, prevent complications, and achieve lasting well-being. Take control of your lifestyle today!', to: '/more-care/diabetes' },
  { title: 'Child Nutrition', description: "Support your child's growth and development with balanced, science-backed nutrition. Our personalized approach ensures they get the essential nutrients for a healthy, thriving future. Build strong foundations for lifelong well-being!", to: '/more-care/child-teen-nutrition' }
]

export default function ProgramsPricingPage() {
  const openBook = useBook()
  useSeo('Programs & Pricing', 'Compare nutrition plans, specialist care and the Signature Nutrition Program at Pragmatic Nutrition.')
  return (
    <div className="programs-pricing-page">
      <PageHero title="Programs & Pricing" blurb="Food is more than just calories." />
      <Section width="wide" bg="base" title="Nutrition packages" lead="Healthy eating is about eating right not eating less.">
        <div className="pricing-introduction"><p className="placeholder-desc">Every meal you eat is an opportunity to nourish your body. Your eating habits can affect both your physical and mental health. Do you often feel that your energy levels are low or you have difficulty sleeping?</p>
        <p className="placeholder-desc">That is why finding the right balance of nutrients will help you transform your health and make you feel good about yourself. How will our healthy nutrition plan help you?</p></div>
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
        <div className="pricing-payment-prompt"><p>Choose your pricing plan and find one that works for you.</p>
        <a className="btn btn-secondary" href="https://pages.razorpay.com/stores/st_QifXYeHOUUdx9x" target="_blank" rel="noopener noreferrer">Join Now — visit payment page<ArrowRight size={16} aria-hidden="true" /></a></div>
      </Section>
      <Section width="wide" bg="white" className="pricing-explore-section" title="Explore all nutrition plans" lead="Find the support that fits your goals and routine.">
        <details className="pricing-catalogue-disclosure">
          <summary><span><strong>View the full list of 31 plans</strong><span>Compare prices, durations and inclusions</span></span><ChevronDown size={22} aria-hidden="true" /></summary>
          <PricingCatalogueContent embedded />
        </details>
        <p className="pricing-catalogue-page-link"><Link to="/pricing-plans/list">Open the full pricing list <ArrowRight size={15} aria-hidden="true" /></Link></p>
      </Section>
      <Section width="wide" bg="white" eyebrow="SPECIALIST CARE" title="Services">
        <div className="subtopics-grid">{specialistPrograms.map(program => <article className="subtopic-card" key={program.title}><h3 className="subtopic-name">{program.title}</h3><p className="subtopic-blurb">{program.description}</p>{program.to && <Link className="subtopic-action" to={program.to}>{program.title === 'PCOS/Hypothyroid' ? 'Explore PCOS support' : 'View programs'}<ArrowRight size={14} aria-hidden="true" /></Link>}</article>)}</div>
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
      <div id="signature-program-details" aria-label="Signature Nutrition Program details">
        <SignatureContent />
      </div>
      <Section width="wide" bg="white" title="Ready to take the first step?" lead="Schedule a free, no-obligation consultation with our nutrition expert and discover the right plan for you.">
        <button className="btn btn-primary" type="button" onClick={openBook}>Book a Free Health Assessment<ArrowRight size={16} aria-hidden="true" /></button>
      </Section>
    </div>
  )
}
