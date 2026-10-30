import { Link } from 'react-router-dom'
import PageHero from './PageHero'

export default function NotFound() {
  return (
    <>
      <PageHero title="404 — Page not found" blurb="That page does not exist. Use the navigation menu above to find what you need." image="not-found" />
      <section className="section bg-base"><div className="sec-wide"><Link className="btn btn-primary" to="/">Back to home</Link></div></section>
    </>
  )
}
