import Reveal from "./Reveal";

type Service = {
  title: string;
  desc: string;
  icon: React.ReactNode;
};

const I = {
  stroke: "currentColor",
  fill: "none",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const SERVICES: Service[] = [
  {
    title: "Generator Systems",
    desc: "Standby and whole-home generator sales, installation, and service — power that never leaves you in the dark.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" {...I}>
        <rect x="3" y="8" width="18" height="11" rx="2" />
        <path d="M7 8V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2M8 19v2M16 19v2" />
        <path d="M12 11l-1.5 2.5h2L11 16" />
      </svg>
    ),
  },
  {
    title: "EV Charging Infrastructure",
    desc: "Level 2 home chargers to commercial charging stations — future-ready electrical for the road ahead.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" {...I}>
        <rect x="4" y="3" width="10" height="18" rx="2" />
        <path d="M17 8l3 3v6a2 2 0 0 1-2 2M20 11h-3" />
        <path d="M9 7l-2 3h2.5L7.5 14" />
      </svg>
    ),
  },
  {
    title: "Electrical Service Upgrades",
    desc: "Panel replacements, capacity upgrades, and code corrections to keep your property safe and ready for modern loads.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" {...I}>
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path d="M9 7h6M9 11h6M9 15h3" />
      </svg>
    ),
  },
  {
    title: "New Construction",
    desc: "Complete electrical design and rough-in for new homes, additions, and commercial builds — done to spec, on schedule.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" {...I}>
        <path d="M3 21h18M5 21V8l7-5 7 5v13" />
        <path d="M10 21v-6h4v6" />
      </svg>
    ),
  },
  {
    title: "Remodeling",
    desc: "Lighting, outlets, smart-home wiring, and full rewires that bring older properties up to today's standards.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" {...I}>
        <path d="M14 4l6 6M3 21l3-1 11-11-2-2L4 18l-1 3z" />
      </svg>
    ),
  },
  {
    title: "Maintenance Contracts",
    desc: "Scheduled inspections and preventative care that catch problems early and protect your investment year-round.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" {...I}>
        <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17v3h3l5.3-5.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2-2 2.5-2.5z" />
      </svg>
    ),
  },
  {
    title: "Emergency Repairs",
    desc: "Fast, dependable response when the power fails — troubleshooting and repairs that get you running again.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" {...I}>
        <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section className="section services" id="services">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow center">What We Do</span>
          <h2>Complete Electrical Solutions, End to End</h2>
          <p>
            Residential, commercial, and industrial — backed by 50 years of
            hands-on experience and a master electrician&apos;s standard of care.
          </p>
        </div>

        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} className="service-card" delay={i * 70}>
              <div className="service-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
