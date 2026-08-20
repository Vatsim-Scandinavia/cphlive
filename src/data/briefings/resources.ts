import type { BriefingResource } from "./types";

export const commonResources = {
  charts: {
    title: "Current Naviair charts",
    description: "Use the latest AIRAC material for EKCH.",
    href: "https://aim.naviair.dk/en/charts/",
    icon: "chart",
  },
  stands: {
    title: "Available stands",
    description: "Check that your stand is free before connecting.",
    href: "https://stands.vatsim-scandinavia.org/",
    icon: "parking",
  },
  guide: {
    title: "EKCH airport guide",
    description: "Review local parking, taxi and runway guidance.",
    href: "https://wiki.vatsim-scandinavia.org/books/danish-airports-charts/page/ekch-copenhagenkastrup",
    icon: "book",
  },
} satisfies Record<string, BriefingResource>;
