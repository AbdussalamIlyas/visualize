import type { Concept, ConceptTheme } from "@/lib/concept-schema";
import { getDefaultExplainer } from "@/lib/concept-utils";

import { howAiWorksConcept } from "@/data/how-ai-works";
import { jetEngineConcept } from "@/data/how-a-jet-engine-works";
import { gpsConcept } from "@/data/how-gps-works";
import { solarPanelConcept } from "@/data/how-solar-panels-work";
import { webPageConcept } from "@/data/how-the-internet-delivers-a-web-page";
import { transistorStarterConcept } from "@/data/how-a-transistor-works";

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
  featured?: boolean;
};

function getPrimaryFormat(concept: Concept) {
  const explainer = getDefaultExplainer(concept);

  return explainer.type === "pipeline" ? "Guided pipeline" : "Concept map";
}

function getPrimaryStageCount(concept: Concept) {
  const explainer = getDefaultExplainer(concept);

  return explainer.type === "pipeline" ? explainer.stages.length : explainer.nodes.length;
}

function buildEntry(
  concept: Concept,
  config: Pick<
    ConceptGalleryEntry,
    "status" | "cta" | "stagePreview" | "featured"
  >,
): ConceptGalleryEntry {
  return {
    title: concept.title,
    question: concept.question,
    summary: concept.summary,
    href: `/concept/${concept.slug}`,
    status: config.status,
    cta: config.cta,
    minutes: concept.estimatedMinutes,
    tags: concept.tags,
    format: getPrimaryFormat(concept),
    stageCount: getPrimaryStageCount(concept),
    stagePreview: config.stagePreview,
    theme: concept.theme,
    featured: config.featured,
  };
}

export const conceptGalleryEntries: ConceptGalleryEntry[] = [
  {
    title: jetEngineConcept.title,
    question: jetEngineConcept.question,
    summary: jetEngineConcept.summary,
    href: `/concept/${jetEngineConcept.slug}`,
    status: "Featured",
    cta: "Open flagship explainer",
    minutes: jetEngineConcept.estimatedMinutes,
    tags: jetEngineConcept.tags,
    format: "Flagship walkthrough",
    stageCount: jetEngineConcept.stages.length,
    stagePreview: ["Intake", "Compression", "Combustion", "Thrust"],
    theme: jetEngineConcept.theme,
    featured: true,
  },
  buildEntry(webPageConcept, {
    status: "New",
    cta: "Open web explainer",
    stagePreview: ["URL", "DNS", "Request", "Render"],
  }),
  buildEntry(gpsConcept, {
    status: "New",
    cta: "Open GPS explainer",
    stagePreview: ["Signals", "Timing", "Ranges", "Fix"],
  }),
  buildEntry(solarPanelConcept, {
    status: "New",
    cta: "Open solar explainer",
    stagePreview: ["Photons", "Charge", "Current", "AC power"],
  }),
  buildEntry(howAiWorksConcept, {
    status: "Live",
    cta: "Open AI explainer",
    stagePreview: ["Examples", "Representation", "Training", "Output"],
  }),
  {
    title: transistorStarterConcept.title,
    question: transistorStarterConcept.question,
    summary: transistorStarterConcept.summary,
    href: `/concept/${transistorStarterConcept.slug}`,
    status: "Starter",
    cta: "Open starter route",
    minutes: transistorStarterConcept.estimatedMinutes,
    tags: transistorStarterConcept.tags,
    format: "Layered starter",
    stageCount: transistorStarterConcept.plannedStages.length,
    stagePreview: ["Gate off", "Field", "Channel", "Switch"],
    theme: transistorStarterConcept.theme,
  },
];

export const featuredConceptEntry =
  conceptGalleryEntries.find((entry) => entry.featured) ?? conceptGalleryEntries[0];

export function getRelatedConceptEntries(href: string, limit = 3) {
  return conceptGalleryEntries.filter((entry) => entry.href !== href).slice(0, limit);
}
