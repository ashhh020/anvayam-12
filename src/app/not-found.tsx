import { ButtonLink } from "@/components/ui/Button";
import { Container, Eyebrow } from "@/components/ui/Layout";
import { KolamDivider } from "@/components/illustrations/Motifs";

export default function NotFound() {
  return (
    <section className="grain bg-ivory py-28 sm:py-36">
      <Container className="flex flex-col items-center text-center">
        <Eyebrow>Page not found</Eyebrow>
        <h1 className="mt-6 max-w-2xl font-serif text-5xl leading-tight text-balance text-forest sm:text-6xl">
          This path doesn’t lead anywhere — yet.
        </h1>
        <KolamDivider className="mt-10" />
        <p className="mt-8 max-w-lg text-lg text-charcoal/80">
          The page you were looking for may have moved. Let’s find our way back.
        </p>
        <ButtonLink href="/" arrow className="mt-10">
          Return home
        </ButtonLink>
      </Container>
    </section>
  );
}
