/**
 * Central site configuration.
 *
 * Contact details, social links and the privacy policy URL are read from
 * environment variables so that nothing is hard-coded or invented. Anything
 * left unset is simply not rendered. See README.md → "Configuration".
 */

const clean = (value: string | undefined) => {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
};

const siteUrl = (
  clean(process.env.NEXT_PUBLIC_SITE_URL) ?? "http://localhost:3000"
).replace(/\/$/, "");

export type SocialLink = { label: string; href: string };

const socialCandidates: Array<{ label: string; href: string | undefined }> = [
  { label: "Instagram", href: clean(process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM) },
  { label: "Facebook", href: clean(process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK) },
  { label: "LinkedIn", href: clean(process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN) },
  { label: "YouTube", href: clean(process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE) },
  { label: "X", href: clean(process.env.NEXT_PUBLIC_SOCIAL_X) },
];

export const siteConfig = {
  name: "Anvayam Vaidya Sala",
  tagline: "Wellbeing, wherever life takes us.",
  guidingThought: "Sarve Santu Niramayah",
  guidingThoughtDevanagari: "सर्वे सन्तु निरामयाः",
  guidingThoughtMeaning: "May all be free from illness.",
  description:
    "Anvayam Vaidya Sala is a travelling, collaborative wellbeing initiative that seeks to bring health education and thoughtful wellbeing experiences closer to people in the places where they live, learn, work, and gather.",
  url: siteUrl,
  locale: "en_IN",
  contact: {
    /** Public email shown on the site. Unset → not displayed. */
    email: clean(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
    /** Public phone number shown on the site. Unset → not displayed. */
    phone: clean(process.env.NEXT_PUBLIC_CONTACT_PHONE),
  },
  /** Full privacy policy URL or path. Unset → footer link hidden. */
  privacyPolicyUrl: clean(process.env.NEXT_PUBLIC_PRIVACY_POLICY_URL),
  socials: socialCandidates.filter((s): s is SocialLink => Boolean(s.href)),
} as const;

export const navigation = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services & Experiences", href: "/services" },
  { label: "Collaborate & Grow", href: "/collaborate" },
  { label: "Connect With Us", href: "/contact" },
] as const;

export const collaborateCta = {
  label: "Let's Collaborate",
  href: "/contact?category=collaboration",
} as const;
