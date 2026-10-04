import { ArrowUpRight } from 'lucide-react'

export default function ServiceCard({ product, onSelect, order = 0 }) {
  return (
    <button className="product-card" type="button" onClick={() => onSelect(product)} aria-label={`View ${product.name}`} style={{ '--product-order': order }}>
      <div className="product-image"><img src={product.image} alt="" loading="eager" decoding="async" style={{ objectPosition: product.imagePosition, scale: product.imageZoom }} /><span className="product-number">{product.number}</span><span className="product-arrow"><ArrowUpRight size={17} /></span></div>
      <div className="product-meta"><div><h3>{product.name}</h3><p>{product.detail}</p></div><ArrowUpRight size={16} /></div>
    </button>
  )
}
