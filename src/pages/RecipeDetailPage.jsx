import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChefHat,
  ChevronDown,
  ChevronUp,
  Clock,
  Flame,
  Tag,
  Users,
  Utensils
} from 'lucide-react'
import PageHero from '../components/PageHero'
import Section from '../components/Section'
import CtaBand from '../components/CtaBand'
import { useSeo } from '../components/Seo'
import { RECIPES, findRecipeBySlug } from '../data/recipesContent'
import './recipes.css'

export default function RecipeDetailPage() {
  const { slug } = useParams()
  const recipe = findRecipeBySlug(slug)
  const [activeFaq, setActiveFaq] = useState(0)

  useSeo(
    recipe ? `${recipe.title} | Pragmatic Nutrition` : 'Gut Health Recipes | Pragmatic Nutrition',
    recipe?.cardBlurb || 'Gut-friendly whole-food recipe from Pragmatic Nutrition.'
  )

  if (!recipe) {
    return <Navigate to="/gut-health-recipes" replace />
  }

  const relatedRecipes = RECIPES.filter((r) => r.slug !== recipe.slug).slice(0, 3)

  return (
    <div className="recipes-page">
      <PageHero
        dynamic
        breadcrumb={recipe.title.toUpperCase()}
        badge={`${recipe.recipeType.toUpperCase()} • GUT-FRIENDLY RECIPE`}
        title={recipe.title}
        blurb={recipe.cardBlurb}
        parent={{ label: 'Gut Health Recipes', to: '/gut-health-recipes' }}
        secondaryCta={{
          label: 'All 8 Gut Health Recipes',
          to: '/gut-health-recipes',
          icon: 'Utensils'
        }}
        waMessage={`Hi Meenu, I tried the ${recipe.title} recipe and would like a personalised gut-friendly nutrition plan.`}
        trustItems={[
          `Prep: ${recipe.prepTime} • Cook: ${recipe.cookTime}`,
          `Yields ${recipe.serves}`,
          `${recipe.recipeType} Whole-Food Dish`
        ]}
        image={recipe.image}
        imageAlt={recipe.imageAlt || recipe.title}
        imageCaption={`${recipe.recipeType} • Dietitian-Tested Recipe`}
      />

      {/* 1. Overview & Metadata */}
      <Section width="wide" bg="white">
        <div style={{ marginBottom: '24px' }}>
          <Link to="/gut-health-recipes" className="subtopic-action">
            <ArrowLeft size={15} aria-hidden="true" />
            <span>Back to Gut Health Recipes</span>
          </Link>
        </div>

        <div className="recipe-detail-top-grid">
          <figure className="recipe-detail-hero-media">
            <img src={recipe.image} alt={recipe.imageAlt || recipe.title} />
          </figure>

          <div>
            <div className="recipe-meta-grid" aria-label="Recipe timing and yield">
              <div className="recipe-meta-box">
                <div className="recipe-meta-icon" aria-hidden="true">
                  <Clock size={18} />
                </div>
                <div className="recipe-meta-text">
                  <span className="recipe-meta-label">Prep Time</span>
                  <strong className="recipe-meta-val">{recipe.prepTime}</strong>
                </div>
              </div>

              <div className="recipe-meta-box">
                <div className="recipe-meta-icon" aria-hidden="true">
                  <Flame size={18} />
                </div>
                <div className="recipe-meta-text">
                  <span className="recipe-meta-label">Cook Time</span>
                  <strong className="recipe-meta-val">{recipe.cookTime}</strong>
                </div>
              </div>

              <div className="recipe-meta-box">
                <div className="recipe-meta-icon" aria-hidden="true">
                  <Users size={18} />
                </div>
                <div className="recipe-meta-text">
                  <span className="recipe-meta-label">Serves</span>
                  <strong className="recipe-meta-val">{recipe.serves}</strong>
                </div>
              </div>

              <div className="recipe-meta-box">
                <div className="recipe-meta-icon" aria-hidden="true">
                  <Tag size={18} />
                </div>
                <div className="recipe-meta-text">
                  <span className="recipe-meta-label">Recipe Type</span>
                  <strong className="recipe-meta-val">{recipe.recipeType}</strong>
                </div>
              </div>
            </div>

            <div className="recipe-about-copy">
              <h2>About the Recipe</h2>
              {recipe.about.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* 2. Ingredients & Preparation */}
      <Section width="wide" bg="base">
        <div className="recipe-work-grid">
          <div className="recipe-panel">
            <div className="recipe-panel-header">
              <Utensils size={20} className="text-primary" aria-hidden="true" />
              <h2>Ingredients</h2>
            </div>
            <ul className="recipe-ingredients-list">
              {recipe.ingredients.map((item, idx) => (
                <li key={idx}>
                  <CheckCircle2 size={17} className="recipe-ingredient-check" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="recipe-panel">
            <div className="recipe-panel-header">
              <ChefHat size={20} className="text-primary" aria-hidden="true" />
              <h2>Preparation</h2>
            </div>
            <ol className="recipe-steps-list">
              {recipe.steps.map((step, idx) => (
                <li key={idx}>
                  <span className="recipe-step-num" aria-hidden="true">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <p className="recipe-step-text">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {recipe.gallery && recipe.gallery.length > 0 && (
          <div className="recipe-gallery-grid">
            {recipe.gallery.map((photo, idx) => (
              <figure key={idx} className="recipe-gallery-item">
                <img src={photo.src} alt={photo.alt} loading="lazy" />
              </figure>
            ))}
          </div>
        )}
      </Section>

      {/* 3. Nutrition Facts (if present) */}
      {recipe.nutritionFacts && recipe.nutritionFacts.length > 0 && (
        <Section width="wide" bg="white">
          <div className="recipe-nutrition-card">
            <h2>{recipe.nutritionTitle || 'Nutrition Facts'}</h2>
            <div className="recipe-nutrition-stats">
              {recipe.nutritionFacts.map((stat) => (
                <div key={stat.label} className="recipe-nutrition-stat">
                  <span>{stat.label}</span>
                  <strong>{stat.value}</strong>
                </div>
              ))}
            </div>
            {recipe.nutritionNote && <p className="recipe-nutrition-note">{recipe.nutritionNote}</p>}
          </div>
        </Section>
      )}

      {/* 4. Health Benefits */}
      {recipe.benefits && recipe.benefits.length > 0 && (
        <Section
          width="wide"
          bg={recipe.nutritionFacts ? 'base' : 'white'}
          eyebrow="NUTRITIONAL HIGHLIGHTS"
          title={recipe.benefitsTitle || 'Health Benefits'}
          lead={recipe.benefitsIntro}
        >
          <div className="recipe-benefits-grid">
            {recipe.benefits.map((benefit, idx) => (
              <article key={benefit.title} className="recipe-benefit-card">
                <span className="recipe-benefit-num">{String(idx + 1).padStart(2, '0')}</span>
                <h3>{benefit.title}</h3>
                <p>{benefit.desc}</p>
              </article>
            ))}
          </div>
          {recipe.closingNote && (
            <p className="academy-note" style={{ marginTop: '28px' }}>
              {recipe.closingNote}
            </p>
          )}
        </Section>
      )}

      {/* 5. Extra Editorial Notes / Tips / Replacements */}
      {recipe.extraSections && recipe.extraSections.length > 0 && (
        <Section width="wide" bg="white" eyebrow="PRACTICAL TIPS & NOTES" title="Tips, Variations & Nutrition Insights">
          <div className="recipe-extra-stack">
            {recipe.extraSections.map((sec) => (
              <article key={sec.title} className="recipe-extra-card">
                <h3>{sec.title}</h3>
                {sec.paragraphs?.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                {sec.bullets && (
                  <ul>
                    {sec.bullets.map((b, i) => (
                      <li key={i}>
                        <CheckCircle2 size={16} className="recipe-ingredient-check" aria-hidden="true" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </Section>
      )}

      {/* 6. Standardized FAQs (if present) */}
      {recipe.faqs && recipe.faqs.length > 0 && (
        <Section width="wide" bg="alt" className="gut-faq-section">
          <div className="gut-section-header">
            <span className="gut-sec-eyebrow">RECIPE Q&amp;A</span>
            <h2 className="gut-sec-title">Frequently Asked Questions</h2>
          </div>

          <div className="gut-faq-accordion-list">
            {recipe.faqs.map((item, idx) => {
              const isOpen = activeFaq === idx
              return (
                <div key={item.q} className={`gut-faq-item ${isOpen ? 'faq-item-open' : ''}`}>
                  <button
                    type="button"
                    className="gut-faq-question-btn"
                    onClick={() => setActiveFaq(isOpen ? -1 : idx)}
                    aria-expanded={isOpen}
                  >
                    <span className="faq-num">0{idx + 1}</span>
                    <span className="faq-q-text">{item.q}</span>
                    <span className="faq-toggle-icon">
                      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="gut-faq-answer-panel">
                      <p className="faq-a-text">{item.a}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </Section>
      )}

      {/* 7. More Gut Health Recipes */}
      <Section width="wide" bg="base" eyebrow="MORE TO TRY" title="Explore More Gut-Friendly Recipes">
        <div className="recipes-grid">
          {relatedRecipes.map((rel) => (
            <Link
              key={rel.slug}
              to={`/gut-health-recipes/${encodeURIComponent(rel.slug)}`}
              className="recipe-card"
            >
              <div className="recipe-card-media">
                <img src={rel.image} alt={rel.imageAlt} loading="lazy" />
                <span className="recipe-card-badge">{rel.recipeType}</span>
              </div>
              <div className="recipe-card-body">
                <div className="recipe-card-meta">
                  <span className="recipe-card-meta-item">
                    <Clock size={14} aria-hidden="true" />
                    <span>{rel.cardTime}</span>
                  </span>
                </div>
                <h3 className="recipe-card-title">{rel.title}</h3>
                <p className="recipe-card-blurb">{rel.cardBlurb}</p>
                <div className="recipe-card-footer">
                  <span className="recipe-card-cta">
                    <span>View Recipe</span>
                    <ArrowRight size={15} aria-hidden="true" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <CtaBand
        eyebrow="CLINICAL GUT HEALTH"
        headline="Want Recipes & Meal Plans"
        headlineHighlight="Tailored to Your Digestion?"
        text="Book a free discovery call with Meenu Balaji to build an Indian food-first gut recovery plan tailored to your exact symptoms."
        primaryCtaText="Book Your Free Discovery Call"
        secondaryCtaText="Chat on WhatsApp"
      />
    </div>
  )
}
