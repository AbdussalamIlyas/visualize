import type { ReactNode } from "react";

import { cx } from "@/lib/utils";

type PillProps = {
  children: ReactNode;
  className?: string;
  tone?: "neutral" | "accent";
};

export function Pill({ children, className, tone = "neutral" }: PillProps) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium tracking-[0.16em] uppercase",
        tone === "accent"
          ? "border-[rgba(149,187,255,0.35)] bg-[rgba(137,181,255,0.12)] text-[var(--color-accent)]"
          : "border-white/10 bg-white/5 text-[var(--color-muted)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
