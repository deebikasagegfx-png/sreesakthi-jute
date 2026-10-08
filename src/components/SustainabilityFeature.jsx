import { ArrowRight } from 'lucide-react'
import sustainabilityImage from '../assets/images/about/why-jute.png'

const benefits = [
  '100% BIODEGRADABLE & DECOMPOSABLE',
  <>CONSUMES 15 TONS OF CO₂ PER HECTARE &<br className="sustainability-desktop-break" /> RELEASES 11 TONS OF O₂</>,
  'COST-EFFECTIVE, RECYCLABLE, AND REUSABLE',
  'SUPPORTS A GREENER PLANET',
]

export default function SustainabilityFeature() {
  return (
    <section className="sustainability-feature" aria-labelledby="sustainability-title">
      <div className="sustainability-copy">
        <p className="sustainability-eyebrow">Why choose jute?</p>
        <h2 id="sustainability-title">A Smart Switch To<br />Sustainable Living</h2>
        <ul className="sustainability-benefits">
          {benefits.map((benefit, index) => (
            <li key={index}>
              <span className="sustainability-check" aria-hidden="true"><ArrowRight size={17} strokeWidth={3} /></span>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
      <figure className="sustainability-image">
        <img src={sustainabilityImage} alt="Colorful reusable jute bag made from natural fibre" loading="lazy" />
        <figcaption>Natural jute. Everyday impact.</figcaption>
      </figure>
    </section>
  )
}
