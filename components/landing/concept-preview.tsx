"use client";

import { motion, useReducedMotion } from "motion/react";

import {
  conceptGalleryEntries,
  featuredConceptEntry,
} from "@/data/concept-gallery";

const secondaryEntries = conceptGalleryEntries
  .filter((entry) => entry.href !== featuredConceptEntry.href)
  .slice(0, 3);

export function ConceptPreview() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="surface relative overflow-hidden p-4 sm:p-6"
      initial={{ opacity: 0, scale: 0.96, y: 24 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="relative z-10 space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="section-eyebrow">Library preview</p>
            <h2 className="mt-2 font-[family:var(--font-display)] text-2xl font-semibold text-white">
              Curated for short visual learning.
            </h2>
          </div>
          <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[var(--color-muted)]">
            {`${conceptGalleryEntries.length} concepts`}
          </div>
        </div>

        <div
          className="relative overflow-hidden rounded-[1.6rem] border border-white/10 p-5 sm:p-6"
          style={{ backgroundImage: featuredConceptEntry.theme.canvas }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,10,22,0.18),rgba(7,10,22,0.82))]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="relative space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-[rgba(149,187,255,0.26)] bg-[rgba(137,181,255,0.12)] px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-[var(--color-accent)]">
                    {featuredConceptEntry.status}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[0.68rem] uppercase tracking-[0.16em] text-white/80">
                    {featuredConceptEntry.format}
                  </span>
                </div>
                <h3 className="font-[family:var(--font-display)] text-3xl font-semibold text-white">
                  {featuredConceptEntry.title}
                </h3>
                <p className="max-w-xl text-sm leading-6 text-[rgba(229,235,255,0.76)]">
                  {featuredConceptEntry.question}
                </p>
              </div>
              <div className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs uppercase tracking-[0.16em] text-white/80">
                {`${featuredConceptEntry.stageCount} steps`}
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              {featuredConceptEntry.stagePreview.map((stage, index) => (
                <motion.div
                  key={stage}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-[1.15rem] border border-white/10 bg-[rgba(6,9,18,0.38)] px-3 py-3 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 10 }}
                  transition={{
                    delay: shouldReduceMotion ? 0 : 0.05 + index * 0.06,
                    duration: shouldReduceMotion ? 0 : 0.3,
                    ease: "easeOut",
                  }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[0.68rem] uppercase tracking-[0.16em] text-white/55">
                      {`0${index + 1}`}
                    </p>
                    <motion.span
                      animate={
                        shouldReduceMotion
                          ? { opacity: 0.8 }
                          : { opacity: [0.25, 0.95, 0.25], x: ["-80%", "80%"] }
                      }
                      className="h-2.5 w-10 rounded-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.72),transparent)]"
                      transition={{
                        duration: shouldReduceMotion ? 0 : 2.2 + index * 0.18,
                        ease: "linear",
                        repeat: shouldReduceMotion ? 0 : Infinity,
                      }}
                    />
                  </div>
                  <p className="mt-3 text-sm text-white">{stage}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {secondaryEntries.map((entry, index) => (
            <motion.article
              key={entry.href}
              animate={{ opacity: 1, y: 0 }}
              className="relative overflow-hidden rounded-[1.35rem] border border-white/10 bg-[rgba(9,13,26,0.84)] px-4 py-4"
              initial={{ opacity: 0, y: 10 }}
              transition={{
                delay: shouldReduceMotion ? 0 : 0.12 + index * 0.06,
                duration: shouldReduceMotion ? 0 : 0.28,
                ease: "easeOut",
              }}
            >
              <div
                className="absolute inset-0 opacity-80"
                style={{ backgroundImage: entry.theme.canvas }}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,10,22,0.18),rgba(7,10,22,0.86))]" />
              <div className="relative space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[0.68rem] uppercase tracking-[0.16em] text-white/70">
                    {entry.status}
                  </span>
                  <span className="text-xs text-[rgba(229,235,255,0.72)]">
                    {`${entry.minutes} min`}
                  </span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-semibold text-white">{entry.title}</h3>
                  <p className="text-sm text-[rgba(229,235,255,0.72)]">
                    {entry.stagePreview[0]}
                    {" -> "}
                    {entry.stagePreview[entry.stagePreview.length - 1]}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
