import { Link, useParams } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Section from '../components/Section'
import { useSeo } from '../components/Seo'
import blogExcerpts from '../data/blogExcerpts.json'
import { posts } from '../data/blogPosts'
import './blog.css'

export default function BlogArticlePage() {
  const { slug } = useParams()
  const index = posts.findIndex(post => post[3] === slug)
  const post = posts[index]
  useSeo(post ? `${post[0]} — Preview` : 'Blog preview not found', post ? blogExcerpts.excerpts[index] : 'Browse nutrition article previews.')

  if (!post) {
    return <>
      <PageHero title="Blog preview not found" parent={{ label: 'Blog', to: '/blog' }} />
      <Section bg="base"><Link className="btn btn-primary" to="/blog">Back to blog</Link></Section>
    </>
  }

  const [title, category, , , image] = post
  return <>
    <PageHero title={title} parent={{ label: 'Blog', to: '/blog' }} />
    <Section bg="base" width="wide">
      <article className="blog-preview">
        <span className="blog-card-category">{category}</span>
        <h2>Article preview</h2>
        <p className="blog-preview-notice">This is a preview. The full article is not yet available on this site.</p>
        <img src={`https://static.wixstatic.com/media/${image}`} alt="" className="blog-preview-image" />
        <p>{blogExcerpts.excerpts[index]}</p>
        <p className="blog-preview-author">Meenu Balaji, M.H.Sc (Food Sc &amp; Nutrition) | Peer Reviewer for European Journal of Nutrition</p>
        <Link className="blog-card-link" to="/blog">Back to all previews</Link>
      </article>
    </Section>
  </>
}
