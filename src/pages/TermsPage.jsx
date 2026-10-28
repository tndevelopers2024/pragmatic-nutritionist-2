import { ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { useSeo } from '../components/Seo'
import content from '../data/termsContent.json'
import './terms.css'

function SourceInline({ block }) {
  return block.inline.map((part, i) => {
    const text = part.text.replace(/[\u200b\ufeff]/g, '')
    if (part.break) return <span key={i}>{' '}<br /></span>
    if (!part.href) return <span key={i}>{text}</span>
    // The source Privacy Policy anchor points at its homepage. Use the local
    // policy destination while preserving the visible wording exactly.
    if (text.trim() === 'Privacy Policy') return <Link key={i} to="/privacy">{text}</Link>
    if (/^https?:\/\/(www\.)?pragmaticnutritionist\.com\/?$/.test(part.href)) return <Link key={i} to="/">{text}</Link>
    return <a key={i} href={part.href}>{text}</a>
  })
}

function SourceBlocks({ blocks }) {
  const groups = []
  for (const block of blocks) {
    if (block.type === 'item') {
      if (groups.at(-1)?.type !== 'list' || groups.at(-1).ordered !== Boolean(block.ordered)) groups.push({ type: 'list', ordered: Boolean(block.ordered), items: [] })
      groups.at(-1).items.push(block)
    } else groups.push(block)
  }
  return groups.map((block, i) => {
    if (block.type === 'list') {
      const List = block.ordered ? 'ol' : 'ul'
      return <List key={i}>{block.items.map((item, j) => <li key={j}><SourceInline block={item} /></li>)}</List>
    }
    return <p key={i}><SourceInline block={block} /></p>
  })
}

function Contents({ content }) {
  return <nav aria-label={`${content.title} sections`}><ol>{content.sections.map(section => <li key={section.id}><a href={`#${section.id}`}>{section.title}</a></li>)}</ol></nav>
}

export default function TermsPage({ document = content }) {
  const policy = document
  useSeo(policy.title, (policy.intro[1] || policy.intro[0]).text)
  return <div className="terms-page">
    <PageHero title={policy.title} />
    <div className="terms-layout">
      <aside className="terms-sidebar"><Contents content={policy} /></aside>
      <details className="terms-mobile-contents"><summary>{policy.title}<ChevronDown size={18} aria-hidden="true" /></summary><Contents content={policy} /></details>
      <article className="terms-document" data-source-url={policy.sourceUrl} aria-label={policy.title}>
        <div className="terms-introduction"><SourceBlocks blocks={policy.intro} /></div>
        {policy.sections.map(section => <section className="terms-clause" id={section.id} key={section.id}><h2>{section.title}</h2><SourceBlocks blocks={section.blocks} /></section>)}
      </article>
    </div>
  </div>
}
