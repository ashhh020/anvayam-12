import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { Landscape } from "./Landscape";

/**
 * An arch-shaped frame — a nod to traditional Indian architecture — that
 * holds either a photograph or the original landscape illustration.
 *
 * To use genuine photography, place a licensed image in /public/images and
 * pass `image={{ src: "/images/...", alt: "..." }}`. Only use images that
 * genuinely depict Anvayam activities when the context implies it.
 */
export function ArchFrame({
  variant = "dawn",
  image,
  className = "",
  priority = false,
  sizes = "(min-width: 1024px) 40vw, 90vw",
}: {
  variant?: "dawn" | "day" | "dusk";
  image?: { src: string; alt: string };
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <div
        aria-hidden="true"
        className="absolute -inset-3 rounded-t-full border border-terracotta/40 sm:-inset-4"
      />
      <Reveal
        variant="image"
        className="relative aspect-[4/5] overflow-hidden rounded-t-full bg-sand"
      >
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover"
          />
        ) : (
          <Landscape variant={variant} className="absolute inset-0 h-full w-full" />
        )}
      </Reveal>
    </div>
  );
}
