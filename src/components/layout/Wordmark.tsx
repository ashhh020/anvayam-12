import Image from "next/image";
import Link from "next/link";
import emblem from "../../../public/brand/logo-emblem.png";

/** The tree-and-hands emblem from the official logo. */
export function Emblem({ className = "", priority = false }: { className?: string; priority?: boolean }) {
  return <Image src={emblem} alt="" priority={priority} sizes="96px" className={className} />;
}

export function Wordmark({
  light = false,
  onClick,
}: {
  light?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className={`group flex items-center gap-3 ${light ? "text-ivory" : "text-forest"}`}
      aria-label="Anvayam Vaidya Sala — home"
    >
      {/* On dark backgrounds the green emblem sits on an ivory disc for contrast. */}
      <span
        className={`flex shrink-0 items-center justify-center transition-transform duration-500 group-hover:-translate-y-0.5 ${
          light ? "size-14 rounded-full bg-ivory p-2" : "size-12"
        }`}
      >
        <Emblem priority={!light} className="h-auto w-full" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-serif text-[1.4rem] font-semibold tracking-[0.08em] uppercase">Anvayam</span>
        <span
          className={`mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.34em] ${
            light ? "text-sage" : "text-forest/90"
          }`}
        >
          Vaidya Sala
        </span>
      </span>
    </Link>
  );
}
