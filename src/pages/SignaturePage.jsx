import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Section from '../components/Section'
import { useSeo } from '../components/Seo'
import content from '../data/signatureContent.json'
import './signatureContent.css'

const lines = content.lines
const applicationUrl = 'https://www.pragmaticnutritionist.com/signature-nutrition-program'

function ApplyLink() {
  return <a className="btn btn-primary" href={applicationUrl} target="_blank" rel="noopener noreferrer">Apply for the Signature Nutrition Program</a>
}

function TextLines({ start, end }) {
  return lines.slice(start, end).map((line, i) => <p className="placeholder-desc" key={start + i}>{line}</p>)
}

export function SignatureContent() {
  const results = [[49, 52], [53, 56], [57, 61], [63, 65]]
  const inclusions = [[68, 72], [77, 80], [85, 91], [72, 77], [80, 85], [91, 97]]
  return <div className="signature-content">
    <Section width="wide" bg="base" className="signature-intro-section">
      <div className="signature-intro-grid">
        <div className="signature-intro-lead">
          <p className="signature-intro-description">{lines[3]}</p>
          <p className="signature-intake">{lines[4]}</p>
          <ApplyLink />
          <p className="signature-credentials">{lines[5]}<br />{lines[6]}</p>
        </div>
        <div className="signature-intro-story"><TextLines start={7} end={14} /></div>
      </div>
    </Section>
    <Section width="wide" bg="white" className="signature-reflection-section">
      <div className="signature-card-grid signature-reflections">{[14, 17, 20].map((i, index) => <article className="signature-card" key={i}><span className="signature-card-number">0{index + 1}</span><h3>{lines[i]}</h3><p>{lines[i + 2]}</p></article>)}</div>
      <div className="signature-reflection-close"><TextLines start={23} end={25} /></div>
    </Section>
    <Section width="wide" bg="white" title={lines[25]} className="signature-outcomes-section">
      <div className="signature-card-grid signature-outcomes">{[26, 28, 30].map((i, index) => <article className="signature-card" key={i}><span className="signature-card-number">0{index + 1}</span><h3>{lines[i]}</h3><p>{lines[i + 1]}</p></article>)}</div>
    </Section>
    <Section width="wide" bg="base" title={lines[32]} className="signature-audience-section">
      <div className="signature-audience-grid">
        <div className="signature-audience-panel signature-audience-positive">
          <ul>{lines.slice(33, 40).map(line => <li key={line}><span className="signature-list-icon" aria-hidden="true">✓</span><span>{line}</span></li>)}</ul>
        </div>
        <div className="signature-audience-panel signature-audience-negative">
          <h3>{lines[40]}</h3>
          <ul>{lines.slice(41, 46).map(line => <li key={line}><span className="signature-list-icon" aria-hidden="true">−</span><span>{line}</span></li>)}</ul>
        </div>
      </div>
      <p className="signature-audience-note">{lines[46]}</p>
    </Section>
    <Section width="wide" bg="white" title={lines[48]} className="signature-results-section">
      <div className="signature-results-grid">{results.map(([start, end]) => <figure className="signature-result-card" key={start}><span className="signature-stars" aria-label="Five stars">★★★★★</span><h3>{lines[start]}</h3><blockquote>{lines.slice(start + 1, end).filter(line => line !== '★★★★★').join(' ')}</blockquote><figcaption>{lines[end]}</figcaption></figure>)}</div>
      <p className="signature-results-note">{lines[66]}</p>
    </Section>
    <Section width="wide" bg="base" title={lines[67]} className="signature-inclusions-section">
      <div className="signature-card-grid signature-inclusions">{inclusions.map(([start, end]) => <article className="signature-card" key={start}><h3>{lines[start]}</h3><TextLines start={start + 1} end={end} /></article>)}</div>
      <div className="signature-investment"><div><h3>{lines[97]}</h3><TextLines start={98} end={100} /></div><div className="signature-investment-action"><ApplyLink /><p>Applications are completed on the original Pragmatic Nutrition website. Intake is selective and is not an automatic booking.</p></div></div>
    </Section>
    <Section width="wide" bg="white" title={lines[110]} className="signature-faq-section">
      <div className="signature-faq-list">{Array.from({ length: 9 }, (_, index) => 111 + index * 2).map(i => <details key={i} className="signature-faq"><summary>{lines[i]}<span aria-hidden="true" /></summary><p>{lines[i + 1]}</p></details>)}</div>
      <p className="signature-faq-close">{lines[129]}</p><Link className="subtopic-action" to="/programs-pricing">View all programs</Link>
    </Section>
  </div>
}

export default function SignaturePage() {
  useSeo('Signature Nutrition Program', 'Personalised nutrition and metabolic performance support for leaders.')
  return <div className="programs-pricing-page">
    <PageHero title={lines[0]} blurb={lines[1]} />
    <SignatureContent />
  </div>
}
