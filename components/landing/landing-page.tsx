import { ConceptLinkCard } from "@/components/concept/concept-link-card";
import { HeroSection } from "@/components/landing/hero-section";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  conceptGalleryEntries,
  featuredConceptEntry,
} from "@/data/concept-gallery";

const libraryEntries = conceptGalleryEntries.filter(
  (entry) => entry.href !== featuredConceptEntry.href,
);

export function LandingPage() {
  return (
    <>
      <HeroSection />
      <section className="pb-20 pt-6 sm:pb-24" id="concept-library">
        <Container className="space-y-8">
          <SectionHeading
            eyebrow="Concept library"
            title="A calmer, more curated collection."
            description="Start with the flagship jet engine route, then branch into newer explainers for web delivery, GPS, solar power, AI, and the transistor starter."
          />

          <ConceptLinkCard entry={featuredConceptEntry} variant="featured" />

          <div className="grid gap-4 xl:grid-cols-3">
            {libraryEntries.map((entry) => (
              <ConceptLinkCard key={entry.href} entry={entry} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
