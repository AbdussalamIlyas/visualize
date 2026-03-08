import type { GlossaryTerm, Source } from "@/lib/concept-schema";

export type JetEngineHotspot = {
  id: string;
  label: string;
  body: string;
  anchor: {
    x: number;
    y: number;
  };
  stageIds: string[];
};

export type JetEngineStage = {
  id: string;
  label: string;
  title: string;
  body: string;
  note: string;
  activeHotspotIds: string[];
  highlightedSegmentIds: string[];
  flowPreset: "intake" | "compression" | "combustion" | "turbine" | "exhaust";
};

export const jetEngineSources: Source[] = [
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

export const jetEngineGlossary: GlossaryTerm[] = [
  {
    id: "bypass-flow",
    term: "Bypass flow",
    definition:
      "Air that goes around the hot core instead of through the combustor and turbine.",
  },
  {
    id: "compressor",
    term: "Compressor",
    definition:
      "A series of rotating and fixed blades that squeeze the core airflow to a higher pressure.",
  },
  {
    id: "combustor",
    term: "Combustor",
    definition:
      "The chamber where fuel mixes with compressed air and burns.",
  },
  {
    id: "turbine",
    term: "Turbine",
    definition:
      "The rotating section that takes energy from hot gas and sends it forward through the shaft.",
  },
  {
    id: "nozzle",
    term: "Nozzle",
    definition:
      "The outlet that accelerates and directs the exhaust stream backward.",
  },
];

export const jetEngineHotspots: JetEngineHotspot[] = [
  {
    id: "fan",
    label: "Fan",
    body:
      "The fan starts the whole flow by pulling in air and sending most of it down the bypass path.",
    anchor: { x: 17, y: 50 },
    stageIds: ["intake", "exhaust"],
  },
  {
    id: "bypass",
    label: "Bypass duct",
    body:
      "Most air never reaches the flame tube and still makes thrust by flowing around the core.",
    anchor: { x: 41, y: 25 },
    stageIds: ["intake", "exhaust"],
  },
  {
    id: "compressor",
    label: "Compressor",
    body:
      "Compressor stages squeeze the core airflow so combustion starts from a much hotter, denser state.",
    anchor: { x: 35, y: 50 },
    stageIds: ["compression"],
  },
  {
    id: "combustor",
    label: "Combustor",
    body:
      "Fuel burns in the compressed air and creates a fast, high-energy gas stream.",
    anchor: { x: 52, y: 50 },
    stageIds: ["combustion"],
  },
  {
    id: "turbine",
    label: "Turbine",
    body:
      "The turbine steals part of the hot gas energy so the fan and compressor can keep spinning.",
    anchor: { x: 68, y: 50 },
    stageIds: ["turbine"],
  },
  {
    id: "shaft",
    label: "Shaft",
    body:
      "A rotating shaft links the back of the engine to the front, turning exhaust power into mechanical power.",
    anchor: { x: 52, y: 61 },
    stageIds: ["turbine"],
  },
  {
    id: "nozzle",
    label: "Nozzle",
    body:
      "The nozzle accelerates the remaining exhaust backward, and the engine gets an equal forward push.",
    anchor: { x: 86, y: 50 },
    stageIds: ["exhaust"],
  },
];

export const jetEngineStages: JetEngineStage[] = [
  {
    id: "intake",
    label: "Stage 1",
    title: "Air enters through the fan and splits into two paths.",
    body:
      "The fan pulls in a huge mass of air. Most of it bypasses the hot core and still contributes thrust.",
    note: "Bypass dominates thrust on airliners",
    activeHotspotIds: ["fan", "bypass"],
    highlightedSegmentIds: ["fan", "bypass-top", "bypass-bottom", "core-shell"],
    flowPreset: "intake",
  },
  {
    id: "compression",
    label: "Stage 2",
    title: "The core airflow gets squeezed before any fuel burns.",
    body:
      "Compressor stages raise the pressure and temperature of the core air. That makes the next burn much more effective.",
    note: "Still no flame",
    activeHotspotIds: ["compressor"],
    highlightedSegmentIds: ["compressor", "core-shell"],
    flowPreset: "compression",
  },
  {
    id: "combustion",
    label: "Stage 3",
    title: "Fuel burns in the compressed air and adds energy fast.",
    body:
      "The combustor injects fuel into the compressed flow. The result is a hot, expanding gas stream.",
    note: "Heat source for the full cycle",
    activeHotspotIds: ["combustor"],
    highlightedSegmentIds: ["combustor", "core-shell"],
    flowPreset: "combustion",
  },
  {
    id: "turbine",
    label: "Stage 4",
    title: "The turbine powers the front of the engine before gas leaves.",
    body:
      "Hot gas spins the turbine at the back. That rotation drives the shaft, which keeps the compressor and fan moving.",
    note: "Exhaust power keeps the front stages alive",
    activeHotspotIds: ["turbine", "shaft"],
    highlightedSegmentIds: ["turbine", "shaft", "core-shell"],
    flowPreset: "turbine",
  },
  {
    id: "exhaust",
    label: "Stage 5",
    title: "The remaining flow exits backward and the aircraft moves forward.",
    body:
      "The nozzle accelerates the hot core exhaust, while the bypass stream keeps rushing rearward around it. Pushing air backward creates forward thrust.",
    note: "Core exhaust and bypass flow leave together",
    activeHotspotIds: ["fan", "bypass", "nozzle"],
    highlightedSegmentIds: ["fan", "bypass-top", "bypass-bottom", "nozzle", "core-shell"],
    flowPreset: "exhaust",
  },
];

export const jetEngineConcept = {
  slug: "how-a-jet-engine-works",
  title: "How a Jet Engine Works",
  question: "How does a jet engine turn air, fuel, and heat into thrust?",
  summary:
    "A one-page visual explainer of a turbofan engine, from intake to exhaust.",
  estimatedMinutes: 4,
  tags: ["Flight", "Physics", "Mechanical Systems", "Interactive"],
  glossary: jetEngineGlossary,
  sources: jetEngineSources,
  stages: jetEngineStages,
  hotspots: jetEngineHotspots,
};
