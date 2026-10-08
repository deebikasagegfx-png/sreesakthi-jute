import { Link } from 'react-router-dom'
import { formatBlogDate } from '../data/blogs'

export default function BlogCard({ blog }) {
  return (
    <article className="blog-card">
      <Link className="blog-card-image" to={`/leading-jute-bag-manufacturers/${blog.slug}`} aria-label={`Read ${blog.title}`}>
        {blog.image ? <img src={blog.image} alt={blog.imageAlt || blog.title} loading="lazy" onError={(event) => { event.currentTarget.hidden = true; if (import.meta.env.DEV) { event.currentTarget.parentElement.dataset.imageError = `Missing image: ${blog.title}`; console.error(`Missing featured image for blog: ${blog.title}`, blog.image) } }} /> : <span className="blog-image-error">Missing featured image: {blog.title}</span>}
      </Link>
      <div className="blog-card-body">
        <p className="blog-card-date">{formatBlogDate(blog.date)}</p>
        <h3><Link to={`/leading-jute-bag-manufacturers/${blog.slug}`}>{blog.title}</Link></h3>
        <p className="blog-card-excerpt">{blog.excerpt}</p>
        <Link className="blog-read-more" to={`/leading-jute-bag-manufacturers/${blog.slug}`}>Read more</Link>
      </div>
    </article>
  )
}
