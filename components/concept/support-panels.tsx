import type { GlossaryTerm, Source } from "@/lib/concept-schema";

type SupportPanelsProps = {
  currentViewLabel: string;
  glossary: GlossaryTerm[];
  sources: Source[];
};

export function SupportPanels({
  currentViewLabel,
  glossary,
  sources,
}: SupportPanelsProps) {
  return (
    <section className="grid gap-4 lg:grid-cols-2">
      <details className="details-reset surface overflow-hidden">
        <summary className="cursor-pointer list-none px-5 py-4 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <p className="text-base font-semibold text-white">Glossary</p>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs uppercase tracking-[0.16em] text-[var(--color-muted)]">
              {glossary.length} terms
            </span>
          </div>
        </summary>
        <div className="border-t border-white/10 px-5 py-5 sm:px-6">
          <div className="grid gap-3">
            {glossary.map((term) => (
              <article
                key={term.id}
                className="rounded-[1.35rem] border border-white/10 bg-white/[0.03] px-4 py-4"
              >
                <h3 className="text-lg font-semibold text-white">{term.term}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                  {term.definition}
                </p>
              </article>
            ))}
          </div>
        </div>
      </details>

      <details className="details-reset surface overflow-hidden">
        <summary className="cursor-pointer list-none px-5 py-4 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="text-base font-semibold text-white">Sources</p>
              <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-muted)]">
                {currentViewLabel}
              </p>
            </div>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs uppercase tracking-[0.16em] text-[var(--color-muted)]">
              {sources.length} links
            </span>
          </div>
        </summary>
        <div className="border-t border-white/10 px-5 py-5 sm:px-6">
          <div className="grid gap-3">
            {sources.map((source) => (
              <a
                key={source.url}
                className="rounded-[1.35rem] border border-white/10 bg-white/[0.03] px-4 py-4 transition hover:border-white/20 hover:bg-white/[0.05]"
                href={source.url}
                rel="noreferrer"
                target="_blank"
              >
                <h3 className="text-base font-semibold text-white">{source.title}</h3>
                {source.note ? (
                  <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                    {source.note}
                  </p>
                ) : null}
              </a>
            ))}
          </div>
        </div>
      </details>
    </section>
  );
}
