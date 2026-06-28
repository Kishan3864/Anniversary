import Emblem from "./Emblem";

export default function Hero() {
  return (
    <section className="hero" id="top">
      {/* Layered electrical-themed background. Drop a real photo at
          /public/hero.jpg and uncomment the style below to use it. */}
      <div
        className="hero-bg"
        // style={{ backgroundImage: "url(/hero.jpg)" }}
        aria-hidden="true"
      />
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-vignette" aria-hidden="true" />

      <div className="container hero-inner">
        <div>
          <span className="since">Building Electrical Excellence Since 1976</span>
          <h1>
            Celebrating <span className="gold-text">50 Years</span>
            <span className="line2">of Electrical Excellence</span>
          </h1>
          <p className="hero-tagline">
            Building Trust. Powering Communities. Creating Lasting Relationships.
          </p>
          <p className="hero-lede">
            For five decades, Wally Nassif has proudly served homeowners, businesses,
            industrial facilities, and institutions with expert electrical solutions.
            Since entering the trade in 1976, our commitment to quality workmanship,
            safety, integrity, and customer satisfaction has earned the trust of
            thousands of loyal clients.
          </p>
          <p className="hero-strong gold-text">
            50 Years Strong. Still Building the Future.
          </p>

          <div className="hero-cta">
            <a className="btn btn-gold" href="#contact">
              ► Request a Free Estimate
            </a>
            <a className="btn btn-electric" href="#contact">
              ⚡ Emergency Service
            </a>
            <a className="btn btn-outline" href="#services">
              Commercial &amp; Industrial
            </a>
          </div>

          <div className="hero-trust">
            <div>
              <b>50+</b>
              <span>Years of Experience</span>
            </div>
            <div>
              <b>Master</b>
              <span>Licensed Contractor</span>
            </div>
            <div>
              <b>1000s</b>
              <span>Projects Completed</span>
            </div>
          </div>
        </div>

        <div className="hero-emblem-wrap">
          <div className="hero-emblem-glow" aria-hidden="true" />
          <Emblem size={340} id="hero" />
        </div>
      </div>

      <div className="scroll-cue" aria-hidden="true">
        <span className="mouse" />
        Scroll
      </div>
    </section>
  );
}
