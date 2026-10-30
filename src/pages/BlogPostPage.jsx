import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import PageHero from '../components/PageHero'
import Section from '../components/Section'
import CtaBand from '../components/CtaBand'
import { useSeo } from '../components/Seo'
import NotFound from '../components/NotFound'
import blogExcerpts from '../data/blogExcerpts.json'
import { posts } from '../data/blogPosts'
import './blog.css'

export default function BlogPostPage() {
  const { slug } = useParams()
  const index = posts.findIndex((post) => post[3] === slug)
  const [title, category, description, , image] = posts[index] || []
  const excerpt = blogExcerpts.excerpts[index]
  useSeo(title || 'Article not found', description || excerpt)

  if (index < 0) return <NotFound />

  return <>
    <PageHero title={title} blurb={category} parent={{ label: 'Blog', to: '/blog' }} />
    <Section width="medium" bg="base">
      <article className="blog-post">
        <img className="blog-post-image" src={`https://static.wixstatic.com/media/${image}`} alt={title} />
        <p className="blog-post-excerpt">{excerpt}</p>
        <p className="blog-card-author">Meenu Balaji, M.H.Sc (Food Sc &amp; Nutrition) | Peer Reviewer for European Journal of Nutrition</p>
        <Link className="blog-card-link" to="/blog"><ArrowLeft size={16} aria-hidden="true" /> Back to all articles</Link>
      </article>
    </Section>
    <CtaBand />
  </>
}
