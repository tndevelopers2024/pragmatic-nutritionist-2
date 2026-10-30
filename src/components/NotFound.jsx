import { Link } from 'react-router-dom'
import PageHero from './PageHero'

export default function NotFound() {
  return (
    <>
      <PageHero heroKey="404" />
      <section className="section bg-base"><div className="sec-wide"><Link className="btn btn-primary" to="/">Back to home</Link></div></section>
    </>
  )
}
