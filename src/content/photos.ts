/**
 * Photographs used on the site, with the attribution their licences require.
 * All are from Wikimedia Commons and are illustrative only — none depicts an
 * Anvayam Vaidya Sala programme. Credits are listed on /credits.
 */
import aboutBanyan from "../../public/images/about-banyan.jpg";
import collabLeaf from "../../public/images/collab-leaf.jpg";
import introLamp from "../../public/images/intro-lamp.jpg";
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

const CC0 = { license: "CC0 1.0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/" };
const BYSA25 = { license: "CC BY-SA 2.5", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.5/" };
const BYSA4 = { license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/" };

const commons = (file: string) => `https://commons.wikimedia.org/wiki/File:${file}`;

export const photos = {
  introLamp: {
    src: introLamp,
    alt: "A single clay oil lamp glowing in the dark beside an earthen wall",
    title: "Diwali Lamp village",
    author: "Nilimajhapate",
    ...BYSA4,
    sourceUrl: commons("Diwali_Lamp_village.jpg"),
    position: "70% center",
  },
  aboutBanyan: {
    src: aboutBanyan,
    alt: "The many interwoven aerial roots of a large banyan tree",
    title: "Banyan tree 2024",
    author: "Unnikannan7",
    ...BYSA4,
    sourceUrl: commons("Banyan_tree_2024.jpg"),
  },
  collabLeaf: {
    src: collabLeaf,
    alt: "A young holy basil plant growing against a mossy stone wall",
    title: "Ocimum tenuiflorum 5725",
    author: "Vengolis",
    ...BYSA4,
    sourceUrl: commons("Ocimum_tenuiflorum_5725.jpg"),
  },
  serviceHealth: {
    src: serviceHealth,
    alt: "A stethoscope resting on a keyboard beside a printed heart-rhythm strip",
    title: "Instrumentos medicos de uso en Cardiología",
    author: "Ivan2010",
    ...BYSA4,
    sourceUrl: commons("Instrumentos_medicos_de_uso_en_Cardiolog%C3%ADa.jpg"),
  },
  serviceYoga: {
    src: serviceYoga,
    alt: "Silhouette of a person holding out an open palm towards the setting sun over hills",
    title: "Yoga, not just an excercise",
    author: "Akshiseo",
    ...BYSA4,
    sourceUrl: commons("Yoga,_not_just_an_excercise.jpg"),
    position: "40% center",
  },
  serviceNutrition: {
    src: serviceNutrition,
    alt: "A close view of pale millet grains",
    title: "MILLET grains India",
    author: "Nandhinikandhasamy",
    ...BYSA4,
    sourceUrl: commons("MILLET_grains_India.jpg"),
  },
  serviceTraditional: {
    src: serviceTraditional,
    alt: "Holy basil (tulsi) leaves and flower spikes against a dark green background",
    title: "Thulasi2",
    author: "Challiyan at Malayalam Wikipedia",
    ...BYSA25,
    sourceUrl: commons("Thulasi2.jpg"),
  },
  serviceCommunity: {
    src: serviceCommunity,
    alt: "Rows of small oil lamps glowing together",
    title: "Diyas image",
    author: "Harman015",
    ...BYSA4,
    sourceUrl: commons("Diyas_image.jpg"),
  },
  serviceCollab: {
    src: serviceCollab,
    alt: "Drops of dew resting on a dark green leaf",
    title: "Dew on a dark green leaf",
    author: "Dan Carlson",
    ...CC0,
    sourceUrl: commons("Dew_on_a_dark_green_leaf_(Unsplash).jpg"),
  },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;
