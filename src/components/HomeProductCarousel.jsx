import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import homeProducts from '../data/homeProducts'
import './HomeProductCarousel.css'

const getVisibleCount = () => {
  if (typeof window === 'undefined') return 3
  if (window.innerWidth <= 620) return 1
  if (window.innerWidth <= 940) return 2
  return 3
}

export default function HomeProductCarousel() {
  const [visibleCount, setVisibleCount] = useState(getVisibleCount)
  const [position, setPosition] = useState(1)
  const [transitionEnabled, setTransitionEnabled] = useState(true)
  const [paused, setPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const pointerStart = useRef(null)
  const pageCount = Math.ceil(homeProducts.length / visibleCount)

  const pages = useMemo(() => {
    return Array.from({ length: pageCount }, (_, pageIndex) =>
      Array.from({ length: visibleCount }, (_, itemIndex) =>
        homeProducts[(pageIndex * visibleCount + itemIndex) % homeProducts.length],
      ),
    )
  }, [pageCount, visibleCount])
  const loopedPages = [pages[pages.length - 1], ...pages, pages[0]]

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
    setTransitionEnabled(false)
    setPosition(1)
    const frame = requestAnimationFrame(() => requestAnimationFrame(() => setTransitionEnabled(true)))
    return () => cancelAnimationFrame(frame)
  }, [visibleCount])

  useEffect(() => {
    if (paused || reducedMotion || pageCount < 2) return undefined
    const timer = window.setInterval(() => {
      setPosition((current) => current + 1)
    }, 3500)
    return () => window.clearInterval(timer)
  }, [pageCount, paused, reducedMotion])

  const goToPage = (pageIndex) => setPosition(pageIndex + 1)
  const handleTransitionEnd = (event) => {
    if (event.target !== event.currentTarget) return

    if (position === 0 || position === pageCount + 1) {
      const realPosition = position === 0 ? pageCount : 1
      setTransitionEnabled(false)
      setPosition(realPosition)
      requestAnimationFrame(() => requestAnimationFrame(() => setTransitionEnabled(true)))
    }
  }
  const handlePointerDown = (event) => {
    pointerStart.current = { x: event.clientX, y: event.clientY }
  }
  const handlePointerUp = (event) => {
    if (!pointerStart.current) return
    const deltaX = event.clientX - pointerStart.current.x
    const deltaY = event.clientY - pointerStart.current.y
    pointerStart.current = null
    if (Math.abs(deltaX) < 45 || Math.abs(deltaX) < Math.abs(deltaY) * 1.2) return
    setPosition((current) => current + (deltaX < 0 ? 1 : -1))
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
          <button
            className="home-product-carousel__arrow home-product-carousel__arrow--previous"
            type="button"
            aria-label="Previous product"
            onClick={() => setPosition((current) => current - 1)}
          >
            <ArrowLeft size={19} strokeWidth={3} aria-hidden="true" />
          </button>

          <div
            className="home-product-carousel__viewport"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={() => { pointerStart.current = null }}
          >
            <div
              className="home-product-carousel__track"
              style={{
                '--home-carousel-visible-count': visibleCount,
                transform: `translateX(-${position * 100}%)`,
                transition: transitionEnabled && !reducedMotion ? undefined : 'none',
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {loopedPages.map((page, pageIndex) => {
                return (
                  <div
                    className="home-product-carousel__page"
                    key={`page-${pageIndex}`}
                    aria-hidden={pageIndex !== position}
                    style={{ '--home-carousel-visible-count': page.length }}
                  >
                    {page.map((product) => (
                      <article className="home-product-carousel__card" key={product.id}>
                        <img
                          className="home-product-carousel__image"
                          src={product.image}
                          alt={product.name}
                          loading="lazy"
                          draggable="false"
                        />
                        <h3 className="home-product-carousel__name">{product.name}</h3>
                      </article>
                    ))}
                  </div>
                )
              })}
            </div>
          </div>

          <button
            className="home-product-carousel__arrow home-product-carousel__arrow--next"
            type="button"
            aria-label="Next product"
            onClick={() => setPosition((current) => current + 1)}
          >
            <ArrowRight size={19} strokeWidth={3} aria-hidden="true" />
          </button>
        </div>

        <div className="home-product-carousel__dots" role="group" aria-label="Product groups">
          {pages.map((page, index) => (
            <button
              className={`home-product-carousel__dot${position - 1 === index ? ' is-active' : ''}`}
              key={page[0].id}
              type="button"
              aria-label={`Go to product group ${index + 1}: ${page.map((product) => product.name).join(', ')}`}
              aria-current={position - 1 === index ? 'true' : undefined}
              onClick={() => goToPage(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
