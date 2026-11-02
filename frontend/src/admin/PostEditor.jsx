import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import DOMPurify from 'dompurify'
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Eye,
  History,
  ImagePlus,
  Save,
  X,
  RotateCcw,
  Sprout
} from 'lucide-react'
import { BLOG_CATEGORIES } from '@pragmatic/shared/blog'
import RichEditor from './RichEditor'
import { cms, uploadImage } from './api'
import { imageUploadMessage } from '@pragmatic/shared/image-policy'

const blankPost = {
  title: '',
  slug: '',
  contentHtml: '<p></p>',
  excerpt: '',
  categorySlug: 'gut-health',
  tags: [],
  coverImage: '',
  coverAlt: '',
  status: 'draft',
  author: 'Meenu Balaji, M.H.Sc',
  reviewer: '',
  reviewedAt: '',
  seoTitle: '',
  seoDescription: '',
  publishedAt: '',
  revision: 0
}
const slugify = (value) =>
  value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 140)
export default function PostEditor() {
  const { id } = useParams()
  const [state, setState] = useState({ id: null, post: null, error: '' })
  useEffect(() => {
    if (!id) return
    let active = true
    cms('posts', { id })
      .then((data) => {
        if (active)
          setState({
            id,
            post: data.post,
            error: ''
          })
      })
      .catch((error) => {
        if (active) setState({ id, post: null, error: error.message })
      })
    return () => {
      active = false
    }
  }, [id])
  if (id && state.id !== id)
    return (
      <main className="cms-main" role="status">
        Opening article…
      </main>
    )
  if (id && state.error)
    return (
      <main className="cms-main">
        <Link to="/admin">Back to articles</Link>
        <div className="cms-alert" role="alert">
          {state.error}
        </div>
      </main>
    )
  return <Editor key={id || 'new'} initial={id ? state.post : blankPost} />
}

function Editor({ initial }) {
  const navigate = useNavigate()
  const [post, setPost] = useState({ ...blankPost, ...initial })
  const [saved, setSaved] = useState(JSON.stringify({ ...blankPost, ...initial }))
  const [busy, setBusy] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [inlineUploading, setInlineUploading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [preview, setPreview] = useState(false)
  const [history, setHistory] = useState(null)
  const [editorKey, setEditorKey] = useState(0)
  const [recovery, setRecovery] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(`pn-draft:${initial.id || 'new'}`))
    } catch {
      return null
    }
  })
  const coverInput = useRef(null)
  const previewClose = useRef(null)
  const dirty = JSON.stringify(post) !== saved
  const recoveryKey = `pn-draft:${initial.id || 'new'}`
  const words = post.contentHtml
    .replace(/<[^>]+>/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length
  useEffect(() => {
    if (!dirty) return
    const warn = (event) => {
      event.preventDefault()
      event.returnValue = ''
    }
    const guardNavigation = (event) => {
      const anchor = event.target.closest('a[href]')
      if (
        !anchor ||
        anchor.target === '_blank' ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        event.button !== 0
      )
        return
      if (anchor.origin !== window.location.origin || anchor.href === window.location.href) return
      if (
        !window.confirm(
          'Leave this article? Unsaved changes are kept in this browser for recovery.'
        )
      ) {
        event.preventDefault()
        event.stopPropagation()
        return
      }
      try {
        localStorage.setItem(
          recoveryKey,
          JSON.stringify({ post, savedAt: new Date().toISOString() })
        )
      } catch {
        /* Recovery is optional. */
      }
    }
    window.addEventListener('beforeunload', warn)
    document.addEventListener('click', guardNavigation, true)
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(
          recoveryKey,
          JSON.stringify({ post, savedAt: new Date().toISOString() })
        )
      } catch {
        /* Browser recovery is optional; server save remains available. */
      }
    }, 1200)
    return () => {
      window.removeEventListener('beforeunload', warn)
      document.removeEventListener('click', guardNavigation, true)
      clearTimeout(timer)
    }
  }, [dirty, post, recoveryKey])
  useEffect(() => {
    if (!preview) return
    const previous = document.activeElement
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    previewClose.current?.focus()
    const keydown = (event) => {
      if (event.key === 'Escape') setPreview(false)
      if (event.key === 'Tab') {
        event.preventDefault()
        previewClose.current?.focus()
      }
    }
    document.addEventListener('keydown', keydown)
    return () => {
      document.body.style.overflow = overflow
      document.removeEventListener('keydown', keydown)
      previous?.focus()
    }
  }, [preview])
  function update(key, value) {
    setPost((current) => ({ ...current, [key]: value }))
    setMessage('')
  }
  async function save(event) {
    event.preventDefault()
    setBusy(true)
    setError('')
    setMessage('')
    try {
      const result = await cms('posts', {
        id: post.id,
        method: post.id ? 'PUT' : 'POST',
        body: post
      })
      try {
        localStorage.removeItem(recoveryKey)
      } catch {
        /* Storage may be unavailable. */
      }
      setSaved(JSON.stringify({ ...blankPost, ...result.post }))
      setPost({ ...blankPost, ...result.post })
      setRecovery(null)
      setMessage(
        result.post.status === 'published'
          ? 'Your article is published and available on the website.'
          : result.post.status === 'archived'
            ? 'Article archived. It is no longer listed on the website.'
            : 'Draft saved. Come back whenever you’re ready.'
      )
      if (result.post.id !== initial.id)
        navigate(`/admin/posts/${result.post.id}`, { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }
  async function uploadCover(event) {
    const file = event.target.files[0]
    if (!file) return
    setUploading(true)
    setError('')
    try {
      const image = await uploadImage(file, post.coverAlt)
      update('coverImage', image.url)
      setMessage(imageUploadMessage(image))
    } catch (err) {
      setError(err.message)
    } finally {
      setUploading(false)
      event.target.value = ''
    }
  }
  async function openHistory() {
    setError('')
    try {
      setHistory((await cms('revisions', { id: post.id })).revisions)
    } catch (err) {
      setError(err.message)
    }
  }
  function restore(snapshot) {
    const { savedAt, ...content } = snapshot
    void savedAt
    setPost((current) => ({
      ...current,
      ...content,
      id: current.id,
      revision: current.revision,
      status: 'draft'
    }))
    setEditorKey((key) => key + 1)
    setHistory(null)
    setMessage('Revision loaded as a draft. Review it, then save when ready.')
  }
  return (
    <main className="cms-main cms-editor-main">
      <form onSubmit={save}>
        <div className="cms-editor-heading">
          <div>
            <Link className="cms-back-link" to="/admin">
              <ArrowLeft size={16} />
              All articles
            </Link>
            <h1>{post.id ? 'Edit article' : 'A fresh page, a new idea.'}</h1>
            <p className="cms-save-state">
              {dirty ? (
                'Unsaved changes · recovery copy kept in this browser'
              ) : (
                <>
                  <Check size={14} />
                  {post.id ? 'All changes saved' : 'Ready when you are'}
                </>
              )}
            </p>
          </div>
          <div className="cms-editor-actions">
            {post.id && !post.id.startsWith('legacy:') && (
              <button className="cms-button" type="button" onClick={openHistory}>
                <History size={16} />
                History
              </button>
            )}
            <button type="button" className="cms-button" onClick={() => setPreview(true)}>
              <Eye size={17} />
              Preview
            </button>
            <button
              type="submit"
              className="cms-button cms-primary"
              disabled={busy || uploading || inlineUploading}
            >
              <Save size={17} />
              {busy
                ? 'Saving…'
                : post.status === 'published'
                  ? 'Publish changes'
                  : post.status === 'archived'
                    ? 'Archive article'
                    : 'Save draft'}
            </button>
          </div>
        </div>
        {error && (
          <div className="cms-alert" role="alert">
            {error}
          </div>
        )}
        {message && (
          <p className="cms-notice" role="status">
            {message}
          </p>
        )}
        {recovery && (
          <div className="cms-recovery">
            <span>
              There’s an unsaved browser copy from {new Date(recovery.savedAt).toLocaleString()}.
            </span>
            <button
              type="button"
              onClick={() => {
                setPost((current) => ({
                  ...current,
                  ...recovery.post,
                  id: current.id,
                  revision: current.revision,
                  status: 'draft'
                }))
                setEditorKey((key) => key + 1)
                setRecovery(null)
              }}
            >
              Recover draft
            </button>
            <button
              type="button"
              onClick={() => {
                localStorage.removeItem(recoveryKey)
                setRecovery(null)
              }}
            >
              Dismiss
            </button>
          </div>
        )}
        <div className="cms-editor-grid">
          <div className="cms-editor-column">
            <section className="cms-card cms-writing-card">
              <label className="cms-title-label">
                ARTICLE TITLE
                <input
                  className="cms-title-input"
                  placeholder="What would you like to share?"
                  value={post.title}
                  maxLength={220}
                  required
                  onChange={(event) => {
                    const title = event.target.value
                    setPost((current) => ({
                      ...current,
                      title,
                      slug:
                        !current.id && (!current.slug || current.slug === slugify(current.title))
                          ? slugify(title)
                          : current.slug
                    }))
                  }}
                />
              </label>
              <label className="cms-slug-label">
                <span>/blog/</span>
                <input
                  aria-label="Article URL slug"
                  value={post.slug}
                  required
                  maxLength={140}
                  pattern="[a-z0-9]+(-[a-z0-9]+)*"
                  onChange={(e) => update('slug', e.target.value)}
                />
              </label>
              <RichEditor
                key={editorKey}
                content={post.contentHtml}
                onChange={(html) => update('contentHtml', html)}
                onError={setError}
                onUploadStateChange={setInlineUploading}
              />
              <div className="cms-word-count">
                {words.toLocaleString()} words <span>·</span> {Math.max(1, Math.ceil(words / 220))}{' '}
                min read
              </div>
            </section>
            <section className="cms-card">
              <h2>A small introduction</h2>
              <p className="cms-muted">A short summary for the blog cards and search results.</p>
              <label>
                Article excerpt
                <textarea
                  rows={3}
                  maxLength={700}
                  value={post.excerpt}
                  onChange={(e) => update('excerpt', e.target.value)}
                  placeholder="Give readers a reason to keep reading…"
                />
              </label>
            </section>
            <section className="cms-card">
              <div className="cms-card-heading">
                <h2>Search & sharing</h2>
                <span className="cms-optional">OPTIONAL</span>
              </div>
              <p className="cms-muted">
                Leave these blank to use your article title and introduction.
              </p>
              <label>
                SEO title <small>{post.seoTitle.length}/60 recommended</small>
                <input
                  value={post.seoTitle}
                  maxLength={120}
                  onChange={(e) => update('seoTitle', e.target.value)}
                  placeholder={post.title || 'Your article title'}
                />
              </label>
              <label>
                Search description <small>{post.seoDescription.length}/160 recommended</small>
                <textarea
                  rows={3}
                  value={post.seoDescription}
                  maxLength={320}
                  onChange={(e) => update('seoDescription', e.target.value)}
                  placeholder={post.excerpt || 'A useful summary of your article'}
                />
              </label>
              <div className="cms-search-preview">
                <small>SEARCH PREVIEW</small>
                <span>pragmaticnutritionist.com › blog › {post.slug || 'your-article'}</span>
                <strong>{post.seoTitle || post.title || 'Your article title'}</strong>
                <p>
                  {post.seoDescription ||
                    post.excerpt ||
                    'Your article introduction will appear here.'}
                </p>
              </div>
            </section>
          </div>
          <aside className="cms-editor-settings">
            <section className="cms-card">
              <h2>Publishing</h2>
              <label>
                Article status
                <select value={post.status} onChange={(e) => update('status', e.target.value)}>
                  <option value="draft">Draft · only you can see it</option>
                  <option value="published">Published · visible to readers</option>
                  <option value="archived">Archived · hidden from readers</option>
                </select>
              </label>
              <p className="cms-muted">
                {post.status === 'published'
                  ? 'Saving publishes these changes to your website immediately.'
                  : 'Take your time. Your article stays private until you publish.'}
              </p>
              {post.id && post.status === 'published' && (
                <a
                  className="cms-back-link"
                  href={`/blog/${post.slug}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open article on website <ArrowUpRight size={14} />
                </a>
              )}
            </section>
            <section className="cms-card">
              <h2>Cover image</h2>
              {post.coverImage ? (
                <div className="cms-cover-preview">
                  <img src={post.coverImage} alt={post.coverAlt || 'Article cover'} />
                  <button
                    type="button"
                    aria-label="Remove cover image"
                    onClick={() => update('coverImage', '')}
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <button
                  className="cms-cover-empty"
                  type="button"
                  onClick={() => coverInput.current.click()}
                >
                  <ImagePlus size={28} />
                  <strong>Add a cover image</strong>
                  <span>Up to 15 MB · Auto-compressed</span>
                </button>
              )}
              <button
                type="button"
                className="cms-button cms-full-width"
                disabled={uploading}
                onClick={() => coverInput.current.click()}
              >
                {uploading
                  ? 'Optimizing & uploading…'
                  : post.coverImage
                    ? 'Replace image'
                    : 'Choose image'}
              </button>
              <input
                ref={coverInput}
                type="file"
                hidden
                accept="image/jpeg,image/png,image/webp"
                onChange={uploadCover}
              />
              <label>
                Or paste an image link
                <input
                  type="text"
                  value={post.coverImage}
                  onChange={(e) => update('coverImage', e.target.value)}
                  placeholder="https://… or a media library link"
                />
              </label>
              <label>
                Describe the image
                <input
                  value={post.coverAlt}
                  onChange={(e) => update('coverAlt', e.target.value)}
                  maxLength={250}
                  placeholder="Helps readers using screen readers"
                />
              </label>
            </section>
            <section className="cms-card">
              <h2>Topics</h2>
              <label>
                Category
                <select
                  value={post.categorySlug}
                  onChange={(e) => update('categorySlug', e.target.value)}
                >
                  {BLOG_CATEGORIES.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Tags
                <input
                  value={post.tags.join(', ')}
                  onChange={(e) =>
                    update(
                      'tags',
                      e.target.value.split(',').map((tag) => tag.trimStart())
                    )
                  }
                  placeholder="Fibre, gut health, recipes"
                />
                <small>Separate tags with commas. Up to 15.</small>
              </label>
            </section>
            <section className="cms-card">
              <h2>Author & review</h2>
              <label>
                Author name & credentials
                <input
                  maxLength={150}
                  value={post.author}
                  onChange={(e) => update('author', e.target.value)}
                />
              </label>
              <label>
                Reviewed by <span className="cms-optional">OPTIONAL</span>
                <input
                  maxLength={150}
                  value={post.reviewer}
                  onChange={(e) => update('reviewer', e.target.value)}
                  placeholder="Name and credentials"
                />
              </label>
              <label>
                Review date
                <input
                  type="date"
                  value={post.reviewedAt}
                  onChange={(e) => update('reviewedAt', e.target.value)}
                />
              </label>
            </section>
          </aside>
        </div>
      </form>
      {preview && (
        <div className="cms-modal-backdrop" role="presentation">
          <section
            className="cms-preview-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cms-preview-title"
          >
            <div className="cms-modal-header">
              <span>
                <Eye size={17} />
                Article preview · unsaved changes included
              </span>
              <button
                type="button"
                ref={previewClose}
                aria-label="Close preview"
                onClick={() => setPreview(false)}
              >
                <X size={22} />
              </button>
            </div>
            <div className="cms-preview-hero">
              <Sprout size={26} />
              <small>{BLOG_CATEGORIES.find((c) => c.slug === post.categorySlug)?.label}</small>
              <h1 id="cms-preview-title">{post.title || 'Your article title'}</h1>
              <p>{post.excerpt}</p>
              <span>
                By {post.author} · {Math.max(1, Math.ceil(words / 220))} min read
              </span>
            </div>
            <article className="cms-preview-body">
              {post.coverImage && (
                <img className="cms-preview-cover" src={post.coverImage} alt={post.coverAlt} />
              )}
              <div
                className="cms-prose"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.contentHtml) }}
              />
            </article>
          </section>
        </div>
      )}
      {history && (
        <section className="cms-history cms-card" aria-label="Revision history">
          <div className="cms-card-heading">
            <h2>Revision history</h2>
            <button
              type="button"
              className="cms-icon-button"
              onClick={() => setHistory(null)}
              aria-label="Close history"
            >
              <X size={19} />
            </button>
          </div>
          <p className="cms-muted">
            The latest 20 saved versions. Restoring loads a private draft for you to review.
          </p>
          {history.length ? (
            history.map((snapshot, index) => (
              <div className="cms-history-row" key={index}>
                <div>
                  <strong>{snapshot.title}</strong>
                  <small>
                    {new Date(snapshot.savedAt).toLocaleString()} ·{' '}
                    {snapshot.updatedBy || 'Original article'}
                  </small>
                </div>
                <button type="button" className="cms-button" onClick={() => restore(snapshot)}>
                  <RotateCcw size={15} />
                  Restore
                </button>
              </div>
            ))
          ) : (
            <p>No earlier versions yet. They will appear after your next save.</p>
          )}
        </section>
      )}
    </main>
  )
}
