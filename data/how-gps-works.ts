import type {
  Concept,
  GlossaryTerm,
  PipelineExplainer,
  Source,
  Stage,
} from "@/lib/concept-schema";

const sources: Source[] = [
  {
    title: "GPS.gov: The Global Positioning System",
    url: "https://www.gps.gov/systems/gps/",
    note: "Official overview of the space, control, and user segments behind GPS.",
  },
  {
    title: "ESA Navipedia: An intuitive approach to GNSS positioning",
    url: "https://gssc.esa.int/navipedia/index.php/An_intuitive_approach_to_the_GNSS_positioning",
    note: "Explains signal timing, geometry, and why multiple satellites are required.",
  },
];

const glossary: GlossaryTerm[] = [
  {
    id: "gnss",
    term: "GNSS",
    definition:
      "Global Navigation Satellite System is the umbrella term for satellite navigation constellations such as GPS, Galileo, and others.",
    stageIds: ["broadcast"],
  },
  {
    id: "trilateration",
    term: "Trilateration",
    definition:
      "Finding a position by intersecting measured distances from multiple known locations.",
    stageIds: ["range", "solve"],
  },
  {
    id: "clock-bias",
    term: "Clock bias",
    definition:
      "The difference between the phone's imperfect internal clock and the much more accurate satellite timing.",
    stageIds: ["solve"],
  },
  {
    id: "multipath",
    term: "Multipath",
    definition:
      "Signal reflections from buildings or other surfaces that make the path look longer than it really is.",
    stageIds: ["correction"],
  },
];

const stages: Stage[] = [
  {
    id: "broadcast",
    label: "Stage 1",
    goal: "Start with the satellites and the timing information they continuously send.",
    headline: "Satellites broadcast where they are and exactly when the signal left.",
    body:
      "Each satellite carries precise time and orbit data. Your phone listens for several of those timed radio messages at once.",
    actionLabel: "Start with the broadcast before the phone knows its location.",
    visibleLayerIds: ["satellites", "signals", "receiver"],
    activeHotspotIds: ["timestamps", "receiver"],
    statePatch: {
      highlightedLayerIds: ["satellites", "signals"],
      note: "GPS begins as a timing problem. The phone first hears synchronized signals from known positions in space.",
      metrics: [
        { label: "Broadcast includes", value: "time plus orbit", tone: "accent" },
        { label: "Phone role", value: "listen first", tone: "neutral" },
      ],
    },
  },
  {
    id: "timing",
    label: "Stage 2",
    goal: "Translate arrival time differences into signal travel time.",
    headline: "The receiver compares when each signal arrived against when it was sent.",
    body:
      "Because radio waves move at the speed of light, even tiny timing differences correspond to large distance differences. The receiver turns those delays into travel-time estimates.",
    actionLabel: "Compare send time and arrival time to see where distance comes from.",
    visibleLayerIds: ["satellites", "signals", "receiver", "ranges"],
    activeHotspotIds: ["travel-time", "receiver"],
    statePatch: {
      highlightedLayerIds: ["receiver", "ranges"],
      note: "The receiver does not need a map yet. It first converts timing into rough range measurements.",
      metrics: [
        { label: "Core measurement", value: "signal travel time", tone: "accent" },
        { label: "Turns into", value: "rough distance", tone: "neutral" },
      ],
    },
  },
  {
    id: "range",
    label: "Stage 3",
    goal: "Make each timing result feel like a geometric constraint.",
    headline: "Each measured delay defines a sphere of possible positions.",
    body:
      "If a signal took a certain time to arrive, the receiver must be somewhere on a sphere around that satellite. Several spheres narrow the possibilities quickly.",
    actionLabel: "See how one timing measurement becomes a distance shell.",
    visibleLayerIds: ["receiver", "ranges", "solver"],
    activeHotspotIds: ["range-sphere", "trilateration"],
    statePatch: {
      highlightedLayerIds: ["ranges", "solver"],
      note: "One satellite only gives a huge set of possible locations. Several satellites start collapsing that uncertainty.",
      metrics: [
        { label: "One satellite", value: "many possible positions", tone: "warning" },
        { label: "Several satellites", value: "much tighter overlap", tone: "accent" },
      ],
    },
  },
  {
    id: "solve",
    label: "Stage 4",
    goal: "Show why four satellites are better than three for a real phone.",
    headline: "A fourth satellite lets the phone solve for position and its own clock error.",
    body:
      "Phones do not carry atomic clocks. A fourth signal gives the solver enough information to estimate latitude, longitude, altitude, and the phone's timing offset together.",
    actionLabel: "Use an extra satellite to fix both location and clock bias.",
    visibleLayerIds: ["satellites", "receiver", "ranges", "clock", "solver", "map"],
    activeHotspotIds: ["fourth-satellite", "clock-bias"],
    statePatch: {
      highlightedLayerIds: ["clock", "solver", "map"],
      outputLabel: "Best-fit position estimate",
      note: "The extra satellite is not just for redundancy. It helps correct the phone's own imperfect clock.",
      metrics: [
        { label: "Solves for", value: "position plus clock bias", tone: "accent" },
        { label: "Needs", value: "at least four signals", tone: "neutral" },
      ],
    },
  },
  {
    id: "correction",
    label: "Stage 5",
    goal: "Keep accuracy limits inside the main explanation, not after it.",
    headline: "Atmosphere, reflections, and blocked sky all affect how clean the fix is.",
    body:
      "The solver improves the estimate with more satellites and correction models, but trees, buildings, and reflected signals still distort the timing measurements.",
    actionLabel: "Compare an open-sky fix with a noisy urban one.",
    visibleLayerIds: ["satellites", "receiver", "solver", "map", "errors"],
    activeHotspotIds: ["atmosphere", "multipath"],
    statePatch: {
      highlightedLayerIds: ["solver", "map", "errors"],
      outputLabel: "Accurate outdoors, weaker in clutter",
      note: "Good GPS performance is a geometry-and-signal problem, not just a software problem.",
      metrics: [
        { label: "Improves with", value: "more open sky", tone: "accent" },
        { label: "Gets worse with", value: "reflections and blockage", tone: "warning" },
      ],
    },
  },
];

export const gpsExplainer = {
  id: "gps-pipeline",
  type: "pipeline",
  sceneVariant: "gps",
  title: "Signal-to-position walkthrough",
  summary:
    "Follow how timed satellite signals become ranges, then a best-fit location on the map.",
  intro:
    "Use this guided view first. Each stage turns timing data into a tighter geometric answer about where the receiver can be.",
  defaultStageId: stages[0].id,
  heroKicker: "3D guided pipeline",
  heroTitle: "Watch GPS turn timing into location.",
  heroSummary:
    "The receiver listens, measures delays, solves for distance and clock bias, then estimates where you are.",
  layers: [
    {
      id: "satellites",
      label: "Satellites",
      shortLabel: "Space",
      kind: "input",
      tone: "secondary",
      position: { x: 8, y: 13, width: 22, height: 18 },
      description: "Known positions in space broadcasting precise time and orbit data.",
    },
    {
      id: "signals",
      label: "Timed signals",
      shortLabel: "Signal",
      kind: "data",
      tone: "accent",
      position: { x: 35, y: 14, width: 18, height: 17 },
      description: "Radio messages that carry a send time and navigation data.",
    },
    {
      id: "receiver",
      label: "Phone receiver",
      shortLabel: "Receiver",
      kind: "input",
      tone: "neutral",
      position: { x: 10, y: 58, width: 20, height: 16 },
      description: "The device listening for several satellite signals at once.",
    },
    {
      id: "ranges",
      label: "Range estimates",
      shortLabel: "Ranges",
      kind: "process",
      tone: "accent",
      position: { x: 37, y: 56, width: 18, height: 18 },
      description: "Travel-time measurements converted into rough distances.",
    },
    {
      id: "clock",
      label: "Clock correction",
      shortLabel: "Clock",
      kind: "chip",
      tone: "secondary",
      position: { x: 58, y: 16, width: 15, height: 16 },
      description: "The solver's correction for the receiver's imperfect local time.",
    },
    {
      id: "solver",
      label: "Position solver",
      shortLabel: "Solve",
      kind: "model",
      tone: "accent",
      position: { x: 60, y: 55, width: 18, height: 20 },
      description: "The stage that fits the best position to all of the measured constraints.",
    },
    {
      id: "map",
      label: "Map location",
      shortLabel: "Fix",
      kind: "output",
      tone: "neutral",
      position: { x: 84, y: 43, width: 11, height: 22 },
      description: "The best-fit latitude, longitude, and altitude estimate.",
    },
    {
      id: "errors",
      label: "Accuracy limits",
      shortLabel: "Noise",
      kind: "warning",
      tone: "warning",
      position: { x: 70, y: 78, width: 24, height: 10 },
      description: "Signal distortions from blocked sky, atmosphere, or multipath reflections.",
    },
  ],
  connections: [
    { id: "satellites-signals", sourceLayerId: "satellites", targetLayerId: "signals" },
    { id: "signals-receiver", sourceLayerId: "signals", targetLayerId: "receiver" },
    { id: "receiver-ranges", sourceLayerId: "receiver", targetLayerId: "ranges" },
    { id: "ranges-solver", sourceLayerId: "ranges", targetLayerId: "solver" },
    { id: "clock-solver", sourceLayerId: "clock", targetLayerId: "solver" },
    { id: "solver-map", sourceLayerId: "solver", targetLayerId: "map" },
    { id: "solver-errors", sourceLayerId: "solver", targetLayerId: "errors" },
  ],
  hotspots: [
    {
      id: "timestamps",
      anchor: { x: 21, y: 22 },
      label: "Timestamps",
      body:
        "Each satellite message includes when it left the satellite and where that satellite expects to be.",
      media: "Without precise timing, the receiver could not turn signal delay into distance at all.",
      revealsInStages: ["broadcast"],
      tone: "secondary",
    },
    {
      id: "receiver",
      anchor: { x: 20, y: 66 },
      label: "Receiver",
      body:
        "Your phone mostly listens and solves. It does not ask the satellites to do custom work for it.",
      media: "The navigation burden lives in the receiver, not in a reply from space.",
      revealsInStages: ["broadcast", "timing"],
      tone: "neutral",
    },
    {
      id: "travel-time",
      anchor: { x: 46, y: 63 },
      label: "Travel time",
      body:
        "The receiver subtracts the send time from the arrival time. Because the signal travels at light speed, that difference implies a distance.",
      media: "Tiny timing errors still turn into large distance errors, which is why correction matters.",
      revealsInStages: ["timing"],
      tone: "accent",
    },
    {
      id: "range-sphere",
      anchor: { x: 44, y: 49 },
      label: "Distance sphere",
      body:
        "One delay measurement means the receiver could be anywhere on a sphere around that satellite.",
      media: "Location emerges from overlapping several of those spheres.",
      revealsInStages: ["range"],
      tone: "accent",
    },
    {
      id: "trilateration",
      anchor: { x: 57, y: 61 },
      label: "Trilateration",
      body:
        "The solver looks for the point that best fits all of the measured distances from multiple satellites.",
      media: "More geometry usually means a better constrained answer.",
      revealsInStages: ["range"],
      relatedGlossaryTermIds: ["trilateration"],
      tone: "secondary",
    },
    {
      id: "fourth-satellite",
      anchor: { x: 67, y: 61 },
      label: "Fourth satellite",
      body:
        "Three ideal ranges can narrow the geometry, but a fourth satellite helps solve the phone's clock error as well.",
      media: "Real devices need that extra information because their clocks are not perfectly synchronized.",
      revealsInStages: ["solve"],
      tone: "accent",
    },
    {
      id: "clock-bias",
      anchor: { x: 65, y: 24 },
      label: "Clock bias",
      body:
        "A tiny receiver timing offset makes every measured distance wrong by a similar amount. The solver estimates that offset and removes it.",
      media: "This is why GPS is not just geometry. It is geometry plus time correction.",
      revealsInStages: ["solve"],
      relatedGlossaryTermIds: ["clock-bias"],
      tone: "secondary",
    },
    {
      id: "atmosphere",
      anchor: { x: 79, y: 80 },
      label: "Atmospheric delay",
      body:
        "Signals slow slightly as they move through the atmosphere, which changes the travel-time estimate unless corrected.",
      media: "Receiver models and satellite data help reduce the error, but they do not remove every source of noise.",
      revealsInStages: ["correction"],
      tone: "warning",
    },
    {
      id: "multipath",
      anchor: { x: 90, y: 80 },
      label: "Multipath",
      body:
        "Reflected signals from buildings or other surfaces arrive later and can look like a longer path than the direct one.",
      media: "Dense city streets are difficult because the clean signal geometry gets distorted.",
      revealsInStages: ["correction"],
      relatedGlossaryTermIds: ["multipath"],
      tone: "warning",
    },
  ],
  stages,
  sources,
  glossary,
} satisfies PipelineExplainer;

export const gpsConcept = {
  slug: "how-gps-works",
  title: "How GPS Works",
  question: "How does a phone figure out where it is using satellites?",
  summary:
    "A signal-first walkthrough of timed broadcasts, range estimates, and the position solve behind a map pin.",
  thumbnail: "Satellite positioning pipeline",
  estimatedMinutes: 4,
  tags: ["Space", "Navigation", "Signals", "Interactive"],
  status: "published",
  defaultExplainerId: gpsExplainer.id,
  theme: {
    accent: "#8fd6ff",
    accentSecondary: "#69ead2",
    glow: "rgba(143, 214, 255, 0.18)",
    canvas:
      "radial-gradient(circle at 18% 18%, rgba(143,214,255,0.22), rgba(143,214,255,0) 36%), radial-gradient(circle at 82% 20%, rgba(105,234,210,0.12), rgba(105,234,210,0) 30%), linear-gradient(180deg, rgba(5,12,28,0.98), rgba(4,9,21,0.96))",
  },
  glossary,
  sources,
  explainers: [gpsExplainer],
} satisfies Concept;
