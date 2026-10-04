import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, MoveUpRight } from 'lucide-react'
import { images } from '../assets/images'

const clients = [
  { name: 'SRM Institute of Science & Technology', wordmark: 'SRM', detail: 'Institute of Science & Technology', accent: '#8f101c' },
  { name: 'Adani', wordmark: 'adani', accent: '#a62a78' },
  { name: 'DBM Vircon', wordmark: 'DBM VIRCON', accent: '#5d8f45' },
  { name: 'Triveni Paper, Pulp & Program Chemicals', wordmark: 'TRIVENI', detail: 'Paper · Pulp · Program Chemicals', accent: '#1286a7' },
  { name: 'Khazana Jewellery', wordmark: 'KHAZANA', detail: 'JEWELLERY', accent: '#8f1f30' },
  { name: 'Saveetha Engineering College', wordmark: 'SAVEETHA', detail: 'ENGINEERING COLLEGE', accent: '#1688ad' },
  { name: 'Ramco Supergrade', wordmark: 'RAMCO', detail: 'SUPERGRADE', accent: '#245b9c' },
  { name: 'The Grand Sweets & Snacks', wordmark: 'The Grand', detail: 'Sweets & Snacks', accent: '#16764b' },
  { name: 'Suryadev TMT Rebar', wordmark: 'SURY ADEV', detail: 'TMT REBAR', accent: '#29313a' },
  { name: 'Chennai Petroleum Corporation Limited', wordmark: 'CPCL', image: images.clients[0], accent: '#263f76' },
  { name: 'Vestas', wordmark: 'Vestas', image: images.clients[1], accent: '#125391' },
  { name: 'Hi-Line', wordmark: 'Hi-LINE', detail: 'A Special Initiative', accent: '#2673a7' },
]

const visibleCount = 4

export default function Clients() {
  const [activeIndex, setActiveIndex] = useState(0)
  const visibleClients = Array.from({ length: visibleCount }, (_, offset) => clients[(activeIndex + offset) % clients.length])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const interval = window.setInterval(() => setActiveIndex((index) => (index + 1) % clients.length), 5000)
    return () => window.clearInterval(interval)
  }, [])

  const move = (direction) => setActiveIndex((index) => (index + direction + clients.length) % clients.length)

  return (
    <section className="client-showcase" aria-label="Our corporate clients and projects">
      <div className="client-showcase-heading">
        <div>
          <p className="client-showcase-kicker">Good partnerships grow together</p>
          <h2>Our Corporate <em>Clients &amp; Projects</em></h2>
        </div>
        <p className="client-showcase-count"><strong>{String(activeIndex + 1).padStart(2, '0')}</strong><span> / {String(clients.length).padStart(2, '0')} PARTNERS</span></p>
      </div>

      <div className="client-showcase-carousel" role="region" aria-roledescription="carousel" aria-label="Corporate clients">
        <button className="client-carousel-arrow client-carousel-previous" type="button" onClick={() => move(-1)} aria-label="Previous clients"><ArrowLeft size={20} /></button>
        <div className="client-showcase-track" aria-live="polite">
          {visibleClients.map((client, offset) => (
            <article className="client-showcase-card" key={`${client.name}-${activeIndex}`} style={{ '--client-accent': client.accent, '--client-order': offset }}>
              <span className="client-card-number">{String((activeIndex + offset) % clients.length + 1).padStart(2, '0')}</span>
              <div className="client-logo-area">
                {client.image
                  ? <img src={client.image} alt={client.name} loading="lazy" />
                  : <div className={`client-wordmark${client.name.startsWith('SRM') ? ' client-wordmark-srm' : ''}`} aria-label={client.name}>
                    <strong>{client.wordmark}</strong>{client.detail && <span>{client.detail}</span>}
                  </div>}
              </div>
              <p>{client.name}</p>
              <MoveUpRight className="client-card-arrow" size={17} aria-hidden="true" />
            </article>
          ))}
        </div>
        <button className="client-carousel-arrow client-carousel-next" type="button" onClick={() => move(1)} aria-label="Next clients"><ArrowRight size={20} /></button>
      </div>

      <div className="client-showcase-footer">
        <p>Trusted for corporate gifts, events &amp; everyday orders</p>
        <div className="client-carousel-dots" aria-label="Choose a client slide">
          {clients.map((client, index) => (
            <button key={client.name} type="button" className={index === activeIndex ? 'is-active' : ''} onClick={() => setActiveIndex(index)} aria-label={`Show clients starting with ${client.name}`} aria-pressed={index === activeIndex} />
          ))}
        </div>
      </div>
    </section>
  )
}
