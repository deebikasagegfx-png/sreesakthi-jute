import { useMemo } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { blogs, formatBlogDate } from '../data/blogs'
import { normalizeInternalLink } from '../utils/blogLinks'
import RelatedPosts from '../components/RelatedPosts'
import CommentSection from '../components/CommentSection'
import '../styles/blog-article.css'

export default function BlogDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const blog = blogs.find((post) => post.slug === slug)
  const articleContent = useMemo(() => {
    if (!blog || typeof DOMParser === 'undefined') return blog?.content || ''
    const doc = new DOMParser().parseFromString(blog.content, 'text/html')

    // Remove WordPress navigation chrome; rebuild its empty TOC widget from the
    // real article headings, with local fragment links.
    doc.querySelectorAll('.elementor-widget-hfe-breadcrumbs-widget, svg, script, style').forEach((node) => node.remove())
    doc.querySelectorAll('h1').forEach((heading) => heading.remove())
    const tocWidget = doc.querySelector('.elementor-widget-table-of-contents')
    const usedIds = new Set()
    const headings = [...doc.querySelectorAll('h2, h3')].filter((heading) => !tocWidget?.contains(heading))
    headings.forEach((heading) => {
      const base = heading.textContent.trim().toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'section'
      const idBase = `section-${base}`
      let id = idBase
      let suffix = 2
      while (usedIds.has(id)) id = `${idBase}-${suffix++}`
      usedIds.add(id)
      heading.id = id
    })
    if (tocWidget && headings.length) {
      const nav = doc.createElement('nav')
      nav.className = 'source-article-toc'
      nav.setAttribute('aria-label', 'Table of contents')
      const title = doc.createElement('h2')
      title.textContent = 'Table of Contents'
      const list = doc.createElement('ol')
      headings.forEach((heading) => {
        const item = doc.createElement('li')
        const link = doc.createElement('a')
        link.href = `#${heading.id}`
        link.textContent = heading.textContent.trim()
        item.append(link)
        list.append(item)
      })
      nav.append(title, list)
      tocWidget.replaceWith(nav)
    } else tocWidget?.remove()

    const knownSlugs = blogs.map((post) => post.slug)
    doc.querySelectorAll('a[href]').forEach((anchor) => {
      const href = normalizeInternalLink(anchor.getAttribute('href'), knownSlugs)
      if (href === null) {
        anchor.removeAttribute('href')
        anchor.removeAttribute('target')
      } else anchor.setAttribute('href', href)
    })
    doc.querySelectorAll('img').forEach((image) => {
      if (image.getAttribute('src') === blog.image) image.closest('.elementor-widget-image')?.remove()
    })
    return doc.body.innerHTML
  }, [blog])

  if (!blog) return <main className="source-article-page"><h1>Article not found</h1><Link to="/blogs">Back to blogs</Link></main>

  return (
    <main className="source-article-page blog-detail-page">
      <Link className="blog-detail-back" to={`/blogs${blog.page > 1 ? `/page/${blog.page}` : ''}`}><ArrowLeft size={16} /> Back to all blogs</Link>
      <nav className="blog-detail-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><Link to="/blogs">Blogs</Link><span>/</span><span aria-current="page">{blog.title}</span></nav>
      <article className="source-article">
        <h1>{blog.title}</h1>
        <p className="source-article-byline">{formatBlogDate(blog.date)}</p>
        {blog.image && <img className="source-article-image" src={blog.image} alt={blog.imageAlt || blog.title} onError={(event) => {
          const image = event.currentTarget
          image.hidden = true
          if (import.meta.env.DEV) {
            const warning = document.createElement('p')
            warning.className = 'blog-article-image-error'
            warning.textContent = `Missing featured image: ${blog.title}`
            image.insertAdjacentElement('afterend', warning)
            console.error(`Missing featured image for blog: ${blog.title}`, blog.image)
          }
        }} />}
        <div className="blog-detail-content" onClickCapture={(event) => {
          if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
          const anchor = event.target.closest?.('a[href]')
          const href = anchor?.getAttribute('href')
          if (href?.startsWith('/') || href?.startsWith('#')) {
            event.preventDefault()
            navigate(href)
          }
        }} onErrorCapture={(event) => {
          if (event.target instanceof HTMLImageElement) {
            const image = event.target
            image.hidden = true
            if (import.meta.env.DEV) {
              const warning = document.createElement('p')
              warning.className = 'blog-article-image-error'
              warning.textContent = `Missing article image: ${image.alt || blog.title}`
              image.insertAdjacentElement('afterend', warning)
              console.error(`Missing article image for blog: ${blog.title}`, image.src)
            }
          }
        }} dangerouslySetInnerHTML={{ __html: articleContent }} />
      </article>
      <nav className="blog-post-navigation" aria-label="Article navigation">
        {blog.previousSlug ? <Link rel="prev" to={`/blogs/${blog.previousSlug}`}><span>Previous Post</span><strong>{blogs.find((post) => post.slug === blog.previousSlug)?.title}</strong></Link> : <span />}
        {blog.nextSlug ? <Link rel="next" to={`/blogs/${blog.nextSlug}`}><span>Next Post</span><strong>{blogs.find((post) => post.slug === blog.nextSlug)?.title}</strong></Link> : <span />}
      </nav>
      <section className="article-related">
        <RelatedPosts slugs={blog.relatedPosts} />
        <CommentSection />
      </section>
    </main>
  )
}
