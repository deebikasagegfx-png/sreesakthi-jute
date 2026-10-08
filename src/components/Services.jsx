import { useState } from 'react'
import { products as productCategories } from '../data/products'
import ServiceCard from './ServiceCard'

const categoryNames = productCategories.map((category) => category.name)

export default function Services() {
  const [activeCategory, setActiveCategory] = useState(categoryNames[0])
  const activeCollection = productCategories.find((category) => category.name === activeCategory)
  const visibleProducts = (activeCollection?.gallery ?? []).map((item) => ({
    ...item,
    categorySlug: activeCollection.slug,
    categoryRoute: activeCollection.route,
    detail: activeCollection.description,
  }))

  return (
    <div className="products-showcase" id="products">
      <div className="page-heading products-page-heading">
        <p className="eyebrow">Our Products</p>
        <h1>Jute Bags &amp; <em>Fabric.</em></h1>
        
      </div>
      <section className="products-section" aria-labelledby="products-title">
        <div className="products-heading-row">
          <div><p className="eyebrow">Natural. Reusable. Made for everyday life.</p><h2 className="products-title" id="products-title">Our Products</h2></div>
          <p className="products-intro">Explore our jute fabric and bag categories for shopping, gifting, events, and business use.</p>
        </div>
        <div className="product-category-tabs" aria-label="Product categories">
          {categoryNames.map((category) => <button type="button" key={category} className={activeCategory === category ? 'is-active' : ''} aria-pressed={activeCategory === category} onClick={() => setActiveCategory(category)}>{category}</button>)}
        </div>
        <div className="product-fabric-quote">{activeCollection?.description}</div>
        <div className="product-carousel" role="region" aria-label={`${activeCategory} products`}>
          <div className="product-carousel-track">
            {visibleProducts.map((product, index) => <ServiceCard product={product} order={index} key={product.id} />)}
          </div>
        </div>
      </section>
    </div>
  )
}
