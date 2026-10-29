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
      className="relative overflow-hidden pt-40 pb-20 sm:pt-48 sm:pb-28 lg:pt-56 lg:pb-32"
    >
      <PathwayLine className="pointer-events-none absolute inset-x-0 bottom-0 h-40 w-full opacity-25 sm:h-56" />
      <Container className="relative">
        <div className={`grid items-end gap-12 ${aside ? "lg:grid-cols-12" : ""}`}>
          <div className={aside ? "lg:col-span-7" : "max-w-4xl"}>
            <Reveal>
              <Eyebrow>{eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h1
                id="page-title"
                className="mt-8 text-[2.6rem] leading-[0.98] font-bold tracking-tighter text-balance text-white sm:text-6xl lg:text-[5.5rem]"
              >
                {title}
              </h1>
            </Reveal>
            {children && (
              <Reveal delay={160}>
                <div className="mt-10 max-w-xl border-l border-white/20 pl-8 text-base leading-relaxed text-pretty text-mist/60 sm:text-lg">
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
