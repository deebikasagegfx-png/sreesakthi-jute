const internalHost = /(^|\.)sreesakthijutebags\.in$/i

const fixedRoutes = new Map([
  ['', '/'],
  ['about-us', '/about-us'],
  ['about', '/about-us'],
  ['contact', '/contact'],
  ['contact-us', '/contact'],
  ['products', '/products'],
  ['jute-bag-for-wedding', '/products/jute-wedding-bags'],
  ['wedding-jute-bags-for-return-gifts', '/wedding-jute-bags-for-return-gifts'],
  ['jute-fabric-wholesale-market', '/jute-fabric-wholesale-market'],
  ['eco-friendly-jute-shopping-bags-wholesale', '/eco-friendly-jute-shopping-bags-wholesale'],
  ['small-jute-bags-wholesale', '/small-jute-bags-wholesale'],
  ['services', '/services'],
  ['testimonials', '/testimonials'],
  ['privacy-policy', '/privacy-policy'],
  ['leading-jute-bag-manufacturers', '/leading-jute-bag-manufacturers'],
  ['category/blogs', '/leading-jute-bag-manufacturers'],
])

const postAliases = new Map([
  ['cheap-jute-bags-wholesale', 'cheap-jute-bags-for-return-gifts'],
])

export function normalizeInternalLink(href, knownSlugs = []) {
  if (!href) return null
  if (href.startsWith('#')) return href
  let url
  try {
    url = new URL(href, 'https://sreesakthijutebags.in')
  } catch {
    return null
  }
  if (!['http:', 'https:', 'mailto:', 'tel:'].includes(url.protocol)) return null
  if (!internalHost.test(url.hostname)) return href

  let path
  try {
    path = decodeURIComponent(url.pathname).replace(/^\/+|\/+$/g, '')
  } catch {
    return null
  }
  if (path === 'blogs' || path.startsWith('blogs/')) {
    path = path.replace(/^blogs(?=\/|$)/, 'leading-jute-bag-manufacturers')
  }
  const pageMatch = path.match(/^leading-jute-bag-manufacturers\/(?:page\/)?(\d+)$/)
  if (pageMatch) return `/leading-jute-bag-manufacturers/page/${pageMatch[1]}${url.hash}`
  if (fixedRoutes.has(path)) return `${fixedRoutes.get(path)}${url.search}${url.hash}`

  const alias = postAliases.get(path) || path
  if (knownSlugs.includes(alias)) return `/leading-jute-bag-manufacturers/${alias}${url.search}${url.hash}`

  // Never leave a clickable link pointing back to the WordPress site when the
  // React app has no matching route for it.
  return null
}
