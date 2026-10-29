"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { collaborateCta, navigation, siteConfig } from "@/config/site";
import { ButtonLink } from "@/components/ui/Button";
import { Wordmark } from "./Wordmark";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu if the viewport grows to the desktop layout.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1280px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      // Keep keyboard focus inside the header while the menu covers the page.
      if (event.key === "Tab" && headerRef.current) {
        const focusable = [...headerRef.current.querySelectorAll<HTMLElement>("a[href], button")].filter(
          (el) => el.offsetParent !== null,
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 transition-[background-color,border-color,box-shadow] duration-500 ${
        // backdrop-filter would become the containing block for the fixed
        // mobile menu, so it is only applied while the menu is closed.
        open
          ? "border-b border-forest/10 bg-ivory"
          : scrolled
            ? "border-b border-forest/10 bg-ivory/95 backdrop-blur-md"
            : "border-b border-transparent bg-ivory"
      }`}
    >
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
        <Wordmark onClick={close} />

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-8">
            {navigation.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`link-underline py-1 text-[0.92rem] transition-colors ${
                      active ? "text-forest font-medium" : "text-charcoal/80 hover:text-forest"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <ButtonLink
            href={collaborateCta.href}
            className="whitespace-nowrap px-5 py-2.5 text-sm max-sm:hidden"
          >
            {collaborateCta.label}
          </ButtonLink>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-forest/20 text-forest transition-colors hover:bg-forest/5 xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 top-20 bottom-0 overflow-y-auto bg-ivory xl:hidden"
      >
        <nav aria-label="Mobile" className="mx-auto flex min-h-full max-w-7xl flex-col px-5 pt-6 pb-10 sm:px-8">
          <ul className="divide-y divide-forest/10 border-y border-forest/10">
            {navigation.map((item, index) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    ref={index === 0 ? firstLinkRef : undefined}
                    href={item.href}
                    onClick={close}
                    aria-current={active ? "page" : undefined}
                    className="flex items-baseline gap-4 py-5 font-serif text-3xl text-forest transition-colors hover:text-terracotta-deep"
                  >
                    <span className="font-sans text-xs tracking-widest text-terracotta-deep">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className={active ? "underline decoration-terracotta decoration-1 underline-offset-8" : ""}>
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <ButtonLink href={collaborateCta.href} onClick={close} arrow className="mt-8 w-full sm:w-auto sm:self-start">
            {collaborateCta.label}
          </ButtonLink>
          <p className="mt-auto pt-12 font-serif text-xl text-forest/80 italic">{siteConfig.tagline}</p>
        </nav>
      </div>
    </header>
  );
}
