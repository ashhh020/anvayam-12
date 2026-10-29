/** Small decorative motifs. All are aria-hidden. */

/** Kolam-inspired divider: a single thread weaving between dots. */
export function KolamDivider({ className = "", light = false }: { className?: string; light?: boolean }) {
  const stroke = light ? "#A7B8A0" : "#B87557";
  const dot = light ? "#FAF8F2" : "#244B3A";
  return (
    <svg viewBox="0 0 140 28" className={`h-7 w-36 ${className}`} aria-hidden="true" focusable="false">
      <path
        d="M8 14 C 8 1 32 1 32 14 S 57 27 57 14 S 82 1 82 14 S 107 27 107 14 S 132 1 132 14"
        fill="none"
        stroke={stroke}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {[20, 45, 70, 95, 120].map((x) => (
        <circle key={x} cx={x} cy={14} r={x === 70 ? 2.8 : 1.9} fill={x === 70 ? stroke : dot} />
      ))}
    </svg>
  );
}

/** Fine-line botanical sprig. */
export function Sprig({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 220"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M58 218 C 56 170 58 120 66 70 C 70 46 76 26 84 6" />
      <path d="M58 180 C 40 172 26 156 22 136 C 40 140 54 154 58 180 Z" />
      <path d="M60 150 C 78 140 92 124 96 104 C 78 108 64 124 60 150 Z" />
      <path d="M62 118 C 44 110 32 94 30 74 C 46 80 58 96 62 118 Z" />
      <path d="M66 88 C 82 78 92 62 94 44 C 78 50 68 66 66 88 Z" />
      <path d="M72 58 C 60 50 54 36 54 22 C 66 28 72 42 72 58 Z" />
      <path d="M58 180 L 34 148 M60 150 L 86 116 M62 118 L 38 86 M66 88 L 88 56" strokeOpacity="0.55" />
    </svg>
  );
}

/** Winding pathway line used as a quiet background element. */
export function PathwayLine({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 400"
      preserveAspectRatio="none"
      className={className}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M-20 320 C 160 300 220 160 380 180 S 600 330 780 260 S 1020 80 1220 120"
        stroke="#A7B8A0"
        strokeWidth="1.2"
        strokeDasharray="1 7"
        strokeLinecap="round"
      />
      <path
        d="M-20 344 C 170 330 240 196 400 214 S 620 360 800 292 S 1040 116 1220 150"
        stroke="#A7B8A0"
        strokeOpacity="0.5"
        strokeWidth="1"
      />
    </svg>
  );
}
