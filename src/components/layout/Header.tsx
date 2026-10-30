"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { collaborateCta, navigation, siteConfig } from "@/config/site";
import { Wordmark } from "./Wordmark";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

/**
 * Minimal fixed navigation from the design: wordmark on the left, a fine
 * line and a "Menu" toggle on the right that opens a full-screen menu at
 * every screen size.
 */
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
      // Keep keyboard focus within the toggle and the open menu.
      if (event.key === "Tab" && menuRef.current && toggleRef.current) {
        const focusable = [toggleRef.current, ...menuRef.current.querySelectorAll<HTMLElement>("a[href]")];
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
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
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,padding] duration-500 ${
          scrolled && !open ? "bg-ink/80 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div
          className={`mx-auto flex w-full max-w-[1600px] items-center justify-between gap-6 px-5 transition-[padding] duration-500 sm:px-10 ${
            scrolled ? "py-4" : "py-6 sm:py-8"
          }`}
        >
          <Wordmark onClick={close} />

          <div className="flex items-center gap-6 sm:gap-8">
            <Link
              href={collaborateCta.href}
              onClick={close}
              className="hidden text-[10px] font-medium tracking-[0.3em] text-mist uppercase transition-colors hover:text-gold md:inline"
            >
              {collaborateCta.label}
            </Link>
            <span aria-hidden="true" className="hidden h-px w-12 bg-white/30 sm:block" />
            <button
              ref={toggleRef}
              type="button"
              className="min-h-11 px-1 text-[10px] font-medium tracking-[0.3em] text-mist uppercase transition-colors hover:text-gold"
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </header>

      <div
        id="site-menu"
        ref={menuRef}
        hidden={!open}
        className="fixed inset-0 z-40 overflow-y-auto bg-ink-deep/97 backdrop-blur-xl"
      >
        <div className="ambient" aria-hidden="true" />
        <nav
          aria-label="Main"
          className="mx-auto grid min-h-full max-w-[1600px] gap-12 px-5 pt-32 pb-12 sm:px-10 lg:grid-cols-12 lg:items-end"
        >
          <ol className="lg:col-span-8">
            {navigation.map((item, index) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href} className="border-b border-white/10">
                  <Link
                    ref={index === 0 ? firstLinkRef : undefined}
                    href={item.href}
                    onClick={close}
                    aria-current={active ? "page" : undefined}
                    className={`group flex items-baseline gap-6 py-5 transition-colors sm:py-6 ${
                      active ? "text-gold" : "text-white hover:text-gold"
                    }`}
                  >
                    <span className="w-8 shrink-0 text-xs tracking-[0.3em] text-gold">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ol>
          <div className="space-y-6 lg:col-span-3 lg:col-start-10">
            <Link
              href={collaborateCta.href}
              onClick={close}
              className="inline-flex items-center gap-4 text-xs tracking-[0.25em] text-gold uppercase hover:text-gold-soft"
            >
              {collaborateCta.label} <span aria-hidden="true">→</span>
            </Link>
            <p className="font-serif text-2xl text-mist/80 italic">{siteConfig.tagline}</p>
            <ul className="space-y-2 text-sm text-mist/70">
              {siteConfig.contact.email && (
                <li>
                  <a href={`mailto:${siteConfig.contact.email}`} className="break-all hover:text-gold">
                    {siteConfig.contact.email}
                  </a>
                </li>
              )}
              {siteConfig.contact.phone && (
                <li>
                  <a href={`tel:${siteConfig.contact.phone.replace(/[^\d+]/g, "")}`} className="hover:text-gold">
                    {siteConfig.contact.phone}
                  </a>
                </li>
              )}
            </ul>
            <p className="text-[10px] tracking-[0.4em] text-mist/50 uppercase">
              {siteConfig.guidingThought} — {siteConfig.guidingThoughtMeaning}
            </p>
          </div>
        </nav>
      </div>
    </>
  );
}
