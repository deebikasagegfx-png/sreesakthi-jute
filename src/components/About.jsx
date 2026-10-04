import aboutPageImage from '../assets/images/About-page.jpg'

export default function About() {
  return (
    <section className="about-showcase" id="about">
      <div className="about-showcase-visual">
        <img src={aboutPageImage} alt="A finished natural jute bag" />
        <div className="about-years"><strong>24+</strong><span>Years</span></div>
      </div>

      <div className="about-showcase-copy">
        <p className="about-eyebrow">About Us</p>
        <h2>Turning Natural Fibers<br />Into Everyday Essentials</h2>
        <p className="about-description">
          Established in 2000, <strong>Sree Sakthi Jute Bags</strong> has earned a trusted reputation in the jute and <span>eco-friendly product</span> industry. With a dedicated team of 36 skilled professionals—30 men and 6 women—we proudly manufacture over 3,000 jute bags daily. Our commitment to quality and sustainability allows us to serve customers across Chennai and the southern states of Kerala, Karnataka, Andhra Pradesh, and Pondicherry.
        </p>
        <a className="about-button" href="/about">About Us</a>
      </div>
    </section>
  )
}
