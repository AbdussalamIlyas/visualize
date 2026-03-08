"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { startTransition, useState } from "react";

import type { PipelineSceneCanvasProps } from "@/components/concept/pipeline-scene-canvas";
import { Pill } from "@/components/ui/pill";
import type {
  ConceptTheme,
  Hotspot,
  PipelineExplainer,
  StageMetricTone,
} from "@/lib/concept-schema";
import {
  getDefaultHotspotId,
  getDefaultPipelineStage,
  getHotspotById,
  getPipelineStageById,
  getStageHotspots,
} from "@/lib/concept-utils";
import { cx } from "@/lib/utils";

type PipelineExplainerProps = {
  explainer: PipelineExplainer;
  theme?: ConceptTheme;
};

const PipelineSceneCanvas = dynamic<PipelineSceneCanvasProps>(
  () =>
    import("@/components/concept/pipeline-scene-canvas").then(
      (mod) => mod.PipelineSceneCanvas,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(143,181,255,0.14),rgba(143,181,255,0)_52%)]" />
    ),
  },
);

function metricToneClasses(tone: StageMetricTone = "neutral") {
  if (tone === "warning") {
    return "border-[rgba(255,157,122,0.18)] bg-[rgba(255,157,122,0.08)]";
  }

  if (tone === "accent") {
    return "border-[rgba(149,187,255,0.18)] bg-[rgba(137,181,255,0.08)]";
  }

  return "border-white/10 bg-white/[0.03]";
}

export function PipelineExplainerView({
  explainer,
  theme,
}: PipelineExplainerProps) {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const initialStage = getDefaultPipelineStage(explainer);
  const [stageId, setStageId] = useState(initialStage.id);
  const [hotspotId, setHotspotId] = useState(
    () => getDefaultHotspotId(explainer, initialStage) ?? "",
  );

  const currentStage =
    getPipelineStageById(explainer, stageId) ?? getDefaultPipelineStage(explainer);
  const currentIndex = explainer.stages.findIndex(
    (stage) => stage.id === currentStage.id,
  );
  const stageHotspots = getStageHotspots(explainer, currentStage);
  const activeHotspot =
    getHotspotById(explainer, hotspotId) ?? stageHotspots[0] ?? null;
  const visibleLayerIds = new Set(currentStage.visibleLayerIds);
  const highlightedLayerIds = new Set(currentStage.statePatch.highlightedLayerIds);

  function handleSelectStage(nextStageId: string) {
    if (nextStageId === currentStage.id) {
      return;
    }

    const nextStage = getPipelineStageById(explainer, nextStageId);

    if (!nextStage) {
      return;
    }

    startTransition(() => {
      setStageId(nextStageId);
      setHotspotId(getDefaultHotspotId(explainer, nextStage) ?? "");
    });
  }

  function handleSelectHotspot(nextHotspot: Hotspot) {
    if (nextHotspot.id === activeHotspot?.id) {
      return;
    }

    startTransition(() => {
      setHotspotId(nextHotspot.id);
    });
  }

  function handleStep(direction: -1 | 1) {
    const nextStage = explainer.stages[currentIndex + direction];

    if (!nextStage) {
      return;
    }

    handleSelectStage(nextStage.id);
  }

  return (
    <section className="space-y-4">
      <div className="relative left-1/2 w-screen -translate-x-1/2 px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[92rem]">
          <div className="surface overflow-hidden p-4 sm:p-6 lg:p-7">
            <div className="grid gap-6 xl:grid-cols-[minmax(0,1.62fr)_minmax(19rem,23rem)] xl:items-start">
              <div className="space-y-4">
                <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,20rem)] lg:items-start">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <Pill tone="accent">{explainer.heroKicker}</Pill>
                      <Pill>{`${explainer.stages.length} stages`}</Pill>
                    </div>
                    <div className="space-y-2">
                      <h2 className="font-[family:var(--font-display)] text-3xl font-semibold tracking-tight text-white">
                        {explainer.heroTitle}
                      </h2>
                      <p className="max-w-2xl text-sm leading-6 text-[var(--color-muted)] sm:text-base">
                        {explainer.heroSummary}
                      </p>
                    </div>
                  </div>
                  <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.03] px-4 py-4">
                    <p className="section-eyebrow">Use this first</p>
                    <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">
                      {currentStage.actionLabel}
                    </p>
                    <p className="mt-3 text-xs uppercase tracking-[0.16em] text-[var(--color-muted)]">
                      {"Stage rail -> pipeline change -> optional detail"}
                    </p>
                  </div>
                </div>

                <div
                  aria-label="Guided pipeline stages"
                  className="flex snap-x gap-2 overflow-x-auto pb-1"
                  role="tablist"
                >
                  {explainer.stages.map((stage, index) => {
                    const isActive = stage.id === currentStage.id;

                    return (
                      <button
                        key={stage.id}
                        aria-selected={isActive}
                        className={cx(
                          "relative min-w-[12rem] snap-start overflow-hidden rounded-[1.25rem] border px-4 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]",
                          isActive
                            ? "border-[rgba(149,187,255,0.4)] bg-[rgba(137,181,255,0.12)]"
                            : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]",
                        )}
                        onClick={() => handleSelectStage(stage.id)}
                        role="tab"
                        type="button"
                      >
                        {isActive ? (
                          <motion.span
                            className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(137,181,255,0.18),rgba(137,181,255,0)_72%)]"
                            layoutId="walkthrough-stage-highlight"
                            transition={{
                              duration: shouldReduceMotion ? 0 : 0.18,
                              ease: "easeOut",
                            }}
                          />
                        ) : null}
                        <div className="relative space-y-2">
                          <div className="text-[0.68rem] uppercase tracking-[0.16em] text-[var(--color-accent)]">
                            {`0${index + 1}`}
                          </div>
                          <p className="text-sm font-semibold text-white">
                            {stage.headline}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(8,12,24,0.96),rgba(5,8,18,0.98))]">
                  {theme ? (
                    <div
                      className="absolute inset-0 opacity-80"
                      style={{ backgroundImage: theme.canvas }}
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px]" />
                  <div className="relative aspect-[16/11] sm:aspect-[16/9]">
                    <PipelineSceneCanvas
                      activeHotspotId={activeHotspot?.id ?? null}
                      currentStage={currentStage}
                      explainer={explainer}
                      highlightedLayerIds={highlightedLayerIds}
                      onSelectHotspot={handleSelectHotspot}
                      shouldReduceMotion={shouldReduceMotion}
                      stageHotspots={stageHotspots}
                      theme={theme}
                      visibleLayerIds={visibleLayerIds}
                    />

                    <div className="pointer-events-none absolute inset-x-4 bottom-4 rounded-[1.25rem] border border-white/10 bg-[rgba(8,12,24,0.72)] px-4 py-3 backdrop-blur-md sm:inset-x-auto sm:left-4 sm:max-w-xl">
                      <p className="text-[0.68rem] uppercase tracking-[0.16em] text-[var(--color-accent)]">
                        What changed
                      </p>
                      <AnimatePresence mode="wait">
                        <motion.p
                          key={currentStage.id}
                          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                          className="mt-2 text-sm leading-6 text-[var(--color-muted)]"
                          exit={
                            shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }
                          }
                          initial={
                            shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }
                          }
                          transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                        >
                          {currentStage.statePatch.note}
                        </motion.p>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex gap-2">
                    <button
                      className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white transition hover:border-white/20 hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-45"
                      disabled={currentIndex <= 0}
                      onClick={() => handleStep(-1)}
                      type="button"
                    >
                      Previous stage
                    </button>
                    <button
                      className="rounded-full border border-[rgba(149,187,255,0.32)] bg-[rgba(137,181,255,0.12)] px-4 py-2 text-sm text-white transition hover:border-[rgba(149,187,255,0.52)] hover:bg-[rgba(137,181,255,0.18)] disabled:cursor-not-allowed disabled:opacity-45"
                      disabled={currentIndex >= explainer.stages.length - 1}
                      onClick={() => handleStep(1)}
                      type="button"
                    >
                      Next stage
                    </button>
                  </div>
                  <p className="text-sm text-[var(--color-muted)]">
                    {`Stage ${currentIndex + 1} of ${explainer.stages.length}`}
                  </p>
                </div>
              </div>

              <aside className="surface-muted space-y-5 p-5 sm:p-6">
                <div className="space-y-3">
                  <Pill tone="accent">{currentStage.label}</Pill>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStage.id}
                      animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                      exit={
                        shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }
                      }
                      initial={
                        shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }
                      }
                      transition={{ duration: shouldReduceMotion ? 0 : 0.22 }}
                    >
                      <h3 className="text-2xl font-semibold text-white">
                        {currentStage.headline}
                      </h3>
                      <p className="mt-3 text-base leading-7 text-[var(--color-muted)]">
                        {currentStage.body}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {currentStage.statePatch.metrics.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {currentStage.statePatch.metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className={cx(
                          "rounded-full border px-3 py-2 text-sm text-white",
                          metricToneClasses(metric.tone),
                        )}
                      >
                        <span className="text-[var(--color-muted)]">{metric.label}:</span>{" "}
                        {metric.value}
                      </div>
                    ))}
                  </div>
                ) : null}

                <section className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <h4 className="text-lg font-semibold text-white">Details on demand</h4>
                    <span className="text-xs uppercase tracking-[0.16em] text-[var(--color-muted)]">
                      {stageHotspots.length}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {stageHotspots.map((hotspot) => (
                      <button
                        key={hotspot.id}
                        className={cx(
                          "rounded-full border px-3 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]",
                          hotspot.id === activeHotspot?.id
                            ? "border-[rgba(149,187,255,0.35)] bg-[rgba(137,181,255,0.12)] text-white"
                            : "border-white/10 bg-white/[0.03] text-[var(--color-muted)] hover:border-white/20 hover:bg-white/[0.06] hover:text-white",
                        )}
                        onClick={() => handleSelectHotspot(hotspot)}
                        type="button"
                      >
                        {hotspot.label}
                      </button>
                    ))}
                  </div>

                  {activeHotspot ? (
                    <AnimatePresence mode="wait">
                      <motion.article
                        key={activeHotspot.id}
                        animate={
                          shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }
                        }
                        className="rounded-[1.35rem] border border-white/10 bg-white/[0.03] px-4 py-4"
                        exit={
                          shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }
                        }
                        initial={
                          shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }
                        }
                        transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                      >
                        <h5 className="text-base font-semibold text-white">
                          {activeHotspot.label}
                        </h5>
                        <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                          {activeHotspot.body}
                        </p>
                        {activeHotspot.media ? (
                          <p className="mt-3 rounded-[1rem] border border-white/10 bg-white/[0.04] px-3 py-3 text-sm text-white">
                            {activeHotspot.media}
                          </p>
                        ) : null}
                      </motion.article>
                    </AnimatePresence>
                  ) : (
                    <p className="text-sm text-[var(--color-muted)]">
                      No extra details for this stage.
                    </p>
                  )}
                </section>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
