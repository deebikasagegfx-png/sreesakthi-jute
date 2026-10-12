import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { images } from '../assets/images'
import { FaFacebookF, FaWhatsapp, FaInstagram } from "react-icons/fa";


const links = [
  { label: 'Our story', href: '/#about' },
  { label: 'Products', href: '/products', dropdown: true },
  { label: 'How itâ€™s made', href: '/#process' },
  { label: 'Kind words', href: '/#reviews' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuAreaRef = useRef(null)
  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    if (!menuOpen) return undefined
    const closeOnOutsideClick = (event) => {
      if (!menuAreaRef.current?.contains(event.target)) closeMenu()
    }
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') closeMenu()
    }
    document.addEventListener('pointerdown', closeOnOutsideClick)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [menuOpen])

  return (
    <>
      <div className="topline">
       <div className="topline-contact">
        <a href="tel:+916381067678">+91 63810 67678</a>
        <a href="mailto:ssjbjute@gmail.com">ssjbjute@gmail.com</a>
       </div>
       <div className="social-links">

  <a
    href="https://www.facebook.com/people/Sree-Sakthi-Jute-Bags/61577737864400/"
    target="_blank"
    rel="noopener noreferrer"
  >
    <FaFacebookF />
  </a>

  <a
    href="https://wa.me/916381067678"
    target="_blank"
    rel="noopener noreferrer"
  >
    <FaWhatsapp />
  </a>

  <a
    href="https://www.instagram.com/sreesakthijutebags/m/"
    target="_blank"
    rel="noopener noreferrer"
  >
    <FaInstagram />
  </a>

</div>
      </div>
      <header ref={menuAreaRef} className="site-header">
       <Link className="brand" to="/" aria-label="Sree Sakthi Jute Bags home">
          <img src={images.logo} alt="Sree Sakthi Jute Bags" />
        </Link>
        
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav id="primary-navigation" className={menuOpen ? "main-nav is-open" : "main-nav"}>
          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/about-us" onClick={closeMenu}>About Us</Link>
          <Link to="/products" onClick={closeMenu}>Products</Link>
          <Link to="/testimonials" onClick={closeMenu}>Testimonials</Link>
          <Link to="/leading-jute-bag-manufacturers" onClick={closeMenu}>Blogs</Link>
          <Link to="/contact" onClick={closeMenu}>Contact</Link>
          <Link className="nav-contact" to="/contact" onClick={closeMenu}>Get In Touch</Link>
        </nav>
        </header>
    </>
  )
}
