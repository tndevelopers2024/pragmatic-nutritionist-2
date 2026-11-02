import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Section from '../components/Section'
import { useSeo } from '../components/Seo'
import './academy.css'

const paths = [
  ['Courses & Masterclasses', 'Learn clinical dietetics from a practising nutritionist.', '/academy/courses-masterclasses'],
  ['Build Your Private Practice', 'Start, scale and manage your private nutrition practice.', '/academy/build-your-private-practice'],
  ['Certificate Courses', 'Online certificate courses for nutrition professionals.', '/academy/certificate-courses'],
  ['Masterclass Registration', 'Explore the private practice masterclass and registration details.', '/academy/masterclass-registration']
]

export default function AcademyOverviewPage() {
  useSeo('Academy', 'Training and certificate courses for nutritionists.')
  return <div className="academy-page">
    <PageHero title="Academy" blurb="Training and certificate courses for nutritionists." />
    <Section bg="white" title="Learn with Pragmatic Nutrition" width="wide">
      <div className="academy-copy"><p>Explore nutrition courses and masterclasses for everyday learning, alongside professional education and practical guidance for nutritionists building their practice.</p><p>Choose a learning path below to see course details and ask the team about current availability.</p></div>
    </Section>
    <Section bg="base" title="Explore the Academy" width="wide">
      <div className="academy-grid">{paths.map(([title, description, to]) => <article className="academy-card" key={to}><h3>{title}</h3><p>{description}</p><Link className="subtopic-action academy-link" to={to}>Explore details <ArrowRight size={15} aria-hidden="true" /></Link></article>)}</div>
    </Section>
    <Section bg="white" title="Questions about a course?" width="wide">
      <div className="academy-copy"><p>Contact the team for current course fees, availability and enrolment details.</p><p><Link className="btn btn-primary" to="/contact">Contact us <ArrowRight size={16} aria-hidden="true" /></Link></p></div>
    </Section>
  </div>
}
