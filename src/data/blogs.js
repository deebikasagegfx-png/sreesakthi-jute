import archive from './blogArchive.json'
import relatedPostSlugs from './blogRelations.json'

const localBlogAssets = import.meta.glob('../assets/images/blogs/**/*.{jpg,jpeg,png,webp,gif,avif}', {
  eager: true,
  import: 'default',
  query: '?url',
})

const assetsByPath = Object.fromEntries(
  Object.entries(localBlogAssets).map(([path, url]) => [path.replace('../assets/images/blogs/', ''), url]),
)

export const blogs = archive.map((post, index) => ({
  ...post,
  // Use stable, local IDs for the React archive rather than WordPress post IDs.
  id: index + 1,
  image: assetsByPath[post.image.replace('__BLOG_ASSET__/', '')] || '',
  content: post.content.replace(/__BLOG_ASSET__\/([^\"' )>]+)/g, (match, assetPath) => assetsByPath[assetPath] || match),
  articleImages: [...new Set([...post.content.matchAll(/__BLOG_ASSET__\/([^\"' )>]+)/g)].map((match) => assetsByPath[match[1]]).filter((image) => image && image !== assetsByPath[post.image.replace('__BLOG_ASSET__/', '')]))],
  previousSlug: archive[index + 1]?.slug || null,
  nextSlug: archive[index - 1]?.slug || null,
  relatedPosts: relatedPostSlugs[post.slug] || [],
}))

// WordPress excerpts in the export include breadcrumbs and the table of contents.
// Derive a readable card excerpt from the opening article copy instead.
if (typeof DOMParser !== 'undefined') {
  const parser = new DOMParser()
  blogs.forEach((post) => {
    const doc = parser.parseFromString(post.content, 'text/html')
    doc.querySelectorAll('.elementor-widget-hfe-breadcrumbs-widget, .elementor-widget-table-of-contents, svg').forEach((node) => node.remove())
    const firstParagraph = [...doc.querySelectorAll('p')].map((node) => node.textContent.trim()).find(Boolean)
    if (firstParagraph) post.excerpt = firstParagraph.length > 170 ? `${firstParagraph.slice(0, 167).trimEnd()}…` : firstParagraph
  })
}

export const blogPageCount = 7
export const blogPageSize = 9

export const blogPageCounts = Array.from({ length: blogPageCount }, (_, index) =>
  blogs.filter((post) => post.page === index + 1).length,
)

export function validateBlogArchive() {
  const required = ['id', 'title', 'slug', 'image', 'excerpt', 'content', 'page']
  const duplicateValues = (key) => blogs.map((post) => post[key]).filter((value, index, values) => values.indexOf(value) !== index)
  return {
    count: blogs.length,
    pageCounts: blogPageCounts,
    missingFields: blogs.flatMap((post) => required.filter((key) => !post[key]).map((key) => ({ id: post.id, field: key }))),
    missingDates: blogs.filter((post) => !post.date).map((post) => post.id),
    duplicateIds: duplicateValues('id'),
    duplicateTitles: duplicateValues('title'),
    duplicateSlugs: duplicateValues('slug'),
    duplicateImages: duplicateValues('image'),
    duplicateContent: duplicateValues('content'),
    missingArticleImages: blogs.filter((post) => post.content.includes('__BLOG_ASSET__/')).map((post) => post.slug),
    invalidNeighborReferences: blogs.filter((post) =>
      (post.previousSlug && !blogs.some((candidate) => candidate.slug === post.previousSlug)) ||
      (post.nextSlug && !blogs.some((candidate) => candidate.slug === post.nextSlug)),
    ).map((post) => post.slug),
    invalidRelatedReferences: blogs.flatMap((post) => post.relatedPosts.filter((slug) => !blogs.some((candidate) => candidate.slug === slug))),
  }
}

if (import.meta.env.DEV) {
  const validation = validateBlogArchive()
  if (validation.count !== 62 || validation.pageCounts.join(',') !== '9,9,9,9,9,9,8' || validation.missingFields.length || validation.missingDates.length || validation.duplicateIds.length || validation.duplicateTitles.length || validation.duplicateSlugs.length || validation.duplicateImages.length || validation.duplicateContent.length || validation.missingArticleImages.length || validation.invalidNeighborReferences.length || validation.invalidRelatedReferences.length) {
    console.error('Blog archive validation failed', validation)
  }
}

export function formatBlogDate(date) {
  return new Date(`${date}T00:00:00`).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  })
}
