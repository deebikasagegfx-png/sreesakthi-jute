import { useState } from 'react'
import { formErrorMessage, formSuccessMessage, submitWebsiteForm } from '../utils/formSubmission'

const heroBenefits = [
  { title: <>100%<br />Biodegradable</>, label: '100% biodegradable', description: 'Breaks down naturally without harming the planet.' },
  { title: <>Absorbs CO₂,<br />Releases O₂</>, label: 'Absorbs carbon dioxide, releases oxygen', description: 'Jute plants absorb carbon dioxide and release oxygen as they grow.' },
  { title: <>Reusable &amp;<br />Recyclable</>, label: 'Reusable and recyclable', description: 'Use again and again. Easy to recycle, with less waste.' },
  { title: <>Eco-Friendly<br />Choice</>, label: 'Eco-friendly choice', description: 'Made from natural fibres for a greener future.' },
]

export default function Hero() {
  const [flippedCards, setFlippedCards] = useState([])
  const [hoveredCard, setHoveredCard] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState('')
  const toggleCard = (index) => setFlippedCards((current) => current.includes(index)
    ? current.filter((cardIndex) => cardIndex !== index)
    : [...current, index])

  async function handleQuoteSubmit(event) {
    event.preventDefault()
    const formElement = event.currentTarget
    setIsSubmitting(true)
    setFormStatus('')
    try {
      const fields = Object.fromEntries(new FormData(formElement).entries())
      await submitWebsiteForm({ formName: 'Home Hero Quote Form', pageName: 'Home', fields })
      setFormStatus(formSuccessMessage)
    } catch (error) {
      setFormStatus(error instanceof Error ? error.message : formErrorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="hero" id="home">
      <div className="hero-backgrounds" aria-hidden="true">
        <div className="hero-background hero-background-one" />
        <div className="hero-background hero-background-two" />
        <div className="hero-background hero-background-three" />
      </div>
      <div className="hero-overlay" aria-hidden="true" />

      <div className="hero-content">
        <div className="hero-text">
          <h1>Your Trusted <span>Jute Bag</span><br />Manufacturer Since 2000</h1>
          <p>Delivering eco-friendly, high-quality jute bags across South India for over two decades.</p>
          <a href="#products" className="hero-button">Check Our Products</a>
        </div>

        <form className="hero-form" aria-label="Request a quote" onSubmit={handleQuoteSubmit}>
          <div className="name-fields">
            <input type="text" name="firstName" placeholder="First Name" aria-label="First name" autoComplete="given-name" required />
            <input type="text" name="lastName" placeholder="Last Name" aria-label="Last name" autoComplete="family-name" required />
          </div>
          <input type="tel" name="mobile" placeholder="Mobile Number" aria-label="Mobile number" autoComplete="tel" pattern="[+]?[0-9\s().-]{7,20}" title="Enter a valid phone number" required />
          <input type="email" name="email" placeholder="Email" aria-label="Email address" autoComplete="email" required />
          <textarea name="message" placeholder="Message" aria-label="Message" required />
          <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Sending…' : 'Send'}</button>
          {formStatus && <p className="hero-form-status" role="status" aria-live="polite">{formStatus}</p>}
        </form>
      </div>

      <div className="hero-cards" aria-label="Jute benefits">
        {heroBenefits.map((benefit, index) => {
          const isFlipped = flippedCards.includes(index) || hoveredCard === index
          return (
            <div
              className={`hero-card${isFlipped ? ' is-flipped' : ''}`}
              role="button"
              tabIndex={0}
              key={benefit.label}
              onClick={() => toggleCard(index)}
              onPointerEnter={(event) => {
                if (event.pointerType === 'mouse') setHoveredCard(index)
              }}
              onPointerLeave={(event) => {
                if (event.pointerType === 'mouse') setHoveredCard((current) => current === index ? null : current)
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  toggleCard(index)
                }
              }}
              aria-label={`${benefit.label}. ${isFlipped ? 'Show title' : 'Show details'}`}
              aria-pressed={isFlipped}
            >
              <div className="hero-card-inner">
                <div className="hero-card-face hero-card-front" aria-hidden={isFlipped}>
                  <strong>{benefit.title}</strong>
                  <span className="hero-card-hint">Tap to discover</span>
                </div>
                <div className="hero-card-face hero-card-back" aria-hidden={!isFlipped}>
                  <span className="hero-card-back-label">{benefit.label}</span>
                  <p className="hero-card-description">{benefit.description}</p>
                  <span className="hero-card-hint">Tap to turn back</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
