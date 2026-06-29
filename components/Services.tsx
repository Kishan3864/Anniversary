import Reveal from "./Reveal";

type Service = {
  title: string;
  desc: string;
  points: string[];
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
    title: "New Construction & Additions",
    desc: "We work directly with homeowners, builders, and architects to review blueprints and design enhanced electrical layouts for maximum safety, efficiency, and convenience.",
    points: [
      "Custom lighting layouts for aesthetics and functionality",
      "Optimized outlet and circuit placement",
      "Load calculations for future expansion",
    ],
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" {...I}>
        <path d="M3 21h18M5 21V8l7-5 7 5v13" />
        <path d="M10 21v-6h4v6" />
      </svg>
    ),
  },
  {
    title: "EV Car Charger Installation",
    desc: "We install residential and commercial electric vehicle charging stations, handling everything from permits to final inspection.",
    points: [
      "Level 2 and Level 3 DC fast chargers",
      "Full permitting and inspection compliance",
      "Dedicated power feeds for safety and performance",
    ],
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" {...I}>
        <rect x="4" y="3" width="10" height="18" rx="2" />
        <path d="M17 8l3 3v6a2 2 0 0 1-2 2M20 11h-3" />
        <path d="M9 7l-2 3h2.5L7.5 14" />
      </svg>
    ),
  },
  {
    title: "Generator Sales, Installation & Load Management",
    desc: "Stay powered during outages with our turnkey standby generator solutions — sized, installed, and maintained for total peace of mind.",
    points: [
      "Standby generator sizing & critical load calculations",
      "Installation with transfer switches & code compliance",
      "Scheduled maintenance plans to ensure readiness",
    ],
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" {...I}>
        <rect x="3" y="8" width="18" height="11" rx="2" />
        <path d="M7 8V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2M8 19v2M16 19v2" />
        <path d="M12 11l-1.5 2.5h2L11 16" />
      </svg>
    ),
  },
  {
    title: "Panel Upgrades & Safety Compliance",
    desc: "Modernize your electrical service for today's demands with NEC-compliant upgrades that improve safety and capacity.",
    points: [
      "Upgrade outdated panels to new NEC-compliant models",
      "AFCI / GFCI protection for enhanced safety",
      "Increased capacity for future electrical needs",
    ],
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" {...I}>
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path d="M9 7h6M9 11h6M9 15h3" />
      </svg>
    ),
  },
  {
    title: "Smart Home Automation",
    desc: "Bring your home into the future with integrated control systems for lighting, shades, climate, and more — from your phone or your voice.",
    points: [
      "Lighting control for every room or zone",
      "Motorized shade and curtain automation",
      "Smartphone and voice-command operation",
    ],
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" {...I}>
        <path d="M3 11l9-7 9 7M5 10v10h14V10" />
        <path d="M10 20v-5h4v5" />
      </svg>
    ),
  },
  {
    title: "Accent & Specialty Lighting",
    desc: "Enhance your space with under-cabinet, accent, and indirect LED lighting — efficient, low-voltage, and beautifully integrated.",
    points: [
      "12V & 24V low-voltage solutions for safety & efficiency",
      "Dimmable and color-change options",
      "Integrated into smart home systems for full control",
    ],
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" {...I}>
        <path d="M9 18h6M10 21h4" />
        <path d="M12 3a6 6 0 0 1 4 10.5c-.7.7-1 1.3-1 2.5H9c0-1.2-.3-1.8-1-2.5A6 6 0 0 1 12 3z" />
      </svg>
    ),
  },
  {
    title: "Industrial & Commercial Power",
    desc: "Expert service for high-demand facilities — power distribution, transformers, and preventive maintenance that avoid costly downtime.",
    points: [
      "13,200V and 480/277V power distribution",
      "Transformer installation and service",
      "Power system upgrades for heavy machinery",
    ],
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" {...I}>
        <path d="M4 21V9l5-2v14M9 21V5l6-2v18M15 21V11l5-2v12M3 21h18" />
      </svg>
    ),
  },
  {
    title: "Electrical Service & Repairs",
    desc: "From troubleshooting to full system restoration, our team responds fast to keep you safe and powered — 24/7 emergency service available.",
    points: [
      "Emergency response for urgent issues",
      "Outlet, switch, and fixture replacement",
      "Circuit tracing, repair & certification",
    ],
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" {...I}>
        <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
      </svg>
    ),
  },
];

function Check() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Services() {
  return (
    <section className="section services" id="services">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow center">Our Electrical Services</span>
          <h2>Full-Service Solutions, From Planning to Power-On</h2>
          <p>
            A complete range of residential, commercial, and industrial electrical
            solutions — delivered with 50 years of hands-on experience.
          </p>
        </div>

        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} className="service-card" delay={(i % 4) * 70}>
              <div className="service-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <ul className="service-points">
                {s.points.map((p) => (
                  <li key={p}>
                    <Check />
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
