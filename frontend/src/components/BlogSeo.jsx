import { useEffect } from 'react'

export default function BlogSeo({ article }) {
  useEffect(() => {
    if (!article) return
    const nodes = []
    const originalTitle = document.title
    const description = document.querySelector('meta[name="description"]')
    const previousDescription = description?.getAttribute('content')
    document.title = article.seoTitle || `${article.title} | Meenu Balaji`
    description?.setAttribute('content', article.seoDescription || article.excerpt || '')
    const canonical = `${window.location.origin}/blog/${encodeURIComponent(article.slug)}`
    const add = (tag, attributes) => {
      const node = document.createElement(tag)
      Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, value))
      document.head.appendChild(node)
      nodes.push(node)
      return node
    }
    // Replace existing social tags while the article is mounted, then restore them.
    const replaced = [
      ...document.head.querySelectorAll(
        'meta[property^="og:"], meta[name^="twitter:"], link[rel="canonical"]'
      )
    ]
    replaced.forEach((node) => node.remove())
    add('link', { rel: 'canonical', href: canonical })
    const title = article.seoTitle || article.title
    const blurb = article.seoDescription || article.excerpt || ''
    Object.entries({
      'og:type': 'article',
      'og:title': title,
      'og:description': blurb,
      'og:url': canonical,
      ...(article.coverImage
        ? { 'og:image': new URL(article.coverImage, window.location.origin).href }
        : {})
    }).forEach(([property, content]) => add('meta', { property, content }))
    add('meta', { name: 'twitter:card', content: 'summary_large_image' })
    const script = add('script', { type: 'application/ld+json' })
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: article.title,
      description: blurb,
      datePublished: article.publishedAt,
      dateModified: article.updatedAt || article.modifiedAt || article.publishedAt,
      image: article.coverImage
        ? new URL(article.coverImage, window.location.origin).href
        : undefined,
      author: { '@type': 'Person', name: article.author || 'Meenu Balaji' },
      mainEntityOfPage: canonical
    })
    return () => {
      nodes.forEach((node) => node.remove())
      replaced.forEach((node) => document.head.appendChild(node))
      document.title = originalTitle
      if (description && previousDescription !== null)
        description.setAttribute('content', previousDescription)
    }
  }, [article])
  return null
}
