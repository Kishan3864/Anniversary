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
          <span className="since">Serving South Florida Since 1976</span>
          <h1>
            Celebrating <span className="green-text">50 Years</span>
            <span className="line2">of Powering South Florida</span>
          </h1>
          <p className="hero-tagline">
            Reliable • Licensed • Experienced — The Trusted Electrician.
          </p>
          <p className="hero-lede">
            For five decades, Wally Nassif Electrical Contracting Service has
            delivered safe, reliable electrical solutions to homes, businesses,
            and industrial facilities across South Florida. From new construction
            and panel upgrades to generators and EV charging, our commitment to
            quality workmanship since 1976 has earned the trust of the communities
            we serve.
          </p>

          <div className="hero-cta">
            <a className="btn btn-green" href="#contact">
              Request Service
            </a>
            <a className="btn btn-blue" href="tel:+15615822600">
              ⚡ Emergency Call 24/7
            </a>
            <a className="btn btn-outline" href="#services">
              Our Services
            </a>
          </div>

          <div className="hero-trust">
            <div>
              <b>50+</b>
              <span>Years of Experience</span>
            </div>
            <div>
              <b>EC13001410</b>
              <span>FL Licensed &amp; Insured</span>
            </div>
            <div>
              <b>24/7</b>
              <span>Emergency Service</span>
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
