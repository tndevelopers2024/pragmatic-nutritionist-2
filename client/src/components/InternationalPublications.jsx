import { Globe2, CheckCircle2, Quote, Sparkles } from 'lucide-react'
import thriveLogo from '../assets/Thrive_Health___Nutrition_Logo.png'
import shefindsLogo from '../assets/SHEFINDS_logo_on_white_background.png'
import authorityLogo from '../assets/Authority_Magazine_seal_on_white.png'

const PUBLICATIONS = [
  {
    id: 'thrive',
    name: 'Thrive Magazine',
    logo: thriveLogo,
    logoClass: 'pub-logo-thrive',
    tag: 'UK & International Health',
    description:
      'Featured articles and expert commentary, UK-based and international health publications on supplements, gut health, and child nutrition, with a focus on practical application rather than trends.',
    bullets: [
      'Supplements and evidence-based use',
      'Gut health and digestive concerns',
      'Encouraging healthy eating behaviours in children'
    ]
  },
  {
    id: 'shefinds',
    name: 'She Finds',
    logo: shefindsLogo,
    logoClass: 'pub-logo-shefinds',
    tag: 'Global Lifestyle & Nutrition',
    description:
      'Expert nutrition insights shared for a broader international audience, focusing on realistic, sustainable dietary choices.',
    bullets: []
  },
  {
    id: 'authority',
    name: 'Authority Magazine',
    logo: authorityLogo,
    logoClass: 'pub-logo-authority',
    tag: 'Executive & Health Leadership',
    description:
      'Featured commentary on nutrition practice, behaviour change, and evidence-led health guidance for long-term outcomes.',
    bullets: []
  }
]

const TOPICS = [
  'Gut health and digestive symptoms',
  'Supplements and evidence-based use',
  'Child nutrition and feeding challenges',
  'Dietary behaviour change and sustainability',
  'Performance nutrition principles for athletes'
]

export default function InternationalPublications() {
  return (
    <section
      className="publications-section"
      id="international-publications"
      aria-label="UK and International Health Publications"
    >
      <div className="publications-container">
        {/* Section Header */}
        <div className="publications-header">
          <span className="publications-eyebrow">
            <Globe2 size={14} className="eyebrow-icon" />
            GLOBAL MEDIA & EDITORIAL
          </span>
          <h2 className="publications-title">
            UK and International Health Publications
          </h2>
          <p className="publications-subhead">
            Expert commentary, evidence-informed nutrition insights, and thought leadership across leading global publications.
          </p>
        </div>

        {/* 3 Featured Publications Grid */}
        <div className="publications-grid">
          {PUBLICATIONS.map((pub) => (
            <article key={pub.id} className="publication-card">
              <div className="pub-card-header">
                <div className="pub-logo-badge">
                  <img
                    src={pub.logo}
                    alt={`${pub.name} logo`}
                    className={`pub-logo-img ${pub.logoClass}`}
                    loading="lazy"
                  />
                </div>
                <span className="pub-category-tag">{pub.tag}</span>
              </div>

              <h3 className="pub-card-title">{pub.name}</h3>
              <p className="pub-card-description">{pub.description}</p>

              {pub.bullets.length > 0 && (
                <ul className="pub-bullet-list">
                  {pub.bullets.map((bullet, idx) => (
                    <li key={idx} className="pub-bullet-item">
                      <CheckCircle2 size={16} className="pub-check-icon" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>

        {/* Topics Commonly Covered Feature Panel */}
        <div className="topics-covered-panel">
          <div className="topics-panel-header">
            <span className="topics-eyebrow">
              <Sparkles size={14} className="topics-sparkle-icon" />
              EDITORIAL THEMES
            </span>
            <h3 className="topics-panel-title">Topics Commonly Covered</h3>
            <p className="topics-panel-intro">
              Across these publications, Meenu Balaji’s work has addressed:
            </p>
          </div>

          <div className="topics-pills-grid">
            {TOPICS.map((topic, idx) => (
              <div key={idx} className="topic-pill-item">
                <span className="topic-pill-marker" aria-hidden="true" />
                <span className="topic-pill-text">{topic}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Concluding Clinical Bridge Callout */}
        <div className="publications-conclusion-callout">
          <div className="conclusion-callout-icon" aria-hidden="true">
            <Quote size={24} />
          </div>
          <div className="conclusion-callout-content">
            <p className="conclusion-callout-text">
              These media contributions complement Meenu Balaji’s private clinical practice, work with children and families, and nutrition support for athletes competing at national and international levels. Her public-facing writing reflects the same evidence-first, outcome-focused approach used in her clinical work.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
