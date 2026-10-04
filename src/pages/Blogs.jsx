import { Link, useParams } from 'react-router-dom'
import { blogs, blogPageCount } from '../data/blogs'
import BlogGrid from '../components/BlogGrid'
import BlogPagination from '../components/BlogPagination'
import blogBackground from '../assets/images/back-jute-fib.webp'
import '../styles/blog.css'

export default function Blogs() {
  const { page: pageParam } = useParams()
  const parsedPage = Number(pageParam || 1)
  const page = Number.isInteger(parsedPage) && parsedPage >= 1 && parsedPage <= blogPageCount ? parsedPage : 1
  const pageBlogs = blogs.filter((blog) => blog.page === page)

  return (
    <main className="blog-page">
      <header className="blog-banner" style={{ '--blog-banner-image': `url(${blogBackground})` }}>
        <div className="blog-banner-inner">
          <div className="blog-banner-copyblock">
            <p className="blog-banner-kicker">THE SREE SAKTHI JOURNAL</p>
            <h1><span className="blog-title-line">Blogs &amp;</span><span className="blog-title-line">Insights</span></h1>
            <p className="blog-hero-breadcrumb"><Link to="/">Home</Link><span>›</span><span>Blogs</span></p>
          </div>
        </div>
      </header>
      <section className="blog-listing" aria-label="Jute bag articles">
        <div className="blog-listing-heading"><div><p className="blog-eyebrow">Page {page} of {blogPageCount}</p><h2>Latest <em>articles.</em></h2></div><span>{pageBlogs.length} ARTICLES</span></div>
        <BlogGrid blogs={pageBlogs} />
        <BlogPagination page={page} totalPages={blogPageCount} />
      </section>
    </main>
  )
}
