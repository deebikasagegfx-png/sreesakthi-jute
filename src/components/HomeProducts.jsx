import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { products } from '../data/products'

export default function HomeProducts() {
  return (
    <section className="home-products" id="products" aria-labelledby="home-products-title">
      <div className="home-products-heading">
        <div>
          <p className="home-products-kicker">Natural. Reusable. Made for everyday life.</p>
          <h2 id="home-products-title">Our <em>Products</em></h2>
        </div>
        <p>Explore our eight jute fabric and bag collections for shopping, gifting, events, and business use.</p>
      </div>
      <div className="home-products-grid">
        {products.map((product, index) => (
          <Link className="home-product-card" to={`/products/${product.slug}`} key={product.slug} aria-label={`View ${product.name}`}>
            <div className="home-product-image"><img src={product.image} alt={product.name} loading="lazy" /></div>
            <div className="home-product-caption">
              <div><h3>{product.name}</h3><p>{product.description}</p></div>
              <span>{String(index + 1).padStart(2, '0')} <ArrowUpRight size={15} aria-hidden="true" /></span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
