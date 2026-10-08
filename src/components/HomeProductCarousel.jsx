import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import homeProducts from '../data/homeProducts'
import './HomeProductCarousel.css'

const getVisibleCount = () => {
  if (typeof window === 'undefined') return 3
  if (window.innerWidth <= 620) return 1
  if (window.innerWidth <= 940) return 2
  return 3
}

const wrapIndex = (index, length) => (index + length) % length

export default function HomeProductCarousel() {
  const [visibleCount, setVisibleCount] = useState(getVisibleCount)
  const [activeStart, setActiveStart] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const pointerStart = useRef(null)

  useEffect(() => {
    const updateVisibleCount = () => setVisibleCount(getVisibleCount())
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotionPreference = () => setReducedMotion(motionPreference.matches)

    updateVisibleCount()
    updateMotionPreference()
    window.addEventListener('resize', updateVisibleCount)
    motionPreference.addEventListener?.('change', updateMotionPreference)
    return () => {
      window.removeEventListener('resize', updateVisibleCount)
      motionPreference.removeEventListener?.('change', updateMotionPreference)
    }
  }, [])

  useEffect(() => {
    if (paused || reducedMotion || homeProducts.length < 2) return undefined
    const timer = window.setInterval(() => {
      setActiveStart((index) => wrapIndex(index + 1, homeProducts.length))
    }, 5000)
    return () => window.clearInterval(timer)
  }, [paused, reducedMotion])

  const move = (direction) => {
    setActiveStart((index) => wrapIndex(index + direction, homeProducts.length))
  }
  const visibleProducts = Array.from({ length: visibleCount }, (_, offset) => (
    homeProducts[wrapIndex(activeStart + offset, homeProducts.length)]
  ))

  const handlePointerDown = (event) => {
    pointerStart.current = { x: event.clientX, y: event.clientY }
  }
  const handlePointerUp = (event) => {
    if (!pointerStart.current) return
    const deltaX = event.clientX - pointerStart.current.x
    const deltaY = event.clientY - pointerStart.current.y
    pointerStart.current = null
    if (Math.abs(deltaX) < 45 || Math.abs(deltaX) < Math.abs(deltaY) * 1.2) return
    move(deltaX < 0 ? 1 : -1)
  }

  return (
    <section
      className="home-product-carousel"
      aria-labelledby="home-product-carousel-title"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false)
      }}
    >
      <header className="home-product-carousel__heading">
        <h2 id="home-product-carousel-title">OUR PRODUCTS</h2>
      </header>

      <div className="home-product-carousel__body">
        <div className="home-product-carousel__stage">
          <button className="home-product-carousel__arrow home-product-carousel__arrow--previous" type="button" aria-label="Previous product" onClick={() => move(-1)}>
            <ArrowLeft size={19} strokeWidth={3} aria-hidden="true" />
          </button>

          <div className="home-product-carousel__viewport" onPointerDown={handlePointerDown} onPointerUp={handlePointerUp} onPointerCancel={() => { pointerStart.current = null }}>
            <div className="home-product-carousel__page" style={{ '--home-carousel-visible-count': visibleCount }} aria-live="polite" aria-atomic="true">
              {visibleProducts.map((product, itemIndex) => (
                <article className="home-product-carousel__card" key={`${activeStart}-${product.id}`}>
                  <img className="home-product-carousel__image" style={{ '--product-order': itemIndex }} src={product.image} alt={product.name} loading="lazy" draggable="false" />
                  <h3 className="home-product-carousel__name">{product.name}</h3>
                </article>
              ))}
            </div>
          </div>

          <button className="home-product-carousel__arrow home-product-carousel__arrow--next" type="button" aria-label="Next product" onClick={() => move(1)}>
            <ArrowRight size={19} strokeWidth={3} aria-hidden="true" />
          </button>
        </div>

        <div className="home-product-carousel__dots" role="group" aria-label="Product groups">
          {homeProducts.map((product, index) => (
            <button className={`home-product-carousel__dot${activeStart === index ? ' is-active' : ''}`} key={product.id} type="button" aria-label={`Show ${product.name}`} aria-current={activeStart === index ? 'true' : undefined} onClick={() => setActiveStart(index)} />
          ))}
        </div>
      </div>
    </section>
  )
}
