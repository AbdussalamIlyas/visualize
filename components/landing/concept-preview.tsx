"use client";

import { motion } from "motion/react";

import { howAiWorksConcept } from "@/data/how-ai-works";
import { getConnectionPairs } from "@/lib/concept-utils";
import { cx } from "@/lib/utils";

const previewLabels: Record<string, string> = {
  "what-ai-is": "AI",
  "real-world-examples": "Examples",
  "errors-hallucinations": "Errors",
  "limits-risks": "Limits",
  "neural-networks": "Networks",
};

export function ConceptPreview() {
  const connections = getConnectionPairs(howAiWorksConcept);

  return (
    <motion.div
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="surface relative overflow-hidden p-4 sm:p-6"
      initial={{ opacity: 0, scale: 0.96, y: 24 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top,rgba(137,181,255,0.22),rgba(137,181,255,0)_70%)]" />
      <div className="relative z-10 space-y-2">
        <p className="section-eyebrow">Concept Preview</p>
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-[family:var(--font-display)] text-2xl font-semibold text-white">
              How AI Works
            </h2>
            <p className="mt-2 max-w-sm text-sm leading-6 text-[var(--color-muted)]">
              A stable visual map with layered explanations and connected ideas.
            </p>
          </div>
          <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[var(--color-muted)]">
            11 nodes
          </div>
        </div>
      </div>
      <div className="relative mt-8 h-[22rem] overflow-hidden rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(12,18,37,0.88),rgba(8,12,24,0.95))] sm:h-[24rem]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:24px_24px]" />
        <svg
          aria-hidden="true"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          {connections.map((connection) => {
            const source = howAiWorksConcept.nodes.find(
              (node) => node.id === connection.source,
            );
            const target = howAiWorksConcept.nodes.find(
              (node) => node.id === connection.target,
            );

            if (!source || !target) {
              return null;
            }

            return (
              <line
                key={`${connection.source}-${connection.target}`}
                stroke="rgba(140, 171, 255, 0.24)"
                strokeWidth="0.55"
                x1={source.position.x}
                x2={target.position.x}
                y1={source.position.y}
                y2={target.position.y}
              />
            );
          })}
        </svg>
        {howAiWorksConcept.nodes.map((node, index) => {
          const isPrimary = node.id === "model";
          const label = previewLabels[node.id] ?? node.title;

          return (
            <motion.div
              key={node.id}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute"
              initial={{ opacity: 0, scale: 0.9 }}
              style={{ left: `${node.position.x}%`, top: `${node.position.y}%` }}
              transition={{
                delay: 0.12 + index * 0.04,
                duration: 0.45,
                ease: "easeOut",
              }}
            >
              <div
                className={cx(
                  "flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 rounded-2xl border px-3 py-2 text-center shadow-[0_18px_45px_rgba(6,10,24,0.42)] backdrop-blur-sm",
                  isPrimary
                    ? "min-w-[7.5rem] border-[rgba(149,187,255,0.42)] bg-[linear-gradient(180deg,rgba(137,181,255,0.22),rgba(18,27,52,0.92))]"
                    : "min-w-[6.5rem] border-white/10 bg-[rgba(18,24,45,0.82)]",
                )}
              >
                <span
                  className={cx(
                    "inline-flex h-8 w-8 items-center justify-center rounded-full text-[0.65rem] font-semibold uppercase tracking-[0.18em]",
                    isPrimary
                      ? "bg-[rgba(255,255,255,0.12)] text-white"
                      : "bg-white/[0.08] text-[var(--color-accent)]",
                  )}
                >
                  {node.icon}
                </span>
                <span className="max-w-[7rem] text-[0.68rem] font-medium leading-tight text-white sm:text-[0.75rem]">
                  {label}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
