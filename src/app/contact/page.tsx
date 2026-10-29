import { Suspense } from "react";
import { Mail, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";
import { Container, Section } from "@/components/ui/Layout";
import { PageIntro } from "@/components/ui/PageIntro";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { KolamDivider } from "@/components/illustrations/Motifs";

export const metadata = pageMetadata({
  title: "Connect With Us",
  description:
    "Every meaningful journey begins with a conversation. Get in touch with Anvayam Vaidya Sala about partnerships, community programmes, professional knowledge exchange, or general enquiries.",
  path: "/contact",
});

export default function ContactPage() {
  const { email, phone } = siteConfig.contact;

  return (
    <>
      <PageIntro eyebrow="Connect With Us" title="Every meaningful journey begins with a conversation.">
        <p>
          Whether you would like to discuss a partnership, explore a programme for your community,
          exchange professional knowledge, or simply learn more about Anvayam Vaidya Sala, we welcome
          your enquiry.
        </p>
      </PageIntro>

      <Section tone="white" labelledBy="form-title">
        <Container className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal className="lg:sticky lg:top-32">
              <h2 id="form-title" className="font-serif text-4xl leading-tight text-forest">
                Send us an enquiry
              </h2>
              <p className="mt-5 leading-relaxed text-charcoal/75">
                Fields marked <span aria-hidden="true" className="text-terracotta-deep">*</span>
                <span className="sr-only">with an asterisk</span> are required.
              </p>

              {(email || phone) && (
                <ul className="mt-10 space-y-4 border-t border-forest/15 pt-8">
                  {email && (
                    <li>
                      <a href={`mailto:${email}`} className="inline-flex items-center gap-3 text-forest hover:text-terracotta-deep">
                        <Mail aria-hidden="true" className="size-5 text-terracotta-deep" />
                        <span className="link-underline">{email}</span>
                      </a>
                    </li>
                  )}
                  {phone && (
                    <li>
                      <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="inline-flex items-center gap-3 text-forest hover:text-terracotta-deep">
                        <Phone aria-hidden="true" className="size-5 text-terracotta-deep" />
                        <span className="link-underline">{phone}</span>
                      </a>
                    </li>
                  )}
                </ul>
              )}
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <Suspense fallback={<div className="min-h-[40rem]" aria-hidden="true" />}>
              <ContactForm />
            </Suspense>
          </div>
        </Container>
      </Section>

      {/* Closing message */}
      <section aria-labelledby="closing-title" className="grain bg-sand py-24 sm:py-28 lg:py-32">
        <Container>
          <Reveal className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <p className="text-lg leading-relaxed text-pretty text-charcoal/85 sm:text-xl">
              Anvayam Vaidya Sala is a growing journey shaped by conversations, shared learning, and
              meaningful partnerships. We look forward to connecting with people who believe wellbeing
              can become a more natural, accessible, and compassionate part of everyday life.
            </p>
            <KolamDivider className="mt-12" />
            <h2 id="closing-title" className="mt-10 font-serif text-4xl tracking-[0.08em] text-forest uppercase sm:text-5xl">
              {siteConfig.name}
            </h2>
            <p className="mt-4 font-serif text-2xl text-charcoal/85 italic">{siteConfig.tagline}</p>
            <p className="mt-8 text-sm font-semibold tracking-[0.18em] text-terracotta-deep uppercase">
              {siteConfig.guidingThought} — {siteConfig.guidingThoughtMeaning}
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
