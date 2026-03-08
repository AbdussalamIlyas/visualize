"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { startTransition, useState } from "react";

import { Pill } from "@/components/ui/pill";
import type {
  Hotspot,
  PipelineExplainer,
  StageMetricTone,
  VisualConnection,
  VisualLayer,
  VisualLayerTone,
} from "@/lib/concept-schema";
import {
  getDefaultHotspotId,
  getDefaultPipelineStage,
  getHotspotById,
  getLayerById,
  getPipelineStageById,
  getStageHotspots,
} from "@/lib/concept-utils";
import { cx } from "@/lib/utils";

type PipelineExplainerProps = {
  explainer: PipelineExplainer;
};

function toneClasses(tone: VisualLayerTone, isActive: boolean) {
  if (tone === "warning") {
    return isActive
      ? "border-[rgba(255,157,122,0.42)] bg-[linear-gradient(180deg,rgba(255,157,122,0.22),rgba(39,20,22,0.95))]"
      : "border-[rgba(255,157,122,0.2)] bg-[rgba(39,20,22,0.82)]";
  }

  if (tone === "secondary") {
    return isActive
      ? "border-[rgba(81,224,203,0.42)] bg-[linear-gradient(180deg,rgba(81,224,203,0.18),rgba(16,32,35,0.94))]"
      : "border-[rgba(81,224,203,0.2)] bg-[rgba(13,28,33,0.82)]";
  }

  if (tone === "accent") {
    return isActive
      ? "border-[rgba(149,187,255,0.44)] bg-[linear-gradient(180deg,rgba(137,181,255,0.24),rgba(16,24,48,0.95))]"
      : "border-[rgba(149,187,255,0.2)] bg-[rgba(14,20,38,0.84)]";
  }

  return isActive
    ? "border-white/20 bg-[rgba(35,40,57,0.92)]"
    : "border-white/10 bg-[rgba(17,22,35,0.82)]";
}

function metricToneClasses(tone: StageMetricTone = "neutral") {
  if (tone === "warning") {
    return "border-[rgba(255,157,122,0.18)] bg-[rgba(255,157,122,0.08)]";
  }

  if (tone === "accent") {
    return "border-[rgba(149,187,255,0.18)] bg-[rgba(137,181,255,0.08)]";
  }

  return "border-white/10 bg-white/[0.03]";
}

function getConnectionState(
  connection: VisualConnection,
  visibleLayerIds: Set<string>,
  highlightedLayerIds: Set<string>,
) {
  const isVisible =
    visibleLayerIds.has(connection.sourceLayerId) &&
    visibleLayerIds.has(connection.targetLayerId);
  const isHighlighted =
    highlightedLayerIds.has(connection.sourceLayerId) ||
    highlightedLayerIds.has(connection.targetLayerId);

  return { isVisible, isHighlighted };
}

function getLayerCenter(layer: VisualLayer) {
  return {
    x: layer.position.x + layer.position.width / 2,
    y: layer.position.y + layer.position.height / 2,
  };
}

export function PipelineExplainerView({ explainer }: PipelineExplainerProps) {
  const shouldReduceMotion = useReducedMotion();
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
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-wrap items-center gap-2">
                    <Pill tone="accent">{explainer.heroKicker}</Pill>
                    <p className="text-sm text-[var(--color-muted)]">
                      Tap a stage or hotspot.
                    </p>
                  </div>
                  <p className="text-sm text-[var(--color-muted)]">
                    Cue: {currentStage.actionLabel}
                  </p>
                </div>

                <div
                  aria-label="Walkthrough stages"
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
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px]" />
                  <div className="relative aspect-[16/11] sm:aspect-[16/9]">
                    <svg
                      aria-hidden="true"
                      className="absolute inset-0 h-full w-full"
                      preserveAspectRatio="none"
                      viewBox="0 0 100 100"
                    >
                      {explainer.connections.map((connection) => {
                        const source = getLayerById(explainer, connection.sourceLayerId);
                        const target = getLayerById(explainer, connection.targetLayerId);

                        if (!source || !target) {
                          return null;
                        }

                        const sourceCenter = getLayerCenter(source);
                        const targetCenter = getLayerCenter(target);
                        const connectionState = getConnectionState(
                          connection,
                          visibleLayerIds,
                          highlightedLayerIds,
                        );

                        if (!connectionState.isVisible) {
                          return null;
                        }

                        return (
                          <motion.line
                            key={connection.id}
                            animate={{
                              opacity: connectionState.isHighlighted ? 0.95 : 0.38,
                              strokeWidth: connectionState.isHighlighted ? 2.8 : 1.6,
                            }}
                            initial={false}
                            stroke={
                              connectionState.isHighlighted
                                ? "rgba(143,181,255,0.9)"
                                : "rgba(163,177,214,0.36)"
                            }
                            x1={sourceCenter.x}
                            x2={targetCenter.x}
                            y1={sourceCenter.y}
                            y2={targetCenter.y}
                          />
                        );
                      })}
                    </svg>

                    {explainer.layers.map((layer) => {
                      const isVisible = visibleLayerIds.has(layer.id);

                      if (!isVisible) {
                        return null;
                      }

                      const isHighlighted = highlightedLayerIds.has(layer.id);
                      const isDimmed = !isHighlighted;
                      const isOutput = layer.id === "output";

                      return (
                        <motion.div
                          key={layer.id}
                          animate={
                            shouldReduceMotion
                              ? { opacity: 1 }
                              : {
                                  opacity: 1,
                                  scale: isHighlighted ? 1.01 : 1,
                                  y: 0,
                                }
                          }
                          className="absolute"
                          initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                          style={{
                            left: `${layer.position.x}%`,
                            top: `${layer.position.y}%`,
                            width: `${layer.position.width}%`,
                            height: `${layer.position.height}%`,
                          }}
                          transition={{ duration: shouldReduceMotion ? 0 : 0.24 }}
                        >
                          <div
                            className={cx(
                              "flex h-full flex-col justify-between rounded-[1.5rem] border px-4 py-4 shadow-[0_20px_55px_rgba(4,10,24,0.38)] backdrop-blur-sm transition sm:px-5",
                              toneClasses(layer.tone, isHighlighted),
                              isDimmed && "opacity-80",
                            )}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <span className="rounded-full border border-white/10 bg-white/[0.06] px-2 py-1 text-[0.68rem] uppercase tracking-[0.16em] text-[var(--color-muted)]">
                                {layer.shortLabel}
                              </span>
                              <span
                                className={cx(
                                  "h-2.5 w-2.5 rounded-full",
                                  isHighlighted
                                    ? "bg-[var(--color-accent)] shadow-[0_0_18px_rgba(143,181,255,0.7)]"
                                    : "bg-white/20",
                                )}
                              />
                            </div>
                            <div className="space-y-2">
                              <h3 className="text-base font-semibold text-white sm:text-lg">
                                {layer.label}
                              </h3>
                              {isOutput && currentStage.statePatch.outputLabel ? (
                                <p className="rounded-[1rem] border border-white/10 bg-white/[0.05] px-3 py-2 text-xs font-medium text-white">
                                  {currentStage.statePatch.outputLabel}
                                </p>
                              ) : null}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}

                    {stageHotspots.map((hotspot) => {
                      const isActive = hotspot.id === activeHotspot?.id;

                      return (
                        <motion.button
                          key={hotspot.id}
                          animate={shouldReduceMotion ? undefined : { scale: 1 }}
                          className="absolute -translate-x-1/2 -translate-y-1/2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
                          onClick={() => handleSelectHotspot(hotspot)}
                          style={{
                            left: `${hotspot.anchor.x}%`,
                            top: `${hotspot.anchor.y}%`,
                          }}
                          type="button"
                          whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                        >
                          <span
                            className={cx(
                              "flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-medium shadow-[0_18px_40px_rgba(4,10,24,0.38)] backdrop-blur-md transition",
                              hotspot.tone === "warning"
                                ? "border-[rgba(255,157,122,0.24)] bg-[rgba(49,20,20,0.88)] text-white"
                                : hotspot.tone === "secondary"
                                  ? "border-[rgba(81,224,203,0.24)] bg-[rgba(12,31,35,0.88)] text-white"
                                  : "border-[rgba(149,187,255,0.24)] bg-[rgba(15,22,40,0.92)] text-white",
                              isActive && "scale-[1.02]",
                            )}
                          >
                            <span
                              className={cx(
                                "h-2.5 w-2.5 rounded-full",
                                hotspot.tone === "warning"
                                  ? "bg-[#ff9d7a]"
                                  : hotspot.tone === "secondary"
                                    ? "bg-[var(--color-accent-secondary)]"
                                    : "bg-[var(--color-accent)]",
                              )}
                            />
                            <span className="hidden sm:inline">{hotspot.label}</span>
                          </span>
                        </motion.button>
                      );
                    })}

                    <div className="pointer-events-none absolute inset-x-4 bottom-4 rounded-[1.25rem] border border-white/10 bg-[rgba(8,12,24,0.72)] px-4 py-3 backdrop-blur-md sm:inset-x-auto sm:left-4 sm:max-w-xl">
                      <p className="text-[0.68rem] uppercase tracking-[0.16em] text-[var(--color-accent)]">
                        Current change
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
                    <h4 className="text-lg font-semibold text-white">Hotspots</h4>
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
                    <p className="text-sm text-[var(--color-muted)]">No hotspots yet.</p>
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
