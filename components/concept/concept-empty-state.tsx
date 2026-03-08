import { LinkButton } from "@/components/ui/link-button";

type ConceptEmptyStateProps = {
  title?: string;
  description?: string;
};

export function ConceptEmptyState({
  title = "This concept is not available yet.",
  description = "The page shell is ready, but this concept does not have enough local explainer data to render yet.",
}: ConceptEmptyStateProps) {
  return (
    <section className="surface px-6 py-10 sm:px-8">
      <div className="max-w-2xl space-y-4">
        <p className="section-eyebrow">No Content Yet</p>
        <h1 className="font-[family:var(--font-display)] text-3xl font-semibold text-white sm:text-4xl">
          {title}
        </h1>
        <p className="text-base leading-7 text-[var(--color-muted)]">
          {description}
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <LinkButton href="/" variant="secondary">
            Back to home
          </LinkButton>
          <LinkButton href="/about">Read about the project</LinkButton>
        </div>
      </div>
    </section>
  );
}
