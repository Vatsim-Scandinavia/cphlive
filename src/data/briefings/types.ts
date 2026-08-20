import type { ImageMetadata } from "astro";

export type BriefingDirection = "departure" | "arrival";

export interface BriefingPreparationItem {
  title: string;
  description: string;
  icon: BriefingIconName;
}

export interface BriefingStep {
  id: string;
  title: string;
  action: string;
  details: string[];
  expectation?: string;
  watchOut?: string;
  facts?: BriefingFact[];
  callout?: string;
  link?: BriefingStepLink;
  icon: BriefingIconName;
}

export interface BriefingFact {
  label: string;
  value: string;
  description?: string;
}

export interface BriefingStepLink {
  label: string;
  href: string;
  variant: "button" | "text";
}

export interface BriefingResource {
  title: string;
  description: string;
  href: string;
  icon: BriefingIconName;
}

export interface BriefingChecklist {
  title: string;
  icon: BriefingIconName;
  items: string[];
}

export type BriefingIconName =
  | "aircraft"
  | "book"
  | "calendar"
  | "chart"
  | "checklist"
  | "clock"
  | "headset"
  | "parking"
  | "pushback"
  | "route"
  | "runway"
  | "weather";

export interface Briefing {
  direction: BriefingDirection;
  label: "Departure" | "Arrival";
  heroImage: ImageMetadata;
  heroImagePosition: string;
  tagline: string;
  switchLabel: string;
  switchHref: string;
  preparationTitle: string;
  preparationDescription: string;
  preparationDetails: string[];
  preparationWarning: string;
  preparationItems: BriefingPreparationItem[];
  journeyTitle: string;
  journeyDescription: string;
  steps: BriefingStep[];
  resources: BriefingResource[];
  checklists: BriefingChecklist[];
  closingTitle: string;
  closingDescription: string;
  continueLabel: string;
  continueHref: string;
}
