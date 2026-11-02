import { useSeo } from '../components/Seo'
import PageHero from '../components/PageHero'
import MeetMeenu from '../components/MeetMeenu'
import ProfessionalCredentials from '../components/ProfessionalCredentials'
import PersonalPhilosophy from '../components/PersonalPhilosophy'
import ThoughtfulNutrition from '../components/ThoughtfulNutrition'
import WhoIsThisFor from '../components/WhoIsThisFor'
import ThinkingBehindPractice from '../components/ThinkingBehindPractice'
import InternationalPublications from '../components/InternationalPublications'
import FeaturedMediaArticles from '../components/FeaturedMediaArticles'
import Champions from '../components/Champions'
import Faq from '../components/Faq'
import TransformHealthCta from '../components/TransformHealthCta'
import { AboutExpertise, AboutTestimonial, AboutPracticeNotes } from '../components/AboutSourceContent'
import aboutContent from '../data/aboutContent.json'
import niralyaPhoto from '../assets/niralya-satheesh-kumar.jpeg'
import './aboutTypography.css'

const ABOUT_ATHLETES = [
  {
    name: 'CHARITA PHANINDRANATH',
    sport: 'Swimming',
    tag: 'U-17 National Record',
    achievements: 'U-17 National Record — 50m Freestyle, 26.04 sec. Set at the Indian Junior Championships, Bhubaneswar, August 2026.'
  },
  {
    name: 'SAI AMEYA',
    sport: 'Jiu-Jitsu',
    tag: 'Silver Medalist',
    achievements: 'Silver, AJP Tour Asia Continental Jiu-Jitsu Championship (Youth). Carpe Diem BJJ, Singapore — Abu Dhabi, September 2026.'
  },
  {
    name: 'AAHANA SINGH',
    sport: 'Squash',
    tag: 'GU17 Winner',
    achievements: 'GU17 winner, Bengal Junior Squash Open'
  },
  {
    name: 'DHAIRYA SAMAHITA NAVEEN',
    sport: 'Biathle / Triathle',
    tag: 'International Silver Medalist',
    achievements: 'National Biathle/Triathle competition medalist Silver at International UIPM, 2025'
  },
  {
    name: 'NIRALYA SATHEESH KUMAR',
    photoSrc: niralyaPhoto,
    sport: 'Swimming',
    tag: 'State Gold Medalist',
    achievements: 'Gold, 50m backstroke, Tamil Nadu State Championship'
  }
]

const P = ({ children }) => <p>{children}</p>

const ABOUT_FAQS = [
  [
    'Who is the best nutritionist for gut health in Chennai/India?',
    <>
      <P>Look for a nutritionist with relevant qualifications, clinical experience, and a clear evidence-led approach to digestive health. Gut symptoms such as bloating, constipation, acidity or IBS can have different contributing factors, so a good approach should consider your symptoms, food patterns, lifestyle, health history and individual needs rather than relying on a standardised diet. It should also focus on practical changes that can be sustained in everyday life.</P>
      <P>Meenu Balaji, M.H.Sc., has 14+ years of experience across India, the UK, and New Zealand, with an evidence-led, root-cause approach to gut health built around Indian food patterns.</P>
    </>
  ],
  [
    'Do you offer online consultations outside India?',
    <>
      <P>Yes. Online consultations are available across India and internationally, including for clients in the UK, Canada, Australia, New Zealand, and Ireland.</P>
      <P>For international clients, sessions are delivered as health and lifestyle coaching, evidence-based guidance and behaviour change support.</P>
    </>
  ],
  [
    'Are your nutrition plans personalised or template-based?',
    'Fully personalised. There\'s no universal "gut health diet" or "athlete meal plan". Two people with the same symptom, diagnosis, or sport can have very different nutritional needs. Every plan is built around your physiology, routine, food preferences, and lifestyle rather than pulled from a fixed template.'
  ],
  [
    'How is your gut-health approach different from others?',
    <>
      <P>Rather than simply removing foods, the approach considers the full picture, including digestion, symptoms, food tolerance, eating patterns, relevant investigations, and lifestyle factors that may drive persistent issues.</P>
      <P>It is a functional approach that targets root causes such as digestion, bile flow, and microbiome balance, rather than just removing trigger foods, blending traditional Indian foods with functional nutrition science.</P>
    </>
  ],
  [
    'Do you work with women managing PCOS or hormonal issues?',
    'Yes. PCOS, thyroid conditions, and related hormonal concerns are one of the areas I work with regularly, alongside gut health and sports nutrition, using the same personalised, evidence-based approach.'
  ],
  [
    'Do you work with athletes and teenagers?',
    <>
      <P>Yes, sports nutrition for teen and adult athletes is one of my two core focus areas. This covers training support, recovery, energy availability, hydration, competition demands, and (for younger athletes) growth, all adapted to an Indian diet and training schedule.</P>
      <P>I work with athletes representing India on the international platform in swimming, triathlon, pentathlon, MMA, Ironman, etc.</P>
    </>
  ],
  [
    'Why work with a human nutritionist instead of AI or online advice?',
    'Generic advice, whether from an app or a search result, can\'t account for your physiology, medical history, food tolerances, family routine, or the culture you eat within. Fourteen-plus years of clinical practice mean interpreting the research for your specific situation, not just applying it uniformly — which is where most generic plans fall short.'
  ],
  [
    'How is this different from a diet plan or app?',
    'A diet plan tells you what to eat once. Coaching adapts as your body, routine, and results change — adjusting to travel, training load, symptoms, or life getting in the way, and building habits that hold up outside a spreadsheet.'
  ],
  [
    'Will I need to keep coaching indefinitely?',
    'No. The goal is to build enough understanding and skill that you can make confident food decisions independently over time.'
  ]
]

export default function AboutPage() {
  useSeo(
    'Meenu Balaji| Gut & Sports Nutritionist | Pragmatic Nutrition, Chennai India',
    'Meenu Balaji, M.H.Sc, is a clinical gut-health and sports-nutrition specialist in Chennai with 14+ years across India, the UK, and New Zealand. Book a free call'
  )

  return (
    <div className="about-us-page">
      <PageHero
        title="About Meenu Balaji"
        blurb={aboutContent.heroDescription}
      />

      {/* Featured Clinical Founder & Credentials Section */}
      <MeetMeenu profile={aboutContent.founder} />

      <AboutExpertise />

      {/* Professional Credentials Section */}
      <ProfessionalCredentials />

      {/* Personal Philosophy / About Meenu Editorial Section */}
      <PersonalPhilosophy />

      {/* Results of Athletes I Work With */}
      <Champions
        eyebrow="RESULTS OF ATHLETES I WORK WITH"
        headingLine1="Results of Athletes"
        headingHighlight="I Work With"
        description="Together we build nutrition habits that support performance and long-term health."
        credibilityText=""
        athletes={ABOUT_ATHLETES}
      />

      <AboutTestimonial />

      {/* Thoughtful Nutrition Starts with Understanding You */}
      <ThoughtfulNutrition />

      {/* Who Is This For & What Working With Me Looks Like */}
      <WhoIsThisFor />

      {/* Thinking Behind the Practice */}
      <ThinkingBehindPractice />

      {/* UK and International Health Publications */}
      <InternationalPublications />

      {/* Featured Media Articles in Health Magazine */}
      <FeaturedMediaArticles />

      {/* FAQs */}
      <Faq
        items={ABOUT_FAQS}
        eyebrow="More Frequently Asked Questions"
        heading="Frequently Asked Questions"
        headingHighlight=""
        description=""
        idPrefix="about"
      />

      {/* Transform Your Health CTA Section */}
      <TransformHealthCta />

      <AboutPracticeNotes />
    </div>
  )
}
