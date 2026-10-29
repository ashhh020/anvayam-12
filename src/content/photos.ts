/**
 * Photographs used on the site, with the attribution their licences require.
 * All are from Wikimedia Commons and are illustrative only — none depicts an
 * Anvayam Vaidya Sala programme. Credits are listed on /credits.
 */
import aboutTea from "../../public/images/about-tea.jpg";
import collabHills from "../../public/images/collab-hills.jpg";
import hero from "../../public/images/hero.jpg";
import heroMist from "../../public/images/hero-mist.jpg";
import introCommunity from "../../public/images/intro-community.jpg";
import serviceCollab from "../../public/images/service-collab.jpg";
import serviceCommunity from "../../public/images/service-community.jpg";
import serviceHealth from "../../public/images/service-health.jpg";
import serviceNutrition from "../../public/images/service-nutrition.jpg";
import serviceTraditional from "../../public/images/service-traditional.jpg";
import serviceYoga from "../../public/images/service-yoga.jpg";
import type { StaticImageData } from "next/image";

export type Photo = {
  src: StaticImageData;
  alt: string;
  title: string;
  author: string;
  license: string;
  licenseUrl: string;
  sourceUrl: string;
  /** CSS object-position for crops, e.g. "center 30%". */
  position?: string;
};

const BY2 = { license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0/" };
const BYSA2 = { license: "CC BY-SA 2.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/" };
const BYSA3 = { license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/" };
const BYSA4 = { license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/" };

const commons = (file: string) => `https://commons.wikimedia.org/wiki/File:${file}`;

export const photos = {
  hero: {
    src: hero,
    alt: "Morning light over tea-covered hills and mountain ranges near Munnar, Kerala",
    title: "Sunrise view over tea plantations and mountain ranges in Munnar",
    author: "LiteraryDP",
    ...BYSA4,
    sourceUrl: commons("Sunrise_view_over_tea_plantations_and_mountain_ranges_in_Munnar.jpg"),
    position: "60% center",
  },
  heroMist: {
    src: heroMist,
    alt: "Misty hills and a valley at sunrise seen from Kolukkumalai, Kerala",
    title: "Misty hills and valley reservoir at sunrise from Kolukkumalai, Kerala",
    author: "Musheer1999",
    ...BYSA4,
    sourceUrl: commons("Misty_hills_and_valley_reservoir_at_sunrise_from_Kolukkumalai,_Kerala.jpg"),
  },
  introCommunity: {
    src: introCommunity,
    alt: "A group of women sitting together and smiling during a community gathering",
    title: "India - Faces - Rural women driving their own change 1",
    author: "McKay Savage",
    ...BY2,
    sourceUrl: commons("India_-_Faces_-_Rural_women_driving_their_own_change_1_(2229752965).jpg"),
    position: "70% center",
  },
  aboutTea: {
    src: aboutTea,
    alt: "Tall trees standing among rows of tea bushes on a green hillside",
    title: "Munnar Chithirapuram",
    author: "Jinomunnar",
    ...BYSA4,
    sourceUrl: commons("Munnar_Chithirapuram.jpg"),
  },
  collabHills: {
    src: collabHills,
    alt: "Layers of blue mountain ridges in morning mist in the Western Ghats",
    title: "Sunrise over Agasthyakoodam Biological Park, Western Ghats",
    author: "Planemad",
    ...BYSA3,
    sourceUrl: commons("Sunrise_over_Agasthyakoodam_Biological_Park,_Western_Ghats.jpg"),
  },
  serviceHealth: {
    src: serviceHealth,
    alt: "A community health worker sharing an information leaflet with a woman and a young girl",
    title: "A community health worker conducting a survey in the Korail slum, Bangladesh",
    author: "DFID – UK Department for International Development",
    ...BY2,
    sourceUrl: commons("A_community_health_worker_conducting_a_survey_in_the_Korail_slum,_Bangladesh_(8630810827).jpg"),
  },
  serviceYoga: {
    src: serviceYoga,
    alt: "People practising yoga together on mats on a lawn under a wide sky",
    title: "Yoga Day at Victoria",
    author: "Ldas0973",
    ...BYSA4,
    sourceUrl: commons("Yoga_Day_at_Victoria.jpg"),
    position: "center 70%",
  },
  serviceNutrition: {
    src: serviceNutrition,
    alt: "Fresh vegetables neatly arranged at a market stall",
    title: "Gudalur fruit stand, India",
    author: "Prof. Mohamed Shareef",
    ...BYSA2,
    sourceUrl: commons("Gudalur_fruit_stand,_India.jpg"),
  },
  serviceTraditional: {
    src: serviceTraditional,
    alt: "Tins of dried roots, seeds and herbs used in traditional preparations",
    title: "Ayurvedic herbs 02",
    author: "Vis M",
    ...BYSA4,
    sourceUrl: commons("Ayurvedic_herbs_02.jpg"),
  },
  serviceCommunity: {
    src: serviceCommunity,
    alt: "Women and children seated together in a large outdoor community group",
    title: "India - Faces - Rural women driving their own change 2",
    author: "McKay Savage",
    ...BY2,
    sourceUrl: commons("India_-_Faces_-_Rural_women_driving_their_own_change_2_(2229763779).jpg"),
  },
  serviceCollab: {
    src: serviceCollab,
    alt: "Cupped hands holding soil with a small green seedling",
    title: "Life",
    author: "~crystalina~",
    ...BY2,
    sourceUrl: commons("Life_-_Flickr_-_~crystalina~.jpg"),
  },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;
