import { useState } from 'react'
import { Sprout } from 'lucide-react'
import './blog-cover.css'

export default function BlogCover({ src, alt = '', category = 'Nutrition journal', className = '', loading = 'lazy' }) {
  const [failedSrc, setFailedSrc] = useState(null)
  if (src && failedSrc !== src) {
    return <img className={className} src={src} alt={alt} loading={loading} onError={() => setFailedSrc(src)} />
  }
  return (
    <div className={`blog-cover-placeholder ${className}`} role="img" aria-label={`${alt || category} — Pragmatic Nutrition article`}>
      <span className="blog-cover-placeholder-brand">PRAGMATIC NUTRITION</span>
      <Sprout size={48} strokeWidth={1.3} aria-hidden="true" />
      <span className="blog-cover-placeholder-category">{category}</span>
      <span className="blog-cover-placeholder-label">Food. Health. Everyday living.</span>
    </div>
  )
}
