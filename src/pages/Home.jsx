import { useSeo } from '../components/Seo'
import Hero from '../components/Hero'
import ProofStrip from '../components/ProofStrip'
import Champions from '../components/Champions'
import CoreAreas from '../components/CoreAreas'
import ResultsFilter from '../components/ResultsFilter'
import WhyPragmatic from '../components/WhyPragmatic'
import Timeline from '../components/Timeline'
import DiagnosticCare from '../components/DiagnosticCare'
import GutAssessmentSection from '../components/GutAssessmentSection'
import Faq from '../components/Faq'
import CtaBand from '../components/CtaBand'
import Section from '../components/Section'
import { Link } from 'react-router-dom'

export default function Home() {
  useSeo(
    'Best Online Nutritionist in India for Gut Health & Sports Nutrition | Meenu Balaji',
    'Clinical nutritionist, 14+ years across India, UK & NZ. Evidence-based care for IBS, bloating and digestion, plus performance nutrition for teen and elite athletes.'
  )

  return (
    <>
      {/* 1. Hero: Visual hook & 4 Pillars */}
      <Hero />

      {/* 2. Proof Strip: Clinical track record & Press */}
      <ProofStrip />

      {/* 3. Core Disciplines: Gut Health & Sports Nutrition */}
      <CoreAreas />

      {/* 4. Social Proof: Champions & Elite Athletes (Performance That Speaks) */}
      <Champions ctaButtonText="Book A Free Discovery Call" />

      {/* 5. Clinical Philosophy: The Pragmatic Approach */}
      <WhyPragmatic />

      {/* 6. Precision Care: Data-Led Diagnostic Testing */}
      <DiagnosticCare />

      {/* 7. Structured Methodology: 3-Phase Path to Lasting Vitality */}
      <Timeline />

      <Section width="wide" bg="white" eyebrow="MEET MEENU, M.H.Sc (FOOD SCIENCE & NUTRITION)" title="Leading Nutritionist in India for Gut Health & Sports Nutrition">
        <p className="lead">You’re not failing at nutrition. You’re struggling to apply it consistently. Most people who work with me already know what they should be doing.</p>
        <p>Yet gut symptoms keep returning, children’s food and behaviour feel overwhelming, or training results don’t match effort.</p>
        <p>I’m Meenu Balaji, a clinical nutritionist in India with 14+ years of clinical practice across gut health, child nutrition, and sports nutrition. I specialise in closing the gap between knowing and doing, using science, behaviour change, and realistic food strategies. I am a certified peer reviewer for the European Journal of Nutrition and hold ICAR JRF and UGC NET JRF.</p>
        <p>Pragmatic Nutrition is built for real life: non-extreme, flexible, and focused on long-term outcomes rather than quick fixes.</p>
        <Link className="btn btn-primary" to="/about">How Meenu Helps</Link>
      </Section>

      {/* 8. Comprehensive Gut Health Assessment Spotlight */}
      <GutAssessmentSection />

      {/* 9. Social Proof: Verified Patient Clinical Outcomes */}
      <ResultsFilter eyebrow="REAL CLIENTS REAL OUTCOMES" heading="What People Say" headingHighlight="About Working with Meenu" />

      {/* 11. FAQ: Common Inquiries & Clarity */}
      <Faq tight />

      {/* 12. Final Action Band */}
      <CtaBand
        eyebrow="START YOUR JOURNEY"
        headline="Start With A Plan"
        headlineHighlight="Built Around You."
        text="Personalised care, evidence-led protocols, and expert guidance designed around your goals."
        primaryCtaText="Book Your Free Discovery Call"
        secondaryCtaText="Chat on WhatsApp"
        trustStatement="Personalised care • Evidence-led • Available globally"
      />
      <Section width="wide" bg="white" title="Medical Disclaimer">
        <p>The information provided on this website is for educational purposes only and is not intended to diagnose, treat, cure, or prevent any disease. It is meant to assist you in making informed dietary and lifestyle changes. Always consult with a qualified healthcare professional, such as your doctor, before making any significant changes to your diet or lifestyle, especially if you have any underlying health conditions or are taking medication.</p>
        <p>Results are based on client self-reported goal achievement and vary between individuals.</p>
      </Section>
    </>
  )
}
