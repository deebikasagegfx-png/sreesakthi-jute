import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ArrowDown, ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import { formErrorMessage, formSuccessMessage, submitWebsiteForm } from '../utils/formSubmission'

const address = 'No. 56/18, Ujjini Street, Ayanavaram, Chennai - 600 023'

export default function ContactPage() {
  const [searchParams] = useSearchParams()
  const product = searchParams.get('product') || ''
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    const formElement = event.currentTarget
    setIsSubmitting(true)
    setStatus('')
    try {
      const fields = Object.fromEntries(new FormData(formElement).entries())
      await submitWebsiteForm({
        formName: product ? 'Product Enquiry Form' : 'Contact Us Form',
        pageName: 'Contact Us',
        fields,
      })
      setStatus(formSuccessMessage)
    } catch (error) {
      setStatus(error instanceof Error ? error.message : formErrorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="contact-page">
      <div className="contact-page-shell">
        <header className="contact-banner">
          <div className="contact-breadcrumb"><a href="/#home">Home</a><span>&gt;</span><span>Contact</span></div>
          <h1>Contact Us</h1>
          <p>Jute Fabric Wholesale Market</p>
          <a className="contact-scroll-link" href="#contact-details">Get in touch <ArrowDown size={15} /></a>
        </header>

        <div className="contact-page-grid">
          <section className="contact-information" id="contact-details" aria-label="Contact information">
            <p className="contact-section-kicker">Get in touch</p>
            <h2>Jute Bags Manufacturers Chennai Tamil Nadu</h2>
            <h3>Reach Out for <em>Sustainable Solutions</em></h3>
            <p className="contact-info-copy">Switch to sustainable jute bags — stylish, durable, and earth-friendly. Contact us now!</p>
            <div className="contact-info-list">
              <a className="contact-info-card" href="tel:+919884094933"><span className="contact-info-icon"><Phone size={18} /></span><span><small>Call us</small><strong>+91 98840 94933</strong></span><ArrowUpRight size={16} /></a>
              <a className="contact-info-card" href="tel:+916381067678"><span className="contact-info-icon"><Phone size={18} /></span><span><small>Call us</small><strong>+91 63810 67678</strong></span><ArrowUpRight size={16} /></a>
              <a className="contact-info-card" href="mailto:ssjbjute@gmail.com"><span className="contact-info-icon"><Mail size={18} /></span><span><small>Email us</small><strong>ssjbjute@gmail.com</strong></span><ArrowUpRight size={16} /></a>
              <a className="contact-info-card contact-address-card" href="https://maps.google.com/?q=No.56%2F18%2C+Ujjini+Street%2C+Ayanavaram%2C+Chennai+600023" target="_blank" rel="noreferrer"><span className="contact-info-icon"><MapPin size={18} /></span><span><small>Visit us</small><strong>{address}</strong></span><ArrowUpRight size={16} /></a>
            </div>
          </section>

          <section className="contact-form-panel" aria-labelledby="contact-form-title">
            <div className="contact-form-heading"><span>01 / Tell us about you</span><h2 id="contact-form-title">Start a conversation</h2><p>Share your details and our team will get back to you.</p></div>
            <form className="contact-page-form" onSubmit={handleSubmit}>
              {product && <input type="hidden" name="product" value={product} />}
              <div className="contact-form-name-row">
                <label>First name<input name="firstName" type="text" placeholder="Your first name" required /></label>
                <label>Last name<input name="lastName" type="text" placeholder="Your last name" required /></label>
              </div>
              <label>Mobile number<input name="mobile" type="tel" placeholder="+91" pattern="[+]?[0-9\s().-]{7,20}" title="Enter a valid phone number" required /></label>
              <label>Email address<input name="email" type="email" placeholder="you@example.com" required /></label>
              <label>Address<input name="address" type="text" placeholder="Your city or delivery address" required /></label>
              <label>Message<textarea name="message" rows="3" placeholder="Tell us about your order or enquiry" required /></label>
              <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Sending…' : 'Send enquiry'} <ArrowUpRight size={17} /></button>
              <p className="contact-form-note" role="status" aria-live="polite"><span /> {status || 'Your details will be sent to our team.'}</p>
            </form>
          </section>
        </div>
        <section className="contact-map-section" aria-label="Our location">
          <div className="contact-map-heading"><span><MapPin size={15} /> Find us in Chennai</span><h2>Visit our unit</h2><p>{address}</p></div>
          <iframe title="Map to Sree Sakthi Jute Bags in Ayanavaram, Chennai" src="https://maps.google.com/maps?q=No.56%2F18%2C%20Ujjini%20Street%2C%20Ayanavaram%2C%20Chennai%20600023&t=&z=14&ie=UTF8&iwloc=&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </section>
      </div>
    </main>
  )
}
