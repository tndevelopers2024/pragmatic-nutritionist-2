import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { PAGES } from './data/site'
import { BookProvider } from './context/Book'
import ScrollProgress from './components/ScrollProgress'
import NoiseOverlay from './components/NoiseOverlay'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import StickyCta from './components/StickyCta'
import ResultsFilter from './components/ResultsFilter'
import Faq from './components/Faq'
import AboutPage from './pages/AboutPage'
import GutAssessmentPage from './pages/GutAssessmentPage'
import GutHealthPage from './pages/GutHealthPage'
import GutConditionPage from './pages/GutConditionPage'
import Home from './pages/Home'
import PlaceholderPage from './pages/PlaceholderPage'
import SectionPage from './pages/SectionPage'

function ScrollTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

const KINDS = {
  checker: <GutAssessmentPage />,
  results: <ResultsFilter title="Real people, real progress" />,
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
            <Route path="/about" element={<AboutPage />} />
            <Route path="/about-us" element={<AboutPage />} />
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
            {PAGES.filter(p => !p.to.startsWith('/gut-health')).map((p) => (
              <Route key={p.to} path={p.to} element={element(p)} />
            ))}
            <Route
              path="*"
              element={
                <PlaceholderPage
                  page={{
                    label: 'Page not found',
                    blurb: 'That page does not exist. Use the navigation menu above to find what you need.'
                  }}
                />
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
