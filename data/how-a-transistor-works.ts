import type {
  Concept,
  GlossaryTerm,
  PipelineExplainer,
  Source,
  Stage,
} from "@/lib/concept-schema";

const sources: Source[] = [
  {
    title: "Britannica: transistor",
    url: "https://www.britannica.com/technology/transistor",
    note: "Plain-language overview of what transistors do inside electronic circuits.",
  },
  {
    title: "Khan Academy: Intro to semiconductors",
    url: "https://www.khanacademy.org/computing/computer-science/informationtheory/moderninfotheory/a/transistors",
    note: "Beginner-friendly explanation of transistor switching behavior in digital electronics.",
  },
];

const glossary: GlossaryTerm[] = [
  {
    id: "gate",
    term: "Gate",
    definition:
      "The control terminal that changes the electric field inside the transistor.",
    stageIds: ["off", "field"],
  },
  {
    id: "source-drain",
    term: "Source and drain",
    definition:
      "The two ends of the transistor channel where charge carriers enter and leave.",
    stageIds: ["channel", "switch"],
  },
  {
    id: "channel",
    term: "Channel",
    definition:
      "The conductive path that forms between source and drain when the gate creates the right field.",
    stageIds: ["channel", "switch"],
  },
  {
    id: "logic-gate",
    term: "Logic gate",
    definition:
      "A circuit arrangement that uses transistors as controllable switches to implement digital rules.",
    stageIds: ["switch"],
  },
];

const stages: Stage[] = [
  {
    id: "off",
    label: "Stage 1",
    goal: "Begin with the transistor in its non-conducting state.",
    headline: "With no gate signal, the source and drain stay disconnected.",
    body:
      "A field-effect transistor starts as a blocked path. Charge carriers cannot move freely between source and drain because the conductive channel is not formed yet.",
    actionLabel: "Start with the off state before any electric field appears.",
    visibleLayerIds: ["gate", "source", "drain", "channel"],
    activeHotspotIds: ["gate", "channel-off"],
    statePatch: {
      highlightedLayerIds: ["gate", "channel"],
      note: "Digital switching starts with a controlled barrier, not with free current by default.",
      metrics: [
        { label: "State", value: "off", tone: "warning" },
        { label: "Current path", value: "blocked", tone: "neutral" },
      ],
    },
  },
  {
    id: "field",
    label: "Stage 2",
    goal: "Show the gate changing the material through an electric field.",
    headline: "A gate voltage creates an electric field that reshapes the transistor interior.",
    body:
      "The gate does not push the main current through directly. Instead, it changes the electric conditions inside the semiconductor so a conductive path can appear.",
    actionLabel: "Focus on the control signal that prepares the channel.",
    visibleLayerIds: ["gate", "field", "channel", "source", "drain"],
    activeHotspotIds: ["gate", "field"],
    statePatch: {
      highlightedLayerIds: ["gate", "field"],
      note: "The transistor is controlled electrostatically. A small gate signal can decide whether a larger current path exists.",
      metrics: [
        { label: "Control input", value: "gate voltage", tone: "accent" },
        { label: "Direct effect", value: "electric field", tone: "neutral" },
      ],
    },
  },
  {
    id: "channel",
    label: "Stage 3",
    goal: "Make the channel formation the key transition in the mechanism.",
    headline: "The field creates a conductive channel between source and drain.",
    body:
      "Once the field is strong enough, carriers can move through a narrow path in the semiconductor. The transistor has effectively opened the route for current to flow.",
    actionLabel: "Watch the blocked path become a usable conductive channel.",
    visibleLayerIds: ["gate", "field", "channel", "source", "drain", "current"],
    activeHotspotIds: ["channel-on", "source-drain"],
    statePatch: {
      highlightedLayerIds: ["channel", "source", "drain"],
      note: "The key mechanism is not mechanical motion. The material itself becomes more conductive in the right region.",
      metrics: [
        { label: "Main transition", value: "channel forms", tone: "accent" },
        { label: "Result", value: "current can pass", tone: "neutral" },
      ],
    },
  },
  {
    id: "switch",
    label: "Stage 4",
    goal: "Connect the single transistor mechanism to digital computation.",
    headline: "That controllable current path becomes the switching primitive behind digital logic.",
    body:
      "Circuits combine huge numbers of transistors so tiny gate signals can turn currents on and off with precision. That is how chips implement memory, arithmetic, and logic.",
    actionLabel: "Finish with the transistor as a reusable on-off building block.",
    visibleLayerIds: ["gate", "source", "drain", "channel", "current", "logic"],
    activeHotspotIds: ["logic", "source-drain"],
    statePatch: {
      highlightedLayerIds: ["current", "logic"],
      outputLabel: "Controlled digital switch",
      note: "Modern computing depends on repeating this small switching behavior billions of times in a coordinated circuit.",
      metrics: [
        { label: "Circuit role", value: "switch current on or off", tone: "accent" },
        { label: "Scales to", value: "logic and memory", tone: "neutral" },
      ],
    },
  },
];

export const transistorExplainer = {
  id: "transistor-pipeline",
  type: "pipeline",
  sceneVariant: "transistor",
  title: "Gate-to-switch walkthrough",
  summary:
    "Follow how a gate field opens a channel, controls current, and becomes the switching unit behind digital logic.",
  intro:
    "Use this guided pipeline first. Each stage isolates one physical change so the transistor feels like a controllable current path instead of a mysterious chip symbol.",
  defaultStageId: stages[0].id,
  heroKicker: "3D guided pipeline",
  heroTitle: "Watch a transistor become a controllable switch.",
  heroSummary:
    "A gate signal changes the field, the channel forms, current starts flowing, and the same mechanism scales into digital logic.",
  layers: [
    {
      id: "gate",
      label: "Gate signal",
      shortLabel: "Gate",
      kind: "input",
      tone: "accent",
      position: { x: 16, y: 14, width: 18, height: 18 },
      description: "The control terminal that changes the electric field in the device.",
    },
    {
      id: "field",
      label: "Electric field",
      shortLabel: "Field",
      kind: "process",
      tone: "secondary",
      position: { x: 40, y: 18, width: 18, height: 16 },
      description: "The electrostatic effect caused by the gate voltage inside the semiconductor.",
    },
    {
      id: "source",
      label: "Source",
      shortLabel: "Source",
      kind: "input",
      tone: "neutral",
      position: { x: 12, y: 58, width: 16, height: 16 },
      description: "One end of the transistor where carriers enter the controlled path.",
    },
    {
      id: "channel",
      label: "Channel",
      shortLabel: "Channel",
      kind: "chip",
      tone: "accent",
      position: { x: 38, y: 54, width: 22, height: 20 },
      description: "The path that becomes conductive when the field is strong enough.",
    },
    {
      id: "drain",
      label: "Drain",
      shortLabel: "Drain",
      kind: "output",
      tone: "neutral",
      position: { x: 68, y: 58, width: 16, height: 16 },
      description: "The other end of the transistor where carriers leave the channel.",
    },
    {
      id: "current",
      label: "Current flow",
      shortLabel: "Flow",
      kind: "process",
      tone: "secondary",
      position: { x: 66, y: 22, width: 18, height: 18 },
      description: "The movement of charge once source and drain are connected through the channel.",
    },
    {
      id: "logic",
      label: "Digital logic",
      shortLabel: "Logic",
      kind: "output",
      tone: "accent",
      position: { x: 86, y: 38, width: 10, height: 22 },
      description: "The higher-level circuit behavior created by many switching transistors working together.",
    },
  ],
  connections: [
    { id: "gate-field", sourceLayerId: "gate", targetLayerId: "field" },
    { id: "field-channel", sourceLayerId: "field", targetLayerId: "channel" },
    { id: "source-channel", sourceLayerId: "source", targetLayerId: "channel" },
    { id: "channel-drain", sourceLayerId: "channel", targetLayerId: "drain" },
    { id: "channel-current", sourceLayerId: "channel", targetLayerId: "current" },
    { id: "current-logic", sourceLayerId: "current", targetLayerId: "logic" },
  ],
  hotspots: [
    {
      id: "gate",
      anchor: { x: 25, y: 24 },
      label: "Gate control",
      body:
        "The gate is the control input. It changes the electric field in the device without carrying the main source-to-drain current itself.",
      media: "That separation between control and current path is why transistors can amplify and switch efficiently.",
      revealsInStages: ["off", "field"],
      relatedGlossaryTermIds: ["gate"],
      tone: "accent",
    },
    {
      id: "channel-off",
      anchor: { x: 49, y: 64 },
      label: "Closed channel",
      body:
        "When the right field is missing, the conductive path does not exist yet and the transistor stays effectively off.",
      media: "Off does not mean broken. It means the current path is being intentionally suppressed.",
      revealsInStages: ["off"],
      tone: "warning",
    },
    {
      id: "field",
      anchor: { x: 49, y: 27 },
      label: "Electric field",
      body:
        "A voltage at the gate creates the field that rearranges charge inside the semiconductor and prepares the channel to conduct.",
      media: "The transistor works by changing material conditions, not by physically moving a switch arm.",
      revealsInStages: ["field"],
      tone: "secondary",
    },
    {
      id: "channel-on",
      anchor: { x: 49, y: 56 },
      label: "Open channel",
      body:
        "With the right field present, the channel becomes a usable path between source and drain and current can begin to flow.",
      media: "This is the mechanism behind the transistor's on state.",
      revealsInStages: ["channel"],
      relatedGlossaryTermIds: ["channel"],
      tone: "accent",
    },
    {
      id: "source-drain",
      anchor: { x: 73, y: 66 },
      label: "Source to drain",
      body:
        "Source and drain are the two ends of the controlled path. Once the channel exists, charge carriers can move between them.",
      media: "A transistor can act like a tiny current valve controlled by the gate.",
      revealsInStages: ["channel", "switch"],
      relatedGlossaryTermIds: ["source-drain"],
      tone: "neutral",
    },
    {
      id: "logic",
      anchor: { x: 90, y: 49 },
      label: "Logic building block",
      body:
        "Digital circuits combine many transistors so current paths represent logical states such as 0 and 1.",
      media: "Computation scales from the same basic switching action repeated at enormous density.",
      revealsInStages: ["switch"],
      relatedGlossaryTermIds: ["logic-gate"],
      tone: "accent",
    },
  ],
  stages,
  sources,
  glossary,
} satisfies PipelineExplainer;

export const transistorConcept = {
  slug: "how-a-transistor-works",
  title: "How a Transistor Works",
  question: "How does a tiny switch control current inside a chip?",
  summary:
    "A guided pipeline for gate control, field formation, channel creation, and the switching behavior behind digital logic.",
  thumbnail: "Transistor guided pipeline",
  estimatedMinutes: 3,
  tags: ["Electronics", "Semiconductors", "Interactive"],
  status: "published",
  defaultExplainerId: transistorExplainer.id,
  theme: {
    accent: "#7fd8ff",
    accentSecondary: "#65e8c7",
    glow: "rgba(127, 216, 255, 0.16)",
    canvas:
      "radial-gradient(circle at 18% 18%, rgba(127,216,255,0.22), rgba(127,216,255,0) 36%), radial-gradient(circle at 82% 20%, rgba(101,232,199,0.14), rgba(101,232,199,0) 32%), linear-gradient(180deg, rgba(7,11,28,0.98), rgba(6,8,21,0.96))",
  },
  glossary,
  sources,
  explainers: [transistorExplainer],
} satisfies Concept;
