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
  ivory: "bg-ivory text-charcoal",
  sand: "bg-sand text-charcoal",
  forest: "bg-forest text-ivory",
  white: "bg-white text-charcoal",
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
      className={`relative py-20 sm:py-24 lg:py-32 ${tones[tone]} ${className}`}
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
      className={`flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] ${
        light ? "text-sage" : "text-terracotta-deep"
      } ${className}`}
    >
      <span
        aria-hidden="true"
        className={`h-px w-8 ${light ? "bg-sage/70" : "bg-terracotta"}`}
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
      className={`font-serif text-4xl leading-[1.08] font-medium tracking-[-0.01em] text-balance sm:text-5xl ${className}`}
    >
      {children}
    </Tag>
  );
}
