"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import type { MapNode } from "@/lib/concept-schema";

type ConceptDetailPanelProps = {
  node: MapNode;
  relatedNodes: MapNode[];
  onSelectNode: (nodeId: string) => void;
};

export function ConceptDetailPanel({
  node,
  relatedNodes,
  onSelectNode,
}: ConceptDetailPanelProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <aside
      aria-labelledby="concept-detail-title"
      className="surface overflow-hidden xl:sticky xl:top-24"
      id="concept-detail-panel"
    >
      <div className="border-b border-white/10 px-5 py-5 sm:px-6">
        <div className="space-y-3">
          <p className="section-eyebrow">Focused node</p>
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

      <AnimatePresence mode="wait">
        <motion.div
          key={node.id}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          className="space-y-5 px-5 py-6 sm:px-6"
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.22, ease: "easeOut" }}
        >
          <section className="rounded-[1.35rem] border border-white/10 bg-white/[0.03] px-4 py-4">
            <p className="text-sm leading-7 text-white">{node.detail}</p>
          </section>

          <section className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.03] px-4 py-4">
              <h3 className="text-lg font-semibold text-white">Example</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                {node.example}
              </p>
            </div>
            <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.03] px-4 py-4">
              <h3 className="text-lg font-semibold text-white">Misread</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                {node.misconception}
              </p>
            </div>
          </section>

          <section className="space-y-3 rounded-[1.35rem] border border-white/10 bg-white/[0.03] px-4 py-4">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-lg font-semibold text-white">Related nodes</h3>
              <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-muted)]">
                {relatedNodes.length} linked
              </p>
            </div>
            {relatedNodes.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {relatedNodes.map((relatedNode) => (
                  <button
                    key={relatedNode.id}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-[var(--color-muted)] transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
                    onClick={() => onSelectNode(relatedNode.id)}
                    type="button"
                  >
                    {relatedNode.title}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-sm leading-7 text-[var(--color-muted)]">
                No linked nodes yet.
              </p>
            )}
          </section>
        </motion.div>
      </AnimatePresence>
    </aside>
  );
}
