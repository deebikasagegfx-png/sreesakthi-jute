import { Link, useParams } from 'react-router-dom'
import { blogs, blogPageCount } from '../data/blogs'
import BlogGrid from '../components/BlogGrid'
import BlogPagination from '../components/BlogPagination'
import '../styles/blog.css'

export default function Blogs() {
  const { page: pageParam } = useParams()
  const parsedPage = Number(pageParam || 1)
  const page = Number.isInteger(parsedPage) && parsedPage >= 1 && parsedPage <= blogPageCount ? parsedPage : 1
  const pageBlogs = blogs.filter((blog) => blog.page === page)

  return (
    <main className="blog-page">
      <header className="blog-page-heading">
        <h1>Blogs</h1>
        <nav aria-label="Breadcrumb"><Link to="/">Home</Link><span aria-hidden="true">&gt;</span><span aria-current="page">Blogs</span></nav>
      </header>
      <section className="blog-listing" aria-label="Jute bag articles">
        <BlogGrid blogs={pageBlogs} />
        <BlogPagination page={page} totalPages={blogPageCount} />
      </section>
    </main>
  )
}
