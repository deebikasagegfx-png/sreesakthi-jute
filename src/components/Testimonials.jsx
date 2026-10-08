import { useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const reviews = [
  { quote: 'I ordered custom jute bags for my boutique, and I’m extremely happy with the quality and finish. Sree Sakthi Jute Bags delivered on time and with great professionalism. Highly recommend for eco-friendly packaging!', author: 'Priya Ramesh', location: 'T. Nagar, Chennai' },
  { quote: 'These bags are sturdy, well-stitched, and perfect for daily use. I’ve been using their products for my organic store, and my customers love them. Great service and value!', author: 'Arvind Kumar', location: 'Tambaram, Chennai' },
  { quote: 'Beautifully made and completely sustainable! The team at Sree Sakthi Jute Bags was very responsive and helped me choose the right sizes for my event. Will definitely reorder.', author: 'Deepika Suresh', location: 'Pondicherry' },
  { quote: 'We sourced jute bags in bulk for our textile business promotions. Excellent print quality, durable material, and fast delivery. A trusted vendor in South India!', author: 'M. Vijay', location: 'Coimbatore' },
]

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const showReview = (index) => setActiveIndex((index + reviews.length) % reviews.length)

  return (
    <section className="review-section" id="reviews">
      <h2 className="review-section-title">Reviews</h2>
      <div className="review-carousel">
        <button className="review-arrow review-arrow-previous" type="button" onClick={() => showReview(activeIndex - 1)} aria-label="Previous review"><ArrowLeft size={24} aria-hidden="true" /></button>
        <div className="review-grid" aria-live="polite" aria-atomic="true">
          {reviews.map((review, index) => (
            <article className={`review-card${index === activeIndex ? ' is-active' : ''}`} key={review.author} aria-hidden={index !== activeIndex}>
              <p className="review-quote">{review.quote}</p>
              <span className="review-stars" aria-label="5 out of 5 stars">★★★★★</span>
              <div className="review-author"><p><strong>{review.author} – {review.location}</strong></p></div>
            </article>
          ))}
        </div>
        <button className="review-arrow review-arrow-next" type="button" onClick={() => showReview(activeIndex + 1)} aria-label="Next review"><ArrowRight size={24} aria-hidden="true" /></button>
        <div className="review-carousel-dots" role="group" aria-label="Choose a review">
          {reviews.map((review, index) => <button type="button" key={review.author} className={index === activeIndex ? 'is-active' : ''} onClick={() => setActiveIndex(index)} aria-label={`Show review by ${review.author}`} aria-pressed={index === activeIndex} />)}
        </div>
      </div>
    </section>
  )
}
