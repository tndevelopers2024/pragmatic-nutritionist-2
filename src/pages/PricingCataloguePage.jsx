import { useState } from 'react'
import { ArrowRight, CheckCircle2, Search } from 'lucide-react'
import PageHero from '../components/PageHero'
import Section from '../components/Section'
import { useSeo } from '../components/Seo'
import plans from '../data/pricingCatalogue.json'
import './pricingCatalogue.css'

const originalCatalogue = 'https://www.pragmaticnutritionist.com/pricing-plans/list'

export function PricingCatalogueContent({ embedded = false }) {
  const [query, setQuery] = useState('')
  const normalizedQuery = query.trim().toLocaleLowerCase()
  const visiblePlans = plans.map((plan, index) => ({ plan, index })).filter(({ plan }) =>
    [plan.title, plan.description, plan.price, ...plan.features].join(' ').toLocaleLowerCase().includes(normalizedQuery)
  )
  const catalogue = <>
      <div className="pricing-catalogue-header">
        <div>
          <span className="pricing-catalogue-eyebrow">PERSONALISED SUPPORT</span>
          <h2>Find a plan for you</h2>
          <p className="pricing-catalogue-intro">Explore plans and their inclusions below. To purchase, select your plan on the Pragmatic Nutrition checkout page.</p>
        </div>
        <div className="pricing-catalogue-search">
          <label htmlFor={embedded ? 'embedded-plan-search' : 'plan-search'}>Search plans</label>
          <div className="pricing-catalogue-search-input">
            <Search size={18} aria-hidden="true" />
            <input id={embedded ? 'embedded-plan-search' : 'plan-search'} type="search" placeholder="Try gut health, diabetes or sports" value={query} onChange={event => setQuery(event.target.value)} />
          </div>
          <span className="pricing-catalogue-count" aria-live="polite">{visiblePlans.length} {visiblePlans.length === 1 ? 'plan' : 'plans'}</span>
        </div>
      </div>
      <div className="pricing-catalogue-grid">
        {visiblePlans.map(({ plan, index }) => <article className="pricing-catalogue-card" key={`${plan.title}-${index}`}>
          <span className="pricing-catalogue-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
          <h3>{plan.title}</h3>
          <p className="pricing-catalogue-description">{plan.description}</p>
          <div className="pricing-catalogue-price"><strong>{plan.price}</strong>{plan.recurrence && <span>{plan.recurrence}</span>}{plan.duration && <span>{plan.duration}</span>}</div>
          {plan.currencyNote && <p className="pricing-catalogue-note">This international plan is labelled USD, but its price is shown in ₹. Please confirm the currency before purchasing.</p>}
          {plan.features.length > 0 && <div className="pricing-catalogue-inclusions"><strong>What's included</strong><ul className="pricing-catalogue-features">{plan.features.map((feature, i) => <li key={i}><CheckCircle2 size={16} aria-hidden="true" /><span>{feature}</span></li>)}</ul></div>}
          <a className="btn btn-primary pricing-catalogue-action" href={originalCatalogue} target="_blank" rel="noopener noreferrer" aria-label={`Choose ${plan.title}${plan.currencyNote ? ` ${plan.description}` : ''} on the original website`}>Choose on original site<ArrowRight size={16} aria-hidden="true" /></a>
        </article>)}
      </div>
      {visiblePlans.length === 0 && <p className="pricing-catalogue-empty">No plans match “{query}”. Try another search.</p>}
    </>
  return <div className={`pricing-catalogue-page${embedded ? ' is-embedded' : ''}`}>
    {embedded ? catalogue : <Section width="wide" bg="base">{catalogue}</Section>}
  </div>
}

export default function PricingCataloguePage() {
  useSeo('Choose Your Pricing Plan', 'Explore nutrition plans for gut health, sports, diabetes, children and more.')
  return <>
    <PageHero title="Choose your pricing plan" blurb="Find a nutrition plan that works for you." />
    <PricingCatalogueContent />
  </>
}
