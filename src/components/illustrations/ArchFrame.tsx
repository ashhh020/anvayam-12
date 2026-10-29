import Image from "next/image";
import type { Photo } from "@/content/photos";
import { Reveal } from "@/components/ui/Reveal";
import { Landscape } from "./Landscape";

/**
 * An arch-shaped frame — a nod to traditional Indian architecture — that
 * holds either a photograph or the original landscape illustration.
 *
 * Photos come from `src/content/photos.ts`, which records each licence and
 * credit. Only use images that genuinely depict Anvayam activities when the
 * context implies it.
 */
export function ArchFrame({
  variant = "dawn",
  image,
  className = "",
  priority = false,
  sizes = "(min-width: 1024px) 40vw, 90vw",
}: {
  variant?: "dawn" | "day" | "dusk";
  image?: Photo;
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
            placeholder="blur"
            className="object-cover"
            style={image.position ? { objectPosition: image.position } : undefined}
          />
        ) : (
          <Landscape variant={variant} className="absolute inset-0 h-full w-full" />
        )}
      </Reveal>
    </div>
  );
}
