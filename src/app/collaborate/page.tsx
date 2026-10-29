import { collaborators, pathways } from "@/content/content";
import { photos } from "@/content/photos";
import { pageMetadata } from "@/lib/metadata";
import { CtaBand } from "@/components/ui/CtaBand";
import { Container, Eyebrow, Heading, Section } from "@/components/ui/Layout";
import { PageIntro } from "@/components/ui/PageIntro";
import { Reveal } from "@/components/ui/Reveal";
import { ArchFrame } from "@/components/illustrations/ArchFrame";

export const metadata = pageMetadata({
  title: "Collaborate & Grow",
  description:
    "Let’s connect, collaborate, and grow together. Explore how healthcare professionals, practitioners, institutions, and communities can work with Anvayam Vaidya Sala.",
  path: "/collaborate",
});

export default function CollaboratePage() {
  return (
    <>
      <PageIntro
        eyebrow="Collaborate & Grow"
        title={
          <>
            Let’s connect. <span className="text-gold">Let’s collaborate.</span> Let’s grow
            together.
          </>
        }
      >
        <p>
          Meaningful wellbeing grows when people, knowledge, and experiences come together. We
          welcome conversations with individuals and organisations interested in making wellbeing
          education and suitable experiences more accessible.
        </p>
      </PageIntro>

      {/* Who can collaborate */}
      <Section tone="white" labelledBy="who-title">
        <Container>
          <Reveal className="max-w-2xl">
            <Eyebrow>Who can collaborate?</Eyebrow>
            <Heading id="who-title" className="mt-6 text-white">
              People and organisations who share the journey.
            </Heading>
          </Reveal>
          <ul className="mt-14 grid gap-x-10 gap-y-0 md:grid-cols-2 lg:grid-cols-3">
            {collaborators.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal
                  as="li"
                  key={item.title}
                  delay={(index % 3) * 80}
                  className="border-t border-white/10 py-9"
                >
                  <Icon aria-hidden="true" strokeWidth={1.25} className="size-8 text-gold" />
                  <h3 className="mt-6 font-sans font-semibold tracking-tight text-2xl leading-tight text-white sm:text-[1.75rem]">
                    {item.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-mist/60">{item.body}</p>
                </Reveal>
              );
            })}
          </ul>
        </Container>
      </Section>

      {/* Ways to work together */}
      <Section tone="forest" labelledBy="ways-title" className="grain overflow-hidden">
        <Container>
          <Reveal className="max-w-2xl">
            <Eyebrow light>Ways to work together</Eyebrow>
            <h2 id="ways-title" className="mt-6 font-sans font-semibold tracking-tight text-4xl leading-[1.08] text-balance sm:text-5xl">
              Five pathways for collaboration.
            </h2>
          </Reveal>
          <ol className="mt-14 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-5">
            {pathways.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal
                  as="li"
                  key={item.title}
                  delay={index * 70}
                  className="flex flex-col gap-6 bg-ink-deep p-7 lg:min-h-80"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium tracking-[0.3em] text-leaf">{String(index + 1).padStart(2, "0")}</span>
                    <Icon aria-hidden="true" strokeWidth={1.25} className="size-6 text-leaf" />
                  </div>
                  <h3 className="mt-auto font-sans font-semibold tracking-tight text-2xl leading-tight">{item.title}</h3>
                  <p className="leading-relaxed text-mist/65">{item.body}</p>
                </Reveal>
              );
            })}
          </ol>
        </Container>
      </Section>

      {/* Approach to partnership */}
      <Section tone="ivory" labelledBy="approach-title" className="grain overflow-hidden">
        <Container className="grid items-center gap-16 lg:grid-cols-12">
          <div className="mx-auto w-full max-w-xs sm:max-w-sm lg:col-span-4 lg:max-w-none">
            <ArchFrame image={photos.collabLeaf} sizes="(min-width: 1024px) 30vw, 80vw" />
          </div>
          <Reveal className="lg:col-span-7 lg:col-start-6">
            <Eyebrow>Our approach to partnership</Eyebrow>
            <Heading id="approach-title" className="mt-6 text-white">
              Trust, mutual respect, transparency, safety, and shared responsibility.
            </Heading>
            <p className="mt-8 text-lg leading-relaxed text-pretty text-mist/70">
              We value trust, mutual respect, transparency, safety, and shared responsibility. Each
              collaboration will be explored individually and may depend on suitability, qualified
              personnel, available resources, and mutual agreement.
            </p>
          </Reveal>
        </Container>
      </Section>

      <CtaBand
        id="idea-title"
        title="Have an idea?"
        cta={{ label: "Discuss a Collaboration", href: "/contact?category=collaboration" }}
      >
        <p>
          Tell us about your community, organisation, or proposed initiative. We would be glad to
          hear your ideas and explore whether there is a meaningful way to work together.
        </p>
      </CtaBand>
    </>
  );
}
