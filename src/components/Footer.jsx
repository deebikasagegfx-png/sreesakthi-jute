import { ArrowUpRight, Leaf, MapPin, Phone, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { images } from '../assets/images'

const footerLinks = [
  { label: 'Home', href: '/#home' },
  { label: 'About us', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Contact', href: '/contact' },
]

const reasons = ['100% biodegradable', 'Absorbs CO₂, releases O₂', 'Reusable & recyclable', 'Cost-effective', 'Eco-friendly choice']

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-cta">
        <div className="footer-cta-mark"><Leaf size={19} /><span>Since 2000</span></div>
        <div><p>Carry a little more care.</p><h2>Choose jute. Choose better.</h2></div>
        <Link className="footer-cta-link" to="/contact">Talk to our team <ArrowUpRight size={16} /></Link>
      </div>

      <div className="footer-columns">
        <div className="footer-about">
          <Link className="footer-brand" to="/" aria-label="Sree Sakthi Jute Bags home"><img src={images.logo} alt="Sree Sakthi Jute Bags" /></Link>
          <p>Trusted jute bag makers since 2000. Thoughtful, durable bags made for businesses and everyday life.</p>
          <div className="footer-socials" aria-label="Social media">
            <a href="https://www.facebook.com/people/Sree-Sakthi-Jute-Bags/61577737864400/" target="_blank" rel="noreferrer" aria-label="Facebook"><FaFacebookF /></a>
            <a href="https://www.instagram.com/sreesakthijutebags/" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://wa.me/916381067678" target="_blank" rel="noreferrer" aria-label="WhatsApp"><FaWhatsapp /></a>
          </div>
        </div>

        <div className="footer-column"><h3>Why jute</h3><ul>{reasons.map((reason) => <li key={reason}><Leaf size={13} />{reason}</li>)}</ul></div>

        <nav className="footer-column" aria-label="Footer navigation"><h3>Explore</h3><ul>{footerLinks.map(({ label, href }) => <li key={label}><Link to={href}>{label}<ArrowUpRight size={13} /></Link></li>)}</ul></nav>

        <div className="footer-column footer-contact" id="footer-contact"><h3>Get in touch</h3>
          <a href="tel:+919884094933"><Phone size={15} /><span>+91 98840 94933</span></a>
          <a href="tel:+916381067678"><Phone size={15} /><span>+91 63810 67678</span></a>
          <a href="mailto:ssjbjute@gmail.com"><Mail size={15} /><span>ssjbjute@gmail.com</span></a>
          <p><MapPin size={15} /><span>No. 56/18, Ujjini Street,<br />Ayanavaram, Chennai – 600 023</span></p>
        </div>
      </div>

      <div className="footer-bottom"><span>© {new Date().getFullYear()} Sree Sakthi Jute Bags. All rights reserved. <span className="footer-credit">Powered by Sage GFX Digital Solutions</span></span><a href="/privacy-policy">Privacy policy</a><a className="footer-up" href="#home" aria-label="Back to top"><ArrowUpRight size={16} /></a></div>
    </footer>
  )
}
