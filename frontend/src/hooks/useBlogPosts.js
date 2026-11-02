import { useEffect, useMemo, useState } from 'react'
import { BLOG_CATEGORIES } from '@pragmatic/shared/blog'

export function useBlogPosts() {
  const [state, setState] = useState({ posts: [], loading: true, error: '' })
  useEffect(() => {
    const controller = new AbortController()
    fetch('/api/cms?resource=posts', { signal: controller.signal })
      .then(async (response) => {
        const data = await response.json()
        if (!response.ok)
          throw new Error(
            data.error || 'Articles are temporarily unavailable. Please try again shortly.'
          )
        const posts = (data.posts || [])
          .sort((a, b) => new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0))
        setState({ posts, loading: false, error: '' })
      })
      .catch((error) => {
        if (error.name !== 'AbortError')
          setState({ posts: [], loading: false, error: error.message })
      })
    return () => controller.abort()
  }, [])
  const categories = useMemo(
    () =>
      BLOG_CATEGORIES.map((category) => ({
        ...category,
        count: state.posts.filter((post) => post.categorySlugs?.includes(category.slug)).length
      })),
    [state.posts]
  )
  return { ...state, categories }
}

export async function fetchArticle(slug, signal) {
  const response = await fetch(`/api/cms?resource=posts&slug=${encodeURIComponent(slug)}`, {
    signal
  })
  const data = await response.json()
  if (response.ok) return data.post
  throw Object.assign(
    new Error(data.error || 'The article could not be loaded. Please try again.'),
    { status: response.status }
  )
}
