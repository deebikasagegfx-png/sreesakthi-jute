import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { products } from '../data/products'

export default function ProductDetailPage() {
  const { slug } = useParams()
  const product = products.find((item) => item.slug === slug)

  if (!product) {
    return <main className="product-detail-page"><p className="eyebrow">Product collection</p><h1>Collection not found</h1><Link className="product-back-link" to="/products"><ArrowLeft size={16} /> Back to all products</Link></main>
  }

  return (
    <main className="product-detail-page">
      <Link className="product-back-link" to="/products"><ArrowLeft size={16} /> All products</Link>
      <section className="product-detail-hero">
        <div className="product-detail-copy">
          <p className="eyebrow">Sree Sakthi Jute Bags · Our Products</p>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <a className="button button-dark" href={`/contact?product=${encodeURIComponent(product.name)}`}>Enquire about this collection <ArrowUpRight size={16} /></a>
        </div>
        <img src={product.image} alt={product.name} />
      </section>
      <section className="product-detail-gallery" aria-labelledby="product-gallery-title">
        <div className="product-detail-gallery-heading"><p className="eyebrow">Made for your needs</p><h2 id="product-gallery-title">Explore the <em>collection</em></h2></div>
        <div className="product-detail-gallery-grid">
          {product.gallery.map((item) => (
            <figure key={item.id}><img src={item.image} alt={`${product.name} — ${item.name}`} loading="lazy" /><figcaption>{item.code ?? item.name}</figcaption></figure>
          ))}
        </div>
      </section>
    </main>
  )
}
