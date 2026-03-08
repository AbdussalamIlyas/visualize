import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/link-button";
import { Pill } from "@/components/ui/pill";

type ConceptStarterPageProps = {
  title: string;
  question: string;
  summary: string;
  estimatedMinutes: number;
  tags: string[];
  plannedStages: string[];
  starterNote: string;
};

export function ConceptStarterPage({
  title,
  question,
  estimatedMinutes,
  plannedStages,
  starterNote,
}: ConceptStarterPageProps) {
  return (
    <div className="pb-20 pt-14 sm:pb-24 sm:pt-20">
      <Container className="space-y-6">
        <section className="surface overflow-hidden px-6 py-8 sm:px-8 sm:py-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <Pill tone="accent">Starter route</Pill>
                <Pill>{`${estimatedMinutes} min target`}</Pill>
              </div>
              <h1 className="font-[family:var(--font-display)] text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                {title}
              </h1>
              <p className="text-lg leading-8 text-white">{question}</p>
            </div>
            <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.03] px-4 py-3 text-sm leading-6 text-[var(--color-muted)] lg:max-w-sm">
              {starterNote}
            </div>
          </div>
        </section>

        <section className="surface px-6 py-8 sm:px-8">
          <div className="space-y-5">
            <div className="space-y-2">
              <p className="section-eyebrow">Planned flow</p>
              <h2 className="font-[family:var(--font-display)] text-3xl font-semibold tracking-tight text-white">
                Starter route only.
              </h2>
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
                Open the AI starter concept
              </LinkButton>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}
