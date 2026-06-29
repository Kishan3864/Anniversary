import Reveal from "./Reveal";

type Reason = { title: string; desc: string };

const REASONS: Reason[] = [
  {
    title: "Licensed, Insured & Bonded",
    desc: "A Florida Statewide Licensed Unlimited Electrical Contractor (EC13001410) — fully insured and bonded for your protection.",
  },
  {
    title: "Over 50 Years of Experience",
    desc: "Five decades of hands-on electrical work across South Florida, every project since 1976.",
  },
  {
    title: "Rapid Response & On-Time Service",
    desc: "We show up when we say we will, and respond fast when it matters most.",
  },
  {
    title: "Full-Service — Planning to Power-On",
    desc: "One trusted team for the whole job: blueprints, permits, installation, and final inspection.",
  },
  {
    title: "Residential · Commercial · Industrial",
    desc: "Serving homeowners, businesses, and industrial facilities with the same standard of care.",
  },
  {
    title: "24/7 Emergency Service",
    desc: "Electrical emergencies don't wait — and neither do we. Available around the clock.",
  },
];

function Check() {
  return (
    <span className="why-check" aria-hidden="true">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
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
          <span className="eyebrow center on-dark">Why Choose Us</span>
          <h2 style={{ color: "#fff" }}>The Trusted Electrician for South Florida</h2>
          <p style={{ color: "rgba(228,233,255,0.82)" }}>
            Decades of trust aren&apos;t given — they&apos;re earned, one
            successful project at a time.
          </p>
        </div>

        <div className="why-grid">
          {REASONS.map((r, i) => (
            <Reveal key={r.title} className="why-item" delay={(i % 3) * 60}>
              <Check />
              <span>
                <b>{r.title}</b>
                {r.desc}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
