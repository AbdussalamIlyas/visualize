"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { Pill } from "@/components/ui/pill";
import {
  difficultyMetadata,
  type ConceptData,
  type ConceptNode,
  type DifficultyLevel,
} from "@/lib/concept-schema";

type ConceptDetailPanelProps = {
  concept: ConceptData;
  node: ConceptNode;
  relatedNodes: ConceptNode[];
  difficulty: DifficultyLevel;
  onSelectNode: (nodeId: string) => void;
};

export function ConceptDetailPanel({
  concept,
  node,
  relatedNodes,
  difficulty,
  onSelectNode,
}: ConceptDetailPanelProps) {
  const shouldReduceMotion = useReducedMotion();
  const difficultyMeta = difficultyMetadata[difficulty];
  const sources = node.sources.length > 0 ? node.sources : concept.sources;

  return (
    <aside
      aria-labelledby="concept-detail-title"
      className="surface overflow-hidden xl:sticky xl:top-24"
      id="concept-detail-panel"
    >
      <div className="border-b border-white/10 px-5 py-5 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <Pill tone="accent">{difficulty}</Pill>
              <Pill>{node.icon}</Pill>
            </div>
            <div className="space-y-3">
              <p className="section-eyebrow">Detail Panel</p>
              <h2
                className="font-[family:var(--font-display)] text-3xl font-semibold text-white"
                id="concept-detail-title"
              >
                {node.title}
              </h2>
              <p className="text-base leading-7 text-[var(--color-muted)]">
                {node.shortSummary}
              </p>
            </div>
          </div>
          <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] px-4 py-3 text-sm leading-6 text-[var(--color-muted)] sm:max-w-[15rem]">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-accent)]">
              Current lens
            </p>
            <p className="mt-2 text-white">{difficultyMeta.summary}</p>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${node.id}-${difficulty}`}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          className="space-y-6 px-5 py-6 sm:px-6"
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.26, ease: "easeOut" }}
        >
          <section className="surface-muted p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-accent)]">
                Current explanation
              </p>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[0.68rem] uppercase tracking-[0.16em] text-[var(--color-muted)]">
                {`Level ${difficultyMeta.order} of 5`}
              </span>
            </div>
            <p className="mt-3 text-sm leading-7 text-white sm:text-[0.98rem]">
              {node.difficultyExplanations[difficulty]}
            </p>
          </section>

          <section className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.03] px-4 py-4">
              <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-accent)]">
                Explanation mode
              </p>
              <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                {difficultyMeta.lens}
              </p>
            </div>
            <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.03] px-4 py-4">
              <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-accent)]">
                Best for
              </p>
              <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                {difficultyMeta.audience}
              </p>
            </div>
          </section>

          <section className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.03] px-4 py-4">
              <h3 className="text-lg font-semibold text-white">Example</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                {node.example}
              </p>
            </div>
            <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.03] px-4 py-4">
              <h3 className="text-lg font-semibold text-white">Common misconception</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                {node.misconception}
              </p>
            </div>
          </section>

          <section className="space-y-3 rounded-[1.35rem] border border-white/10 bg-white/[0.03] px-4 py-4">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-lg font-semibold text-white">Related concepts</h3>
              <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-muted)]">
                {relatedNodes.length} linked
              </p>
            </div>
            {relatedNodes.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {relatedNodes.map((relatedNode) => (
                  <motion.button
                    key={relatedNode.id}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-[var(--color-muted)] transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
                    onClick={() => onSelectNode(relatedNode.id)}
                    type="button"
                    whileHover={shouldReduceMotion ? undefined : { y: -1 }}
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
                  >
                    {relatedNode.title}
                  </motion.button>
                ))}
              </div>
            ) : (
              <p className="text-sm leading-7 text-[var(--color-muted)]">
                No related nodes are attached to this concept yet.
              </p>
            )}
          </section>

          <section className="space-y-3 rounded-[1.35rem] border border-white/10 bg-white/[0.03] px-4 py-4">
            <h3 className="text-lg font-semibold text-white">Sources</h3>
            {sources.length > 0 ? (
              <div className="space-y-2">
                {sources.map((source) => (
                  <motion.a
                    key={source.url}
                    className="block rounded-[1.25rem] border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-[var(--color-muted)] transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
                    href={source.url}
                    rel="noreferrer"
                    target="_blank"
                    whileHover={shouldReduceMotion ? undefined : { y: -1 }}
                  >
                    {source.title}
                  </motion.a>
                ))}
              </div>
            ) : (
              <p className="text-sm leading-7 text-[var(--color-muted)]">
                Source links will appear here when they are attached to the node
                or concept data.
              </p>
            )}
          </section>

          <section className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] px-4 py-4">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-accent)]">
              Concept context
            </p>
            <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
              {concept.subtitle}
            </p>
          </section>
        </motion.div>
      </AnimatePresence>
    </aside>
  );
}
