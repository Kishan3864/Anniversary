import Reveal from "./Reveal";

export default function ThankYou() {
  return (
    <section className="thankyou" id="contact">
      <Reveal className="container">
        <span className="eyebrow center" style={{ color: "var(--gold-300)" }}>
          With Gratitude
        </span>
        <h2 className="gold-text">Thank You</h2>
        <p>
          To every homeowner, builder, architect, engineer, property manager,
          contractor, business owner, municipality, and loyal customer who has
          trusted us over the past 50 years —
        </p>
        <p>
          Thank you for allowing us to serve you. We look forward to continuing
          that tradition for generations to come.
        </p>
        <p className="closing">
          Celebrating 50 Years of Excellence · Since 1976
        </p>

        <div className="cta-row">
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
      </Reveal>
    </section>
  );
}
