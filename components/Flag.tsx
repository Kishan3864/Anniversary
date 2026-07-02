type FlagProps = {
  /** Rendered width in px (height follows the waving-flag aspect). */
  width?: number;
  className?: string;
  title?: string;
};

/**
 * United States flag rendered as a realistic waving cloth in pure SVG, so it
 * stays razor-sharp at ANY size (retina / 4K — it never pixelates). The 13
 * stripes, the union and all 50 stars ride an undulating fabric surface, with
 * fold shadows and a soft sheen for genuine depth. The hoist (left) edge stays
 * anchored while the fly (right) end flaps most, like a real hoisted flag.
 */
export default function Flag({
  width = 46,
  className = "",
  title = "United States flag",
}: FlagProps) {
  const W = 570;
  const H = 300;
  const stripe = H / 13;
  const unionW = 0.4 * W;
  const unionH = stripe * 7;

  // Official "Old Glory" palette.
  const RED = "#B31942";
  const WHITE = "#FFFFFF";
  const BLUE = "#0A3161";

  // --- cloth wave -----------------------------------------------------------
  // Deterministic and rounded so the server (Node) and client (browser) emit
  // identical coordinate strings — Math.sin/pow can differ in the last digit
  // and would otherwise break hydration.
  const AMP = 13;
  const PAD = AMP + 8;
  const round = (n: number) => Math.round(n * 1000) / 1000;
  const k1 = (2 * Math.PI * 1.4) / W;
  const k2 = (2 * Math.PI * 2.7) / W;
  const waveY = (x: number) => {
    const ramp = Math.pow(x / W, 1.15); // anchored at the hoist, flaps at the fly
    return AMP * ramp * (Math.sin(x * k1 + 0.6) * 0.72 + Math.sin(x * k2 + 2.1) * 0.28);
  };

  const N = 30;
  // One horizontal cloth band: top edge (L→R) then bottom edge (R→L), closed.
  const band = (top: number, bottom: number, maxX = W, steps = N) => {
    const sx = maxX / steps;
    let d = "";
    for (let i = 0; i <= steps; i++) {
      const x = i * sx;
      d += `${i === 0 ? "M" : "L"} ${round(x)} ${round(top + waveY(x))} `;
    }
    for (let i = steps; i >= 0; i--) {
      const x = i * sx;
      d += `L ${round(x)} ${round(bottom + waveY(x))} `;
    }
    return d + "Z";
  };

  const silhouette = band(0, H);
  const unionPath = band(0, unionH, unionW, 14);

  // 50 stars on the classic 9-row lattice, each riding the cloth surface.
  const stars: { cx: number; cy: number }[] = [];
  for (let row = 0; row < 9; row++) {
    const sixes = row % 2 === 0;
    const count = sixes ? 6 : 5;
    const cy = (unionH * (row + 1)) / 10;
    const step = unionW / 12;
    for (let col = 0; col < count; col++) {
      const cx = sixes ? step * (2 * col + 1) : step * (2 * col + 2);
      stars.push({ cx, cy });
    }
  }
  const starR = unionH / 10 / 2;
  const starPoints = (cx: number, cy: number, r: number) => {
    const inner = r * 0.382;
    const dyc = waveY(cx);
    const pts: string[] = [];
    for (let i = 0; i < 10; i++) {
      const rad = i % 2 === 0 ? r : inner;
      const ang = -Math.PI / 2 + (i * Math.PI) / 5;
      pts.push(`${round(cx + rad * Math.cos(ang))},${round(cy + dyc + rad * Math.sin(ang))}`);
    }
    return pts.join(" ");
  };

  return (
    <svg
      className={className}
      width={width}
      height={round((width * (H + 2 * PAD)) / W)}
      viewBox={`0 ${-PAD} ${W} ${H + 2 * PAD}`}
      role="img"
      aria-label={title}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <clipPath id="usflag-cloth">
          <path d={silhouette} />
        </clipPath>
        {/* vertical light/shadow columns → the illusion of fabric folds */}
        <linearGradient id="usflag-folds" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#000" stopOpacity="0" />
          <stop offset="9%" stopColor="#fff" stopOpacity="0.10" />
          <stop offset="19%" stopColor="#000" stopOpacity="0.16" />
          <stop offset="31%" stopColor="#fff" stopOpacity="0.08" />
          <stop offset="43%" stopColor="#000" stopOpacity="0.14" />
          <stop offset="56%" stopColor="#fff" stopOpacity="0.12" />
          <stop offset="69%" stopColor="#000" stopOpacity="0.18" />
          <stop offset="82%" stopColor="#fff" stopOpacity="0.10" />
          <stop offset="93%" stopColor="#000" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </linearGradient>
        {/* soft top sheen + gentle bottom shading for roundness */}
        <linearGradient id="usflag-sheen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.14" />
          <stop offset="32%" stopColor="#fff" stopOpacity="0.02" />
          <stop offset="72%" stopColor="#000" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.18" />
        </linearGradient>
      </defs>

      {/* stripes: white base + 7 red bands, each following the cloth */}
      <path d={silhouette} fill={WHITE} />
      {[0, 2, 4, 6, 8, 10, 12].map((i) => (
        <path key={i} d={band(i * stripe, (i + 1) * stripe)} fill={RED} />
      ))}

      {/* union + 50 stars riding the cloth */}
      <path d={unionPath} fill={BLUE} />
      {stars.map((s, i) => (
        <polygon key={i} points={starPoints(s.cx, s.cy, starR)} fill={WHITE} />
      ))}

      {/* depth overlays, clipped to the waving cloth silhouette */}
      <g clipPath="url(#usflag-cloth)">
        <rect x="0" y={-PAD} width={W} height={H + 2 * PAD} fill="url(#usflag-folds)" />
        <rect x="0" y={-PAD} width={W} height={H + 2 * PAD} fill="url(#usflag-sheen)" />
      </g>
    </svg>
  );
}
