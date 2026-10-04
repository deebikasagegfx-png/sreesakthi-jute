const internalHost = /(^|\.)sreesakthijutebags\.in$/i

const fixedRoutes = new Map([
  ['', '/'],
  ['about-us', '/about'],
  ['about', '/about'],
  ['contact', '/contact'],
  ['contact-us', '/contact'],
  ['products', '/products'],
  ['jute-bag-for-wedding', '/products/jute-wedding-bags'],
  ['wedding-jute-bags-for-return-gifts', '/products/jute-wedding-bags'],
  ['services', '/services'],
  ['testimonials', '/testimonials'],
  ['privacy-policy', '/privacy-policy'],
  ['leading-jute-bag-manufacturers', '/blogs'],
  ['category/blogs', '/blogs'],
])

const postAliases = new Map([
  ['small-jute-bags-wholesale', 'why-choose-small-jute-bags-wholesale-business'],
  ['jute-fabric-wholesale-market', 'exploring-the-jute-fabric-wholesale-market'],
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
  const pageMatch = path.match(/^leading-jute-bag-manufacturers\/(\d+)$/)
  if (pageMatch) return `/blogs/page/${pageMatch[1]}${url.hash}`
  if (fixedRoutes.has(path)) return `${fixedRoutes.get(path)}${url.search}${url.hash}`

  const alias = postAliases.get(path) || path
  if (knownSlugs.includes(alias)) return `/blogs/${alias}${url.search}${url.hash}`

  // Never leave a clickable link pointing back to the WordPress site when the
  // React app has no matching route for it.
  return null
}
