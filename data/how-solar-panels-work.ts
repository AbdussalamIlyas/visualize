import type {
  Concept,
  GlossaryTerm,
  PipelineExplainer,
  Source,
  Stage,
} from "@/lib/concept-schema";

const sources: Source[] = [
  {
    title: "U.S. Department of Energy: How does solar work?",
    url: "https://www.energy.gov/eere/solar/how-does-solar-work",
    note: "Overview of photovoltaics, inverters, and system-level solar generation.",
  },
  {
    title: "NREL: Photovoltaic research",
    url: "https://www.nrel.gov/research/re-photovoltaics.html",
    note: "Reference for how photovoltaic materials convert light into electrical energy.",
  },
];

const glossary: GlossaryTerm[] = [
  {
    id: "photovoltaic-effect",
    term: "Photovoltaic effect",
    definition:
      "The process where absorbed light frees charge carriers and creates a voltage in a solar cell.",
    stageIds: ["photons", "separation"],
  },
  {
    id: "pn-junction",
    term: "p-n junction",
    definition:
      "The boundary inside the cell that creates an internal electric field and helps separate charge.",
    stageIds: ["charge", "separation"],
  },
  {
    id: "dc",
    term: "Direct current",
    definition:
      "Electric charge flowing in one direction, which is what a solar cell produces natively.",
    stageIds: ["current"],
  },
  {
    id: "inverter",
    term: "Inverter",
    definition:
      "The device that converts the panel's DC output into AC power usable by buildings and the grid.",
    stageIds: ["inversion"],
  },
];

const stages: Stage[] = [
  {
    id: "photons",
    label: "Stage 1",
    goal: "Begin with sunlight arriving at the panel.",
    headline: "Sunlight delivers packets of energy to the panel surface.",
    body:
      "A solar panel does not wait for moving air or spinning parts. It starts when photons strike the semiconductor material in the cell.",
    actionLabel: "Start with the incoming light before any current exists.",
    visibleLayerIds: ["sunlight", "silicon"],
    activeHotspotIds: ["photons"],
    statePatch: {
      highlightedLayerIds: ["sunlight", "silicon"],
      note: "The panel begins as a light-to-charge device, not as a mechanical generator.",
      metrics: [
        { label: "Input", value: "sunlight", tone: "accent" },
        { label: "No moving parts", value: "conversion is electronic", tone: "neutral" },
      ],
    },
  },
  {
    id: "charge",
    label: "Stage 2",
    goal: "Show light creating mobile charge carriers in the material.",
    headline: "Absorbed photons free charge carriers inside the silicon.",
    body:
      "When light with enough energy hits the cell, electrons are knocked loose and leave behind holes. The cell now has separated charges that can be directed into useful flow.",
    actionLabel: "See how light creates charge carriers inside the material.",
    visibleLayerIds: ["sunlight", "silicon", "field"],
    activeHotspotIds: ["silicon", "junction"],
    statePatch: {
      highlightedLayerIds: ["silicon", "field"],
      note: "Sunlight is only useful here because the semiconductor can absorb it and create mobile charge.",
      metrics: [
        { label: "Material job", value: "absorb light and free charge", tone: "accent" },
        { label: "Creates", value: "electrons and holes", tone: "neutral" },
      ],
    },
  },
  {
    id: "separation",
    label: "Stage 3",
    goal: "Make the internal field feel like the reason the charges do not just recombine.",
    headline: "The cell's internal electric field pushes charges in opposite directions.",
    body:
      "The p-n junction acts like a built-in one-way organizer. It steers electrons and holes apart so the cell develops a voltage instead of instantly losing the separation.",
    actionLabel: "Focus on the junction that turns free charge into usable separation.",
    visibleLayerIds: ["silicon", "field", "dc"],
    activeHotspotIds: ["junction", "electric-field"],
    statePatch: {
      highlightedLayerIds: ["field", "dc"],
      note: "The electric field inside the cell is what makes the freed charge useful instead of temporary noise.",
      metrics: [
        { label: "Key structure", value: "p-n junction", tone: "accent" },
        { label: "Outcome", value: "voltage across the cell", tone: "neutral" },
      ],
    },
  },
  {
    id: "current",
    label: "Stage 4",
    goal: "Turn the separated charge into a circuit-level current story.",
    headline: "Electrons flow through the external circuit as direct current.",
    body:
      "Once the cell has voltage, electrons can travel through a connected circuit and do useful electrical work before returning to the other side of the cell.",
    actionLabel: "Follow the current leaving the panel and entering the circuit.",
    visibleLayerIds: ["field", "dc", "inverter"],
    activeHotspotIds: ["dc"],
    statePatch: {
      highlightedLayerIds: ["dc", "inverter"],
      note: "A solar cell naturally makes DC power. Many homes and grids still need that power reshaped later.",
      metrics: [
        { label: "Native output", value: "direct current", tone: "accent" },
        { label: "Leaves through", value: "external circuit", tone: "neutral" },
      ],
    },
  },
  {
    id: "inversion",
    label: "Stage 5",
    goal: "Finish with usable building power and the main real-world limits.",
    headline: "The inverter makes the output usable, while shade and heat cut performance.",
    body:
      "An inverter converts DC into AC so the power can feed a home or the grid. The final output still depends on sun angle, shading, dirt, and cell temperature.",
    actionLabel: "Compare the clean electrical path with the losses that reduce it.",
    visibleLayerIds: ["sunlight", "dc", "inverter", "grid", "limits"],
    activeHotspotIds: ["inverter", "shade"],
    statePatch: {
      highlightedLayerIds: ["inverter", "grid", "limits"],
      outputLabel: "Usable AC power",
      note: "Panel performance is a conversion story plus a conditions story. The weather and installation geometry matter.",
      metrics: [
        { label: "Becomes", value: "AC for homes and grid", tone: "accent" },
        { label: "Drops with", value: "shade, heat, and poor angle", tone: "warning" },
      ],
    },
  },
];

export const solarPanelExplainer = {
  id: "solar-panel-pipeline",
  type: "pipeline",
  sceneVariant: "solar-panel",
  title: "Sunlight-to-electricity walkthrough",
  summary:
    "Follow photons, charge separation, DC flow, and the inverter path that makes solar power usable.",
  intro:
    "Use this view first. Each stage shows how the panel turns light into a directed electrical flow without any moving turbine.",
  defaultStageId: stages[0].id,
  heroKicker: "3D guided pipeline",
  heroTitle: "Watch sunlight become usable power.",
  heroSummary:
    "Photons free charge, the junction separates it, current leaves the panel, and the inverter makes that output usable.",
  layers: [
    {
      id: "sunlight",
      label: "Sunlight",
      shortLabel: "Light",
      kind: "input",
      tone: "accent",
      position: { x: 8, y: 15, width: 22, height: 18 },
      description: "Incoming photons carrying energy to the cell surface.",
    },
    {
      id: "silicon",
      label: "Silicon cell",
      shortLabel: "Cell",
      kind: "chip",
      tone: "secondary",
      position: { x: 34, y: 24, width: 20, height: 20 },
      description: "The semiconductor material that absorbs light and frees charge carriers.",
    },
    {
      id: "field",
      label: "Electric field",
      shortLabel: "Junction",
      kind: "process",
      tone: "accent",
      position: { x: 35, y: 58, width: 18, height: 16 },
      description: "The built-in field at the p-n junction that separates charge.",
    },
    {
      id: "dc",
      label: "DC current",
      shortLabel: "DC",
      kind: "output",
      tone: "neutral",
      position: { x: 58, y: 54, width: 18, height: 18 },
      description: "The one-direction electrical flow produced by the panel.",
    },
    {
      id: "inverter",
      label: "Inverter",
      shortLabel: "AC",
      kind: "process",
      tone: "secondary",
      position: { x: 59, y: 18, width: 16, height: 18 },
      description: "The conversion stage that reshapes DC into AC power.",
    },
    {
      id: "grid",
      label: "Home or grid",
      shortLabel: "Load",
      kind: "output",
      tone: "neutral",
      position: { x: 83, y: 35, width: 12, height: 22 },
      description: "Where the usable AC power is consumed or exported.",
    },
    {
      id: "limits",
      label: "Performance limits",
      shortLabel: "Losses",
      kind: "warning",
      tone: "warning",
      position: { x: 72, y: 78, width: 22, height: 10 },
      description: "Environmental and installation factors that reduce output.",
    },
  ],
  connections: [
    { id: "sunlight-silicon", sourceLayerId: "sunlight", targetLayerId: "silicon" },
    { id: "silicon-field", sourceLayerId: "silicon", targetLayerId: "field" },
    { id: "field-dc", sourceLayerId: "field", targetLayerId: "dc" },
    { id: "dc-inverter", sourceLayerId: "dc", targetLayerId: "inverter" },
    { id: "inverter-grid", sourceLayerId: "inverter", targetLayerId: "grid" },
    { id: "sunlight-limits", sourceLayerId: "sunlight", targetLayerId: "limits" },
    { id: "silicon-limits", sourceLayerId: "silicon", targetLayerId: "limits" },
  ],
  hotspots: [
    {
      id: "photons",
      anchor: { x: 20, y: 24 },
      label: "Photons",
      body:
        "Sunlight arrives as packets of energy. If a photon has enough energy, the cell can absorb it and free charge carriers.",
      media: "This is why panel output depends so directly on incoming light.",
      revealsInStages: ["photons"],
      tone: "accent",
    },
    {
      id: "silicon",
      anchor: { x: 45, y: 31 },
      label: "Semiconductor",
      body:
        "Silicon is chosen because its electronic structure makes it practical to free and control charge with sunlight.",
      media: "The material has to do more than conduct. It has to convert light into separated charge.",
      revealsInStages: ["charge"],
      tone: "secondary",
    },
    {
      id: "junction",
      anchor: { x: 44, y: 66 },
      label: "p-n junction",
      body:
        "Two differently doped silicon regions create an internal field that pushes electrons and holes apart.",
      media: "That internal field is what stops the newly freed charges from instantly recombining.",
      revealsInStages: ["charge", "separation"],
      relatedGlossaryTermIds: ["pn-junction"],
      tone: "accent",
    },
    {
      id: "electric-field",
      anchor: { x: 53, y: 60 },
      label: "Internal field",
      body:
        "The junction's electric field is the organizing force that creates a usable voltage across the cell.",
      media: "Without this separation, light would free charge but not sustain a useful current.",
      revealsInStages: ["separation"],
      relatedGlossaryTermIds: ["photovoltaic-effect"],
      tone: "secondary",
    },
    {
      id: "dc",
      anchor: { x: 67, y: 62 },
      label: "Direct current",
      body:
        "Electrons move through the external circuit in one direction, which is why the panel's natural electrical output is DC.",
      media: "Panel strings combine many cells so the usable voltage and current add up.",
      revealsInStages: ["current"],
      relatedGlossaryTermIds: ["dc"],
      tone: "neutral",
    },
    {
      id: "inverter",
      anchor: { x: 68, y: 27 },
      label: "Inverter",
      body:
        "The inverter turns the panel's DC output into AC power that the home and grid can actually use.",
      media: "Modern solar systems often track and optimize panel output at this stage too.",
      revealsInStages: ["inversion"],
      relatedGlossaryTermIds: ["inverter"],
      tone: "secondary",
    },
    {
      id: "shade",
      anchor: { x: 82, y: 80 },
      label: "Shade and heat",
      body:
        "Partial shading, poor panel angle, and higher temperatures can all reduce the useful output from the same hardware.",
      media: "Solar is simple in mechanism, but performance still depends heavily on installation and conditions.",
      revealsInStages: ["inversion"],
      tone: "warning",
    },
  ],
  stages,
  sources,
  glossary,
} satisfies PipelineExplainer;

export const solarPanelConcept = {
  slug: "how-solar-panels-work",
  title: "How Solar Panels Work",
  question: "How does sunlight become usable electrical power?",
  summary:
    "A short walkthrough of the photovoltaic effect, charge separation, DC flow, and inverter conversion.",
  thumbnail: "Solar energy pipeline",
  estimatedMinutes: 3,
  tags: ["Energy", "Physics", "Climate Tech", "Interactive"],
  status: "published",
  defaultExplainerId: solarPanelExplainer.id,
  theme: {
    accent: "#f4c96b",
    accentSecondary: "#8be0a6",
    glow: "rgba(244, 201, 107, 0.18)",
    canvas:
      "radial-gradient(circle at 18% 18%, rgba(244,201,107,0.22), rgba(244,201,107,0) 34%), radial-gradient(circle at 82% 22%, rgba(139,224,166,0.13), rgba(139,224,166,0) 30%), linear-gradient(180deg, rgba(16,13,10,0.98), rgba(10,10,14,0.96))",
  },
  glossary,
  sources,
  explainers: [solarPanelExplainer],
} satisfies Concept;
