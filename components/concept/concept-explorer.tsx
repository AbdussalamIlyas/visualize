"use client";

import { startTransition, useState } from "react";

import { ConceptEmptyState } from "@/components/concept/concept-empty-state";
import { ConceptPageHero } from "@/components/concept/concept-page-hero";
import { ExplainerSwitcher } from "@/components/concept/explainer-switcher";
import { MapExplainerView } from "@/components/concept/map-explainer";
import { MoreConcepts } from "@/components/concept/more-concepts";
import { PipelineExplainerView } from "@/components/concept/pipeline-explainer";
import { SupportPanels } from "@/components/concept/support-panels";
import { Container } from "@/components/ui/container";
import type { Concept } from "@/lib/concept-schema";
import {
  getCombinedGlossary,
  getCombinedSources,
  getDefaultExplainer,
  getExplainerById,
} from "@/lib/concept-utils";

type ConceptExplorerProps = {
  concept: Concept;
};

export function ConceptExplorer({ concept }: ConceptExplorerProps) {
  const hasExplainers = concept.explainers.length > 0;
  const [selectedExplainerId, setSelectedExplainerId] = useState(
    () => concept.defaultExplainerId,
  );

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

  const hasMultipleExplainers = concept.explainers.length > 1;
  const selectedExplainer =
    getExplainerById(concept, selectedExplainerId) ?? getDefaultExplainer(concept);
  const sources = getCombinedSources(concept, selectedExplainer);
  const glossary = getCombinedGlossary(concept, selectedExplainer);

  function handleSelectExplainer(explainerId: string) {
    if (explainerId === selectedExplainer.id) {
      return;
    }

    startTransition(() => {
      setSelectedExplainerId(explainerId);
    });
  }

  return (
    <div className="pb-16 pt-10 sm:pb-24 sm:pt-14">
      <Container className="space-y-6">
        <p aria-live="polite" className="sr-only">
          {`Current explainer ${selectedExplainer.title}.`}
        </p>

        <ConceptPageHero
          eyebrow="Interactive concept"
          minutes={concept.estimatedMinutes}
          note={
            hasMultipleExplainers
              ? "Use the guided walkthrough first. Switch views only when you want the supporting vocabulary map."
              : "Use the stage rail and hotspots first. Sources and glossary stay secondary on purpose."
          }
          question={concept.question}
          summary={concept.summary}
          tags={concept.tags}
          theme={concept.theme}
          title={concept.title}
        />

        {hasMultipleExplainers ? (
          <ExplainerSwitcher
            explainers={concept.explainers}
            onChange={handleSelectExplainer}
            value={selectedExplainer.id}
          />
        ) : null}
      </Container>

      {selectedExplainer.type === "pipeline" ? (
        <PipelineExplainerView explainer={selectedExplainer} theme={concept.theme} />
      ) : (
        <Container className="mt-6">
          <MapExplainerView explainer={selectedExplainer} />
        </Container>
      )}

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
