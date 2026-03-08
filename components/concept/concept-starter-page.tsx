import { ConceptPageHero } from "@/components/concept/concept-page-hero";
import { MoreConcepts } from "@/components/concept/more-concepts";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/link-button";
import type { ConceptTheme } from "@/lib/concept-schema";

type ConceptStarterPageProps = {
  slug: string;
  title: string;
  question: string;
  summary: string;
  estimatedMinutes: number;
  tags: string[];
  plannedStages: string[];
  starterNote: string;
  theme?: ConceptTheme;
};

export function ConceptStarterPage({
  slug,
  title,
  question,
  summary,
  estimatedMinutes,
  tags,
  plannedStages,
  starterNote,
  theme,
}: ConceptStarterPageProps) {
  return (
    <div className="pb-20 pt-14 sm:pb-24 sm:pt-20">
      <Container className="space-y-6">
        <ConceptPageHero
          eyebrow="Starter route"
          minutes={estimatedMinutes}
          note={starterNote}
          question={question}
          summary={summary}
          tags={tags}
          theme={theme}
          title={title}
        />

        <section className="surface overflow-hidden px-6 py-8 sm:px-8">
          <div className="space-y-5">
            <div className="space-y-2">
              <p className="section-eyebrow">Planned flow</p>
              <h2 className="font-[family:var(--font-display)] text-3xl font-semibold tracking-tight text-white">
                Starter route only.
              </h2>
              <p className="max-w-2xl text-sm leading-7 text-[var(--color-muted)] sm:text-base">
                The concept is scoped and staged, but the full visual interaction is
                still to come.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {plannedStages.map((stage, index) => (
                <article
                  key={stage}
                  className="rounded-[1.35rem] border border-white/10 bg-white/[0.03] px-4 py-4"
                >
                  <p className="text-[0.68rem] uppercase tracking-[0.16em] text-[var(--color-accent)]">
                    {`0${index + 1}`}
                  </p>
                  <p className="mt-3 text-base leading-7 text-white">{stage}</p>
                </article>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <LinkButton href="/concept/how-a-jet-engine-works">
                Open the flagship jet engine explainer
              </LinkButton>
              <LinkButton href="/concept/how-ai-works" variant="secondary">
                Open the AI explainer
              </LinkButton>
            </div>
          </div>
        </section>

        <MoreConcepts currentHref={`/concept/${slug}`} />
      </Container>
    </div>
  );
}
