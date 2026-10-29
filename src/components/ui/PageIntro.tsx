import type { ReactNode } from "react";
import { Container, Eyebrow } from "./Layout";
import { Reveal } from "./Reveal";
import { PathwayLine } from "@/components/illustrations/Motifs";

/** Opening band shared by the inner pages. */
export function PageIntro({
  eyebrow,
  title,
  children,
  aside,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section
      aria-labelledby="page-title"
      className="grain relative overflow-hidden bg-ivory pt-14 pb-20 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-32"
    >
      <PathwayLine className="pointer-events-none absolute inset-x-0 bottom-0 h-40 w-full opacity-70 sm:h-56" />
      <Container className="relative">
        <div className={`grid items-end gap-12 ${aside ? "lg:grid-cols-12" : ""}`}>
          <div className={aside ? "lg:col-span-7" : "max-w-4xl"}>
            <Reveal>
              <Eyebrow>{eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h1
                id="page-title"
                className="mt-6 font-serif text-[2.6rem] leading-[1.04] font-medium tracking-[-0.015em] text-balance text-forest sm:text-6xl lg:text-7xl"
              >
                {title}
              </h1>
            </Reveal>
            {children && (
              <Reveal delay={160}>
                <div className="mt-8 max-w-2xl text-lg leading-relaxed text-pretty text-charcoal/80 sm:text-xl">
                  {children}
                </div>
              </Reveal>
            )}
          </div>
          {aside && <div className="lg:col-span-4 lg:col-start-9">{aside}</div>}
        </div>
      </Container>
    </section>
  );
}
