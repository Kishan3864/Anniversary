import Reveal from "./Reveal";

export default function AnniversaryBanner() {
  return (
    <section className="banner">
      <Reveal className="container">
        <div className="stars" aria-hidden="true">★ ★ ★</div>
        <p className="eyebrow center" style={{ justifyContent: "center", color: "var(--gold-300)" }}>
          Celebrating 50 Years in the Electrical Trade
        </p>
        <div className="years gold-text">1976 – 2026</div>
        <h2>Half a Century of Experience</h2>
        <p>
          Five decades of continuous electrical experience — from a single
          apprentice&apos;s toolbox to a trusted name in residential, commercial,
          and industrial power. The standard has never changed: do it right, do it safe.
        </p>
      </Reveal>
    </section>
  );
}
