type EmblemProps = {
  size?: number;
  id?: string;
  className?: string;
  spin?: boolean;
};

/**
 * Anniversary seal in brand green, with the "50 YEARS" mark and the
 * "1976 — 2026" year in metallic gold:
 * "50 YEARS" centered, with curved text
 * "WALLY NASSIF ELECTRICAL" (top) and "1976 — 2026" (bottom).
 */
export default function Emblem({
  size = 220,
  id = "seal",
  className = "",
  spin = true,
}: EmblemProps) {
  const green = `green-${id}`;
  const greenSoft = `greenSoft-${id}`;
  const gold = `gold-${id}`;
  const disc = `disc-${id}`;
  const topArc = `topArc-${id}`;
  const bottomArc = `bottomArc-${id}`;

  return (
    <svg
      className={`emblem ${className}`}
      width={size}
      height={size}
      viewBox="0 0 200 200"
      role="img"
      aria-label="Celebrating 50 Years — Wally Nassif Electrical, 1976 to 2026"
    >
      <defs>
        <linearGradient id={green} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#86f06a" />
          <stop offset="50%" stopColor="#4ae224" />
          <stop offset="100%" stopColor="#36c70f" />
        </linearGradient>
        <linearGradient id={greenSoft} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#86f06a" />
          <stop offset="100%" stopColor="#2aa30a" />
        </linearGradient>
        <linearGradient id={gold} x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0%" stopColor="#fdf0b8" />
          <stop offset="40%" stopColor="#f3d778" />
          <stop offset="68%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#a9781f" />
        </linearGradient>
        <path id={topArc} d="M 30 100 A 70 70 0 0 1 170 100" fill="none" />
        <path id={bottomArc} d="M 32 100 A 68 68 0 0 0 168 100" fill="none" />
        <radialGradient id={disc} cx="50%" cy="44%" r="62%">
          <stop offset="0%" stopColor="#12285f" />
          <stop offset="100%" stopColor="#0a1636" />
        </radialGradient>
      </defs>

      {/* Solid navy disc behind the seal (keeps the flag from showing through) */}
      <circle cx="100" cy="100" r="95" fill={`url(#${disc})`} />

      {/* Outer + inner rings */}
      <g className={spin ? "spin-ring" : ""}>
        <circle cx="100" cy="100" r="96" fill="none" stroke={`url(#${green})`} strokeWidth="1.6" />
        <circle cx="100" cy="100" r="78" fill="none" stroke={`url(#${green})`} strokeWidth="0.8" opacity="0.7" />
        {Array.from({ length: 60 }).map((_, i) => {
          const major = i % 5 === 0;
          const a = (i / 60) * Math.PI * 2;
          const cos = Math.cos(a);
          const sin = Math.sin(a);
          const r1 = 88;
          const r2 = major ? 82 : 85;
          // Round so server (Node) and client (browser) produce identical
          // strings — Math.sin/cos can differ in the last digit and break hydration.
          const round = (n: number) => Math.round(n * 1000) / 1000;
          return (
            <line
              key={i}
              x1={round(100 + r1 * cos)}
              y1={round(100 + r1 * sin)}
              x2={round(100 + r2 * cos)}
              y2={round(100 + r2 * sin)}
              stroke={`url(#${greenSoft})`}
              strokeWidth={major ? 1.2 : 0.5}
              opacity={major ? 0.9 : 0.5}
            />
          );
        })}
      </g>

      {/* Curved text */}
      <text fill="#ffffff" fontFamily="var(--font-inter), sans-serif" fontWeight="700">
        <textPath href={`#${topArc}`} startOffset="50%" textAnchor="middle" style={{ letterSpacing: "3px", fontSize: "8.6px" }}>
          WALLY NASSIF ELECTRICAL
        </textPath>
      </text>
      <text fill={`url(#${gold})`} fontFamily="var(--font-inter), sans-serif" fontWeight="700">
        <textPath href={`#${bottomArc}`} startOffset="50%" textAnchor="middle" style={{ letterSpacing: "4px", fontSize: "8.5px" }}>
          1976 &#8226; 2026
        </textPath>
      </text>

      {/* side stars */}
      <text x="26" y="104" fill={`url(#${green})`} fontSize="9" textAnchor="middle">★</text>
      <text x="174" y="104" fill={`url(#${green})`} fontSize="9" textAnchor="middle">★</text>

      {/* lightning bolt */}
      <path
        d="M104 55 L92 84 L100 84 L94 104 L112 78 L103 78 L110 55 Z"
        fill="#ffffff"
      />

      {/* center 50 + YEARS */}
      <text
        x="100" y="135" textAnchor="middle"
        fill={`url(#${gold})`}
        fontFamily="var(--font-playfair), serif" fontWeight="700" fontSize="58"
      >
        50
      </text>
      <text
        x="100" y="152" textAnchor="middle" fill={`url(#${gold})`}
        fontFamily="var(--font-inter), sans-serif" fontWeight="700" fontSize="10"
        style={{ letterSpacing: "6px" }}
      >
        YEARS
      </text>
    </svg>
  );
}
