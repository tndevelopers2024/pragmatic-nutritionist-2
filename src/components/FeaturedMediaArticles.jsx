import { useState } from 'react'
import {
  Newspaper,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  BookOpen,
  Apple,
  HeartPulse,
  Activity,
  Baby,
  Pill,
  Leaf
} from 'lucide-react'
import indianExpressLogo from '../assets/The_Indian_Express_logo_isolated.png'

const MEDIA_ARTICLES = [
  {
    id: 1,
    title: 'Indian Express - Diet',
    outlet: 'The Indian Express',
    category: 'The Indian Express',
    topicTag: 'Diet Guidance',
    icon: Apple,
    theme: 'teal',
    summary:
      'Quoted on evidence-based daily meal structuring, balanced nutrition choices, and navigating dietary patterns in Indian households.'
  },
  {
    id: 2,
    title: 'Indian express Articles',
    outlet: 'The Indian Express',
    category: 'The Indian Express',
    topicTag: 'Indian Contexts',
    icon: Leaf,
    theme: 'mint',
    summary:
      'Expert advice on integrating regional Indian whole foods, plant diversity, and traditional pulses for optimal metabolic health.'
  },
  {
    id: 3,
    title: 'Indian express - Pre and Post Fasting',
    outlet: 'The Indian Express',
    category: 'The Indian Express',
    topicTag: 'Fasting Practices',
    icon: Activity,
    theme: 'amber',
    summary:
      'Practical dietary strategies to maintain blood sugar stability, sustain energy, and safely break fasting periods without digestive discomfort.'
  },
  {
    id: 4,
    title: 'She finds',
    outlet: 'She Finds',
    category: 'She Finds',
    topicTag: 'Sustainable Choices',
    icon: Sparkles,
    theme: 'amber',
    summary:
      'Expert nutrition insights shared for an international audience, focusing on realistic, sustainable dietary choices and heart-healthy fats.'
  },
  {
    id: 5,
    title: 'Supplements - Thrive Magazine',
    outlet: 'Thrive Magazine',
    category: 'Thrive Magazine',
    topicTag: 'Supplements',
    icon: Pill,
    theme: 'teal',
    summary:
      'Clinical perspectives on choosing bioavailable, tested micronutrient supplements and avoiding unscientific marketing trends.'
  },
  {
    id: 6,
    title: 'Leaky Gut - Thrive Magazine',
    outlet: 'Thrive Magazine',
    category: 'Thrive Magazine',
    topicTag: 'Gut Health',
    icon: HeartPulse,
    theme: 'mint',
    summary:
      'In-depth review addressing intestinal permeability, common digestive triggers, bloating, and food-first gut mucosal recovery protocols.'
  },
  {
    id: 7,
    title: 'Encourage your kids to eat well - Thrive Magazine',
    outlet: 'Thrive Magazine',
    category: 'Thrive Magazine',
    topicTag: 'Child Nutrition',
    icon: Baby,
    theme: 'amber',
    summary:
      'Actionable strategies for parents to foster joyful, pressure-free eating habits, balanced growth, and long-term food positivity in children.'
  },
  {
    id: 8,
    title: 'Thrive Magazine',
    outlet: 'Thrive Magazine',
    category: 'Thrive Magazine',
    topicTag: 'UK Health Editorial',
    icon: BookOpen,
    theme: 'mint',
    summary:
      'Featured articles and clinical commentary in UK-based health journalism, focusing on practical nutritional application rather than trends.'
  },
  {
    id: 9,
    title: 'Authority Magazine',
    outlet: 'Authority Magazine',
    category: 'Authority Magazine',
    topicTag: 'Leadership & Habits',
    icon: Newspaper,
    theme: 'teal',
    summary:
      'Featured executive commentary on nutrition practice, long-term habit modification, and evidence-led health guidance.',
    url: 'https://medium.com/authority-magazine/meenu-balaji-of-pragmatic-nutrition-on-nutrition-for-optimal-well-being-6aea0fc964f8'
  },
  {
    id: 10,
    title: 'Fussy eating',
    outlet: 'Thrive Global',
    category: 'Thrive Magazine',
    topicTag: 'Feeding Challenges',
    icon: Baby,
    theme: 'amber',
    summary:
      'Practical behavioral framework addressing fussy eating patterns, sensory sensitivities, and building nutrient-rich family meals.'
  },
  {
    id: 11,
    title: 'Leaky gut',
    outlet: 'Health Magazine',
    category: 'Health Magazine',
    topicTag: 'Gut Health',
    icon: HeartPulse,
    theme: 'mint',
    summary:
      'Feature article on why leaky gut syndrome is on the rise and how modern dietary habits and stress impact gut microbiome resilience.'
  },
  {
    id: 12,
    title: 'Supplements',
    outlet: 'Health Magazine',
    category: 'Health Magazine',
    topicTag: 'Micronutrients',
    icon: Pill,
    theme: 'teal',
    summary:
      'Evidence-first guide on nutrient deficiencies, bioavailability, and identifying when targeted supplementation is clinically warranted.'
  },
  {
    id: 13,
    title: 'Power of Seeds',
    outlet: 'Health Magazine',
    category: 'Health Magazine',
    topicTag: 'Digestive Wellness',
    icon: Leaf,
    theme: 'mint',
    summary:
      'How everyday seeds like chia, flax, and pumpkin support digestive regularity, plant-based omega-3s, and sustained metabolic balance.'
  }
]

const FILTER_CATEGORIES = [
  'All Articles (13)',
  'The Indian Express',
  'Thrive Magazine',
  'She Finds',
  'Authority Magazine',
  'Health Magazine'
]

export default function FeaturedMediaArticles() {
  const [activeFilter, setActiveFilter] = useState('All Articles (13)')

  const filteredArticles =
    activeFilter === 'All Articles (13)'
      ? MEDIA_ARTICLES
      : MEDIA_ARTICLES.filter((item) => item.category === activeFilter)

  return (
    <section
      className="media-articles-section"
      id="featured-media-articles"
      aria-label="Featured Media Articles in Health Magazine"
    >
      <div className="media-articles-container">
        
        {/* Main Section Header */}
        <div className="media-articles-header">
          <span className="media-articles-eyebrow">
            <Newspaper size={14} className="media-eyebrow-icon" />
            JOURNALISM & EXPERT COMMENTARY
          </span>
          <h2 className="media-articles-title">
            Featured Media Articles in Health Magazine
          </h2>
          <p className="media-articles-lead">
            Meenu Balaji’s nutrition insights have been featured in open-access health journalism across India, the UK, and international platforms. She has been quoted on evidence-based nutrition guidance in The Indian Express, contributed expert articles in Thrive Global and Authority Magazine, and shared practical nutrition perspectives in other international health publications.
          </p>
        </div>

        {/* Spotlight Card: Indian National Media — Indian Express */}
        <div className="indian-media-spotlight-card">
          <div className="spotlight-header-row">
            <div className="spotlight-brand-wrap">
              <img
                src={indianExpressLogo}
                alt="The Indian Express"
                className="spotlight-logo-img"
                loading="lazy"
              />
            </div>
            <div className="spotlight-title-group">
              <span className="spotlight-badge">INDIAN NATIONAL MEDIA</span>
              <h3 className="spotlight-title">Indian Express</h3>
            </div>
          </div>

          <p className="spotlight-description">
            Meenu Balaji has been quoted multiple times in a leading Indian national newspaper, addressing topics such as dietary patterns, fasting practices, and practical nutrition strategies rooted in scientific evidence.
          </p>

          <div className="spotlight-bullets-wrap">
            <span className="spotlight-bullets-label">Core Topics Covered:</span>
            <div className="spotlight-bullets-grid">
              <div className="spotlight-bullet-item">
                <CheckCircle2 size={18} className="bullet-check-icon" />
                <span>Diet and nutrition guidance</span>
              </div>
              <div className="spotlight-bullet-item">
                <CheckCircle2 size={18} className="bullet-check-icon" />
                <span>Pre- and post-fasting nutrition</span>
              </div>
              <div className="spotlight-bullet-item">
                <CheckCircle2 size={18} className="bullet-check-icon" />
                <span>Evidence-based food choices in Indian contexts</span>
              </div>
            </div>
          </div>
        </div>

        {/* Media Articles Gallery & Filter */}
        <div className="media-gallery-wrap">
          <div className="gallery-header-row">
            <div className="gallery-title-box">
              <h3 className="gallery-section-title">Published Articles & Media Mentions</h3>
              <p className="gallery-section-blurb">
                Explore 13 featured articles across national news, international magazines, and peer publications.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="media-filter-bar" role="tablist" aria-label="Filter media articles">
              {FILTER_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={activeFilter === cat}
                  className={`media-filter-pill ${activeFilter === cat ? 'is-active' : ''}`}
                  onClick={() => setActiveFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* 13-Card Media Grid */}
          <div className="media-cards-grid">
            {filteredArticles.map((article) => {
              const Icon = article.icon
              return (
                <article
                  key={article.id}
                  className={`media-article-card media-card-theme-${article.theme}`}
                >
                  <div className="media-card-top">
                    <span className="media-outlet-badge">{article.outlet}</span>
                    <span className="media-topic-tag">{article.topicTag}</span>
                  </div>

                  <div className="media-card-icon-title-row">
                    <div className={`media-card-icon-wrap icon-theme-${article.theme}`} aria-hidden="true">
                      <Icon size={20} />
                    </div>
                    <h4 className="media-card-heading">{article.title}</h4>
                  </div>


                  <div className="media-card-footer">
                    {article.url ? (
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="media-read-badge media-read-link"
                      >
                        <span>Read Publication</span>
                        <ExternalLink size={12} strokeWidth={2.2} />
                      </a>
                    ) : (
                      <span className="media-read-badge">
                        <span>Expert Commentary</span>
                      </span>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}
