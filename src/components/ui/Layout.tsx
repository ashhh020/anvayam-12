import type { ElementType, ReactNode } from "react";

export function Container({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  return (
    <Tag className={`mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12 ${className}`}>
      {children}
    </Tag>
  );
}

type Tone = "ivory" | "sand" | "forest" | "white";

const tones: Record<Tone, string> = {
  ivory: "text-mist",
  sand: "bg-panel/60 text-mist",
  forest: "bg-ink-deep text-mist",
  white: "bg-ink-deep/60 text-mist",
};

export function Section({
  children,
  tone = "ivory",
  className = "",
  id,
  labelledBy,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  id?: string;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`relative py-24 sm:py-32 lg:py-40 ${tones[tone]} ${className}`}
    >
      {children}
    </section>
  );
}

/** Small uppercase label that sits above headings. */
export function Eyebrow({
  children,
  className = "",
  light = false,
  as: Tag = "p",
  id,
}: {
  children: ReactNode;
  className?: string;
  light?: boolean;
  as?: ElementType;
  id?: string;
}) {
  return (
    <Tag
      id={id}
      className={`flex items-center gap-4 text-[10px] font-medium uppercase tracking-[0.6em] ${
        light ? "text-leaf" : "text-gold"
      } ${className}`}
    >
      <span
        aria-hidden="true"
        className={`h-px w-10 ${light ? "bg-leaf/60" : "bg-gold/70"}`}
      />
      {children}
    </Tag>
  );
}

export function Heading({
  children,
  id,
  as: Tag = "h2",
  className = "",
}: {
  children: ReactNode;
  id?: string;
  as?: ElementType;
  className?: string;
}) {
  return (
    <Tag
      id={id}
      className={`font-sans font-bold text-4xl leading-[1.05] tracking-tighter text-balance sm:text-5xl ${className}`}
    >
      {children}
    </Tag>
  );
}
