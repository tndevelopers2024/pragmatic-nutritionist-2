/**
 * Comprehensive clinical data for Gut Health & related condition pages
 * Pragmatic Nutrition - Meenu Balaji, M.H.Sc
 */

export const GUT_HERO = {
  badge: 'CLINICAL GUT HEALTH NUTRITION • EVIDENCE-BASED',
  title: 'Meenu Balaji, Gut Health Nutritionist in India: Personalised Plans for IBS, Bloating & SIBO',
  subtitle:
    "Struggling with bloating, acidity, SIBO, or IBS that keeps coming back? The problem isn't your willpower; every gut is different, and generic diets rarely work.",
  intro:
    "Meenu Balaji is a clinical gut health nutritionist with 14 years of experience across India, the UK, and New Zealand. At Pragmatic Nutrition, we identify what's actually driving your symptoms—SIBO, food intolerances, microbiome imbalance, or gut inflammation—and build a recovery plan around real Indian food and your real life.",
  stats: [
    { value: '4,500+', label: 'Clients', sub: 'Trusted by 4,500+ clients' },
    { value: '14+ Yrs', label: 'Clinical Expertise', sub: 'India, UK & New Zealand' },
    { value: '8–12 Wks', label: 'Results', sub: 'Results vary between individuals' },
    { value: 'Food-First', label: 'Indian Cuisine', sub: 'Zero starvation or generic charts' }
  ],
  locationsNote: 'Chennai clinic appointments + Online consultations across India, USA, UK, UAE, Australia, and New Zealand.',
  heroImage: '/images/heroes/stock/gut-health-hub.jpg',
  heroImageAlt: 'Probiotic yogurt bowl topped with fresh figs, hemp seeds and toasted coconut',
  heroImageCaption: 'Microbiome-Led Indian Gut Protocols'
}

export const COMMON_SYMPTOMS = [
  {
    id: 'bloating',
    title: 'Post-Meal Bloating & Distension',
    desc: 'Waking up with a flat stomach but looking pregnant by evening. Trapped gas, abdominal tightness, and visible distension after simple meals.',
    tag: 'SIBO / Fermentation'
  },
  {
    id: 'acidity',
    title: 'Chronic Acidity, Heartburn & GERD',
    desc: 'Burning chest sensation, sour regurgitation, throat irritation, and heavy reliance on daily PPI antacids that mask the underlying dysfunction.',
    tag: 'Gastric Motility'
  },
  {
    id: 'ibs',
    title: 'Irritable Bowel Syndrome (IBS)',
    desc: 'Unpredictable bowels—sudden urgency, diarrhea (IBS-D), chronic constipation (IBS-C), or painful alternating patterns with visceral hypersensitivity.',
    tag: 'Gut-Brain Axis'
  },
  {
    id: 'food-intolerances',
    title: 'Food Sensitivities & Post-Meal Fatigue',
    desc: 'Mysterious reactions to gluten, dairy, onions, garlic, or histamine foods. Feeling sluggish, brain-fogged, or exhausted within an hour of eating.',
    tag: 'Enzyme & Barrier Issue'
  },
  {
    id: 'constipation',
    title: 'Sluggish Motility & Incomplete Evacuation',
    desc: 'Straining, hard stools, skipping days without bowel movements, or the persistent feeling that your bowel hasn’t completely emptied.',
    tag: 'Slow Transit & Hydration'
  },
  {
    id: 'leaky-gut',
    title: 'Leaky Gut & Systemic Inflammation',
    desc: 'Intestinal permeability causing widespread inflammation, skin flare-ups (acne, eczema), histamine rushes, and gut-related hormonal or PCOS symptoms.',
    tag: 'Mucosal Barrier'
  }
]

export const WHY_STANDARD_DIETS_FAIL = {
  eyebrow: 'THE PROBLEM WITH GENERIC DIETS',
  heading: 'Why Most Gut Treatments Give Only Temporary Relief',
  lead:
    'Persistent digestive issues can feel overwhelming after trying multiple diets, supplements, or quick fixes. The problem is rarely your willpower—it is almost always a lack of clarity about what is actually driving your gut symptoms.',
  points: [
    {
      title: 'The Elimination Trap',
      desc: 'Cutting out gluten, dairy, lentils, and spices gives short-term calm but starves your microbiome. When you reintroduce food, symptoms return worse than before because the gut lining was never repaired.'
    },
    {
      title: 'Western Diets That Ignore Indian Food Culture',
      desc: 'Standard Western low-FODMAP charts tell you to eat kale and quinoa while banning dal, sambhar, and rasam. We restore gut tolerance using traditional Indian cooking methods, balanced spices, and familiar comfort staples.'
    },
    {
      title: 'Random Probiotics & Blind Cleanses',
      desc: 'Commercial probiotic capsules contain arbitrary bacterial strains that often exacerbate SIBO and histamine reactions. Probiotics must be strategically targeted, not blindly consumed.'
    },
    {
      title: 'Ignoring The Gut-Brain & Stress Axis',
      desc: 'Digestion requires a parasympathetic "rest and digest" state. Without addressing mealtime pace, chewing physiology, and vagal tone, food remains partially fermented in the gut.'
    }
  ]
}

export const THREE_PHASE_ROADMAP = [
  {
    step: '01',
    phase: 'Phase 1: Reset & Calm',
    timeline: 'Weeks 1 – 4',
    badge: 'Immediate Comfort',
    title: 'Soothe Gut Lining & Reduce Acute Inflammation',
    desc: 'We map your specific trigger foods, quiet down visceral nerve hypersensitivity, and introduce easily digestible Indian comfort meals.',
    highlights: [
      'Targeted trigger substitution without starvation',
      'Digestive tea protocols (ajwain, jeera, ginger infusion)',
      'Meal spacing & circadian eating rhythm alignment',
      'Baseline symptom scoring & Bristol stool logging'
    ]
  },
  {
    step: '02',
    phase: 'Phase 2: Restore & Repair',
    timeline: 'Weeks 5 – 12',
    badge: 'Root-Cause Healing',
    title: 'Heal Mucosal Barrier & Optimize Digestive Secretions',
    desc: 'We rebuild the gut lining, support natural stomach acid and pancreatic enzyme production, and clear bacterial overgrowth.',
    highlights: [
      'Mucosal barrier support (L-glutamine, zinc carnosine, polyphenol foods)',
      'Microbial balancing (antimicrobial herbal support for SIBO when indicated)',
      'Enzymatic priming for smooth carbohydrate & fat digestion',
      'Regular 10-day video check-ins to monitor mucosal response'
    ]
  },
  {
    step: '03',
    phase: 'Phase 3: Rebuild & Sustain',
    timeline: 'Weeks 13 – 24',
    badge: 'Lasting Food Freedom',
    title: 'Microbial Diversification & Confident Reintroduction',
    desc: 'Systematically reintroduce previously sensitive foods (beans, regional lentils, dairy, fermentable fibers) to expand your microbiome diversity.',
    highlights: [
      'Phased FODMAP, dairy, and gluten reintroduction trials',
      'Prebiotic fiber expansion to nourish beneficial short-chain fatty acids (SCFAs)',
      'Vagus nerve regulation & stress resilience habits',
      'Long-term maintenance toolkit for dining out and travel'
    ]
  }
]

export const DIAGNOSTICS = [
  {
    name: 'GI-MAP Stool DNA Analysis',
    tag: 'Stool Microbiome & Pathogens',
    desc: 'Quantitative PCR analysis measuring commensal bacteria, parasites, fungal candida, digestive elastase, secretory IgA, and zonulin (intestinal permeability).'
  },
  {
    name: 'SIBO Lactulose Breath Test',
    tag: 'Small Intestinal Bacterial Overgrowth',
    desc: 'Non-invasive breath collection measuring hydrogen and methane gases produced by bacteria in the small intestine to diagnose SIBO and intestinal methanogen overgrowth (IMO).'
  },
  {
    name: 'Food Intolerance & Symptom Mapping',
    tag: 'Clinical Food Journaling',
    desc: 'Structured symptom tracking correlating meal timing, spice blends, and cooking methods with digestive responses to distinguish true sensitivities from motility distress.'
  },
  {
    name: 'Targeted Blood Chemistry Review',
    tag: 'Metabolic & Inflammatory Markers',
    desc: 'Evaluating systemic inflammation (hs-CRP), ferritin, Vitamin D, B12, liver enzymes, and thyroid function (TSH/Free T3/Free T4) that govern gut motility.'
  }
]

export const PROGRAMS = [
  {
    "id": "reset-4-weeks",
    "title": "4 Weeks Gut Reset & Nourish",
    "price": "6,499",
    "currency": "₹",
    "duration": "Valid for 4 weeks",
    "idealFor": "Acidity, bloating reset",
    "features": [
      "Initial 40 min Gut & Overall Health Assessment Video call",
      "Three 15-minute video check-ins",
      "Personalised gut-friendly meal plan & recipes",
      "Email and WhatsApp support"
    ],
    "ctaText": "Discuss this plan"
  },
  {
    "id": "recovery-3-months",
    "title": "3-Month Gut Recovery: Food Intolerance",
    "price": "18,500",
    "currency": "₹",
    "duration": "Valid for 3 months",
    "idealFor": "Restore gut balance and eat with confidence. Designed for people with acid reflux, gluten intolerance, bloating, fatigue, or brain fog after meals.",
    "features": [
      "Initial Video Consultation (45 mins)",
      "15-min Review call once in 10 days",
      "Anti-inflammatory and gut-calming food plan",
      "Symptom + Food Intolerance Tracking",
      "Targeted Supplement Guidance (Optional)",
      "WhatsApp support"
    ],
    "ctaText": "Discuss this plan"
  },
  {
    "id": "coaching-6-months",
    "title": "6-Month Advanced Gut Coaching: IBS, SIBO",
    "price": "35,000",
    "currency": "₹",
    "duration": "Valid for 6 months",
    "idealFor": "Root cause identified within weeks; symptom reduction around month 2–3; gut reset over 6 months. Ideal for chronic gut issues (IBS, IBD, leaky gut, SIBO, candida) and histamine intolerance.",
    "features": [
      "Led by Meenu – Gut Health Expert",
      "45 Minute Video for Expert-Level Review & Root-Cause Mapping",
      "Tailored Indian diet plans, updated monthly",
      "15 mins video review every 10 days",
      "Gut recovery, immune support, microbiome rebuilding",
      "Indian and global diets (low-FODMAP, SCD, gluten/dairy-free)",
      "Mindful eating practices",
      "WhatsApp support"
    ],
    "ctaText": "Discuss this plan"
  },
  {
    "id": "premium-6-months",
    "title": "6-Month Premium Gut Health Program",
    "price": "54,499",
    "currency": "₹",
    "duration": "Valid for 6 months",
    "idealFor": "Premium Gut Health program with Advanced Testing, Nutrition, Yoga and Fitness for long-term relief.",
    "features": [
      "Gut Microbiome test",
      "Tailored Indian Diet Plans, updated monthly",
      "3 Nutrition review sessions per month",
      "Symptom tracker + supplement guidance",
      "Phased Plan to reintroduce FODMAPs, dairy or gluten",
      "Ideal for IBS, leaky gut, SIBO, food intolerances, gut-PCOS",
      "2 Gut-calming Yoga sessions for vagus nerve",
      "2 sessions for Customised Fitness routine",
      "WhatsApp support"
    ],
    "ctaText": "Discuss this plan"
  },
  {
    "id": "global-coaching",
    "title": "Global Gut Health Nutrition Coaching",
    "price": "14,500",
    "currency": "₹",
    "priceSub": "every month",
    "duration": "Valid for 3 months",
    "idealFor": "Personalised online nutrition coaching to improve gut health and overall wellness without fad diets or restrictive cleanses.",
    "features": [
      "Build gut-friendly eating habits",
      "Balance stress, sleep, and hydration for better gut comfort",
      "Learn how to make sustainable dietary changes",
      "Stay motivated with personalized coaching",
      "Anti-inflammatory foods",
      "Guidance to choose the right supplements"
    ],
    "ctaText": "Discuss this plan"
  }
]

export const EIGHT_PILLARS = [
  {
    "icon": "Stethoscope",
    "title": "Assessment",
    "desc": "Start with a comprehensive evaluation of gut symptoms, food intolerances, and microbiome imbalances to restore digestive health naturally."
  },
  {
    "icon": "Utensils",
    "title": "Meal Planning",
    "desc": "Get practical gut-friendly meal plans and easy recipes designed to support digestion and promote a healthy microbiome."
  },
  {
    "icon": "UserCheck",
    "title": "Personalized Approach",
    "desc": "Your diet plan is uniquely tailored to your gut’s needs."
  },
  {
    "icon": "Sparkles",
    "title": "Digestive Support",
    "desc": "Discover mindful eating habits and portion control techniques to improve digestion and support gut health naturally."
  },
  {
    "icon": "Apple",
    "title": "Dietary Strategies",
    "desc": "Enjoy guidelines emphasizing fibre, prebiotics and probiotics for a diverse gut microbiome."
  },
  {
    "icon": "Moon",
    "title": "Lifestyle Adjustments",
    "desc": "Manage stress, improve sleep, and incorporate exercise to support a healthy gut and enhance digestive wellness."
  },
  {
    "icon": "Pill",
    "title": "Supplement Guidance",
    "desc": "Get personalized vitamin and supplement recommendations tailored to your gut health needs, based on your test reports."
  },
  {
    "icon": "ShieldCheck",
    "title": "Long-Term Maintenance",
    "desc": "Transition smoothly to a sustainable, healthy lifestyle with a 3-month maintenance plan—exclusively for our 12-month subscribers."
  }
]

export const CLINICAL_DIFFERENTIATORS = [
  "Uses root-cause assessment, not generic diet charts",
  "Has experience with IBS, SIBO, reflux, histamine intolerance and motility disorders",
  "Can interpret gut tests like GI-MAP and microbiome analysis",
  "Designs digestive-friendly food plans using Indian ingredients",
  "Tracks progress using symptom scoring, stool patterns and food response",
  "Adjusts the plan based on your unique gut function, not trends or fads"
]

export const WHO_IS_THIS_FOR = [
  {
    "title": "Individuals with Food Intolerances",
    "desc": "Individuals with food intolerances such as gluten or lactose intolerance."
  },
  {
    "title": "People Dealing with IBS & Acid Reflux",
    "desc": "People dealing with IBS, acid reflux, and various digestive discomforts seeking relief."
  },
  {
    "title": "Those Seeking Lasting Gut Health",
    "desc": "People committed to achieving lasting gut health and enhancing their overall well-being."
  },
  {
    "title": "Leaky Gut & Allergies",
    "desc": "People dealing with leaky gut syndrome and food or environmental allergies."
  }
]

export const GUT_FAQS = [
  {
    "q": "Who is the Best gut health nutritionist in Chennai?",
    "a": "Meenu Balaji, founder of Pragmatic Nutrition, is one of the leading gut health experts in Chennai with 14+ years of experience treating IBS, acidity, bloating and digestive issues."
  },
  {
    "q": "Can I consult Meenu Balaji in-person in Chennai?",
    "a": "Yes, Meenu offers in-person appointments in OMR clinic as well as online consultations."
  },
  {
    "q": "Can I Consult Meenu if I Live outside Chennai?",
    "a": "Yes, you can. Meenu offers online sessions"
  },
  {
    "q": "What gut health conditions can Pragmatic Nutrition help with?",
    "a": "Common issues addressed include IBS, bloating, leaky gut, acid reflux, PCOS-related gut dysfunction, food intolerances and fatigue due to poor digestion."
  },
  {
    "q": "Best online nutrition coaching for gut health in India",
    "a": "The best online gut health nutrition coaching in India is led by Meenu Balaji at Pragmatic Nutrition, a clinical gut health nutritionist with 14 years of experience across India, the UK, and New Zealand, M.H.Sc in Food Science and Nutrition, and a peer reviewer for the European Journal of Nutrition. Unlike generic meal plan services, Pragmatic Nutrition follows a diagnostic-led approach: assessing digestive symptoms, food intolerances, microbiome imbalances, stress load, and metabolic factors before designing any nutrition strategy. All plans are built around Indian foods, adapted to real-life routines, and reviewed every 10 days based on symptom response. Programs cover IBS, SIBO, acid reflux, leaky gut, histamine intolerance, and gut-related PCOS/PMOS. Online consultations are available across India and internationally."
  },
  {
    "q": "What are signs of an unhealthy gut?",
    "a": "Common symptoms include bloating, gas, diarrhoea, constipation, fatigue, brain fog, food intolerances, and weakened immunity. Discover the 10 surprising signs your gut health could be off—and what they mean for your overall wellbeing!"
  },
  {
    "q": "How can I manage gut health with diet in Chennai?",
    "a": "Gut health can be managed through diet by addressing digestion, food tolerance, gut inflammation, and microbiome balance. This typically involves identifying trigger foods, improving meal timing, optimizing fiber types, supporting beneficial gut bacteria, and correcting nutritional deficiencies based on individual symptoms. In Chennai, gut focused nutrition often incorporates traditional foods such as fermented foods, cooked vegetables, region-appropriate grains, and balanced spice use, while avoiding unnecessary food eliminations unless clinically indicated. Individuals looking for structured gut health support in Chennai often consult specialized gut health nutrition practices such as Pragmatic Nutrition, which focuses on diagnostic led, personalized gut and metabolic nutrition rather than generic meal plans."
  },
  {
    "q": "What are the best online diet plans for gut health in India?",
    "a": "The best online gut health diet plans in India are those built around your specific symptoms, root causes, and Indian food habits, not generic elimination charts. Meenu Balaji at Pragmatic Nutrition, clinical gut health nutritionist with 14 years of experience and peer reviewer for the European Journal of Nutrition, offers diagnostic-led online gut health programs across India. Each plan begins with a comprehensive assessment of digestive symptoms, food intolerances, microbiome imbalances, and lifestyle factors, then builds a personalised, Indian food-first strategy reviewed every 10 days. Programs address IBS, SIBO, acid reflux, leaky gut, bloating, histamine intolerance, and gut-related PCOS. Online consultations available across India and internationally."
  },
  {
    "q": "How to book an online consultation for gut health in Chennai?",
    "a": "You can easily book a personalised gut health consultation with Meenu Balaji, an expert gut health nutritionist, through the contact page. Consultations are available via Zoom or at our Chennai clinic, based on your preference."
  }
]

export const SUB_PAGES_DATA = {
  'ibs-bloating': {
    slug: 'ibs-bloating',
    title: 'IBS & Bloating: Relieve Cramps, Gas & Distension with Food-First Science',
    metaTitle: 'Best IBS & Bloating Nutritionist in India | Meenu Balaji',
    metaDesc: 'Clinical food-first nutrition protocols for IBS-D, IBS-C, and chronic bloating. Low-FODMAP Indian meal plans with 14+ years clinical experience.',
    heroBadge: 'CLINICAL IBS & BLOATING PROTOCOL',
    headline: 'Stop Living Around Your Stomach',
    subtitle:
      'Painful cramping, unpredictable bowel movements, and waking up flat only to look six months pregnant by dinner. IBS is real, measurable, and treatable without extreme elimination.',
    trustItems: [
      '14+ Years Clinical Experience',
      'Food-First Indian Nutrition',
      'No Extreme Elimination'
    ],
    heroImage: '/images/heroes/stock/ibs-bloating.jpg',
    heroImageAlt: 'Warm ginger and lemon digestive herbal infusion with fresh ginger root',
    heroImageCaption: 'Low-FODMAP & Motility Relief',
    rootCauses: [
      {
        title: 'Visceral Hypersensitivity',
        desc: 'Normal amounts of gas and digestion trigger sharp pain signals to the brain due to heightened gut nerve sensitivity.'
      },
      {
        title: 'Bacterial Fermentation Dysbiosis',
        desc: 'Imbalanced gut bacteria fermenting carbohydrates too quickly in the small bowel, producing rapid hydrogen and methane gas.'
      },
      {
        title: 'Altered Gut Motility',
        desc: 'Spastic contractions causing sudden diarrhea (IBS-D) or sluggish migrating motor complexes causing severe constipation (IBS-C).'
      },
      {
        title: 'Gut-Brain Axis Stress',
        desc: 'Stress hormones altering intestinal permeability and shutting down digestive enzyme secretions during stressful workdays.'
      }
    ],
    protocolPoints: [
      {
        step: '1',
        title: 'Indian Low-FODMAP Adaptation',
        desc: 'We adapt clinical low-FODMAP principles to Indian kitchens—replacing high-FODMAP garlic/onion with hing and ginger infused oils, and balancing dal varieties.'
      },
      {
        step: '2',
        title: 'Digestive Motility & Spasm Relief',
        desc: 'Targeted herbal infusions (peppermint, ajwain, fennel) and magnesium forms that relax smooth intestinal muscles without habit-forming laxatives.'
      },
      {
        step: '3',
        title: 'Strategic Prebiotic Reintroduction',
        desc: 'We never keep you on a low-FODMAP diet forever. We systematically test and reintroduce lentils, fruits, and grains so your microbiome regains full resilience.'
      }
    ],
    recommendedTier: 'coaching-6-months',
    faq: [
      {
        q: 'Can IBS be cured permanently through diet?',
        a: 'While IBS is classified medically as a functional disorder, the vast majority of our clients achieve 85–95% symptom resolution and return to normal eating once mucosal inflammation, dysbiosis, and food triggers are systematically addressed.'
      },
      {
        q: 'Do I have to stop eating Indian food or spices for IBS?',
        a: 'No! Many Indian spices (turmeric, cumin, coriander, ginger, fennel) are potent anti-inflammatory and carminative agents. We only modify high-irritant chilies and fermentable alliums temporarily during the initial reset phase.'
      }
    ]
  },

  'acidity-gerd': {
    slug: 'acidity-gerd',
    title: 'Acidity & GERD: End Heartburn & Reflux Without Giving Up Real Food',
    metaTitle: 'Acidity & GERD Nutritionist in India | Meenu Balaji',
    metaDesc: 'Evidence-based nutrition for acid reflux, GERD, and chronic acidity. Address low stomach acid and LES pressure with Indian food-first protocols.',
    heroBadge: 'CLINICAL GERD & ACID REFLUX CARE',
    headline: 'Resolve the True Cause of Acid Reflux',
    subtitle:
      'Daily antacids and PPIs only suppress stomach acid without fixing why it splashes upward. We restore lower esophageal sphincter tone, stomach pH, and mucosal comfort.',
    trustItems: [
      '14+ Years Clinical Experience',
      'Stomach pH & LES Tone Support',
      'Food-First Indian Nutrition'
    ],
    heroImage: '/images/heroes/stock/acidity-gerd.jpg',
    heroImageAlt: 'Soothing herbal flower infusion in glass mug on natural linen',
    heroImageCaption: 'Stomach pH & Esophageal Comfort',
    rootCauses: [
      {
        title: 'Hypochlorhydria (Low Stomach Acid)',
        desc: 'Paradoxically, low stomach acid delays gastric emptying, causing food to ferment and push acidic fumes upward through a relaxed esophageal sphincter.'
      },
      {
        title: 'Elevated Intra-Abdominal Pressure',
        desc: 'Excessive post-meal fermentation and gas accumulation in the stomach exerting physical upward pressure against the diaphragm.'
      },
      {
        title: 'Weakened Esophageal Mucosal Lining',
        desc: 'Loss of the protective bicarbonate-mucus layer in the esophagus, making even minor reflux episodes feel intensely painful.'
      },
      {
        title: 'Late Night Meals & Circadian Misalignment',
        desc: 'Eating heavy or oily dinners within 2 hours of sleeping, impairing gravity-assisted gastric clearing.'
      }
    ],
    protocolPoints: [
      {
        step: '1',
        title: 'Stomach Acid Priming',
        desc: 'Stimulating natural hydrochloric acid and pepsin secretion with gentle bitter greens, ginger infusions, and calibrated meal sequencing.'
      },
      {
        step: '2',
        title: 'Mucosal Barrier Soothing',
        desc: 'Soothe inflamed esophageal tissue with natural demulcent foods—slippery elm, deglycyrrhizinated licorice (DGL), and targeted cooling Indian herbs.'
      },
      {
        step: '3',
        title: 'Meal Timing & Circadian Syncing',
        desc: 'Restructuring meal density so lunches carry metabolic fire and dinners are light, easily digested, and eaten at least 3 hours prior to sleep.'
      }
    ],
    recommendedTier: 'recovery-3-months',
    faq: [
      {
        q: 'Why do my antacid tablets stop working after a while?',
        a: 'PPI antacids neutralize stomach acid, which initially relieves the burn. However, chronic acid suppression impairs protein digestion, reduces B12 and iron absorption, and allows bacteria to proliferate, creating even more rebound gas and pressure.'
      },
      {
        q: 'Can I drink chai or coffee if I have GERD?',
        a: 'We evaluate your tolerance. Often, switching the timing, avoiding empty-stomach caffeine, or substituting with soothing herbal alternatives allows you to reintroduce gentle chai once the esophageal lining is healed.'
      }
    ]
  },

  'constipation-digestion': {
    slug: 'constipation-digestion',
    title: 'Constipation & Digestion: Restore Daily Motility & Comfortable Elimination',
    metaTitle: 'Chronic Constipation & Motility Nutritionist India | Meenu Balaji',
    metaDesc: 'Holistic clinical nutrition for chronic constipation, sluggish digestion, and incomplete evacuation. Food-first prokinetic protocols by Meenu Balaji.',
    heroBadge: 'MOTILITY & BOWEL REGULARITY PROTOCOL',
    headline: 'Achieve Effortless, Natural Daily Bowel Movements',
    subtitle:
      'If you rely on isabgol, senna teas, or harsh laxatives just to have a bowel movement, your migrating motor complex needs clinical nourishment, not forceful stimulation.',
    trustItems: [
      '14+ Years Clinical Experience',
      'Natural Motility & MMC Support',
      'No Habit-Forming Laxatives'
    ],
    heroImage: '/images/heroes/stock/constipation-digestion.jpg',
    heroImageAlt: 'High-fibre rolled oats topped with fresh figs and pumpkin seeds',
    heroImageCaption: 'Soluble Fibre & Natural MMC Motility',
    rootCauses: [
      {
        title: 'Sluggish Migrating Motor Complex (MMC)',
        desc: 'The electrical cleansing wave of the small intestine is paralyzed by frequent grazing, chronic stress, or past food poisoning.'
      },
      {
        title: 'Methane-Producing Archaea Overgrowth',
        desc: 'Intestinal Methanogen Overgrowth (IMO) produces methane gas that acts as a local paralytic agent on intestinal nerve pathways.'
      },
      {
        title: 'Inappropriate Fiber Balance',
        desc: 'Consuming excessive coarse insoluble fiber (raw salads, bran) without adequate soluble gel-forming fibers and electrolyte hydration.'
      },
      {
        title: 'Bile Acid Deficiency & Dehydration',
        desc: 'Sluggish liver bile flow leading to dry, hard stool transit through the colon and incomplete rectal evacuation.'
      }
    ],
    protocolPoints: [
      {
        step: '1',
        title: 'Soluble Gel Fibers & Osmotic Hydration',
        desc: 'Calibrating optimal ratios of soaked chia, stewed apples, flax, and cooked root vegetables paired with electrolyte-rich hydration.'
      },
      {
        step: '2',
        title: 'Natural Food Prokinetics',
        desc: 'Stimulating small-bowel sweeping waves using ginger extracts, artichoke compounds, and gentle magnesium glycinate/citrate.'
      },
      {
        step: '3',
        title: 'Meal Spacing & Bowel Routine Training',
        desc: 'Establishing 3.5 to 4-hour fasting windows between meals to allow the MMC cleansing wave to complete uninterrupted sweeps.'
      }
    ],
    recommendedTier: 'reset-4-weeks',
    faq: [
      {
        q: 'Why did eating more raw salads make my constipation worse?',
        a: 'Raw vegetables contain heavy insoluble cellulose that requires high digestive power and abundant moisture. In sluggish bowels, raw salads act like dry brushwood, worsening bloating and creating hard fecal impaction. Cooked, warm vegetables with healthy fats work significantly better.'
      },
      {
        q: 'Is it safe to take psyllium husk (isabgol) every night?',
        a: 'Isabgol can be helpful, but when taken without sufficient water or in cases of methane SIBO, it can cause severe gas trapping and abdominal pain. We teach you how to achieve regular bowel movements through real food without lifelong dependency on supplements.'
      }
    ]
  },

  'sibo-gluten-intolerance': {
    slug: 'sibo-gluten-intolerance',
    title: 'SIBO & Gluten Intolerance: Root-Cause Microbial & Tolerance Reset',
    metaTitle: 'SIBO & Gluten Intolerance Nutritionist in India | Meenu Balaji',
    metaDesc: 'Specialized clinical protocols for SIBO (Hydrogen, Methane) and Non-Celiac Gluten Sensitivity. Advanced breath testing & gut barrier restoration.',
    heroBadge: 'ADVANCED SIBO & FOOD SENSITIVITY CARE',
    headline: 'Resolve SIBO & Regain Food Tolerance',
    subtitle:
      'Reacting to everyday foods, feeling severely bloated within 30 minutes of eating, and noticing brain fog? We address bacterial relocation, leaky gut, and intestinal immunity.',
    trustItems: [
      '14+ Years Clinical Experience',
      'Breath-Test & Microbiome Led',
      'Phased Reintroduction Protocol'
    ],
    heroImage: '/images/heroes/stock/sibo-gluten.jpg',
    heroImageAlt: 'Naturally gluten-free quinoa, roasted chickpeas and greens in ceramic bowl',
    heroImageCaption: 'Targeted SIBO & Gut Barrier Repair',
    rootCauses: [
      {
        title: 'Small Intestinal Bacterial Overgrowth (SIBO)',
        desc: 'Colonic bacteria migrating upward into the small intestine where nutrients should be absorbed, fermenting carbohydrates prematurely.'
      },
      {
        title: 'Intestinal Hyperpermeability (Leaky Gut)',
        desc: 'Loosened tight junctions allowing undigested food peptides and bacterial lipopolysaccharides (LPS) into systemic circulation.'
      },
      {
        title: 'Non-Celiac Gluten Sensitivity (NCGS)',
        desc: 'Immune reactivity to modern hybrid wheat proteins and fermentable fructans, causing gut distress, joint aches, and mental fatigue.'
      },
      {
        title: 'Enzyme & Brush Border Insufficiency',
        desc: 'Damaged villi in the small intestinal brush border producing inadequate lactase, diamine oxidase (DAO), or disaccharidases.'
      }
    ],
    protocolPoints: [
      {
        step: '1',
        title: 'Targeted Microbial Balancing',
        desc: 'Clinically proven botanical antimicrobials (oregano, berberine, neem) combined with phased fermentable carbohydrate reduction.'
      },
      {
        step: '2',
        title: 'Tight-Junction Barrier Repair',
        desc: 'Repairing the intestinal mucosal lining with L-glutamine, zinc carnosine, collagen peptides, and anti-inflammatory Indian herbs.'
      },
      {
        step: '3',
        title: 'Systematic Reintroduction & Oral Tolerance',
        desc: 'Rebuilding immunological oral tolerance to safe, ancient grains (millets, red rice, sourdough) and diversifying beneficial gut commensals.'
      }
    ],
    recommendedTier: 'coaching-6-months',
    faq: [
      {
        q: 'How do I know if I have SIBO or just regular IBS?',
        a: 'If you experience extreme bloating within 30–60 minutes of eating, react negatively to probiotics or fiber supplements, or have persistent brain fog, SIBO is highly probable. A Lactulose Breath Test provides definitive confirmation.'
      },
      {
        q: 'Will I have to stay off gluten and dairy forever?',
        a: 'Unless you have diagnosed Celiac disease (which requires strict lifelong gluten avoidance), non-celiac gluten sensitivity is frequently reversible once the inflamed gut barrier and microbiome dysbiosis are healed.'
      }
    ]
  }
}
