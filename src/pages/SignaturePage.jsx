import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Section from '../components/Section'
import { useSeo } from '../components/Seo'
import content from '../data/signatureContent.json'

const lines = content.lines
const applicationUrl = 'https://www.pragmaticnutritionist.com/signature-nutrition-program'

function ApplyLink() {
  return <a className="btn btn-primary" href={applicationUrl} target="_blank" rel="noopener noreferrer">Apply for the Signature Nutrition Program</a>
}

function TextLines({ start, end }) {
  return lines.slice(start, end).map((line, i) => <p className="placeholder-desc" key={start + i}>{line}</p>)
}

export default function SignaturePage() {
  useSeo('Signature Nutrition Program', 'Personalised nutrition and metabolic performance support for leaders.')
  const results = [[49, 52], [53, 56], [57, 61], [63, 65]]
  const inclusions = [[68, 72], [77, 80], [85, 91], [72, 77], [80, 85], [91, 97]]
  return <div className="programs-pricing-page">
    <PageHero title={lines[0]} blurb={lines[1]} />
    <Section width="wide" bg="base">
      <TextLines start={3} end={14} />
      <ApplyLink />
    </Section>
    <Section width="wide" bg="white">
      <div className="subtopics-grid">{[14, 17, 20].map(i => <article className="subtopic-card" key={i}><h3>{lines[i]}</h3><p>{lines[i + 2]}</p></article>)}</div>
      <TextLines start={23} end={25} />
    </Section>
    <Section width="wide" bg="white" title={lines[25]}>
      <div className="subtopics-grid">{[26, 28, 30].map(i => <article className="subtopic-card" key={i}><h3>{lines[i]}</h3><p>{lines[i + 1]}</p></article>)}</div>
    </Section>
    <Section width="wide" bg="base" title={lines[32]}>
      <ul>{lines.slice(33, 40).map(line => <li key={line}>{line}</li>)}</ul>
      <h3>{lines[40]}</h3><ul>{lines.slice(41, 46).map(line => <li key={line}>{line}</li>)}</ul>
      <p>{lines[46]}</p>
    </Section>
    <Section width="wide" bg="white" title={lines[48]}>
      <div className="care-testimonials">{results.map(([start, end]) => <figure className="gut-pillar-card care-quote" key={start}><h3>{lines[start]}</h3><blockquote>{lines.slice(start + 1, end).filter(line => line !== '★★★★★').join(' ')}</blockquote><figcaption>{lines[end]}</figcaption></figure>)}</div>
      <p>{lines[66]}</p>
    </Section>
    <Section width="wide" bg="base" title={lines[67]}>
      <div className="subtopics-grid">{inclusions.map(([start, end]) => <article className="subtopic-card" key={start}><h3>{lines[start]}</h3><TextLines start={start + 1} end={end} /></article>)}</div>
      <h3>{lines[97]}</h3><TextLines start={98} end={100} /><ApplyLink />
      <p>Applications are completed on the original Pragmatic Nutrition website. Intake is selective and is not an automatic booking.</p>
    </Section>
    <Section width="wide" bg="white" title={lines[110]}>
      {Array.from({ length: 9 }, (_, index) => 111 + index * 2).map(i => <details key={i} className="gut-pillar-card"><summary>{lines[i]}</summary><p>{lines[i + 1]}</p></details>)}
      <p>{lines[129]}</p><Link className="subtopic-action" to="/programs-pricing">View all programs</Link>
    </Section>
  </div>
}
