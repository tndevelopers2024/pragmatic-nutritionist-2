import { BookOpen, Sparkles, Leaf, Activity } from 'lucide-react'

const PILLARS = [
  {
    id: 'evidence',
    title: 'Evidence, without losing practicality',
    icon: BookOpen,
    iconTheme: 'teal',
    number: '01',
    paragraphs: [
      'I use peer-reviewed nutrition research to inform my work, but research alone does not tell you what a person should eat on Tuesday morning in an Indian household.',
      "My role is to interpret the evidence, consider the individual's circumstances, and translate it into practical decisions."
    ]
  },
  {
    id: 'personalisation',
    title: 'Personalisation, not templates',
    icon: Sparkles,
    iconTheme: 'amber',
    number: '02',
    paragraphs: [
      'There is no universal "gut diet" or athlete meal plan. Two people with the same symptom, diagnosis or sport may have very different nutritional requirements.',
      'Plans are therefore built around the individual rather than selected from a fixed template.'
    ]
  },
  {
    id: 'real-life',
    title: 'Built for Real Life',
    icon: Leaf,
    iconTheme: 'mint',
    number: '03',
    paragraphs: [
      'Nutrition has to work outside the consultation room.',
      'I adapt recommendations to Indian food patterns, family routines, work schedules, travel, training and the foods people actually enjoy and can access.'
    ]
  },
  {
    id: 'behaviour',
    title: 'Behaviour Based Change & Habit Modification',
    icon: Activity,
    iconTheme: 'teal',
    number: '04',
    paragraphs: [
      'Building sustainable nutrition habits through personalised, behaviour-based strategies that address eating patterns, routines, and barriers to change.',
      'Translating nutrition knowledge into practical, consistent actions that support long-term gut health, sports performance, and overall well-being.'
    ]
  }
]

export default function ThinkingBehindPractice() {
  return (
    <section
      className="thinking-practice-section"
      id="thinking-behind-practice"
      aria-label="Thinking Behind the Practice"
    >
      <div className="thinking-practice-container">
        
        {/* Centered Editorial Header */}
        <div className="thinking-practice-header">
          <span className="thinking-practice-eyebrow">CLINICAL PHILOSOPHY</span>
          <h2 className="thinking-practice-title">Thinking Behind the Practice</h2>
          <p className="thinking-practice-lead">Nutrition should work in real life.</p>
        </div>

        {/* 4-Pillar Modern Card Grid */}
        <div className="thinking-practice-grid">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon
            return (
              <article
                key={pillar.id}
                className={`thinking-card thinking-card-${pillar.iconTheme}`}
              >
                <div className="thinking-card-top-row">
                  <div className={`thinking-icon-badge badge-${pillar.iconTheme}`} aria-hidden="true">
                    <Icon size={22} strokeWidth={2.2} />
                  </div>
                  <span className="thinking-card-number">{pillar.number}</span>
                </div>

                <h3 className="thinking-card-title">{pillar.title}</h3>

                <div className="thinking-card-body">
                  {pillar.paragraphs.map((p, idx) => (
                    <p
                      key={idx}
                      className={
                        idx === 0 && pillar.id === 'real-life'
                          ? 'thinking-lead-sentence'
                          : ''
                      }
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </article>
            )
          })}
        </div>

      </div>
    </section>
  )
}
