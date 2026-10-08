export default function ServiceCard({ product, order = 0 }) {
  const ImageWrapper = product.link ? 'a' : 'div'
  const imageLinkProps = product.link ? { href: product.link, target: '_blank', rel: 'noopener noreferrer' } : {}

  return (
    <article className="product-card" style={{ '--product-order': order }}>
      <ImageWrapper className="product-image" {...imageLinkProps} aria-label={product.link ? `View ${product.name}` : undefined}>
        <img src={product.image} alt={product.name} loading="eager" decoding="async" style={{ objectPosition: product.imagePosition, scale: product.imageZoom }} />
      </ImageWrapper>
      <div className="product-meta"><div><h3>{product.name}</h3><p>{product.detail}</p></div></div>
    </article>
  )
}
