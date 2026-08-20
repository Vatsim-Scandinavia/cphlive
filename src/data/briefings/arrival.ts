import arrivalImage from "../../assets/briefing-arrival-copenhagen-tower.png";
import { commonResources } from "./resources";
import type { Briefing } from "./types";

export const arrivalBriefing = {
  direction: "arrival",
  label: "Arrival",
  heroImage: arrivalImage,
  heroImagePosition: "44% center",
  tagline:
    "From first descent to the stand — prepare for a busy arrival into Copenhagen.",
  switchLabel: "Switch to departure",
  switchHref: "/briefings/departure",
  preparationTitle: "Before you descend",
  preparationDescription:
    "Have the information and tools you will need ready before starting your descent. Being prepared will help you avoid rushed changes and delays for yourself and others.",
  preparationDetails: [],
  preparationWarning:
    "Expect holds and delays during the busy hours of the event. Copenhagen is a busy airport and we will do our best to keep traffic moving, but you should be prepared for delays.",
  preparationItems: [
    {
      title: "Charts",
      description:
        "Be sure to have your charts ready and within reach. You can use either Navigraph Charts or the free charts provided by VATSIM Scandinavia.",
      icon: "chart",
    },
    {
      title: "Weather and ATIS",
      description:
        "Check the latest ATIS information for information about the weather conditions and runway to expect.",
      icon: "weather",
    },
    {
      title: "Arrival/Approach procedures",
      description:
        "Review the STAR and approach procedures for your arrival. Be ready to comply with all published restrictions and instructions.",
      icon: "route",
    },
  ],
  journeyTitle: "Your arrival, step by step",
  journeyDescription: "Follow the flow from top of descent to the stand.",
  steps: [
    {
      id: "star",
      title: "Arrival clearance",
      action:
        "Before the end of your route, ATC will normally clear you via a STAR and advise which approach to expect.",
      details: [
        "A STAR clearance is not a descent clearance. Maintain your cleared level until ATC gives you further descent. If you are approaching your top of descent without a descent clearance, report that you are ready for descent rather than descending on your own.",
      ],
      link: {
        label: "Review the EKCH arrival procedures",
        href: "https://wiki.vatsim-scandinavia.org/books/danish-airports-charts/page/ekch-copenhagenkastrup",
        variant: "text",
      },
      icon: "route",
    },
    {
      id: "sequence",
      title: "Expect holding",
      action:
        "Every Copenhagen STAR includes a published holding pattern, normally at its first or second point. During peak traffic, be ready to receive holding instructions before reaching the fix.",
      details: [
        "The published holding points are ROSBI for TESPI arrivals, LUGAS for TUDLO, OLPIB for MONAK, TIDVU for TIDVU and ERNOV for ERNOV. Use the current chart for the inbound course, turn direction and leg time.",
        "Enter and leave the hold only when cleared by ATC. If fuel or another operational limitation affects how long you can remain in the hold, inform the controller early.",
      ],
      link: {
        label: "Review the published holding patterns",
        href: "https://wiki.vatsim-scandinavia.org/link/896#bkmrk-holdings",
        variant: "text",
      },
      icon: "clock",
    },
    {
      id: "approach",
      title: "Fly the assigned approach",
      action:
        "Comply accurately with every assigned speed and heading, and advise Copenhagen Approach immediately if you are unable.",
      details: [
        "Continue along the RNAV arrival to the vector fix, then fly the specified downwind heading until Approach turns you toward final. Do not turn base or intercept the ILS on your own, even if you have not received another instruction.",
        "Leave the route discontinuity before final in place. Do not connect either transition directly to the final approach or ILS.",
      ],
      link: {
        label: "Review the EKCH STAR procedures",
        href: "https://wiki.vatsim-scandinavia.org/link/896#bkmrk-stars",
        variant: "text",
      },
      icon: "headset",
    },
    {
      id: "landing",
      title: "Land and vacate promptly",
      action:
        "After landing, vacate the runway as soon as safely possible. During busy periods, following traffic may be close behind and a delayed vacation can force it to go around.",
      details: [
        "Brief a likely exit before landing and use the first suitable exit you can make without excessive braking.",
        "Cross the runway holding point completely and continue until the entire aircraft is clear. Do not stop on the runway exit unless instructed, and advise Tower as soon as possible if you cannot vacate as expected.",
      ],
      icon: "runway",
    },
    {
      id: "parking",
      title: "Taxi to the stand",
      action:
        "Remain on Kastrup Tower until ATC instructs you to change frequency, then follow the assigned taxi route to your stand. Copenhagen uses standard taxi routes, but controllers may change them as traffic requires.",
      details: [
        "Keep the airport chart displayed until parked. Read back any hold-short or runway-crossing instruction, and stop and ask if the route is unclear. If your stand is occupied, advise ATC rather than choosing another stand on your own.",
      ],
      link: {
        label: "Review the Copenhagen taxi guidance",
        href: "https://wiki.vatsim-scandinavia.org/link/896#bkmrk-taxi",
        variant: "text",
      },
      icon: "parking",
    },
  ],
  resources: [
    commonResources.charts,
    commonResources.guide,
    commonResources.stands,
    {
      title: "Copenhagen Live home",
      description: "Return to event information and pilot resources.",
      href: "/#pilots",
      icon: "aircraft",
    },
  ],
  checklists: [
    {
      title: "Before descent",
      icon: "chart",
      items: [
        "ATIS and charts ready",
        "STAR restrictions reviewed",
        "Published hold available",
        "Approach brief complete",
      ],
    },
    {
      title: "From approach",
      icon: "runway",
      items: [
        "Continue to the vector fix",
        "Wait for the turn to final",
        "Remain on Tower after landing",
        "Follow the assigned taxi route",
      ],
    },
  ],
  closingTitle: "Welcome to Copenhagen",
  closingDescription:
    "Stay patient, listen carefully and ask whenever an instruction is unclear.",
  continueLabel: "Review the departure briefing",
  continueHref: "/briefings/departure",
} satisfies Briefing;
