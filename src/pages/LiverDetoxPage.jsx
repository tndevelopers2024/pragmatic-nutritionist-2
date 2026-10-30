import { Link } from 'react-router-dom'
import {
  Activity,
  ArrowRight,
  Brain,
  CheckCircle2,
  Dna,
  Droplets,
  HeartPulse,
  XCircle
} from 'lucide-react'
import PageHero from '../components/PageHero'
import Section from '../components/Section'
import CtaBand from '../components/CtaBand'
import { useSeo } from '../components/Seo'
import { useBook } from '../context/bookContext'
import './recipes.css'

const DETOX_ORGANS = [
  {
    Icon: Brain,
    title: 'Brain',
    desc: 'Clears metabolic waste during deep, restorative sleep.'
  },
  {
    Icon: HeartPulse,
    title: 'Liver',
    desc: 'Breaks down, neutralises, and filters metabolic toxins.'
  },
  {
    Icon: Activity,
    title: 'Gut',
    desc: 'Eliminates processed waste and blocks harmful pathogens.'
  },
  {
    Icon: Droplets,
    title: 'Kidneys',
    desc: 'Continuously filter blood and flush toxins out through urine.'
  },
  {
    Icon: Dna,
    title: 'Cells',
    desc: 'Neutralise free radicals using endogenous and dietary antioxidants.'
  }
]

const REAL_DETOX_FOODS = [
  'Antioxidant-rich fruits & veggies — berries, leafy greens, beets',
  'Fiber — from lentils, chia seeds, oats (sweeps your gut clean)',
  'Healthy fats — wild salmon, flaxseeds, avocado',
  'Hydration — plain water with lemon, herbal teas',
  'Cruciferous vegetables — broccoli, cauliflower, Brussels sprouts',
  'Garlic & onions — contain sulfur compounds for liver support',
  'B vitamins & magnesium — found in eggs, nuts, seeds, spinach'
]

const WELLNESS_TOPICS = [
  {
    title: '10 Signs of an Unhealthy Gut — Take the Free Gut Checker',
    to: '/gut-health-checker',
    cta: 'Take Free Assessment'
  },
  {
    title: 'Prebiotics, Probiotics & Root-Cause Gut Health Nutrition',
    to: '/gut-health',
    cta: 'Explore Gut Health'
  },
  {
    title: 'Wholesome Gut-Friendly & Gluten-Free Recipes',
    to: '/gut-health-recipes',
    cta: 'Browse Recipes'
  },
  {
    title: 'How to Start a Gluten-Free Diet Without Guesswork',
    to: '/gluten-free-diet',
    cta: 'Read Guide'
  },
  {
    title: 'Clinical Articles on Digestion, Metabolic Health & Supplements',
    to: '/blog',
    cta: 'Read Nutrition Blog'
  },
  {
    title: 'Blood Sugar Balance & Sustainable Metabolic Nutrition',
    to: '/more-care/diabetes',
    cta: 'Explore Metabolic Care'
  }
]

export default function LiverDetoxPage() {
  useSeo(
    'Liver Detox Foods | Pragmatic Nutrition',
    'Learn how to support your body’s natural detox pathways with real foods—no harsh cleanses or fads.'
  )
  const openBook = useBook()

  return (
    <div className="guide-page">
      <PageHero
        title="Support Your Body’s Detox Pathways Naturally—No Cleanses Required"
        blurb="Your body is detoxing right now—even if you haven’t touched a green juice."
        parent={{ label: 'Gut Health', to: '/gut-health' }}
      />

      {/* 1. Intro & Visual */}
      <Section width="wide" bg="white">
        <div className="guide-hero-grid">
          <div className="guide-hero-copy">
            <span className="section-eyebrow">EVIDENCE-BASED NUTRITION GUIDE</span>
            <h2>Built-In Detoxification Powered by Everyday Whole Foods</h2>
            <p>
              Your body is detoxing right now—even if you haven’t touched a green juice. In fact, it detoxes every second of every day, thanks to powerful built-in systems like your liver, kidneys, gut, and brain.
            </p>
            <p>
              Ready to help it do an even better job? Start with the right foods—without extreme fasting, harsh laxatives, or expensive juice cleanses.
            </p>
            <div className="guide-hero-actions">
              <button type="button" className="btn btn-primary" onClick={openBook}>
                <span>Talk to a Clinical Nutritionist</span>
                <ArrowRight size={16} aria-hidden="true" />
              </button>
              <Link to="/gut-health-recipes" className="btn btn-secondary">
                <span>Explore Gut-Friendly Recipes</span>
              </Link>
            </div>
          </div>

          <figure className="guide-hero-media">
            <img
              src="/images/guides/liver-detox-foods.jpg"
              alt="Green smoothie ingredients and natural whole foods that support liver detoxification"
            />
          </figure>
        </div>
      </Section>

      {/* 2. Why Detox Diets Don't Work & Weight Loss Myth */}
      <Section width="wide" bg="base" eyebrow="SEPARATING SCIENCE FROM FADS" title="Why Detox Diets Don’t Actually Remove Toxins">
        <div className="guide-dual-grid">
          <article className="guide-panel guide-panel-warn">
            <h3>You’ve seen the ads: “Flush toxins fast!” “Reset your liver in 3 days!”</h3>
            <p>
              Here’s the clinical truth: commercial detox diets don’t actually remove toxins from your body. What they usually do:
            </p>
            <ul className="guide-checklist">
              <li>
                <XCircle size={18} className="guide-check-warn" aria-hidden="true" />
                <span>Starve your body of key nutrients needed for Phase I and Phase II liver pathways</span>
              </li>
              <li>
                <XCircle size={18} className="guide-check-warn" aria-hidden="true" />
                <span>Cause temporary water weight loss (not fat loss)</span>
              </li>
              <li>
                <XCircle size={18} className="guide-check-warn" aria-hidden="true" />
                <span>Stress your liver instead of supporting it</span>
              </li>
              <li>
                <XCircle size={18} className="guide-check-warn" aria-hidden="true" />
                <span>Rely on laxatives or diuretics for a “quick fix”</span>
              </li>
            </ul>
          </article>

          <article className="guide-panel guide-panel-warn">
            <h3>Weight Loss During a Detox Isn’t What You Think</h3>
            <p>Yes, you may feel lighter during a cleanse—but here’s why:</p>
            <ul className="guide-checklist">
              <li>
                <XCircle size={18} className="guide-check-warn" aria-hidden="true" />
                <span>You’re eating drastically fewer calories</span>
              </li>
              <li>
                <XCircle size={18} className="guide-check-warn" aria-hidden="true" />
                <span>You’re losing glycogen and water, not body fat</span>
              </li>
              <li>
                <XCircle size={18} className="guide-check-warn" aria-hidden="true" />
                <span>You’re cutting out sugar and processed foods only temporarily</span>
              </li>
            </ul>
            <p style={{ marginTop: 'auto', fontWeight: 600, color: 'var(--color-text-main)' }}>
              This weight usually comes right back once the cleanse ends. The sustainable solution is supporting your detox organs naturally—with real food.
            </p>
          </article>
        </div>
      </Section>

      {/* 3. Your Body Has a Natural Detox System */}
      <Section
        width="wide"
        bg="white"
        eyebrow="PHYSIOLOGY FIRST"
        title="Your Body Has a Natural Detox System—Here’s How It Works"
        lead="No diet or detox tea can replace your body’s built-in clearance pathways:"
      >
        <div className="guide-organs-grid">
          {DETOX_ORGANS.map((organ) => {
            const Icon = organ.Icon
            return (
              <article key={organ.title} className="guide-organ-card">
                <div className="guide-organ-icon" aria-hidden="true">
                  <Icon size={20} strokeWidth={2} />
                </div>
                <h3>{organ.title}</h3>
                <p>{organ.desc}</p>
              </article>
            )
          })}
        </div>
      </Section>

      {/* 4. Top Real Foods vs What You Don't Need */}
      <Section
        width="wide"
        bg="base"
        eyebrow="FOOD-FIRST PROTOCOL"
        title="No More Gimmicks. Just Real Detox Support."
      >
        <div className="guide-dual-grid">
          <article className="guide-panel guide-panel-good">
            <h3>Top Real Foods to Support Detox Pathways</h3>
            <p>Want to truly support your detox system? Focus on real, nutrient-dense foods every day:</p>
            <ul className="guide-checklist">
              {REAL_DETOX_FOODS.map((food) => (
                <li key={food}>
                  <CheckCircle2 size={18} className="guide-check-good" aria-hidden="true" />
                  <span>{food}</span>
                </li>
              ))}
            </ul>
            <div style={{ marginTop: 'auto', paddingTop: '12px' }}>
              <Link to="/contact?plan=Liver%20%26%20Metabolic%20Detox%20Food%20Guide" className="subtopic-action">
                <span>Request the Free Detox Food Guide</span>
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </article>

          <article className="guide-panel guide-panel-warn">
            <h3>What You Don’t Need</h3>
            <p>
              Detoxing doesn’t have to be complicated—or expensive. Your body is already designed to clean, filter, and protect itself. All it needs from you is the right nutrition, sleep, hydration, and movement. Skip:
            </p>
            <ul className="guide-checklist">
              <li>
                <XCircle size={18} className="guide-check-warn" aria-hidden="true" />
                <span>Juice-only starvation diets</span>
              </li>
              <li>
                <XCircle size={18} className="guide-check-warn" aria-hidden="true" />
                <span>Extreme or unsupervised fasting</span>
              </li>
              <li>
                <XCircle size={18} className="guide-check-warn" aria-hidden="true" />
                <span>Detox teas with mystery laxative ingredients</span>
              </li>
              <li>
                <XCircle size={18} className="guide-check-warn" aria-hidden="true" />
                <span>Quick-fix liver or colon “flushes”</span>
              </li>
            </ul>
          </article>
        </div>
      </Section>

      {/* 5. Explore More Wellness Topics */}
      <Section width="wide" bg="white" eyebrow="KEEP LEARNING" title="Explore More Wellness Topics">
        <div className="guide-related-links">
          {WELLNESS_TOPICS.map((topic) => (
            <Link key={topic.title} to={topic.to} className="guide-related-card">
              <h3>{topic.title}</h3>
              <span>
                {topic.cta} <ArrowRight size={14} aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <CtaBand
        eyebrow="FATTY LIVER, GUT & METABOLIC CARE"
        headline="Support Your Liver & Gut"
        headlineHighlight="With Clinical Precision."
        text="Dealing with fatty liver, sluggish digestion, bloating, or elevated metabolic markers? Book a free discovery call with Meenu Balaji."
        primaryCtaText="Book Your Free Discovery Call"
        secondaryCtaText="Chat on WhatsApp"
      />
    </div>
  )
}
