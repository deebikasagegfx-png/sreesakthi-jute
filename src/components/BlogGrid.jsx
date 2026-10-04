import BlogCard from './BlogCard'

export default function BlogGrid({ blogs }) {
  return <div className="blog-grid">{blogs.map((blog, index) => <BlogCard key={blog.id} blog={blog} index={index} />)}</div>
}
