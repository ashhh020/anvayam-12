import Image from "next/image";
import type { Service } from "@/content/content";
import { photos, type Photo } from "@/content/photos";
import { Reveal } from "@/components/ui/Reveal";

/** One focus area on the Services page; alternates sides on large screens. */
export function ServiceRow({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon;
  const flipped = index % 2 === 1;
  const titleId = `${service.id}-title`;
  const photo: Photo = photos[service.photo];

  return (
    <li
      id={service.id}
      aria-labelledby={titleId}
      className="grid scroll-mt-28 items-center gap-10 border-b border-forest/15 py-14 last:border-b-0 sm:py-16 md:grid-cols-12 md:gap-12"
    >
      <Reveal
        variant="image"
        className={`relative aspect-[5/4] overflow-hidden rounded-t-full bg-sand md:col-span-5 ${
          flipped ? "md:order-2 md:col-start-8" : ""
        }`}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(min-width: 768px) 40vw, 92vw"
          placeholder="blur"
          className="object-cover"
          style={{ objectPosition: photo.position }}
        />
        <span className="absolute bottom-5 left-5 inline-flex size-14 items-center justify-center rounded-full bg-ivory text-forest shadow-sm">
          <Icon aria-hidden="true" strokeWidth={1.4} className="size-6" />
        </span>
      </Reveal>

      <Reveal
        delay={100}
        className={`md:col-span-6 ${flipped ? "md:order-1 md:col-start-1" : "md:col-start-7"}`}
      >
        <p className="font-serif text-lg text-terracotta-deep">{String(index + 1).padStart(2, "0")}</p>
        <h3 id={titleId} className="mt-3 font-serif text-3xl leading-tight text-balance text-forest sm:text-4xl">
          {service.title}
        </h3>
        <p className="mt-5 text-lg leading-relaxed text-pretty text-charcoal/80">{service.body}</p>
        {service.note && (
          <p className="mt-5 border-l-2 border-sage pl-4 text-[0.95rem] leading-relaxed text-charcoal/75">
            {service.note}
          </p>
        )}
      </Reveal>
    </li>
  );
}
