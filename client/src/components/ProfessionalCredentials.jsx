import { ExternalLink, Award, BookCheck, ShieldCheck } from 'lucide-react'
import credentialsVisual from '../assets/credentials-clinical-visual.jpg'

function BotanicalMarker() {
  return (
    <svg
      className="credential-botanical-marker"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 21V10"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M12 14C12 14 7.5 13.5 5 9.5C2.5 5.5 4 2 4 2C4 2 7.5 3.5 9.5 6C11.5 8.5 12 14 12 14Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M12 11C12 11 16.5 10.5 19 6.5C21.5 2.5 20 2 20 2C20 2 16.5 3.5 14.5 6C12.5 8.5 12 11 12 11Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function ProfessionalCredentials() {
  return (
    <section className="professional-credentials-section" aria-label="Professional Credentials">
      <div className="professional-credentials-container">
        
        {/* Section Header */}
        <div className="credentials-section-header">
          <span className="credentials-eyebrow">
            <Award size={14} className="eyebrow-icon" />
            ACADEMIC EXCELLENCE &amp; CLINICAL STANDING
          </span>
          <h2 className="professional-credentials-heading">Professional Credentials</h2>
        </div>

        {/* 2-Column Layout: Credentials List + Clinical Imagery */}
        <div className="credentials-split-layout">
          
          {/* Left Column: List of Verified Credentials */}
          <div className="credentials-list-column">
            <ul className="professional-credentials-list">
              <li className="professional-credential-item">
                <BotanicalMarker />
                <div className="credential-content-wrap">
                  <span className="credential-text">M.H.Sc Food Science &amp; Nutrition</span>
                </div>
              </li>

              <li className="professional-credential-item">
                <BotanicalMarker />
                <div className="credential-content-wrap">
                  <span className="credential-text">UGC NET JRF, ICAR JRF</span>
                </div>
              </li>

              <li className="professional-credential-item">
                <BotanicalMarker />
                <div className="credential-content-wrap">
                  <span className="credential-text">ISSA certified Sports Nutritionist</span>
                </div>
              </li>

              <li className="professional-credential-item">
                <BotanicalMarker />
                <div className="credential-content-wrap">
                  <span className="credential-text">Harvard Medical School CME: Lifestyle Medicine</span>
                </div>
              </li>

              <li className="professional-credential-item">
                <BotanicalMarker />
                <div className="credential-content-wrap">
                  <span className="credential-text">
                    Peer Reviewer, European Journal of Nutrition: 35+ manuscripts reviewed since 2017 (Publons-verified),{' '}
                    <a
                      href="https://orcid.org/0000-0003-3287-5656"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="credential-orcid-link"
                    >
                      https://orcid.org/0000-0003-3287-5656
                      <ExternalLink size={13} className="orcid-ext-icon" aria-hidden="true" />
                    </a>
                  </span>
                </div>
              </li>

              <li className="professional-credential-item">
                <BotanicalMarker />
                <div className="credential-content-wrap">
                  <span className="credential-text">
                    Life member of IAPEN (Indian Association of Enteral &amp; Parenteral Nutrition)
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* Right Column: Visual Showcase with Verified Badges */}
          <div className="credentials-visual-column">
            <div className="credentials-image-frame">
              <img
                src={credentialsVisual}
                alt="Clinical nutrition textbooks, peer-reviewed journals, and health dashboard"
                className="credentials-image"
                loading="lazy"
              />
              
              {/* Floating Verified Badges */}
              <div className="credentials-floating-badge badge-top">
                <BookCheck size={18} className="badge-icon-teal" />
                <div>
                  <strong>Publons-Verified Reviewer</strong>
                  <span>35+ Manuscripts Reviewed</span>
                </div>
              </div>

              <div className="credentials-floating-badge badge-bottom">
                <ShieldCheck size={18} className="badge-icon-gold" />
                <div>
                  <strong>Harvard CME &amp; ISSA Certified</strong>
                  <span>Evidence-Based Clinical Practice</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
