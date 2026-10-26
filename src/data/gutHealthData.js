/**
 * Comprehensive clinical data for Gut Health & related condition pages
 * Pragmatic Nutrition - Meenu Balaji, M.H.Sc
 */

export const GUT_HERO = {
  badge: 'CLINICAL GUT HEALTH NUTRITION • EVIDENCE-BASED',
  title: 'Root-Cause Digestive Restoration for IBS, SIBO, Bloating & Acidity',
  subtitle:
    "Struggling with bloating, acidity, SIBO, or IBS that keeps coming back? The problem isn't your willpower; every gut is different, and generic diets rarely work.",
  intro:
    "Meenu Balaji is a clinical gut health nutritionist with 14 years of experience across India, the UK, and New Zealand. At Pragmatic Nutrition, we identify what's actually driving your symptoms—SIBO, food intolerances, microbiome imbalance, or gut inflammation—and build a recovery plan around real Indian food and your real life.",
  stats: [
    { value: '4,500+', label: 'Clients Recovered', sub: 'Across India & 8+ countries' },
    { value: '14+ Yrs', label: 'Clinical Expertise', sub: 'India, UK & New Zealand' },
    { value: '8–12 Wks', label: 'Measurable Relief', sub: 'Symptom scoring & stool tracking' },
    { value: 'Food-First', label: 'Indian Cuisine', sub: 'Zero starvation or generic charts' }
  ],
  locationsNote: 'Chennai clinic appointments + Online consultations across India, USA, UK, UAE, Australia, and New Zealand.'
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
    id: 'reset-4-weeks',
    title: '4 Weeks Gut Reset & Nourish',
    price: '6,499',
    currency: '₹',
    duration: 'Valid for 4 weeks',
    badge: 'Kickstart Relief',
    popular: false,
    idealFor: 'Acidity, acute post-meal bloating, recent digestive discomfort, and kickstarting healthy digestion.',
    features: [
      'Initial 40-minute Gut & Overall Health Assessment Video Call',
      'Three 15-minute video check-in reviews (weekly progress)',
      'Personalised gut-friendly meal plan & easy Indian recipes',
      'Guidance on meal timing, chewing, and mindful eating',
      'Continuous Email & WhatsApp support between calls',
      'Actionable symptom score tracking'
    ],
    ctaText: 'Choose 4-Week Reset'
  },
  {
    id: 'recovery-3-months',
    title: '3-Month Gut Recovery: Food Intolerance',
    price: '18,500',
    currency: '₹',
    duration: 'Valid for 3 months',
    badge: 'Most Comprehensive',
    popular: true,
    idealFor: 'Acid reflux, gluten intolerance, persistent bloating, post-meal fatigue, brain fog, and chronic gut distress.',
    features: [
      'Initial 45-minute Deep-Dive Consultation & Root-Cause Mapping',
      '15-minute Review call once every 10 days (8 total review sessions)',
      'Anti-inflammatory and gut-calming Indian food framework',
      'Symptom + Food Intolerance Tracking with Bristol Stool analysis',
      'Targeted supplement & digestive enzyme guidance (evidence-led)',
      'Phased reintroduction protocol for sensitive foods',
      'Continuous WhatsApp support for instant dining-out and grocery questions'
    ],
    ctaText: 'Choose 3-Month Protocol'
  },
  {
    id: 'coaching-6-months',
    title: '6-Month Advanced Gut Coaching: IBS, SIBO',
    price: '35,000',
    currency: '₹',
    duration: 'Valid for 6 months',
    badge: 'Clinical IBS & SIBO',
    popular: false,
    idealFor: 'Chronic IBS, SIBO, leaky gut, candida, histamine intolerance, and recurrent motility disorders.',
    features: [
      'Led directly by Meenu Balaji – Clinical Gut Health Specialist',
      '45-minute Video for Expert-Level Review & Root-Cause Mapping',
      '15-minute video review every 10 days throughout the 6 months',
      'Tailored Indian diet plans, updated monthly based on recovery stage',
      'Gut recovery, mucosal barrier repair & microbiome rebuilding',
      'Specialized protocols: Low-FODMAP, SCD, gluten-free, or dairy-free adaptations',
      'Mindful eating & vagus nerve gut-brain practices',
      'Full WhatsApp support & continuous course-correction'
    ],
    ctaText: 'Choose 6-Month Coaching'
  },
  {
    id: 'premium-6-months',
    title: '6-Month Premium Gut Health Program',
    price: '54,499',
    currency: '₹',
    duration: 'Valid for 6 months',
    badge: 'All-Inclusive Care',
    popular: false,
    idealFor: 'Complex multi-system gut issues, chronic IBS/SIBO, leaky gut, gut-PCOS, with advanced testing & fitness.',
    features: [
      'Includes Comprehensive Gut Microbiome Test & Lab Interpretation',
      'Tailored Indian Diet Plans, updated monthly',
      '3 Nutrition review sessions per month (18 total sessions)',
      'Symptom tracker + targeted supplement guidance',
      'Phased Plan to safely reintroduce FODMAPs, dairy, or gluten',
      '2 Gut-calming Yoga sessions for vagus nerve stimulation',
      '2 sessions for Customised Fitness & motility routine',
      'Priority WhatsApp support directly with Meenu Balaji'
    ],
    ctaText: 'Choose Premium 6-Month'
  },
  {
    id: 'global-coaching',
    title: 'Global Gut Health Nutrition Coaching',
    price: '14,500',
    currency: '₹',
    priceSub: 'per month (or USD $99/mo)',
    duration: 'Valid for 3 months',
    badge: 'International Clients',
    popular: false,
    idealFor: 'Expats & clients living in USA, UK, UAE, Australia, Canada, and NZ wanting authentic Indian gut coaching.',
    features: [
      'Personalised online nutrition coaching tailored to your time zone',
      'Build gut-friendly eating habits using local grocery ingredients',
      'Balance stress, sleep, and hydration for enhanced gut comfort',
      'Learn how to make sustainable dietary changes without restrictive fads',
      'Anti-inflammatory food guidance adapted to international lifestyles',
      'Guidance to choose the right, high-potency supplements in your country',
      'Direct WhatsApp access & scheduled video consultations'
    ],
    ctaText: 'Choose Global Coaching'
  }
]

export const EIGHT_PILLARS = [
  {
    icon: 'Stethoscope',
    title: 'Root-Cause Assessment',
    desc: 'Comprehensive evaluation of digestive history, symptom triggers, food intolerances, and microbiome imbalances before creating any plan.'
  },
  {
    icon: 'Utensils',
    title: 'Practical Meal Planning',
    desc: 'Delicious, home-cooked Indian meals and easy recipes designed to soothe digestion, fit family routines, and require zero exotic ingredients.'
  },
  {
    icon: 'UserCheck',
    title: 'Personalized Approach',
    desc: 'Your diet plan is uniquely tailored to your bio-individuality, metabolic rate, work schedules, and digestive enzymatic capacity.'
  },
  {
    icon: 'Sparkles',
    title: 'Digestive Support & Mindful Eating',
    desc: 'Evidence-based techniques to optimize stomach acid, prime digestive enzymes, stimulate the vagus nerve, and eliminate hurried eating.'
  },
  {
    icon: 'Apple',
    title: 'Dietary Strategies & Fiber Balance',
    desc: 'Strategic balance of soluble vs. insoluble fibers, prebiotics, and fermented foods to nourish beneficial gut flora without triggering gas.'
  },
  {
    icon: 'Moon',
    title: 'Lifestyle & Stress-Gut Modulation',
    desc: 'Practical tools to regulate the gut-brain axis, improve deep sleep architecture, and reduce sympathetic nervous system tension.'
  },
  {
    icon: 'Pill',
    title: 'Targeted Supplement Guidance',
    desc: 'Personalized, evidence-based nutraceutical recommendations based on lab markers and clinical symptoms—never generic pill regimens.'
  },
  {
    icon: 'ShieldCheck',
    title: 'Long-Term Maintenance & Freedom',
    desc: 'Structured reintroduction protocols ensuring you transition smoothly into lifelong digestive freedom and eat social meals with confidence.'
  }
]

export const CLINICAL_DIFFERENTIATORS = [
  'Uses root-cause clinical assessment, not generic meal charts',
  '14+ years specialized experience in IBS, SIBO, reflux, histamine intolerance & motility',
  'Expertise in interpreting advanced gut diagnostics (GI-MAP, stool microbiome & SIBO breath tests)',
  'Designs digestive-friendly food plans using authentic Indian ingredients and comfort staples',
  'Tracks clinical progress using objective symptom scoring, food journals, and Bristol stool patterns',
  'Adjusts protocols dynamically every 10 days based on your unique digestive feedback'
]

export const WHO_IS_THIS_FOR = [
  {
    title: 'Individuals with Food Intolerances',
    desc: 'Suffering from bloating, hives, headaches, or gas after gluten, dairy, lentils, or high-FODMAP foods.'
  },
  {
    title: 'People Dealing with IBS & Acid Reflux',
    desc: 'Frustrated by endless antacids, unpredictable bowel habits, and severe abdominal cramping.'
  },
  {
    title: 'Those Seeking Long-Term Digestive Freedom',
    desc: 'Committed to fixing the root biochemical cause rather than cycling through temporary detox teas or fads.'
  },
  {
    title: 'Leaky Gut & Gut-Hormone Imbalances',
    desc: 'Addressing systemic inflammation, fatigue, post-meal brain fog, and gut-related PCOS or thyroid sluggishness.'
  }
]

export const GUT_FAQS = [
  {
    q: 'Who is the best gut health nutritionist in Chennai?',
    a: 'Meenu Balaji, founder of Pragmatic Nutrition, is one of the leading gut health experts in Chennai with 14+ years of clinical experience across India, the UK, and New Zealand. With an M.H.Sc in Food Science & Nutrition and peer reviewer credentials for the European Journal of Nutrition, she has successfully treated 4,500+ clients with IBS, SIBO, acidity, and complex digestive issues.'
  },
  {
    q: 'Can I consult Meenu Balaji in-person in Chennai or online?',
    a: 'Yes! Meenu offers in-person consultations at our Chennai clinic (Five Furlong Road, Guindy / OMR) as well as comprehensive online video consultations for clients across Bangalore, Hyderabad, Mumbai, Delhi NCR, and internationally (USA, UK, UAE, Australia, Canada, etc.).'
  },
  {
    q: 'Can I consult Meenu if I live outside Chennai or overseas?',
    a: 'Absolutely. Over 65% of our clients consult with us online. Video consultations, lab review sessions, Indian-food meal plans, and ongoing WhatsApp support are conducted digitally, accommodating global time zones.'
  },
  {
    q: 'What gut health conditions can Pragmatic Nutrition help with?',
    a: 'We specialize in Irritable Bowel Syndrome (IBS-C, IBS-D, IBS-M), SIBO (Small Intestinal Bacterial Overgrowth), chronic acid reflux & GERD, post-meal bloating, chronic constipation, leaky gut syndrome, histamine intolerance, candida overgrowth, food sensitivities (gluten, lactose), and gut-related PCOS.'
  },
  {
    q: 'Why is Pragmatic Nutrition different from generic meal plan services?',
    a: 'Generic diet services hand out standardized calorie-cutting charts. Pragmatic Nutrition follows a diagnostic-led clinical approach: we assess your symptom patterns, digestive enzyme capacity, microbiome balance, stress load, and metabolic factors first. All plans are built around authentic Indian foods, adapted to your family kitchen, and reviewed every 10 days.'
  },
  {
    q: 'What are the classic signs of an unhealthy gut?',
    a: 'Common signs include persistent bloating, excessive gas, acid regurgitation, chronic diarrhea or constipation, post-meal brain fog, skin breakouts (acne, eczema), intense sugar cravings, food intolerances, chronic fatigue, and weakened immunity.'
  },
  {
    q: 'How can I manage gut health with an Indian diet?',
    a: 'An Indian diet can be exceptionally gut-healing when balanced properly. We utilize traditional preparation techniques (soaking, sprouting, fermenting), digestive spices (cumin, ajwain, hing, ginger, fennel), cooked regional vegetables, and probiotic curd/buttermilk while temporarily reducing high-fermentation triggers until the gut barrier is fully healed.'
  },
  {
    q: 'What are the best online diet plans for gut health in India?',
    a: 'The best online plans are those customized to your biology and root causes, not generic elimination lists. Our 3-month and 6-month programs provide root-cause mapping, lab test interpretation, Indian food plans, bi-weekly reviews, and daily WhatsApp guidance to produce lasting relief within 8–12 weeks.'
  },
  {
    q: 'How do I book an online or in-clinic consultation?',
    a: 'You can easily book a 10-minute Free Discovery Call or your initial comprehensive consultation through our booking portal on this website, or message us directly on WhatsApp at +91 75500 69612.'
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
