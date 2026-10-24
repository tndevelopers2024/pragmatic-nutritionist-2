import { Quote, Sparkles, ShieldAlert, HeartHandshake } from 'lucide-react'
import consultationVisual from '../assets/philosophy-consultation-visual.jpg'

export default function PersonalPhilosophy() {
  return (
    <section className="personal-philosophy-section" aria-label="Personal Philosophy">
      <div className="personal-philosophy-container">
        
        {/* Editorial Opening Callout */}
        <div className="philosophy-opening-banner">
          <div className="philosophy-quote-mark" aria-hidden="true">
            <Quote size={32} />
          </div>
          <p className="personal-philosophy-opening">
            I don't believe nutrition should be complicated to be effective.
          </p>
        </div>

        {/* Story Section 1: Classroom to Real-Life Practice (Split Layout with Image) */}
        <div className="philosophy-story-grid">
          
          <div className="philosophy-narrative-col">
            <p>
              My interest in nutrition started in the classroom. I was genuinely fascinated by human metabolism and biochemistry during my Master's, the sheer mechanics of how the body processes what we eat. But theory is where it started, not where it stayed.
            </p>

            <p>
              What actually changed the direction of my career was watching it work in real life. Early in practice, working with clients on weight loss and diabetes management, I started seeing something research papers don't fully prepare you for: people's medication dosages coming down, their energy returning, their quality of life visibly shifting — not in the abstract, but in front of my eyes, consultation after consultation.
            </p>

            <p>
              Watching someone walk out of a session lighter, in every sense, and knowing the plan we built together got them there, that's the part that turned a scientific interest into the work I've now spent 14+ years on.
            </p>

            <p className="philosophy-highlight-lead">
              That's still what drives Pragmatic Nutrition today: evidence translated into something that can actually work in real life, for real people.
            </p>
          </div>

          <div className="philosophy-visual-col">
            <div className="philosophy-image-frame">
              <img
                src={consultationVisual}
                alt="Warm, one-on-one nutrition consultation discussing personalized nutrition"
                className="philosophy-image"
                loading="lazy"
              />
              <div className="philosophy-image-pill">
                <HeartHandshake size={16} className="pill-heart-icon" />
                <span>1-on-1 Personalized Care</span>
              </div>
            </div>
          </div>

        </div>

        {/* Story Section 2: Bio-Individuality & Real Results (Curated Editorial Cards) */}
        <div className="philosophy-cards-row">
          <div className="philosophy-card philosophy-card-bio">
            <div className="philosophy-card-icon-wrap" aria-hidden="true">
              <Sparkles size={20} />
            </div>
            <p>
              What's kept me in this work for 14+ years isn't just seeing results. It's the science behind why they happen. No two people respond to the same food the same way. That reaction is shaped by their stress levels, sleep, genetic markers, inflammation, and the uniqueness of their own gut microbiome.
            </p>
            <p>
              Understanding that bio-individuality and translating it into a plan that actually works for this person, not a generic template, is honestly what I find endlessly fascinating about this field.
            </p>
          </div>

          <div className="philosophy-card philosophy-card-results">
            <div className="philosophy-card-icon-wrap" aria-hidden="true">
              <Quote size={20} />
            </div>
            <p>
              And the results show up faster than most people expect. Clients often notice a shift in energy and lightness within a few weeks. Over a few months, IBS symptoms ease, or cholesterol and blood sugar numbers start moving in the right direction. Every time I see that shift — and the relief that comes with it. It's a reminder of exactly why I do this.
            </p>
          </div>
        </div>

        {/* Section 3: What You Won't Get From Me (Honest Practitioner Commitment) */}
        <div className="philosophy-wont-get-card">
          <div className="wont-get-header">
            <div className="wont-get-icon-badge" aria-hidden="true">
              <ShieldAlert size={22} />
            </div>
            <h3 className="personal-philosophy-subheading">
              What You Won't Get From Me
            </h3>
          </div>

          <div className="wont-get-content-grid">
            <div className="wont-get-item">
              <span className="wont-get-bullet-marker" aria-hidden="true" />
              <p>
                The nutrition industry has a pattern I actively work against: pushing expensive supplements and unnecessary tests before understanding what a client actually needs, or worse, not listening to their concerns at all before diagnosing them.
              </p>
            </div>

            <div className="wont-get-item">
              <span className="wont-get-bullet-marker" aria-hidden="true" />
              <p>
                I also stay firmly in my lane as a nutritionist rather than stepping into a doctor's role, and I don't make tall claims about miracle foods or miracle fixes, because they don't exist. What you get instead is someone who listens first, and builds a plan around your biology and your life.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
