import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "light" | "ghost";

const base =
  "group inline-flex items-center justify-center gap-3 rounded-full px-7 py-3.5 text-center text-[0.72rem] font-medium uppercase tracking-[0.22em] transition-[background-color,color,border-color] duration-300 ease-[var(--ease-gentle)] focus-visible:outline-offset-4 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "border border-gold bg-gold text-ink hover:border-gold-soft hover:bg-gold-soft",
  secondary: "border border-white/30 text-mist hover:border-gold hover:text-gold",
  light: "border border-gold bg-gold text-ink hover:border-gold-soft hover:bg-gold-soft",
  ghost: "border border-white/30 text-mist hover:border-gold hover:text-gold",
};

export function buttonClasses(variant: Variant = "primary", className = "") {
  return `${base} ${variants[variant]} ${className}`;
}

function Arrow() {
  return (
    <ArrowRight
      aria-hidden="true"
      className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
    />
  );
}

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

export function ButtonLink({
  href,
  children,
  variant = "primary",
  arrow = false,
  className,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link href={href} className={buttonClasses(variant, className)} {...rest}>
      <span>{children}</span>
      {arrow && <Arrow />}
    </Link>
  );
}

/** The design's signature link: uppercase label beside a circled arrow. */
export function CircleArrowLink({
  href,
  children,
  className = "",
  ...rest
}: { href: string; children: ReactNode; className?: string } & Omit<
  ComponentProps<typeof Link>,
  "href" | "className" | "children"
>) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-4 text-xs font-medium tracking-[0.25em] text-mist uppercase transition-colors hover:text-gold ${className}`}
      {...rest}
    >
      <span>{children}</span>
      <span
        aria-hidden="true"
        className="flex size-9 items-center justify-center rounded-full border border-white/30 transition-all duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-ink"
      >
        <ArrowRight className="size-4" />
      </span>
    </Link>
  );
}
