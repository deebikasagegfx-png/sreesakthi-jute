import { images } from '../assets/images'

const steps = [
  { name: 'From Plant To Fibre', image: images.process[0] },
  { name: 'Spinning & Weaving', image: images.process[1] },
  { name: 'Designing & Crafting', image: images.process[2] },
  { name: 'Finishing', image: images.process[3] },
]

export default function ArchitectureShowcase() {
  return (
    <section className="journey-section" id="journey">
      <h2 className="journey-title">Journey Of Jute Bags</h2>
      <div className="journey-grid">
        {steps.map((step, index) => (
          <article className="journey-card" key={step.name} style={{ '--journey-order': index }}>
            <div className="journey-image-wrap">
              <img src={step.image} alt={step.name} loading="lazy" />
            </div>
            <h3>{step.name}</h3>
          </article>
        ))}
      </div>
    </section>
  )
}
