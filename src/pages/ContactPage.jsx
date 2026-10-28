import { useState } from 'react'
import {
  MapPin,
  Mail,
  MessageCircle,
  Send,
  Calendar,
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
  const [prepared, setPrepared] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    concern: 'Gut Health (IBS, Bloating, Acidity, GERD)',
    mode: 'Online Video Call',
    message: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setPrepared(true)
  }

  const inquiryWaUrl = wa(
    `Hi Meenu, I would like to inquire about a consultation.\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nConcern: ${formData.concern}\nPreferred mode: ${formData.mode}\nMessage: ${formData.message || 'I would like to consult with you.'}`
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
                      Chat on WhatsApp
                    </a>
                    <p className="contact-channel-note">Phone: <a href={`tel:${PHONE.replace(/\s/g, '')}`}>{PHONE}</a></p>
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
                {prepared ? (
                  <div className="contact-success-state">
                    <h3>Your message is ready</h3>
                    <p>
                      Your message has not been sent yet. Open WhatsApp to review and send it to Meenu.
                    </p>
                    <div className="contact-success-fallback">
                      <p>Your name, contact details, selected concern and message will be included in the WhatsApp message.</p>
                      <a
                        href={inquiryWaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                      >
                        <MessageCircle size={16} aria-hidden="true" />
                        Review in WhatsApp
                      </a>
                    </div>
                    <button
                      type="button"
                      className="btn btn-secondary contact-reset-btn"
                      onClick={() => setPrepared(false)}
                    >
                      Edit Message
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="contact-form-header">
                      <h3>Send a Message</h3>
                      <p>Fill out the form to prepare a WhatsApp message. You can review it before sending.</p>
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
                        Prepare WhatsApp Message
                      </button>


                    </form>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="contact-original-copy">
            <h2>Hey there!</h2>
            <p>Thanks for stopping by. Whether you have a burning question about nutrition, need personalized advice, or just want to chat about your wellness goals, we're here to help. Your journey to better health starts with a conversation!</p>
            <h3>Our Commitment to You</h3>
            <p>At Pragmatic Nutrition, we're passionate about empowering you with the knowledge and support you need to thrive. Our team of nutrition experts is dedicated to providing trustworthy guidance and practical tips that fit seamlessly into your lifestyle.</p>
            <h3>How Can We Assist You?</h3>
            <p>Got a specific dietary concern? Looking for tips to boost your energy levels? Interested in upcoming workshops or one-on-one consultations? Send us a message and we'll get back to you.</p>
            <h3>Stay Connected</h3>
            <p>Follow us on social media for nutrition insights, healthy recipes and updates.</p>
            <h3>Let's Get Started</h3>
            <p>Don't hesitate to reach out! We're excited to hear from you and support you on your journey towards a healthier, happier you.</p>
            <p>Looking forward to hearing from you,<br />Meenu Balaji<br />Founder &amp; Chief Nutritionist</p>
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
