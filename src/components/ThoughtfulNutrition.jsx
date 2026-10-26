import { Link } from 'react-router-dom'
import { ChevronRight, HeartHandshake } from 'lucide-react'
import bgImage from '../assets/thoughtful-nutrition-bg.jpg'

export default function ThoughtfulNutrition() {
  return (
    <section
      className="thoughtful-nutrition-section"
      id="thoughtful-nutrition"
      aria-label="Thoughtful Nutrition Starts with Understanding You"
    >
      <div className="thoughtful-nutrition-bg-wrap" aria-hidden="true">
        <img
          src={bgImage}
          alt=""
          className="thoughtful-nutrition-bg-img"
          loading="lazy"
        />
        <div className="thoughtful-nutrition-overlay" />
      </div>

      <div className="thoughtful-nutrition-container">
        <div className="thoughtful-nutrition-card">
          
          {/* Eyebrow & Main Heading */}
          <div className="thoughtful-nutrition-header">
            <span className="thoughtful-eyebrow">
              <HeartHandshake size={15} className="thoughtful-eyebrow-icon" />
              EMPATHETIC, EVIDENCE-FIRST CARE
            </span>
            <h2 className="thoughtful-title">
              Thoughtful Nutrition Starts with Understanding You
            </h2>
          </div>

          {/* Golden Pill CTA Button matching reference */}
          <div className="thoughtful-cta-row">
            <Link
              to="/programs-pricing"
              className="thoughtful-programs-btn"
              aria-label="Explore our Programs"
            >
              <span>Explore our Programs</span>
              <ChevronRight size={18} strokeWidth={2.5} className="btn-arrow-icon" />
            </Link>
          </div>

          {/* Verbatim Body Paragraph */}
          <div className="thoughtful-body">
            <p className="thoughtful-body-text">
              <strong className="thoughtful-opening-prompt">Why work with me? </strong>
              Because I've been where you might be right now. I've dealt with my own health struggles — weight, gut issues, a chronic condition I've managed for over 16 years. If diet and lifestyle changes could bring me back to feeling like myself, I believe they can do the same for you.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
