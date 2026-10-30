import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Section from '../components/Section'
import { useSeo } from '../components/Seo'
import { useBook } from '../context/bookContext'
import { wa } from '../data/site'
import './academy.css'

export default function BookCallPage() {
  const openBook = useBook()
  useSeo('Book a Call', 'Book your free discovery call with Pragmatic Nutrition.')
  return <div className="academy-page">
    <PageHero title="Book a Call" blurb="Book your free discovery call." />
    <Section bg="white" title="Start with a conversation" lead="Discuss your personal health history and goals in a free 15-minute discovery call." width="wide">
      <div className="academy-copy">
        <p>Tell us what you would like help with, choose a preferred time and send your request on WhatsApp. The team will confirm your appointment with you.</p>
        <p><button type="button" className="btn btn-primary" onClick={openBook}>Request your free call <ArrowRight size={16} aria-hidden="true" /></button></p>
        <p>Prefer to get in touch directly? <a href={wa('Hi Meenu, I would like to request a free discovery call.')} target="_blank" rel="noreferrer">Chat on WhatsApp</a> or <Link to="/contact">contact us</Link>.</p>
      </div>
    </Section>
    <Section bg="base" title="What happens next" width="wide">
      <div className="academy-grid">
        <article className="academy-card"><span>01</span><h3>Share your goal</h3><p>Choose the health or performance goal you would like to discuss.</p></article>
        <article className="academy-card"><span>02</span><h3>Request a time</h3><p>Select a preferred time and send your details on WhatsApp. Suggested times are not live availability.</p></article>
        <article className="academy-card"><span>03</span><h3>Talk with the team</h3><p>Once your time is confirmed, discuss your needs and the next steps for personalised nutrition support.</p></article>
      </div>
    </Section>
    <Section bg="white" title="Personalised nutrition support" width="wide">
      <div className="academy-grid">
        <article className="academy-card"><h3>1-on-1 Consultation</h3><p>Detailed medical history, symptom analysis, and routine mapping.</p></article>
        <article className="academy-card"><h3>Personalized Meal Plan</h3><p>Adapted to your home kitchen, preferences, work schedules, and budget.</p></article>
        <article className="academy-card"><h3>Weekly WhatsApp Support</h3><p>Real-time adjustments, dining-out guidance, and continuous progress tracking.</p></article>
      </div>
    </Section>
  </div>
}
