export type Source = {
  title: string;
  url: string;
  appliesTo?: string;
  note?: string;
};

export type GlossaryTerm = {
  id: string;
  term: string;
  definition: string;
  stageIds?: string[];
};

export type ConceptStatus = "draft" | "published";

export type ExplainerType =
  | "pipeline"
  | "simulation"
  | "comparison"
  | "timeline"
  | "layered-scene"
  | "map";

export type SceneVariant =
  | "generic"
  | "jet-engine"
  | "gps"
  | "solar-panel"
  | "transistor"
  | "web-page"
  | "ai-system";

export type ConceptTheme = {
  accent: string;
  accentSecondary: string;
  glow: string;
  canvas: string;
};

export type VisualPosition = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type VisualLayerTone = "neutral" | "accent" | "secondary" | "warning";

export type VisualLayerKind =
  | "input"
  | "data"
  | "process"
  | "model"
  | "output"
  | "warning"
  | "chip";

export type VisualLayer = {
  id: string;
  label: string;
  shortLabel: string;
  kind: VisualLayerKind;
  tone: VisualLayerTone;
  position: VisualPosition;
  description: string;
  depth?: number;
};

export type VisualConnection = {
  id: string;
  sourceLayerId: string;
  targetLayerId: string;
};

export type Hotspot = {
  id: string;
  anchor: {
    x: number;
    y: number;
  };
  label: string;
  body: string;
  media?: string;
  revealsInStages: string[];
  relatedGlossaryTermIds?: string[];
  tone?: VisualLayerTone;
};

export type StageMetricTone = "neutral" | "accent" | "warning";

export type StageMetric = {
  label: string;
  value: string;
  tone?: StageMetricTone;
};

export type StageStatePatch = {
  highlightedLayerIds: string[];
  spotlightHotspotIds?: string[];
  outputLabel?: string;
  note?: string;
  metrics: StageMetric[];
};

export type Stage = {
  id: string;
  label: string;
  goal: string;
  headline: string;
  body: string;
  actionLabel: string;
  visibleLayerIds: string[];
  activeHotspotIds: string[];
  statePatch: StageStatePatch;
};

export type CheckPoint = {
  id: string;
  prompt: string;
  expectedInsight: string;
  feedback: string;
};

export type BaseExplainer = {
  id: string;
  type: ExplainerType;
  title: string;
  summary: string;
  intro: string;
  defaultStageId?: string;
  sources?: Source[];
  glossary?: GlossaryTerm[];
};

export type PipelineExplainer = BaseExplainer & {
  type: "pipeline";
  sceneVariant?: SceneVariant;
  heroKicker: string;
  heroTitle: string;
  heroSummary: string;
  layers: VisualLayer[];
  connections: VisualConnection[];
  hotspots: Hotspot[];
  stages: Stage[];
  checkpoints?: CheckPoint[];
};

export type MapPosition = {
  x: number;
  y: number;
};

export type MapNode = {
  id: string;
  title: string;
  shortSummary: string;
  detail: string;
  icon: string;
  position: MapPosition;
  relatedNodeIds: string[];
  example: string;
  misconception: string;
  sources?: Source[];
};

export type MapExplainer = BaseExplainer & {
  type: "map";
  defaultNodeId: string;
  nodes: MapNode[];
};

export type ConceptExplainer = PipelineExplainer | MapExplainer;

export type Concept = {
  slug: string;
  title: string;
  question: string;
  summary: string;
  thumbnail: string;
  estimatedMinutes: number;
  tags: string[];
  status: ConceptStatus;
  defaultExplainerId: string;
  theme: ConceptTheme;
  glossary: GlossaryTerm[];
  sources: Source[];
  explainers: ConceptExplainer[];
};
