const units = [
  { name: 'Cutting Unit', image: '/images/custom-bags.jpg', alt: 'Close-up of jute fabric prepared for cutting' },
  { name: 'Printing Unit', image: '/images/catalog-2306.jpeg', alt: 'Jute bags with custom printed designs' },
  { name: 'Stitching Unit', image: '/images/process-weaving.jpg', alt: 'Hands carefully crafting a jute product' },
  { name: 'Trimming Unit', image: '/images/process-fibre.jpg', alt: 'Jute fibres and woven material' },
  { name: 'Packing Unit', image: '/images/custom-bags-finished.jpg', alt: 'Finished jute bags prepared for orders' },
  { name: 'Stock Holding Unit (Godown)', image: '/images/catalog-2264.jpeg', alt: 'Jute bags arranged together for wholesale supply' },
]

export default function Team() {
  return (
    <section className="facility-section" aria-labelledby="facility-title">
      <h2 className="facility-title" id="facility-title">
        We have built a manufacturing unit premises of 5500 sq.ft in Ayanavaram which includes:
      </h2>
      <div className="facility-grid">
        {units.map((unit, index) => (
          <article className="facility-card" key={unit.name} style={{ '--facility-order': index }}>
            <img src={unit.image} alt={unit.alt} loading="lazy" />
            <div className="facility-card-shade" />
            <h3>{unit.name}</h3>
          </article>
        ))}
      </div>
    </section>
  )
}
