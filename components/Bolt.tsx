import type { CSSProperties } from "react";

type BoltProps = {
  width?: number;
  height?: number;
  className?: string;
  style?: CSSProperties;
};

/**
 * Pure white lightning bolt — same shape as the anniversary emblem bolt.
 * Used in place of the ⚡ emoji across the site.
 */
export default function Bolt({
  width = 11,
  height = 18,
  className = "",
  style,
}: BoltProps) {
  return (
    <svg
      viewBox="90 53 24 53"
      width={width}
      height={height}
      aria-hidden="true"
      className={className}
      style={style}
    >
      <path
        d="M104 55 L92 84 L100 84 L94 104 L112 78 L103 78 L110 55 Z"
        fill="#ffffff"
      />
    </svg>
  );
}
