import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "light" | "ghost";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full text-center px-6 py-3 text-[0.95rem] font-medium tracking-wide transition-[background-color,color,border-color,transform] duration-300 ease-[var(--ease-gentle)] focus-visible:outline-offset-4 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-forest text-ivory hover:bg-forest-deep border border-forest hover:border-forest-deep",
  secondary:
    "border border-forest/40 text-forest hover:border-forest hover:bg-forest/5",
  light: "bg-ivory text-forest-deep hover:bg-sand border border-ivory",
  ghost: "border border-ivory/40 text-ivory hover:border-ivory hover:bg-ivory/10",
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
