import Reveal from "./Reveal";

export default function AnniversaryBanner() {
  return (
    <section className="banner">
      <Reveal className="container">
        <div className="stars" aria-hidden="true">★ ★ ★</div>
        <p className="eyebrow center">
          Celebrating 50 Years in the Electrical Trade
        </p>
        <div className="years">1976 – 2026</div>
        <h2>Half a Century of Powering South Florida</h2>
        <p>
          Five decades of continuous electrical experience — residential,
          commercial, and industrial. A Florida Statewide Licensed Unlimited
          Electrical Contractor you can trust, from planning to power-on.
        </p>
      </Reveal>
    </section>
  );
}
