import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import PageHero from '../components/PageHero'
import Section from '../components/Section'
import CtaBand from '../components/CtaBand'
import { useSeo } from '../components/Seo'
import { useBook } from '../context/bookContext'
import './recipes.css'

const GLUTEN_GUIDE_SECTIONS = [
  {
    title: 'What is Gluten, Anyway?',
    body: "Let's break it down: gluten is a protein found in wheat, barley, rye, and their derivatives. For some folks, consuming gluten can lead to discomfort or serious health issues. That's where a structured, nutrient-complete gluten-free diet makes all the difference."
  },
  {
    title: 'Who Benefits from Going Gluten-Free?',
    body: 'People with celiac disease are at the top of the list. This autoimmune condition causes the body to react negatively to gluten, damaging the small intestine and leading to a host of absorption issues. Then there are those with non-celiac gluten sensitivity or intolerance who may experience bloating, headaches, skin flare-ups, or fatigue when gluten comes into play.'
  },
  {
    title: 'What Can You Eat on a Gluten-Free Diet?',
    body: "Surprisingly, there's a wide variety of delicious everyday options! Think naturally gluten-free whole foods like fruits, vegetables, dals, legumes, lean proteins, nuts, seeds, and tolerated dairy products. Plus, many grains and pseudo-cereals like rice, jowar, bajra, ragi, rajgira (amaranth), quinoa, and corn are naturally gluten-free too. Nowadays, finding gluten-free alternatives in supermarkets or at your favourite restaurant is easier than ever."
  },
  {
    title: 'Why Go Gluten-Free When Clinically Indicated?',
    body: 'Aside from resolving digestive inflammation in celiac disease and gluten sensitivity, many individuals report steadier energy levels, calmer digestion, reduced post-meal bloating, and clearer skin when replacing trigger foods with nutrient-dense whole grains.'
  }
]

export default function GlutenFreePage() {
  useSeo(
    'Gluten-Free Diet Guide | Embrace Health with Pragmatic Nutrition',
    'Learn how to embrace a gluten-free lifestyle with our expert guide. What to eat, what to avoid, and gluten-free Indian recipes.'
  )
  const openBook = useBook()

  return (
    <div className="guide-page">
      <PageHero
        title="How to Start a Gluten-Free Diet?"
        blurb="What to eat and what to avoid in a balanced, nutrient-rich gluten-free diet."
        parent={{ label: 'Gut Health', to: '/gut-health' }}
      />

      <Section width="wide" bg="white">
        <div className="guide-hero-grid">
          <div className="guide-hero-copy">
            <span className="section-eyebrow">GLUTEN-FREE LIFESTYLE GUIDE</span>
            <h2>Discover the Freedom of a Gluten-Free Diet</h2>
            <p>
              Welcome to our guide on embracing a gluten-free lifestyle! Whether you are here out of curiosity or clinical necessity, transitioning thoughtfully can be a game-changer for your digestive health and well-being.
            </p>
            <ul className="guide-checklist">
              <li>
                <CheckCircle2 size={18} className="guide-check-good" aria-hidden="true" />
                <span>What to eat and what to avoid on an Indian gluten-free diet</span>
              </li>
              <li>
                <CheckCircle2 size={18} className="guide-check-good" aria-hidden="true" />
                <span>Preventing fibre, iron, and B-vitamin gaps when removing wheat</span>
              </li>
              <li>
                <CheckCircle2 size={18} className="guide-check-good" aria-hidden="true" />
                <span>Practical swaps using jowar, ragi, rice, amaranth, and certified gluten-free oats</span>
              </li>
            </ul>
            <div className="guide-hero-actions">
              <Link to="/contact?plan=Free%20Gluten-Free%20Diet%20Guide" className="btn btn-primary">
                <span>Request Your Free Copy</span>
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <button type="button" className="btn btn-secondary" onClick={openBook}>
                <span>Consult on Gluten Intolerance</span>
              </button>
            </div>
          </div>

          <figure className="guide-hero-media">
            <img
              src="/images/gluten-free-guide.avif"
              alt="Gluten free guide, gluten free life, gluten free foods, how to start a gluten free diet"
            />
          </figure>
        </div>
      </Section>

      <Section width="wide" bg="base" eyebrow="ESSENTIAL FOUNDATIONS" title="Understanding a Gluten-Free Lifestyle">
        <div className="recipe-benefits-grid">
          {GLUTEN_GUIDE_SECTIONS.map((item, idx) => (
            <article key={item.title} className="recipe-benefit-card">
              <span className="recipe-benefit-num">{String(idx + 1).padStart(2, '0')}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section width="wide" bg="white" eyebrow="NEXT STEPS & RECIPES" title="Put Gluten-Free Nutrition Into Practice">
        <div className="guide-related-links">
          <Link to="/gut-health/sibo-gluten-intolerance" className="guide-related-card">
            <h3>SIBO &amp; Gluten Intolerance Clinical Protocol</h3>
            <span>
              Explore Clinical Care <ArrowRight size={14} aria-hidden="true" />
            </span>
          </Link>
          <Link to="/gut-health-recipes" className="guide-related-card">
            <h3>Gluten-Free &amp; Gut-Friendly Indian Recipes</h3>
            <span>
              Browse All 8 Recipes <ArrowRight size={14} aria-hidden="true" />
            </span>
          </Link>
          <Link to="/gut-health-checker" className="guide-related-card">
            <h3>Not Sure If Gluten Is Driving Your Bloating?</h3>
            <span>
              Take Free Gut Checker <ArrowRight size={14} aria-hidden="true" />
            </span>
          </Link>
        </div>
      </Section>

      <CtaBand
        eyebrow="CLINICAL FOOD INTOLERANCE SUPPORT"
        headline="Suspect Gluten Sensitivity"
        headlineHighlight="Or Celiac Disease?"
        text="Work with Meenu Balaji to pinpoint your exact food triggers without unnecessary restriction—built around real Indian meals."
        primaryCtaText="Book Your Free Discovery Call"
        secondaryCtaText="Chat on WhatsApp"
      />
    </div>
  )
}
