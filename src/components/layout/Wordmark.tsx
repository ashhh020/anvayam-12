import Image from "next/image";
import Link from "next/link";
import emblem from "../../../public/brand/logo-emblem.png";

/** The tree-and-hands emblem from the official logo. */
export function Emblem({ className = "", priority = false }: { className?: string; priority?: boolean }) {
  return <Image src={emblem} alt="" priority={priority} sizes="96px" className={className} />;
}

export function Wordmark({ onClick, size = "md" }: { onClick?: () => void; size?: "md" | "lg" }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className="group flex items-center gap-3 text-white"
      aria-label="Anvayam Vaidya Sala — home"
    >
      <Emblem
        priority
        className={`h-auto shrink-0 transition-transform duration-500 group-hover:-translate-y-0.5 ${
          size === "lg" ? "w-16" : "w-11"
        }`}
      />
      <span className="flex flex-col leading-none">
        <span className={`font-bold tracking-[0.4em] ${size === "lg" ? "text-2xl" : "text-lg sm:text-xl"}`}>
          ANVAYAM
        </span>
        <span className="mt-1.5 text-[0.58rem] font-medium tracking-[0.5em] text-gold uppercase">
          Vaidya Sala
        </span>
      </span>
    </Link>
  );
}
