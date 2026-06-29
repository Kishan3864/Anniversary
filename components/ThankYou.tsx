import Reveal from "./Reveal";

export default function ThankYou() {
  return (
    <section className="cta-band" id="contact">
      <Reveal className="container">
        <span className="eyebrow center on-dark">Request Service</span>
        <h2 className="green-text">Ready to Power Your Next Project?</h2>
        <p>
          Whether it&apos;s a new construction wire-up, a panel upgrade, a
          generator, an EV charger, or a 24/7 emergency — Wally Nassif Electrical
          Contracting Service is ready to help. Get an honest estimate from the
          team South Florida has trusted since 1976.
        </p>

        <a className="cta-phone" href="tel:+15615822600">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
          </svg>
          (561) 582-2600
        </a>

        <div className="cta-row">
          <a className="btn btn-green" href="tel:+15615822600">
            Request a Free Quote
          </a>
          <a className="btn btn-outline" href="mailto:info@nassifelectric.com">
            ✉ info@nassifelectric.com
          </a>
        </div>

        <p className="closing">
          Celebrating 50 Years of Powering South Florida · Since 1976
        </p>
      </Reveal>
    </section>
  );
}
