import { Link } from 'react-router-dom'
import PageHero from './PageHero'
import { useSeo } from './Seo'

export default function NotFound() {
  useSeo('Page not found', 'The requested page could not be found.')
  return (
    <>
      <PageHero heroKey="404" />
      <section className="section bg-base"><div className="sec-wide"><Link className="btn btn-primary" to="/">Back to home</Link></div></section>
    </>
  )
}
