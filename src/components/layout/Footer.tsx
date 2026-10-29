import Link from "next/link";
import { Globe, Mail, Phone } from "lucide-react";
import { navigation, siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Layout";
import { KolamDivider } from "@/components/illustrations/Motifs";
import { CurrentYear } from "./CurrentYear";
import { Wordmark } from "./Wordmark";

export function Footer() {
  const { contact, socials, privacyPolicyUrl } = siteConfig;

  return (
    <footer className="relative border-t border-white/10 bg-ink-deep text-mist">
      <Container className="pt-20 pb-10">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Wordmark size="lg" />
            <p className="mt-6 font-serif text-2xl text-white/95 italic">{siteConfig.tagline}</p>
            <p className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-mist/65">
              {siteConfig.description}
            </p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-3 lg:col-start-7">
            <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-leaf">Explore</h2>
            <ul className="mt-5 space-y-3">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-underline text-mist/80 hover:text-mist">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-leaf">Connect</h2>
            <ul className="mt-5 space-y-3">
              <li>
                <Link href="/contact" className="link-underline text-mist/80 hover:text-mist">
                  Start a conversation
                </Link>
              </li>
              {contact.email && (
                <li>
                  <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-2 text-mist/80 hover:text-mist">
                    <Mail className="size-4 text-leaf" aria-hidden="true" />
                    <span className="link-underline">{contact.email}</span>
                  </a>
                </li>
              )}
              {contact.phone && (
                <li>
                  <a href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`} className="inline-flex items-center gap-2 text-mist/80 hover:text-mist">
                    <Phone className="size-4 text-leaf" aria-hidden="true" />
                    <span className="link-underline">{contact.phone}</span>
                  </a>
                </li>
              )}
              <li>
                <a href={siteConfig.url} className="inline-flex items-center gap-2 text-mist/80 hover:text-mist">
                  <Globe className="size-4 text-leaf" aria-hidden="true" />
                  <span className="link-underline">{siteConfig.displayUrl}</span>
                </a>
              </li>
            </ul>
            {socials.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2" aria-label="Social media">
                {socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline text-sm text-mist/80 hover:text-mist"
                    >
                      {social.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center gap-3 border-t border-white/10 pt-10 text-center">
          <KolamDivider light />
          <p className="font-sans font-semibold tracking-tight text-xl text-white/90">
            {siteConfig.guidingThought}
            <span className="text-mist/50"> — {siteConfig.guidingThoughtMeaning}</span>
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-3 text-sm text-mist/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CurrentYear /> {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/credits" className="link-underline hover:text-mist">
              Photo credits
            </Link>
            {privacyPolicyUrl && (
              <Link href={privacyPolicyUrl} className="link-underline hover:text-mist">
                Privacy Policy
              </Link>
            )}
          </div>
        </div>
      </Container>
    </footer>
  );
}
