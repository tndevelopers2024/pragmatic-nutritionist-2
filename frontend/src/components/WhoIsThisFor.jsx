import { Link } from 'react-router-dom'
import { CheckCircle2, Clock } from 'lucide-react'

export default function WhoIsThisFor() {
  return (
    <section className="who-for-section" id="who-is-this-for" aria-label="Who Is This For and What Working With Me Looks Like">
      <div className="who-for-container">
        
        {/* Block 1: Who Is This For? */}
        <div className="who-for-block">
          <div className="who-for-header">
            <span className="who-for-eyebrow">CLINICAL FIT &amp; AUDIENCE</span>
            <h2 className="who-for-title">Who Is This For?</h2>
            <p className="who-for-lead">
              For people who want nutrition to make sense for their lives. At Pragmatic Nutrition, I work with individuals and families who:
            </p>
          </div>

          <div className="who-for-cards-grid">
            {/* 1. Gut concerns */}
            <div className="who-for-card">
              <div className="who-for-check-icon" aria-hidden="true">
                <CheckCircle2 size={20} strokeWidth={2.4} />
              </div>
              <div className="who-for-card-content">
                <p>
                  Are navigating gut concerns such as{' '}
                  <Link to="/gut-health/ibs-bloating" className="inline-topic-link">IBS</Link>,{' '}
                  <Link to="/gut-health/ibs-bloating" className="inline-topic-link">bloating</Link>,{' '}
                  <Link to="/gut-health/acidity-gerd" className="inline-topic-link">acidity</Link>, or{' '}
                  <Link to="/gut-health/constipation-digestion" className="inline-topic-link">constipation</Link>.
                </p>
              </div>
            </div>

            {/* 2. Sports performance */}
            <div className="who-for-card">
              <div className="who-for-check-icon" aria-hidden="true">
                <CheckCircle2 size={20} strokeWidth={2.4} />
              </div>
              <div className="who-for-card-content">
                <p>
                  Want practical nutrition support for{' '}
                  <Link to="/sports-nutrition" className="inline-topic-link">sports performance</Link>, recovery, and growth.
                </p>
              </div>
            </div>

            {/* 3. PCOS & metabolic conditions */}
            <div className="who-for-card">
              <div className="who-for-check-icon" aria-hidden="true">
                <CheckCircle2 size={20} strokeWidth={2.4} />
              </div>
              <div className="who-for-card-content">
                <p>
                  Are managing{' '}
                  <Link to="/more-care/pcos" className="inline-topic-link">PCOS</Link>,{' '}
                  <span className="inline-highlight-text">thyroid conditions</span>, or other{' '}
                  <Link to="/more-care/diabetes" className="inline-topic-link">diabetes</Link>.
                </p>
              </div>
            </div>

            {/* 4. Children and teens / ADHD */}
            <div className="who-for-card">
              <div className="who-for-check-icon" aria-hidden="true">
                <CheckCircle2 size={20} strokeWidth={2.4} />
              </div>
              <div className="who-for-card-content">
                <p>
                  Want thoughtful nutrition support for children and teens, including those with{' '}
                  <Link to="/more-care/child-teen-nutrition" className="inline-topic-link">ADHD</Link>-related challenges.
                </p>
              </div>
            </div>

            {/* 5. Multiple diets struggle */}
            <div className="who-for-card">
              <div className="who-for-check-icon" aria-hidden="true">
                <CheckCircle2 size={20} strokeWidth={2.4} />
              </div>
              <div className="who-for-card-content">
                <p>
                  Have tried multiple diets but struggle to maintain long-term results.
                </p>
              </div>
            </div>

            {/* 6. Overwhelmed by conflicting advice */}
            <div className="who-for-card">
              <div className="who-for-check-icon" aria-hidden="true">
                <CheckCircle2 size={20} strokeWidth={2.4} />
              </div>
              <div className="who-for-card-content">
                <p>
                  Feel overwhelmed by conflicting nutrition advice and want clarity grounded in evidence.
                </p>
              </div>
            </div>

            {/* 7. Enjoy familiar Indian foods */}
            <div className="who-for-card card-full-span">
              <div className="who-for-check-icon" aria-hidden="true">
                <CheckCircle2 size={20} strokeWidth={2.4} />
              </div>
              <div className="who-for-card-content">
                <p>
                  Want to enjoy familiar Indian foods without rigid, unrealistic meal plans.
                </p>
              </div>
            </div>
          </div>

          {/* Empathy Reflection Box */}
          <div className="who-for-empathy-box">
            <p className="empathy-quote-text">
              Many clients come to me after doing everything they believe is right, yet still feeling stuck. My role is to help them make sense of their individual needs and find a practical way forward.
            </p>
          </div>
        </div>

        {/* Block 2: What Working With Me Looks Like */}
        <div className="working-with-me-block">
          <div className="working-header-row">
            <span className="working-eyebrow">THE CONSULTATION EXPERIENCE</span>
            <h2 className="working-title">
              What <em>Working With Me</em> Looks Like
            </h2>
          </div>

          <div className="working-card-editorial">
            <div className="working-highlight-pill">
              <Clock size={15} className="pill-clock-icon" aria-hidden="true" />
              <span>45-MINUTE DEEP DIVE &bull; NOT A QUICK INTAKE FORM</span>
            </div>

            <p className="working-lead-paragraph">
              Every client starts with a 45 minute session, not a quick intake form. We go deep into your history: when things started, what you've already tried, what's worked and what hasn't, and where you are with your symptoms today. Because health isn't just about diet, we also talk through stress, sleep, hormone function, and gut-brain signaling &mdash; the full picture, before we even get to what's on your plate. Diet recommendations come after I actually understand you, not before.
            </p>

            <div className="working-pillars-row" aria-label="Consultation Milestones">
              <div className="working-pillar-item">
                <div className="pillar-num">01</div>
                <div className="pillar-content">
                  <strong className="pillar-title">Deep Symptom History</strong>
                  <span className="pillar-desc">When symptoms began, previous interventions, and current baseline.</span>
                </div>
              </div>

              <div className="working-pillar-item">
                <div className="pillar-num">02</div>
                <div className="pillar-content">
                  <strong className="pillar-title">Holistic Biological Picture</strong>
                  <span className="pillar-desc">Stress markers, sleep patterns, hormone function &amp; gut-brain signaling.</span>
                </div>
              </div>

              <div className="working-pillar-item">
                <div className="pillar-num">03</div>
                <div className="pillar-content">
                  <strong className="pillar-title">Understanding Before Advice</strong>
                  <span className="pillar-desc">Targeted, food-first recommendations tailored only after truly understanding you.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
