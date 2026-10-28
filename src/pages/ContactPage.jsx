import { useState } from 'react'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2,
  Calendar,
  ShieldCheck,
  Globe2,
  ArrowRight
} from 'lucide-react'
import PageHero from '../components/PageHero'
import { useSeo } from '../components/Seo'
import { useBook } from '../context/bookContext'
import SocialLinks from '../components/SocialLinks'
import { PHONE, EMAIL, ADDRESS, HPR_ID, MAJOR_LOCATIONS, wa } from '../data/site'
import './contact.css'

export default function ContactPage() {
  useSeo(
    'Contact Pragmatic Nutrition | Get Expert Nutrition Advice & Support',
    "Don't hesitate to reach out! Get in touch with Meenu Balaji, M.H.Sc for clinical gut health, sports nutrition, and personalized diet support in Chennai and online worldwide."
  )

  const openBook = useBook()
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    concern: 'Gut Health (IBS, Bloating, Acidity, GERD)',
    mode: 'Online Consultation',
    message: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const inquiryWaUrl = wa(
    `Hi Meenu, I submitted an inquiry on Pragmatic Nutrition:\nName: ${formData.name || 'Client'}\nConcern: ${formData.concern}\nMode: ${formData.mode}\nNote: ${formData.message || 'I would like to consult with you.'}`
  )

  return (
    <div className="contact-page">
      <PageHero
        title="Contact Us"
        blurb="Stay connected with Pragmatic Nutrition. Don't hesitate to reach out — we're excited to hear from you and support you on your journey towards a healthier, happier you."
        badge="GET IN TOUCH"
      />

      <section className="contact-main-section">
        <div className="contact-container">
          <div className="contact-grid">
            {/* Left: Contact Info & Channels */}
            <div className="contact-info-col">
              <div className="contact-badge-pill">
                <Globe2 size={15} aria-hidden="true" />
                <span>India &amp; International Consultations</span>
              </div>

              <h2 className="contact-heading">We are here to support your health journey</h2>
              <p className="contact-subhead">
                Whether you need specialized gut recovery, athletic fuelling, child nutrition, or sustainable habit building, you can reach out directly via WhatsApp, call, or email.
              </p>

              <div className="contact-cards-list">
                {/* Phone & WhatsApp */}
                <div className="contact-channel-card">
                  <div className="contact-channel-icon whatsapp">
                    <MessageCircle size={22} aria-hidden="true" />
                  </div>
                  <div className="contact-channel-body">
                    <span className="contact-channel-label">Direct WhatsApp</span>
                    <a
                      href={wa('Hi Meenu, I would like to inquire about nutrition consultations.')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-channel-value"
                    >
                      {PHONE}
                    </a>
                    <p className="contact-channel-note">Fastest response time for appointments &amp; quick queries</p>
                  </div>
                </div>

                {/* Email */}
                <div className="contact-channel-card">
                  <div className="contact-channel-icon email">
                    <Mail size={22} aria-hidden="true" />
                  </div>
                  <div className="contact-channel-body">
                    <span className="contact-channel-label">Email Us</span>
                    <a href={`mailto:${EMAIL}`} className="contact-channel-value">
                      {EMAIL}
                    </a>
                    <p className="contact-channel-note">For comprehensive medical records &amp; corporate inquiries</p>
                  </div>
                </div>

                {/* Clinic Address */}
                <div className="contact-channel-card">
                  <div className="contact-channel-icon map">
                    <MapPin size={22} aria-hidden="true" />
                  </div>
                  <div className="contact-channel-body">
                    <span className="contact-channel-label">Clinic Location</span>
                    <address className="contact-channel-value not-italic">
                      {ADDRESS}
                    </address>
                    <p className="contact-channel-note">In-person consultations available by prior appointment</p>
                  </div>
                </div>

                {/* Consultation Hours */}
                <div className="contact-channel-card">
                  <div className="contact-channel-icon hours">
                    <Clock size={22} aria-hidden="true" />
                  </div>
                  <div className="contact-channel-body">
                    <span className="contact-channel-label">Consultation Hours</span>
                    <span className="contact-channel-value">Monday – Saturday: 9:00 AM – 7:00 PM IST</span>
                    <p className="contact-channel-note">Flexible scheduling for USA, UK, UAE &amp; Australia time zones</p>
                  </div>
                </div>
              </div>

              {/* Discovery Call Card */}
              <div className="contact-discovery-card">
                <div className="contact-discovery-icon">
                  <Calendar size={24} aria-hidden="true" />
                </div>
                <div className="contact-discovery-text">
                  <h3>Prefer a 1-on-1 Discovery Call?</h3>
                  <p>Book a free 15-minute call with Meenu to assess your goals and find the right program fit.</p>
                </div>
                <button type="button" className="btn btn-primary" onClick={openBook}>
                  Schedule Call
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              </div>

              {/* Social Channels */}
              <div className="contact-social-wrapper">
                <span className="contact-social-title">Follow Meenu on Social Media</span>
                <SocialLinks />
              </div>
            </div>

            {/* Right: Contact Inquiry Form */}
            <div className="contact-form-col">
              <div className="contact-form-panel">
                {submitted ? (
                  <div className="contact-success-state">
                    <div className="contact-success-icon">
                      <CheckCircle2 size={44} aria-hidden="true" />
                    </div>
                    <h3>Thank you for reaching out!</h3>
                    <p>
                      Your message has been received. Meenu or our clinical care coordinator will get back to you within 24 hours.
                    </p>
                    <div className="contact-success-fallback">
                      <p>Need an instant response? Send this inquiry directly via WhatsApp:</p>
                      <a
                        href={inquiryWaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                      >
                        <MessageCircle size={16} aria-hidden="true" />
                        Chat on WhatsApp Now
                      </a>
                    </div>
                    <button
                      type="button"
                      className="btn btn-secondary contact-reset-btn"
                      onClick={() => setSubmitted(false)}
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="contact-form-header">
                      <h3>Send a Message</h3>
                      <p>Fill out the form below and we will get back to you promptly.</p>
                    </div>

                    <form className="contact-form" onSubmit={handleSubmit}>
                      <div className="contact-form-row">
                        <label className="contact-field-group">
                          <span className="contact-field-label">Your Name *</span>
                          <input
                            type="text"
                            name="name"
                            required
                            placeholder="e.g. Priya Sharma"
                            value={formData.name}
                            onChange={handleChange}
                            className="contact-input"
                          />
                        </label>

                        <label className="contact-field-group">
                          <span className="contact-field-label">Phone / WhatsApp Number *</span>
                          <input
                            type="tel"
                            name="phone"
                            required
                            placeholder="e.g. +91 98765 43210"
                            value={formData.phone}
                            onChange={handleChange}
                            className="contact-input"
                          />
                        </label>
                      </div>

                      <label className="contact-field-group">
                        <span className="contact-field-label">Email Address *</span>
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="e.g. priya@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          className="contact-input"
                        />
                      </label>

                      <div className="contact-form-row">
                        <label className="contact-field-group">
                          <span className="contact-field-label">Area of Health Concern</span>
                          <select
                            name="concern"
                            value={formData.concern}
                            onChange={handleChange}
                            className="contact-select"
                          >
                            <option value="Gut Health (IBS, Bloating, Acidity, GERD)">Gut Health (IBS, Bloating, Acidity, GERD)</option>
                            <option value="Sports & Athletic Fuelling">Sports &amp; Athletic Fuelling</option>
                            <option value="Youth Athlete Nutrition">Youth Athlete Nutrition</option>
                            <option value="Child & Teen Nutrition">Child &amp; Teen Nutrition</option>
                            <option value="ADHD Nutrition Support">ADHD Nutrition Support</option>
                            <option value="Type 2 Diabetes / Pre-diabetes">Type 2 Diabetes / Pre-diabetes</option>
                            <option value="PCOS / Hormonal Health">PCOS / Hormonal Health</option>
                            <option value="Sustainable Weight Management">Sustainable Weight Management</option>
                            <option value="Other Clinical Nutrition Query">Other Clinical Nutrition Query</option>
                          </select>
                        </label>

                        <label className="contact-field-group">
                          <span className="contact-field-label">Preferred Mode</span>
                          <select
                            name="mode"
                            value={formData.mode}
                            onChange={handleChange}
                            className="contact-select"
                          >
                            <option value="Online Video Call">Online Video Call (Zoom / Google Meet)</option>
                            <option value="In-Clinic Visit (Chennai)">In-Clinic Visit (Guindy, Chennai)</option>
                            <option value="WhatsApp Messaging">WhatsApp Messaging</option>
                          </select>
                        </label>
                      </div>

                      <label className="contact-field-group">
                        <span className="contact-field-label">How can Meenu help you? (Optional)</span>
                        <textarea
                          name="message"
                          rows="4"
                          placeholder="Tell us briefly about your current symptoms, health goals, or specific dietary questions..."
                          value={formData.message}
                          onChange={handleChange}
                          className="contact-textarea"
                        />
                      </label>

                      <button type="submit" className="btn btn-primary contact-submit-btn">
                        <Send size={16} aria-hidden="true" />
                        Send Message
                      </button>

                      <div className="contact-form-trust">
                        <ShieldCheck size={16} aria-hidden="true" />
                        <span>Your health information and medical records are kept strictly confidential.</span>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Trust Banner */}
          <div className="contact-trust-bar">
            <div className="contact-trust-item">
              <strong>HPR ID</strong>
              <span>{HPR_ID}</span>
            </div>
            <div className="contact-trust-divider" aria-hidden="true" />
            <div className="contact-trust-item">
              <strong>Clinical Leadership</strong>
              <span>Meenu Balaji, M.H.Sc (Food Science &amp; Nutrition)</span>
            </div>
            <div className="contact-trust-divider" aria-hidden="true" />
            <div className="contact-trust-item">
              <strong>Clients Served Globally</strong>
              <span>{MAJOR_LOCATIONS}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
