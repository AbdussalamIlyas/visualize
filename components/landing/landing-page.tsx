import { HeroSection } from "@/components/landing/hero-section";
import { conceptGalleryEntries } from "@/data/concept-gallery";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/link-button";
import { SectionHeading } from "@/components/ui/section-heading";

export function LandingPage() {
  return (
    <>
      <HeroSection />
      <section className="pb-20 pt-6 sm:pb-24">
        <Container className="space-y-8">
          <SectionHeading
            eyebrow="Concept gallery"
            title="One flagship. Two starters."
            description="Open the finished visual explainer first, then the starter routes."
          />
          <div className="grid gap-4 lg:grid-cols-3">
            {conceptGalleryEntries.map((entry) => (
              <article
                key={entry.href}
                className="surface flex flex-col justify-between gap-6 px-6 py-6"
              >
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-[rgba(149,187,255,0.35)] bg-[rgba(137,181,255,0.12)] px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-accent)]">
                      {entry.status}
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs uppercase tracking-[0.16em] text-[var(--color-muted)]">
                      {`${entry.minutes} min`}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-semibold text-white">
                      {entry.title}
                    </h3>
                    <p className="text-sm leading-6 text-[var(--color-muted)]">
                      {entry.summary}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <LinkButton href={entry.href}>{entry.cta}</LinkButton>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
