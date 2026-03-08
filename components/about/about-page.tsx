"use client";

import { motion } from "motion/react";

import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/link-button";
import { Pill } from "@/components/ui/pill";
import { SectionHeading } from "@/components/ui/section-heading";

const pillars = [
  {
    title: "Project purpose",
    body: "Make AI legible for the general public through interactive, image-first learning rather than dense text.",
  },
  {
    title: "Design philosophy",
    body: "Clarity first, premium by default. The site should feel calm, modern, and memorable without slipping into gimmicks.",
  },
  {
    title: "Who it serves",
    body: "People with uneven prior knowledge, especially learners who orient themselves more easily through spatial structure.",
  },
  {
    title: "Current scope",
    body: "One concept, one route, one excellent explainer. No platform features, creator tools, or community layer yet.",
  },
];

const futureSignals = [
  "Additional concept routes can reuse the same typed schema and visual shell.",
  "The difficulty system is designed to scale without changing the user's mental map.",
  "Interactive map behavior, detail panels, and source surfacing can layer in without a rewrite.",
];

export function AboutPage() {
  return (
    <div className="pb-20 pt-14 sm:pb-24 sm:pt-20">
      <Container className="space-y-14">
        <motion.section
          animate={{ opacity: 1, y: 0 }}
          className="surface overflow-hidden px-6 py-8 sm:px-10 sm:py-12"
          initial={{ opacity: 0, y: 18 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
            <div className="space-y-6">
              <Pill tone="accent">About The MVP</Pill>
              <div className="space-y-4">
                <h1 className="max-w-4xl font-[family:var(--font-display)] text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  This project exists to make hard systems feel navigable.
                </h1>
                <p className="max-w-3xl text-lg leading-8 text-[var(--color-muted)]">
                  Visualize starts with one question: can a premium interactive
                  explainer help more people understand how AI works without
                  flattening the idea into oversimplified marketing language?
                </p>
              </div>
            </div>
            <div className="surface-muted space-y-4 p-6">
              <p className="text-sm uppercase tracking-[0.16em] text-[var(--color-accent)]">
                First release
              </p>
              <p className="text-3xl font-semibold text-white">One concept</p>
              <p className="text-sm leading-6 text-[var(--color-muted)]">
                The scope is intentionally narrow so the learning model, visual
                system, and interaction quality can be proven before the product
                expands.
              </p>
            </div>
          </div>
        </motion.section>

        <section className="space-y-8">
          <SectionHeading
            eyebrow="Core Principles"
            title="The product is an explainer, not a platform."
            description="Every major decision in this first phase is meant to protect clarity, continuity, and a strong visual teaching experience."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {pillars.map((pillar, index) => (
              <motion.article
                key={pillar.title}
                className="surface px-6 py-6"
                initial={{ opacity: 0, y: 18 }}
                transition={{
                  delay: 0.04 + index * 0.05,
                  duration: 0.45,
                  ease: "easeOut",
                }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-2xl font-semibold text-white">
                  {pillar.title}
                </h2>
                <p className="mt-4 text-base leading-7 text-[var(--color-muted)]">
                  {pillar.body}
                </p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,22rem)]">
          <div className="surface px-6 py-8 sm:px-8">
            <SectionHeading
              eyebrow="Future Vision"
              title="The architecture is ready for more concepts without overbuilding now."
              description="The current codebase separates data, layout, and concept-specific rendering so future explainers can slot into the same system cleanly."
            />
            <div className="mt-8 space-y-4">
              {futureSignals.map((signal) => (
                <div
                  key={signal}
                  className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] px-5 py-4 text-sm leading-6 text-[var(--color-muted)]"
                >
                  {signal}
                </div>
              ))}
            </div>
          </div>
          <motion.aside
            className="surface-muted flex flex-col justify-between gap-6 p-6"
            initial={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="space-y-4">
              <Pill>Audience</Pill>
              <p className="text-2xl font-semibold text-white">
                General public, from first-time learners to technically curious
                readers.
              </p>
              <p className="text-sm leading-6 text-[var(--color-muted)]">
                The experience should stay approachable while still giving
                advanced readers enough structure and precision to keep going.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <LinkButton href="/concept/how-ai-works">
                Go to the concept route
              </LinkButton>
            </div>
          </motion.aside>
        </section>
      </Container>
    </div>
  );
}
