/**
 * Topic-specific hero content and authentic stock photography for every inner route
 * across Pragmatic Nutrition.
 * Structured as a 2-column clinical split hero:
 * - Breadcrumb trail
 * - Left column: Eyebrow badge pill, outcome-led headline, 2-line clinical subtitle,
 *   Primary CTA + related Secondary CTA + WhatsApp CTA, and 3 page-specific trust points
 * - Right column: Framed real-world stock photograph + clinical caption pill
 */

export const PAGE_HEROES = {
  '/about': {
    breadcrumb: 'ABOUT MEENU BALAJI',
    badge: 'CLINICAL GUT HEALTH & SPORTS NUTRITIONIST',
    title: 'About Meenu Balaji: 14+ Years of Root-Cause Clinical & Sports Nutrition',
    subtitle:
      'Clinical nutritionist with 14+ years across India, the UK, and New Zealand, and peer reviewer for the European Journal of Nutrition. Personalised food-first plans built around real Indian meals.',
    primaryCta: { label: 'Book Free Discovery Call', action: 'book' },
    secondaryCta: { label: 'View Client Results', to: '/results', icon: 'Award' },
    waMessage: 'Hi Meenu, I read about your clinical nutrition practice and would like to book a consultation.',
    trustItems: [
      'M.H.Sc Food Science & Nutrition',
      'Peer Reviewer, European Journal of Nutrition',
      'India, UK & New Zealand Practice'
    ],
    image: '/images/heroes/stock/about-clinic-desk.jpg',
    imageAlt: 'Meenu Balaji, M.H.Sc, Clinical Gut Health and Sports Nutritionist',
    imageCaption: 'Meenu Balaji, M.H.Sc • Founder, Pragmatic Nutrition',
    imagePosition: 'center 18%'
  },

  '/results': {
    breadcrumb: 'CLIENT & ATHLETE RESULTS',
    badge: 'DOCUMENTED CLIENT & ATHLETE OUTCOMES',
    title: 'Real Results: Clinical Gut Recovery, Metabolic Health & Podium Performance',
    subtitle:
      'From resolving chronic acidity and lowering HbA1c to national swimming records and international jiu-jitsu medals. Explore documented progress from clients across India and abroad.',
    primaryCta: { label: 'Book Free Discovery Call', action: 'book' },
    secondaryCta: { label: 'Explore Nutrition Plans', to: '/programs-pricing', icon: 'ClipboardList' },
    waMessage: 'Hi Meenu, I saw your client results and would like to discuss my health goals.',
    trustItems: [
      '4,500+ Clients Guided Globally',
      '5.0 Client Satisfaction Rating',
      'National & International Medalists'
    ],
    image: '/images/heroes/stock/client-results.jpg',
    imageAlt: 'Endurance runner training outdoors in morning daylight',
    imageCaption: 'Documented Clinical & Athletic Outcomes'
  },

  '/contact': {
    breadcrumb: 'CONTACT PRAGMATIC NUTRITION',
    badge: 'CHENNAI CLINIC & GLOBAL ONLINE CONSULTATIONS',
    title: 'Contact Pragmatic Nutrition: Start Your Personalised Clinical Plan',
    subtitle:
      'Reach out for gut health recovery, sports nutrition, metabolic care, or academy enquiries. Available in-person at Guindy, Chennai and online across India, the UK, UAE, Australia, and New Zealand.',
    primaryCta: { label: 'Book Free Discovery Call', action: 'book' },
    secondaryCta: { label: 'Check Your Gut Score', to: '/gut-health-checker', icon: 'Activity' },
    waMessage: 'Hi Meenu, I would like to connect regarding a personalised nutrition consultation.',
    trustItems: [
      'Guindy, Chennai Clinic & Zoom',
      'Direct Response Within 24 Hours',
      'Registered HPR Clinical Practice'
    ],
    image: '/images/heroes/stock/contact-clinic.jpg',
    imageAlt: 'Preparing fresh whole-food ingredients in a bright modern kitchen',
    imageCaption: 'Chennai Clinic & Global Online Care'
  },

  '/book-a-call': {
    breadcrumb: 'FREE 15-MINUTE DISCOVERY CALL',
    badge: 'COMPLIMENTARY CLINICAL DISCOVERY SESSION',
    title: 'Book a Free Discovery Call: Discuss Your Symptoms, Routine & Goals',
    subtitle:
      'Not sure which nutrition program fits your health history or training schedule? Speak with our team in a focused 15-minute call to map your next steps with zero obligation.',
    primaryCta: { label: 'Request Your Free Call', action: 'book' },
    secondaryCta: { label: 'Compare Nutrition Plans', to: '/programs-pricing', icon: 'ClipboardList' },
    waMessage: 'Hi Meenu, I would like to schedule a free 15-minute discovery call.',
    trustItems: [
      'Free 15-Minute Assessment Call',
      'Zero Generic Sales Pitch',
      'Online & Chennai Appointments'
    ],
    image: '/images/heroes/stock/book-discovery-call.jpg',
    imageAlt: 'Friendly one-on-one online nutrition video consultation at desk',
    imageCaption: 'Complimentary 15-Minute Discovery Session'
  },

  '/faq': {
    breadcrumb: 'FREQUENTLY ASKED QUESTIONS',
    badge: 'CONSULTATION & PROGRAM ANSWERS',
    title: 'Frequently Asked Questions: Clinical Approach, Consultations & Meal Plans',
    subtitle:
      'Clear answers on how personalised Indian meal plans work, blood test reviews, online international coaching, follow-up frequency, and choosing the right program duration.',
    primaryCta: { label: 'Book Free Discovery Call', action: 'book' },
    secondaryCta: { label: 'Explore Programs & Pricing', to: '/programs-pricing', icon: 'ClipboardList' },
    waMessage: 'Hi Meenu, I have a question before booking a nutrition consultation.',
    trustItems: [
      '100% Customised Meal Frameworks',
      '10-Day Clinical Progress Reviews',
      'India & International Online Care'
    ],
    image: '/images/heroes/stock/faq-consultation.jpg',
    imageAlt: 'Clinical nutritionist seated at consultation desk with laptop and fresh fruit',
    imageCaption: 'Clear Answers on Clinical Nutrition Care'
  },

  '/gut-health-checker': {
    parent: { label: 'Gut Health', to: '/gut-health' },
    breadcrumb: 'FREE GUT HEALTH ASSESSMENT',
    badge: 'SELF-REPORTED GUT SYMPTOM CHECKER',
    title: 'Free Gut Health Assessment Quiz: Map Your Digestive Symptoms in 2 Minutes',
    subtitle:
      'Reflect on bloating, acidity, bowel regularity, food triggers, and post-meal energy with this structured self-report quiz to understand what your everyday digestive patterns may indicate.',
    primaryCta: { label: 'Start 2-Min Gut Quiz', href: '#assessment-workspace' },
    secondaryCta: { label: 'Explore Gut Health Care', to: '/gut-health', icon: 'Activity' },
    waMessage: 'Hi Meenu, I am taking the Gut Health Assessment Quiz and would like to discuss my digestive symptoms.',
    trustItems: [
      'Simple 2-Minute Self-Report Quiz',
      '14+ Years Clinical Gut Expertise',
      'Instant Personalised Summary'
    ],
    image: '/images/heroes/stock/gut-checker.jpg',
    imageAlt: 'Warm lemon and mint digestive herbal infusion on wooden mat',
    imageCaption: '2-Minute Digestive Pattern Self-Check'
  },

  '/gut-health-recipes': {
    parent: { label: 'Gut Health', to: '/gut-health' },
    breadcrumb: 'GUT HEALTH RECIPES',
    badge: 'DIETITIAN-CRAFTED GUT-FRIENDLY KITCHEN',
    title: 'Gut Health Recipes: Nourishing Whole-Food Dishes for Calm Digestion',
    subtitle:
      'Wholesome gluten-free, plant-based, lactose-free, and refined-sugar-free recipes formulated to feed beneficial gut bacteria without triggering post-meal bloating or heaviness.',
    primaryCta: { label: 'Book Free Discovery Call', action: 'book' },
    secondaryCta: { label: 'Check Your Gut Score', to: '/gut-health-checker', icon: 'Activity' },
    waMessage: 'Hi Meenu, I explored your gut health recipes and want a personalised gut-friendly meal plan.',
    trustItems: [
      '8 Dietitian-Tested Whole-Food Recipes',
      'Gluten-Free & Microbiome-Friendly',
      'Simple Everyday Ingredients'
    ],
    image: '/images/heroes/stock/gut-recipes-hub.jpg',
    imageAlt: 'Whole brown lentils rich in prebiotic fibre for gut microbiome health',
    imageCaption: 'Prebiotic & Microbiome-Nourishing Staples'
  },

  '/gluten-free-diet': {
    parent: { label: 'Gut Health', to: '/gut-health' },
    breadcrumb: 'GLUTEN-FREE DIET GUIDE',
    badge: 'CLINICAL CELIAC & GLUTEN SENSITIVITY GUIDE',
    title: 'How to Start a Gluten-Free Diet: Practical Swaps Without Nutrient Gaps',
    subtitle:
      'Removing wheat without a clinical strategy often leads to low fibre, iron, and B-vitamin deficiencies. Learn what to eat, what to avoid, and how to thrive with Indian millets and whole grains.',
    primaryCta: { label: 'Request Free Diet Guide', to: '/contact?plan=Free%20Gluten-Free%20Diet%20Guide' },
    secondaryCta: { label: 'Browse Gluten-Free Recipes', to: '/gut-health-recipes', icon: 'Utensils' },
    waMessage: 'Hi Meenu, I need clinical guidance on transitioning to a balanced gluten-free diet.',
    trustItems: [
      'Celiac & Non-Celiac Sensitivity Care',
      'Indian Millet & Whole-Grain Swaps',
      'Prevents Fibre & Iron Deficiencies'
    ],
    image: '/images/heroes/stock/gluten-free-grains.jpg',
    imageAlt: 'Naturally gluten-free rice, lentils, sweet potato and greens in ceramic bowls',
    imageCaption: 'Naturally Gluten-Free Whole Grains & Pulses'
  },

  '/liver-detox-foods': {
    parent: { label: 'Gut Health', to: '/gut-health' },
    breadcrumb: 'NATURAL LIVER DETOX FOODS',
    badge: 'EVIDENCE-BASED HEPATIC & METABOLIC NUTRITION',
    title: 'Liver Detox Foods: Support Natural Detox Pathways Without Harsh Cleanses',
    subtitle:
      'Skip juice fasts, extreme starvation, and unverified detox powders. Nourish your liver, gut, and kidneys daily using sulfur-rich aromatics, soluble fibre, cruciferous greens, and antioxidants.',
    primaryCta: { label: 'Book Free Discovery Call', action: 'book' },
    secondaryCta: { label: 'Check Your Gut Score', to: '/gut-health-checker', icon: 'Activity' },
    waMessage: 'Hi Meenu, I want to discuss food-first nutrition support for fatty liver and metabolic detox.',
    trustItems: [
      'Science-Backed Liver & Gut Support',
      'No Juice Fasts or Harsh Laxatives',
      'Everyday Indian Kitchen Staples'
    ],
    image: '/images/guides/liver-detox-foods.jpg',
    imageAlt: 'Fresh cruciferous greens, celery, avocado and green vegetable blend',
    imageCaption: 'Cruciferous Greens & Natural Hepatic Support'
  },

  '/sports-nutrition': {
    breadcrumb: 'SPORTS NUTRITION',
    badge: 'PERFORMANCE & RECOVERY SPORTS NUTRITION',
    title: 'Sports Nutrition: Fuel Training, Match-Day Output & Faster Recovery',
    subtitle:
      'Periodised performance nutrition for swimmers, squash players, combat athletes, runners, and team-sport competitors. Built around training load, body composition, hydration, and real Indian meals.',
    primaryCta: { label: 'Book Sports Discovery Call', action: 'book' },
    secondaryCta: { label: 'View Athlete Podium Results', to: '/results', icon: 'Trophy' },
    waMessage: 'Hi Meenu, I would like to discuss a personalised sports nutrition and competition fuelling plan.',
    trustItems: [
      'National & International Medalists',
      'Training & Match-Day Periodisation',
      'Evidence-Led Supplement Guidance'
    ],
    image: '/images/heroes/stock/sports-hub.jpg',
    imageAlt: 'Athlete preparing running shoes and hydration bottle for outdoor training',
    imageCaption: 'Periodised Training, Hydration & Recovery'
  },

  '/sports-nutrition/youth-teen-athletes': {
    parent: { label: 'Sports Nutrition', to: '/sports-nutrition' },
    breadcrumb: 'YOUTH & TEEN ATHLETE NUTRITION',
    badge: 'ADOLESCENT & JUNIOR ATHLETE FUELLING',
    title: 'Youth & Teen Athletes: Growth-Safe Fuelling for School & Academy Sport',
    subtitle:
      'Young athletes cannot train hard on adult calorie-cutting diets. We protect linear height growth, bone density, immunity, and exam focus while fuelling early-morning sessions and tournaments.',
    primaryCta: { label: 'Book Parent Discovery Call', action: 'book' },
    secondaryCta: { label: 'Explore Competitive Athlete Care', to: '/sports-nutrition/competitive-athletes', icon: 'Trophy' },
    waMessage: 'Hi Meenu, I am looking for sports nutrition guidance for my child or teen athlete.',
    trustItems: [
      'Growth, Bone & Puberty Safe',
      'School Tiffin & Early-Training Plans',
      'Trusted by National Junior Champions'
    ],
    image: '/images/heroes/stock/youth-athletes.jpg',
    imageAlt: 'Competitive swimmers training in lane pool during practice session',
    imageCaption: 'Growth-Safe Adolescent Athletic Fuelling'
  },

  '/sports-nutrition/competitive-athletes': {
    parent: { label: 'Sports Nutrition', to: '/sports-nutrition' },
    breadcrumb: 'COMPETITIVE ATHLETE PROTOCOL',
    badge: 'ELITE & TOURNAMENT PERFORMANCE PROTOCOL',
    title: 'Competitive Athletes: Precision Macros, Sweat Strategy & Peak Taper',
    subtitle:
      'When fractions of a second or weight-class discipline decide podiums, guesswork costs medals. Precision carbohydrate loading, sweat-electrolyte calibration, travel nutrition, and GI-safe race fuelling.',
    primaryCta: { label: 'Book Performance Consultation', action: 'book' },
    secondaryCta: { label: 'See Champion Case Studies', to: '/results', icon: 'Trophy' },
    waMessage: 'Hi Meenu, I am preparing for upcoming competitions and need an elite sports nutrition strategy.',
    trustItems: [
      'Race-Week & Weight-Make Protocols',
      'Electrolyte & Sweat-Rate Calibration',
      'Travel & Tournament Meal Strategy'
    ],
    image: '/images/heroes/stock/competitive-athletes.jpg',
    imageAlt: 'Track sprinters set in starting blocks before race start',
    imageCaption: 'Race-Week Taper & Competition Fuelling'
  },

  '/more-care': {
    breadcrumb: 'SPECIALIST CLINICAL CARE',
    badge: 'FAMILY, METABOLIC & HORMONAL NUTRITION',
    title: 'More Care: Personalised Clinical Nutrition for Every Stage of Health',
    subtitle:
      'Targeted food-first programs for growing children, neurodivergent focus (ADHD), Type 2 diabetes and HbA1c control, PCOS hormonal balance, and sustainable weight management.',
    primaryCta: { label: 'Book Free Discovery Call', action: 'book' },
    secondaryCta: { label: 'Compare All Nutrition Plans', to: '/programs-pricing', icon: 'ClipboardList' },
    waMessage: 'Hi Meenu, I would like guidance on choosing the right specialist nutrition program.',
    trustItems: [
      '5 Dedicated Clinical Care Tracks',
      'Tailored to Indian Home Kitchens',
      'Complements Your Medical Care'
    ],
    image: '/images/heroes/stock/more-care-hub.jpg',
    imageAlt: 'Traditional Indian home meal with dal, leafy greens and steamed rice',
    imageCaption: 'Built Around Familiar Indian Home Cooking'
  },

  '/more-care/child-teen-nutrition': {
    parent: { label: 'More Care', to: '/more-care' },
    breadcrumb: 'CHILD & TEEN NUTRITION',
    badge: 'PAEDIATRIC & ADOLESCENT NUTRITION CARE',
    title: 'Child & Teen Nutrition: Stress-Free Meals for Growth, Immunity & Focus',
    subtitle:
      'From picky eating and slow weight gain to teenage energy slumps and micronutrient gaps. Practical, kid-approved Indian tiffin and family meal strategies without dinner-table battles.',
    primaryCta: { label: 'Book Parent Discovery Call', action: 'book' },
    secondaryCta: { label: 'Explore ADHD Child Nutrition', to: '/more-care/adhd-nutrition', icon: 'HeartHandshake' },
    waMessage: 'Hi Meenu, I would like personalised nutrition support for my child or teenager.',
    trustItems: [
      'Picky Eating & Growth Milestones',
      'Practical School Tiffin Frameworks',
      'Zero Food Guilt or Mealtime Pressure'
    ],
    image: '/images/heroes/stock/child-teen.jpg',
    imageAlt: 'Smiling young child enjoying a nutritious plate of beans and rice',
    imageCaption: 'Stress-Free Childhood Growth & Immunity'
  },

  '/more-care/adhd-nutrition': {
    parent: { label: 'More Care', to: '/more-care' },
    breadcrumb: 'ADHD NUTRITION FOR CHILDREN',
    badge: 'NEURODIVERSITY, GUT-BRAIN & FOCUS PROTOCOL',
    title: 'ADHD Nutrition for Children: Steady Focus, Mood & Sensory-Safe Meals',
    subtitle:
      'Supporting attention, neurotransmitter synthesis, gut-brain balance, and medication-related appetite dips through calm, sensory-respectful Indian meals built around school routines.',
    primaryCta: { label: 'Book Parent Discovery Call', action: 'book' },
    secondaryCta: { label: 'View Child & Teen Nutrition', to: '/more-care/child-teen-nutrition', icon: 'Utensils' },
    waMessage: 'Hi Meenu, I am looking for personalised ADHD nutrition support for my child.',
    trustItems: [
      'Sensory-Friendly Food Progression',
      'Iron, Zinc, Omega-3 & Gut-Brain Care',
      'Appetite & School-Day Pacing'
    ],
    image: '/images/heroes/stock/adhd-nutrition.jpg',
    imageAlt: 'Whole walnuts rich in omega-3 fatty acids for cognitive and brain nutrition',
    imageCaption: 'Omega-3, Micronutrient & Gut-Brain Care'
  },

  '/more-care/diabetes': {
    parent: { label: 'More Care', to: '/more-care' },
    breadcrumb: 'DIABETES & METABOLIC CARE',
    badge: 'GLYCEMIC CONTROL & INSULIN SENSITIVITY CARE',
    title: 'Diabetes Nutrition: Lower HbA1c & Stabilise Blood Sugar with Indian Meals',
    subtitle:
      'You do not have to banish rice, rotis, or family meals to manage Type 2 diabetes or pre-diabetes. We sequence protein, fibre, and carbohydrates to flatten glucose spikes naturally.',
    primaryCta: { label: 'Book Free Discovery Call', action: 'book' },
    secondaryCta: { label: 'See HbA1c Client Outcomes', to: '/results', icon: 'Activity' },
    waMessage: 'Hi Meenu, I want to discuss a personalised nutrition plan for blood sugar and HbA1c management.',
    trustItems: [
      'Type 2, Pre-Diabetes & CGM Support',
      'Balanced Indian Rice & Millet Meals',
      'Clinician-Aligned Lab Tracking'
    ],
    image: '/images/heroes/stock/diabetes-care.jpg',
    imageAlt: 'Checking real-time blood glucose levels using a continuous glucose monitor',
    imageCaption: 'CGM-Informed Glycemic & HbA1c Control'
  },

  '/more-care/pcos': {
    parent: { label: 'More Care', to: '/more-care' },
    breadcrumb: 'PCOS & HORMONAL NUTRITION',
    badge: 'INSULIN-RESISTANT & INFLAMMATORY PCOS CARE',
    title: 'PCOS Nutrition: Restore Cycle Regularity, Energy & Hormonal Balance',
    subtitle:
      'Irregular periods, stubborn cravings, acne, and fatigue stem from insulin resistance and chronic inflammation—not lack of willpower. Heal hormonal signalling without crash dieting.',
    primaryCta: { label: 'Book Free Discovery Call', action: 'book' },
    secondaryCta: { label: 'View PCOS Client Stories', to: '/results', icon: 'Award' },
    waMessage: 'Hi Meenu, I would like to discuss a personalised nutrition plan for PCOS and hormonal health.',
    trustItems: [
      'Insulin & Androgen Root-Cause Care',
      'Cycle, Skin & Craving Stability',
      'No Starvation or Crash Diets'
    ],
    image: '/images/heroes/stock/pcos-hormonal.jpg',
    imageAlt: 'Nutrient-dense bowl with avocado, sesame seeds and leafy greens for hormonal balance',
    imageCaption: 'Insulin-Sensitive & Anti-Inflammatory Meals'
  },

  '/more-care/weight-loss': {
    parent: { label: 'More Care', to: '/more-care' },
    breadcrumb: 'SUSTAINABLE WEIGHT MANAGEMENT',
    badge: 'METABOLIC FAT LOSS & HABIT ARCHITECTURE',
    title: 'Sustainable Weight Loss: Lose Fat Without Rebound or Extreme Restriction',
    subtitle:
      'Crash diets strip muscle, slow thyroid metabolism, and guarantee weight regain. Build satiety-led meals that work through busy workdays, dining out, travel, and family cooking.',
    primaryCta: { label: 'Book Free Discovery Call', action: 'book' },
    secondaryCta: { label: 'Compare Weight Loss Plans', to: '/programs-pricing', icon: 'ClipboardList' },
    waMessage: 'Hi Meenu, I want to discuss a sustainable, personalised weight loss nutrition plan.',
    trustItems: [
      'Muscle-Preserving Metabolic Plans',
      'Dining-Out & Work-Travel Strategies',
      'Lasting Habits Without Starvation'
    ],
    image: '/images/heroes/stock/weight-loss.jpg',
    imageAlt: 'Roasted seasonal vegetables, sesame seeds and fresh herbs in ceramic bowl',
    imageCaption: 'Satiety-Led Metabolic Fat Loss Without Crash Diets'
  },

  '/programs-pricing': {
    breadcrumb: 'PROGRAMS & PRICING',
    badge: 'PERSONALISED CLINICAL NUTRITION PACKAGES',
    title: 'Programs & Pricing: Transparent Plans Built Around Your Physiology',
    subtitle:
      'Compare structured 4-week, 3-month, and 6-month clinical nutrition packages, specialist care tracks, and the executive Signature Nutrition Program—100% customised to your labs and kitchen.',
    primaryCta: { label: 'Book Free Discovery Call', action: 'book' },
    secondaryCta: { label: 'Browse All 31 Pricing Plans', to: '/pricing-plans/list', icon: 'ClipboardList' },
    waMessage: 'Hi Meenu, I would like help choosing the right nutrition program and duration for my goals.',
    trustItems: [
      '100% Customised Meal Plans',
      'Regular Video & WhatsApp Reviews',
      '4,500+ Clients Served Globally'
    ],
    image: '/images/heroes/stock/programs-pricing.jpg',
    imageAlt: 'Assorted whole mushrooms, squash and garlic on rustic wooden kitchen table',
    imageCaption: '100% Customised Whole-Food Nutrition Packages'
  },

  '/pricing-plans/list': {
    parent: { label: 'Programs & Pricing', to: '/programs-pricing' },
    breadcrumb: 'COMPLETE PRICING CATALOGUE',
    badge: 'FULL DIRECTORY OF 31 NUTRITION PLANS',
    title: 'Choose Your Pricing Plan: Complete Directory of Clinical & Sports Packages',
    subtitle:
      'Search and compare all 31 consultation packages across gut recovery, sports performance, diabetes, PCOS, child nutrition, and international coaching with transparent inclusions.',
    primaryCta: { label: 'Book Free Discovery Call', action: 'book' },
    secondaryCta: { label: 'Back to Featured Packages', to: '/programs-pricing', icon: 'ClipboardList' },
    waMessage: 'Hi Meenu, I am reviewing the pricing catalogue and need guidance on selecting the best plan.',
    trustItems: [
      '31 Structured Clinical Packages',
      'Transparent Durations & Inclusions',
      'India & International Options'
    ],
    image: '/images/heroes/stock/pricing-catalogue.jpg',
    imageAlt: 'Colourful fresh vegetables, citrus, broccoli and avocados around wooden board',
    imageCaption: '31 Structured Clinical & Sports Plans'
  },

  '/signature-nutrition-program': {
    parent: { label: 'Programs & Pricing', to: '/programs-pricing' },
    breadcrumb: 'SIGNATURE NUTRITION PROGRAM',
    badge: 'SELECTIVE EXECUTIVE METABOLIC PERFORMANCE',
    title: 'Signature Nutrition Program: Data-Led Metabolic Performance for Leaders',
    subtitle:
      'A high-touch 24-week clinical engagement integrating blood chemistry, body composition, microbiome or nutrigenomic insights, and bi-monthly 1:1 reviews for founders and senior executives.',
    primaryCta: { label: 'Enquire About Application', to: '/contact?plan=Signature%20Nutrition%20Program' },
    secondaryCta: { label: 'Compare All Programs', to: '/programs-pricing', icon: 'ClipboardList' },
    waMessage: 'Hi Meenu, I would like to enquire about the 24-week Signature Nutrition Program.',
    trustItems: [
      'Selective Intake: 3 Clients / Quarter',
      '24-Week Biomarker-Led Protocol',
      'Direct 1:1 Executive Access'
    ],
    image: '/images/heroes/stock/signature-executive.jpg',
    imageAlt: 'Executive workspace with laptop, tablet notes, reading glasses and plants',
    imageCaption: '24-Week Executive Biomarker-Led Engagement'
  },

  '/academy': {
    breadcrumb: 'PRAGMATIC NUTRITION ACADEMY',
    badge: 'CLINICAL EDUCATION & PRACTICE MENTORSHIP',
    title: 'Pragmatic Nutrition Academy: Evidence-Led Courses & Practice Mentorship',
    subtitle:
      'Practical nutrition webinars for individuals and families alongside specialised clinical certificate courses and private-practice business mentorship for dietitians and nutritionists.',
    primaryCta: { label: 'Enquire About Courses', to: '/contact?course=Pragmatic%20Nutrition%20Academy' },
    secondaryCta: { label: 'Courses for Nutritionists', to: '/academy/certificate-courses', icon: 'GraduationCap' },
    waMessage: 'Hi Meenu, I would like to learn more about Pragmatic Nutrition Academy courses and upcoming cohorts.',
    trustItems: [
      'Taught by Meenu Balaji, M.H.Sc',
      'Case-Study & Evidence-Driven',
      'Live & Self-Paced Online Formats'
    ],
    image: '/images/heroes/stock/academy-hub.jpg',
    imageAlt: 'Live interactive online nutrition cohort webinar on laptop',
    imageCaption: 'Live Cohorts, Webinars & Clinical Mentorship'
  },

  '/academy/courses-masterclasses': {
    parent: { label: 'Academy', to: '/academy' },
    breadcrumb: 'COURSES & MASTERCLASSES',
    badge: 'PUBLIC WEBINARS & HEALTHY EATING MASTERCLASSES',
    title: 'Courses for Everyone: Practical Masterclasses on Everyday Nutrition',
    subtitle:
      'Focused single-session webinars on gut health, child nutrition, picky eating, mindful eating, plant-based diets, and sports fuelling—designed for immediate use in your home kitchen.',
    primaryCta: { label: 'Enquire About Enrolment', to: '/contact?course=Courses%20for%20Everyone' },
    secondaryCta: { label: 'Professional Certificate Courses', to: '/academy/certificate-courses', icon: 'GraduationCap' },
    waMessage: 'Hi Meenu, I would like details on enrolling in your public nutrition webinars and masterclasses.',
    trustItems: [
      '6 Practical Topic Masterclasses',
      'Interactive Online & Recorded Access',
      'Actionable Everyday Meal Frameworks'
    ],
    image: '/images/heroes/stock/academy-public.jpg',
    imageAlt: 'Learning healthy home cooking and nutrition from laptop in kitchen',
    imageCaption: 'Practical Everyday Home-Kitchen Masterclasses'
  },

  '/academy/online-nutrition-courses': {
    parent: { label: 'Academy', to: '/academy' },
    breadcrumb: 'LEARN NUTRITION ONLINE',
    badge: 'ONLINE NUTRITION WEBINARS & MINI COURSES',
    title: 'Learn Nutrition Online: Build Lifelong Healthy Eating Skills from Home',
    subtitle:
      'Interactive online sessions covering child nutrition, picky eating solutions, gut wellness, plant-based transitions, mindful eating, and athletic fuelling led by a practising clinician.',
    primaryCta: { label: 'Ask About Upcoming Sessions', to: '/contact?course=Online%20Nutrition%20Courses' },
    secondaryCta: { label: 'View Updated Course Catalogue', to: '/academy/courses-masterclasses', icon: 'BookOpen' },
    waMessage: 'Hi Meenu, I would like to confirm availability and fees for your online nutrition courses.',
    trustItems: [
      'Accessible Anywhere Online',
      'Certificate of Completion',
      'Chat Support During Learning'
    ],
    image: '/images/heroes/stock/academy-public.jpg',
    imageAlt: 'Interactive online nutrition learning session in a home kitchen',
    imageCaption: 'Self-Paced & Live Online Nutrition Sessions'
  },

  '/academy/certificate-courses': {
    parent: { label: 'Academy', to: '/academy' },
    breadcrumb: 'CERTIFICATE COURSES FOR NUTRITIONISTS',
    badge: 'CONTINUING CLINICAL EDUCATION FOR PRACTITIONERS',
    title: 'Courses for Nutritionists: Master Clinical Gut, Lab & Hormone Protocols',
    subtitle:
      'Upskill with applied modules in gut microbiome therapy, interpreting medical lab reports, CGM glucose analysis, menopause and hormonal health, nutrition blogging, and private practice.',
    primaryCta: { label: 'Enquire About Practitioner Courses', to: '/contact?course=Courses%20for%20Nutritionists' },
    secondaryCta: { label: '8-Week Private Practice Intensive', to: '/academy/build-your-private-practice', icon: 'GraduationCap' },
    waMessage: 'Hi Meenu, I am a nutritionist/dietitian interested in your professional certificate courses.',
    trustItems: [
      '10 Applied Practitioner Modules',
      'Real Clinical Case Studies',
      'Certification Upon Completion'
    ],
    image: '/images/heroes/stock/academy-practitioner.jpg',
    imageAlt: 'Healthcare clinician in white coat documenting clinical case notes on clipboard',
    imageCaption: 'Applied Clinical Training for Dietitians'
  },

  '/academy/build-your-private-practice': {
    parent: { label: 'Academy', to: '/academy' },
    breadcrumb: 'BUILD YOUR PRIVATE PRACTICE',
    badge: '8-WEEK NUTRITION BUSINESS & LAUNCH INTENSIVE',
    title: 'Launch Your Private Practice: From Qualified Dietitian to Thriving Practice',
    subtitle:
      'An 8-week live mentorship for Indian nutritionists and dietitians covering niche positioning, service pricing, client retention workflows, legal templates, local SEO, and a 90-day launch plan.',
    primaryCta: { label: 'Enquire About Next Cohort', to: '/contact?course=Build%20Your%20Private%20Practice%20(8-Week%20Intensive)' },
    secondaryCta: { label: 'Masterclass Registration', to: '/academy/masterclass-registration', icon: 'GraduationCap' },
    waMessage: 'Hi Meenu, I want to enquire about the 8-week Build Your Private Practice intensive for nutritionists.',
    trustItems: [
      '8 Live Interactive Weekly Sessions',
      'Templates, Pricing & Legal Toolkit',
      '1:1 Website & Social Audit Included'
    ],
    image: '/images/heroes/stock/academy-practice.jpg',
    imageAlt: 'Confident female practitioner working on laptop surrounded by botanical greenery',
    imageCaption: '8-Week Private Practice Business Intensive'
  },

  '/academy/masterclass-registration': {
    parent: { label: 'Academy', to: '/academy' },
    breadcrumb: 'PRIVATE PRACTICE MASTERCLASS',
    badge: 'EXCLUSIVE MASTERCLASS FOR DIETITIANS & NUTRITIONISTS',
    title: 'Private Practice Masterclass: Confidently Set Up & Grow Your Practice',
    subtitle:
      'Designed exclusively for qualified nutritionists and dietitians ready to bridge the gap between clinical degrees and sustainable client acquisition, ethical pricing, and practice systems.',
    primaryCta: { label: 'Ask About Masterclass Dates', to: '/contact?course=Private%20Practice%20Masterclass%20Registration' },
    secondaryCta: { label: 'Explore Full 8-Week Intensive', to: '/academy/build-your-private-practice', icon: 'GraduationCap' },
    waMessage: 'Hi Meenu, I would like registration details for the Private Practice Masterclass for nutritionists.',
    trustItems: [
      'Exclusively for Nutrition Professionals',
      'Client Acquisition & Pricing Insights',
      'Includes Practitioner Resource Hub'
    ],
    image: '/images/heroes/stock/academy-practice.jpg',
    imageAlt: 'Nutrition professional building private practice strategy on laptop',
    imageCaption: 'Practitioner Business & Growth Masterclass'
  },

  '/blog': {
    breadcrumb: 'CLINICAL NUTRITION BLOG',
    badge: 'EVIDENCE-BASED GUT & PERFORMANCE ARTICLES',
    title: 'Clinical Nutrition Blog: Deep-Dive Guides on Gut Health & Athletic Fuel',
    subtitle:
      'Research-backed articles on IBS vs IBD, low stomach acid, vagus nerve regulation, psyllium husk, runner’s stomach, ADHD micronutrients, and sports nutrition—written by Meenu Balaji, M.H.Sc.',
    primaryCta: { label: 'Book Free Discovery Call', action: 'book' },
    secondaryCta: { label: 'Check Your Gut Score', to: '/gut-health-checker', icon: 'Activity' },
    waMessage: 'Hi Meenu, I was reading your clinical nutrition blog and would like to book a consultation.',
    trustItems: [
      '151 Evidence-Based Clinical Guides',
      'Authored by Meenu Balaji, M.H.Sc',
      'Practical Indian Nutrition Context'
    ],
    image: '/images/heroes/stock/clinical-blog.jpg',
    imageAlt: 'Reading desk with laptop, book and warm beverage',
    imageCaption: 'Evidence-Based Clinical & Sports Guides'
  },

  '/terms': {
    breadcrumb: 'TERMS & CONDITIONS',
    badge: 'PRACTICE GOVERNANCE & SERVICE TERMS',
    title: 'Terms & Conditions: Clinical Consultation & Program Guidelines',
    subtitle:
      'Transparent terms governing clinical nutrition consultations, program validity windows, medical disclaimers, intellectual property, and client responsibilities at Pragmatic Nutrition.',
    primaryCta: { label: 'Contact Practice Team', to: '/contact' },
    secondaryCta: { label: 'Read Privacy Policy', to: '/privacy', icon: 'ShieldCheck' },
    waMessage: 'Hi Meenu, I have a question regarding Pragmatic Nutrition service terms.',
    trustItems: [
      'Transparent Consultation Policies',
      'Clear Medical Scope & Disclaimers',
      'Client-First Ethical Practice'
    ],
    image: '/images/heroes/stock/terms-agreement.jpg',
    imageAlt: 'Structured notebook, pens and green botanical leaf on wooden desk',
    imageCaption: 'Transparent Practice Governance & Terms'
  },

  '/terms-of-use': {
    breadcrumb: 'WEBSITE TERMS OF USE',
    badge: 'WEBSITE ACCESS & EDUCATIONAL CONTENT TERMS',
    title: 'Terms of Use: Website Content, Tools & Educational Resources',
    subtitle:
      'Guidelines for accessing Pragmatic Nutrition articles, self-report tools, recipes, and digital resources, including educational scope and permitted personal use.',
    primaryCta: { label: 'Contact Practice Team', to: '/contact' },
    secondaryCta: { label: 'Read Terms & Conditions', to: '/terms', icon: 'FileText' },
    waMessage: 'Hi Meenu, I have a question regarding Pragmatic Nutrition website terms of use.',
    trustItems: [
      'Educational Content Scope',
      'Clear Intellectual Property Rules',
      'Updated Practice Documentation'
    ],
    image: '/images/heroes/stock/terms-of-use-laptop.jpg',
    imageAlt: 'Clinical documentation notebook and pen on wooden desk',
    imageCaption: 'Educational Content & Website Guidelines'
  },

  '/privacy': {
    breadcrumb: 'PRIVACY POLICY',
    badge: 'CLIENT CONFIDENTIALITY & DATA PROTECTION',
    title: 'Privacy Policy: How We Safeguard Your Health & Personal Information',
    subtitle:
      'Your health history, lab reports, and consultation records are handled with strict clinical confidentiality. Read how Pragmatic Nutrition collects, protects, and manages personal data.',
    primaryCta: { label: 'Contact Practice Team', to: '/contact' },
    secondaryCta: { label: 'Read Terms & Conditions', to: '/terms', icon: 'FileText' },
    waMessage: 'Hi Meenu, I have a question regarding client data privacy at Pragmatic Nutrition.',
    trustItems: [
      'Strict Clinical Confidentiality',
      'Secure Health Record Handling',
      'Zero Unauthorized Data Sharing'
    ],
    image: '/images/heroes/stock/practice-governance.jpg',
    imageAlt: 'Confidential clinical documentation notebook and pen on wooden desk',
    imageCaption: 'Strict Clinical Confidentiality & Privacy'
  },

  '/refund': {
    breadcrumb: 'REFUND & CANCELLATION POLICY',
    badge: 'ENROLMENT, RESCHEDULING & REFUND TERMS',
    title: 'Refund Policy: Clear Enrolment, Cancellation & Rescheduling Terms',
    subtitle:
      'Straightforward policies covering consultation bookings, nutrition package enrolments, academy workshops, appointment rescheduling notices, and payment support.',
    primaryCta: { label: 'Contact Practice Team', to: '/contact' },
    secondaryCta: { label: 'View Programs & Pricing', to: '/programs-pricing', icon: 'ClipboardList' },
    waMessage: 'Hi Meenu, I have a question about program enrolment and refund terms.',
    trustItems: [
      'Clear Booking & Enrolment Rules',
      'Direct Billing & Support Contact',
      'Transparent Rescheduling Guidelines'
    ],
    image: '/images/heroes/stock/practice-governance.jpg',
    imageAlt: 'Practice administration notebook and pen on wooden desk',
    imageCaption: 'Clear Enrolment & Rescheduling Policies'
  },

  '404': {
    breadcrumb: 'PAGE NOT FOUND',
    badge: '404 NAVIGATION NOTICE',
    title: 'Page Not Found: Let Us Guide You Back to the Right Clinical Resource',
    subtitle:
      'The link you followed may have moved or no longer exists. Explore our gut health protocols, sports nutrition services, or book a free discovery call directly below.',
    primaryCta: { label: 'Return to Homepage', to: '/' },
    secondaryCta: { label: 'Explore Gut Health Care', to: '/gut-health', icon: 'Activity' },
    waMessage: 'Hi Meenu, I am looking for a specific nutrition resource on Pragmatic Nutrition.',
    trustItems: [
      'Gut Health & Sports Nutrition',
      '31 Personalised Nutrition Plans',
      'Online & Chennai Consultations'
    ],
    image: '/images/heroes/stock/not-found-guide.jpg',
    imageAlt: 'Whole coriander seeds, turmeric spice and fresh herbs on stone counter',
    imageCaption: 'Food-First Clinical & Sports Nutrition'
  }
}

export const PATH_ALIASES = {
  '/about-us': '/about',
  '/about-meenu-balaji-nutritionist': '/about',
  '/contact-us': '/contact',
  '/gut-health-assessment': '/gut-health-checker',
  '/gut-assessment': '/gut-health-checker',
  '/sports-nutritionist-india': '/sports-nutrition',
  '/child-nutritionist-india': '/more-care/child-teen-nutrition',
  '/adhd-nutritionist-children': '/more-care/adhd-nutrition',
  '/more-care/adhd': '/more-care/adhd-nutrition',
  '/best-diabetes-nutritionist-india': '/more-care/diabetes',
  '/nutrition-plans': '/programs-pricing',
  '/nutrition-private-practice': '/academy/build-your-private-practice',
  '/nutritionist-practice-masterclass-registration': '/academy/masterclass-registration',
  '/nutritionist-certificate-courses': '/academy/certificate-courses',
  '/online-courses-for-nutritionists': '/academy/certificate-courses',
  '/online-nutrition-course': '/academy/courses-masterclasses',
  '/online-nutrition-courses': '/academy/online-nutrition-courses',
  '/nutrition-blog': '/blog',
  '/terms-conditions': '/terms',
  '/privacy-policy-1': '/privacy',
  '/refund-policy': '/refund'
}

export function resolvePageHero(pathname, heroKey) {
  if (heroKey && PAGE_HEROES[heroKey]) {
    return PAGE_HEROES[heroKey]
  }
  const normalized = (pathname || '').replace(/\/+$/, '') || '/'
  const canonical = PATH_ALIASES[normalized] || normalized
  return PAGE_HEROES[canonical] || null
}
