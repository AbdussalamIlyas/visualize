"use client";

import { motion } from "motion/react";

import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/link-button";
import { Pill } from "@/components/ui/pill";

const principles = [
  "One concept per page",
  "The visual teaches first",
  "Details stay collapsed",
];

export function AboutPage() {
  return (
    <div className="pb-20 pt-14 sm:pb-24 sm:pt-20">
      <Container className="space-y-8">
        <motion.section
          animate={{ opacity: 1, y: 0 }}
          className="surface overflow-hidden px-6 py-8 sm:px-10 sm:py-12"
          initial={{ opacity: 0, y: 18 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
            <div className="space-y-4">
              <Pill tone="accent">About Visualize</Pill>
              <h1 className="max-w-4xl font-[family:var(--font-display)] text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Visual explainers, not essay pages.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-[var(--color-muted)]">
                Each concept gets one interactive page, compact cues, and
                collapsible reference material.
              </p>
            </div>
            <div className="surface-muted flex flex-wrap gap-2 p-6">
              <Pill>1 flagship</Pill>
              <Pill>2 starters</Pill>
              <Pill>Glossary + sources</Pill>
            </div>
          </div>
        </motion.section>

        <section className="grid gap-4 md:grid-cols-3">
          {principles.map((principle, index) => (
            <motion.article
              key={principle}
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
              <Pill>{`0${index + 1}`}</Pill>
              <p className="mt-4 text-base text-white">{principle}</p>
            </motion.article>
          ))}
        </section>

        <section className="surface-muted flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <Pill>Audience</Pill>
            <p className="text-2xl font-semibold text-white">
              For learners who want the mechanism first.
            </p>
          </div>
          <LinkButton href="/concept/how-a-jet-engine-works">
            Open the jet engine explainer
          </LinkButton>
        </section>
      </Container>
    </div>
  );
}
