import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Clock, Calendar } from 'lucide-react'
import PageHero from '../components/PageHero'
import Section from '../components/Section'
import CtaBand from '../components/CtaBand'
import { useSeo } from '../components/Seo'
import NotFound from '../components/NotFound'
import blogExcerpts from '../data/blogExcerpts.json'
import { posts } from '../data/blogPosts'
import blogArticles from '../data/blogArticlesContent.json'
import meenuAvatar from '../assets/Faithfully Enhanced Portrait.png'
import './blog.css'

export default function BlogPostPage() {
  const { slug } = useParams()
  const index = posts.findIndex((post) => post[3] === slug)
  const [postTitle, postCategory, postDescription, , postImage] = posts[index] || []
  const excerpt = blogExcerpts.excerpts[index]
  const article = blogArticles[slug]

  const title = article?.title || postTitle
  const category = postCategory || 'Clinical Nutrition'
  const description = postDescription || excerpt || ''
  const readTime = article?.readTime || '7 min read'
  const postDate = article?.postDate || 'Clinical Protocol'
  const coverImage = article?.coverImage || (postImage ? `https://static.wixstatic.com/media/${postImage}` : '')

  useSeo(title || 'Article not found', description)

  if (index < 0 && !article) return <NotFound />

  return <>
    <PageHero title={title} blurb={category} parent={{ label: 'Blog', to: '/blog' }} />
    <Section width="medium" bg="base">
      <article className="blog-post">
        <header className="blog-post-header">
          <div className="blog-post-meta">
            <span className="blog-post-category">{category}</span>
            {readTime && (
              <span className="blog-post-meta-item">
                <Clock size={14} aria-hidden="true" /> {readTime}
              </span>
            )}
            {postDate && (
              <span className="blog-post-meta-item">
                <Calendar size={14} aria-hidden="true" /> {postDate}
              </span>
            )}
          </div>
        </header>

        {coverImage && (
          <img className="blog-post-image" src={coverImage} alt={title} />
        )}

        {excerpt && <p className="blog-post-lead">{excerpt}</p>}

        {article?.contentHtml ? (
          <div
            className="blog-article-body"
            dangerouslySetInnerHTML={{ __html: article.contentHtml }}
          />
        ) : (
          <p className="blog-post-excerpt">{excerpt}</p>
        )}

        <div className="blog-author-card">
          <img
            src={meenuAvatar}
            alt="Meenu Balaji, M.H.Sc."
            className="blog-author-avatar"
          />
          <div className="blog-author-details">
            <h4>Meenu Balaji, M.H.Sc.</h4>
            <p>
              Award-winning Clinical Gut Health &amp; Sports Nutritionist with 14+ years of clinical experience across India, the UK, and New Zealand. Peer Reviewer for the <em>European Journal of Nutrition</em>.
            </p>
          </div>
        </div>

        <Link className="blog-card-link" to="/blog">
          <ArrowLeft size={16} aria-hidden="true" /> Back to all articles
        </Link>
      </article>
    </Section>
    <CtaBand />
  </>
}
