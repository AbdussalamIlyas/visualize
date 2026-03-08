"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { Pill } from "@/components/ui/pill";
import {
  difficultyLevels,
  difficultyMetadata,
  type DifficultyLevel,
} from "@/lib/concept-schema";
import { cx } from "@/lib/utils";

type DifficultySwitcherProps = {
  value: DifficultyLevel;
  onChange: (value: DifficultyLevel) => void;
};

export function DifficultySwitcher({
  value,
  onChange,
}: DifficultySwitcherProps) {
  const shouldReduceMotion = useReducedMotion();
  const selectedMeta = difficultyMetadata[value];

  return (
    <section
      aria-labelledby="difficulty-switcher-title"
      className="surface px-4 py-4 sm:px-6"
    >
      <div className="space-y-5">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-1">
            <h2 className="section-eyebrow" id="difficulty-switcher-title">
              Difficulty
            </h2>
            <p className="text-sm leading-6 text-[var(--color-muted)] sm:text-base">
              Keep the concept map stable while changing the depth and precision of
              the explanation.
            </p>
          </div>
          <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.03] px-4 py-3 text-sm leading-6 text-[var(--color-muted)] lg:max-w-sm">
            The node layout stays fixed. Only the explanation language, detail,
            and technical precision change.
          </div>
        </div>
        <div
          aria-label="Difficulty levels"
          className="flex snap-x gap-2 overflow-x-auto pb-1 sm:grid sm:grid-cols-2 sm:overflow-visible xl:grid-cols-5"
          role="tablist"
        >
          {difficultyLevels.map((level) => {
            const isActive = level === value;
            const meta = difficultyMetadata[level];

            return (
              <button
                key={level}
                aria-controls="concept-detail-panel"
                aria-selected={isActive}
                className={cx(
                  "group relative min-w-[14rem] snap-start overflow-hidden rounded-[1.35rem] border px-4 py-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)] sm:min-w-0",
                  isActive
                    ? "border-[rgba(149,187,255,0.4)] bg-[rgba(137,181,255,0.12)] text-white"
                    : "border-white/10 bg-white/[0.03] text-[var(--color-muted)] hover:border-white/20 hover:bg-white/[0.06] hover:text-white",
                )}
                onClick={() => onChange(level)}
                role="tab"
                type="button"
              >
                {isActive ? (
                  <motion.span
                    className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(137,181,255,0.18),rgba(137,181,255,0)_70%)]"
                    layoutId="difficulty-highlight"
                  />
                ) : null}
                <div className="relative flex h-full flex-col justify-between gap-6">
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className={cx(
                        "rounded-full px-2 py-1 text-[0.68rem] font-medium uppercase tracking-[0.16em]",
                        isActive
                          ? "bg-white/[0.1] text-white"
                          : "bg-white/[0.04] text-[var(--color-muted)]",
                      )}
                    >
                      Level {meta.order}
                    </span>
                    <span
                      className={cx(
                        "h-2.5 w-2.5 rounded-full transition",
                        isActive
                          ? "bg-[var(--color-accent)] shadow-[0_0_18px_rgba(143,181,255,0.75)]"
                          : "bg-white/20 group-hover:bg-white/35",
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <span className="relative block text-sm font-semibold text-white">
                      {level}
                    </span>
                    <span className="relative block text-xs leading-5 text-[var(--color-muted)]">
                      {meta.summary}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={value}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            className="surface-muted overflow-hidden px-4 py-4 sm:px-5"
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.24, ease: "easeOut" }}
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Pill tone="accent">{value}</Pill>
                  <Pill>{`Level ${selectedMeta.order} of 5`}</Pill>
                </div>
                <p className="max-w-3xl text-sm leading-7 text-white sm:text-base">
                  {selectedMeta.lens}
                </p>
              </div>
              <p className="max-w-lg text-sm leading-6 text-[var(--color-muted)]">
                {selectedMeta.audience}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
