import { Link } from 'react-router-dom'
import { blogs } from '../data/blogs'

export default function RelatedPosts({ slugs = [] }) {
  const posts = slugs.map((slug) => blogs.find((post) => post.slug === slug)).filter(Boolean)
  if (!posts.length) return null

  return (
    <section className="article-related-posts" aria-labelledby="related-posts-title">
      <div className="article-related-heading">
        <p className="article-kicker">KEEP READING</p>
        <h2 id="related-posts-title">Related <em>Posts</em></h2>
      </div>
      <div className="article-related-grid">
        {posts.map((post) => (
          <article className="article-related-card" key={post.id}>
            <Link className="article-related-image" to={`/leading-jute-bag-manufacturers/${post.slug}`}>
              <img src={post.image} alt={post.imageAlt || post.title} loading="lazy" />
            </Link>
            <div className="article-related-copy"><h3><Link to={`/leading-jute-bag-manufacturers/${post.slug}`}>{post.title}</Link></h3></div>
          </article>
        ))}
      </div>
    </section>
  )
}
