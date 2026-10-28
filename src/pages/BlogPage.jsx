import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import PageHero from '../components/PageHero'
import Section from '../components/Section'
import { useSeo } from '../components/Seo'
import blogExcerpts from '../data/blogExcerpts.json'
import { posts } from '../data/blogPosts'
import './blog.css'

export default function BlogPage() {
  useSeo('Blog', 'Evidence-based articles on gut health, sports nutrition and clinical dietetics.')
  return <>
    <PageHero title="Blog" blurb="Evidence-based guides on gut health and teen athlete nutrition, written by Meenu Balaji, M.H.Sc." />
    <Section width="wide" bg="base" title="Explore the latest articles" lead="Preview evidence-based nutrition insights from Meenu Balaji. Full articles are not yet available on this site.">
      <div className="blog-grid">{posts.map(([title, category, , slug, image], index) => (
        <article className="blog-card" key={slug}>
          <Link className="blog-card-image" to={`/blog/${slug}`} tabIndex={-1} aria-hidden="true">
            <img src={`https://static.wixstatic.com/media/${image}`} alt={title} loading="lazy" />
          </Link>
          <div className="blog-card-body">
            <span className="blog-card-category">{category}</span>
            <h2><Link to={`/blog/${slug}`}>{title}</Link></h2>
            <p>{blogExcerpts.excerpts[index]}</p>
            <span className="blog-card-author">Meenu Balaji, M.H.Sc (Food Sc &amp; Nutrition) | Peer Reviewer for European Journal of Nutrition</span>
            <Link className="blog-card-link" to={`/blog/${slug}`}>View preview <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
        </article>
      ))}</div>
    </Section>
  </>
}
