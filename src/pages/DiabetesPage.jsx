import { Link } from 'react-router-dom'
import { ArrowRight, ClipboardCheck, Moon, Utensils, Scale, BookOpen, Activity, Leaf } from 'lucide-react'
import PageHero from '../components/PageHero'
import { BookButton, Paragraphs, Chapter, Checklist, FaqChapter } from './ChildNutritionPage'
import source from '../data/moreCareSourceContent.json'
import meenuPhoto from '../assets/Faithfully Enhanced Portrait.png'
import './diabetes.css'

const document = source['diabetes-nutrition']
const s = document.sections
const icons = [ClipboardCheck, Moon, Utensils, Scale, BookOpen, Activity, Leaf]
const features = [
  ...Array.from({ length: 5 }, (_, i) => ({ title: s[3].lines[i * 2].text, description: s[3].lines[i * 2 + 1].text })),
  { title: s[3].lines[10].text.slice(0, 'Blood Sugar Management'.length), description: s[3].lines[10].text.slice('Blood Sugar Management'.length) },
  { title: s[3].lines[11].text, description: s[3].lines[12].text }
]

function DiabetesPlans() {
  return <Chapter title={s[2].title}>
    <div className="cn-plans">{s[1].items.map((plan, i) => <article className="cn-card cn-plan" key={plan.title}>
      <div className="dn-plan-header"><div className="cn-card-top"><span className="cn-number" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span><span className="cn-tag">{plan.lines[4].text}</span></div>
      <h3>{plan.title}</h3><p className="cn-price">{plan.lines[0].text}</p><span className="cn-visually-hidden">{plan.lines[1].text} {plan.lines[2].text}</span>
      <p>{plan.lines[3].text}</p></div><Checklist lines={plan.lines.slice(6)} /><BookButton text={plan.lines[5].text} />
    </article>)}</div>
    <aside className="cn-price-notes"><Paragraphs lines={s[0].lines.slice(3)} /></aside>
  </Chapter>
}

export default function DiabetesPage() {
  return <div className="cn-page dn-page" data-source-url={document.sourceUrl}>
    <PageHero title={document.title} parent={{ label: 'More Care', to: '/more-care' }} />
    <Chapter className="cn-intro-section"><div className="cn-intro"><div><h2>{s[0].title}</h2><Paragraphs lines={s[0].lines.slice(0, 2)} /><BookButton text={s[0].lines[2].text} /></div><img src="/images/more-care/diabetes-nutrition.webp" alt="Man checking his blood glucose at home" width="960" height="540" /></div></Chapter>
    <Chapter title={s[8].title} tinted>
      <p className="cn-section-lead">{s[8].lines[0].text}</p><div className="dn-condition-list"><Checklist lines={s[8].lines.slice(1, 9)} /></div>
      <div className="dn-reading-notes"><Paragraphs lines={s[8].lines.slice(9)} /></div>
      <div className="dn-broad-audience"><h3>{s[5].title}</h3><p>{s[5].lines[0].text}</p><Checklist lines={s[5].lines.slice(1, 5)} /></div>
    </Chapter>
    <Chapter title={s[3].title}>
      <div className="dn-feature-grid">{features.map((feature, i) => { const Icon = icons[i]; return <article className="cn-card" key={feature.title}><span className="cn-icon"><Icon size={24} strokeWidth={1.7} aria-hidden="true" /></span><h3>{feature.title}</h3><p>{feature.description}</p></article> })}</div>
      <div className="cn-consultation"><div><h3>{s[3].lines[13].text}</h3><p>{s[3].lines[14].text}</p><p className="cn-source-note">{s[4].title}</p></div><BookButton text={s[4].lines[0].text} /></div>
    </Chapter>
    <Chapter title={s[6].lines[2].text} tinted>
      <div className="cn-reading"><h3>{s[7].title}</h3><Paragraphs lines={s[7].lines.slice(0, 2)} /><div className="dn-included-list"><Checklist lines={s[7].lines.slice(2, 10)} /></div><Paragraphs lines={s[7].lines.slice(10)} /></div>
    </Chapter>
    <DiabetesPlans />
    <Chapter title={s[9].title} tinted>
      <div className="dn-approach-grid"><div><Paragraphs lines={s[9].lines.slice(0, 2)} /><Checklist lines={s[9].lines.slice(2, 7)} /><div className="dn-reading-notes"><Paragraphs lines={s[9].lines.slice(7)} /></div></div><div className="cn-card"><h3>{s[10].title}</h3><Paragraphs lines={s[10].lines.slice(0, 2)} /><p className="dn-process">{s[10].lines[2].text}</p><Paragraphs lines={s[10].lines.slice(3)} /></div></div>
    </Chapter>
    <Chapter title={s[11].title} className="dn-related-concerns">
      <div className="cn-reading"><Paragraphs lines={s[11].lines.slice(0, 2)} /><ul className="dn-condition-tags">{s[11].lines.slice(2, 8).map(line => <li key={line.text}>{line.text}</li>)}</ul><Paragraphs lines={s[11].lines.slice(8, 9)} /></div>
      <div className="dn-related-cards"><Link className="cn-card" to="/more-care/pcos"><h3>{s[11].lines[9].text}</h3><span>{s[11].lines[10].text}</span></Link><Link className="cn-card" to="/more-care/weight-loss"><h3>{s[11].lines[11].text}</h3><span>{s[11].lines[12].text}</span></Link></div>
      <p className="dn-related-note">{s[11].lines[13].text}</p>
    </Chapter>
    <Chapter title={s[12].title} tinted>
      <div className="cn-expert"><img src={meenuPhoto} alt="Meenu Balaji, clinical nutritionist" width="480" height="600" loading="lazy" /><div><h3>{s[5].lines[5].text}</h3><p>{s[5].lines[6].text}</p><p>{s[12].lines[0].text}</p><Checklist lines={s[12].lines.slice(1, 10)} /><div className="dn-reading-notes"><Paragraphs lines={s[12].lines.slice(10)} /></div></div></div>
      <div className="cn-consultation"><div><h3>{s[6].title}</h3><p>{s[6].lines[0].text}</p></div><BookButton text={s[6].lines[1].text} /></div>
    </Chapter>
    <FaqChapter document={document} prefix="dn" />
    <Chapter title="More Care" className="cn-related"><nav aria-label="Other nutrition services"><Link to="/more-care/child-teen-nutrition">Child & Teen Nutrition<ArrowRight size={16} aria-hidden="true" /></Link><Link to="/more-care/pcos">PCOS<ArrowRight size={16} aria-hidden="true" /></Link><Link to="/more-care/weight-loss">Weight Loss<ArrowRight size={16} aria-hidden="true" /></Link></nav></Chapter>
  </div>
}
