import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { BrowserRouter, Link, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { ArrowUpRight, X } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import Footer from './components/Footer'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import SEOManager from './components/SEOManager'
import { formErrorMessage, formSuccessMessage, submitWebsiteForm } from './utils/formSubmission'

const Home = lazy(() => import('./pages/Home'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ServicesPage = lazy(() => import('./pages/ServicesPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const Blogs = lazy(() => import('./pages/Blogs'))
const BlogDetail = lazy(() => import('./pages/BlogDetail'))
const BlogArticlePage = lazy(() => import('./pages/BlogArticlePage'))
const EcoFriendlyArticlePage = lazy(() => import('./pages/EcoFriendlyArticlePage'))
const MaterialArticlePage = lazy(() => import('./pages/MaterialArticlePage'))
const FolderArticlePage = lazy(() => import('./pages/FolderArticlePage'))
const HandbagsArticlePage = lazy(() => import('./pages/HandbagsArticlePage'))
const ManufacturersArticlePage = lazy(() => import('./pages/ManufacturersArticlePage'))
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'))
const TestimonialsPage = lazy(() => import('./pages/TestimonialsPage'))
const ProductsPage = lazy(() => import('./pages/ProductsPage'))
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'))
const SmallJuteBagsPage = lazy(() => import('./pages/SmallJuteBagsPage'))

function ScrollManager() {
  const location = useLocation()
  const navigate = useNavigate()
  const previousLocation = useRef(null)

  useEffect(() => {
    if (location.hash === '#home') {
      navigate(`${location.pathname}${location.search}`, { replace: true })
    }
  }, [location.hash, location.pathname, location.search, navigate])

  useEffect(() => {
    const currentLocation = `${location.pathname}${location.hash}`
    if (previousLocation.current === null) {
      previousLocation.current = currentLocation
      return
    }
    if (previousLocation.current === currentLocation) return
    previousLocation.current = currentLocation

    if (location.hash) {
      requestAnimationFrame(() => document.querySelector(location.hash)?.scrollIntoView())
    } else {
      window.scrollTo(0, 0)
    }
  }, [location.pathname, location.hash])

  return null
}

function NotFound() {
  return <main className="page-not-found"><p className="eyebrow">This page wandered off</p><h1>Let’s get you<br /><em>back on track.</em></h1><Link className="button button-dark" to="/">Back to home <ArrowUpRight size={15} /></Link></main>
}

function LoadingScreen() {
  return <div className="brand-splash" role="status" aria-label="Loading Sree Sakthi Jute Bags"><img src="/assets/images/logobg.webp" alt="Sree Sakthi Jute Bags" /></div>
}

function LegacyBlogRedirect() {
  const location = useLocation()
  const pathname = location.pathname.replace(/^\/blogs(?=\/|$)/, '/leading-jute-bag-manufacturers')
  return <Navigate to={{ pathname, search: location.search, hash: location.hash }} replace />
}

function EnquiryPopup({ onClose }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState('')
  const submissionInProgress = useRef(false)

  useEffect(() => {
    const onKeyDown = (event) => { if (event.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose])

  return <div className="enquiry-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
    <section className="enquiry-dialog" role="dialog" aria-modal="true" aria-labelledby="enquiry-title">
      <button className="enquiry-close" type="button" aria-label="Close enquiry form" onClick={onClose}><X size={20} /></button>
      <img className="enquiry-image" src="/assets/images/images022.webp" alt="Reusable jute bags in a range of styles" />
      <div className="enquiry-form-wrap">
        <h2 id="enquiry-title">Go Green With Jute Bags</h2>
        <form onSubmit={async (event) => {
          event.preventDefault()
          if (submissionInProgress.current) return
          const formElement = event.currentTarget
          submissionInProgress.current = true
          setIsSubmitting(true)
          setStatus('')
          try {
            const fields = Object.fromEntries(new FormData(formElement).entries())
            await submitWebsiteForm({ formName: 'Home Popup Enquiry Form', pageName: 'Home', fields })
            formElement.reset()
            setStatus(formSuccessMessage)
          } catch (error) {
            setStatus(error instanceof Error ? error.message : formErrorMessage)
          } finally {
            submissionInProgress.current = false
            setIsSubmitting(false)
          }
        }}>
          <label>Name<input name="name" type="text" placeholder="Name" autoComplete="name" required /></label>
          <label>Email<input name="email" type="email" placeholder="Email" autoComplete="email" required /></label>
          <label>Message<textarea name="message" placeholder="Message" rows="3" required /></label>
          <button className="enquiry-submit" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Sending…' : 'Send'}</button>
          {status && <p className="enquiry-form-status" role="status" aria-live="polite">{status}</p>}
        </form>
      </div>
    </section>
  </div>
}

function HomeExperience() {
  const location = useLocation()
  const [splashElapsed, setSplashElapsed] = useState(false)
  const [popupVisible, setPopupVisible] = useState(false)
  const [homeReadyLocation, setHomeReadyLocation] = useState(null)
  const initialLocationKey = useRef(location.key)
  const isHome = location.pathname === '/'
  const initialHomeNeedsContent = isHome && location.key === initialLocationKey.current
  const splashVisible = !splashElapsed || (initialHomeNeedsContent && homeReadyLocation !== location.key)

  useEffect(() => {
    const timeout = window.setTimeout(() => setSplashElapsed(true), 2000)
    return () => window.clearTimeout(timeout)
  }, [])

  useEffect(() => {
    if (!isHome) return undefined
    let observer
    const markHomeReady = () => {
      if (!document.querySelector('main .hero')) return
      setHomeReadyLocation(location.key)
      observer?.disconnect()
    }
    markHomeReady()
    if (homeReadyLocation !== location.key) {
      observer = new MutationObserver(markHomeReady)
      observer.observe(document.getElementById('root'), { childList: true, subtree: true })
    }
    return () => observer?.disconnect()
  }, [isHome, location.key, homeReadyLocation])

  useEffect(() => {
    if (splashVisible || !isHome) {
      setPopupVisible(false)
      return undefined
    }
    let timeout
    const observer = new MutationObserver(() => {
      if (!document.querySelector('main .hero')) return
      observer.disconnect()
      timeout = window.setTimeout(() => setPopupVisible(true), 5000)
    })
    if (document.querySelector('main .hero')) {
      timeout = window.setTimeout(() => setPopupVisible(true), 5000)
    } else {
      observer.observe(document.getElementById('root'), { childList: true, subtree: true })
    }
    return () => {
      observer.disconnect()
      window.clearTimeout(timeout)
    }
  }, [splashVisible, isHome])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    if (splashVisible) document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previousOverflow }
  }, [splashVisible])

  return <>
    {splashVisible && <LoadingScreen />}
    {popupVisible && isHome && <EnquiryPopup onClose={() => setPopupVisible(false)} />}
  </>
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <SEOManager />
      <HomeExperience />
      <Navbar />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Navigate to="/about-us" replace />} />
          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:slug" element={<ProductDetailPage />} />
          <Route path="/jute-fabric-wholesale-market" element={<ProductDetailPage />} />
          <Route path="/wedding-jute-bags-for-return-gifts" element={<ProductDetailPage />} />
          <Route path="/eco-friendly-jute-shopping-bags-wholesale" element={<ProductDetailPage />} />
          <Route path="/small-jute-bags-wholesale" element={<SmallJuteBagsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/leading-jute-bag-manufacturers" element={<Blogs />} />
          <Route path="/leading-jute-bag-manufacturers/page/:page" element={<Blogs />} />
          <Route path="/leading-jute-bag-manufacturers/:slug" element={<BlogDetail />} />
          <Route path="/blogs" element={<LegacyBlogRedirect />} />
          <Route path="/blogs/*" element={<LegacyBlogRedirect />} />
          <Route path="/why-choose-small-jute-bags-wholesale-business" element={<BlogArticlePage />} />
          <Route path="/complete-guide-to-choosing-eco-friendly-jute-bags" element={<EcoFriendlyArticlePage />} />
          <Route path="/who-are-the-best-jute-bag-material-suppliers" element={<MaterialArticlePage />} />
          <Route path="/why-jute-file-folders-are-the-smart-choice" element={<FolderArticlePage />} />
          <Route path="/how-to-source-quality-jute-handbags-wholesale" element={<HandbagsArticlePage />} />
          <Route path="/exploring-the-top-jute-bag-manufacturers" element={<ManufacturersArticlePage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
      <a className="whatsapp-float" href="https://wa.me/916381067678?text=Hello%2C%20I%27m%20interested%20in%20your%20jute%20bags." target="_blank" rel="noreferrer" aria-label="Need help? Chat with us on WhatsApp"><span className="whatsapp-float-prompt">Need Help?</span><span className="whatsapp-float-logo"><FaWhatsapp aria-hidden="true" /></span></a>
    </BrowserRouter>
  )
}
