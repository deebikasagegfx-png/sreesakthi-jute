import { useState } from 'react'
import { images } from '../assets/images'
import '../styles/jute-color-studio.css'

const studioColors = [
  { ...images.colors[4], label: 'Red' },
  { ...images.colors[1], label: 'Golden Yellow' },
  { ...images.colors[8], label: 'Parrot Green' },
  { ...images.colors[2], label: 'Turquoise Blue' },
  { ...images.colors[7], label: 'Rani Pink' },
  { ...images.colors[3], label: 'Orange' },
  { ...images.colors[6], label: 'Robbin Blue' },
  { ...images.colors[5], label: 'Ivory' },
  { ...images.colors[10], label: 'Bottle Green' },
  { ...images.colors[9], label: 'Olive Green' },
]

export default function JuteColorStudio() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const selected = studioColors[selectedIndex]

  return (
    <section className="jute-color-studio" aria-labelledby="jute-color-studio-title">
      <header className="jute-color-studio-heading">
        <p className="eyebrow">Fabric options &amp; color range</p>
        <h2 id="jute-color-studio-title">The Jute <em>Color Studio</em></h2>
        <p>Pick a shade to see the weave up close.</p>
      </header>
      <div className="jute-color-studio-layout">
        <div className="jute-color-preview" key={selected.name}>
          <img src={selected.image} alt={`${selected.label} jute fabric weave`} />
          <span className="jute-color-count">{String(selectedIndex + 1).padStart(2, '0')} / {String(studioColors.length).padStart(2, '0')}</span>
          <div className="jute-color-caption"><small>JUTE FABRIC / SELECTED SHADE</small><strong>{selected.label}</strong></div>
        </div>
        <div className="jute-color-controls">
          <p className="jute-color-kicker">Find your finish</p>
          <h3>Natural texture.<br />Your color.</h3>
          <p className="jute-color-description">Available in VIOLA and OXFORD natural rolls, with dyeing and lamination options.</p>
          <div className="jute-natural-option"><img src={images.colors[0].image} alt="Natural laminated jute fabric" /><span><strong>Natural Jute Fabric</strong><small>VIOLA · OXFORD ROLLS</small></span></div>
          <div className="jute-color-swatches" aria-label="Choose a jute fabric color">
            {studioColors.map((fabric, index) => (
              <button type="button" className={selectedIndex === index ? 'is-selected' : ''} key={fabric.name} aria-label={`Show ${fabric.label} jute fabric`} aria-pressed={selectedIndex === index} onClick={() => setSelectedIndex(index)}>
                <img src={fabric.image} alt="" loading="lazy" />
                <span>{fabric.label}</span>
              </button>
            ))}
          </div>
          <p className="jute-color-finishes"><strong>Finishes</strong><span>Dyeing</span><i /><span>Lamination</span></p>
        </div>
      </div>
    </section>
  )
}
