import Reveal from "./Reveal";

const REASONS = [
  "50 Years of Experience",
  "Thousands of Completed Projects",
  "Residential Specialists",
  "Commercial Experts",
  "Industrial Power Systems",
  "Licensed & Insured",
  "Code Compliance Specialists",
  "Electrical Safety Experts",
  "Honest, Upfront Estimates",
  "Quality Workmanship Guaranteed",
];

function Check() {
  return (
    <span className="why-check" aria-hidden="true">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
        <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export default function WhyChoose() {
  return (
    <section className="section why" id="why">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow center" style={{ color: "var(--gold-300)" }}>
            The Difference
          </span>
          <h2 style={{ color: "#fff" }}>Why Clients Keep Choosing Us</h2>
          <p style={{ color: "rgba(233,240,252,0.8)" }}>
            Decades of trust aren&apos;t given — they&apos;re earned, one
            successful project at a time.
          </p>
        </div>

        <div className="why-grid">
          {REASONS.map((r, i) => (
            <Reveal key={r} className="why-item" delay={i * 50}>
              <Check />
              <span>{r}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
