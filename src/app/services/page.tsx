import { Info } from "lucide-react";
import { services, settings } from "@/content/content";
import { pageMetadata } from "@/lib/metadata";
import { CtaBand } from "@/components/ui/CtaBand";
import { Container, Eyebrow, Heading, Section } from "@/components/ui/Layout";
import { PageIntro } from "@/components/ui/PageIntro";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceRow } from "@/components/sections/ServiceRow";

export const metadata = pageMetadata({
  title: "Services & Experiences",
  description:
    "Different pathways to wellbeing: the areas of healthcare awareness, yoga and mindfulness, lifestyle, traditional wisdom, and community wellbeing that Anvayam Vaidya Sala aims to develop.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageIntro eyebrow="Services & Experiences" title="Different pathways to wellbeing.">
        <p>
          We aim to develop adaptable learning and wellbeing experiences suited to the needs of
          different people and communities. The areas below describe our focus and direction;
          specific offerings will depend on availability, qualified professional involvement, and
          suitable partnerships.
        </p>
      </PageIntro>

      {/* Focus areas */}
      <Section tone="white" labelledBy="areas-title" className="!pt-16 sm:!pt-20">
        <Container>
          <Reveal className="flex flex-col gap-4 border-b border-white/10 pb-10 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Eyebrow>Areas of focus</Eyebrow>
              <Heading id="areas-title" className="mt-6 text-white">
                Six areas we aim to develop.
              </Heading>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-mist/55">
              These describe our direction rather than a list of current offerings.
            </p>
          </Reveal>

          <nav aria-label="Areas of focus" className="mt-8">
            <ul className="flex flex-wrap gap-2">
              {services.map((service, index) => (
                <li key={service.id}>
                  <a
                    href={`#${service.id}`}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-white transition-colors hover:border-white/40 hover:bg-white/5"
                  >
                    <span className="text-gold">{index + 1}.</span>
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <ol className="mt-12">
            {services.map((service, index) => (
              <ServiceRow key={service.id} service={service} index={index} />
            ))}
          </ol>
        </Container>
      </Section>

      {/* Where we may connect */}
      <Section tone="sand" labelledBy="settings-title">
        <Container>
          <Reveal className="max-w-2xl">
            <Eyebrow>Where we may connect</Eyebrow>
            <Heading id="settings-title" className="mt-6 text-white">
              Meeting people in the places they already gather.
            </Heading>
          </Reveal>
          <ul className="mt-14 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-5">
            {settings.map((setting, index) => {
              const Icon = setting.icon;
              return (
                <Reveal
                  as="li"
                  key={setting.title}
                  delay={index * 70}
                  className="flex min-h-52 flex-col justify-between gap-8 bg-panel p-7 lg:min-h-64"
                >
                  <Icon aria-hidden="true" strokeWidth={1.25} className="size-9 text-white" />
                  <p className="font-sans font-semibold tracking-tight text-2xl leading-tight text-white">{setting.title}</p>
                </Reveal>
              );
            })}
          </ul>
        </Container>
      </Section>

      {/* Important note */}
      <Section tone="ivory" labelledBy="note-title" className="!py-16 sm:!py-20">
        <Container>
          <Reveal>
            <aside
              aria-labelledby="note-title"
              className="mx-auto flex max-w-4xl flex-col gap-6 border-l-2 border-gold bg-panel p-8 sm:flex-row sm:p-10"
            >
              <Info aria-hidden="true" strokeWidth={1.5} className="size-7 shrink-0 text-gold" />
              <div>
                <h2 id="note-title" className="font-sans font-semibold tracking-tight text-3xl text-white">
                  Important note
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-pretty text-mist/75">
                  Wellbeing activities are intended to complement, not replace, appropriate medical
                  assessment or treatment. The nature of each programme will be determined by its
                  purpose, setting, participant needs, safety considerations, and the expertise of
                  those involved.
                </p>
              </div>
            </aside>
          </Reveal>
        </Container>
      </Section>

      <CtaBand
        id="services-cta"
        title="Shaped together, with the right expertise."
        cta={{ label: "Explore Collaboration Opportunities", href: "/collaborate" }}
      >
        <p>
          Our programmes will be shaped by community needs, appropriate professional expertise, and
          the partnerships available.
        </p>
      </CtaBand>
    </>
  );
}
