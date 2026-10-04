import { blogs } from '../data/blogs'
import RelatedPosts from './RelatedPosts'
import CommentSection from './CommentSection'

export default function RelatedPostsAndComments({ posts = [] }) {
  const slugs = posts
    .map((post) => blogs.find((blog) => blog.title === post.title)?.slug)
    .filter(Boolean)

  return (
    <section className="article-related" aria-label="Related posts and comments">
      <RelatedPosts slugs={slugs} />
      <CommentSection />
    </section>
  )
}
