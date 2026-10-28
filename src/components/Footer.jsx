import { Link, useLocation } from 'react-router-dom'
import WhatsAppIcon from './WhatsAppIcon'
import SocialLinks from './SocialLinks'
import {
  wa,
  PHONE,
  EMAIL,
  HPR_ID,
  MEDICAL_DISCLAIMER,
  RESULTS_DISCLAIMER,
  FOOTER_NAV,
  LEGAL_LINKS,
  SOCIAL_LINKS
} from '../data/site'
import logoImg from '../assets/Pragmatic_logo.png'

export default function Footer() {
  const location = useLocation()

  return (
    <footer className="osmo-footer editorial-footer-section" role="contentinfo">
      <div className="osmo-footer-container">
        
        {/* Top 4-Column Grid: Brand, Quick Links, Clinical Services, Contact Us */}
        <div className="osmo-footer-top-grid">
          
          {/* 1. Brand Column */}
          <div className="osmo-footer-col osmo-brand-col">
            <Link className="osmo-footer-logo-wrap" to="/" aria-label="Pragmatic Nutrition Home">
              <img src={logoImg} alt="Pragmatic Nutrition - Meenu Balaji" className="osmo-footer-logo-img" />
            </Link>
            <p className="osmo-brand-desc">
              Personalised, evidence-based nutrition support for Gut Health, Sports Nutrition, and Clinical Care.
            </p>
            <p className="osmo-brand-founder">
              Founded & led by <strong>Meenu Balaji, M.H.Sc</strong>. 14+ years of clinical practice.
            </p>
            <div className="osmo-brand-action">
              <a
                className="osmo-wa-pill-btn"
                href={wa('Hi Meenu, I would like to inquire about nutrition plans.')}
                target="_blank"
                rel="noreferrer"
                aria-label="Direct WhatsApp Inquiry with Meenu Balaji"
              >
                <WhatsAppIcon size={16} className="osmo-btn-icon" />
                <span>WHATSAPP INQUIRY</span>
                <svg className="osmo-btn-arrow" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
            </div>
          </div>

          {/* 2 & 3. Navigation Columns (Quick Links, Clinical Services) */}
          {FOOTER_NAV.map((col) => (
            <div key={col.title} className="osmo-footer-col">
              <h3 className="osmo-col-header">{col.title}</h3>
              <ul className="osmo-link-list">
                {col.links.map((link) => {
                  const isActive = location.pathname === link.to
                  return (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className={`osmo-footer-link ${isActive ? 'active-link' : ''}`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}

          {/* 4. Contact Us Column (matches user's reference image exactly) */}
          <div className="osmo-footer-col osmo-contact-col">
            <h3 className="osmo-col-header osmo-contact-header">Contact Us</h3>
            <div className="osmo-contact-list">
              
              {/* Address */}
              <div className="osmo-contact-row">
                <svg className="osmo-contact-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <div className="osmo-contact-address">
                  <span>Five Furlong Road,</span>
                  <span>Guindy,</span>
                  <span>Chennai- 600032</span>
                </div>
              </div>

              {/* Email */}
              <div className="osmo-contact-row">
                <svg className="osmo-contact-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <a className="osmo-contact-link" href={`mailto:${EMAIL}`}>
                  {EMAIL}
                </a>
              </div>

              {/* Phone */}
              <div className="osmo-contact-row">
                <svg className="osmo-contact-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <a className="osmo-contact-link" href={`tel:${PHONE.replace(/\s+/g, '')}`}>
                  {PHONE}
                </a>
              </div>

              {/* Social Icons Row */}
              <SocialLinks className="osmo-social-icons-row" itemClassName="osmo-social-icon-btn" size={22} />

            </div>
          </div>

        </div>

        {/* Giant Watermark Signature Feature */}
        <div className="osmo-wordmark-container" aria-hidden="true">
          <span className="osmo-giant-wordmark">Pragmatic</span>
        </div>

        {/* Bottom Bar: Copyright, Legal Links, HPR ID & Disclaimers */}
        <div className="osmo-footer-bottom">
          <div className="osmo-bottom-bar">
            <span className="osmo-copyright">
              © {new Date().getFullYear()} PRAGMATIC NUTRITION. ALL RIGHTS RESERVED.
            </span>

            <div className="osmo-legal-links" aria-label="Legal policies">
              {LEGAL_LINKS.map((link) => (
                <Link key={link.to} to={link.to} className="osmo-legal-link">
                  {link.label}
                </Link>
              ))}
            </div>

            <span className="osmo-hpr-meta">
              HPR ID: {HPR_ID}
            </span>
          </div>

          <div className="osmo-disclaimer-wrap">
            <p className="osmo-disclaimer-text">
              {MEDICAL_DISCLAIMER}
            </p>
            <p className="osmo-results-note">
              *{RESULTS_DISCLAIMER}
            </p>
          </div>
        </div>

      </div>
    </footer>
  )
}
