import type { CSSProperties } from "react";

import { Pill } from "@/components/ui/pill";
import type { ConceptTheme } from "@/lib/concept-schema";

type ConceptPageHeroProps = {
  eyebrow: string;
  minutes: number;
  title: string;
  question: string;
  summary: string;
  tags: string[];
  note: string;
  theme?: ConceptTheme;
};

function heroStyle(theme?: ConceptTheme): CSSProperties | undefined {
  if (!theme) {
    return undefined;
  }

  return {
    backgroundImage: theme.canvas,
  };
}

export function ConceptPageHero({
  eyebrow,
  minutes,
  title,
  question,
  summary,
  tags,
  note,
  theme,
}: ConceptPageHeroProps) {
  return (
    <section className="surface relative overflow-hidden px-6 py-8 sm:px-8 sm:py-10">
      <div className="absolute inset-0 opacity-90" style={heroStyle(theme)} />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,10,22,0.18),rgba(7,10,22,0.78))]" />
      <div className="relative space-y-5">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Pill tone="accent">{eyebrow}</Pill>
              <Pill>{`${minutes} min`}</Pill>
            </div>
            <div className="space-y-3">
              <h1 className="font-[family:var(--font-display)] text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                {title}
              </h1>
              <p className="text-lg leading-8 text-white">{question}</p>
              <p className="max-w-2xl text-sm leading-7 text-[rgba(230,236,255,0.78)] sm:text-base">
                {summary}
              </p>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-[rgba(8,12,22,0.46)] px-4 py-4 backdrop-blur-md lg:max-w-sm">
            <p className="section-eyebrow">Focus</p>
            <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">{note}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-[var(--color-muted)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
