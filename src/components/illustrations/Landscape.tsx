/**
 * Original layered-landscape illustration: hills, a sun, a winding path and
 * small connected points representing communities along the way. Used in
 * place of photography until genuine, licensed Anvayam imagery is available.
 */

type Variant = "dawn" | "day" | "dusk";

const palettes: Record<
  Variant,
  { sky: string; sun: string; far: string; mid: string; near: string; sunX: number; sunY: number }
> = {
  dawn: { sky: "#F3EBDB", sun: "#A35F22", far: "#E2EFD6", mid: "#A3C98A", near: "#285E2A", sunX: 262, sunY: 196 },
  day: { sky: "#EAF1DF", sun: "#D49A5E", far: "#CFE3BF", mid: "#8DB86E", near: "#33702F", sunX: 118, sunY: 150 },
  dusk: { sky: "#EBDCCB", sun: "#8F501A", far: "#D6E0C1", mid: "#7FA862", near: "#1B4220", sunX: 300, sunY: 236 },
};

export function Landscape({
  variant = "dawn",
  className = "",
}: {
  variant?: Variant;
  className?: string;
}) {
  const p = palettes[variant];
  return (
    <svg
      viewBox="0 0 400 500"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <rect width="400" height="500" fill={p.sky} />

      {/* Sun with fine halo rings */}
      <g>
        <circle cx={p.sunX} cy={p.sunY} r="96" fill="none" stroke={p.sun} strokeOpacity="0.18" />
        <circle cx={p.sunX} cy={p.sunY} r="74" fill="none" stroke={p.sun} strokeOpacity="0.28" />
        <circle cx={p.sunX} cy={p.sunY} r="50" fill={p.sun} fillOpacity="0.92" />
      </g>

      {/* Far range */}
      <path
        d="M0 292 C 50 262 104 248 168 272 S 290 236 340 250 S 390 262 400 258 V500 H0 Z"
        fill={p.far}
      />
      {/* Mid range */}
      <path
        d="M0 342 C 74 302 148 330 214 314 S 336 284 400 316 V500 H0 Z"
        fill={p.mid}
      />
      {/* Near ground */}
      <path
        d="M0 404 C 86 372 168 398 246 386 S 356 360 400 378 V500 H0 Z"
        fill={p.near}
      />

      {/* Winding path towards the horizon */}
      <path
        d="M148 500 C 170 452 262 440 236 402 C 216 372 200 346 226 318 L 232 318 C 212 346 230 372 252 402 C 282 444 220 462 254 500 Z"
        fill="#FAF8F2"
        fillOpacity="0.88"
      />

      {/* Connected communities */}
      <path
        d="M58 332 C 96 318 120 316 150 320 S 204 316 229 316 S 300 296 330 298 S 362 314 372 320"
        fill="none"
        stroke="#FAF8F2"
        strokeWidth="1.2"
        strokeDasharray="2 5"
        strokeLinecap="round"
      />
      {[
        [58, 332],
        [150, 320],
        [229, 316],
        [330, 298],
        [372, 320],
      ].map(([cx, cy]) => (
        <g key={`${cx}-${cy}`}>
          <circle cx={cx} cy={cy} r="7" fill="#FAF8F2" fillOpacity="0.35" />
          <circle cx={cx} cy={cy} r="3.4" fill="#FAF8F2" stroke="#A35F22" strokeWidth="1.4" />
        </g>
      ))}

      {/* Foreground grasses */}
      <g stroke="#A3C98A" strokeWidth="1.3" strokeLinecap="round" fill="none" opacity="0.75">
        <path d="M34 500 Q 38 468 30 440" />
        <path d="M44 500 Q 46 474 56 452" />
        <path d="M24 500 Q 20 478 10 462" />
        <path d="M360 500 Q 364 472 356 450" />
        <path d="M370 500 Q 374 480 384 466" />
        <path d="M350 500 Q 344 484 334 474" />
      </g>
    </svg>
  );
}
