import { useBook } from '../context/bookContext'

export default function TransformHealthCta() {
  const openBook = useBook()

  return (
    <section className="transform-health-section" aria-label="Transform Your Health">
      <div className="transform-health-container">
        <span className="transform-health-eyebrow">Transform Your Health</span>

        <h2 className="transform-health-heading">
          Ready to Stop Guessing &amp; Start Seeing Results?
        </h2>

        <p className="transform-health-desc">
          Book a free 20-minute discovery call. No commitment, no generic advice — just an honest conversation about your health concerns and how we can support you the best
        </p>

        <div className="transform-health-action">
          <button
            type="button"
            className="transform-health-btn"
            onClick={openBook}
            aria-label="Book a Free Discovery Call"
          >
            <span>Free Discovery Call</span>
            <span className="btn-arrow" aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </div>
    </section>
  )
}
