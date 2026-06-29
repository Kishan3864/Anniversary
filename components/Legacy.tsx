import Reveal from "./Reveal";

export default function Legacy() {
  return (
    <section className="section legacy" id="legacy">
      <div className="container legacy-grid">
        <Reveal className="legacy-figure">
          <div className="logo-chip">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/wally-nassif-logo.png" alt="Wally Nassif Electrical Contracting Service logo" width={866} height={274} />
          </div>
          <div className="badge-float">
            <b>Since 1976</b>
            <span>The Trusted Electrician</span>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <span className="eyebrow on-dark">Our Story</span>
          <h2>Built on Trust, One Project at a Time</h2>
          <p>
            Since 1976, Wally Nassif Electrical Contracting Service has powered
            South Florida with reliability and expertise. What began with a
            commitment to honest, quality workmanship has grown into a
            full-service electrical contractor trusted by homeowners, builders,
            architects, and businesses throughout the region.
          </p>
          <p>
            From reviewing blueprints on new construction to installing
            generators, EV chargers, and complex industrial power systems, every
            job is completed to the same standard — safe, code-compliant, and
            done right the first time.
          </p>
          <p>
            As a Florida Statewide Licensed Unlimited Electrical Contractor
            (EC13001410), we pair five decades of hands-on experience with the
            latest technology to keep your home or business powered and protected.
          </p>
          <div className="signature">
            Wally Nassif
            <span>Founder · Licensed Master Electrical Contractor</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
