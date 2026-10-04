import { useState } from 'react'

const colors = [
  { name: 'Red', image: '/images/jute-fabric.png' },
  { name: 'Golden Yellow', image: '/images/fancy-bags.png' },
  { name: 'Parrot Green', image: '/images/jute-yellow.png' },
  { name: 'T. Blue', image: '/images/shopping-bags.jpg' },
  { name: 'Rani Pink', image: '/images/jute-blue.jpg' },
  { name: 'Orange', image: '/images/jute-pink.jpg' },
  { name: 'Royal Blue', image: '/images/jute-orange.png' },
  { name: 'Ivory', image: '/images/jute-royal-blue.png' },
]

export default function FabricOptions() {
  const [selectedColor, setSelectedColor] = useState(colors[0])
  const selectedIndex = colors.findIndex((color) => color.name === selectedColor.name)

  return (
    <section className="fabric-options-section" aria-labelledby="fabric-options-title">
      <header className="fabric-options-heading">
        <span>Explore the fabric palette</span>
        <h2 id="fabric-options-title">The Jute <em>Color Studio</em></h2>
        <p>Pick a shade to see the weave up close.</p>
      </header>
      <div className="fabric-studio">
        <div className="fabric-studio-preview">
          <img className="fabric-selected-image" key={selectedColor.name} src={selectedColor.image} alt={`${selectedColor.name} jute fabric weave`} />
          <span className="fabric-studio-count">{String(selectedIndex + 1).padStart(2, '0')} / 08</span>
          <div className="fabric-studio-label">
            <span>JUTE FABRIC / SELECTED SHADE</span>
            <h3>{selectedColor.name}</h3>
          </div>
        </div>
        <div className="fabric-studio-controls">
          <p className="fabric-studio-kicker">Find your finish</p>
          <h3>Natural texture.<br />Your color.</h3>
          <p className="fabric-studio-description">Available in VIOLA and OXFORD natural rolls, with dyeing and lamination options.</p>
          <div className="natural-fabric-swatch">
            <img src="/images/custom-bags.jpg" alt="Natural jute fabric texture" loading="lazy" />
            <span><b>Natural jute fabric</b><small>VIOLA · OXFORD rolls</small></span>
          </div>
          <div className="fabric-color-picker" aria-label="Choose a jute fabric color">
            {colors.map((color) => (
              <button
                className={`fabric-color-choice${selectedColor.name === color.name ? ' is-selected' : ''}`}
                key={color.name}
                type="button"
                aria-pressed={selectedColor.name === color.name}
                aria-label={`Preview ${color.name} fabric with a finished jute bag`}
                onMouseEnter={() => setSelectedColor(color)}
                onFocus={() => setSelectedColor(color)}
                onClick={() => setSelectedColor(color)}
              >
                <img src={color.image} alt="" loading="lazy" />
                <span>{color.name}</span>
              </button>
            ))}
          </div>
          <div className="fabric-finish-note"><span>FINISHES</span><b>Dyeing</b><i /> <b>Lamination</b></div>
        </div>
      </div>
    </section>
  )
}
