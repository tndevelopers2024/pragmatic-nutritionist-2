import { useEffect, useState } from 'react'
import { Link, Navigate, NavLink, Route, Routes } from 'react-router-dom'
import {
  ArrowUpRight,
  BookOpen,
  Image,
  LogOut,
  Plus,
  Search,
  FileText,
  CheckCircle2,
  Archive,
  ArrowLeft,
  Eye,
  EyeOff
} from 'lucide-react'
import { cms, uploadImage } from './api'
import { formatImageSize, imageUploadMessage } from '@pragmatic/shared/image-policy'
import PostEditor from './PostEditor'
import logoImg from '../assets/Pragmatic_logo.png'
import './admin.css'

export default function AdminPage() {
  const [session, setSession] = useState({ loading: true, user: null, error: '' })
  useEffect(() => {
    const robots = document.createElement('meta')
    robots.name = 'robots'
    robots.content = 'noindex, nofollow'
    document.head.appendChild(robots)
    const title = document.title
    document.title = 'Blog studio | Pragmatic Nutrition'
    let active = true
    cms('session')
      .then((data) => {
        if (active) setSession({ loading: false, user: data.user, error: '' })
      })
      .catch((error) => {
        if (active)
          setSession({
            loading: false,
            user: null,
            error: error.status === 401 ? '' : error.message
          })
      })
    return () => {
      active = false
      robots.remove()
      document.title = title
    }
  }, [])
  if (session.loading)
    return (
      <div className="cms-app cms-loading" role="status">
        Opening your blog studio…
      </div>
    )
  if (!session.user)
    return (
      <Login
        initialError={session.error}
        onLogin={(user) => setSession({ loading: false, user, error: '' })}
      />
    )
  async function signOut() {
    try {
      await cms('logout', { method: 'POST' })
      setSession({ loading: false, user: null, error: '' })
    } catch (error) {
      setSession((s) => ({ ...s, error: error.message }))
    }
  }
  return (
    <div className="cms-app">
      <aside className="cms-sidebar">
        <Link to="/admin" className="cms-brand">
          <img src={logoImg} alt="Pragmatic Nutrition" />
          <span className="cms-admin-label">Admin Portal</span>
        </Link>
        <div className="cms-workspace-label">YOUR WORKSPACE</div>
        <nav aria-label="Studio navigation">
          <NavLink to="/admin" end>
            <BookOpen size={19} />
            Articles
          </NavLink>
          <NavLink to="/admin/media">
            <Image size={19} />
            Media library
          </NavLink>
        </nav>
        <div className="cms-account">
          <span className="cms-avatar">{session.user.name?.[0] || 'M'}</span>
          <span>
            <strong>{session.user.name}</strong>
            <small>Blog administrator</small>
          </span>
          <button type="button" onClick={signOut} aria-label="Sign out" title="Sign out">
            <LogOut size={17} />
          </button>
        </div>
      </aside>
      <div className="cms-workspace">
        <header className="cms-topbar">
          <span>
            <span className="cms-status-dot" />
            Your publishing space
          </span>
          <a className="cms-button cms-primary" href="/blog" target="_blank" rel="noreferrer">
            View Blog
          </a>
        </header>
        {session.error && (
          <div className="cms-alert" role="alert">
            {session.error}
          </div>
        )}
        <Routes>
          <Route index element={<ArticleList />} />
          <Route path="new" element={<PostEditor />} />
          <Route path="posts/:id" element={<PostEditor />} />
          <Route path="media" element={<MediaLibrary />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </div>
    </div>
  )
}

function Login({ initialError, onLogin }) {
  const [error, setError] = useState(initialError)
  const [busy, setBusy] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false)
  async function submit(event) {
    event.preventDefault()
    setBusy(true)
    setError('')
    const data = new FormData(event.currentTarget)
    try {
      onLogin(
        (
          await cms('login', {
            method: 'POST',
            body: { email: data.get('email'), password: data.get('password') }
          })
        ).user
      )
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }
  return (
    <div className="cms-app cms-login">
      <main className="cms-login-main">
        <Link to="/" className="cms-login-logo">
          <img src={logoImg} alt="Pragmatic Nutrition" />
        </Link>
        <form onSubmit={submit} className="cms-login-form" aria-label="Blog admin sign in">
          <header className="cms-login-heading">
            <h1>Admin Login</h1>
            <p>Manage your blog articles and media.</p>
          </header>
          {error && (
            <div className="cms-alert" role="alert">
              {error}
            </div>
          )}
          <label>
            Email address
            <input
              type="email"
              name="email"
              autoComplete="username"
              placeholder="you@example.com"
              required
            />
          </label>
          <div className="cms-password-field">
            <label htmlFor="cms-login-password">Password</label>
            <div className="cms-password-input">
              <input
                id="cms-login-password"
                type={passwordVisible ? 'text' : 'password'}
                name="password"
                autoComplete="current-password"
                required
                maxLength={512}
              />
              <button
                type="button"
                className="cms-password-toggle"
                aria-label={passwordVisible ? 'Hide password' : 'Show password'}
                aria-controls="cms-login-password"
                aria-pressed={passwordVisible}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => setPasswordVisible((visible) => !visible)}
              >
                {passwordVisible ? (
                  <EyeOff size={18} aria-hidden="true" />
                ) : (
                  <Eye size={18} aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
          <button className="cms-button cms-primary" disabled={busy}>
            {busy ? 'Signing in…' : 'Sign in'} <ArrowUpRight size={17} />
          </button>
          <Link className="cms-back-link" to="/blog">
            <ArrowLeft size={15} />
            Back
          </Link>
        </form>
      </main>
    </div>
  )
}

function ArticleList() {
  const [data, setData] = useState({ posts: [], loading: true, error: '' })
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [page, setPage] = useState(1)
  useEffect(() => {
    let active = true
    cms('posts')
      .then((result) => {
        if (active) setData({ ...result, loading: false, error: '' })
      })
      .catch((error) => {
        if (active) setData({ posts: [], loading: false, error: error.message })
      })
    return () => {
      active = false
    }
  }, [])
  const visible = data.posts.filter(
    (post) =>
      (filter === 'all' || post.status === filter) &&
      `${post.title} ${post.category} ${(post.tags || []).join(' ')}`
        .toLowerCase()
        .includes(query.toLowerCase())
  )
  const totalPages = Math.max(1, Math.ceil(visible.length / 15))
  const currentPage = Math.min(page, totalPages)
  const pagePosts = visible.slice((currentPage - 1) * 15, currentPage * 15)
  const counts = Object.fromEntries(
    ['published', 'draft', 'archived'].map((status) => [
      status,
      data.posts.filter((p) => p.status === status).length
    ])
  )
  return (
    <main className="cms-main">
      <div className="cms-page-heading">
        <div>
          <span className="cms-eyebrow">A LITTLE KNOWLEDGE, SHARED WELL</span>
          <h1>
            Your articles<span className="cms-title-dot">.</span>
          </h1>
          <p>From your first thought to someone’s next healthy habit.</p>
        </div>
        <Link className="cms-button cms-primary" to="/admin/new">
          <Plus size={18} />
          Write an article
        </Link>
      </div>
      <div className="cms-stat-grid">
        {[
          [BookOpen, 'All articles', data.posts.length, 'all'],
          [CheckCircle2, 'Published', counts.published, 'published'],
          [FileText, 'Drafts', counts.draft, 'draft']
        ].map(([Icon, label, count, value]) => (
          <button
            key={label}
            type="button"
            className={`cms-stat ${filter === value ? 'is-selected' : ''}`}
            onClick={() => {
              setFilter(value)
              setPage(1)
            }}
          >
            <span>
              <Icon size={19} />
              {label}
            </span>
            <strong>{data.loading ? '—' : count}</strong>
          </button>
        ))}
      </div>
      {data.error && (
        <div className="cms-alert" role="alert">
          {data.error}
        </div>
      )}
      <section className="cms-list-card">
        <div className="cms-list-toolbar">
          <div className="cms-tabs" aria-label="Filter by status">
            {['all', 'published', 'draft', 'archived'].map((status) => (
              <button
                key={status}
                type="button"
                aria-pressed={filter === status}
                onClick={() => {
                  setFilter(status)
                  setPage(1)
                }}
              >
                {status === 'all'
                  ? 'All articles'
                  : status === 'draft'
                    ? 'Drafts'
                    : status[0].toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
          <label className="cms-search">
            <Search size={17} />
            <input
              type="search"
              aria-label="Search articles"
              placeholder="Find an article…"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setPage(1)
              }}
            />
          </label>
        </div>
        {data.loading ? (
          <div className="cms-empty" role="status">
            Loading your articles…
          </div>
        ) : visible.length === 0 ? (
          <div className="cms-empty">
            <FileText size={30} />
            <h2>{query ? 'No articles found' : 'A fresh page is waiting.'}</h2>
            <p>
              {query
                ? 'Try a different title, category, or topic.'
                : 'Start with a question your clients often ask.'}
            </p>
            <Link to="/admin/new" className="cms-button">
              Write an article
            </Link>
          </div>
        ) : (
          <div className="cms-article-table">
            <div className="cms-table-heading">
              <span>ARTICLE</span>
              <span>STATUS</span>
              <span>LAST UPDATED</span>
              <span />
            </div>
            {pagePosts.map((post) => (
              <Link
                className="cms-article-row"
                key={post.id}
                to={`/admin/posts/${encodeURIComponent(post.id)}`}
              >
                <span className="cms-article-info">
                  <span className="cms-article-thumb">
                    {post.coverImage ? (
                      <img
                        src={post.coverImage}
                        alt=""
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                    ) : (
                      <FileText size={22} />
                    )}
                  </span>
                  <span>
                    <strong>{post.title}</strong>
                    <small>
                      {post.category} <span>·</span> {post.readTime || 'New article'}
                    </small>
                  </span>
                </span>
                <span>
                  <span className={`cms-badge cms-badge-${post.status}`}>{post.status}</span>
                </span>
                <small className="cms-row-date">
                  {new Date(post.updatedAt || post.publishedAt || 0).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </small>
                <ArrowUpRight className="cms-row-arrow" size={18} />
              </Link>
            ))}
          </div>
        )}
        <footer className="cms-list-footer">
          <span>
            {visible.length} {visible.length === 1 ? 'article' : 'articles'}
          </span>
          <nav className="cms-pagination" aria-label="Article pages">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setPage(currentPage - 1)}
            >
              Previous
            </button>
            <span>
              {currentPage} / {totalPages}
            </span>
            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setPage(currentPage + 1)}
            >
              Next
            </button>
          </nav>
          <span>
            <Archive size={14} />
            Archived articles stay private
          </span>
        </footer>
      </section>
    </main>
  )
}

function MediaLibrary() {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  useEffect(() => {
    cms('media')
      .then((data) => setFiles(data.files))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])
  async function upload(event) {
    if (!event.target.files[0]) return
    setBusy(true)
    setError('')
    setMessage('')
    try {
      const file = await uploadImage(event.target.files[0])
      setFiles((current) => [file, ...current])
      setMessage(imageUploadMessage(file))
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
      event.target.value = ''
    }
  }
  return (
    <main className="cms-main">
      <div className="cms-page-heading">
        <div>
          <span className="cms-eyebrow">A PICTURE HELPS TELL THE STORY</span>
          <h1>
            Media library<span className="cms-title-dot">.</span>
          </h1>
          <p>Your uploaded images, ready to use again.</p>
        </div>
        <label className="cms-button cms-primary cms-upload-button">
          {busy ? 'Optimizing & uploading…' : 'Upload image'}
          <Plus size={18} />
          <input
            type="file"
            disabled={busy}
            accept="image/jpeg,image/png,image/webp"
            onChange={upload}
          />
        </label>
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
      <p className="cms-muted">
        JPEG, PNG, or WebP · Up to 15 MB · Images are compressed automatically
      </p>
      {loading ? (
        <p role="status">Loading images…</p>
      ) : files.length ? (
        <div className="cms-media-grid">
          {files.map((file) => (
            <article className="cms-media-card" key={file.id}>
              <img src={file.url} alt={file.alt || file.name} loading="lazy" />
              <div>
                <strong>{file.name}</strong>
                {file.size > 0 && (
                  <p className="cms-muted">
                    {formatImageSize(file.size)}
                    {file.width && file.height ? ` · ${file.width} × ${file.height}` : ''}
                    {file.optimized ? ' · Optimized' : ''}
                  </p>
                )}
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(file.url)
                      setMessage(
                        'Image link copied. Paste it into the article’s cover image field.'
                      )
                    } catch {
                      setError('Could not copy. Open the image and copy its link.')
                    }
                  }}
                >
                  Copy image link
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="cms-empty">
          <Image size={32} />
          <h2>Your images will live here.</h2>
          <p>Upload your first image or add one while writing an article.</p>
        </div>
      )}
    </main>
  )
}
