import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Section from '../components/Section'
import { useSeo } from '../components/Seo'
import './academy.css'

// Public course information comes from the original Courses for Everyone page.
// Professional course names are retained from the older source listing; prices
// and availability are intentionally not asserted until they can be confirmed.
const publicCourses = [
  { title: 'Child Nutrition Webinar', description: "Nourish your child's growth and development with expert guidance.", price: '₹350', slug: 'nourishing-young-minds' },
  { title: 'Mindful Eating Webinar', description: 'Explore mindful eating, hunger cues and a healthier relationship with food.', price: '₹799', slug: 'mindful-eating-webinar' },
  { title: 'Picky Eating Masterclass', description: 'Practical strategies for encouraging children and adults to eat a wider variety of foods.', price: '₹799', slug: 'picky-eating-masterclass' },
  { title: 'Masterclass on Gut Health', description: 'Explore nutrition and gut health, including probiotics, prebiotics and digestive wellbeing.', price: '₹499', slug: 'optimize-gut-health' },
  { title: 'Plant-Based Diets', description: 'Nutrition guidance for transitioning to a balanced vegetarian or vegan diet.', price: '₹799', slug: 'plant-based-diets' },
  { title: 'Sports Nutrition Webinar', description: 'Learn the basics of fuelling, performance and recovery around exercise.', price: '₹1,200', slug: 'sports-nutrition' }
]

const professionalCourses = [
  ['Blogging Masterclass', 'Build your online presence and share nutrition knowledge through a blog.', 'free-blogging-masterclass'],
  ['Career Counselling', 'Explore career opportunities and guidance for nutrition professionals.', 'free-career-counselling'],
  ['Mastering Gut Health', 'Develop practical insight into gut health for nutrition practice.', 'mastering-gut-health'],
  ['Basics of Gut Health', 'Explore the microbiome and digestive disorders.', 'basics-of-gut-health'],
  ['Optimizing Hormonal Health', 'Explore hormonal health in nutrition practice.', 'optimizing-hormonal-health'],
  ['Nutrition for Menopause', 'Explore nutrition strategies for supporting women through menopause.', 'nutrition-for-menopause'],
  ['Interpret Medical Reports', 'Learn about interpreting reports for nutrition recommendations.', 'interpret-medical-reports'],
  ['Understanding CGM', 'Explore the use of continuous glucose monitoring data in nutrition practice.', 'understanding-cgm']
]

const professionalTestimonials = [
  ['Jessica, Clinical Nutritionist, Goa · Interpret Medical Records', 'Amazing and very comprehensive. Gained a lot of knowledge. So thankful to Meenu. Glad I took this course.'],
  ['Devi, Nutritionist · Mastering Gut Health', 'This course is very useful. I would recommend this to other nutritionists too. Meenu discussed in detail about different gut health issues and gave many practical tips.'],
  ['Anita, Nutritionist · Gut Health', "I'm happy that I joined the Gut health course. The weekly sessions and support by Meenu was very helpful. I understand the fine details of gut health better now"],
  ['Jaini Shah, Holistic Nutritionist & Art based Therapy practitioner', 'The module selection was amazing, so was the content. Discussing case studies added a good balance of practical and theoretical learning. Nature of the course was also flexible and on point for all the working professionals specially. Your prompt response and availability was excellent! On the whole, I think it was pretty good. Assignments were great too, not time consuming and practical.'],
  ['Jahnavi, Nutritionist, Bangalore', 'The Gut health course was very informative and useful to me.'],
  ['Shalini, Nutritionist, Mumbai', 'The Gut Health course was really useful to me. There are so many things that I had learnt from this. The case studies were interesting. Gained good practical exposure too.'],
  ['Anita Kharat, Community Nutritionist · Nutrition strategies for Menopause', 'The webinar was very informative, learned a lot. You explained the phases of menopause very well. Thank you so much.'],
  ['Savita, Nutritionist, Bangalore · Nutrition strategies for Menopause', 'The webinar on menopause was very informative and helpful. Learnt many new things. Thanks Meenu! I would like to join upcoming webinars too.'],
  ['Dr. M.S. Saradha Devi, Nutritionist, Bangalore · Nutrition strategies for Menopause', "The webinar was so informative. I'm so glad that the time spent for the webinar is the best decision. I had learnt so much in that 1.5 hours regarding menopause, symptoms, management and supplements. Meenu, I wish to thank you for your time and knowledge you have shared."]
]

function ExternalLink({ href, children }) {
  return <a className="subtopic-action academy-link" href={href} target="_blank" rel="noopener noreferrer">{children}<ArrowRight size={15} aria-hidden="true" /></a>
}

function PublicCourses() {
  return <>
    <PageHero title="Courses for Everyone" blurb="Masterclasses, webinars and mini courses on healthy eating." parent={{ label: 'Academy', to: '/academy' }} />
    <Section bg="white" title="Meet Your Nutritionist – Meenu" width="wide">
      <div className="academy-copy">
        <p>Meenu specialises in holistic nutrition and wellness, helping clients with evidence-based dietary plans. These courses cover the basics of nutrition and are designed to make healthy eating more practical.</p>
        <p>Courses are delivered through live interactive online sessions, with individual chat support during the learning period. Sessions are recorded.</p>
      </div>
    </Section>
    <Section bg="base" title="Masterclasses, Webinars & Mini Courses" lead="Explore healthy eating topics for everyday life." width="wide">
      <div className="academy-grid">{publicCourses.map(course => <article className="academy-card" key={course.slug}>
        <h3>{course.title}</h3><p>{course.description}</p><p className="academy-course-meta"><strong>{course.price}</strong><span>1 session</span></p>
        <ExternalLink href={`https://www.pragmaticnutritionist.com/online-nutrition-courses/${course.slug}`}>Read more on the original site</ExternalLink>
      </article>)}</div>
      <p className="academy-note">Prices shown are listed on the original course page. Please confirm current availability and price before enrolling.</p>
    </Section>
    <Section bg="white" title="Learn at your own pace" width="wide">
      <div className="academy-copy"><p>Explore child nutrition, mindful eating, gut health, sports nutrition and plant-based diets through practical, expert-led learning. The original course page describes online access and certificates on completion; please check the details for your selected course.</p>
        <p>Questions about which course is right for you? <Link to="/contact">Contact us</Link>.</p></div>
    </Section>
  </>
}

function ProfessionalCourses() {
  return <>
    <PageHero title="Courses for Nutritionists" blurb="Masterclasses, webinars and mini courses for nutrition professionals." parent={{ label: 'Academy', to: '/academy' }} />
    <Section bg="white" title="Online Courses for Nutritionists" width="wide">
      <div className="academy-copy"><p>Build knowledge and confidence with courses for nutritionists, including practical case studies and opportunities to develop professional skills.</p><p>For current availability, course details, certification and fees, contact us or follow the original course links.</p></div>
    </Section>
    <Section bg="base" title="Explore professional learning" width="wide">
      <div className="academy-grid">{professionalCourses.map(([title, description, slug]) => <article className="academy-card" key={slug}>
        <h3>{title}</h3><p>{description}</p><ExternalLink href={`https://www.pragmaticnutritionist.com/online-courses-for-nutritionists/${slug}`}>View course details</ExternalLink>
      </article>)}<article className="academy-card"><h3>Private Practice Masterclass</h3><p>Explore client management and business strategies for nutrition professionals.</p><ExternalLink href="https://www.pragmaticnutritionist.com/masterclass-registration">View masterclass registration</ExternalLink></article><article className="academy-card"><h3>Build Your Private Practice</h3><p>Explore the foundations of setting up and growing a private nutrition practice.</p><Link className="subtopic-action academy-link" to="/academy/build-your-private-practice">Explore private practice<ArrowRight size={15} aria-hidden="true" /></Link></article></div>
    </Section>
    <Section bg="white" title="Testimonials" width="wide">
      <div className="academy-grid academy-quotes">{professionalTestimonials.map(([name, quote]) => <figure className="academy-card" key={name}><blockquote>“{quote}”</blockquote><figcaption>{name}</figcaption></figure>)}</div>
      <p className="academy-disclaimer"><strong>Medical disclaimer:</strong> These courses are for continuing education and professional development. They are not intended to diagnose, treat or cure disease and do not replace medical advice or treatment. Clients should consult qualified healthcare providers before significant changes to their health or diet.</p>
      <p><Link to="/contact">Ask about a course</Link></p>
    </Section>
  </>
}

function Practice() {
  return <>
    <PageHero title="Build Your Private Practice" blurb="Resources and learning for nutritionists and dietitians building a private practice." parent={{ label: 'Academy', to: '/academy' }} />
    <Section bg="white" title="Develop your nutrition practice" width="wide">
      <div className="academy-copy"><p>Explore the foundations of building a nutrition practice, from client management and business strategies to developing your professional presence.</p><p>For current masterclass details, registration, availability and fees, contact Pragmatic Nutrition.</p><Link className="btn btn-primary" to="/contact">Ask about private practice<ArrowRight size={16} aria-hidden="true" /></Link></div>
    </Section>
    <Section bg="base" title="More learning for nutritionists" width="wide"><Link className="subtopic-action academy-link" to="/academy/certificate-courses">Explore courses for nutritionists<ArrowRight size={15} aria-hidden="true" /></Link></Section>
  </>
}

export default function AcademyPage({ variant = 'public' }) {
  const titles = { public: 'Courses for Everyone', professional: 'Courses for Nutritionists', practice: 'Build Your Private Practice' }
  useSeo(titles[variant], 'Online nutrition courses and professional learning from Pragmatic Nutrition.')
  if (variant === 'professional') return <ProfessionalCourses />
  if (variant === 'practice') return <Practice />
  return <PublicCourses />
}
