"use client";

import { motion } from "motion/react";

import { ConceptPreview } from "@/components/landing/concept-preview";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/link-button";
import { Pill } from "@/components/ui/pill";
import { difficultyLevels } from "@/lib/concept-schema";

const stats = [
  { label: "Focused concept", value: "1" },
  { label: "Difficulty levels", value: String(difficultyLevels.length) },
  { label: "Core map nodes", value: "11" },
];

export function HeroSection() {
  return (
    <section className="pb-16 pt-14 sm:pb-20 sm:pt-20">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(24rem,34rem)] lg:gap-14">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
            initial={{ opacity: 0, y: 18 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <div className="space-y-6">
              <Pill tone="accent">Interactive AI Learning MVP</Pill>
              <div className="space-y-5">
                <h1 className="max-w-4xl font-[family:var(--font-display)] text-5xl font-semibold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
                  Understand AI visually.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-[var(--color-muted)] sm:text-xl">
                  Explore how AI works through a clickable concept map, concise
                  explanations, and one stable structure that adapts from child
                  level to expert level.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <LinkButton href="/concept/how-ai-works">
                Open the AI explainer
              </LinkButton>
              <LinkButton href="/about" variant="secondary">
                Why this exists
              </LinkButton>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  animate={{ opacity: 1, y: 0 }}
                  className="surface-muted px-5 py-4"
                  initial={{ opacity: 0, y: 18 }}
                  transition={{
                    delay: 0.1 + index * 0.08,
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                >
                  <p className="text-sm text-[var(--color-muted)]">{stat.label}</p>
                  <p className="mt-3 text-3xl font-semibold text-white">
                    {stat.value}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <ConceptPreview />
        </div>
      </Container>
    </section>
  );
}
