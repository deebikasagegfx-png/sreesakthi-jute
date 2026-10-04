import { useState } from 'react'
import { ArrowLeftRight } from 'lucide-react'
import { images } from '../assets/images'

export default function MissionVision() {
  const [comparison, setComparison] = useState(50)

  return (
    <section className="green-jute-section" aria-labelledby="green-jute-title">
      <h2 className="green-jute-title" id="green-jute-title">Best Jute Bag Manufacturers in Chennai</h2>
      <div className="green-jute-content">
        <div className="green-jute-copy">
          <h3>Go <span>Green</span> With Jute</h3>
          <p>
            Switch to <strong>biodegradable and reusable jute bags</strong> that not only help reduce plastic waste but also contribute to a cleaner, greener planet. At Shree Sakthi Jute Bags, we combine sustainability with style, offering a wide range of designs that are perfect for shopping, events, gifting, and business promotions. Each bag is crafted from natural jute fibers, making it durable, eco-friendly, and completely safe for the environment.
          </p>
        </div>

        <div
          className="jute-comparison"
          style={{ '--comparison-position': `${comparison}%` }}
        >
          <img className="comparison-before" src={images.custom} alt="Natural jute fiber before it is made into bags" />
          <img className="comparison-after" src={images.customFinished} alt="Finished customized jute bags" />
          <span className="comparison-label comparison-label-before">From this</span>
          <span className="comparison-label comparison-label-after">To these</span>
          <span className="comparison-divider" aria-hidden="true"><ArrowLeftRight size={18} /></span>
          <input
            className="comparison-control"
            type="range"
            min="0"
            max="100"
            value={comparison}
            onChange={(event) => setComparison(Number(event.target.value))}
            aria-label="Compare jute fiber and finished jute bags"
          />
        </div>
      </div>
    </section>
  )
}
