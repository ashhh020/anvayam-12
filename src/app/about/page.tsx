import { values } from "@/content/content";
import { photos } from "@/content/photos";
import { pageMetadata } from "@/lib/metadata";
import { CtaBand } from "@/components/ui/CtaBand";
import { Container, Eyebrow, Heading, Section } from "@/components/ui/Layout";
import { PageIntro } from "@/components/ui/PageIntro";
import { Reveal } from "@/components/ui/Reveal";
import { ArchFrame } from "@/components/illustrations/ArchFrame";
import { KolamDivider, Sprig } from "@/components/illustrations/Motifs";

export const metadata = pageMetadata({
  title: "About Us",
  description:
    "A vision rooted in connection, care, and collective growth. Discover the story, vision, mission, and values behind Anvayam Vaidya Sala.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageIntro eyebrow="About Us" title="A vision rooted in connection, care, and collective growth." />

      {/* Our story */}
      <Section tone="white" labelledBy="story-title">
        <Container className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal className="lg:sticky lg:top-32">
              <Eyebrow>Our story</Eyebrow>
              <Heading id="story-title" className="mt-6 text-white">
                It begins with a simple question.
              </Heading>
              <div className="mt-12 hidden max-w-xs lg:block">
                <ArchFrame image={photos.aboutBanyan} sizes="320px" />
              </div>
            </Reveal>
          </div>
          <div className="space-y-8 lg:col-span-7 lg:col-start-6">
            <Reveal>
              <p className="font-sans font-semibold tracking-tight text-[1.7rem] leading-snug text-pretty text-white sm:text-3xl">
                The idea behind Anvayam Vaidya Sala begins with a simple question: how can
                understanding of health and wellbeing come closer to where people live, learn, work,
                and grow?
              </p>
            </Reveal>
            <Reveal delay={80}>
              <p className="text-lg leading-relaxed text-pretty text-mist/70">
                We envision creating opportunities for healthcare knowledge, traditional perspectives,
                mindful practices, and community participation to meet in thoughtful and responsible
                ways.
              </p>
            </Reveal>
            <Reveal delay={140}>
              <p className="text-lg leading-relaxed text-pretty text-mist/70">
                Rather than being tied to one physical location, Anvayam Vaidya Sala is envisioned as
                a travelling initiative that can connect with different communities, institutions,
                professionals, and practitioners.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Vision & mission */}
      <Section tone="sand" labelledBy="vision-title">
        <h2 id="vision-title" className="sr-only">
          Our vision and mission
        </h2>
        <Container className="grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-2">
          {[
            {
              label: "Our vision",
              text: "To nurture a healthier, more aware, and more connected society by making wellbeing experiences accessible across communities and everyday settings.",
            },
            {
              label: "Our mission",
              text: "To create opportunities for health education, mindful living, integrative wellbeing, and community participation through collaboration, learning, and responsible practice.",
            },
          ].map((block, index) => (
            <Reveal key={block.label} delay={index * 100} className="bg-panel p-8 sm:p-12 lg:p-16">
              <Eyebrow as="h3">{block.label}</Eyebrow>
              <p className="mt-8 font-sans font-semibold tracking-tight text-[1.7rem] leading-snug text-pretty text-white sm:text-3xl">
                {block.text}
              </p>
            </Reveal>
          ))}
        </Container>
      </Section>

      {/* Values */}
      <Section tone="ivory" labelledBy="values-title" className="grain">
        <Container>
          <Reveal className="max-w-2xl">
            <Eyebrow>Our values</Eyebrow>
            <Heading id="values-title" className="mt-6 text-white">
              Five commitments that guide how we work.
            </Heading>
          </Reveal>
          <ol className="mt-16 border-t border-white/10">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Reveal
                  as="li"
                  key={value.title}
                  delay={index * 60}
                  className="grid gap-4 border-b border-white/10 py-8 sm:grid-cols-12 sm:items-baseline sm:gap-8 sm:py-10"
                >
                  <span className="text-xs font-medium tracking-[0.3em] text-gold sm:col-span-1">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="flex items-center gap-4 font-sans font-semibold tracking-tight text-3xl text-white sm:col-span-4 sm:text-4xl">
                    <Icon aria-hidden="true" strokeWidth={1.25} className="size-7 shrink-0 text-leaf" />
                    {value.title}
                  </h3>
                  <p className="text-lg leading-relaxed text-mist/70 sm:col-span-7">{value.body}</p>
                </Reveal>
              );
            })}
          </ol>
        </Container>
      </Section>

      {/* The name */}
      <section
        aria-labelledby="name-title"
        className="grain relative overflow-hidden bg-ink-deep py-24 text-mist sm:py-28 lg:py-36"
      >
        <Sprig className="pointer-events-none absolute right-4 -bottom-8 h-80 text-leaf/15 lg:right-16 lg:h-[28rem]" />
        <Container className="relative grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Eyebrow light>Why the name Anvayam?</Eyebrow>
            <h2 id="name-title" className="mt-8 font-sans font-semibold tracking-tight text-5xl leading-[1.02] sm:text-6xl">
              <span className="block">Anvayam</span>
              <span className="mt-2 block text-3xl text-leaf italic sm:text-4xl">connection, continuity, relationship</span>
            </h2>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-6 lg:col-start-7">
            <p className="text-xl leading-relaxed text-pretty text-mist/80">
              Anvayam evokes connection, continuity, and relationship. Vaidya Sala reflects a
              tradition of healing and healthcare. Together, the name expresses a vision of connected
              wellbeing that honours knowledge, encourages collaboration, and seeks to meet people
              where they are.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Philosophy */}
      <Section tone="ivory" labelledBy="philosophy-title">
        <Container>
          <Reveal className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <Eyebrow as="h2" id="philosophy-title">
              Our philosophy
            </Eyebrow>
            <KolamDivider className="mt-8" />
            <blockquote className="mt-10 font-sans font-semibold tracking-tight text-[1.65rem] leading-snug text-pretty text-white sm:text-[2.1rem]">
              We recognise that no single approach can address every aspect of human wellbeing.
              Scientific understanding, appropriate medical care, traditional knowledge, mindful
              practices, supportive relationships, and healthy environments each have their own
              strengths and limitations. We aim to bring these perspectives into thoughtful dialogue.
            </blockquote>
          </Reveal>
        </Container>
      </Section>

      <CtaBand
        id="about-cta"
        title="Wellbeing begins when we come together."
        cta={{ label: "Explore Collaboration Opportunities", href: "/collaborate" }}
      />
    </>
  );
}
