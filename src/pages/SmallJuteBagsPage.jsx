import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Services from '../components/Services'
import smallJuteBagsImage from '../assets/images/small-jute-bags-source.jpg'

export default function SmallJuteBagsPage() {
  return (
    <main className="product-detail-page">
      <section className="product-detail-hero">
        <div className="product-detail-copy">
          <p className="eyebrow">Sree Sakthi Jute Bags · Wholesale collection</p>
          <h1>Small Jute Bags Wholesale</h1>
          <h2>Compact, Trendy &amp; Eco-Friendly Small Jute Bags at Bulk Rates</h2>
          <p>Buy premium small jute bags in wholesale for gifting, retail stores, events, wedding favors, boutiques, product packaging, and promotional branding. Our small jute bags are lightweight yet strong, designed for everyday use and long-term durability. Available in various shapes, sizes, colours, and print designs, these bags can also be customized with your brand logo or event details. Whether you need mini jute bags for return gifts or small shopping bags for retail counters, we offer attractive bulk discounts that suit all business budgets. Choose a sustainable, stylish alternative to plastic packaging with our eco-friendly small jute bags.</p>
          <Link className="button button-dark" to="/contact?product=Small%20Jute%20Bags">Enquire about small jute bags <ArrowUpRight size={16} /></Link>
        </div>
        <img src={smallJuteBagsImage} alt="A collection of small jute bags in different shapes and patterns" />
      </section>
      <Services />
    </main>
  )
}
