import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, HeartPulse, Dumbbell } from 'lucide-react'
import Section from './Section'
import content from '../data/aboutContent.json'
import './aboutTestimonials.css'

export function AboutExpertise() {
  return (
    <Section width="wide" bg="white" title={content.expertise.title}>
      <div className="who-for-cards-grid">
        {content.expertise.areas.map((area, index) => (
          <article className="who-for-card" key={area.to}>
            <div className="who-for-check-icon" aria-hidden="true">{index === 0 ? <HeartPulse size={20} /> : <Dumbbell size={20} />}</div>
            <div className="who-for-card-content">
              <h3 className="subtopics-title">{area.title}</h3>
              <p>{area.description}</p>
              <Link className="subtopic-action" to={area.to}>Learn More<ArrowRight size={14} aria-hidden="true" /></Link>
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}

export function AboutTestimonial() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = window.setInterval(() => setActiveIndex(index => (index + 1) % content.testimonials.length), 7000)
    return () => window.clearInterval(timer)
  }, [paused, activeIndex])
  const move = direction => setActiveIndex(index => (index + direction + content.testimonials.length) % content.testimonials.length)
  return (
    <Section width="wide" bg="white" title="Testimonials">
      <div className="about-testimonials" role="region" aria-label="Client testimonials" aria-roledescription="carousel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false) }}>
      <div className="about-testimonials-viewport">
      <div className="about-testimonials-track" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
      {content.testimonials.map((testimonial, index) => (
      <article key={testimonial.name} className="outcomes-featured-card about-testimonials-slide" aria-hidden={index !== activeIndex} aria-label={`Testimonial ${index + 1} of ${content.testimonials.length}`}>
        <div className="featured-card-body"><blockquote className="featured-quote">{testimonial.paragraphs.map(text => <p key={text}>{text}</p>)}</blockquote></div>
        <div className="featured-card-footer">
          <div className="featured-author-seal" aria-hidden="true"><span>{testimonial.name[0]}</span></div>
          <div className="featured-author-meta"><h3 className="featured-author-name">{testimonial.name}</h3><p className="featured-author-role">{testimonial.program}</p></div>
        </div>
      </article>
      ))}
      </div>
      </div>
      <div className="champions-header-controls" aria-label="Testimonial navigation">
        <button type="button" className="athlete-nav-btn prev-btn" onClick={() => move(-1)} aria-label="Previous testimonial"><ArrowLeft size={18} /></button>
        <span className="athletes-counter-badge">{activeIndex + 1} / {content.testimonials.length}</span>
        <button type="button" className="athlete-nav-btn next-btn" onClick={() => move(1)} aria-label="Next testimonial"><ArrowRight size={18} /></button>
      </div>
      </div>
    </Section>
  )
}

export function AboutPracticeNotes() {
  return (
    <Section width="wide" bg="white">
      <div className="working-card-editorial">
        <h2 className="working-title">{content.disclaimer.title}</h2>
        {content.disclaimer.paragraphs.map(text => <p className="working-lead-paragraph" key={text}>{text}</p>)}
        <h3 className="subtopics-title">{content.research.title}</h3>
        {content.research.paragraphs.map(text => <p className="working-lead-paragraph" key={text}>{text}</p>)}
        <h3 className="subtopics-title">{content.international.title}</h3>
        {content.international.paragraphs.map(text => <p className="working-lead-paragraph" key={text}>{text}</p>)}
      </div>
    </Section>
  )
}
