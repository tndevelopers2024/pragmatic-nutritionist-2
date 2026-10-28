import { useState, useMemo } from 'react'
import {
  Smile,
  Meh,
  Frown,
  CheckCircle2,
  Droplet,
  Flame,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Clock,
  HeartPulse,
  Activity,
  Calendar,
  Sparkles,
  Compass,
  FileText,
  User,
  Phone,
  Mail,
  Check,
  Info
} from 'lucide-react'
import WhatsAppIcon from '../components/WhatsAppIcon'
import { useSeo } from '../components/Seo'
import { useBook } from '../context/bookContext'
import { GOALS, wa } from '../data/site'
import Section from '../components/Section'

const SYMPTOM_CLUSTERS = [
  {
    categoryKey: 'digestion',
    categoryName: 'Digestive Symptoms',
    categoryDesc: 'Common digestive sensations and bowel habits',
    items: [
      {
        id: 'bloating',
        title: 'Bloating & Abdominal Distension',
        subtitle: 'Feeling tight, swollen, or heavy after regular meals'
      },
      {
        id: 'constipation',
        title: 'Constipation or Irregular Bowels',
        subtitle: 'Hard stools, straining, or incomplete morning evacuation'
      },
      {
        id: 'gas',
        title: 'Excessive Gas & Stomach Rumbling',
        subtitle: 'Frequent flatulence, internal bubbling, or discomfort'
      },
      {
        id: 'acidity',
        title: 'Acidity, Heartburn & GERD',
        subtitle: 'Burning sensation in chest/throat or sour regurgitation'
      },
      {
        id: 'stomach_pain',
        title: 'Stomach Ache & Cramping',
        subtitle: 'Abdominal sensitivity, spasms, or post-meal tenderness'
      }
    ]
  },
  {
    categoryKey: 'gut_brain',
    categoryName: 'Energy & Focus',
    categoryDesc: 'Self-reported energy and concentration',
    items: [
      {
        id: 'brain_fog',
        title: 'Brain Fog & Post-Meal Slump',
        subtitle: 'Difficulty focusing, grogginess, or midday energy crashes'
      },
      {
        id: 'fatigue',
        title: 'Unexplained Daily Fatigue',
        subtitle: 'Feeling exhausted despite sleeping 7-8 hours adequately'
      }
    ]
  },
  {
    categoryKey: 'metabolic',
    categoryName: 'Cravings & Skin',
    categoryDesc: 'Self-reported cravings and skin changes',
    items: [
      {
        id: 'food_cravings',
        title: 'Intense Sugar & Carb Cravings',
        subtitle: 'Sudden urges for sweets or unmanageable hunger drops'
      },
      {
        id: 'skin_issues',
        title: 'Skin Flare-ups & Breakouts',
        subtitle: 'Acne, unexplained rashes, eczema, or skin dullness'
      }
    ]
  }
]

// Flattened list for calculations
const ALL_SYMPTOMS = SYMPTOM_CLUSTERS.flatMap((c) =>
  c.items.map((item) => ({ ...item, category: c.categoryKey }))
)

const WATER_OPTIONS = [
  { label: 'Under 1L', value: 3, title: 'Low', sub: 'Less than one litre' },
  { label: '1L - 2L', value: 2, title: 'Moderate', sub: 'One to two litres' },
  { label: '2L - 3L', value: 1, title: 'Optimal', sub: 'Two to three litres' },
  { label: '3L+ / Day', value: 0, title: 'High', sub: 'Three litres or more' }
]

const DIET_TYPES = ['Pure Vegetarian', 'Non-Vegetarian', 'Eggetarian', 'Jain / Satvic', 'Vegan']
const AGE_GROUPS = ['Under 20', '20 - 30', '31 - 45', '46 - 60', '60+']

const SEVERITY_LEVELS = [
  { text: 'Never', value: 0, short: '0' },
  { text: 'Sometimes', value: 1, short: '1' },
  { text: 'Often', value: 2, short: '2' },
  { text: 'Always', value: 3, short: '3' }
]

export default function GutAssessmentPage() {
  useSeo(
    'Free Gut Health Symptom Quiz | Pragmatic Nutritionist',
    'Reflect on digestive symptoms and lifestyle habits with a free self-report quiz.'
  )

  const openBook = useBook()

  // Steps: 1 = Symptoms, 2 = Lifestyle, 3 = Profile, 4 = Result View
  const [step, setStep] = useState(1)
  const [symptomAnswers, setSymptomAnswers] = useState({})
  const [waterIntake, setWaterIntake] = useState(WATER_OPTIONS[2].label)
  const [dietType, setDietType] = useState(DIET_TYPES[0])
  const [ageGroup, setAgeGroup] = useState(AGE_GROUPS[1])
  const [diagnosedConditions, setDiagnosedConditions] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    goal: GOALS[0]
  })
  const [isCalculated, setIsCalculated] = useState(false)

  const handleSymptomSelect = (symptomId, val) => {
    setSymptomAnswers((prev) => ({ ...prev, [symptomId]: val }))
  }

  const answeredCount = Object.keys(symptomAnswers).length
  const totalSymptoms = ALL_SYMPTOMS.length

  // Live Score Calculation
  const { score, emotionTier, digestionScore, gutBrainScore, metabolicScore } = useMemo(() => {
    let rawPenalty = 0
    const maxPenalty = totalSymptoms * 3 + 3

    ALL_SYMPTOMS.forEach((s) => {
      const val = symptomAnswers[s.id] ?? 0
      rawPenalty += val
    })

    const waterObj = WATER_OPTIONS.find((w) => w.label === waterIntake)
    if (waterObj) rawPenalty += waterObj.value

    const calculatedScore = Math.max(
      15,
      Math.min(100, Math.round(100 - (rawPenalty / maxPenalty) * 85))
    )

    // Cluster penalties
    const digPenalty = ALL_SYMPTOMS.filter((s) => s.category === 'digestion').reduce(
      (acc, s) => acc + (symptomAnswers[s.id] ?? 0),
      0
    )
    const gbPenalty = ALL_SYMPTOMS.filter((s) => s.category === 'gut_brain').reduce(
      (acc, s) => acc + (symptomAnswers[s.id] ?? 0),
      0
    )
    const metPenalty = ALL_SYMPTOMS.filter((s) => s.category === 'metabolic').reduce(
      (acc, s) => acc + (symptomAnswers[s.id] ?? 0),
      0
    )

    const dScore = Math.max(10, Math.round(100 - (digPenalty / 15) * 85))
    const gbScore = Math.max(10, Math.round(100 - (gbPenalty / 6) * 85))
    const mScore = Math.max(10, Math.round(100 - (metPenalty / 6) * 85))

    let tier
    if (calculatedScore >= 80) {
      tier = {
        level: 'optimal',
        label: 'HIGHER QUIZ SCORE',
        shortDesc: 'This score summarises your symptom and water-intake answers.',
        color: '#55883B',
        bgTint: '#E6F0DC',
        accentBg: '#C1E899',
        icon: Smile,
        emoji: '🌿',
        statusTag: 'Higher quiz score',
        mood: 'Higher quiz score',
        actionAdvice:
          'This score summarises your symptom and water-intake answers. This does not establish that your digestive system is healthy or rule out a medical condition.',
        foodProtocols: [
          { title: 'Track your symptoms', desc: 'Note when symptoms occur and discuss any concerns with a qualified healthcare professional.' },
          { title: 'Consider your routine', desc: 'You may find it useful to note meals, sleep, and daily routines alongside symptoms.' },
          { title: 'Ask for individual guidance', desc: 'Food choices and hydration needs vary with your health and circumstances.' },
          { title: 'Seek medical care', desc: 'A healthcare professional can assess symptoms and recommend any appropriate tests or treatment.' }
        ]
      }
    } else if (calculatedScore >= 55) {
      tier = {
        level: 'warning',
        label: 'MIDDLE QUIZ SCORE',
        shortDesc: 'This score summarises your symptom and water-intake answers.',
        color: '#9A6735',
        bgTint: '#FBF6F0',
        accentBg: '#F2E7DC',
        icon: Meh,
        emoji: '⚠️',
        statusTag: 'Middle quiz score',
        mood: 'Middle quiz score',
        actionAdvice:
          'Consider discussing persistent or concerning symptoms with a qualified healthcare professional.',
        foodProtocols: [
          { title: 'Track your symptoms', desc: 'Note when symptoms occur and discuss any concerns with a qualified healthcare professional.' },
          { title: 'Consider your routine', desc: 'You may find it useful to note meals, sleep, and daily routines alongside symptoms.' },
          { title: 'Ask for individual guidance', desc: 'Food choices and hydration needs vary with your health and circumstances.' },
          { title: 'Seek medical care', desc: 'A healthcare professional can assess symptoms and recommend any appropriate tests or treatment.' }
        ]
      }
    } else {
      tier = {
        level: 'critical',
        label: 'LOWER QUIZ SCORE',
        shortDesc: 'This score summarises your symptom and water-intake answers.',
        color: '#B23B2A',
        bgTint: '#FDF2F0',
        accentBg: '#FCE4E1',
        icon: Frown,
        emoji: '🚨',
        statusTag: 'Lower quiz score',
        mood: 'Lower quiz score',
        actionAdvice:
          'A qualified healthcare professional can help you understand persistent or concerning symptoms and decide on appropriate care.',
        foodProtocols: [
          { title: 'Track your symptoms', desc: 'Note when symptoms occur and discuss any concerns with a qualified healthcare professional.' },
          { title: 'Consider your routine', desc: 'You may find it useful to note meals, sleep, and daily routines alongside symptoms.' },
          { title: 'Ask for individual guidance', desc: 'Food choices and hydration needs vary with your health and circumstances.' },
          { title: 'Seek medical care', desc: 'A healthcare professional can assess symptoms and recommend any appropriate tests or treatment.' }
        ]
      }
    }

    return {
      score: calculatedScore,
      emotionTier: tier,
      digestionScore: dScore,
      gutBrainScore: gbScore,
      metabolicScore: mScore
    }
  }, [symptomAnswers, waterIntake, totalSymptoms])

  const circumference = 2 * Math.PI * 52
  const strokeDashoffset = circumference - (score / 100) * circumference
  const EmotionIcon = emotionTier.icon

  const handleRetake = () => {
    setSymptomAnswers({})
    setWaterIntake(WATER_OPTIONS[2].label)
    setDietType(DIET_TYPES[0])
    setAgeGroup(AGE_GROUPS[1])
    setDiagnosedConditions([])
    setFormData({ name: '', phone: '', email: '', goal: GOALS[0] })
    setStep(1)
    setIsCalculated(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const toggleCondition = (cond) => {
    setDiagnosedConditions((prev) =>
      prev.includes(cond) ? prev.filter((c) => c !== cond) : [...prev, cond]
    )
  }

  return (
    <div className="gut-assessment-page-root">
      {/* 1. EDITORIAL HERO HEADER */}
      <section className="assessment-editorial-hero">
        <div className="assessment-hero-inner">
          <div className="assessment-hero-eyebrow-pill">
            <span className="eyebrow-pulse-dot" aria-hidden="true" />
            <span className="eyebrow-label">SELF-REPORTED SYMPTOMS</span>
          </div>

          <h1 className="assessment-editorial-title">
            <span>Free Gut Health </span>
            <span className="title-accent-highlight">Assessment Quiz</span>
          </h1>

          <p className="assessment-editorial-lead">
            Reflect on your symptoms and habits with this short self-report quiz. The score is a simple summary of your answers, not a validated clinical assessment or diagnosis.
          </p>

          <div className="assessment-credential-strip">
            <div className="credential-badge">
              <CheckCircle2 size={15} className="cred-icon" aria-hidden="true" />
              <span>Simple self-report quiz</span>
            </div>
            <div className="credential-badge">
              <ShieldCheck size={15} className="cred-icon" aria-hidden="true" />
              <span>14+ Years Clinical Expertise</span>
            </div>
            <div className="credential-badge">
              <Clock size={15} className="cred-icon" aria-hidden="true" />
              <span>Takes ~2 Minutes</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN INTERACTIVE ASSESSMENT CONTAINER */}
      <Section id="assessment-workspace" width="wide" bg="none" className="assessment-main-section">
        {!isCalculated ? (
          <div className="assessment-dual-layout">
            {/* LEFT COLUMN: MULTI-STEP WIZARD */}
            <div className="assessment-wizard-card">
              {/* Responsive Progress Stepper */}
              <div className="stepper-progress-header">
                <div className="stepper-pills-row">
                  <button
                    type="button"
                    className={`stepper-stage-btn ${step === 1 ? 'is-active' : step > 1 ? 'is-completed' : ''}`}
                    onClick={() => setStep(1)}
                  >
                    <span className="stage-number">{step > 1 ? <Check size={12} strokeWidth={3} /> : '1'}</span>
                    <span className="stage-text">Symptoms</span>
                  </button>

                  <div className="stepper-connector-line" />

                  <button
                    type="button"
                    className={`stepper-stage-btn ${step === 2 ? 'is-active' : step > 2 ? 'is-completed' : ''}`}
                    onClick={() => {
                      if (answeredCount >= 3) setStep(2)
                    }}
                  >
                    <span className="stage-number">{step > 2 ? <Check size={12} strokeWidth={3} /> : '2'}</span>
                    <span className="stage-text">Lifestyle</span>
                  </button>

                  <div className="stepper-connector-line" />

                  <button
                    type="button"
                    className={`stepper-stage-btn ${step === 3 ? 'is-active' : ''}`}
                    onClick={() => {
                      if (answeredCount >= 3) setStep(3)
                    }}
                  >
                    <span className="stage-number">3</span>
                    <span className="stage-text">Report</span>
                  </button>
                </div>

                {/* Progress bar line */}
                <div className="stepper-fill-track" aria-hidden="true">
                  <div
                    className="stepper-fill-bar"
                    style={{
                      width: `${step === 1 ? (answeredCount / totalSymptoms) * 33.3 : step === 2 ? 66.6 : 100}%`
                    }}
                  />
                </div>
              </div>

              {/* STEP 1: SYMPTOM CLUSTERS */}
              {step === 1 && (
                <div className="wizard-step-container animate-fadeIn">
                  <div className="step-intro-bar">
                    <div>
                      <span className="step-tag-pill">STEP 1 OF 3</span>
                      <h2 className="step-main-heading">Symptom Frequency Mapping</h2>
                      <p className="step-sub-desc">
                        Select how often you experience each symptom in a typical week. Answer all questions to continue.
                      </p>
                    </div>
                    <div className="answered-counter-pill">
                      <span>{answeredCount} / {totalSymptoms} Answered</span>
                    </div>
                  </div>

                  <div className="clusters-wrapper">
                    {SYMPTOM_CLUSTERS.map((cluster) => (
                      <div key={cluster.categoryKey} className="symptom-cluster-group">
                        <div className="cluster-header">
                          <h3 className="cluster-title">{cluster.categoryName}</h3>
                          <p className="cluster-desc">{cluster.categoryDesc}</p>
                        </div>

                        <div className="cluster-symptoms-list">
                          {cluster.items.map((symptom) => {
                            const currentVal = symptomAnswers[symptom.id]
                            const isAnswered = currentVal !== undefined

                            return (
                              <div
                                key={symptom.id}
                                className={`symptom-item-card ${isAnswered ? 'has-answer' : ''}`}
                              >
                                <div className="symptom-info">
                                  <h4 className="symptom-name">{symptom.title}</h4>
                                  <p className="symptom-desc">{symptom.subtitle}</p>
                                </div>

                                <div
                                  className="severity-pill-selector"
                                  role="radiogroup"
                                  aria-label={symptom.title}
                                >
                                  {SEVERITY_LEVELS.map((sev) => {
                                    const isSelected = currentVal === sev.value

                                    return (
                                      <button
                                        key={sev.text}
                                        type="button"
                                        className={`severity-option-btn ${isSelected ? 'is-selected' : ''}`}
                                        onClick={() => handleSymptomSelect(symptom.id, sev.value)}
                                        role="radio"
                                        aria-checked={isSelected}
                                      >
                                        <span className="btn-full-text">{sev.text}</span>
                                      </button>
                                    )
                                  })}
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="wizard-action-footer">
                    <button
                      type="button"
                      className="btn-wizard-primary"
                      disabled={answeredCount !== totalSymptoms}
                      onClick={() => {
                        setStep(2)
                        window.scrollTo({ top: 200, behavior: 'smooth' })
                      }}
                    >
                      <span>Continue to Lifestyle & Hydration</span>
                      <ArrowRight size={17} strokeWidth={2.2} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: LIFESTYLE & HYDRATION */}
              {step === 2 && (
                <div className="wizard-step-container animate-fadeIn">
                  <div className="step-intro-bar">
                    <div>
                      <span className="step-tag-pill">STEP 2 OF 3</span>
                      <h2 className="step-main-heading">Hydration & Lifestyle Context</h2>
                      <p className="step-sub-desc">
                        Tell us about your daily habits to add context to your answers.
                      </p>
                    </div>
                  </div>

                  <div className="lifestyle-sections-stack">
                    {/* Water intake */}
                    <div className="lifestyle-card-box">
                      <label className="box-label">
                        <Droplet size={17} className="box-icon" aria-hidden="true" />
                        <span>Daily Water Intake</span>
                      </label>
                      <div className="water-grid">
                        {WATER_OPTIONS.map((w) => {
                          const isSelected = waterIntake === w.label
                          return (
                            <button
                              key={w.label}
                              type="button"
                              className={`water-option-card ${isSelected ? 'is-selected' : ''}`}
                              onClick={() => setWaterIntake(w.label)}
                            >
                              <span className="water-title">{w.label}</span>
                              <span className="water-subtext">{w.sub}</span>
                              {isSelected && <Check size={14} className="selected-check-icon" />}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Diet Type */}
                    <div className="lifestyle-card-box">
                      <label className="box-label">
                        <Compass size={17} className="box-icon" aria-hidden="true" />
                        <span>Primary Food Lifestyle</span>
                      </label>
                      <div className="chips-flex-row">
                        {DIET_TYPES.map((diet) => (
                          <button
                            key={diet}
                            type="button"
                            className={`choice-chip-btn ${dietType === diet ? 'is-selected' : ''}`}
                            onClick={() => setDietType(diet)}
                          >
                            {diet}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Age group */}
                    <div className="lifestyle-card-box">
                      <label className="box-label">
                        <User size={17} className="box-icon" aria-hidden="true" />
                        <span>Age Bracket</span>
                      </label>
                      <div className="chips-flex-row">
                        {AGE_GROUPS.map((age) => (
                          <button
                            key={age}
                            type="button"
                            className={`choice-chip-btn ${ageGroup === age ? 'is-selected' : ''}`}
                            onClick={() => setAgeGroup(age)}
                          >
                            {age}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Diagnosed conditions */}
                    <div className="lifestyle-card-box">
                      <label className="box-label">
                        <FileText size={17} className="box-icon" aria-hidden="true" />
                        <span>Any diagnosed conditions? (Select all that apply)</span>
                      </label>
                      <div className="chips-flex-row">
                        {['IBS / SIBO', 'Acidity / GERD', 'PCOS / PCOD', 'Thyroid', 'Type 2 Diabetes', 'Fatty Liver', 'None'].map(
                          (cond) => {
                            const isSelected = diagnosedConditions.includes(cond)
                            return (
                              <button
                                key={cond}
                                type="button"
                                className={`choice-chip-btn ${isSelected ? 'is-selected' : ''}`}
                                onClick={() => toggleCondition(cond)}
                              >
                                {isSelected && <Check size={13} className="inline-check" />}
                                <span>{cond}</span>
                              </button>
                            )
                          }
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="wizard-action-footer dual-button-footer">
                    <button
                      type="button"
                      className="btn-wizard-secondary"
                      onClick={() => setStep(1)}
                    >
                      <ArrowLeft size={16} strokeWidth={2.2} />
                      <span>Back to Symptoms</span>
                    </button>
                    <button
                      type="button"
                      className="btn-wizard-primary"
                      onClick={() => {
                        setStep(3)
                        window.scrollTo({ top: 200, behavior: 'smooth' })
                      }}
                    >
                      <span>Proceed to Your Gut Report</span>
                      <ArrowRight size={17} strokeWidth={2.2} />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: CONTACT FORM & SCORE GENERATION */}
              {step === 3 && (
                <div className="wizard-step-container animate-fadeIn">
                  <div className="step-intro-bar">
                    <div>
                      <span className="step-tag-pill">STEP 3 OF 3</span>
                      <h2 className="step-main-heading">View Your Symptom Summary</h2>
                      <p className="step-sub-desc">
                        Enter your details if you wish, then view a summary based on your answers. Your name, goal and summary are included only if you choose to open the WhatsApp link.
                      </p>
                    </div>
                  </div>

                  <form
                    className="contact-fields-grid"
                    onSubmit={(e) => {
                      e.preventDefault()
                      setIsCalculated(true)
                      window.scrollTo({ top: 150, behavior: 'smooth' })
                    }}
                  >
                    <div className="form-field-group">
                      <label htmlFor="user-name" className="input-label">
                        <User size={15} />
                        <span>Your Full Name (Optional)</span>
                      </label>
                      <input
                        id="user-name"
                        type="text"
                        className="clinical-text-input"
                        placeholder="e.g. Ananya Iyer"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>

                    <div className="form-field-group">
                      <label htmlFor="user-phone" className="input-label">
                        <Phone size={15} />
                        <span>WhatsApp Number (Optional)</span>
                      </label>
                      <input
                        id="user-phone"
                        type="tel"
                        inputMode="tel"
                        className="clinical-text-input"
                        placeholder="e.g. 9876543210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>

                    <div className="form-field-group span-full">
                      <label htmlFor="user-email" className="input-label">
                        <Mail size={15} />
                        <span>Email Address (Optional)</span>
                      </label>
                      <input
                        id="user-email"
                        type="email"
                        className="clinical-text-input"
                        placeholder="e.g. ananya@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    <div className="form-field-group span-full">
                      <label htmlFor="user-goal" className="input-label">
                        <Compass size={15} />
                        <span>Primary Health Priority</span>
                      </label>
                      <select
                        id="user-goal"
                        className="clinical-select-input"
                        value={formData.goal}
                        onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                      >
                        {GOALS.map((g) => (
                          <option key={g} value={g}>
                            {g}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="privacy-assurance-note span-full">
                      <ShieldCheck size={15} className="shield-icon" aria-hidden="true" />
                      <span>Your answers remain in this browser. The WhatsApp link shares your name, goal and summary; your phone number, email and other answers are not included.</span>
                    </div>

                    <div className="wizard-action-footer dual-button-footer span-full">
                      <button
                        type="button"
                        className="btn-wizard-secondary"
                        onClick={() => setStep(2)}
                      >
                        <ArrowLeft size={16} strokeWidth={2.2} />
                        <span>Back</span>
                      </button>
                      <button
                        type="submit"
                        className="btn-wizard-primary"
                      >
                        <Sparkles size={17} strokeWidth={2.2} />
                        <span>View My Summary</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: STICKY CLINICAL BAROMETER */}
            <aside className="assessment-sidebar-pane">
              <div className="sticky-sidebar-content">
                {/* Live Dynamic Score Gauge Card */}
                <div className="sidebar-gauge-card" style={{ borderColor: emotionTier.color }}>
                  <div
                    className="gauge-status-badge"
                    style={{ backgroundColor: emotionTier.bgTint, color: emotionTier.color }}
                  >
                    <EmotionIcon size={16} strokeWidth={2.5} />
                    <span>{answeredCount === totalSymptoms ? `SUMMARY: ${emotionTier.statusTag.toUpperCase()}` : 'ANSWER ALL SYMPTOMS FOR A SUMMARY'}</span>
                  </div>

                  <div className="gauge-circle-wrap">
                    <svg className="gauge-svg-ring" width="136" height="136" viewBox="0 0 136 136" aria-hidden="true">
                      <circle className="gauge-bg-ring" cx="68" cy="68" r="52" fill="none" strokeWidth="10" />
                      <circle
                        className="gauge-fill-ring"
                        cx="68"
                        cy="68"
                        r="52"
                        fill="none"
                        stroke={emotionTier.color}
                        strokeWidth="10"
                        strokeDasharray={circumference}
                        strokeDashoffset={answeredCount === totalSymptoms ? strokeDashoffset : circumference}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="gauge-center-text">
                      <span className="gauge-big-num">{answeredCount === totalSymptoms ? score : '—'}</span>
                      <span className="gauge-denom">/ 100</span>
                    </div>
                  </div>

                  <div className="gauge-tier-meta">
                    <span className="tier-emoji-icon">{emotionTier.emoji}</span>
                    <h3 className="tier-title" style={{ color: emotionTier.color }}>
                      {answeredCount === totalSymptoms ? emotionTier.label : 'Summary in progress'}
                    </h3>
                    <p className="tier-mood-text">
                      <strong>Response summary:</strong> {answeredCount === totalSymptoms ? emotionTier.mood : 'Complete all symptom questions'}
                    </p>
                    <p className="tier-desc-text">{answeredCount === totalSymptoms ? emotionTier.shortDesc : 'The quiz score summarises your answers and is not a diagnosis.'}</p>
                  </div>
                </div>

                {/* Specialist Clinical Credibility Card */}
                <div className="sidebar-credibility-card">
                  <div className="card-top-header">
                    <div className="avatar-seal" aria-hidden="true">
                      <span>MB</span>
                    </div>
                    <div className="avatar-meta">
                      <h4 className="specialist-name">Meenu Balaji, M.H.Sc.</h4>
                      <span className="specialist-role">Chief Clinical Nutritionist • 14+ Yrs</span>
                    </div>
                  </div>
                  <p className="specialist-philosophy">
                    Pragmatic Nutrition offers personalised plans built around real food, daily routines and individual goals.
                  </p>
                  <div className="specialist-tags-row">
                    <span className="spec-badge">ICAR & UGC NET JRF</span>
                    <span className="spec-badge">Peer Reviewer EJN</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        ) : (
          /* =========================================================================
             3. RESULT DASHBOARD: CLINICAL REPORT, EMOTIONAL GAUGE, METRICS & ACTION
             ========================================================================= */
          <div className="assessment-report-dashboard animate-fadeIn">
            <div className="report-main-panel" style={{ borderColor: emotionTier.color }}>
              {/* Header Row: Score + Greeting */}
              <div className="report-header-banner">
                <div className="report-header-left">
                  <div
                    className="report-tier-pill"
                    style={{ backgroundColor: emotionTier.bgTint, color: emotionTier.color }}
                  >
                    <EmotionIcon size={18} strokeWidth={2.4} />
                    <span>{emotionTier.label}</span>
                  </div>

                  <h2 className="report-patient-greeting">
                    {formData.name ? `${formData.name}'s Symptom Summary` : 'Your Symptom Summary'}
                  </h2>

                  <p className="report-mood-line">
                    <strong>Response summary:</strong> {emotionTier.emoji} {emotionTier.mood}
                  </p>

                  <p className="report-summary-advice">{emotionTier.actionAdvice}</p>
                </div>

                <div className="report-header-right">
                  <div className="report-hero-gauge">
                    <svg className="report-gauge-svg" width="160" height="160" viewBox="0 0 160 160" aria-hidden="true">
                      <circle className="gauge-bg-ring" cx="80" cy="80" r="60" fill="none" strokeWidth="12" />
                      <circle
                        className="gauge-fill-ring"
                        cx="80"
                        cy="80"
                        r="60"
                        fill="none"
                        stroke={emotionTier.color}
                        strokeWidth="12"
                        strokeDasharray={2 * Math.PI * 60}
                        strokeDashoffset={(2 * Math.PI * 60) - (score / 100) * (2 * Math.PI * 60)}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="gauge-center-text">
                      <span className="report-score-num">{score}</span>
                      <span className="report-score-denom">/ 100</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Core 3 Biomarker Breakdown Cards */}
              <p>The total also includes your selected water intake. The percentages below summarise your answers within each question group. These numbers are not validated health measurements and do not measure organ function, blood sugar or other biomarkers.</p>
              <div className="report-metrics-grid">
                <div className="metric-pillar-box">
                  <div className="pillar-top-row">
                    <span className="pillar-title">
                      <Activity size={16} className="pillar-icon" />
                      Digestive Symptoms
                    </span>
                    <span className="pillar-score" style={{ color: digestionScore >= 75 ? '#55883B' : '#9A6735' }}>
                      {digestionScore}%
                    </span>
                  </div>
                  <div className="pillar-progress-track">
                    <div
                      className="pillar-progress-fill"
                      style={{
                        width: `${digestionScore}%`,
                        backgroundColor: digestionScore >= 75 ? '#55883B' : '#9A6735'
                      }}
                    />
                  </div>
                  <span className="pillar-status-note">
                    {digestionScore >= 75 ? 'Fewer symptoms reported in this group' : 'More symptoms reported in this group'}
                  </span>
                </div>

                <div className="metric-pillar-box">
                  <div className="pillar-top-row">
                    <span className="pillar-title">
                      <HeartPulse size={16} className="pillar-icon" />
                      Energy & Focus
                    </span>
                    <span className="pillar-score" style={{ color: gutBrainScore >= 75 ? '#55883B' : '#9A6735' }}>
                      {gutBrainScore}%
                    </span>
                  </div>
                  <div className="pillar-progress-track">
                    <div
                      className="pillar-progress-fill"
                      style={{
                        width: `${gutBrainScore}%`,
                        backgroundColor: gutBrainScore >= 75 ? '#55883B' : '#9A6735'
                      }}
                    />
                  </div>
                  <span className="pillar-status-note">
                    {gutBrainScore >= 75 ? 'Fewer symptoms reported in this group' : 'More symptoms reported in this group'}
                  </span>
                </div>

                <div className="metric-pillar-box">
                  <div className="pillar-top-row">
                    <span className="pillar-title">
                      <Flame size={16} className="pillar-icon" />
                      Cravings & Skin
                    </span>
                    <span className="pillar-score" style={{ color: metabolicScore >= 75 ? '#55883B' : '#9A6735' }}>
                      {metabolicScore}%
                    </span>
                  </div>
                  <div className="pillar-progress-track">
                    <div
                      className="pillar-progress-fill"
                      style={{
                        width: `${metabolicScore}%`,
                        backgroundColor: metabolicScore >= 75 ? '#55883B' : '#9A6735'
                      }}
                    />
                  </div>
                  <span className="pillar-status-note">
                    {metabolicScore >= 75 ? 'Fewer symptoms reported in this group' : 'More symptoms reported in this group'}
                  </span>
                </div>
              </div>

              {/* Food-First Clinical Guidance Protocols */}
              <div className="report-food-protocol-box">
                <div className="protocol-box-header">
                  <Sparkles size={18} className="protocol-header-icon" />
                  <h3 className="protocol-box-title">General Next Steps</h3>
                </div>
                <div className="protocols-four-grid">
                  {emotionTier.foodProtocols.map((item, idx) => (
                    <div key={idx} className="protocol-mini-card">
                      <span className="protocol-idx">0{idx + 1}</span>
                      <h4 className="protocol-name">{item.title}</h4>
                      <p className="protocol-desc">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="report-actions-toolbar">
                <a
                  className="btn-action-wa"
                  href={wa(
                    `Hi Meenu, I just completed the Gut Health Assessment Quiz! My self-report quiz summary is ${score}/100 (${emotionTier.label}). Primary Goal: ${formData.goal}. Name: ${formData.name}. I would love to review my symptoms with you.`
                  )}
                  target="_blank"
                  rel="noreferrer"
                >
                  <WhatsAppIcon size={19} />
                  <span>Discuss Report on WhatsApp with Meenu</span>
                </a>

                <button
                  type="button"
                  className="btn-action-primary"
                  onClick={openBook}
                >
                  <Calendar size={17} strokeWidth={2.2} />
                  <span>Book Free 15-Min Discovery Call</span>
                </button>

                <button
                  type="button"
                  className="btn-action-ghost"
                  onClick={handleRetake}
                >
                  <RotateCcw size={16} strokeWidth={2} />
                  <span>Retake Assessment</span>
                </button>
              </div>

              {/* Medical Disclaimer Footnote */}
              <div className="report-disclaimer-row">
                <Info size={14} className="disclaimer-icon" aria-hidden="true" />
                <p className="disclaimer-text">
                  This self-report quiz uses an unvalidated score to summarise answers. It cannot diagnose a condition, measure organ function or rule out illness. Consult a qualified healthcare professional about persistent or concerning symptoms.
                </p>
              </div>
            </div>
          </div>
        )}
      </Section>
    </div>
  )
}
