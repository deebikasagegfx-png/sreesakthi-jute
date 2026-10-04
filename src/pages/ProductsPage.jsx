import HomeProducts from '../components/HomeProducts'
import { Link } from 'react-router-dom'
import './ProductsPage.css'

export default function ProductsPage() {
  return (
    <main className="inner-page products-index-page">
      <section className="page-heading products-page-heading products-index-page__hero" aria-labelledby="products-page-title">
        <h1 id="products-page-title">Products</h1>
        <nav className="products-index-page__breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">&gt;</span>
          <span aria-current="page">Products</span>
        </nav>
      </section>
      <HomeProducts />
    </main>
  )
}
