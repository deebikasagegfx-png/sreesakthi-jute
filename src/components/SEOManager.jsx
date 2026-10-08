import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const origin = 'https://sreesakthijutebags.in'
const siteName = 'Sree Sakthi Jute Bags'
const defaultDescription = 'Leading jute bag manufacturers in Chennai, India. Eco-friendly, stylish, and sustainable jute bags. Shop now Jute Bags Suppliers in Chennai, India.'
const pageTitles = {
  '/': 'Jute Bag Manufacturers in Chennai | Jute Bag Suppliers in Chennai',
  '/about-us': 'Leading Jute Bag Manufacturers | Trusted Jute Bags Wholesaler',
  '/products': 'Ladies Hand Bag Manufacturers | Jute Handbags Wholesale Supplier',
  '/small-jute-bags-wholesale': 'No.1 Premium Small Jute Bags Wholesale | Sree Sakthi Jute Bags',
  '/testimonials': 'Elegant Jute Bag for Wedding | Wedding Jute Bags for Return Gifts',
  '/contact': 'Jute Bags Manufacturers Chennai Tamil Nadu | Jute Fabric Wholesale Market',
  '/leading-jute-bag-manufacturers': 'Leading Jute Bag Manufacturers | Trusted Jute Bags',
  '/privacy-policy': 'Privacy Policy | Sree Sakthi Jute Bags',
}
const pageDescriptions = [
  [/^\/$/, defaultDescription],
  [/^\/about-us\/?$/, 'Discover Sree Sakthi Jute Bags, established in 2000 and manufacturing over 3,000 eco-friendly jute bags daily for customers across Chennai and South India.'],
  [/^\/products\/?$/, 'Explore Sree Sakthi Jute Bags’ range of eco-friendly jute bags, folders, fabric, shopping bags, handbags and promotional bags.'],
  [/^\/contact\/?$/, 'Contact Sree Sakthi Jute Bags in Ayanavaram, Chennai for sustainable jute bags, custom orders and wholesale enquiries.'],
  [/^\/small-jute-bags-wholesale\/?$/, 'Buy premium small jute bags in wholesale for gifting, retail, events, boutiques, packaging, and promotional branding.'],
  [/^\/leading-jute-bag-manufacturers(?:\/page\/\d+)?\/?$/, 'Read Sree Sakthi Jute Bags articles about jute bags, materials, sourcing and sustainable business.'],
  [/^\/testimonials\/?$/, 'Read customer feedback about Sree Sakthi Jute Bags and our custom, durable and sustainable jute products.'],
  [/^\/privacy-policy\/?$/, 'Privacy policy and information about Sree Sakthi Jute Bags website searches and contact details.'],
]

function ensureMeta(selector, attributes) {
  let element = document.head.querySelector(selector)
  if (!element) {
    element = document.createElement('meta')
    document.head.append(element)
  }
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value))
}

export default function SEOManager() {
  const { pathname } = useLocation()

  useEffect(() => {
    let frame = 0
    let fallbackTimer = 0
    let observer
    const applyMetadata = () => {
      const normalizedPath = pathname.replace(/\/$/, '') || '/'
      const pageHeading = document.querySelector('main h1')?.textContent?.trim()
      const needsHeading = normalizedPath !== '/' && !['/about-us', '/products', '/contact'].includes(normalizedPath)
      if (needsHeading && !pageHeading) return false
      const routeTitle = pageTitles[normalizedPath]
        || (normalizedPath.startsWith('/leading-jute-bag-manufacturers')
          ? `${pageHeading || 'Blogs'} | Sree Sakthi Jute Bags`
          : normalizedPath.startsWith('/products/')
            ? `${pageHeading || 'Jute Bags'} | Sree Sakthi Jute Bags`
            : `${pageHeading || 'Sree Sakthi Jute Bags'} | Sree Sakthi Jute Bags`)
      const description = pageDescriptions.find(([pattern]) => pattern.test(normalizedPath))?.[1]
        || (normalizedPath.startsWith('/products/') && pageHeading
          ? `Explore ${pageHeading} from Sree Sakthi Jute Bags, Chennai. View the collection and enquire about sustainable jute products.`
          : pageHeading
            ? `${pageHeading} from Sree Sakthi Jute Bags, trusted jute bag manufacturers in Chennai since 2000.`
            : defaultDescription)
      const canonical = `${origin}${normalizedPath === '/' ? '/' : normalizedPath}`
      const image = `${origin}/images/images022.jpg`

      document.title = routeTitle
      ensureMeta('meta[name="description"]', { name: 'description', content: description })
      ensureMeta('meta[name="robots"]', { name: 'robots', content: 'index,follow,max-image-preview:large' })
      ensureMeta('meta[property="og:title"]', { property: 'og:title', content: routeTitle })
      ensureMeta('meta[property="og:description"]', { property: 'og:description', content: description })
      ensureMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' })
      ensureMeta('meta[property="og:url"]', { property: 'og:url', content: canonical })
      ensureMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: siteName })
      ensureMeta('meta[property="og:image"]', { property: 'og:image', content: image })
      ensureMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' })
      ensureMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: routeTitle })
      ensureMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description })
      ensureMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: image })

      let canonicalLink = document.head.querySelector('link[rel="canonical"]')
      if (!canonicalLink) {
        canonicalLink = document.createElement('link')
        canonicalLink.rel = 'canonical'
        document.head.append(canonicalLink)
      }
      canonicalLink.href = canonical
      return true
    }
    const tryApply = () => {
      if (!applyMetadata()) return
      observer?.disconnect()
      window.clearTimeout(fallbackTimer)
    }
    frame = window.requestAnimationFrame(tryApply)
    observer = new MutationObserver(tryApply)
    observer.observe(document.getElementById('root'), { childList: true, subtree: true, characterData: true })
    fallbackTimer = window.setTimeout(() => { applyMetadata(); observer.disconnect() }, 3000)
    return () => {
      window.cancelAnimationFrame(frame)
      window.clearTimeout(fallbackTimer)
      observer.disconnect()
    }
  }, [pathname])

  return null
}
