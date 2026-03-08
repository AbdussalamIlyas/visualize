"use client";

import { motion } from "motion/react";

import { ConceptPreview } from "@/components/landing/concept-preview";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/link-button";
import { Pill } from "@/components/ui/pill";
import { featuredConceptEntry } from "@/data/concept-gallery";

const principles = ["2 to 4 minutes", "Visual-first", "Compact copy"];

export function HeroSection() {
  return (
    <section className="pb-16 pt-14 sm:pb-20 sm:pt-20">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.86fr)_minmax(30rem,42rem)] lg:gap-14">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
            initial={{ opacity: 0, y: 18 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="space-y-5">
              <Pill tone="accent">Visual-first explainers</Pill>
              <div className="space-y-4">
                <h1 className="max-w-4xl font-[family:var(--font-display)] text-5xl font-semibold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
                  Understand systems by watching the state change.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-[var(--color-muted)] sm:text-xl">
                  Guided concept pages for jet engines, AI, web delivery, GPS,
                  solar panels, and more. The visual stays in front. The copy stays
                  short.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <LinkButton href={featuredConceptEntry.href}>
                {featuredConceptEntry.cta}
              </LinkButton>
              <LinkButton href="/#concept-library" variant="secondary">
                Browse concept library
              </LinkButton>
            </div>
            <div className="flex flex-wrap gap-2">
              {principles.map((principle) => (
                <Pill key={principle}>{principle}</Pill>
              ))}
            </div>
          </motion.div>
          <ConceptPreview />
        </div>
      </Container>
    </section>
  );
}
