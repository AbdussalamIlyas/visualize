"use client";

import { motion, useReducedMotion } from "motion/react";

import type { ConceptExplainer } from "@/lib/concept-schema";
import { cx } from "@/lib/utils";

type ExplainerSwitcherProps = {
  explainers: ConceptExplainer[];
  value: string;
  onChange: (explainerId: string) => void;
};

export function ExplainerSwitcher({
  explainers,
  value,
  onChange,
}: ExplainerSwitcherProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="explainer-switcher-title"
      className="surface px-4 py-4 sm:px-6"
    >
      <div className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="section-eyebrow" id="explainer-switcher-title">
            Views
          </h2>
          <p className="text-sm text-[var(--color-muted)]">
            Walkthrough first. Map if you need vocabulary.
          </p>
        </div>
        <div
          aria-label="Explainer view picker"
          className="grid gap-3 lg:grid-cols-2"
          role="tablist"
        >
          {explainers.map((explainer, index) => {
            const isActive = explainer.id === value;

            return (
              <button
                key={explainer.id}
                aria-selected={isActive}
                className={cx(
                  "group relative overflow-hidden rounded-[1.5rem] border px-4 py-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)] sm:px-5 sm:py-5",
                  isActive
                    ? "border-[rgba(149,187,255,0.42)] bg-[rgba(137,181,255,0.12)]"
                    : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]",
                )}
                onClick={() => onChange(explainer.id)}
                role="tab"
                type="button"
              >
                {isActive ? (
                  <motion.span
                    className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(137,181,255,0.18),rgba(137,181,255,0)_72%)]"
                    layoutId="explainer-switcher-highlight"
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.18,
                      ease: "easeOut",
                    }}
                  />
                ) : null}
                <div className="relative flex h-full flex-col gap-3">
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-[0.68rem] uppercase tracking-[0.16em] text-[var(--color-accent)]">
                      {index === 0 ? "Primary" : explainer.type}
                    </span>
                    <span
                      className={cx(
                        "h-2.5 w-2.5 rounded-full transition",
                        isActive
                          ? "bg-[var(--color-accent)] shadow-[0_0_18px_rgba(143,181,255,0.7)]"
                          : "bg-white/20 group-hover:bg-white/35",
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-white">
                      {explainer.title}
                    </h3>
                    <p className="text-sm leading-6 text-[var(--color-muted)]">
                      {explainer.summary}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
