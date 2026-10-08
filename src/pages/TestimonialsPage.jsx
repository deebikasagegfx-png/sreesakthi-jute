import nationalJuteBoardImage from '../assets/images/national-jute-board.png'
import Testimonials from '../components/Testimonials'
import '../styles/testimonials-page.css'

export default function TestimonialsPage() {
  return (
    <main className="testimonials-page">
      <header className="testimonials-page-hero">
        <div className="testimonials-page-hero-copy">
          <p className="testimonials-eyebrow"><span /> CUSTOMER STORIES</p>
          <h1>Testimonials</h1>
          <p>Home <span aria-hidden="true">›</span> Testimonials</p>
        </div>
      </header>

      <section className="testimonial-mission">
        <figure className="testimonial-board-photo">
          <img src={nationalJuteBoardImage} alt="National Jute Board in a jute field" />
        </figure>
        <div className="testimonial-mission-copy">
          <h2 className="testimonial-board-title">Jute Bags for Return Gifts</h2>
          <h3 className="testimonial-board-heading">THE NATIONAL JUTE BOARD</h3>
          <p>Established in 2008 by the Ministry of Textiles, Government of India, the National Jute Board promotes the growth of the jute industry through:</p>
          <ul>
            <li>Research and skill development</li>
            <li>Innovative applications of jute</li>
            <li>Trade fairs, expos, and market research</li>
          </ul>
          <strong>We are proud to be a part of this national mission.</strong><br></br>
          <h3>Jute Bag For Wedding</h3>
        </div>
      </section>

      {/* <section className="testimonial-wedding-section">
        <h2 className="testimonial-wedding-title">Jute Bag For Wedding</h2>
      </section> */}

      <Testimonials />
    </main>
  )
}
