"use client";

import { ReactFlowProvider } from "@xyflow/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { startTransition, useState } from "react";

import { ConceptDetailPanel } from "@/components/concept/concept-detail-panel";
import { ConceptEmptyState } from "@/components/concept/concept-empty-state";
import { ConceptFlow } from "@/components/concept/concept-flow";
import { DifficultySwitcher } from "@/components/concept/difficulty-switcher";
import { Container } from "@/components/ui/container";
import { Pill } from "@/components/ui/pill";
import type { ConceptData } from "@/lib/concept-schema";
import {
  getDefaultDifficulty,
  getDefaultNode,
  getNodeById,
  getRelatedNodes,
} from "@/lib/concept-utils";

type ConceptExplorerProps = {
  concept: ConceptData;
};

export function ConceptExplorer({ concept }: ConceptExplorerProps) {
  const shouldReduceMotion = useReducedMotion();
  const hasNodes = concept.nodes.length > 0;
  const [selectedNodeId, setSelectedNodeId] = useState(
    () => concept.nodes[0]?.id ?? concept.defaultNodeId,
  );
  const [difficulty, setDifficulty] = useState(() => getDefaultDifficulty(concept));

  if (!hasNodes) {
    return (
      <div className="pb-20 pt-14 sm:pb-24 sm:pt-20">
        <Container>
          <ConceptEmptyState />
        </Container>
      </div>
    );
  }

  const selectedNode = getNodeById(concept, selectedNodeId) ?? getDefaultNode(concept);
  const relatedNodes = getRelatedNodes(concept, selectedNode);

  function handleSelectNode(nodeId: string) {
    if (nodeId === selectedNode.id) {
      return;
    }

    startTransition(() => {
      setSelectedNodeId(nodeId);
    });
  }

  function handleDifficultyChange(nextDifficulty: typeof difficulty) {
    if (nextDifficulty === difficulty) {
      return;
    }

    startTransition(() => {
      setDifficulty(nextDifficulty);
    });
  }

  return (
    <div className="pb-20 pt-14 sm:pb-24 sm:pt-20">
      <Container className="space-y-6 sm:space-y-8">
        <p aria-live="polite" className="sr-only">
          {`Focused node ${selectedNode.title}. Difficulty level ${difficulty}.`}
        </p>
        <motion.section
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          aria-labelledby="concept-title"
          className="surface overflow-hidden px-6 py-8 sm:px-8 sm:py-10"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.4, ease: "easeOut" }}
        >
          <div className="grid gap-8 2xl:grid-cols-[minmax(0,1fr)_20rem] 2xl:items-end">
            <div className="space-y-5">
              <Pill tone="accent">Interactive Concept Explorer</Pill>
              <div className="space-y-4">
                <h1
                  className="font-[family:var(--font-display)] text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl"
                  id="concept-title"
                >
                  {concept.title}
                </h1>
                <p
                  className="max-w-3xl text-lg leading-8 text-[var(--color-muted)]"
                  id="concept-subtitle"
                >
                  {concept.subtitle}
                </p>
                <p className="max-w-3xl text-sm leading-7 text-[var(--color-muted)] sm:text-base">
                  {concept.heroSummary}
                </p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 2xl:grid-cols-1">
              <div className="surface-muted p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-accent)]">
                  Nodes
                </p>
                <p className="mt-2 text-3xl font-semibold text-white">
                  {concept.nodes.length}
                </p>
              </div>
              <div className="surface-muted p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-accent)]">
                  Current node
                </p>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={selectedNode.id}
                    animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    className="mt-2 text-xl font-semibold text-white"
                    exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                    initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.18, ease: "easeOut" }}
                  >
                    {selectedNode.title}
                  </motion.p>
                </AnimatePresence>
              </div>
              <div className="surface-muted p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-accent)]">
                  Current level
                </p>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={difficulty}
                    animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    className="mt-2 text-xl font-semibold text-white"
                    exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                    initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.18, ease: "easeOut" }}
                  >
                    {difficulty}
                  </motion.p>
                </AnimatePresence>
                <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                  Local-only content, no auth or database.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {concept.learningObjectives.map((objective) => (
              <article
                key={objective}
                className="rounded-[1.35rem] border border-white/10 bg-white/[0.03] px-4 py-4 text-sm leading-6 text-[var(--color-muted)]"
              >
                {objective}
              </article>
            ))}
          </div>
        </motion.section>

        <DifficultySwitcher onChange={handleDifficultyChange} value={difficulty} />

        <ReactFlowProvider>
          <motion.div
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(20rem,25rem)] 2xl:grid-cols-[minmax(0,1.15fr)_minmax(22rem,27rem)]"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            transition={{
              delay: shouldReduceMotion ? 0 : 0.08,
              duration: shouldReduceMotion ? 0 : 0.42,
              ease: "easeOut",
            }}
          >
            <ConceptFlow
              concept={concept}
              describedById="concept-subtitle"
              onSelectNode={handleSelectNode}
              selectedNodeId={selectedNode.id}
            />
            <ConceptDetailPanel
              concept={concept}
              difficulty={difficulty}
              node={selectedNode}
              onSelectNode={handleSelectNode}
              relatedNodes={relatedNodes}
            />
          </motion.div>
        </ReactFlowProvider>
      </Container>
    </div>
  );
}
