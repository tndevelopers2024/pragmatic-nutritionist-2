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
import ProofStrip from '../components/ProofStrip'
import TransformHealthCta from '../components/TransformHealthCta'

export default function AboutPage() {
  useSeo(
    'About Meenu Balaji | Registered Clinical Nutritionist & Sports Specialist',
    'Meet Meenu Balaji, M.H.Sc (Food Science & Nutrition). 14+ years of clinical practice in gut health, clinical dietetics, and performance sports nutrition.'
  )

  return (
    <div className="about-us-page">
      <PageHero
        title="About Meenu Balaji"
        blurb="Registered Clinical Nutritionist specializing in evidence-based gut health protocols and adolescent sports nutrition frameworks."
      />

      {/* Featured Clinical Founder & Credentials Section */}
      <MeetMeenu />

      {/* Professional Credentials Section */}
      <ProfessionalCredentials />

      {/* Personal Philosophy / About Meenu Editorial Section */}
      <PersonalPhilosophy />

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

      {/* Proof Strip */}
      <ProofStrip />

      {/* Transform Your Health CTA Section */}
      <TransformHealthCta />
    </div>
  )
}
