import type { Concept, ConceptTheme, PipelineExplainer } from "@/lib/concept-schema";
import { getDefaultExplainer } from "@/lib/concept-utils";

import { howAiWorksConcept } from "@/data/how-ai-works";
import { jetEngineConcept } from "@/data/how-a-jet-engine-works";
import { gpsConcept } from "@/data/how-gps-works";
import { solarPanelConcept } from "@/data/how-solar-panels-work";
import { webPageConcept } from "@/data/how-the-internet-delivers-a-web-page";
import { transistorConcept } from "@/data/how-a-transistor-works";

export type ConceptGalleryEntry = {
  title: string;
  question: string;
  summary: string;
  href: string;
  status: string;
  cta: string;
  minutes: number;
  tags: string[];
  format: string;
  stageCount: number;
  stagePreview: string[];
  theme: ConceptTheme;
};

const stagePreviewBySlug: Record<string, string[]> = {
  "how-a-jet-engine-works": ["Intake", "Compression", "Combustion", "Thrust"],
  "how-the-internet-delivers-a-web-page": ["URL", "DNS", "Request", "Render"],
  "how-gps-works": ["Signals", "Timing", "Ranges", "Fix"],
  "how-solar-panels-work": ["Photons", "Charge", "Current", "AC power"],
  "how-ai-works": ["Examples", "Representation", "Training", "Output"],
  "how-a-transistor-works": ["Gate", "Field", "Channel", "Switch"],
};

const concepts: Concept[] = [
  jetEngineConcept,
  webPageConcept,
  gpsConcept,
  solarPanelConcept,
  howAiWorksConcept,
  transistorConcept,
];

function getPipelineExplainer(concept: Concept): PipelineExplainer {
  const explainer = getDefaultExplainer(concept);

  if (explainer.type !== "pipeline") {
    throw new Error(`Expected a pipeline explainer for ${concept.slug}.`);
  }

  return explainer;
}

function buildEntry(concept: Concept): ConceptGalleryEntry {
  const explainer = getPipelineExplainer(concept);

  return {
    title: concept.title,
    question: concept.question,
    summary: concept.summary,
    href: `/concept/${concept.slug}`,
    status: "Live",
    cta: "Open guided pipeline",
    minutes: concept.estimatedMinutes,
    tags: concept.tags,
    format: "3D guided pipeline",
    stageCount: explainer.stages.length,
    stagePreview: stagePreviewBySlug[concept.slug] ?? explainer.stages.slice(0, 4).map((stage) => stage.label),
    theme: concept.theme,
  };
}

export const conceptGalleryEntries: ConceptGalleryEntry[] = concepts.map(buildEntry);

export function getRelatedConceptEntries(href: string, limit = 3) {
  return conceptGalleryEntries.filter((entry) => entry.href !== href).slice(0, limit);
}
