import { Star } from 'lucide-react'
import weddingBagsImage from '../assets/images/small-jute-gift-bags.jpg'
import nationalJuteBoardImage from '../assets/images/national-jute-board.png'
import '../styles/testimonials-page.css'

const reviews = [
  { quote: 'I ordered custom jute bags for my boutique, and I’m extremely happy with the quality and finish. Sree Sakthi Jute Bags delivered on time and with great professionalism. Highly recommend for eco-friendly packaging!', author: 'Priya Ramesh', location: 'T. Nagar, Chennai' },
  { quote: 'These bags are sturdy, well-stitched, and perfect for daily use. I’ve been using their products for my organic store, and my customers love them. Great service and value!', author: 'Arvind Kumar', location: 'Tambaram, Chennai' },
  { quote: 'Beautifully made and completely sustainable! The team at Sree Sakthi Jute Bags was very responsive and helped me choose the right sizes for my event. Will definitely reorder.', author: 'Deepika Suresh', location: 'Pondicherry' },
  { quote: 'We sourced jute bags in bulk for our textile business promotions. Excellent print quality, durable material, and fast delivery. A trusted vendor in South India!', author: 'M. Vijay', location: 'Coimbatore' },
]

export default function TestimonialsPage() {
  return (
    <main className="testimonials-page">
      <header className="testimonials-page-hero">
        <div className="testimonials-page-hero-copy">
          <p className="testimonials-eyebrow"><span /> CUSTOMER STORIES</p>
          <h1>Testimonials</h1>
          <p>Home <span>›</span> Testimonials</p>
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
          <strong>We are proud to be a part of this national mission.</strong>
        </div>
      </section>

      <section className="testimonial-wedding-section">
        <figure className="testimonial-wedding-photo">
          <img src={weddingBagsImage} alt="Decorated jute bags for wedding and return gifts" />
          <figcaption>Jute Bag for Wedding</figcaption>
        </figure>
      </section>

      <section className="testimonial-reviews-section" aria-labelledby="testimonial-reviews-title">
        <div className="testimonial-reviews-heading">
          <div><p className="testimonials-eyebrow">MADE WITH CARE · LOVED IN REAL LIFE</p><h2 id="testimonial-reviews-title">Reviews</h2></div>
          <div className="testimonial-rating"><span aria-label="5 out of 5 stars"><Star /><Star /><Star /><Star /><Star /></span><strong>Kind words from our customers</strong></div>
        </div>
        <div className="testimonial-page-grid">
          {reviews.map((review, index) => (
            <article className="testimonial-page-card" key={review.author} style={{ '--card-index': index }}>
              <span className="testimonial-card-count">0{index + 1}</span>
              <span className="testimonial-card-stars" aria-label="5 out of 5 stars">★★★★★</span>
              <p className="testimonial-page-quote">“{review.quote}”</p>
              <div className="testimonial-card-author"><span>{review.author.slice(0, 1)}</span><p><strong>{review.author}</strong><small>{review.location}</small></p></div>
            </article>
          ))}
        </div>
      </section>

    </main>
  )
}
