"use client";

import { motion, useReducedMotion } from "motion/react";

import { conceptGalleryEntries } from "@/data/concept-gallery";

const previewEntries = conceptGalleryEntries.slice(0, 4);

const sharedStages = [
  { label: "Stage rail", note: "Always the first click" },
  { label: "Visual pipeline", note: "The main teaching surface" },
  { label: "Optional detail", note: "Only when needed" },
];

export function ConceptPreview() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="surface relative overflow-hidden p-4 sm:p-6"
      initial={{ opacity: 0, scale: 0.96, y: 24 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(143,181,255,0.12),rgba(143,181,255,0)_48%)]" />
      <div className="relative z-10 space-y-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="section-eyebrow">Shared interaction model</p>
            <h2 className="mt-2 font-[family:var(--font-display)] text-2xl font-semibold text-white">
              One pipeline language, many concepts.
            </h2>
          </div>
          <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[var(--color-muted)]">
            {`${conceptGalleryEntries.length} live concepts`}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[1.7rem] border border-white/10 bg-[linear-gradient(180deg,rgba(8,12,24,0.96),rgba(5,8,18,0.98))] p-5 sm:p-6">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div
            className="absolute inset-[10%_8%_14%] rounded-[1.8rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.015))] shadow-[0_42px_90px_rgba(4,10,24,0.36)]"
            style={{ transform: "perspective(1400px) rotateX(16deg)" }}
          />
          <div className="relative grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(17rem,20rem)] lg:items-start">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-[rgba(149,187,255,0.26)] bg-[rgba(137,181,255,0.12)] px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-[var(--color-accent)]">
                  3D guided pipeline
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[0.68rem] uppercase tracking-[0.16em] text-white/80">
                  Minimal navigation
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {sharedStages.map((item, index) => (
                  <motion.article
                    key={item.label}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-[1.25rem] border border-white/10 bg-[rgba(8,12,24,0.76)] px-4 py-4 shadow-[0_24px_55px_rgba(4,10,24,0.24)]"
                    initial={{ opacity: 0, y: 10 }}
                    transition={{
                      delay: shouldReduceMotion ? 0 : 0.04 + index * 0.06,
                      duration: shouldReduceMotion ? 0 : 0.28,
                      ease: "easeOut",
                    }}
                  >
                    <p className="text-[0.68rem] uppercase tracking-[0.16em] text-[var(--color-accent)]">
                      {`0${index + 1}`}
                    </p>
                    <p className="mt-3 text-sm font-semibold text-white">{item.label}</p>
                    <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                      {item.note}
                    </p>
                  </motion.article>
                ))}
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {previewEntries.map((entry, index) => (
                  <motion.article
                    key={entry.href}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative overflow-hidden rounded-[1.3rem] border border-white/10 px-4 py-4"
                    initial={{ opacity: 0, y: 12 }}
                    style={{ backgroundImage: entry.theme.canvas }}
                    transition={{
                      delay: shouldReduceMotion ? 0 : 0.12 + index * 0.05,
                      duration: shouldReduceMotion ? 0 : 0.28,
                      ease: "easeOut",
                    }}
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,10,22,0.2),rgba(7,10,22,0.88))]" />
                    <div className="relative space-y-3">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-[0.68rem] uppercase tracking-[0.16em] text-white/70">
                          {entry.format}
                        </span>
                        <span className="text-xs text-[rgba(229,235,255,0.72)]">
                          {`${entry.stageCount} stages`}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-base font-semibold text-white">{entry.title}</h3>
                        <p className="text-sm text-[rgba(229,235,255,0.72)]">
                          {entry.stagePreview.join(" -> ")}
                        </p>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>

            <aside className="surface-muted space-y-4 p-5">
              <div className="space-y-2">
                <p className="section-eyebrow">Usability focus</p>
                <h3 className="text-xl font-semibold text-white">
                  Fewer competing clicks.
                </h3>
                <p className="text-sm leading-6 text-[var(--color-muted)]">
                  The interface keeps one primary action path visible at a time:
                  choose a stage, inspect the pipeline change, then open extra detail
                  only if you need it.
                </p>
              </div>
              <div className="grid gap-2">
                {[
                  "Consistent control placement reduces relearning.",
                  "Large targets keep touch and pointer use straightforward.",
                  "Collapsed glossary and sources protect focus.",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-[1rem] border border-white/10 bg-white/[0.03] px-3 py-3 text-sm leading-6 text-[var(--color-muted)]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
