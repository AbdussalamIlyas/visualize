import { ConceptLinkCard } from "@/components/concept/concept-link-card";
import { LinkButton } from "@/components/ui/link-button";
import { SectionHeading } from "@/components/ui/section-heading";
import { getRelatedConceptEntries } from "@/data/concept-gallery";

type MoreConceptsProps = {
  currentHref: string;
};

export function MoreConcepts({ currentHref }: MoreConceptsProps) {
  const entries = getRelatedConceptEntries(currentHref);

  return (
    <section className="space-y-6">
      <SectionHeading
        eyebrow="Continue exploring"
        title="Stay inside the library."
        description="Each concept keeps the same calm shell, but the mechanism and stage story change to fit the system."
      />
      <div className="grid gap-4 lg:grid-cols-3">
        {entries.map((entry) => (
          <ConceptLinkCard key={entry.href} entry={entry} variant="compact" />
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        <LinkButton href="/#concept-library" variant="secondary">
          Browse the full library
        </LinkButton>
      </div>
    </section>
  );
}
