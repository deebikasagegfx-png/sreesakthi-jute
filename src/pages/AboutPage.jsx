import { ArrowDown, ArrowLeft, ArrowRight, Leaf, Recycle, Sprout } from 'lucide-react'
import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal'
import HomeProductCarousel from '../components/HomeProductCarousel'
import { useCallback, useState } from 'react'
import companyAbout from '../assets/images/about/company-about.jpg'
import whyJute from '../assets/images/about/why-jute.png'
import journeyFibre from '../assets/images/about/journey-fibre.jpg'
import journeyWeaving from '../assets/images/about/journey-weaving.jpg'
import journeyCrafting from '../assets/images/about/journey-crafting.jpg'
import journeyFinishing from '../assets/images/about/journey-finishing.jpg'
import corporate01 from '../assets/images/about/corporate-01.png'
import corporate02 from '../assets/images/about/corporate-02.png'
import corporate03 from '../assets/images/about/corporate-03.png'
import corporate04 from '../assets/images/about/corporate-04.png'
import corporate05 from '../assets/images/about/corporate-05.png'
import corporate06 from '../assets/images/client-6.png'
import corporate07 from '../assets/images/client-7.png'
import corporate08 from '../assets/images/about/corporate-08.png'
import corporate09 from '../assets/images/about/corporate-09.png'
import corporate10 from '../assets/images/about/corporate-10.png'
import corporate11 from '../assets/images/about/corporate-11.png'
import corporate12 from '../assets/images/about/corporate-12.png'
import './AboutPage.css'

const benefits = [
  { icon: Leaf, text: '100% biodegradable & decomposable' },
  { icon: Sprout, text: 'Consumes 15 tons of CO₂ per hectare & releases 11 tons of O₂' },
  { icon: Recycle, text: 'Cost-effective, recyclable, and reusable' },
  { icon: Leaf, text: 'Supports a greener planet' },
]

const journey = [
  { title: 'From Plant to Fibre', image: journeyFibre, alt: 'Jute fibre prepared from the jute plant' },
  { title: 'Spinning & Weaving', image: journeyWeaving, alt: 'Jute yarn spun and woven into fabric' },
  { title: 'Designing & Crafting', image: journeyCrafting, alt: 'Crafting a jute bag from woven fabric' },
  { title: 'Finishing', image: journeyFinishing, alt: 'Finished jute bag ready for use' },
]

const corporateProjects = [corporate01, corporate02, corporate03, corporate04, corporate05, corporate06, corporate07, corporate08, corporate09, corporate10, corporate11, corporate12]
const continuousCorporateProjects = [...corporateProjects, ...corporateProjects]

export default function AboutPage() {
  const [activeProject, setActiveProject] = useState(0)
  const moveProject = useCallback((direction) => {
    setActiveProject((index) => (index + direction + corporateProjects.length) % corporateProjects.length)
  }, [])

  return <main className="about-page">
    <ScrollReveal className="about-page-heading-reveal"><section className="about-page-heading" aria-labelledby="about-page-title">
      <p className="about-hero-kicker">Rooted in nature. Made for everyday.</p>
      <h1 id="about-page-title">About Us</h1>
      <p className="about-breadcrumb"><Link to="/">Home</Link><span aria-hidden="true"> &gt; </span>Products</p>
      <a className="about-scroll-link" href="#about-company" aria-label="Scroll to learn about our company"><ArrowDown size={17} /></a>
    </section></ScrollReveal>

    <ScrollReveal><section className="about-company" id="about-company" aria-labelledby="about-company-title">
      <div className="about-company-image">
        <img src={companyAbout} alt="A model carrying a natural jute bag made by Sree Sakthi Jute Bags" />
        <span className="about-experience"><strong>24+</strong><span>years of craft</span></span>
      </div>
      <div className="about-company-copy">
        <p className="about-kicker">About us</p>
        <h2 id="about-company-title">Turning Natural Fibers Into Everyday Essentials</h2>
        <h3>Jute Bag Manufacturers</h3>
        <p>Established in 2000, Sree Sakthi Jute Bags has earned a trusted reputation in the Jute Bag Wholesale and eco-friendly product industry. With a dedicated team of 36 skilled professionals—30 men and 6 women—we proudly manufacture over 3,000 jute bags daily. Our commitment to quality and sustainability allows us to serve customers across Chennai and the southern states of Kerala, Karnataka, Andhra Pradesh, and Pondicherry.</p>
      </div>
    </section></ScrollReveal>

    <ScrollReveal><section className="about-sustainability" aria-labelledby="about-sustainability-title">
      <div className="about-sustainability-copy">
        <p className="about-kicker">Why choose jute?</p>
        <h2 id="about-sustainability-title">A Smart Switch to <em>Sustainable Living</em></h2>
        <ul className="about-benefits">
          {benefits.map(({ icon: Icon, text }) => <li key={text}><span><Icon size={19} aria-hidden="true" /></span><h3>{text}</h3></li>)}
        </ul>
      </div>
      <figure className="about-sustainability-image">
        <img src={whyJute} alt="Natural jute fibres, a renewable material for sustainable everyday products" />
        <figcaption>Made from nature, designed to return to it.</figcaption>
      </figure>
    </section></ScrollReveal>

    <ScrollReveal className="about-products-reveal"><HomeProductCarousel /></ScrollReveal>

    <ScrollReveal><section className="about-journey" aria-labelledby="about-journey-title">
      <div className="about-section-heading"><p className="about-kicker">From field to finished bag</p><h2 id="about-journey-title">Journey Of Jute Bags</h2></div>
      <ol className="about-journey-grid">
        {journey.map((step, index) => <li className="about-journey-step" key={step.title}>
          <div className="about-journey-image"><img src={step.image} alt={step.alt} loading="lazy" /><span>{String(index + 1).padStart(2, '0')}</span></div>
          <h3>{step.title}</h3>
        </li>)}
      </ol>
    </section></ScrollReveal>

    <ScrollReveal><section className="about-projects" aria-labelledby="about-projects-title">
      <div className="about-section-heading"><p className="about-kicker">Made together</p><h2 id="about-projects-title">Our Corporate Clients &amp; Projects</h2></div>
      <div className="about-project-carousel">
        <button className="about-project-arrow about-project-arrow--previous" type="button" onClick={() => moveProject(-1)} aria-label="Previous clients"><ArrowLeft size={20} /></button>
        <div className="about-project-gallery"  aria-label="Corporate clients and projects">
          <div
            className="about-project-track"
            key={activeProject}
            style={{ animationDelay: `${-(12.5 + activeProject * (60 / corporateProjects.length))}s` }}
            aria-label="Client logos, continuously scrolling"
          >
            {continuousCorporateProjects.map((project, index) => <figure key={`${project}-${index}`} aria-hidden={index >= corporateProjects.length}>
              <img src={project} alt={index < corporateProjects.length ? `Sree Sakthi Jute Bags corporate client and project ${index + 1}` : ''} loading="lazy" />
            </figure>)}
          </div>
        </div>
        <button className="about-project-arrow about-project-arrow--next" type="button" onClick={() => moveProject(1)} aria-label="Next clients"><ArrowRight size={20} /></button>
      </div>
      <div className="about-project-dots" role="group" aria-label="Select client slide">
        {corporateProjects.map((project, index) => <button className={activeProject === index ? 'is-active' : ''} key={project} type="button" aria-label={`Start logo strip at client ${index + 1}`} aria-current={activeProject === index ? 'true' : undefined} onClick={() => setActiveProject(index)} />)}
      </div>
    </section></ScrollReveal>
  </main>
}
