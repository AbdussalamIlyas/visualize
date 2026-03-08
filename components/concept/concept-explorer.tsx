"use client";

import { ConceptEmptyState } from "@/components/concept/concept-empty-state";
import { ConceptPageHero } from "@/components/concept/concept-page-hero";
import { MoreConcepts } from "@/components/concept/more-concepts";
import { PipelineExplainerView } from "@/components/concept/pipeline-explainer";
import { SupportPanels } from "@/components/concept/support-panels";
import { Container } from "@/components/ui/container";
import type { Concept } from "@/lib/concept-schema";
import {
  getCombinedGlossary,
  getCombinedSources,
  getDefaultExplainer,
} from "@/lib/concept-utils";

type ConceptExplorerProps = {
  concept: Concept;
};

export function ConceptExplorer({ concept }: ConceptExplorerProps) {
  const hasExplainers = concept.explainers.length > 0;

  if (!hasExplainers) {
    return (
      <div className="pb-20 pt-14 sm:pb-24 sm:pt-20">
        <Container>
          <ConceptEmptyState
            description="The page shell is ready, but this concept does not have an explainer attached yet."
            title="No explainer is available yet."
          />
        </Container>
      </div>
    );
  }

  const selectedExplainer = getDefaultExplainer(concept);
  const sources = getCombinedSources(concept, selectedExplainer);
  const glossary = getCombinedGlossary(concept, selectedExplainer);

  if (selectedExplainer.type !== "pipeline") {
    return (
      <div className="pb-20 pt-14 sm:pb-24 sm:pt-20">
        <Container>
          <ConceptEmptyState
            description="This concept is missing the shared guided-pipeline configuration."
            title="A pipeline explainer is required."
          />
        </Container>
      </div>
    );
  }

  return (
    <div className="pb-16 pt-10 sm:pb-24 sm:pt-14">
      <Container className="space-y-6">
        <p aria-live="polite" className="sr-only">
          {`Current explainer ${selectedExplainer.title}.`}
        </p>

        <ConceptPageHero
          eyebrow="Interactive pipeline"
          minutes={concept.estimatedMinutes}
          note="Use the stage rail first. The central pipeline changes immediately, and supporting detail only opens when you ask for it."
          question={concept.question}
          summary={concept.summary}
          tags={concept.tags}
          theme={concept.theme}
          title={concept.title}
        />
      </Container>

      <PipelineExplainerView explainer={selectedExplainer} theme={concept.theme} />

      <Container className="mt-6 space-y-8">
        <SupportPanels
          currentViewLabel={selectedExplainer.title}
          glossary={glossary}
          sources={sources}
        />
        <MoreConcepts currentHref={`/concept/${concept.slug}`} />
      </Container>
    </div>
  );
}
