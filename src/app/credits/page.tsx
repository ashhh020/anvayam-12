import { photos, type Photo } from "@/content/photos";
import { pageMetadata } from "@/lib/metadata";
import { Container, Section } from "@/components/ui/Layout";
import { PageIntro } from "@/components/ui/PageIntro";

export const metadata = pageMetadata({
  title: "Photo Credits",
  description: "Credits and licences for the photographs used on the Anvayam Vaidya Sala website.",
  path: "/credits",
});

export default function CreditsPage() {
  const list: Photo[] = Object.values(photos);

  return (
    <>
      <PageIntro eyebrow="Photo credits" title="With thanks to the photographers.">
        <p>
          The photographs on this website are illustrative. They come from Wikimedia Commons under
          Creative Commons licences and do not depict Anvayam Vaidya Sala programmes, participants or
          partners.
        </p>
      </PageIntro>

      <Section tone="white" labelledBy="credits-title" className="!pt-16">
        <Container>
          <h2 id="credits-title" className="sr-only">
            Photographs and licences
          </h2>
          <ul className="divide-y divide-white/10 border-y border-white/10">
            {list.map((photo) => (
              <li key={photo.sourceUrl} className="grid gap-2 py-6 sm:grid-cols-12 sm:gap-8">
                <p className="font-sans font-semibold tracking-tight text-xl text-white sm:col-span-6">
                  <a href={photo.sourceUrl} target="_blank" rel="noopener noreferrer" className="link-underline">
                    {photo.title}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </p>
                <p className="text-mist/70 sm:col-span-3">by {photo.author}</p>
                <p className="sm:col-span-3">
                  <a
                    href={photo.licenseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold underline underline-offset-4"
                  >
                    {photo.license}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-mist/55">
            Images have been resized and cropped for display. Photographs licensed under CC BY-SA
            remain available under the same licence. Logo © Anvayam Vaidya
            Sala.
          </p>
        </Container>
      </Section>
    </>
  );
}
