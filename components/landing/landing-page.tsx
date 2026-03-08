import { ConceptLinkCard } from "@/components/concept/concept-link-card";
import { HeroSection } from "@/components/landing/hero-section";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { conceptGalleryEntries } from "@/data/concept-gallery";

export function LandingPage() {
  return (
    <>
      <HeroSection />
      <section className="pb-20 pt-6 sm:pb-24" id="concept-library">
        <Container className="space-y-8">
          <SectionHeading
            eyebrow="Concept library"
            title="One design language across every concept."
            description="Every concept uses the same 3D guided pipeline shell, compact supporting copy, and minimal navigation so the interaction stays easy to learn."
          />

          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {conceptGalleryEntries.map((entry) => (
              <ConceptLinkCard key={entry.href} entry={entry} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
