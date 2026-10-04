const reviews = [
  { quote: 'I ordered custom jute bags for my boutique, and I’m extremely happy with the quality and finish. Sree Sakthi Jute Bags delivered on time and with great professionalism. Highly recommend for eco-friendly packaging!', author: 'Priya Ramesh', location: 'T. Nagar, Chennai' },
  { quote: 'These bags are sturdy, well-stitched, and perfect for daily use. I’ve been using their products for my organic store, and my customers love them. Great service and value!', author: 'Arvind Kumar', location: 'Tambaram, Chennai' },
  { quote: 'Beautifully made and completely sustainable! The team at Sree Sakthi Jute Bags was very responsive and helped me choose the right sizes for my event. Will definitely reorder.', author: 'Deepika Suresh', location: 'Pondicherry' },
  { quote: 'We sourced jute bags in bulk for our textile business promotions. Excellent print quality, durable material, and fast delivery. A trusted vendor in South India!', author: 'M. Vijay', location: 'Coimbatore' },
]

export default function Testimonials() {
  return (
    <section className="review-section" id="reviews">
      <div className="review-heading"><div><p className="eyebrow">Customer Reviews</p><h2>Kind words.<br /><em>Good company.</em></h2></div><div className="review-rating"><span>★★★★★</span><p>Made with care.<br />Loved in real life.</p></div></div>
      <div className="review-grid">{reviews.map((review) => <article className="review-card" key={review.author}><div className="quote-mark">“</div><p className="review-quote">{review.quote}</p><div className="review-author"><span className="author-mark">{review.author.slice(0, 1)}</span><p><strong>{review.author}</strong><span>{review.location}</span></p><span className="review-stars">★★★★★</span></div></article>)}</div>
    </section>
  )
}
