import { arrivalBriefing } from "./arrival";
import { departureBriefing } from "./departure";
import type { Briefing, BriefingDirection } from "./types";

export type * from "./types";
export { arrivalBriefing, departureBriefing };

export const briefings = {
  departure: departureBriefing,
  arrival: arrivalBriefing,
} satisfies Record<BriefingDirection, Briefing>;
