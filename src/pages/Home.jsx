import About from '../components/About'
import ArchitectureShowcase from '../components/ArchitectureShowcase'
import Clients from '../components/Clients'
import FabricOptions from '../components/FabricOptions'
import Hero from '../components/Hero'
import HomeProductCarousel from '../components/HomeProductCarousel'
import { images } from '../assets/images'
import MissionVision from '../components/MissionVision'
import ScrollReveal from '../components/ScrollReveal'
import SustainabilityFeature from '../components/SustainabilityFeature'
import Team from '../components/Team'
import Testimonials from '../components/Testimonials'

export default function Home() {
  return (
    <main>
      <Hero />
      <ScrollReveal className="home-about-reveal"><About /></ScrollReveal>
      <ScrollReveal><MissionVision /></ScrollReveal>
      <HomeProductCarousel />
      <ScrollReveal className="home-sustainability-reveal"><SustainabilityFeature /></ScrollReveal>
      <ScrollReveal><ArchitectureShowcase /></ScrollReveal>
      <ScrollReveal><Team /></ScrollReveal>
      <section className="cta-section">
          <img className="cta-background" src={images.background} alt="" aria-hidden="true" />
          <div className="cta-overlay" aria-hidden="true" />
          <h2 className="cta-location">Jute Bag Suppliers In Chennai</h2>
          <p className="cta-prompt">Looking For Durable &amp; Stylish Jute Bags? Contact Us Today</p>
          <a className="button cta-phone" href="tel:+916381067678">+91 63810 67678</a>
      </section>
      <FabricOptions />
      <ScrollReveal><Clients /></ScrollReveal>
      <ScrollReveal><Testimonials /></ScrollReveal>
    </main>
  )
}
