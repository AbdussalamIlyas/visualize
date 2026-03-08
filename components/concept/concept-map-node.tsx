"use client";

import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import { motion, useReducedMotion } from "motion/react";

import { cx } from "@/lib/utils";

export type ConceptMapNodeData = {
  id: string;
  title: string;
  icon: string;
  shortSummary: string;
  isActive: boolean;
  isRelated: boolean;
  isDimmed: boolean;
  onSelect: (nodeId: string) => void;
};

export type ConceptFlowNode = Node<ConceptMapNodeData, "concept">;

const handleClassName =
  "!h-3 !w-3 !border-0 !bg-transparent !opacity-0 pointer-events-none";

export function ConceptMapNode({ data }: NodeProps<ConceptFlowNode>) {
  const shouldReduceMotion = useReducedMotion();
  const stateLabel = data.isActive ? "Selected" : data.isRelated ? "Linked" : "Node";

  return (
    <div className={cx("group relative", data.isDimmed && "opacity-[0.55]")}>
      <Handle className={handleClassName} id="top" position={Position.Top} type="target" />
      <Handle className={handleClassName} id="right" position={Position.Right} type="target" />
      <Handle className={handleClassName} id="bottom" position={Position.Bottom} type="target" />
      <Handle className={handleClassName} id="left" position={Position.Left} type="target" />
      <Handle className={handleClassName} id="top" position={Position.Top} type="source" />
      <Handle className={handleClassName} id="right" position={Position.Right} type="source" />
      <Handle className={handleClassName} id="bottom" position={Position.Bottom} type="source" />
      <Handle className={handleClassName} id="left" position={Position.Left} type="source" />
      <motion.button
        aria-controls="concept-detail-panel"
        aria-label={`Select concept node ${data.title}`}
        aria-pressed={data.isActive}
        className={cx(
          "nodrag relative min-w-[7.5rem] max-w-[9.5rem] overflow-hidden rounded-[1.35rem] border px-3 py-3 text-left shadow-[0_20px_45px_rgba(4,10,24,0.3)] transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)] sm:min-w-[9rem] sm:max-w-[10.75rem] sm:px-4",
          data.isActive
            ? "border-[rgba(149,187,255,0.46)] bg-[linear-gradient(180deg,rgba(137,181,255,0.22),rgba(16,24,48,0.95))] text-white"
            : data.isRelated
              ? "border-[rgba(81,224,203,0.22)] bg-[rgba(15,22,42,0.9)] text-white"
              : "border-white/10 bg-[rgba(14,20,38,0.82)] text-[var(--color-muted)] hover:border-white/20 hover:text-white",
          data.isDimmed && !data.isActive && !data.isRelated && "scale-[0.98] opacity-70",
        )}
        onClick={() => data.onSelect(data.id)}
        type="button"
        transition={{ duration: shouldReduceMotion ? 0 : 0.22, ease: "easeOut" }}
        whileHover={
          shouldReduceMotion
            ? undefined
            : {
                scale: data.isDimmed ? 1 : 1.02,
                y: data.isDimmed ? 0 : -2,
              }
        }
        whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
      >
        <motion.span
          animate={{
            opacity: data.isActive ? 1 : data.isRelated ? 0.72 : 0.2,
            scale: data.isActive ? 1.02 : 0.96,
          }}
          className={cx(
            "pointer-events-none absolute inset-x-6 top-0 h-16 rounded-b-full blur-2xl",
            data.isActive
              ? "bg-[radial-gradient(circle,rgba(143,181,255,0.42),rgba(143,181,255,0))]"
              : "bg-[radial-gradient(circle,rgba(81,224,203,0.18),rgba(81,224,203,0))]",
          )}
          transition={{ duration: shouldReduceMotion ? 0 : 0.25, ease: "easeOut" }}
        />
        <div className="relative flex items-start justify-between gap-3">
          <span
            className={cx(
              "inline-flex h-9 w-9 items-center justify-center rounded-2xl border text-[0.62rem] font-semibold uppercase tracking-[0.18em] sm:h-10 sm:w-10 sm:text-[0.68rem]",
              data.isActive
                ? "border-white/15 bg-white/[0.09] text-white"
                : data.isRelated
                  ? "border-white/10 bg-white/[0.05] text-[var(--color-accent-secondary)]"
                  : "border-white/10 bg-white/[0.04] text-[var(--color-accent)]",
            )}
          >
            {data.icon}
          </span>
          <span
            className={cx(
              "rounded-full px-2 py-1 text-[0.58rem] font-medium uppercase tracking-[0.16em] sm:text-[0.62rem]",
              data.isActive
                ? "bg-white/[0.09] text-white"
                : data.isRelated
                  ? "bg-[rgba(81,224,203,0.09)] text-[var(--color-accent-secondary)]"
                  : "bg-white/[0.04] text-[var(--color-muted)]",
            )}
          >
            {stateLabel}
          </span>
        </div>
        <div className="relative mt-3 space-y-2">
          <p className="text-[0.82rem] font-semibold leading-5 text-white sm:text-sm">
            {data.title}
          </p>
          <p
            className={cx(
              "text-[0.7rem] leading-5 sm:text-xs",
              data.isActive || data.isRelated
                ? "text-[var(--color-muted)]"
                : "text-[rgba(170,181,218,0.9)]",
            )}
          >
            {data.shortSummary}
          </p>
        </div>
      </motion.button>
    </div>
  );
}
