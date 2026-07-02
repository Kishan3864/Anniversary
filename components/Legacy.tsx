import Bolt from "./Bolt";
import Reveal from "./Reveal";

export default function Legacy() {
  return (
    <section className="section legacy" id="legacy">
      <div className="container legacy-grid">
        <Reveal className="legacy-figure">
          <span className="legacy-figure-grid" aria-hidden="true" />
          <span className="legacy-figure-glow" aria-hidden="true" />
          <span className="legacy-figure-mark" aria-hidden="true">50</span>

          <div className="legacy-card">
            <span className="legacy-anniv-pill">
              <i aria-hidden="true">★</i> 1976 – 2026 · 50 Years <i aria-hidden="true">★</i>
            </span>

            <h3 className="legacy-heading">
              <span className="gold-text">Half a Century</span> of Electrical Excellence
            </h3>

            <span className="legacy-eyebrow">What We Power</span>

            <ul className="legacy-power">
              <li>
                <span className="legacy-power-ic"><Bolt width={12} height={19} /></span>
                New Construction &amp; Additions
              </li>
              <li>
                <span className="legacy-power-ic"><Bolt width={12} height={19} /></span>
                Panel Upgrades &amp; Safety
              </li>
              <li>
                <span className="legacy-power-ic"><Bolt width={12} height={19} /></span>
                Generator Installation
              </li>
              <li>
                <span className="legacy-power-ic"><Bolt width={12} height={19} /></span>
                EV Charger Installation
              </li>
              <li>
                <span className="legacy-power-ic"><Bolt width={12} height={19} /></span>
                Industrial &amp; Commercial Power
              </li>
              <li>
                <span className="legacy-power-ic"><Bolt width={12} height={19} /></span>
                24/7 Service &amp; Repairs
              </li>
            </ul>

            <div className="legacy-figure-foot">
              <span className="legacy-lic">Licensed Master Electrical Contractor · EC13001410</span>
              <div className="legacy-ribbon">
                <b>Since 1976</b>
                <span>The Trusted Electrician</span>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <span className="eyebrow">Our Story</span>
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
