import departureImage from "../../assets/briefing-departure-copenhagen-apron.jpg";
import { commonResources } from "./resources";
import type { Briefing } from "./types";

export const departureBriefing = {
  direction: "departure",
  label: "Departure",
  heroImage: departureImage,
  heroImagePosition: "52% center",
  tagline:
    "From stand to airborne — everything you need for a smooth departure from Copenhagen.",
  switchLabel: "Switch to arrival",
  switchHref: "/briefings/arrival",
  preparationTitle: "Before you connect",
  preparationDescription:
    "Have the information and tools you will need ready before joining the network. Having these at hand will help you get a smooth start and avoid delays for yourself and others.",
  preparationDetails: [],
  preparationWarning: "",
  preparationItems: [
    {
      title: "Charts",
      description:
        "Be sure to have your charts ready and within reach. You can use either Navigraph Charts or the free charts provided by VATSIM Scandinavia.",
      icon: "chart",
    },
    {
      title: "Stand selection",
      description:
        "Use tools like VATSIM Radar or similar to find an available stand that suits the aircraft you intend to fly. Avoid stands that are already occupied by other flights or that do not fit your aircraft.",
      icon: "parking",
    },
    {
      title: "Flight plan and timing",
      description:
        "File your flight plan in advance. We recommend using SimBrief or a similar tool to generate a realistic flight plan. Make sure your EOBT is accurate and that you are ready to depart within five minutes of your TOBT.",
      icon: "clock",
    },
    {
      title: "Know your aircraft",
      description:
        "Be sure to familiarize yourself with the aircraft you intend to fly. You must be able to adhere to instructions given by ATC. If you are in doubt, choose another aircraft.",
      icon: "aircraft",
    },
  ],
  journeyTitle: "Your departure, step by step",
  journeyDescription: "Follow the flow from ready time to airborne.",
  steps: [
    {
      id: "clearance",
      title: "Receive your IFR/VFR clearance",
      action:
        "Prior to requesting your clearance, ensure you have the latest ATIS information. The ATIS provides information that is essential for your flight out of Copenhagen. Requesting your clearance can be done via either the delivery frequency or by PDC, if your aircraft supports it.",
      details: [
        "The delivery frequency is expected to be busy during the event. We therefore highly recommend that you use PDC to request your clearance when possible.",
      ],
      facts: [
        { label: "Kastrup Delivery", value: "119.905 MHz" },
        { label: "PDC logon code", value: "EKCH" },
      ],
      icon: "checklist",
    },
    {
      id: "ready-time",
      title: "Confirm when you will be ready",
      action:
        "Copenhagen uses Collaborative Decision Making (CDM) to build an efficient departure sequence. We use the Estimated Off-Block Time (EOBT) that you have filed in your flight plan to determine when your flight is expected to be ready.",
      details: [
        "We highly encourage that you confirm your Target Off-Block Time (TOBT) as soon as possible, as this decides your position in the departure sequence and is used to calculate your Target Start-up Approval Time (TSAT).",
      ],
      callout:
        "You can expect to receive your push/start-up clearance ±5 minutes of your TSAT. Missing this window may result in a delay for your flight as it puts you at the back of the sequence.",
      link: {
        label: "Confirm your TOBT",
        href: "https://vats.im/vdgs",
        variant: "button",
      },
      icon: "clock",
    },
    {
      id: "startup-queue",
      title: "Wait for startup approval",
      action:
        "Even when you are fully ready, expect a queue for startup and pushback. ATC combines your confirmed TOBT with runway capacity and the developing traffic sequence.",
      details: [
        "Remain on frequency and do not start or push until the controller clears you to do so.",
      ],
      link: {
        label: "Monitor your TSAT time",
        href: "https://vats.im/cdm",
        variant: "text",
      },
      icon: "pushback",
    },
    {
      id: "release-point",
      title: "Push to a release point",
      action:
        "In Copenhagen you can expect to be instructed to push to a release point. A release point is a marked location or point on the taxiway to which aircraft are pushed. These are used to keep the taxiways clear and to avoid congestion on the apron.",
      details: [
        "VATSIM Scandinavia has published a GSX profile that includes the release points. Please advise ATC if you are unable to perform the customized pushback.",
      ],
      icon: "pushback",
    },
    {
      id: "taxi",
      title: "Taxiing to the runway",
      action:
        "The layout of Copenhagen is old and complex. Familiarize yourself with the layout and avoid causing delays to yourself or others by taxiing the wrong way. You can find the standard taxi routes on the VATSIM Scandinavia Wiki.",
      details: [
        "You should expect to be given a holding point when you approach the runway. This is done to allow ATC to sequence the departures as efficiently as possible by making use of wake turbulence and SID separation.",
      ],
      link: {
        label: "View the standard taxi routes",
        href: "https://wiki.vatsim-scandinavia.org/books/danish-airports-charts/page/ekch-copenhagenkastrup",
        variant: "text",
      },
      icon: "route",
    },
    {
      id: "airborne",
      title: "Contact Kastrup Departure",
      action:
        "You are now airborne and on your way. In Copenhagen we simulate automatic handovers to Kastrup Departure. You should contact the appropriate departure frequency, unless ATC instructs you otherwise. Please refer to your charts for the correct frequency.",
      details: [],
      facts: [
        {
          label: "Kastrup Departure",
          value: "120.255 / 124.980 MHz",
          description:
            "Use the frequency listed for your SID on the current chart.",
        },
      ],
      icon: "aircraft",
    },
  ],
  resources: [
    commonResources.charts,
    {
      title: "Copenhagen CDM",
      description: "Confirm your TOBT before departure.",
      href: "https://vats.im/cdm",
      icon: "clock",
    },
    commonResources.stands,
    commonResources.guide,
  ],
  checklists: [
    {
      title: "Before moving",
      icon: "route",
      items: [
        "Realistic EOBT filed",
        "TOBT confirmed",
        "ATIS and charts ready",
        "Clearance read back",
      ],
    },
    {
      title: "On the move",
      icon: "pushback",
      items: [
        "Push only when approved",
        "Follow the assigned taxi route",
        "Line up is not takeoff clearance",
        "Remain on frequency",
      ],
    },
  ],
  closingTitle: "Ready for Copenhagen?",
  closingDescription:
    "If you are unsure at any point, ask ATC. We are here to help.",
  continueLabel: "Continue to arrival briefing",
  continueHref: "/briefings/arrival",
} satisfies Briefing;
