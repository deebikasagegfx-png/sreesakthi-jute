import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { images } from '../assets/images'
import Lightbox from './Lightbox'

const projects = images.gallery.map((item, index) => ({
  ...item,
  number: String(index + 6).padStart(2, '0'),
  detail: 'Jute bag collection by Sree Sakthi Jute Bags, Chennai.',
}))

export default function ProjectGallery() {
  const [selectedImage, setSelectedImage] = useState(null)

  return (
    <section className="catalog-gallery" aria-labelledby="catalog-title">
      <div className="section-kicker"><span>More from our catalogue</span><span>Ideas, colors & custom work</span></div>
      <div className="catalog-heading"><h2 id="catalog-title">Made to be <em>carried.</em></h2><p>Browse more jute bag styles and find a starting point for your own order.</p></div>
      <div className="catalog-grid">{projects.map((project) => <button className="catalog-card" type="button" key={project.image} onClick={() => setSelectedImage(project)}><img src={project.image} alt={project.alt} loading="lazy" /><span>{project.name}<ArrowUpRight size={14} /></span></button>)}</div>
      <Lightbox item={selectedImage} onClose={() => setSelectedImage(null)} />
    </section>
  )
}