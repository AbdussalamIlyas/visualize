import Link from "next/link";
import type { CSSProperties } from "react";

import type { ConceptGalleryEntry } from "@/data/concept-gallery";
import { cx } from "@/lib/utils";

type ConceptLinkCardProps = {
  entry: ConceptGalleryEntry;
  variant?: "default" | "compact";
};

function previewStyle(entry: ConceptGalleryEntry): CSSProperties {
  return {
    backgroundImage: entry.theme.canvas,
  };
}

export function ConceptLinkCard({
  entry,
  variant = "default",
}: ConceptLinkCardProps) {
  const isCompact = variant === "compact";

  return (
    <Link
      className={cx(
        "group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[rgba(10,14,26,0.84)] transition duration-300 hover:-translate-y-0.5 hover:border-white/20",
        isCompact ? "flex h-full flex-col gap-4 p-5" : "flex h-full flex-col gap-5 p-5",
      )}
      href={entry.href}
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.025),rgba(255,255,255,0.01))]" />
      <div className="relative space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-[rgba(149,187,255,0.26)] bg-[rgba(137,181,255,0.12)] px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-[var(--color-accent)]">
            {entry.status}
          </span>
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[0.68rem] uppercase tracking-[0.16em] text-[var(--color-muted)]">
            {`${entry.minutes} min`}
          </span>
          <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[0.68rem] uppercase tracking-[0.16em] text-[var(--color-muted)]">
            {entry.format}
          </span>
        </div>

        <div className="space-y-2">
          <h3
            className={cx(
              "font-[family:var(--font-display)] font-semibold tracking-tight text-white",
              "text-2xl",
            )}
          >
            {entry.title}
          </h3>
          <p className="max-w-2xl text-base leading-7 text-white">{entry.question}</p>
          <p className="max-w-2xl text-sm leading-6 text-[var(--color-muted)] sm:text-base sm:leading-7">
            {entry.summary}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {entry.tags.slice(0, isCompact ? 2 : 4).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-[var(--color-muted)]"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-medium text-white">{entry.cta}</p>
          <span className="text-sm text-[var(--color-muted)] transition duration-300 group-hover:translate-x-0.5 group-hover:text-white">
            {`${entry.stageCount} steps ->`}
          </span>
        </div>
      </div>

      {isCompact ? null : (
        <div
          className="relative overflow-hidden rounded-[1.5rem] border border-white/10 p-4 sm:p-5"
          style={previewStyle(entry)}
        >
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,10,22,0.18),rgba(7,10,22,0.82))]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:22px_22px]" />
          <div className="relative flex h-full flex-col justify-between gap-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[0.68rem] uppercase tracking-[0.18em] text-white/80">
                Stage arc
              </p>
              <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[0.68rem] uppercase tracking-[0.16em] text-white/80">
                {entry.stageCount} steps
              </span>
            </div>

            <div
              className="grid grid-cols-2 gap-2"
            >
              {entry.stagePreview.map((stage, index) => (
                <div
                  key={stage}
                  className="rounded-[1.15rem] border border-white/10 bg-[rgba(5,8,18,0.42)] px-3 py-3 backdrop-blur-sm"
                >
                  <p className="text-[0.68rem] uppercase tracking-[0.16em] text-white/55">
                    {`0${index + 1}`}
                  </p>
                  <p className="mt-2 text-sm text-white">{stage}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Link>
  );
}
