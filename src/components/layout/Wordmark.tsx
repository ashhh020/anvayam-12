import Link from "next/link";

export function Emblem({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" focusable="false">
      <path
        d="M8 36 V18 a12 12 0 0 1 24 0 V36"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="20" cy="19" r="4.2" fill="#B87557" />
      <path
        d="M11 33 C 16 28 24 30 29 25"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeDasharray="0.1 3.4"
      />
    </svg>
  );
}

export function Wordmark({
  light = false,
  onClick,
}: {
  light?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className={`group flex items-center gap-3 ${light ? "text-ivory" : "text-forest"}`}
      aria-label="Anvayam Vaidya Sala — home"
    >
      <Emblem className="size-9 shrink-0 transition-transform duration-500 group-hover:-translate-y-0.5" />
      <span className="flex flex-col leading-none">
        <span className="font-serif text-[1.45rem] font-semibold tracking-[0.04em]">
          Anvayam
        </span>
        <span
          className={`mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.34em] ${
            light ? "text-sage" : "text-terracotta-deep"
          }`}
        >
          Vaidya Sala
        </span>
      </span>
    </Link>
  );
}
