import { useState } from 'react'
import { Star } from 'lucide-react'
import PageHero from '../components/PageHero'
import { useSeo } from '../components/Seo'
import { Chapter, BookButton } from './ChildNutritionPage'
import content from '../data/resultsContent.json'
import sai from '../assets/Sai-ameya.avif'
import charita from '../assets/charita.avif'
import aahana from '../assets/aahana-singh4.avif'
import dhairya from '../assets/dhairya.avif'
import './resultsPage.css'

const photos = { sai, charita, aahana, dhairya }
const categories = ['All', ...new Set(content.testimonials.map(item => item.category))]

function Stars() {
  return <span className="rp-stars" aria-label="5 out of 5 stars">{Array.from({ length: 5 }, (_, i) => <Star key={i} size={14} fill="currentColor" strokeWidth={0} aria-hidden="true" />)}</span>
}

export default function ResultsPage() {
  const [category, setCategory] = useState('All')
  const items = content.testimonials.filter(item => category === 'All' || item.category === category)
  useSeo('Results', content.testimonialsTitle)
  return <div className="cn-page rp-page" data-source-url={content.sourceUrl}>
    <PageHero title="Results" />
    <Chapter title={content.testimonialsTitle} eyebrow={content.testimonialsEyebrow}>
      <div className="rp-rating"><strong>{content.rating}</strong><Stars /><span>{content.ratingLabel}</span></div>
      <div className="rp-filters" role="group" aria-label="Filter testimonials by nutrition service">{categories.map(label => <button type="button" key={label} aria-pressed={category === label} onClick={() => setCategory(label)}>{label}{' '}<span aria-hidden="true">{label === 'All' ? content.testimonials.length : content.testimonials.filter(item => item.category === label).length}</span></button>)}</div>
      <div className={`rp-stories ${category === 'All' ? 'rp-all-stories' : ''} ${items.length === 1 ? 'rp-single-story' : ''}`} role="region" aria-label="Client testimonials" aria-live="polite">{items.map((item, index) => <article className={`cn-card rp-story ${category === 'All' && index === 0 ? 'rp-story-featured' : ''}`} key={item.name}>
        <div className="rp-story-header"><span className="cn-tag">{item.category}</span><Stars /></div>
        <blockquote>{item.paragraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>)}</blockquote>
        <footer><span className="cn-avatar" aria-hidden="true">{item.initials}</span><div><h3>{item.name}</h3><p>{item.role}</p></div></footer>
      </article>)}</div>
      <p className="rp-disclaimer">{content.disclaimer}</p>
    </Chapter>
    <Chapter title={content.athletesTitle} tinted>
      <p className="cn-section-lead">{content.athletesIntro}</p>
      <div className="rp-athletes">{content.athletes.map(athlete => <article className="cn-card rp-athlete" key={athlete.name}>
        <div className="rp-athlete-photo"><img src={photos[athlete.image]} alt={athlete.name} width="600" height="800" loading="lazy" /></div>
        <div className="rp-athlete-copy"><span className="cn-tag">{athlete.sport}</span><h3>{athlete.name}</h3>{athlete.achievements.map(text => <p key={text}>{text}</p>)}</div>
      </article>)}</div>
      <div className="cn-consultation"><div><h3>{content.athleteCta[0]}</h3><p>{content.athleteCta[1]}</p></div><BookButton text={content.athleteCta[2]} /></div>
    </Chapter>
  </div>
}
