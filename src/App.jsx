import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { PAGES } from './data/site'
import { BookProvider } from './context/Book'
import ScrollProgress from './components/ScrollProgress'
import NoiseOverlay from './components/NoiseOverlay'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import StickyCta from './components/StickyCta'
import ResultsPage from './pages/ResultsPage'
import TermsPage from './pages/TermsPage'
import PrivacyPage from './pages/PrivacyPage'
import RefundPage from './pages/RefundPage'
import Faq from './components/Faq'
import AboutPage from './pages/AboutPage'
import GutAssessmentPage from './pages/GutAssessmentPage'
import GutHealthPage from './pages/GutHealthPage'
import GutConditionPage from './pages/GutConditionPage'
import Home from './pages/Home'
import PlaceholderPage from './pages/PlaceholderPage'
import SectionPage from './pages/SectionPage'
import SportsNutritionPage from './pages/SportsNutritionPage'
import MoreCarePage from './pages/MoreCarePage'
import ProgramsPricingPage from './pages/ProgramsPricingPage'
import BlogPage from './pages/BlogPage'
import ContactPage from './pages/ContactPage'
import PageHero from './components/PageHero'
import { Link } from 'react-router-dom'

function ScrollTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

const KINDS = {
  checker: <GutAssessmentPage />,
  faq: <Faq tight />
}

const element = (p) =>
  KINDS[p.kind] ? <SectionPage page={p}>{KINDS[p.kind]}</SectionPage> : <PlaceholderPage page={p} />

export default function App() {
  return (
    <BrowserRouter>
      <BookProvider>
        <NoiseOverlay />
        <ScrollProgress />
        <ScrollTop />
        <Navbar />
        <main className="main-content-layout">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/refund" element={<RefundPage />} />
            <Route path="/refund-policy" element={<RefundPage />} />
            <Route path="/privacy-policy-1" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/terms-conditions" element={<TermsPage />} />
            <Route path="/terms-of-use" element={<TermsPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/about-us" element={<AboutPage />} />
            <Route path="/about-meenu-balaji-nutritionist" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/contact-us" element={<ContactPage />} />
            <Route path="/gut-health" element={<GutHealthPage />} />
            <Route path="/best-gut-health-nutritionist-india" element={<GutHealthPage />} />
            <Route path="/gut-health/ibs-bloating" element={<GutConditionPage conditionSlug="ibs-bloating" />} />
            <Route path="/gut-health/acidity-gerd" element={<GutConditionPage conditionSlug="acidity-gerd" />} />
            <Route path="/gut-health/constipation-digestion" element={<GutConditionPage conditionSlug="constipation-digestion" />} />
            <Route path="/gut-health/sibo-gluten-intolerance" element={<GutConditionPage conditionSlug="sibo-gluten-intolerance" />} />
            <Route path="/gut-health/:slug" element={<GutConditionPage />} />
            <Route path="/gut-health-checker" element={<GutAssessmentPage />} />
            <Route path="/gut-health-assessment" element={<GutAssessmentPage />} />
            <Route path="/gut-assessment" element={<GutAssessmentPage />} />
            <Route path="/sports-nutrition" element={<SportsNutritionPage />} />
            <Route path="/sports-nutritionist-india" element={<SportsNutritionPage />} />
            <Route path="/sports-nutrition/youth-teen-athletes" element={<SportsNutritionPage variant="youth" />} />
            <Route path="/sports-nutrition/competitive-athletes" element={<SportsNutritionPage variant="competitive" />} />
            <Route path="/more-care" element={<MoreCarePage />} />
            <Route path="/programs-pricing" element={<ProgramsPricingPage />} />
            <Route path="/nutrition-plans" element={<ProgramsPricingPage />} />
            <Route path="/pricing-plans/list" element={<ProgramsPricingPage />} />
            <Route path="/signature-nutrition-program" element={<ProgramsPricingPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/nutrition-blog" element={<BlogPage />} />
            <Route path="/adhd-nutritionist-children" element={<MoreCarePage slug="adhd-nutrition" />} />
            <Route path="/child-nutritionist-india" element={<MoreCarePage slug="child-teen-nutrition" />} />
            <Route path="/best-diabetes-nutritionist-india" element={<MoreCarePage slug="diabetes" />} />
            <Route path="/nutrition-private-practice" element={element({ label: 'Build Your Private Practice', to: '/academy/build-your-private-practice', blurb: 'Start, scale and manage your private nutrition practice.' })} />
            <Route path="/nutritionist-practice-masterclass-registration" element={element({ label: 'Build Your Private Practice', to: '/academy/build-your-private-practice', blurb: 'Start, scale and manage your private nutrition practice.' })} />
            <Route path="/nutritionist-certificate-courses" element={element({ label: 'Certificate Courses', to: '/academy/certificate-courses', blurb: 'Online certificate courses for nutrition professionals.' })} />
            <Route path="/online-courses-for-nutritionists" element={element({ label: 'Certificate Courses', to: '/academy/certificate-courses', blurb: 'Online certificate courses for nutrition professionals.' })} />
            <Route path="/online-nutrition-course" element={element({ label: 'Courses & Masterclasses', to: '/academy/courses-masterclasses', blurb: 'Learn clinical dietetics from a practising nutritionist.' })} />
            <Route path="/online-nutrition-courses" element={element({ label: 'Courses & Masterclasses', to: '/academy/courses-masterclasses', blurb: 'Learn clinical dietetics from a practising nutritionist.' })} />
            {['child-teen-nutrition', 'adhd-nutrition', 'adhd', 'diabetes', 'pcos', 'weight-loss'].map(slug => <Route key={slug} path={`/more-care/${slug}`} element={<MoreCarePage slug={slug} />} />)}
            {PAGES.filter(p => p.to !== '/blog' && p.to !== '/programs-pricing' && p.to !== '/contact' && p.to !== '/nutrition-plans' && !p.to.startsWith('/gut-health') && !p.to.startsWith('/sports-nutrition') && !p.to.startsWith('/more-care') && p.to !== '/results' && p.to !== '/terms' && p.to !== '/privacy' && p.to !== '/refund').map((p) => (
              <Route key={p.to} path={p.to} element={element(p)} />
            ))}
            <Route
              path="*"
              element={
                <>
                  <PageHero title="Page not found" blurb="That page does not exist. Use the navigation menu above to find what you need." image="not-found" />
                  <section className="section bg-base"><div className="sec-wide"><Link className="btn btn-primary" to="/">Back to home</Link></div></section>
                </>
              }
            />
          </Routes>
        </main>
        <Footer />
        <StickyCta />
      </BookProvider>
    </BrowserRouter>
  )
}
