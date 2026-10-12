import aboutPageImage from '../assets/images/about/company-about.webp'

export default function About() {
  return (
    <section className="about-showcase" id="about">
      <div className="about-showcase-visual">
        <img src={aboutPageImage} alt="A natural jute tote bag displayed in a warm studio setting" />
        <div className="about-years"><strong>24+</strong><span>Years</span></div>
      </div>

      <div className="about-showcase-copy">
        <div className="about-eyebrow">About Us</div>
        <h2>Turning Natural Fibers<br />Into Everyday Essentials</h2>
        <p className="about-description">
          Established in 2000, <strong>Sree Sakthi Jute Bags</strong> has earned a trusted reputation in the jute and <span>eco-friendly product</span> industry. With a dedicated team of 36 skilled professionals—30 men and 6 women—we proudly manufacture over 3,000 jute bags daily. Our commitment to quality and sustainability allows us to serve customers across Chennai and the southern states of Kerala, Karnataka, Andhra Pradesh, and Pondicherry.
        </p>
        <a className="about-button" href="/about-us">About Us</a>
      </div>
    </section>
  )
}
