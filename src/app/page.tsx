import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { exploreLinks } from "@/content/content";
import { photos } from "@/content/photos";
import { pageMetadata } from "@/lib/metadata";
import { CircleArrowLink } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { Container, Eyebrow } from "@/components/ui/Layout";
import { Reveal } from "@/components/ui/Reveal";

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
      {/* Hero — full-screen, centred, after the design */}
      <section
        aria-labelledby="hero-title"
        className="relative flex min-h-svh flex-col items-center justify-center px-5 pt-32 pb-20 text-center"
      >
        <div className="mb-6 overflow-hidden">
          <p className="slide-up text-[10px] tracking-[0.6em] text-gold uppercase sm:tracking-[1em]">
            A travelling, collaborative wellbeing initiative
          </p>
        </div>
        <h1 id="hero-title" className="mb-8 text-white">
          <span className="block text-5xl leading-[0.9] font-bold tracking-tighter sm:text-7xl md:text-[110px] lg:text-[128px]">
            ANVAYAM
            <br />
            VAIDYA SALA
          </span>
          <span className="mt-8 block font-serif text-2xl font-normal text-mist/80 italic sm:text-3xl">
            {siteConfig.tagline}
          </span>
        </h1>
        <div className="max-w-sm border-l border-white/20 pl-8 text-left">
          <p className="mb-8 text-sm leading-relaxed text-mist/60">
            Bringing healthcare knowledge, traditional wisdom, yoga, and community wellbeing together —
            wherever people gather.
          </p>
          <div className="flex flex-col gap-5">
            <CircleArrowLink href="#approach">Explore Our Approach</CircleArrowLink>
            <Link
              href="/collaborate"
              className="text-[10px] tracking-[0.3em] text-mist/60 uppercase underline-offset-8 transition-colors hover:text-gold hover:underline"
            >
              Collaborate With Us
            </Link>
          </div>
        </div>
      </section>

      {/* Guiding thought */}
      <section id="approach" aria-labelledby="guiding-title" className="relative scroll-mt-24 py-32 sm:py-40">
        <Container>
          <Reveal className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <Eyebrow>Our guiding thought</Eyebrow>
            <p lang="sa" aria-hidden="true" className="mt-12 font-devanagari text-2xl text-leaf sm:text-3xl">
              {siteConfig.guidingThoughtDevanagari}
            </p>
            <h2 id="guiding-title" className="mt-5 text-5xl leading-none font-bold tracking-tighter text-white sm:text-7xl">
              {siteConfig.guidingThought}
            </h2>
            <p className="mt-6 font-serif text-2xl text-mist/80 italic sm:text-3xl">
              {siteConfig.guidingThoughtMeaning}
            </p>
            <div aria-hidden="true" className="my-12 h-px w-full max-w-md bg-gradient-to-r from-transparent via-gold to-transparent" />
            <p className="text-lg leading-relaxed text-pretty text-mist/60">
              We believe wellbeing is more than the absence of illness. It includes caring for the body,
              nurturing mental clarity, building meaningful relationships, and connecting with the world
              around us.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Introducing Anvayam + Explore — image with overlapping card, numbered list */}
      <section aria-labelledby="intro-title" className="relative py-32 sm:py-40">
        <Container className="grid items-center gap-16 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <Reveal variant="image" className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src={photos.introLamp.src}
                  alt={photos.introLamp.alt}
                  fill
                  sizes="(min-width: 768px) 55vw, 92vw"
                  placeholder="blur"
                  className="object-cover opacity-80"
                  style={{ objectPosition: photos.introLamp.position }}
                />
              </div>
            </Reveal>
            <div className="relative z-10 -mt-12 ml-6 max-w-sm rounded-2xl border border-white/10 bg-panel p-8 md:-mt-24 md:-mr-10 md:ml-auto md:p-10">
              <p className="mb-2 text-xs tracking-widest text-gold uppercase">Introducing Anvayam</p>
              <p className="font-serif text-xl leading-snug text-white italic">
                Closer to the places where people live, learn, work, and gather.
              </p>
            </div>
          </div>

          <div className="space-y-12 md:col-span-5">
            <Reveal>
              <h2 id="intro-title" className="text-4xl leading-[1.05] font-bold tracking-tighter text-white">
                A travelling, <br />
                <span className="text-leaf">collaborative</span> initiative
              </h2>
              <p className="mt-6 leading-relaxed text-pretty text-mist/60">
                Anvayam Vaidya Sala is a travelling, collaborative wellbeing initiative that seeks to bring
                health education and thoughtful wellbeing experiences closer to people in the places where
                they live, learn, work, and gather.
              </p>
            </Reveal>

            <nav aria-labelledby="explore-title">
              <h3 id="explore-title" className="mb-6 text-[10px] tracking-[0.6em] text-mist/50 uppercase">
                Explore Anvayam
              </h3>
              <ul className="space-y-8">
                {exploreLinks.map((item, index) => (
                  <Reveal as="li" key={item.href} delay={index * 80}>
                    <Link href={item.href} className="group block">
                      <span className="mb-2 block text-xs text-gold">
                        {String(index + 1).padStart(2, "0")} / {item.title.toUpperCase()}
                      </span>
                      <span className="block border-b border-white/10 pb-4 text-2xl text-white transition-colors duration-300 group-hover:border-gold">
                        {item.body}
                      </span>
                    </Link>
                  </Reveal>
                ))}
              </ul>
            </nav>
          </div>
        </Container>
      </section>

      <CtaBand
        id="home-cta"
        title="Wellbeing begins when we come together."
        cta={{ label: "Start a Conversation", href: "/contact" }}
        showContact
      >
        <p>
          Our programmes will be shaped by community needs, appropriate professional expertise, and the
          partnerships available.
        </p>
      </CtaBand>
    </>
  );
}
