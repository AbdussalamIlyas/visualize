"use client";

import { motion, useReducedMotion } from "motion/react";

const previewStages = [
  "Intake",
  "Compression",
  "Combustion",
  "Turbine",
  "Exhaust",
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
      <div className="absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top,rgba(137,181,255,0.22),rgba(137,181,255,0)_70%)]" />
      <div className="relative z-10 space-y-2">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-[family:var(--font-display)] text-2xl font-semibold text-white">
              How a Jet Engine Works
            </h2>
          </div>
          <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[var(--color-muted)]">
            5 stages
          </div>
        </div>
      </div>
      <div className="relative mt-8 overflow-hidden rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(12,18,37,0.88),rgba(8,12,24,0.95))] p-5 sm:p-6">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="relative space-y-5">
          <div className="relative aspect-[20/9] overflow-hidden rounded-[1.35rem] border border-white/10 bg-[linear-gradient(180deg,rgba(8,12,24,0.98),rgba(6,10,18,0.98))]">
            <div className="absolute inset-x-[6%] top-[18%] bottom-[18%] rounded-[999px] border border-white/10 bg-[linear-gradient(180deg,rgba(32,40,60,0.58),rgba(12,16,28,0.9))]" />
            <div className="absolute inset-x-[12%] top-[30%] h-[40%] rounded-[999px] border border-white/10 bg-[linear-gradient(180deg,rgba(22,28,45,0.6),rgba(9,12,22,0.96))]" />
            <div className="absolute left-[11%] top-[28%] h-[44%] w-[12%] rounded-full border border-[rgba(149,187,255,0.24)] bg-[rgba(137,181,255,0.1)]" />
            <div className="absolute left-[27%] top-[38%] h-[24%] w-[16%] rounded-[999px] border border-[rgba(149,187,255,0.24)] bg-[rgba(137,181,255,0.1)]" />
            <div className="absolute left-[47%] top-[32%] h-[36%] w-[14%] rounded-[35%] border border-[rgba(255,163,96,0.3)] bg-[radial-gradient(circle_at_center,rgba(255,163,96,0.26),rgba(255,102,64,0.08))]" />
            <div className="absolute left-[64%] top-[37%] h-[26%] w-[12%] rounded-[999px] border border-[rgba(255,209,132,0.24)] bg-[rgba(255,209,132,0.08)]" />
            <div
              className="absolute left-[77%] top-[38%] h-[24%] w-[16%] border border-[rgba(149,187,255,0.24)] bg-[rgba(137,181,255,0.08)]"
              style={{ clipPath: "polygon(0 0, 100% 18%, 100% 82%, 0 100%, 10% 50%)" }}
            />
            <motion.span
              animate={
                shouldReduceMotion
                  ? { opacity: 0.8 }
                  : { opacity: [0.2, 0.9, 0.2], x: ["0%", "58%"] }
              }
              className="absolute left-[18%] top-[29%] h-2.5 w-2.5 rounded-full bg-[var(--color-accent-secondary)]"
              transition={{
                duration: shouldReduceMotion ? 0 : 2.6,
                ease: "linear",
                repeat: shouldReduceMotion ? 0 : Infinity,
              }}
            />
            <motion.span
              animate={
                shouldReduceMotion
                  ? { opacity: 0.8 }
                  : { opacity: [0.2, 0.9, 0.2], x: ["0%", "23%"] }
              }
              className="absolute left-[72%] top-[49%] h-2.5 w-2.5 rounded-full bg-[#ffb26b]"
              transition={{
                duration: shouldReduceMotion ? 0 : 1.8,
                ease: "linear",
                repeat: shouldReduceMotion ? 0 : Infinity,
              }}
            />
          </div>
          <div className="grid gap-2 sm:grid-cols-5">
            {previewStages.map((stage, index) => (
              <motion.div
                key={stage}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-[1.15rem] border border-white/10 bg-white/[0.03] px-3 py-3"
                initial={{ opacity: 0, y: 10 }}
                transition={{
                  delay: 0.05 + index * 0.05,
                  duration: 0.3,
                  ease: "easeOut",
                }}
              >
                <p className="text-sm text-white">{stage}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
