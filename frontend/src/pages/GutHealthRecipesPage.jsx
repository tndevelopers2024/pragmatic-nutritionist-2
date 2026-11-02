import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Clock, Utensils } from 'lucide-react'
import PageHero from '../components/PageHero'
import Section from '../components/Section'
import CtaBand from '../components/CtaBand'
import { useSeo } from '../components/Seo'
import { RECIPES } from '../data/recipesContent'
import './recipes.css'

const FILTERS = ['All', 'Gluten-Free', 'Vegan', 'Sugar-Free', 'Lactose-Free', 'Spread']

export default function GutHealthRecipesPage() {
  useSeo(
    'Gut Health Recipes | Pragmatic Nutrition',
    'Discover delicious and nutritious gut-friendly recipes for optimal health. Explore our collection of wholesome dishes designed to support gut health.'
  )

  const [activeFilter, setActiveFilter] = useState('All')

  const visibleRecipes = RECIPES.filter((recipe) => {
    if (activeFilter === 'All') return true
    return recipe.recipeType.toLowerCase().includes(activeFilter.toLowerCase())
  })

  return (
    <div className="recipes-page">
      <PageHero
        title="Gut Health Recipes"
        blurb="Discover delicious and nutritious gut-friendly recipes crafted with real, whole-food ingredients to nourish your microbiome and everyday digestion."
        parent={{ label: 'Gut Health', to: '/gut-health' }}
      />

      <Section width="wide" bg="base">
        <div className="recipes-filter-bar">
          <div className="recipes-filter-pills" role="group" aria-label="Filter recipes by dietary preference">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                type="button"
                className={`recipe-filter-pill ${activeFilter === filter ? 'is-active' : ''}`}
                aria-pressed={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
          <span className="recipes-count-label" aria-live="polite">
            {visibleRecipes.length} {visibleRecipes.length === 1 ? 'Recipe' : 'Recipes'}
          </span>
        </div>

        <div className="recipes-grid">
          {visibleRecipes.map((recipe) => (
            <Link
              key={recipe.slug}
              to={`/gut-health-recipes/${encodeURIComponent(recipe.slug)}`}
              className="recipe-card"
            >
              <div className="recipe-card-media">
                <img src={recipe.image} alt={recipe.imageAlt} loading="lazy" />
                <span className="recipe-card-badge">{recipe.recipeType}</span>
              </div>

              <div className="recipe-card-body">
                <div className="recipe-card-meta">
                  <span className="recipe-card-meta-item">
                    <Clock size={14} aria-hidden="true" />
                    <span>{recipe.cardTime}</span>
                  </span>
                  <span className="recipe-card-meta-item">
                    <Utensils size={14} aria-hidden="true" />
                    <span>Serves: {recipe.serves}</span>
                  </span>
                </div>

                <h2 className="recipe-card-title">{recipe.title}</h2>
                <p className="recipe-card-blurb">{recipe.cardBlurb}</p>

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

      <Section
        width="wide"
        bg="white"
        eyebrow="NUTRITION GUIDES"
        title="Explore More Food-First Wellness Resources"
      >
        <div className="guide-related-links">
          <Link to="/gluten-free-diet" className="guide-related-card">
            <h3>How to Start a Gluten-Free Diet</h3>
            <span>
              Read Guide <ArrowRight size={14} aria-hidden="true" />
            </span>
          </Link>
          <Link to="/liver-detox-foods" className="guide-related-card">
            <h3>Support Your Body’s Detox Pathways Naturally</h3>
            <span>
              Read Guide <ArrowRight size={14} aria-hidden="true" />
            </span>
          </Link>
          <Link to="/gut-health-checker" className="guide-related-card">
            <h3>Take the Free 2-Minute Gut Health Checker</h3>
            <span>
              Start Assessment <ArrowRight size={14} aria-hidden="true" />
            </span>
          </Link>
        </div>
      </Section>

      <CtaBand
        eyebrow="PERSONALISED GUT NUTRITION"
        headline="Need a Meal Plan Built"
        headlineHighlight="For Your Specific Gut?"
        text="Every gut responds differently. Work 1-on-1 with Meenu Balaji for personalised Indian meal plans, recipes, and root-cause symptom relief."
        primaryCtaText="Book Your Free Discovery Call"
        secondaryCtaText="Chat on WhatsApp"
      />
    </div>
  )
}
