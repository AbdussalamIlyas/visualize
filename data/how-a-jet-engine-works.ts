import type {
  Concept,
  GlossaryTerm,
  PipelineExplainer,
  Source,
  Stage,
} from "@/lib/concept-schema";

const sources: Source[] = [
  {
    title: "NASA Glenn: Turbofan Engines",
    url: "https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/turbofan-engines/",
    note: "Overview of airflow, bypass, and thrust in a modern turbofan.",
  },
  {
    title: "NASA Glenn: Turbine Engines",
    url: "https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/turbine-engines/",
    note: "Background on the compressor, combustor, turbine, and nozzle sequence.",
  },
];

const glossary: GlossaryTerm[] = [
  {
    id: "bypass-flow",
    term: "Bypass flow",
    definition:
      "Air that goes around the hot core instead of through the combustor and turbine.",
    stageIds: ["intake", "exhaust"],
  },
  {
    id: "compressor",
    term: "Compressor",
    definition:
      "A series of rotating and fixed blades that squeeze the core airflow to a higher pressure.",
    stageIds: ["compression"],
  },
  {
    id: "combustor",
    term: "Combustor",
    definition:
      "The chamber where fuel mixes with compressed air and burns.",
    stageIds: ["combustion"],
  },
  {
    id: "turbine",
    term: "Turbine",
    definition:
      "The rotating section that takes energy from hot gas and sends it forward through the shaft.",
    stageIds: ["turbine"],
  },
  {
    id: "nozzle",
    term: "Nozzle",
    definition:
      "The outlet that accelerates and directs the exhaust stream backward.",
    stageIds: ["exhaust"],
  },
];

const stages: Stage[] = [
  {
    id: "intake",
    label: "Stage 1",
    goal: "Start with the fan and the two airflow paths it creates.",
    headline: "The fan pulls in air and splits most of it into bypass flow.",
    body:
      "A modern turbofan moves a huge mass of air. Most of that air bypasses the hot core and still contributes a large share of the final thrust.",
    actionLabel: "Start with airflow volume before focusing on the hot core.",
    visibleLayerIds: ["fan", "bypass", "core"],
    activeHotspotIds: ["fan", "bypass"],
    statePatch: {
      highlightedLayerIds: ["fan", "bypass"],
      note: "Jet engines on airliners make thrust by moving lots of air, not only by producing a hot flame.",
      metrics: [
        { label: "Largest flow", value: "bypass stream", tone: "accent" },
        { label: "Fan role", value: "move a huge air mass", tone: "neutral" },
      ],
    },
  },
  {
    id: "compression",
    label: "Stage 2",
    goal: "Show why the core air must be squeezed before fuel burns.",
    headline: "The compressor raises pressure so combustion can add energy efficiently.",
    body:
      "Only a smaller fraction of the intake air enters the core. Compressor stages squeeze that air into a hotter, denser state before any fuel is added.",
    actionLabel: "Follow the core stream as pressure builds before ignition.",
    visibleLayerIds: ["fan", "core", "compressor", "combustor"],
    activeHotspotIds: ["compressor"],
    statePatch: {
      highlightedLayerIds: ["compressor", "core"],
      note: "Compression is preparation. The engine is setting up the conditions for an effective burn.",
      metrics: [
        { label: "Still no flame", value: "pressure first", tone: "neutral" },
        { label: "Main change", value: "higher pressure and density", tone: "accent" },
      ],
    },
  },
  {
    id: "combustion",
    label: "Stage 3",
    goal: "Make the combustor feel like the heat source for the rest of the cycle.",
    headline: "Fuel burns in the compressed core air and creates a fast, hot gas stream.",
    body:
      "The combustor adds chemical energy quickly. The result is a high-energy flow that can drive the turbine and still leave with useful velocity.",
    actionLabel: "See where the engine adds heat and turns stored fuel into flow energy.",
    visibleLayerIds: ["compressor", "combustor", "turbine", "core"],
    activeHotspotIds: ["combustor"],
    statePatch: {
      highlightedLayerIds: ["combustor", "core"],
      note: "The combustor is the energy source, but the engine still needs the turbine and nozzle to turn that energy into sustained thrust.",
      metrics: [
        { label: "Adds", value: "heat and expanding gas", tone: "accent" },
        { label: "Core output", value: "high-energy flow", tone: "neutral" },
      ],
    },
  },
  {
    id: "turbine",
    label: "Stage 4",
    goal: "Explain why some exhaust energy is spent before the flow leaves the engine.",
    headline: "The turbine steals part of the hot flow to keep the fan and compressor spinning.",
    body:
      "The turbine extracts energy from the hot gas and sends that power forward through the shaft. Without that feedback loop, the compressor and fan would stop.",
    actionLabel: "Inspect the power loop that keeps the engine cycle self-sustaining.",
    visibleLayerIds: ["combustor", "turbine", "shaft", "fan", "compressor"],
    activeHotspotIds: ["turbine", "shaft"],
    statePatch: {
      highlightedLayerIds: ["turbine", "shaft", "fan"],
      note: "Not all exhaust energy becomes thrust immediately. Some of it is recycled to power the front stages.",
      metrics: [
        { label: "Turbine job", value: "take back rotational power", tone: "accent" },
        { label: "Keeps alive", value: "fan plus compressor", tone: "neutral" },
      ],
    },
  },
  {
    id: "exhaust",
    label: "Stage 5",
    goal: "Finish with the combined rearward flow that pushes the aircraft forward.",
    headline: "Bypass air and core exhaust both leave backward, producing forward thrust.",
    body:
      "The nozzle accelerates the remaining hot core flow while the bypass stream keeps rushing rearward around it. Push air backward and the aircraft gets an equal forward push.",
    actionLabel: "Compare the cool bypass stream with the hot core stream at the final exit.",
    visibleLayerIds: ["bypass", "nozzle", "thrust", "core", "fan"],
    activeHotspotIds: ["bypass", "nozzle"],
    statePatch: {
      highlightedLayerIds: ["bypass", "nozzle", "thrust"],
      outputLabel: "Rearward flow, forward thrust",
      note: "A turbofan's final thrust is the result of the full flow path, not a single hot exhaust tube acting alone.",
      metrics: [
        { label: "Final output", value: "accelerated rearward flow", tone: "accent" },
        { label: "Airliner emphasis", value: "bypass matters heavily", tone: "neutral" },
      ],
    },
  },
];

export const jetEngineExplainer = {
  id: "jet-engine-pipeline",
  type: "pipeline",
  sceneVariant: "jet-engine",
  title: "Air-to-thrust walkthrough",
  summary:
    "Follow intake, compression, combustion, turbine power recovery, and the final exhaust path that produces thrust.",
  intro:
    "Use this guided pipeline first. Each stage changes the flow path so you can see how the engine turns air, fuel, and heat into forward motion.",
  defaultStageId: stages[0].id,
  heroKicker: "3D guided pipeline",
  heroTitle: "Watch a turbofan turn airflow into thrust.",
  heroSummary:
    "The fan splits the air, the core compresses and heats it, the turbine recovers power, and the nozzle finishes the push.",
  layers: [
    {
      id: "fan",
      label: "Fan intake",
      shortLabel: "Fan",
      kind: "input",
      tone: "accent",
      position: { x: 8, y: 42, width: 16, height: 18 },
      description: "The front stage that pulls in a large mass of air and starts the split.",
    },
    {
      id: "bypass",
      label: "Bypass stream",
      shortLabel: "Bypass",
      kind: "process",
      tone: "secondary",
      position: { x: 28, y: 18, width: 28, height: 14 },
      description: "The larger airflow path that goes around the hot core and still adds thrust.",
    },
    {
      id: "core",
      label: "Core airflow",
      shortLabel: "Core",
      kind: "data",
      tone: "neutral",
      position: { x: 28, y: 54, width: 18, height: 14 },
      description: "The smaller stream that enters the compressor and combustor path.",
    },
    {
      id: "compressor",
      label: "Compressor",
      shortLabel: "Compress",
      kind: "process",
      tone: "accent",
      position: { x: 48, y: 52, width: 16, height: 18 },
      description: "The rotating stages that raise pressure before fuel burns.",
    },
    {
      id: "combustor",
      label: "Combustor",
      shortLabel: "Burn",
      kind: "process",
      tone: "warning",
      position: { x: 67, y: 50, width: 14, height: 22 },
      description: "The chamber where fuel burns in the compressed air and adds energy fast.",
    },
    {
      id: "turbine",
      label: "Turbine",
      shortLabel: "Turbine",
      kind: "model",
      tone: "accent",
      position: { x: 66, y: 18, width: 15, height: 18 },
      description: "The stage that recovers part of the hot flow to spin the shaft.",
    },
    {
      id: "shaft",
      label: "Drive shaft",
      shortLabel: "Shaft",
      kind: "chip",
      tone: "secondary",
      position: { x: 48, y: 78, width: 26, height: 10 },
      description: "The link that sends turbine power forward to the compressor and fan.",
    },
    {
      id: "nozzle",
      label: "Nozzle exit",
      shortLabel: "Nozzle",
      kind: "output",
      tone: "neutral",
      position: { x: 86, y: 50, width: 10, height: 18 },
      description: "The outlet that accelerates the remaining core exhaust backward.",
    },
    {
      id: "thrust",
      label: "Forward thrust",
      shortLabel: "Thrust",
      kind: "output",
      tone: "accent",
      position: { x: 86, y: 18, width: 10, height: 16 },
      description: "The aircraft's forward push created by sending large airflow backward.",
    },
  ],
  connections: [
    { id: "fan-bypass", sourceLayerId: "fan", targetLayerId: "bypass" },
    { id: "fan-core", sourceLayerId: "fan", targetLayerId: "core" },
    { id: "core-compressor", sourceLayerId: "core", targetLayerId: "compressor" },
    { id: "compressor-combustor", sourceLayerId: "compressor", targetLayerId: "combustor" },
    { id: "combustor-turbine", sourceLayerId: "combustor", targetLayerId: "turbine" },
    { id: "turbine-shaft", sourceLayerId: "turbine", targetLayerId: "shaft" },
    { id: "shaft-fan", sourceLayerId: "shaft", targetLayerId: "fan" },
    { id: "turbine-nozzle", sourceLayerId: "turbine", targetLayerId: "nozzle" },
    { id: "nozzle-thrust", sourceLayerId: "nozzle", targetLayerId: "thrust" },
    { id: "bypass-thrust", sourceLayerId: "bypass", targetLayerId: "thrust" },
  ],
  hotspots: [
    {
      id: "fan",
      anchor: { x: 16, y: 51 },
      label: "Fan",
      body:
        "The fan starts the whole flow and sends most of the air into the bypass path around the core.",
      media: "On large airliners, moving a huge amount of air matters more than making an extremely hot exhaust alone.",
      revealsInStages: ["intake"],
      tone: "accent",
    },
    {
      id: "bypass",
      anchor: { x: 41, y: 26 },
      label: "Bypass flow",
      body:
        "Most intake air never reaches the flame tube. It still produces thrust by being accelerated rearward around the engine core.",
      media: "That is why turbofans are efficient for airliners: a big cool stream can carry a large share of the thrust load.",
      revealsInStages: ["intake", "exhaust"],
      relatedGlossaryTermIds: ["bypass-flow"],
      tone: "secondary",
    },
    {
      id: "compressor",
      anchor: { x: 56, y: 62 },
      label: "Compressor",
      body:
        "Compressor stages squeeze the core air so the combustor starts from a much denser and hotter state.",
      media: "Better compression makes the burn far more effective than igniting low-pressure air directly.",
      revealsInStages: ["compression"],
      relatedGlossaryTermIds: ["compressor"],
      tone: "accent",
    },
    {
      id: "combustor",
      anchor: { x: 74, y: 61 },
      label: "Combustor",
      body:
        "Fuel burns in the compressed air and produces a high-energy gas stream that can drive the rest of the engine.",
      media: "The combustor adds energy quickly, but the flow still needs shaping and power recovery downstream.",
      revealsInStages: ["combustion"],
      relatedGlossaryTermIds: ["combustor"],
      tone: "warning",
    },
    {
      id: "turbine",
      anchor: { x: 74, y: 27 },
      label: "Turbine",
      body:
        "The turbine takes some energy back from the hot gas so the compressor and fan can keep turning.",
      media: "A jet engine is a loop: part of the exhaust power is reinvested before the rest leaves as thrust.",
      revealsInStages: ["turbine"],
      relatedGlossaryTermIds: ["turbine"],
      tone: "accent",
    },
    {
      id: "shaft",
      anchor: { x: 60, y: 83 },
      label: "Shaft",
      body:
        "A rotating shaft links the back of the engine to the front, turning turbine power into mechanical power for the compressor and fan.",
      media: "Without the shaft, the front stages would not keep running after startup.",
      revealsInStages: ["turbine"],
      tone: "secondary",
    },
    {
      id: "nozzle",
      anchor: { x: 90, y: 59 },
      label: "Nozzle",
      body:
        "The nozzle accelerates the remaining exhaust backward and helps turn the engine's flow energy into usable momentum change.",
      media: "The aircraft moves forward because the engine keeps pushing air backward.",
      revealsInStages: ["exhaust"],
      relatedGlossaryTermIds: ["nozzle"],
      tone: "neutral",
    },
  ],
  stages,
  sources,
  glossary,
} satisfies PipelineExplainer;

export const jetEngineConcept = {
  slug: "how-a-jet-engine-works",
  title: "How a Jet Engine Works",
  question: "How does a jet engine turn air, fuel, and heat into thrust?",
  summary:
    "A guided pipeline for intake, compression, combustion, turbine power recovery, and the final thrust-producing exhaust.",
  thumbnail: "Jet engine guided pipeline",
  estimatedMinutes: 4,
  tags: ["Flight", "Physics", "Mechanical Systems", "Interactive"],
  status: "published",
  defaultExplainerId: jetEngineExplainer.id,
  theme: {
    accent: "#9ac3ff",
    accentSecondary: "#5ee2c8",
    glow: "rgba(154, 195, 255, 0.18)",
    canvas:
      "radial-gradient(circle at 18% 18%, rgba(154,195,255,0.2), rgba(154,195,255,0) 34%), radial-gradient(circle at 82% 26%, rgba(94,226,200,0.14), rgba(94,226,200,0) 28%), linear-gradient(180deg, rgba(7,11,24,0.98), rgba(6,10,20,0.96))",
  },
  glossary,
  sources,
  explainers: [jetEngineExplainer],
} satisfies Concept;
