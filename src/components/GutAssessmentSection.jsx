import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Sparkles,
  ArrowRight,
  Activity,
  HeartPulse,
  CheckCircle2,
  Clock,
  Wind,
  Flame,
  Brain
} from 'lucide-react'
import Section from './Section'

const SAMPLE_SYMPTOMS = [
  { id: 'bloating', name: 'Bloating & Fullness', defaultScore: 2, Icon: Wind },
  { id: 'acidity', name: 'Acidity, Heartburn & GERD', defaultScore: 1, Icon: Flame },
  { id: 'constipation', name: 'Constipation & Irregular Digestion', defaultScore: 2, Icon: Activity },
  { id: 'brain_fog', name: 'Post-Meal Brain Fog & Fatigue', defaultScore: 1, Icon: Brain }
]

const SEVERITY_LEVELS = ['Never', 'Sometimes', 'Often', 'Always']

export default function GutAssessmentSection() {
  const [selectedScores, setSelectedScores] = useState({
    bloating: 2,
    acidity: 1,
    constipation: 2,
    brain_fog: 1
  })

  const handleSelectSeverity = (id, scoreIdx) => {
    setSelectedScores((prev) => ({
      ...prev,
      [id]: scoreIdx
    }))
  }

  // Calculate live preview score from sample items
  const totalPoints = Object.values(selectedScores).reduce((a, b) => a + b, 0)
  const previewScore = Math.max(38, Math.round(100 - (totalPoints / (SAMPLE_SYMPTOMS.length * 3)) * 60))

  const scoreStatus =
    previewScore >= 80
      ? { label: 'Sample response summary', color: 'var(--color-primary)', bg: 'rgba(14, 98, 88, 0.1)', desc: 'This preview summarises sample answers and is not a clinical assessment.' }
      : previewScore >= 60
      ? { label: 'Sample response summary', color: 'var(--color-secondary)', bg: 'rgba(192, 113, 48, 0.1)', desc: 'This preview summarises sample answers and is not a clinical assessment.' }
      : { label: 'Sample response summary', color: '#b91c1c', bg: 'rgba(185, 28, 28, 0.1)', desc: 'This preview summarises sample answers and is not a clinical assessment.' }

  return (
    <Section id="gut-assessment" width="wide" bg="base" className="gut-assessment-section">
      <div className="section-divider-row" aria-hidden="true">
        <span className="divider-label">SELF ASSESSMENT.</span>
        <span className="divider-line" />
        <span className="divider-label">GUT HEALTH AUDIT.</span>
      </div>

      <div className="gut-assessment-grid">
        {/* Left Column: Editorial Information & Benefits */}
        <div className="gut-assessment-intro">
          <div className="section-eyebrow-pill">
            <Sparkles size={13} className="eyebrow-icon" aria-hidden="true" />
            <span>NOT SURE WHERE TO START?</span>
          </div>

          <h2 className="gut-assessment-heading">
            Take our Free 2-minute <em>Gut Health Checker</em>
          </h2>

          <p className="gut-assessment-lead">
            Get a clearer picture of areas worth exploring before booking a call.
          </p>

          <div className="gut-assessment-pillars">
            <div className="gut-pillar-item">
              <div className="gut-pillar-icon">
                <Activity size={18} />
              </div>
              <div className="gut-pillar-text">
                <strong>Nine symptom questions</strong>
                <p>Reflect on symptoms including bloating, reflux, constipation, fatigue and brain fog.</p>
              </div>
            </div>

            <div className="gut-pillar-item">
              <div className="gut-pillar-icon">
                <HeartPulse size={18} />
              </div>
              <div className="gut-pillar-text">
                <strong>Self-reported symptom summary</strong>
                <p>Review a simple summary of your responses; it is not a diagnosis.</p>
              </div>
            </div>

            <div className="gut-pillar-item">
              <div className="gut-pillar-icon">
                <CheckCircle2 size={18} />
              </div>
              <div className="gut-pillar-text">
                <strong>Plan your next step</strong>
                <p>Discuss your questions with a qualified healthcare professional.</p>
              </div>
            </div>
          </div>

          <div className="gut-assessment-actions">
            <Link to="/gut-health-checker" className="gut-primary-cta-btn">
              <span>Free Gut Assessment</span>
              <ArrowRight size={16} strokeWidth={2.25} aria-hidden="true" />
            </Link>
            <div className="gut-cta-meta">
              <Clock size={14} className="meta-icon" />
              <span>Free • Takes about 2 minutes</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Assessment Preview Widget */}
        <div className="gut-assessment-widget-wrap">
          <div className="gut-preview-card">
            <div className="preview-card-header">
              <div className="preview-header-left">
                <span className="preview-tag">INTERACTIVE PREVIEW</span>
                <h3 className="preview-card-title">Test Sample Symptoms</h3>
              </div>
              <div className="preview-score-badge" style={{ backgroundColor: scoreStatus.bg, color: scoreStatus.color }}>
                <span className="score-num">{previewScore}</span>
                <span className="score-denom">/100</span>
              </div>
            </div>

            <p className="preview-instruction">
              Select your typical frequency for these common digestive symptoms:
            </p>

            {/* Interactive Symptom Rows */}
            <div className="preview-symptoms-list">
              {SAMPLE_SYMPTOMS.map((sym) => {
                const currentVal = selectedScores[sym.id]
                const SymIcon = sym.Icon
                return (
                  <div key={sym.id} className="preview-symptom-row">
                    <div className="sym-row-header">
                      <span className="sym-icon" aria-hidden="true">
                        <SymIcon size={16} strokeWidth={2} />
                      </span>
                      <span className="sym-name">{sym.name}</span>
                    </div>
                    <div className="sym-severity-buttons" role="group" aria-label={`Frequency for ${sym.name}`}>
                      {SEVERITY_LEVELS.map((level, idx) => {
                        const isSelected = currentVal === idx
                        return (
                          <button
                            key={level}
                            type="button"
                            className={`sym-btn ${isSelected ? 'active' : ''}`}
                            onClick={() => handleSelectSeverity(sym.id, idx)}
                          >
                            {level}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Dynamic Status Preview Banner */}
            <div className="preview-result-banner" style={{ borderColor: scoreStatus.color }}>
              <div className="result-banner-top">
                <strong style={{ color: scoreStatus.color }}>{scoreStatus.label}</strong>
                <span className="result-indicator-dot" style={{ backgroundColor: scoreStatus.color }} />
              </div>
              <p className="result-banner-desc">{scoreStatus.desc}</p>
            </div>

            {/* Direct Launch CTA */}
            <Link to="/gut-health-checker" className="preview-launch-cta">
              <span>Complete Full 9-Question Assessment</span>
              <ArrowRight size={15} strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </div>
    </Section>
  )
}
