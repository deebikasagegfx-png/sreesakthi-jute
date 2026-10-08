import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

function pagePath(page) {
  return page === 1 ? '/leading-jute-bag-manufacturers' : `/leading-jute-bag-manufacturers/page/${page}`
}

export default function BlogPagination({ page, totalPages }) {
  return (
    <nav className="blog-pagination" aria-label="Blog pages">
      <Link aria-label="Previous page" aria-disabled={page === 1} tabIndex={page === 1 ? -1 : 0} to={pagePath(Math.max(1, page - 1))}><ArrowLeft size={15} /></Link>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
        <Link key={pageNumber} className={pageNumber === page ? 'is-active' : ''} aria-current={pageNumber === page ? 'page' : undefined} to={pagePath(pageNumber)}>{pageNumber}</Link>
      ))}
      <Link aria-label="Next page" aria-disabled={page === totalPages} tabIndex={page === totalPages ? -1 : 0} to={pagePath(Math.min(totalPages, page + 1))}><ArrowRight size={15} /></Link>
    </nav>
  )
}
