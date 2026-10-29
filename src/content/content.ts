/**
 * Structured page copy taken from "Anvayam Vaidya Sala — Website Content".
 * Keep wording aligned with that source document when editing.
 */
import {
  BookOpen,
  Briefcase,
  Building2,
  Flower2,
  GraduationCap,
  HandHeart,
  Handshake,
  Leaf,
  Lightbulb,
  Map,
  Network,
  Scale,
  School,
  Sprout,
  Stethoscope,
  Tent,
  Trees,
  Users,
  UsersRound,
  Waypoints,
  Wind,
  type LucideIcon,
} from "lucide-react";
import type { PhotoKey } from "./photos";

export type Item = { title: string; body: string; icon: LucideIcon };

export const exploreLinks = [
  { title: "About Us", body: "Discover the vision and values behind our initiative.", href: "/about" },
  { title: "Services & Experiences", body: "Explore the areas we aim to develop.", href: "/services" },
  { title: "Collaborate & Grow", body: "Find ways to contribute or work together.", href: "/collaborate" },
  { title: "Connect With Us", body: "Start a conversation.", href: "/contact" },
] as const;

export const values: Item[] = [
  { title: "Compassion", body: "Treating people with empathy, dignity, and respect.", icon: HandHeart },
  {
    title: "Integration",
    body: "Encouraging dialogue between healthcare knowledge, traditional wisdom, and complementary wellbeing practices.",
    icon: Waypoints,
  },
  {
    title: "Accessibility",
    body: "Exploring ways to bring wellbeing education closer to everyday life.",
    icon: Map,
  },
  {
    title: "Collaboration",
    body: "Learning and working with qualified professionals, practitioners, institutions, and communities.",
    icon: Handshake,
  },
  {
    title: "Responsibility",
    body: "Respecting evidence, safety, ethical practice, and professional boundaries.",
    icon: Scale,
  },
];

export type Service = Item & { id: string; photo: PhotoKey; note?: string };

export const services: Service[] = [
  {
    id: "healthcare-awareness",
    title: "Healthcare awareness & education",
    body: "Preventive health awareness, community health education, lifestyle-related health topics, practical information on healthy habits, and sessions led by qualified healthcare professionals.",
    icon: Stethoscope,
    photo: "serviceHealth",
  },
  {
    id: "yoga-mindfulness",
    title: "Yoga, mindfulness & inner balance",
    body: "Yoga and mindful movement, breathing awareness, relaxation, guided meditation, and group sessions designed to support awareness and everyday balance.",
    icon: Wind,
    photo: "serviceYoga",
  },
  {
    id: "lifestyle-nutrition",
    title: "Lifestyle, nutrition & everyday wellbeing",
    body: "Educational sessions on healthy eating, daily routines, sleep and rest, self-care, stress awareness, and sustainable lifestyle habits.",
    note: "Individualised medical or dietary guidance should be provided only by appropriately qualified professionals.",
    icon: Sprout,
    photo: "serviceNutrition",
  },
  {
    id: "traditional-wisdom",
    title: "Traditional wisdom & integrative wellbeing",
    body: "Educational dialogue on traditional health systems, self-care traditions, yoga-based wellbeing, and complementary approaches, with respect for their appropriate applications and limitations.",
    icon: Leaf,
    photo: "serviceTraditional",
  },
  {
    id: "community-wellbeing",
    title: "Community & collective wellbeing",
    body: "Community health awareness, educational institution sessions, workplace wellbeing activities, group learning, and programmes shaped around local needs.",
    icon: UsersRound,
    photo: "serviceCommunity",
  },
  {
    id: "collaborative-programmes",
    title: "Collaborative programmes",
    body: "Workshops, educational events, knowledge-sharing sessions, and tailored initiatives developed with healthcare professionals, practitioners, institutions, and community partners.",
    icon: Network,
    photo: "serviceCollab",
  },
];

export const settings: Array<{ title: string; icon: LucideIcon }> = [
  { title: "Local and rural communities", icon: Trees },
  { title: "Schools, colleges, and other learning environments", icon: School },
  { title: "Workplaces and organisations", icon: Briefcase },
  { title: "Retreats and shared spaces", icon: Tent },
  { title: "Community gatherings and special events", icon: Users },
];

export const collaborators: Item[] = [
  {
    title: "Healthcare professionals",
    body: "Interested in health education, prevention, and community outreach.",
    icon: Stethoscope,
  },
  {
    title: "Qualified traditional health practitioners",
    body: "Who value responsible practice and respectful knowledge exchange.",
    icon: Leaf,
  },
  {
    title: "Yoga and mindfulness practitioners",
    body: "Interested in accessible, participant-centred experiences.",
    icon: Flower2,
  },
  {
    title: "Educational institutions",
    body: "Exploring health awareness and wellbeing education.",
    icon: GraduationCap,
  },
  {
    title: "Workplaces and organisations",
    body: "Considering appropriate wellbeing programmes for their communities or teams.",
    icon: Building2,
  },
  {
    title: "Community leaders and organisations",
    body: "Seeking to bring relevant experiences closer to the people they serve.",
    icon: Users,
  },
];

export const pathways: Item[] = [
  {
    title: "Community programmes",
    body: "Explore health education and suitable activities shaped around local needs.",
    icon: Trees,
  },
  {
    title: "Workshops and learning sessions",
    body: "Develop events on healthcare awareness, yoga, mindfulness, lifestyle, and related topics.",
    icon: BookOpen,
  },
  {
    title: "Institutional partnerships",
    body: "Discuss programmes suitable for schools, colleges, workplaces, and organisations.",
    icon: Building2,
  },
  {
    title: "Professional knowledge exchange",
    body: "Create opportunities for qualified professionals and practitioners to share perspectives.",
    icon: Waypoints,
  },
  {
    title: "Custom initiatives",
    body: "Explore ideas tailored to a community, organisation, or shared objective.",
    icon: Lightbulb,
  },
];
