"use client";

import { motion } from "motion/react";
import { startTransition, useState } from "react";

import { ConceptEmptyState } from "@/components/concept/concept-empty-state";
import { ExplainerSwitcher } from "@/components/concept/explainer-switcher";
import { MapExplainerView } from "@/components/concept/map-explainer";
import { PipelineExplainerView } from "@/components/concept/pipeline-explainer";
import { SupportPanels } from "@/components/concept/support-panels";
import { Container } from "@/components/ui/container";
import { Pill } from "@/components/ui/pill";
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

        <motion.section
          animate={{ opacity: 1, y: 0 }}
          className="surface overflow-hidden px-5 py-5 sm:px-8 sm:py-6"
          initial={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <Pill tone="accent">Interactive concept</Pill>
                <Pill>{`${concept.estimatedMinutes} min`}</Pill>
              </div>
              <h1 className="font-[family:var(--font-display)] text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                {concept.title}
              </h1>
              <p className="text-lg leading-8 text-white">{concept.question}</p>
            </div>
            <p className="text-sm text-[var(--color-muted)] lg:max-w-sm">
              Walkthrough first. Map second.
            </p>
          </div>
        </motion.section>

        <ExplainerSwitcher
          explainers={concept.explainers}
          onChange={handleSelectExplainer}
          value={selectedExplainer.id}
        />
      </Container>

      {selectedExplainer.type === "pipeline" ? (
        <PipelineExplainerView explainer={selectedExplainer} />
      ) : (
        <Container className="mt-6">
          <MapExplainerView explainer={selectedExplainer} />
        </Container>
      )}

      <Container className="mt-6">
        <SupportPanels
          currentViewLabel={selectedExplainer.title}
          glossary={glossary}
          sources={sources}
        />
      </Container>
    </div>
  );
}
