import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { exploreLinks } from "@/content/content";
import { pageMetadata } from "@/lib/metadata";
import { ButtonLink } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { Container, Eyebrow, Heading, Section } from "@/components/ui/Layout";
import { Reveal } from "@/components/ui/Reveal";
import { ArchFrame } from "@/components/illustrations/ArchFrame";
import { Landscape } from "@/components/illustrations/Landscape";
import { KolamDivider, PathwayLine, Sprig } from "@/components/illustrations/Motifs";

export const metadata = {
  ...pageMetadata({
    title: "Home",
    description:
      "Bringing healthcare knowledge, traditional wisdom, yoga, and community wellbeing together — wherever people gather.",
    path: "/",
  }),
  title: { absolute: `${siteConfig.name} — ${siteConfig.tagline}` },
};

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section aria-labelledby="hero-title" className="grain relative overflow-hidden bg-ivory">
        <PathwayLine className="pointer-events-none absolute inset-x-0 top-[55%] h-64 w-full opacity-80 lg:top-[48%] lg:h-96" />
        <Container className="relative grid items-center gap-14 pt-10 pb-20 sm:pt-16 lg:grid-cols-12 lg:gap-10 lg:pt-16 lg:pb-28">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>A travelling, collaborative wellbeing initiative</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h1 id="hero-title" className="mt-7 text-forest">
                <span className="block font-serif text-[3.1rem] leading-[0.95] font-medium tracking-[0.01em] sm:text-7xl lg:text-[5.6rem]">
                  Anvayam
                  <span className="block text-terracotta-deep">Vaidya Sala</span>
                </span>
                <span className="mt-6 block font-serif text-2xl font-normal text-charcoal/85 italic sm:text-3xl">
                  {siteConfig.tagline}
                </span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-pretty text-charcoal/80 sm:text-xl">
                Bringing healthcare knowledge, traditional wisdom, yoga, and community wellbeing
                together — wherever people gather.
              </p>
            </Reveal>
            <Reveal delay={240} className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <ButtonLink href="#approach" arrow>
                Explore Our Approach
              </ButtonLink>
              <ButtonLink href="/collaborate" variant="secondary">
                Collaborate With Us
              </ButtonLink>
            </Reveal>
          </div>

          <div className="relative mx-auto w-full max-w-sm sm:max-w-md lg:col-span-5 lg:max-w-none">
            <ArchFrame variant="dawn" priority />
            <div className="absolute -bottom-6 -left-4 hidden w-40 overflow-hidden rounded-t-full border-4 border-ivory shadow-[0_20px_50px_-20px_rgba(36,75,58,0.45)] sm:block lg:-left-12 lg:w-44">
              <Landscape variant="day" className="aspect-[4/5] h-auto w-full" />
            </div>
            <Sprig className="absolute -top-4 -right-2 h-36 text-forest/40 sm:-right-8 lg:h-44" />
          </div>
        </Container>
      </section>

      {/* Guiding thought */}
      <section
        id="approach"
        aria-labelledby="guiding-title"
        className="grain relative scroll-mt-24 overflow-hidden bg-forest py-24 text-ivory sm:py-28 lg:py-36"
      >
        <Container className="relative">
          <Reveal className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <Eyebrow light>Our guiding thought</Eyebrow>
            <p lang="sa" className="mt-10 font-devanagari text-2xl text-sage sm:text-3xl" aria-hidden="true">
              {siteConfig.guidingThoughtDevanagari}
            </p>
            <h2 id="guiding-title" className="mt-4 font-serif text-5xl leading-none font-medium sm:text-7xl">
              {siteConfig.guidingThought}
            </h2>
            <p className="mt-5 font-serif text-2xl text-ivory/85 italic sm:text-3xl">
              {siteConfig.guidingThoughtMeaning}
            </p>
            <KolamDivider light className="mt-10" />
            <p className="mt-10 text-lg leading-relaxed text-pretty text-ivory/80 sm:text-xl">
              We believe wellbeing is more than the absence of illness. It includes caring for the
              body, nurturing mental clarity, building meaningful relationships, and connecting with
              the world around us.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Introducing Anvayam */}
      <Section tone="ivory" labelledBy="intro-title" className="grain overflow-hidden">
        <Container className="grid items-center gap-16 lg:grid-cols-12">
          <div className="relative order-2 mx-auto w-full max-w-sm sm:max-w-md lg:order-1 lg:col-span-5 lg:max-w-none">
            <ArchFrame variant="dusk" />
          </div>
          <div className="order-1 lg:order-2 lg:col-span-6 lg:col-start-7">
            <Reveal>
              <Eyebrow>Introducing Anvayam</Eyebrow>
              <Heading id="intro-title" className="mt-6 text-forest">
                Closer to the places where people live, learn, work, and gather.
              </Heading>
            </Reveal>
            <Reveal delay={100}>
              <p className="mt-8 font-serif text-2xl leading-snug text-pretty text-charcoal sm:text-[1.7rem]">
                <span className="float-left mt-1 mr-3 font-serif text-7xl leading-[0.8] text-terracotta-deep">
                  A
                </span>
                nvayam Vaidya Sala is a travelling, collaborative wellbeing initiative that seeks to
                bring health education and thoughtful wellbeing experiences closer to people in the
                places where they live, learn, work, and gather.
              </p>
            </Reveal>
            <Reveal delay={180} className="mt-10">
              <ButtonLink href="/about" variant="secondary" arrow>
                Our vision and values
              </ButtonLink>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Explore Anvayam */}
      <Section tone="sand" labelledBy="explore-title">
        <Container>
          <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Eyebrow>Explore Anvayam</Eyebrow>
              <Heading id="explore-title" className="mt-6 text-forest">
                Four ways to begin.
              </Heading>
            </div>
          </Reveal>
          <ul className="mt-14 grid gap-px overflow-hidden border border-forest/15 bg-forest/15 sm:grid-cols-2 lg:grid-cols-4">
            {exploreLinks.map((item, index) => (
              <Reveal as="li" key={item.href} delay={index * 80} className="bg-sand">
                <Link
                  href={item.href}
                  className="group flex h-full min-h-64 flex-col justify-between gap-10 p-8 transition-colors duration-500 hover:bg-ivory focus-visible:bg-ivory lg:min-h-80"
                >
                  <span className="flex items-start justify-between">
                    <span className="font-serif text-lg text-terracotta-deep">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-5 text-forest/50 transition-[transform,color] duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-forest"
                    />
                  </span>
                  <span>
                    <span className="block font-serif text-3xl leading-tight text-forest">{item.title}</span>
                    <span className="mt-3 block leading-relaxed text-charcoal/75">{item.body}</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaBand
        id="home-cta"
        title="Wellbeing begins when we come together."
        cta={{ label: "Start a Conversation", href: "/contact" }}
      >
        <p>
          Our programmes will be shaped by community needs, appropriate professional expertise, and
          the partnerships available.
        </p>
      </CtaBand>
    </>
  );
}
