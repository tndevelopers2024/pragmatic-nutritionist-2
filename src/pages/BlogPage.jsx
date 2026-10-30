import { Link } from 'react-router-dom'
import { useState } from 'react'
import PageHero from '../components/PageHero'
import Section from '../components/Section'
import { useSeo } from '../components/Seo'
import blogExcerpts from '../data/blogExcerpts.json'
import { posts } from '../data/blogPosts'
import './blog.css'
import './blog-topics.css'

const POST_DATES = {
  'high-fibre-foods-for-piles': '3 days ago',
  'psyllium-husk-benefits-side-effects': 'Oct 20',
  'what-is-ibd-ibd-vs-ibs': 'Oct 19',
  'runners-stomach': 'Oct 16',
  'low-stomach-acid-symptoms': 'Oct 14',
  'saffron-for-adhd': 'Oct 11',
  'l-theanine-supplement': 'Oct 8',
  'genetic-methylation-test': 'Oct 6',
  'glp-1-side-effects': 'Oct 4',
  'vagus-nerve': 'Oct 2',
  'mcas': 'Sep 29',
  'best-sports-nutritionist-in-chennai': 'Sep 25'
}

export default function BlogPage() {
  const [topic, setTopic] = useState('All')
  const topics = ['All', ...new Set(posts.map(([, category]) => category))]
  useSeo('Blog', 'Evidence-based articles on gut health, sports nutrition and clinical dietetics.')
  return <>
    <PageHero title="Blog" blurb="Evidence-based guides on gut health and teen athlete nutrition, written by Meenu Balaji, M.H.Sc." />
    <Section width="wide" bg="base" title="Explore the latest articles" lead="Explore evidence-based nutrition insights from Meenu Balaji.">
      <nav className="blog-topics" aria-label="Filter articles by topic">
        {topics.map(category => <button key={category} type="button" aria-pressed={topic === category} onClick={() => setTopic(category)}>{category}</button>)}
      </nav>
      <div className="blog-grid">{posts.map(([title, category, , slug, image], index) => (topic === 'All' || topic === category) && (
        <article className="blog-card" key={slug}>
          <Link className="blog-card-image" to={`/blog/${slug}`} tabIndex={-1} aria-hidden="true">
            <img src={`https://static.wixstatic.com/media/${image}`} alt={title} loading="lazy" />
          </Link>
          <div className="blog-card-body">
            <div className="blog-card-meta">
              <span className="blog-card-author-name">Meenu Balaji, M.H.Sc (Food Sc &amp; Nutr...</span>
              <span className="blog-card-date">{POST_DATES[slug] || 'Recently'}</span>
            </div>
            <span className="blog-card-category">{category}</span>
            <h2><Link to={`/blog/${slug}`}>{title}</Link></h2>
            <p className="blog-card-desc">{blogExcerpts.excerpts[index]}</p>
          </div>
        </article>
      ))}</div>
    </Section>
  </>
}
