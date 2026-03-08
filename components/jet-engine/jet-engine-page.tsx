"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { startTransition, useState } from "react";

import { SupportPanels } from "@/components/concept/support-panels";
import { Container } from "@/components/ui/container";
import { Pill } from "@/components/ui/pill";
import { jetEngineConcept, type JetEngineHotspot } from "@/data/how-a-jet-engine-works";
import { cx } from "@/lib/utils";

const engineSegments = [
  { id: "fan", left: 11, top: 28, width: 12, height: 44, shape: "circle" },
  { id: "bypass-top", left: 21, top: 24, width: 49, height: 10, shape: "pill" },
  { id: "bypass-bottom", left: 21, top: 66, width: 49, height: 10, shape: "pill" },
  { id: "compressor", left: 27, top: 38, width: 16, height: 24, shape: "pill" },
  { id: "combustor", left: 47, top: 32, width: 14, height: 36, shape: "combustor" },
  { id: "turbine", left: 64, top: 37, width: 12, height: 26, shape: "pill" },
  { id: "nozzle", left: 77, top: 38, width: 16, height: 24, shape: "nozzle" },
  { id: "core-shell", left: 20, top: 36, width: 64, height: 28, shape: "capsule" },
] as const;

const fanBladeRotations = [0, 32, 64, 96, 128];

function getHotspotsForStage(stageId: string) {
  return jetEngineConcept.hotspots.filter((hotspot) => hotspot.stageIds.includes(stageId));
}

function getFlowDots(stageId: string) {
  if (stageId === "intake") {
    return [
      { top: 31, left: 5, travel: 18, count: 6, tone: "cool" },
      { top: 50, left: 5, travel: 18, count: 6, tone: "cool" },
      { top: 69, left: 5, travel: 18, count: 6, tone: "cool" },
    ];
  }

  if (stageId === "compression") {
    return [{ top: 50, left: 24, travel: 19, count: 8, tone: "cool" }];
  }

  if (stageId === "combustion") {
    return [{ top: 50, left: 44, travel: 18, count: 7, tone: "hot" }];
  }

  if (stageId === "turbine") {
    return [{ top: 50, left: 61, travel: 14, count: 6, tone: "hot" }];
  }

  return [
    { top: 29, left: 22, travel: 56, count: 8, tone: "cool" },
    { top: 50, left: 72, travel: 19, count: 7, tone: "hot" },
    { top: 71, left: 22, travel: 56, count: 8, tone: "cool" },
  ];
}

function segmentClasses(segmentId: string, isActive: boolean) {
  const activeClass = isActive
    ? "border-[rgba(149,187,255,0.42)] bg-[rgba(137,181,255,0.16)] shadow-[0_0_40px_rgba(137,181,255,0.18)]"
    : "border-white/10 bg-white/[0.03]";

  if (segmentId === "combustor") {
    return isActive
      ? "border-[rgba(255,163,96,0.5)] bg-[radial-gradient(circle_at_center,rgba(255,163,96,0.32),rgba(255,102,64,0.12))] shadow-[0_0_42px_rgba(255,137,94,0.24)]"
      : "border-[rgba(255,163,96,0.18)] bg-[rgba(94,38,22,0.36)]";
  }

  if (segmentId === "bypass-top" || segmentId === "bypass-bottom") {
    return isActive
      ? "border-[rgba(81,224,203,0.38)] bg-[rgba(81,224,203,0.14)] shadow-[0_0_36px_rgba(81,224,203,0.18)]"
      : "border-[rgba(81,224,203,0.18)] bg-[rgba(16,40,42,0.34)]";
  }

  return activeClass;
}

function HotspotDetails({
  hotspot,
  shouldReduceMotion,
}: {
  hotspot: JetEngineHotspot | null;
  shouldReduceMotion: boolean;
}) {
  if (!hotspot) {
    return <p className="text-sm text-[var(--color-muted)]">Pick a hotspot.</p>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.article
        key={hotspot.id}
        animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        className="rounded-[1.35rem] border border-white/10 bg-white/[0.03] px-4 py-4"
        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.18, ease: "easeOut" }}
      >
        <h3 className="text-lg font-semibold text-white">{hotspot.label}</h3>
        <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
          {hotspot.body}
        </p>
      </motion.article>
    </AnimatePresence>
  );
}

export function JetEnginePage() {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const [stageId, setStageId] = useState(jetEngineConcept.stages[0].id);

  const stage =
    jetEngineConcept.stages.find((item) => item.id === stageId) ??
    jetEngineConcept.stages[0];
  const currentIndex = jetEngineConcept.stages.findIndex(
    (item) => item.id === stage.id,
  );
  const hotspots = getHotspotsForStage(stage.id);
  const [hotspotId, setHotspotId] = useState(hotspots[0]?.id ?? "");
  const activeHotspot = hotspots.find((hotspot) => hotspot.id === hotspotId) ?? hotspots[0] ?? null;
  const highlightedSegments = new Set(stage.highlightedSegmentIds);
  const flowDots = getFlowDots(stage.id);

  function handleSelectStage(nextStageId: string) {
    if (nextStageId === stage.id) {
      return;
    }

    const nextStage =
      jetEngineConcept.stages.find((item) => item.id === nextStageId) ??
      jetEngineConcept.stages[0];
    const nextHotspots = getHotspotsForStage(nextStage.id);

    startTransition(() => {
      setStageId(nextStage.id);
      setHotspotId(nextHotspots[0]?.id ?? "");
    });
  }

  function handleStep(direction: -1 | 1) {
    const nextStage = jetEngineConcept.stages[currentIndex + direction];

    if (!nextStage) {
      return;
    }

    handleSelectStage(nextStage.id);
  }

  function handleSelectHotspot(nextHotspotId: string) {
    if (nextHotspotId === activeHotspot?.id) {
      return;
    }

    startTransition(() => {
      setHotspotId(nextHotspotId);
    });
  }

  return (
    <div className="pb-16 pt-10 sm:pb-24 sm:pt-14">
      <Container className="space-y-4">
        <section className="surface overflow-hidden px-5 py-6 sm:px-8 sm:py-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <Pill tone="accent">Finished flagship</Pill>
                <Pill>{`${jetEngineConcept.estimatedMinutes} min`}</Pill>
              </div>
              <h1 className="font-[family:var(--font-display)] text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                {jetEngineConcept.title}
              </h1>
              <p className="text-lg leading-8 text-white">
                {jetEngineConcept.question}
              </p>
            </div>
            <p className="text-sm text-[var(--color-muted)] lg:max-w-sm">
              Stage chips first. Hotspots second.
            </p>
          </div>
        </section>

        <section className="surface px-4 py-4 sm:px-6">
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.16em] text-[var(--color-muted)]">
              <span className="rounded-full border border-[rgba(81,224,203,0.2)] bg-[rgba(81,224,203,0.08)] px-3 py-2">
                Cool flow
              </span>
              <span className="rounded-full border border-[rgba(255,163,96,0.2)] bg-[rgba(255,163,96,0.08)] px-3 py-2">
                Hot flow
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2">
                Tap hotspots
              </span>
            </div>
            <div className="flex snap-x gap-2 overflow-x-auto pb-1" role="tablist">
              {jetEngineConcept.stages.map((item, index) => {
                const isActive = item.id === stage.id;

                return (
                  <button
                    key={item.id}
                    aria-controls="jet-engine-stage-panel"
                    aria-selected={isActive}
                    className={cx(
                      "min-w-[12rem] snap-start rounded-[1.25rem] border px-4 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]",
                      isActive
                        ? "border-[rgba(149,187,255,0.38)] bg-[rgba(137,181,255,0.12)]"
                        : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]",
                    )}
                    onClick={() => handleSelectStage(item.id)}
                    role="tab"
                    type="button"
                  >
                    <div className="space-y-2">
                      <div className="text-[0.68rem] uppercase tracking-[0.16em] text-[var(--color-accent)]">
                        {`0${index + 1}`}
                      </div>
                      <p className="text-sm font-semibold text-white">{item.title}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      </Container>

      <div className="relative left-1/2 mt-6 w-screen -translate-x-1/2 px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[92rem]">
          <section className="surface overflow-hidden p-4 sm:p-6 lg:p-7">
            <div className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(22rem,26rem)]">
              <div className="space-y-4">
                <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(7,11,24,0.98),rgba(5,8,18,0.98))]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(137,181,255,0.14),rgba(137,181,255,0)_45%)]" />
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px]" />
                  <div className="relative aspect-[20/9]">
                    <div className="absolute inset-x-[6%] top-[18%] bottom-[18%] rounded-[999px] border border-white/10 bg-[linear-gradient(180deg,rgba(32,40,60,0.6),rgba(12,16,28,0.92))] shadow-[0_32px_80px_rgba(4,10,24,0.42)]" />
                    <div className="absolute inset-x-[12%] top-[30%] h-[40%] rounded-[999px] border border-white/10 bg-[linear-gradient(180deg,rgba(22,28,45,0.6),rgba(9,12,22,0.96))]" />

                    <div className="absolute left-[18%] top-[31%] h-[38%] w-px bg-[linear-gradient(180deg,rgba(255,255,255,0),rgba(255,255,255,0.42),rgba(255,255,255,0))]" />
                    <div className="absolute left-[59%] top-[31%] h-[38%] w-px bg-[linear-gradient(180deg,rgba(255,255,255,0),rgba(255,255,255,0.42),rgba(255,255,255,0))]" />

                    {engineSegments.map((segment) => {
                      const isActive = highlightedSegments.has(segment.id);
                      const shapeClass =
                        segment.shape === "circle"
                          ? "rounded-full"
                          : segment.shape === "combustor"
                            ? "rounded-[35%]"
                            : segment.shape === "nozzle"
                              ? ""
                              : "rounded-[999px]";

                      return (
                        <motion.div
                          key={segment.id}
                          animate={
                            shouldReduceMotion
                              ? { opacity: 1 }
                              : { opacity: 1, scale: isActive ? 1.01 : 1 }
                          }
                          className={cx(
                            "absolute border backdrop-blur-sm transition",
                            shapeClass,
                            segmentClasses(segment.id, isActive),
                          )}
                          initial={false}
                          style={{
                            clipPath:
                              segment.shape === "nozzle"
                                ? "polygon(0 0, 100% 18%, 100% 82%, 0 100%, 10% 50%)"
                                : undefined,
                            left: `${segment.left}%`,
                            top: `${segment.top}%`,
                            width: `${segment.width}%`,
                            height: `${segment.height}%`,
                          }}
                        />
                      );
                    })}

                    <div className="absolute left-[45%] top-[49%] h-[2%] w-[27%] rounded-full bg-[rgba(255,255,255,0.22)]" />

                    <div className="absolute left-[13.2%] top-[34%] h-[32%] w-[7.5%] rounded-full border border-[rgba(149,187,255,0.24)]">
                      {fanBladeRotations.map((rotation) => (
                        <motion.span
                          key={rotation}
                          animate={shouldReduceMotion ? undefined : { rotate: rotation + 360 }}
                          className="absolute left-1/2 top-1/2 h-[38%] w-[10%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(143,181,255,0.42)]"
                          style={{ transform: `translate(-50%, -50%) rotate(${rotation}deg)` }}
                          transition={{
                            duration: 5,
                            ease: "linear",
                            repeat: Infinity,
                          }}
                        />
                      ))}
                    </div>

                    {[0, 1, 2, 3, 4].map((blade) => (
                      <div
                        key={`compressor-${blade}`}
                        className="absolute top-[40%] h-[20%] w-[1.4%] rounded-full bg-[rgba(143,181,255,0.34)]"
                        style={{ left: `${30 + blade * 2.4}%`, transform: "skewX(-20deg)" }}
                      />
                    ))}

                    {[0, 1, 2, 3].map((blade) => (
                      <div
                        key={`turbine-${blade}`}
                        className="absolute top-[41%] h-[18%] w-[1.1%] rounded-full bg-[rgba(255,209,132,0.38)]"
                        style={{ left: `${66.5 + blade * 2.1}%`, transform: "skewX(18deg)" }}
                      />
                    ))}

                    <div className="absolute left-[49%] top-[39%] h-[22%] w-[10%] rounded-[45%] bg-[radial-gradient(circle_at_center,rgba(255,186,106,0.58),rgba(255,92,64,0.15),rgba(255,92,64,0))] blur-[2px]" />

                    {flowDots.map((band) =>
                      Array.from({ length: band.count }).map((_, index) => (
                        <motion.span
                          key={`${band.top}-${band.left}-${index}`}
                          animate={
                            shouldReduceMotion
                              ? { opacity: 0.75 }
                              : {
                                  opacity: [0.2, 0.9, 0.2],
                                  x: [`0%`, `${band.travel}%`],
                                }
                          }
                          className={cx(
                            "absolute h-2.5 w-2.5 rounded-full",
                            band.tone === "hot"
                              ? "bg-[#ffb26b]"
                              : "bg-[var(--color-accent-secondary)]",
                          )}
                          initial={shouldReduceMotion ? false : { opacity: 0.15 }}
                          style={{
                            left: `${band.left + index * 1.2}%`,
                            top: `${band.top}%`,
                          }}
                          transition={{
                            duration: shouldReduceMotion ? 0 : 2.4 + index * 0.12,
                            ease: "linear",
                            repeat: shouldReduceMotion ? 0 : Infinity,
                            delay: shouldReduceMotion ? 0 : index * 0.08,
                          }}
                        />
                      )),
                    )}

                    {hotspots.map((hotspot) => (
                      <button
                        key={hotspot.id}
                        className={cx(
                          "absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-3 py-2 text-xs font-medium shadow-[0_18px_40px_rgba(4,10,24,0.38)] backdrop-blur-md transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]",
                          hotspot.id === activeHotspot?.id
                            ? "border-[rgba(149,187,255,0.34)] bg-[rgba(137,181,255,0.14)] text-white"
                            : "border-white/10 bg-[rgba(10,16,28,0.9)] text-[var(--color-muted)] hover:border-white/20 hover:text-white",
                        )}
                        onClick={() => handleSelectHotspot(hotspot.id)}
                        style={{ left: `${hotspot.anchor.x}%`, top: `${hotspot.anchor.y}%` }}
                        type="button"
                      >
                        <span className="hidden sm:inline">{hotspot.label}</span>
                        <span className="sm:hidden">+</span>
                      </button>
                    ))}

                    <div className="pointer-events-none absolute inset-x-4 bottom-4 rounded-[1.25rem] border border-white/10 bg-[rgba(8,12,24,0.72)] px-4 py-3 backdrop-blur-md sm:left-4 sm:max-w-xl sm:inset-x-auto">
                      <p className="text-[0.68rem] uppercase tracking-[0.16em] text-[var(--color-accent)]">
                        Current stage
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                        {stage.note}
                      </p>
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
                      disabled={currentIndex >= jetEngineConcept.stages.length - 1}
                      onClick={() => handleStep(1)}
                      type="button"
                    >
                      Next stage
                    </button>
                  </div>
                  <p className="text-sm text-[var(--color-muted)]">
                    {`Stage ${currentIndex + 1} of ${jetEngineConcept.stages.length}`}
                  </p>
                </div>
              </div>

              <aside className="surface-muted space-y-5 p-5 sm:p-6">
                <div className="space-y-3">
                  <Pill tone="accent">{stage.label}</Pill>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={stage.id}
                      animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
                      id="jet-engine-stage-panel"
                      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                      transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                    >
                      <h2 className="text-2xl font-semibold text-white">
                        {stage.title}
                      </h2>
                      <p className="mt-3 text-base leading-7 text-[var(--color-muted)]">
                        {stage.body}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <section className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="text-lg font-semibold text-white">Hotspots</h2>
                    <span className="text-xs uppercase tracking-[0.16em] text-[var(--color-muted)]">
                      {hotspots.length}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {hotspots.map((hotspot) => (
                      <button
                        key={hotspot.id}
                        className={cx(
                          "rounded-full border px-3 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]",
                          hotspot.id === activeHotspot?.id
                            ? "border-[rgba(149,187,255,0.35)] bg-[rgba(137,181,255,0.12)] text-white"
                            : "border-white/10 bg-white/[0.03] text-[var(--color-muted)] hover:border-white/20 hover:bg-white/[0.06] hover:text-white",
                        )}
                        onClick={() => handleSelectHotspot(hotspot.id)}
                        type="button"
                      >
                        {hotspot.label}
                      </button>
                    ))}
                  </div>
                </section>

                <HotspotDetails
                  hotspot={activeHotspot}
                  shouldReduceMotion={shouldReduceMotion}
                />
              </aside>
            </div>
          </section>
        </div>
      </div>

      <Container className="mt-6">
        <SupportPanels
          currentViewLabel="Jet engine walkthrough"
          glossary={jetEngineConcept.glossary}
          sources={jetEngineConcept.sources}
        />
      </Container>
    </div>
  );
}
