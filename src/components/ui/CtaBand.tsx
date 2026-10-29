import type { ReactNode } from "react";
import { siteConfig } from "@/config/site";
import { Container } from "./Layout";
import { CircleArrowLink } from "./Button";
import { Reveal } from "./Reveal";

/**
 * Closing call to action in the design's style: an italic statement, a fine
 * gold rule, then a small gold label and the link.
 */
export function CtaBand({
  id,
  title,
  label = "Start a conversation",
  children,
  cta,
  showContact = false,
}: {
  id: string;
  title: ReactNode;
  label?: string;
  children?: ReactNode;
  cta: { label: string; href: string };
  /** Show the official email and phone beneath the label, as in the design. */
  showContact?: boolean;
}) {
  const { email, phone } = siteConfig.contact;
  return (
    <section
      aria-labelledby={id}
      className="relative bg-gradient-to-b from-transparent to-ink-deep py-32 text-center sm:py-40"
    >
      <Container>
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center">
          <h2
            id={id}
            className="font-serif text-4xl leading-tight text-balance text-white italic sm:text-5xl"
          >
            {title}
          </h2>
          <div aria-hidden="true" className="my-12 h-px w-full bg-gradient-to-r from-transparent via-gold to-transparent" />
          <p className="mb-4 text-xs font-bold tracking-[0.3em] text-gold uppercase">{label}</p>
          {children && <div className="max-w-xl text-lg leading-relaxed text-pretty text-mist/70">{children}</div>}
          {showContact && (email || phone) && (
            <p className="mt-8 flex flex-col items-center gap-2 text-xl text-white/80 sm:text-2xl">
              {email && (
                <a href={`mailto:${email}`} className="break-all transition-colors hover:text-gold">
                  {email}
                </a>
              )}
              {phone && (
                <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="text-lg text-mist/60 transition-colors hover:text-gold">
                  {phone}
                </a>
              )}
            </p>
          )}
          <CircleArrowLink href={cta.href} className="mt-10">
            {cta.label}
          </CircleArrowLink>
        </Reveal>
      </Container>
    </section>
  );
}
