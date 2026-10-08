import { useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import clientLogo1 from '../assets/images/clients/1.png'
import clientLogo2 from '../assets/images/clients/2.png'
import clientLogo3 from '../assets/images/clients/3.png'
import clientLogo4 from '../assets/images/clients/4.png'
import clientLogo5 from '../assets/images/clients/5.png'
import clientLogo6 from '../assets/images/clients/6.png'
import clientLogo7 from '../assets/images/clients/7.png'
import clientLogo8 from '../assets/images/clients/8.png'
import clientLogo9 from '../assets/images/clients/9.png'
import clientLogo10 from '../assets/images/clients/10.png'
import clientLogo11 from '../assets/images/clients/11.png'
import clientLogo12 from '../assets/images/clients/12.png'

const clients = [
  { name: 'The Grand Sweets & Snacks', image: clientLogo4 },
  { name: 'Suryadev TMT Rebar', image: clientLogo5 },
  { name: 'Chennai Petroleum Corporation Limited', image: clientLogo6 },
  { name: 'Vestas', image: clientLogo7 },
  { name: 'Hi-Line', image: clientLogo8 },
  { name: 'SRM Institute of Science & Technology', image: clientLogo9 },
  { name: 'Adani', image: clientLogo10 },
  { name: 'DBM Vircon', image: clientLogo11 },
  { name: 'Triveni Paper, Pulp & Program Chemicals', image: clientLogo12 },
  { name: 'Khazana Jewellery', image: clientLogo1 },
  { name: 'Saveetha Engineering College', image: clientLogo2 },
  { name: 'Ramco Supergrade', image: clientLogo3 },
]

// Two identical groups let the animation wrap seamlessly without exposing an empty track.
const continuousClients = [...clients, ...clients]

export default function Clients() {
  const [marqueeOffset, setMarqueeOffset] = useState(0)
  const moveMarquee = (direction) => {
    setMarqueeOffset((offset) => (offset + direction + clients.length) % clients.length)
  }

  return (
    <section className="client-showcase" aria-label="Our corporate clients and projects">
      <header className="client-showcase-heading">
        <h2>OUR CORPORATE CLIENTS &amp; PROJECTS</h2>
      </header>
      <div className="client-showcase-carousel">
        <button className="client-carousel-arrow client-carousel-previous" type="button" onClick={() => moveMarquee(-1)} aria-label="Previous clients"><ArrowLeft size={20} aria-hidden="true" /></button>
        <div className="client-showcase-viewport">
          <div
            className="client-showcase-track"
            key={marqueeOffset}
            style={{ animationDelay: `${-(12.5 + marqueeOffset * (60 / clients.length))}s` }}
            aria-label="Client logos, continuously scrolling"
          >
            {continuousClients.map((client, index) => (
              <article className="client-showcase-card" key={`${client.name}-${index}`} aria-hidden={index >= clients.length}>
                <img src={client.image} alt={index < clients.length ? client.name : ''} loading="lazy" draggable="false" />
              </article>
            ))}
          </div>
        </div>
        <button className="client-carousel-arrow client-carousel-next" type="button" onClick={() => moveMarquee(1)} aria-label="Next clients"><ArrowRight size={20} aria-hidden="true" /></button>
      </div>
    </section>
  )
}
