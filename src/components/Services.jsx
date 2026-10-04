import { useState } from 'react'
import { images } from '../assets/images'
import Lightbox from './Lightbox'
import ServiceCard from './ServiceCard'
import weddingGiftSet from '../assets/images/small-jute-gift-bags.jpg'
import weddingGiftCollection from '../assets/images/small-jute-gifting-bags.png'
import weddingJuteBags from '../assets/images/wedding-jute-bags.jpg'
import weddingGiftBags from '../assets/images/wedding-gift-bags.jpg'
import weddingPrintedBags from '../assets/images/wedding-printed-bags.jpg'

const products = [
  { name: 'Natural Jute Rolls', detail: 'Natural jute fabric for bags and other made-to-order products.', image: images.products[3], number: '01', groups: ['Jute Fabric'] },
  { name: 'File Folders', detail: 'Reusable jute file folders for organizing and carrying documents.', image: images.products[1], number: '02', groups: ['Jute File Folders'] },
  { name: 'Customized Jute Bags', detail: 'Jute bag designs for shopping, events, gifting, and business promotions.', image: images.products[2], number: '03', groups: ['Jute Promotional Bags', 'Jute Shopping Bags', 'Jute Executive Bags'] },
  { name: 'Coloured Fabric', detail: 'Jute fabric in a range of colours and finishes.', image: images.products[0], number: '04', groups: ['Jute Fabric'] },
  { name: 'Fancy Bags', detail: 'Decorative jute bags for gifting, events, and everyday use.', image: images.products[4], number: '05', groups: ['Hand Bags', 'Multi Color Fancy Bags'] },
  { name: 'JWB-01', detail: 'Decorative jute bag for wedding return gifts.', image: weddingGiftCollection, number: 'JWB-01', groups: ['Jute Wedding Bags'], imagePosition: '18% center', imageZoom: 1.28 },
  { name: 'JWB-02', detail: 'Printed jute tote for wedding gifting.', image: images.products[2], number: 'JWB-02', groups: ['Jute Wedding Bags'] },
  { name: 'JWB-03', detail: 'Colorful jute gift bags for wedding guests.', image: weddingGiftBags, number: 'JWB-03', groups: ['Jute Wedding Bags'] },
  { name: 'JWB-04', detail: 'Floral jute return gift bag.', image: images.products[4], number: 'JWB-04', groups: ['Jute Wedding Bags'] },
  { name: 'JWB-05', detail: 'Natural jute bag with a custom wedding print.', image: weddingJuteBags, number: 'JWB-05', groups: ['Jute Wedding Bags'] },
  { name: 'JWB-06', detail: 'Personalized jute bag for wedding favors.', image: weddingGiftSet, number: 'JWB-06', groups: ['Jute Wedding Bags'], imagePosition: '16% center', imageZoom: 1.45 },
  { name: 'JWB-07', detail: 'Personalized jute bag for wedding favors.', image: weddingGiftSet, number: 'JWB-07', groups: ['Jute Wedding Bags'], imagePosition: '50% center', imageZoom: 1.45 },
  { name: 'JWB-08', detail: 'Personalized jute bag for wedding favors.', image: weddingGiftSet, number: 'JWB-08', groups: ['Jute Wedding Bags'], imagePosition: '84% center', imageZoom: 1.45 },
  { name: 'JWB-09', detail: 'Printed jute gift bags for special occasions.', image: weddingPrintedBags, number: 'JWB-09', groups: ['Jute Wedding Bags'], imagePosition: '18% center', imageZoom: 1.35 },
  { name: 'JWB-10', detail: 'Printed jute gift bags for special occasions.', image: weddingPrintedBags, number: 'JWB-10', groups: ['Jute Wedding Bags'], imagePosition: '50% center', imageZoom: 1.35 },
  { name: 'JWB-11', detail: 'Printed jute gift bags for special occasions.', image: weddingPrintedBags, number: 'JWB-11', groups: ['Jute Wedding Bags'], imagePosition: '82% center', imageZoom: 1.35 },
  { name: 'JWB-12', detail: 'Reusable jute bag for wedding return gifts.', image: weddingGiftCollection, number: 'JWB-12', groups: ['Jute Wedding Bags'], imagePosition: '82% center', imageZoom: 1.28 },
]
const productCategories = ['Jute Fabric', 'Jute Wedding Bags', 'Jute Promotional Bags', 'Jute Shopping Bags', 'Hand Bags', 'Jute File Folders', 'Jute Executive Bags', 'Multi Color Fancy Bags']
const fabricQuote = '“Discover premium-grade jute fabric that combines durability, sustainability, and natural charm. Ideal for crafting, upholstery, home décor, and custom-made bags, our jute fabric offers a versatile solution for eco-conscious creators and businesses looking to add a rustic yet stylish touch.”'

export default function Services() {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [activeCategory, setActiveCategory] = useState('Jute Fabric')
  const visibleProducts = products.filter((product) => product.groups.includes(activeCategory))

  return (
    <div className="products-showcase" id="products">
      <div className="page-heading products-page-heading"><p className="eyebrow">Our Products</p><h1>Jute Bags &amp; <em>Fabric.</em></h1><p>Switch to biodegradable and reusable jute bags that help reduce plastic waste and contribute to a cleaner, greener planet. We offer a wide range of designs for shopping, events, gifting, and business promotions, crafted from natural jute fibres.</p></div>
      <section className="products-section" aria-labelledby="products-title">
        <div className="products-heading-row"><div><p className="eyebrow">Natural. Reusable. Made for everyday life.</p><h2 className="products-title" id="products-title">Our Products</h2></div><p className="products-intro">Explore our jute fabric and bag categories for shopping, gifting, events, and business use.</p></div>
        <div className="product-category-tabs" aria-label="Product categories">
          {productCategories.map((category) => <button type="button" key={category} className={activeCategory === category ? 'is-active' : ''} aria-pressed={activeCategory === category} onClick={() => setActiveCategory(category)}>{category}</button>)}
        </div>
        <div className="product-fabric-quote">{fabricQuote}</div>
        <div className="product-carousel" role="region" aria-label={`${activeCategory} products`}>
          {activeCategory === 'Jute Fabric' ? <div className="product-fabric-grid">{images.colors.map((fabric, index) => <button className="product-fabric-card" type="button" key={fabric.name} onClick={() => setSelectedProduct({ name: fabric.name, detail: 'Jute fabric in a range of colours and finishes.', image: fabric.image, number: String(index + 1).padStart(2, '0') })}><img src={fabric.image} alt={fabric.name} loading="lazy" style={fabric.filter ? { filter: fabric.filter } : undefined} /><span><i style={{ backgroundColor: fabric.color }} />{fabric.name}</span></button>)}</div> : <div className={`product-carousel-track${activeCategory === 'Jute Wedding Bags' ? ' wedding-bag-grid' : ''}`}>{visibleProducts.map((product, index) => <ServiceCard product={product} onSelect={setSelectedProduct} order={index} key={product.name} />)}</div>}
        </div>
        <Lightbox item={selectedProduct} onClose={() => setSelectedProduct(null)} />
      </section>
    </div>
  )
}
