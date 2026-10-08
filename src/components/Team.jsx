const units = [
  { name: 'Cutting Unit' },
  { name: 'Printing Unit' },
  { name: 'Stitching Unit' },
  { name: 'Trimming Unit' },
  { name: 'Packing Unit' },
  { name: 'Stock Holding Unit (Godown)' },
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
            <h3>{unit.name}</h3>
          </article>
        ))}
      </div>
    </section>
  )
}
