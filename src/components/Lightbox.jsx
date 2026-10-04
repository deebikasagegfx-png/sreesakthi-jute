import { useEffect } from 'react'
import { ArrowUpRight, X } from 'lucide-react'

export default function Lightbox({ item, onClose }) {
  useEffect(() => {
    if (!item) return undefined
    const handleKeyDown = (event) => { if (event.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKeyDown)
    document.body.classList.add('lightbox-open')
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.classList.remove('lightbox-open')
    }
  }, [item, onClose])

  if (!item) return null
  return (
    <div className="lightbox" role="presentation" onClick={onClose}>
      <div className="lightbox-panel" role="dialog" aria-modal="true" aria-label={item.name} onClick={(event) => event.stopPropagation()}>
        <button className="lightbox-close" type="button" aria-label="Close image" onClick={onClose}><X size={20} /></button>
        <img src={item.image} alt={item.name} />
        <div className="lightbox-caption"><div><span>{item.number}</span><h2>{item.name}</h2><p>{item.detail}</p></div><a href="/contact">Ask about this <ArrowUpRight size={15} /></a></div>
      </div>
    </div>
  )
}
