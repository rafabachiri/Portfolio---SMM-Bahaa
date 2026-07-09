/**
 * BN monogram logo — a ring (with a small gap at the top-left) around bold "BN".
 * Self-contained SVG so it renders anywhere and scales crisply.
 */
export function Logo({
  size = 40,
  color = "#27A5FF",
  className = "",
}: {
  size?: number;
  color?: string;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="Bahaa Nedjma logo"
    >
      {/* Ring with a gap at the top-left */}
      <path
        d="M 20.2 8.8 A 26 26 0 1 1 8.8 20.2"
        fill="none"
        stroke={color}
        strokeWidth={4.5}
        strokeLinecap="round"
      />
      {/* BN */}
      <text
        x="32"
        y="41"
        textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontWeight="700"
        fontSize="25"
        letterSpacing="-1"
        fill={color}
      >
        BN
      </text>
    </svg>
  );
}
