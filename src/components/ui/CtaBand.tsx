import type { ReactNode } from "react";
import { Container } from "./Layout";
import { ButtonLink } from "./Button";
import { Reveal } from "./Reveal";
import { KolamDivider, Sprig } from "@/components/illustrations/Motifs";

/** Closing call-to-action band on a deep forest background. */
export function CtaBand({
  id,
  title,
  children,
  cta,
}: {
  id: string;
  title: ReactNode;
  children?: ReactNode;
  cta: { label: string; href: string };
}) {
  return (
    <section
      aria-labelledby={id}
      className="grain relative overflow-hidden bg-forest py-24 text-ivory sm:py-28 lg:py-36"
    >
      <Sprig className="pointer-events-none absolute -bottom-6 -left-6 h-72 text-sage/25 sm:left-6 lg:h-96" />
      <Sprig className="pointer-events-none absolute -top-10 -right-4 h-64 rotate-180 text-sage/20 sm:right-10 lg:h-80" />
      <Container className="relative text-center">
        <Reveal className="flex flex-col items-center">
          <KolamDivider light />
          <h2
            id={id}
            className="mt-8 max-w-3xl font-serif text-4xl leading-[1.08] font-medium text-balance sm:text-5xl lg:text-6xl"
          >
            {title}
          </h2>
          {children && (
            <div className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-ivory/80">
              {children}
            </div>
          )}
          <ButtonLink href={cta.href} variant="light" arrow className="mt-10">
            {cta.label}
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
