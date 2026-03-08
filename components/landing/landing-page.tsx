import { DifficultyStrip } from "@/components/landing/difficulty-strip";
import { HeroSection } from "@/components/landing/hero-section";
import { WhySection } from "@/components/landing/why-section";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/link-button";
import { SectionHeading } from "@/components/ui/section-heading";

export function LandingPage() {
  return (
    <>
      <HeroSection />
      <DifficultyStrip />
      <WhySection />
      <section className="pb-20 pt-8 sm:pb-24">
        <Container>
          <div className="surface flex flex-col gap-8 overflow-hidden px-6 py-10 sm:px-10 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Ready To Explore"
              title="Follow the same AI map from child-level intuition to expert nuance."
              description="The next route is already scaffolded so the explainer can grow without changing the product shape."
            />
            <div className="flex flex-wrap gap-3">
              <LinkButton href="/concept/how-ai-works">
                Preview the concept route
              </LinkButton>
              <LinkButton href="/about" variant="secondary">
                Read the project intent
              </LinkButton>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
