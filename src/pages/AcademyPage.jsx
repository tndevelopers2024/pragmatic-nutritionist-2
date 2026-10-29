import { ArrowRight } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Section from '../components/Section'
import { useSeo } from '../components/Seo'
import { professionalCourseContent } from '../data/professionalCourseContent'
import './academy.css'

// Prices below are shown on the source course listings; availability may change.
const publicCourses = [
  { title: 'Child Nutrition Webinar', description: "Nourish your child's growth and development with expert guidance.", price: '₹350', slug: 'nourishing-young-minds' },
  { title: 'Mindful Eating Webinar', description: 'Embrace a healthier relationship with food through mindful eating.', price: '₹799', slug: 'mindful-eating-webinar' },
  { title: 'Picky Eating Masterclass', description: 'Does thinking of meal times, makes you worried? Let us take the worry out of you and give the tried and tested method, trusted by parents around the globe.', price: '₹799', slug: 'picky-eating-masterclass' },
  { title: 'Masterclass on Gut Health', description: 'Unlock the secrets to a thriving gut with our “Optimizing Gut Health” course. Improve your well-being by prioritizing your gut health.', price: '₹499', slug: 'optimize-gut-health' },
  { title: 'Plant-Based Diets', description: "Are you thinking of shifting to a plant based diet (vegan/vegetarian)? Get a Nutritionist's guideline to transition. Learn how to eat healthy in a plant-based diet.", price: '₹799', slug: 'plant-based-diets' },
  { title: 'Sports Nutrition Webinar', description: 'Knowing firsthand the basics of Sports Nutrition will give you great insights about how efficiently you can plan your meals and improve on-field performance.', price: '₹1,200', slug: 'sports-nutrition' }
]

// The second original listing contains different prices for some of the same
// courses. Keep the lists separate rather than choosing which price is current.
const legacyPublicCourses = [
  { title: 'Nourishing Young Minds', description: 'Join our nutrition webinar for expert tips on helping young kids develop healthy eating habits, making nutritious meals fun and easy for the whole family!', price: 'Free', slug: 'nourishing-young-minds' },
  { title: 'Picky eating Masterclass', description: 'Does thinking of meal times, makes you worried? Let us take the worry out of you and give the tried and tested method, trusted by parents around the globe.', price: '₹799', slug: 'picky-eating-masterclass' },
  { title: 'Plant based Diets', description: "Are you thinking of shifting to a plant based diet (vegan/vegetarian)? Get a Nutritionist's guideline to transition.", price: '₹799', slug: 'plant-based-diets' },
  { title: 'Mindful Eating Webinar', description: 'Do you go through phases of dieting and eating more than you should? Embrace a healthier relationship with food through mindful eating.', price: '₹399', slug: 'mindful-eating-webinar' },
  { title: 'Optimize Gut Health', description: 'Unlock the secrets to a thriving gut with our “Optimizing Gut Health” course. Improve your well-being by prioritizing your gut health.', price: '₹499', slug: 'optimize-gut-health' },
  { title: 'Sports Nutrition', description: 'Knowing firsthand the basics of Sports Nutrition will give you great insights about how efficiently you can plan your meals and improve on-field performance.', price: '₹950', slug: 'sports-nutrition' }
]

const legacyCourseOverviews = [
  ['Mindful Eating Webinar', 'Discover mindful eating practices for a balanced lifestyle.', 'Practical tips and exercises to cultivate mindful eating habits.'],
  ['Optimize Gut Health', 'Learn strategies to improve gut health through diet and lifestyle changes.', 'Practical guidance to enhance digestive wellness.'],
  ['Sports Nutrition', 'Explore nutrition principles tailored for sports performance.', 'Techniques and meal planning strategies for athletes and fitness enthusiasts.'],
  ['Picky Eating Masterclass', 'Address and manage picky eating behaviors effectively.', 'Practical solutions and insights to promote healthy eating habits.'],
  ['Plant-Based Diets', 'Discover the benefits of plant-based nutrition and its impact on health.', 'Recipes, meal plans, and nutritional advice for adopting a plant-based diet.']
]

const registrationResources = [
  ['Courses & Workshops', ['Continuing Education Courses: Focus on practical skills and evidence-based practices in nutrition. Includes courses on specific topics like gut health, hormonal balance, and metabolic health.', 'Live Workshops: Interactive sessions with opportunities for real-time questions and networking with other professionals.']],
  ['Blog & Articles', ['Latest Research Summaries: Concise, evidence-based summaries of recent studies and trends in nutrition.', 'Clinical Practice Tips: Practical advice and strategies for applying nutrition science in a clinical setting.', 'Case Studies: Real-world examples of nutritional interventions and outcomes.']],
  ['Tools & Resources', ['Assessment Tools: Templates and forms for client assessments, including dietary recall forms and symptom questionnaires.', 'Practice Management Resources: Guides on setting up and running a private practice, including marketing tips and client management strategies.']],
  ['Webinars & Videos', ['Recorded Webinars: Access to past webinars on various nutrition topics, available for on-demand viewing.']],
  ['Professional Development', ['Certification Programs: Information on advanced certifications and specializations within the field of nutrition.']],
  ['Tools for Clients', ['Client Handouts: Printable resources that nutritionists can share with clients, such as meal planning guides and nutritional tips.', 'Dietary Guidelines: Easy-to-understand guides and infographics for clients to follow.']]
]

const professionalCourses = [
  ['Blogging Masterclass', 'Hey there, future nutrition blogging superstar! Are you ready to dive into the exciting world of blogging and share your passion for nutrition?', 'free-blogging-masterclass', '₹299', '1 session'],
  ['Free Career Counselling', 'Unlock your path to a rewarding career in nutrition with our free counselling service. Gain insights, explore opportunities and receive personalized guidance.', 'free-career-counselling', 'Free', '20 minutes'],
  ['Mastering Gut Health', "Empower your nutrition practice with our 'Mastering Gut Health' course. Elevate your practice with cutting-edge insights and practical strategies.", 'mastering-gut-health', '₹1,499', '4 weeks'],
  ['Basics of Gut Health', 'Learn the intricacies of gut health with modules exploring microbiome fundamentals and disorders, equipping nutritionists to optimize client well-being.', 'basics-of-gut-health', '₹1,200', '4 weeks'],
  ['Optimizing Hormonal Health', "This advanced course is designed for practicing nutritionists aiming to specialize in women's hormone wellness.", 'optimizing-hormonal-health', '₹850', '45 minutes'],
  ['Nutrition for Menopause', 'Gain specialized knowledge and practical tools to guide women through menopause using evidence-based nutritional strategies.', 'nutrition-for-menopause', '₹350 listed', '45 minutes'],
  ['Interpret Medical Reports', 'Medical reports are crucial pieces of the puzzle while making lifestyle recommendations to your clients and as an expert you show how to connect the dots.', 'interpret-medical-reports', '₹799', '1.5 hours'],
  ['Understanding CGM', "Explore cutting-edge insights into metabolic health with real-time data using CGM. Elevate your expertise as a nutritionist and improve your client's health.", 'understanding-cgm', '₹450', '2 weeks']
]

const publicDetails = [
  ['Child Nutrition Webinar: Nourishing the Next Generation', "As parents, understanding the nutritional needs of your child is key to promoting healthy growth and development. Our Child Nutrition Webinar covers essential topics such as balanced diets for children, dealing with food allergies, managing picky eating, and the importance of vitamins and minerals in a child’s diet. Learn how to make mealtime stress-free and ensure your child gets the right nutrients for optimal health."],
  ['Mindful Eating Webinar: Develop a Healthy Relationship with Food', "In our Mindful Eating Webinar, you’ll discover how to slow down and enjoy your food, focusing on your body's hunger cues and eating without distractions. Mindful eating is about developing a positive relationship with food and helping you become more conscious of the way you nourish your body. Learn how to overcome emotional eating, reduce stress around food, and create long-lasting habits for a healthier lifestyle."],
  ['Picky Eating Masterclass: Strategies for Encouraging Healthy Eating', 'Struggling with a picky eater at home? Our Picky Eating Masterclass is designed for parents and caregivers who want practical tips and strategies to encourage children (and adults) to eat a wider variety of foods. From creating fun meals to introducing new foods gradually, this masterclass will give you the confidence to overcome mealtime challenges and ensure balanced nutrition for everyone.'],
  ['Masterclass on Gut Health: Heal from the Inside Out', 'Did you know your gut health impacts everything from digestion to your immune system and even mental well-being? Our Masterclass on Gut Health dives deep into the connection between nutrition and gut health. Learn how to identify common gut issues, the role of probiotics and prebiotics, and how specific foods can either help or hinder your digestive health. This course is a must for anyone looking to improve their gut microbiome and overall health.'],
  ['Sports Nutrition Webinar: Fuel Your Body for Performance', 'Athletes, both professional and recreational, know that nutrition plays a critical role in performance and recovery. Our Sports Nutrition Webinar focuses on how to fuel your body properly before, during, and after exercise. Whether you’re looking to build muscle, enhance endurance, or recover quickly, this webinar will teach you how to optimize your diet to support your athletic goals.'],
  ['Plant-Based Diets: A Masterclass for Sustainable Health', 'If you’re considering a plant-based lifestyle or simply want to explore plant-based options for better health, our Plant-Based Diets Masterclass is the perfect place to start. Learn how to create well-balanced, nutrient-rich meals that support overall wellness while being mindful of sustainability. This course covers everything from protein sources to meal planning, making it easier to transition to or enhance a plant-based diet.']
]

const professionalDetails = [
  ['Mastering Gut Health', 'Dive deep into the essential role gut health plays in overall well-being. Learn how your dietary choices impact digestion, immunity, and mental health. This course covers everything from probiotics and prebiotics to the microbiome’s impact on your body’s systems, providing you with the tools to address gut health issues in your clients.'],
  ['Blogging Masterclass for Nutritionists', 'Do you want to build your personal brand and share your knowledge with a larger audience? Our Blogging Masterclass is designed to help nutritionists create a successful blog that not only informs but also attracts clients. Learn how to write engaging content, optimize for SEO, and build a blog that supports your practice and expertise.'],
  ['Free Career Counseling for Nutritionists', 'Starting or growing a career in nutrition can be overwhelming. Our free career counseling sessions provide guidance on how to navigate the nutrition industry, build your career, and make informed decisions about your professional path. This session is ideal for anyone seeking career direction or wanting to enhance their practice.'],
  ['Build Your Private Practice', 'Ready to take your nutrition career to the next level? Our Build Your Private Practice course covers everything from business development to client acquisition, helping you launch and grow a successful private nutrition practice. Learn about branding, marketing, client relations, and more.'],
  ['Optimizing Hormonal Health', 'This course focuses on the critical role of nutrition in optimizing hormonal health. Explore how diet and lifestyle can balance hormones, improve energy levels, reduce stress, and prevent common hormonal imbalances. Topics include nutrition for thyroid, adrenal glands, and reproductive health.'],
  ['Nutrition for Menopause', 'Menopause brings about significant changes in a woman’s body. This course will guide you through how to support women during this transition, focusing on nutrition strategies to manage symptoms such as hot flashes, weight gain, and mood swings. Learn the essential nutrients for bone health, metabolism, and overall wellness.'],
  ['Interpreting Medical Reports', 'A nutritionist must understand medical reports to provide accurate guidance. In this course, you’ll learn how to read and interpret common medical reports like blood tests, lab results, and health screenings, enabling you to provide personalized recommendations based on real data.'],
  ['Masterclass for Private Practice', 'Join this exclusive online masterclass on private practice for nutritionists and learn how to confidently set up, grow, and manage your own practice. Perfect for nutrition professionals ready to attract clients, build credibility, and create a sustainable career in nutrition.']
]

const practiceWeeks = [
  ['Find Your Niche & Your Positioning', "The single biggest mistake new nutritionists make: trying to serve everyone. This week, you'll get clear on who you're for — and why that makes everything easier.", 'Your Niche & Positioning Statement', ["Why niching doesn't shrink your market — it grows it", 'The 5 most in-demand nutrition niches in India right now', 'Your unique story: turning experience into expertise', 'Competitor mapping: finding the white space', 'Crafting your positioning statement and elevator pitch']],
  ['Build a Business That Actually Makes Money', "Revenue doesn't happen by accident. You'll design your service menu, set your rates with confidence, and create packages clients actually want to buy.", 'Your Service Menu + Pricing Framework', ['Understanding the Indian nutrition market and what clients pay', 'Designing your service menu: one-off vs retainer vs programme', 'Pricing psychology: why charging more attracts better clients', 'How to have the pricing conversation without flinching', 'Building a basic business plan on one page']],
  ['Create a Client Journey That Retains & Refers', "Getting a client is step one. Keeping them — and having them send you three more — is your real business model. You'll build the full client pathway this week.", 'Client Intake Form + First Session Template', ['Designing your intake form to gather what you actually need', 'The first session structure that builds immediate trust', 'Creating personalised nutrition plans efficiently (without burnout)', 'Follow-up cadences that keep clients engaged between sessions', 'Building a referral loop: how to ask without feeling awkward']],
  ['Master the Art of Nutrition Coaching', "Clinical knowledge is only half the job. The other half is helping people actually change. You'll learn the behaviour-change tools that separate good nutritionists from great ones.", 'Your Coaching Framework + Progress Tracker', ['Motivational interviewing for nutritionists — the basics that work', 'Goal-setting frameworks that lead to outcomes, not excuses', 'Handling non-compliance without frustration', 'When to refer out — and how to do it professionally', 'Documentation and progress tracking systems']],
  ['Social Media That Builds Trust, Not Just Followers', "You don't need 10,000 followers to get clients. You need the right 200. This week is about content strategy that actually converts — for the Indian audience, on the platforms that matter.", '30-Day Content Calendar', ['Choosing your platform based on niche (Instagram vs LinkedIn vs YouTube)', 'The content pillars framework: educate, engage, convert', 'Creating a 30-day content calendar in 2 hours', 'Reels, carousels, stories: what works for nutritionists in 2025', 'Building community and turning DMs into discovery calls']],
  ['Build Your Website & Get Found on Google', "Your website is your 24/7 salesperson. This week you'll set up a professional, trust-building online presence — even if you've never built a website before.", 'Website Outline + SEO Content Plan', ["What a nutritionist's website actually needs (and what it doesn't)", 'Writing a homepage that converts visitors into enquiries', 'Local SEO for nutritionists: getting found in your city', 'Blogging as a lead generation tool — done right, done simply', "Booking systems and contact forms that don't lose clients"]],
  ['Technology, Tools & Running Lean', "The right tools make you look professional and save you hours every week. The wrong tools waste money and time. You'll build a lean, effective operations stack — from day one.", 'Your Tech Stack Checklist + Legal Templates', ['The only tools you actually need to start (free or near-free)', 'Setting up a scheduling, payment, and client management system', 'Telehealth and online consultations: platforms and best practices', 'Email marketing basics: building a list and staying in touch', 'Protecting yourself legally: consent forms, disclaimers, and HIPAA basics']],
  ['Your 90-Day Launch Plan & Sustainability Strategy', "This is your graduation week — and your launch week. You'll leave with a complete, personalised roadmap for your first 90 days, built for your life, your location, and your goals.", 'Your Personal 90-Day Launch Roadmap', ["Auditing what you've built across weeks 1–7", 'Overcoming the top 5 obstacles new practitioners face', 'Setting realistic revenue goals for your first 6 months', 'Building resilience: the mindset work nobody talks about', 'Your 90-day personalised action plan (done in class)']]
]

const practiceFaqs = [
  ['Do I need to already have clients to join this course?', "No — this course is specifically designed for nutritionists who are pre-launch or in the very early stages. You don't need a single client yet. By week 8, you'll have everything in place to start getting them."],
  ['How much time do I need to commit per week?', "Each live session runs 20-30 minutes. We recommend 3–4 additional hours per week for assignments and implementation. That's roughly half a day — and it's where the real results come from."],
  ['Are the sessions live or pre-recorded?', "Sessions are live and interactive — not passive videos. You'll be able to ask questions, get feedback in real time, and learn from other participants' situations. All sessions are recorded and available for 6 months."],
  ["I'm not in Chennai — can I still join?", "Absolutely. The course is fully online and designed to work for nutritionists across India. The strategies are specifically tailored for the Indian market, wherever you're based."],
  ['What if I fall behind during the 8 weeks?', "Life happens. You'll have access to recordings for 6 months, so you can catch up at your pace. The assignments are designed to be done progressively, but the key is that you complete them."],
  ['Is there a refund policy?', "Please refer to Pragmatic Nutrition's refund policy for full details. We encourage you to reach out before enrolling if you have any specific concerns."]
]

const practiceIncluded = [
  ['8 live interactive sessions (30–45 mins each) with Meenu', '₹8,000'],
  ['8 weekly assignments with personalised feedback', '₹4,000'],
  ['Client Intake Form (customisable template)', '₹1,500'],
  ['First Session Structure Template', '₹1,000'],
  ['30-Day Social Media Content Calendar', '₹2,000'],
  ['Pricing & Service Menu Framework', '₹1,500'],
  ['Legal Templates: Consent + Disclaimer forms', '₹2,000'],
  ['Tech Stack Checklist + Setup Walkthroughs', '₹500'],
  ['5-Step Strategy eBook', '₹999'],
  ['Website + Social Media Audit (1:1 session, 30 mins)', '₹1,500'],
  ['90-Day Personalised Launch Roadmap', '₹3,000'],
  ['6-Month Access to All Recordings', '₹2,000']
]

const practiceBonuses = [
  ['Client Intake Form Template', 'A professionally designed, fully customisable intake form — built to gather exactly the right information before your first session, without overwhelming clients.', '₹1,500'],
  ['5-Step Practice Growth eBook', 'Five proven strategies distilled from years of running a multi-country practice. Attract clients, retain them longer, and grow without burning out.', '₹999'],
  ['Website & Social Audit (1:1)', 'A private 30-minute session with Meenu, 1–2 weeks after the course ends. Get direct, personalised feedback on your online presence and what to fix first.', '₹1,500'],
  ['Legal Starter Templates', 'Consent forms, client disclaimers, and a simple service agreement — built for nutrition practice in India. Protect yourself professionally from day one.', '₹2,000'],
  ['30-Day Content Calendar', 'A month of content ideas — mapped to your niche, pre-structured for Instagram or LinkedIn, with captions you can adapt in minutes.', '₹2,000'],
  ['90-Day Launch Roadmap', 'A personalised, week-by-week action plan created in your final session. Leave knowing exactly what to do in month 1, 2, and 3 of your practice.', '₹3,000']
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

function CourseLink({ to, children }) {
  return <Link className="subtopic-action academy-link" to={to}>{children}<ArrowRight size={15} aria-hidden="true" /></Link>
}

function PublicCourses() {
  return <>
    <PageHero title="Courses for Everyone" blurb="Masterclasses, webinars and mini courses on healthy eating." parent={{ label: 'Academy', to: '/academy' }} />
    <Section bg="white" title="Meet Your Nutritionist – Meenu" width="wide">
      <div className="academy-copy">
        <p>Meenu specializes in holistic nutrition and wellness, helping clients achieve hormonal harmony through evidence-based dietary plans. With her guidance, you’ll embark on a journey to reclaim balance and vitality.</p>
        <p>In today's fast-paced world, where health issues like diabetes, high blood pressure, and high cholesterol levels on the rise, understanding the power of food is crucial. At Pragmatic Nutrition, we believe that healthy eating is the key to nourish yourself. With extensive experience as a nutritionist, we have curated nutrition courses that cover the basics of nutrition.</p>
        <p>Our courses are delivered through live interactive online sessions, and you will receive individual chat support throughout your learning period. Join us today and take the first step towards a healthier you! The sessions are recorded.</p>
      </div>
    </Section>
    <Section bg="base" title="Masterclasses, Webinars & Mini Courses" lead="Explore healthy eating topics for everyday life." width="wide">
      <div className="academy-grid">{publicCourses.map(course => <article className="academy-card" key={course.slug}>
        <h3>{course.title}</h3><p>{course.description}</p><p className="academy-course-meta"><strong>{course.price}</strong><span>1 session</span></p>
        <CourseLink to={`/academy/courses-masterclasses?course=${course.slug}`}>View course details</CourseLink>
      </article>)}</div>
      <p className="academy-note">Prices shown are listed on the original course page. Please confirm current availability and price before enrolling.</p>
      <p className="academy-note">Another course listing shows different prices for some sessions. Please confirm the current price before enrolling. <Link to="/academy/online-nutrition-courses">View the other course listing</Link>.</p>
    </Section>
    <Section bg="white" title="Learn at your own pace" width="wide">
      <div className="academy-editorial-grid">{publicDetails.map(([title, description]) => <div key={title}><h3>{title}</h3><p>{description}</p></div>)}
        <h3>Why Choose Pragmatic Nutrition’s Online Nutrition Courses?</h3><ul><li><strong>Expert-Led, Evidence-Based Content:</strong> Each course is created by nutrition professionals with years of experience in the field. You’ll get accurate, science-backed information designed to make a real difference in your health.</li><li><strong>Flexible Learning:</strong> All our courses, webinars, and masterclasses are accessible online, so you can learn at your own pace, anytime, anywhere.</li><li><strong>Practical Knowledge:</strong> From child nutrition to sports nutrition and mindful eating, our courses are designed with practical tips that you can apply immediately to your lifestyle.</li><li><strong>Certified Learning:</strong> Upon completion, you’ll receive certification, which enhances your credibility and knowledge on the topics you’ve learned.</li></ul>
        <h3>Take the Next Step Towards a Healthier You</h3><p>Ready to dive deeper into nutrition and transform your eating habits? Whether you're interested in mindful eating, improving your child’s diet, or boosting athletic performance with the right nutrition, we have a course or webinar for you.</p><p>Enroll today in any of our online nutrition courses and start your journey toward a healthier, more balanced lifestyle. If you have any questions or need help choosing the right course, don’t hesitate to reach out to us—we're here to help!</p><Link to="/contact">Contact us</Link></div>
    </Section>
  </>
}

function LegacyPublicCourses() {
  return <>
    <PageHero title="Learn Nutrition Online" blurb="Master the Art of Healthy Eating!" parent={{ label: 'Academy', to: '/academy' }} />
    <Section bg="white" width="wide"><div className="academy-copy"><p>In today's fast-paced world, where health issues like diabetes, high blood pressure, and high cholesterol levels on the rise, understanding the power of food is crucial. At Pragmatic Nutrition, we believe that healthy eating is the key to nourish yourself. With extensive experience as a nutritionist, we have curated nutrition courses that cover the basics of nutrition.</p><p>Our courses are delivered through live interactive online sessions, and you will receive individual chat support throughout your learning period. Join us today and take the first step towards a healthier you!</p></div></Section>
    <Section bg="base" title="Masterclass, Webinars & Mini Courses on Healthy Eating" width="wide">
      <div className="academy-grid">{legacyPublicCourses.map(course => <article className="academy-card" key={course.slug}><h3>{course.title}</h3><p>{course.description}</p><p className="academy-course-meta"><strong>{course.price}</strong><span>1 session</span></p><CourseLink to={`/academy/online-nutrition-courses?course=${course.slug}`}>View course details</CourseLink></article>)}</div>
      <p className="academy-note">Course listings show different prices for some sessions; this listing describes Mindful Eating as free while listing ₹399. Please confirm availability and the current price before enrolling.</p>
    </Section>
    <Section bg="white" title="Get to Know Us" width="wide"><div className="academy-copy"><p>Welcome to Pragmatic Nutrition's Courses and Webinars, designed to empower individuals across India with practical knowledge and skills in nutrition. Whether you're eager to learn more about healthy eating habits or wish to specialize in a specific area, our courses and webinars cater to your interests and goals.</p><h3>Our Courses and Webinars</h3>{legacyCourseOverviews.map(([title, overview, experience], index) => <div key={title}><h3>{index + 1}. {title}</h3><p><strong>Overview:</strong> {overview}</p><p><strong>Experience:</strong> {experience}</p></div>)}<h3>Why Choose Online Nutrition Courses?</h3><ul><li><strong>Accessible Learning:</strong> Access courses and webinars from anywhere in the world.</li><li><strong>Expert Guidance:</strong> Learn from seasoned nutritionists and specialists in the field.</li><li><strong>Practical Application:</strong> Gain actionable insights and skills applicable to daily life.</li><li><strong>Certification:</strong> Receive a certificate upon course completion to showcase your knowledge.</li></ul><h3>Join Our Nutrition Community Today!</h3><p>Embark on your nutrition journey with our Nutrition Courses and Webinars. Whether you're a health enthusiast, a fitness professional, or simply curious about nutrition, our courses are designed to enrich your understanding and support your well-being.</p><h3>About Meenu</h3><p>With over a decade of experience as a global nutritionist, Meenu passionately enjoys working with people to achieve their health and wellness goals through personalized nutrition strategies. She has curated these programs to benefit everyone by combining her extensive knowledge with practical insights tailored to diverse lifestyles and needs.</p><Link to="/contact">Contact Us Today</Link></div></Section>
  </>
}

function MasterclassRegistration() {
  return <>
    <PageHero title="Register for Masterclass" blurb="Welcome, Nutritionists and Dietitians!" parent={{ label: 'Academy', to: '/academy' }} />
    <Section bg="white" width="wide"><div className="academy-copy"><p>We’re thrilled to have you join us for this transformative Masterclass designed exclusively for professionals like you. As nutritionists and dietitians dedicated to improving lives through personalized dietary guidance, you stand at the forefront of a growing field with immense potential.</p><p>In this Masterclass, we’re diving deep into private practice—an area rich with opportunities tailored to your expertise. Whether you’re envisioning the launch of your practice or seeking ways to elevate your current one, we’re here to equip you with the insights, strategies, and tools needed to succeed.</p><p>Your commitment to fostering health and wellness is inspiring, and we’re excited to support you in turning your vision into reality. Get ready to explore innovative approaches, tackle challenges head-on, and unlock new avenues for growth. Let’s embark on this journey together and advance your practice!</p><p>Welcome aboard, and let’s get started!</p><h2>Free Registration</h2><p>Contact us for current registration details.</p><Link className="btn btn-primary" to="/contact">Ask about registration<ArrowRight size={16} aria-hidden="true" /></Link></div></Section>
    <Section bg="base" title="Other Resources For Health Professionals" width="wide"><div className="academy-grid">{registrationResources.map(([title, items]) => <article className="academy-card" key={title}><h3>{title}</h3><ul>{items.map(item => <li key={item}>{item}</li>)}</ul></article>)}</div></Section>
  </>
}

function ProfessionalCourses() {
  return <>
    <PageHero title="Courses for Nutritionists" blurb="Masterclasses, webinars and mini courses for nutrition professionals." parent={{ label: 'Academy', to: '/academy' }} />
    <Section bg="white" title="Online Courses for Nutritionists" width="wide">
      <div className="academy-copy"><p>Ready to take your nutrition expertise to the next level? Elevate your skills and boost your confidence with our range of comprehensive online courses tailored specifically for nutritionists like you.</p><p>Crafted by a seasoned Nutritionist, these courses provide flexible learning opportunities, allowing you to delve deep into the world of nutrition. Immerse yourself in engaging content, practical case studies, and the latest research, empowering yourself to make a significant impact in the dynamic field of nutrition and wellness.</p><p>If you're ready to expand your knowledge and unlock new career opportunities, explore our courses today. And if you're looking for something specific that isn't listed, don't hesitate to reach out – we're here to help you achieve your professional goals.</p><p>Disclaimer: These courses are not meant for diagnosing or curing diseases. Please discuss with a doctor for the same.</p></div>
    </Section>
    <Section bg="white" title="Build Your Online Presence as a Nutritionist" width="wide"><div className="academy-copy"><p>Starting at ₹299.</p><p>Please confirm current course fees and availability before enrolling.</p><h3>Join Today</h3><p>What are you waiting for?</p></div></Section>
    <Section bg="base" title="Explore professional learning" width="wide">
      <div className="academy-grid">{professionalCourses.map(([title, description, slug, price, duration]) => <article className="academy-card" key={slug}>
        <h3>{title}</h3><p>{description}</p><p className="academy-course-meta"><strong>{price}</strong><span>{duration}</span></p><CourseLink to={`/academy/certificate-courses?course=${slug}`}>View course details</CourseLink>
      </article>)}<article className="academy-card"><h3>Private Practice Masterclass</h3><p>Discover the key to success in building a thriving nutrition practice. Learn everything from client management to business strategies from an expert. Join now!</p><p className="academy-course-meta"><strong>₹299 listed</strong><span>30 minutes</span></p><Link className="subtopic-action academy-link" to="/academy/masterclass-registration">View masterclass registration<ArrowRight size={15} aria-hidden="true" /></Link></article><article className="academy-card"><h3>Build Your Private Practice</h3><p>Understand the keys to success in building your private practice. Enrol now and take the next step towards realizing aspirations.</p><p className="academy-course-meta"><strong>₹3,500 listed</strong><span>4 weeks</span></p><CourseLink to="/academy/certificate-courses?course=build-your-private-practice">View four-week course details</CourseLink><Link className="subtopic-action" to="/academy/build-your-private-practice">Explore the eight-week intensive<ArrowRight size={15} aria-hidden="true" /></Link></article></div>
      <p className="academy-note">Please confirm current fees and availability before enrolling. The menopause webinar has been described as free and also listed at ₹350; the masterclass has been listed at ₹299 while its registration page describes free registration.</p>
    </Section>
    <Section bg="white" title="Testimonials" width="wide">
      <div className="academy-grid academy-quotes">{professionalTestimonials.map(([name, quote]) => <figure className="academy-card" key={name}><blockquote>“{quote}”</blockquote><figcaption>{name}</figcaption></figure>)}</div>
      <p className="academy-disclaimer"><strong>Medical Disclaimer:</strong> This online course is designed for continuing education purposes only and is intended to enhance your knowledge and professional skills. It is not intended to diagnose, treat, or cure any diseases. The information provided in this course is for educational purposes and should not be used as a substitute for medical advice or treatment. As a nutritionist, always encourage your clients to consult with qualified healthcare providers before making any significant changes to their health or diet.</p>
      <p><Link to="/contact">Ask about a course</Link></p>
    </Section>
    <Section bg="base" title="Comprehensive Online Nutrition Training for Professionals" width="wide">
      <div className="academy-editorial-grid">{professionalDetails.map(([title, description], index) => <div key={title}><h3>{index + 1}. {title}</h3><p>{description}</p></div>)}</div>
    </Section>
    <Section bg="white" title="Learn at Your Own Pace" width="wide">
      <div className="academy-copy"><p>At Pragmatic Nutrition, we understand that busy nutritionists need flexibility. Our online nutrition courses for professionals offer a self-paced learning experience, allowing you to complete the courses when it fits into your schedule. Whether you prefer learning in short bursts or long sessions, you can tailor your learning experience to meet your needs.</p><h3>Benefits of Taking Online Nutrition Courses for Nutritionists in India</h3><ul><li><strong>Stay up to date with the latest nutrition trends:</strong> The field of nutrition is constantly evolving. Our courses ensure you're equipped with the latest insights and evidence-based practices to stay ahead of the competition.</li><li><strong>Enhance your career opportunities:</strong> Master specialized areas such as nutritional therapy for chronic diseases, weight management, and sports nutrition, opening doors to a wider client base and better job prospects.</li><li><strong>Practical learning:</strong> Our courses emphasize practical case studies, allowing you to see how the theory applies to real-life scenarios, enhancing your ability to handle various client needs.</li><li><strong>Support and mentorship:</strong> Have questions? Our team of nutrition experts is available to provide guidance and support throughout your learning journey.</li></ul><h3>Why Choose Pragmatic Nutrition’s Online Courses?</h3><ul><li><strong>Expert-led content:</strong> Learn from experienced nutrition professionals who bring real-world insights and practical knowledge to the table.</li><li><strong>Convenience and flexibility:</strong> Access courses from anywhere at any time, making it easier to integrate learning into your busy professional life.</li><li><strong>Certified learning:</strong> Upon completion of each course, receive certification that enhances your credentials and showcases your expertise to clients and employers.</li></ul><h3>Enroll Today and Take Your Nutrition Career to New Heights</h3><p>If you're ready to advance your knowledge, gain certification, and specialize in cutting-edge areas like gut health and mindful eating, Pragmatic Nutrition’s online courses are the perfect solution. Don’t miss the chance to invest in your professional growth. Enroll today and take the first step toward transforming your career as a nutritionist.</p><p>If you can’t find the course you’re looking for, don’t hesitate to reach out to us. We are committed to helping you achieve your professional goals and empowering you with the tools you need for success.</p></div>
    </Section>
  </>
}

function Practice() {
  return <>
    <PageHero title="Launch Your Private Practice with Confidence" blurb="An eight-week intensive for nutritionists and dietitians building a private practice for the Indian market." parent={{ label: 'Academy', to: '/academy' }} />
    <Section bg="white" title="From qualified to practising" width="wide">
      <div className="academy-copy"><h3>You have the degree. But you don't have a practice yet.</h3><p>You spent years learning nutrition science. But nobody taught you how to actually run a business. And that gap between “qualified” and “earning” is exactly where most nutritionists stay stuck — sometimes for years.</p><h3>Waiting for the “right time”</h3><p>You keep telling yourself you'll start once you feel more ready, more confident, more experienced. But that day never comes.</p><h3>No idea how to get clients</h3><p>Posting on Instagram but getting crickets. No referral network. No system. You're good at nutrition — not at marketing.</p><h3>Undercharging (or not charging at all)</h3><p>You feel guilty about pricing, unsure what to charge, and you've probably given too many “free consults” that went nowhere.</p><h3>Overwhelmed by the business side</h3><p>Website, tools, booking systems, content — where do you even begin? You didn't sign up for this when you studied dietetics.</p><p>The course is listed at ₹18,000, reduced from ₹25,000. Confirm current availability, price and session length before enrolling.</p><Link className="btn btn-primary" to="/contact">Ask about the course<ArrowRight size={16} aria-hidden="true" /></Link></div>
    </Section>
    <Section bg="base" title="What you will build" width="wide">
      <div className="academy-copy academy-build-copy"><ul><li>A niche and positioning statement</li><li>A pricing model and service packages</li><li>A client journey from intake to follow-up</li><li>A content and social media strategy</li><li>A professional website or a plan to build one</li><li>Tools and templates to run your practice</li><li>A personalised 90-day launch roadmap</li></ul></div>
    </Section>
    <Section bg="white" title="Eight-week curriculum" lead="Each week builds on the last. The course recommends 3–4 hours of work outside sessions each week." width="wide">
      <div className="academy-grid">{practiceWeeks.map(([title, description, deliverable, topics], index) => <article className="academy-card" key={title}><span>Week {index + 1}</span><h3>{title}</h3><p>{description}</p><ul>{topics.map(topic => <li key={topic}>{topic}</li>)}</ul><p><strong>Deliverable:</strong> {deliverable}</p></article>)}</div>
    </Section>
    <Section bg="base" title="Included in the intensive" width="wide">
      <div className="academy-copy"><p>Here's what you're actually getting, and what it would cost to source each piece separately.</p><div className="academy-value-table-wrap"><table className="academy-value-table"><thead><tr><th>What's Included</th><th>Standalone Value</th></tr></thead><tbody>{practiceIncluded.map(([item, value]) => <tr key={item}><td>{item}</td><td>{value}</td></tr>)}</tbody><tfoot><tr><th>Total Value</th><td>₹28,000+</td></tr><tr><th>Your Price Today</th><td>₹18,000</td></tr></tfoot></table></div><p>The course listing describes sessions as 30–45 minutes, while its FAQ says 20–30 minutes. Please confirm the duration with the team.</p></div>
    </Section>
    <Section bg="white" title="Everything you need to start — not just learn" eyebrow="INCLUDED BONUSES" width="wide">
      <div className="academy-grid">{practiceBonuses.map(([title, description, value]) => <article className="academy-card" key={title}><h3>{title}</h3><p>{description}</p><p><strong>Value:</strong> {value}</p></article>)}</div>
    </Section>
    <Section bg="white" title="Who is this for?" width="wide">
      <div className="academy-copy academy-audience-copy"><h3>This is for you if...</h3><ul><li>You're a qualified nutritionist or dietitian who hasn't started your practice yet</li><li>You've been “getting ready to start” for months (or years)</li><li>You know your nutrition but feel lost on the business side</li><li>You want to work for yourself — not under someone else's brand forever</li><li>You're based in India and want advice that actually fits your market</li><li>You're willing to put in 3–4 hours of work per week alongside the sessions</li></ul><h3>Not the right fit if...</h3><ul><li>You're looking for more clinical nutrition education (this is business-focused)</li><li>You already have an active, earning private practice</li><li>You're not willing to do the work outside the live sessions</li><li>You want a passive, pre-recorded video course with no interaction</li></ul><h3>Meet your instructor</h3><p>Meenu has been practising as a nutritionist since 2009 — across the UK, New Zealand, and India. She's worked with thousands of clients globally and built Pragmatic Nutrition into one of Chennai's most trusted nutrition practices. She's also trained hundreds of nutritionists just like you, with a focus on practical, behaviour-based strategies that actually stick in the real world.</p><p>This course is built from what she wishes she'd known when she started — and the framework she used to navigate three very different markets.</p></div>
    </Section>
    <Section bg="base" title="Frequently asked questions" width="wide">
      <div className="academy-copy">{practiceFaqs.map(([question, answer]) => <details className="academy-faq" key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
    </Section>
    <Section bg="base" title="More learning for nutritionists" width="wide"><Link className="subtopic-action academy-link" to="/academy/certificate-courses">Explore courses for nutritionists<ArrowRight size={15} aria-hidden="true" /></Link></Section>
  </>
}

// The catalogues provide different prices for some courses, so details retain
// the price from the listing the visitor selected.
const publicDetailIndexes = {
  'nourishing-young-minds': 0,
  'mindful-eating-webinar': 1,
  'picky-eating-masterclass': 2,
  'optimize-gut-health': 3,
  'sports-nutrition': 4,
  'plant-based-diets': 5
}
const professionalDetailIndexes = {
  'mastering-gut-health': 0,
  'free-blogging-masterclass': 1,
  'free-career-counselling': 2,
  'build-your-private-practice': 3,
  'optimizing-hormonal-health': 4,
  'nutrition-for-menopause': 5,
  'interpret-medical-reports': 6
}

function findCourse(variant, slug) {
  if (variant === 'public' || variant === 'public-legacy') {
    const courses = variant === 'public' ? publicCourses : legacyPublicCourses
    const course = courses.find(item => item.slug === slug)
    if (!course) return null
    return { ...course, duration: '1 session', detail: publicDetails[publicDetailIndexes[slug]]?.[1] }
  }
  if (variant === 'professional') {
    const entry = professionalCourses.find(([, , courseSlug]) => courseSlug === slug)
      || (slug === 'build-your-private-practice' ? ['Build Your Private Practice', 'Understand the keys to success in building your private practice. Enrol now and take the next step towards realizing aspirations.', slug, '₹3,500 listed', '4 weeks'] : null)
    if (!entry) return null
    const [title, description, , price, duration] = entry
    return { title, description, price, duration, slug, detail: professionalDetails[professionalDetailIndexes[slug]]?.[1] }
  }
  return null
}

function CourseDetails({ course, variant }) {
  const catalogPath = variant === 'professional' ? '/academy/certificate-courses' : variant === 'public-legacy' ? '/academy/online-nutrition-courses' : '/academy/courses-masterclasses'
  const catalogLabel = variant === 'professional' ? 'Courses for Nutritionists' : variant === 'public-legacy' ? 'Learn Nutrition Online' : 'Courses for Everyone'
  if (!course) return <>
    <PageHero title="Course not found" blurb="Please explore the course listing to find a session." parent={{ label: catalogLabel, to: catalogPath }} />
    <Section bg="white" width="wide"><Link className="subtopic-action" to={catalogPath}>Browse courses<ArrowRight size={15} aria-hidden="true" /></Link></Section>
  </>
  return <>
    <PageHero title={course.title} blurb={course.description} parent={{ label: catalogLabel, to: catalogPath }} />
    <Section bg="white" title="About this course" width="wide">
      <div className="academy-copy">
        <p>{course.detail || course.description}</p>
        {variant === 'professional' && professionalCourseContent[course.slug]?.map(({ heading, items }) => <div key={heading}>
          <h3>{heading}</h3>
          <ul>{items.map(item => <li key={item}>{item}</li>)}</ul>
        </div>)}
        {variant === 'public-legacy' && course.slug === 'mindful-eating-webinar' && <div>
          <h3>What you will learn</h3>
          <ul>
            <li>Rethink restrictive dieting and recognise hunger and fullness cues.</li>
            <li>Respond to cravings without deprivation and explore emotional and stress-related eating.</li>
            <li>Build a respectful relationship with food and sustainable eating habits.</li>
          </ul>
        </div>}
        <p className="academy-course-meta"><strong>{course.price}</strong><span>{course.duration}</span></p>
        <p>Prices and availability can change. Contact us to confirm the current details and find out how to enrol.</p>
        {variant === 'professional' && <p>These courses are for education and are not intended to diagnose, treat or cure disease. Please discuss medical concerns with a qualified healthcare provider.</p>}
        {variant === 'professional' && course.title === 'Build Your Private Practice' && <p>This is the four-week course from the professional course listing. The <Link to="/academy/build-your-private-practice">eight-week intensive</Link> is a separate offering.</p>}
        {variant === 'professional' && course.title === 'Nutrition for Menopause' && <p>The listing describes this webinar as free while also showing ₹350. Please confirm the current fee with the team.</p>}
        {variant === 'professional' && course.slug === 'free-career-counselling' && <p><a href="https://calendly.com/meenu-egyz/30min">View career counselling appointment availability</a></p>}
        {variant === 'public-legacy' && course.title === 'Mindful Eating Webinar' && <p>The listing describes this webinar as free while also showing ₹399. Please confirm the current fee with the team.</p>}
        <p><Link className="btn btn-primary" to={`/contact?course=${encodeURIComponent(course.title)}`}>Ask about this course<ArrowRight size={16} aria-hidden="true" /></Link></p>
        <p><Link to={catalogPath}>Back to {catalogLabel}</Link></p>
      </div>
    </Section>
  </>
}

export default function AcademyPage({ variant = 'public' }) {
  const [searchParams] = useSearchParams()
  const slug = searchParams.get('course')
  const isCatalog = ['public', 'public-legacy', 'professional'].includes(variant)
  const course = slug && isCatalog ? findCourse(variant, slug) : null
  const titles = { public: 'Courses for Everyone', 'public-legacy': 'Learn Nutrition Online', professional: 'Courses for Nutritionists', practice: 'Build Your Private Practice', registration: 'Register for Masterclass' }
  useSeo(course?.title || titles[variant], course?.description || 'Online nutrition courses and professional learning from Pragmatic Nutrition.')
  let page = <PublicCourses />
  if (slug && isCatalog) page = <CourseDetails course={course} variant={variant} />
  else if (variant === 'professional') page = <ProfessionalCourses />
  else if (variant === 'practice') page = <Practice />
  else if (variant === 'registration') page = <MasterclassRegistration />
  else if (variant === 'public-legacy') page = <LegacyPublicCourses />
  return <div className="academy-page">{page}</div>
}
