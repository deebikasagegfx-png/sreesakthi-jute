import { images } from '../assets/images'

const colorsToShow = [
  ['Red', 'Jute Red Fabric'],
  ['Golden Yellow', 'Golden Yellow Jute Fabric'],
  ['Parrot Green', 'Parrot Green Jute Fabric'],
  ['T. Blue', 'Jute Turquoise Blue Fabric'],
  ['Rani Pink', 'Rani Pink Jute Fabric'],
  ['Orange', 'Orange Jute Fabric'],
  ['Royal Blue', 'Robbin Blue Jute Fabric'],
  ['Ivory', 'Ivory Jute Fabric'],
].map(([label, imageName]) => ({
  label,
  image: images.colors.find((color) => color.name === imageName)?.image,
}))

export default function FabricOptions() {
  return (
    <section className="fabric-options-section" aria-labelledby="fabric-options-title">
      <div className="fabric-options-intro">
        <h2 id="fabric-options-title">FABRIC OPTIONS &amp; COLOR RANGE</h2>
        <div className="fabric-options-details">
          <article>
            <h3>Our Fabrics Comes in Various Finishes and Colors:</h3>
            <p>VIOLA, OXFORD (Natural Rolls)<br />Dyeing Process &amp; Lamination Process</p>
          </article>
          <article>
            <h3>Available Colors:</h3>
            <p>Red, Golden Yellow, Parrot Green, T. Blue, Rani Pink,<br className="fabric-options-desktop-break" /> Orange, Royal Blue, Ivory</p>
          </article>
        </div>
      </div>
      <div className="fabric-options-gallery">
        {colorsToShow.map((color) => (
          <figure key={color.label}>
            <img src={color.image} alt={`${color.label} jute fabric`} loading="lazy" />
            <figcaption>{color.label}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
