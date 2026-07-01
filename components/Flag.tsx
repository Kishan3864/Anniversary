type FlagProps = {
  /** Rendered width in px (height follows the official 1.9:1 ratio). */
  width?: number;
  className?: string;
  title?: string;
};

/**
 * United States flag — 13 stripes + 50 stars on the union,
 * drawn to the official proportions (fly:hoist = 1.9:1).
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

  const RED = "#b22234";
  const WHITE = "#ffffff";
  const BLUE = "#3c3b6e";

  // 50 stars on the classic 9-row lattice (rows of 6 and 5 alternating).
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

  const starPoints = (cx: number, cy: number, r: number) => {
    const inner = r * 0.382;
    const pts: string[] = [];
    for (let i = 0; i < 10; i++) {
      const rad = i % 2 === 0 ? r : inner;
      const ang = -Math.PI / 2 + (i * Math.PI) / 5;
      pts.push(`${cx + rad * Math.cos(ang)},${cy + rad * Math.sin(ang)}`);
    }
    return pts.join(" ");
  };

  const starR = unionH / 10 / 2;

  return (
    <svg
      className={className}
      width={width}
      height={(width * H) / W}
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={title}
    >
      {/* stripes (white base + 7 red stripes) */}
      <rect width={W} height={H} fill={WHITE} />
      {[0, 2, 4, 6, 8, 10, 12].map((i) => (
        <rect key={i} x="0" y={i * stripe} width={W} height={stripe} fill={RED} />
      ))}

      {/* union */}
      <rect width={unionW} height={unionH} fill={BLUE} />

      {/* 50 stars */}
      {stars.map((s, i) => (
        <polygon key={i} points={starPoints(s.cx, s.cy, starR)} fill={WHITE} />
      ))}
    </svg>
  );
}
